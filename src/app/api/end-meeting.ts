import { NextResponse } from "next/server";
import { StreamVideo } from "@/lib/stream-video";

export async function POST(req: Request) {
  const { meetingId } = await req.json();
  if (!meetingId) return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });

  try {
    const call = StreamVideo.video.call("default", meetingId);
    await call.end(); // <-- This alone triggers call.session_ended webhook
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error ending meeting:", err);
    return NextResponse.json({ error: "Failed to end meeting" }, { status: 500 });
  }
}
