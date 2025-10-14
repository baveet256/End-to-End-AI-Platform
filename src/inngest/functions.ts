import { db } from "@/db";
import { agents, meetings, user } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { StreamTranscriptItem } from "@/modules/meetings/types";
import { and, eq, inArray} from "drizzle-orm";
import JSONL from "jsonl-parse-stringify"
import {createAgent, openai, TextMessage} from "@inngest/agent-kit"
import { StreamVideo } from "@/lib/stream-video";

const summarizer = createAgent({
  name:"summarizer",
  system:`You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

Use the following markdown structure for every output:

### Overview
Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

### Notes
Each section should summarize key points, actions, or demos in bullet format.

Example:
#### Section Name
- Main point or demo shown here
- Another key insight or interaction
- Follow-up tool or explanation provided

#### Next Section
- Feature X automatically does Y
- Mention of integration with Z`
.trim(), 
model : openai({model: "gpt-4o", apiKey: process.env.OPENAI_API_KEY })
})
 
export const meetingsProcessing = inngest.createFunction(
  {
    id: "meetings/processing"
  },
  {
    event : "meetings/processing"
  },
  async ({event,step}) =>{

    const response = await step.run('fetch-transcript',async () => {
      return fetch(event.data.transcriptUrl).then((res) => res.text());
    })

    const transcript = await step.run('parse-transcript',async () => {
      return JSONL.parse<StreamTranscriptItem>(response);
    });

    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id)),
      ];
    
      const userSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds))
        .then((users) =>
          users.map((u) => ({
            ...u,
          }))
        );
        const agentSpeakers = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakerIds))
        .then((agents) =>
          agents.map((u) => ({
            ...u,
          }))
        );
        const speakers = [...userSpeakers,...agentSpeakers];
        return transcript.map((u)=>{
          const speaker = speakers.find(
            (speaker) => speaker.id === u.speaker_id
          );

          if(!speaker){
            return {
              ...u,
              user : {
                name:"Unknown",
              },
            }
          };

          return {
            ...u,
            user:{
              name:speaker.name,

            }
          }
        })
    });
    
  const {output} = await summarizer.run(
    "Summarize the following transcript: " + JSON.stringify(transcriptWithSpeakers));


    await step.run("save-summary",async () =>{
      await db
      .update(meetings)
      .set({
        summary: (output[0] as TextMessage).content as string,
        status:"completed",
      })
      .where(eq(meetings.id,event.data.meetingId))
    })
  },
)
export const endMeetingOnTimeLimit = inngest.createFunction(
  { 
      id: "end-meeting-on-time-limit",
      retries: 3, // Retry if it fails
  },
  { event: "meeting/time-limit-reached" },
  async ({ event, step }) => {
      const { meetingId, callId,timeLimit } = event.data;

      // Check if meeting is still active
      await step.sleep("wait-for-time-limit", `${timeLimit}s`);
      
      const meetingStatus = await step.run("check-meeting-status", async () => {
          const [meeting] = await db
              .select()
              .from(meetings)
              .where(eq(meetings.id, meetingId));
          
          return meeting?.status;
      });

      if (meetingStatus !== "active") {
          console.log(`⏭️ Meeting ${meetingId} already ended (status: ${meetingStatus})`);
          return { skipped: true, reason: "Meeting not active" };
      }

      // End the call - this will trigger your call.session_ended webhook
      await step.run("end-call", async () => {
          try {
              const call = StreamVideo.video.call('default', callId);
              await call.end();
              
              console.log(`✅ Call ${callId} ended due to time limit`);
          } catch (error) {
              console.error(`❌ Error ending call ${callId}:`, error);
              throw error; // This will trigger a retry
          }
      });

      // Update meeting status to completed (fallback in case webhook fails)
      await step.run("update-meeting-status", async () => {
          await db
              .update(meetings)
              .set({
                  status: "processing",
                  endedAt: new Date(),
              })
              .where(
                  and(
                      eq(meetings.id, meetingId),
                      eq(meetings.status, "active")
                  )
              );
          
          console.log(`✅ Meeting ${meetingId} marked as processing`);
      });

      return { 
          success: true, 
          meetingId,
          reason: "Time limit reached" 
      };
  }
);