import { GeneratedAvatar } from "@/components/generated-avatar";
import { MeetingGetOne } from "../../types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpenTextIcon, ClockFadingIcon, FileTextIcon, FileVideoIcon, SparkleIcon } from "lucide-react";
import Link from "next/link";
import { formatDate } from "date-fns";
import { formatDuration } from "@/lib/utils";
import Markdown from "react-markdown";

interface Props {
  data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
    
  return (
    <div className="flex flex-col gap-y-4">

      <Tabs defaultValue="summary" className="w-full">

        {/* Tabs Header */}
        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-amber-600/20 rounded-2xl shadow-xl shadow-black/20 p-4">
          <ScrollArea className="w-full">
            <TabsList className="flex space-x-3 bg-zinc-800/60 rounded-xl p-1 shadow-inner border border-zinc-700/40">

              {/* Summary Tab */}
              <TabsTrigger
                value="summary"
                className="
                  relative flex items-center gap-2 px-5 py-2.5 
                  rounded-xl font-medium tracking-wide text-sm
                  text-zinc-100 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600
                  shadow-lg shadow-amber-900/40
                  transition-all duration-300 ease-out
                  hover:scale-105 hover:shadow-xl hover:shadow-amber-800/50
                  active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-2 focus:ring-offset-zinc-900
                  data-[state=active]:ring-2 data-[state=active]:ring-amber-500/50
                  data-[state=active]:shadow-amber-800/60
                "
              >
                <BookOpenTextIcon className="w-4 h-4" />
                Summary
              </TabsTrigger>

              {/* Transcript Tab */}
              <TabsTrigger
                value="transcript"
                className="
                  relative flex items-center gap-2 px-5 py-2.5 
                  rounded-xl font-medium tracking-wide text-sm
                  text-zinc-400 hover:text-zinc-200
                  transition-all duration-300 ease-out
                  hover:bg-gradient-to-r hover:from-amber-800 hover:to-orange-700
                  data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-700 data-[state=active]:to-orange-600
                  data-[state=active]:text-zinc-100
                  data-[state=active]:shadow-lg data-[state=active]:shadow-amber-900/30
                "
              >
                <FileTextIcon className="w-4 h-4" />
                Transcript
              </TabsTrigger>

              {/* Recording Tab */}
              <TabsTrigger
                value="recording"
                className="
                  relative flex items-center gap-2 px-5 py-2.5 
                  rounded-xl font-medium tracking-wide text-sm
                  text-zinc-400 hover:text-zinc-200
                  transition-all duration-300 ease-out
                  hover:bg-gradient-to-r hover:from-amber-800 hover:to-orange-700
                  data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-700 data-[state=active]:to-amber-600
                  data-[state=active]:text-zinc-100
                  data-[state=active]:shadow-lg data-[state=active]:shadow-orange-900/30
                "
              >
                <FileVideoIcon className="w-4 h-4" />
                Recording
              </TabsTrigger>

              {/* Chat Tab */}
              <TabsTrigger
                value="chat"
                className="
                  relative flex items-center gap-2 px-5 py-2.5 
                  rounded-xl font-medium tracking-wide text-sm
                  text-zinc-400 hover:text-zinc-200
                  transition-all duration-300 ease-out
                  hover:bg-gradient-to-r hover:from-amber-800 hover:to-orange-700
                  data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-700 data-[state=active]:to-amber-600
                  data-[state=active]:text-zinc-100
                  data-[state=active]:shadow-lg data-[state=active]:shadow-orange-900/30
                "
              >
                <SparkleIcon className="w-4 h-4" />
                Chat
              </TabsTrigger>

            </TabsList>
          </ScrollArea>
        </div>

        {/* Tabs Content */}

        {/* Recording Content */}
        <TabsContent value="recording">
          <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-700/30 rounded-xl p-4 flex justify-center items-center shadow-lg shadow-black/20">
            {data?.recordingUrl ? (
              <video
                src={data.recordingUrl}
                className="w-full rounded-lg shadow-lg shadow-black/30 border border-zinc-700/40"
                controls
              />
            ) : (
              <p className="text-zinc-400 text-center">
                No recording available for this meeting.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="summary">
          <div className="bg-zinc-900/60 backdrop-blur-3xl border border-zinc-700/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex flex-col gap-4">
              
              {/* Meeting Title */}
              <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 drop-shadow-sm">
                {data.name}
              </h2>
              
              {/* Agent Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-zinc-800/40 rounded-xl p-3 shadow-inner border border-zinc-700/30 hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-black/20">
                <Link href={`/agents/${data.agent.id}`} className="flex items-center gap-2">
                  <GeneratedAvatar variant="botttsNeutral" seed={data.agent.name} className="w-10 h-10 rounded-full shadow-md border-2 border-amber-600/30" />
                  <span className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 drop-shadow-sm">
                    {data.agent.name}
                  </span>
                </Link>
                <p className="text-zinc-400 text-sm sm:text-base italic">
                  {data.startedAt ? formatDate(data.startedAt, "PPP") : ""}
                </p>
              </div>

              {/* Summary Header */}
              <div className="flex gap-x-2 items-center justify-center text-amber-300">
                <SparkleIcon className="size-4" />
                <p className="font-medium text-lg">Summary</p>
              </div>

              {/* Duration Badge */}
              <div className="flex justify-center">
                <Badge 
                  variant="outline" 
                  className="bg-zinc-800/50 border-zinc-600/40 text-zinc-300 hover:bg-zinc-700/50 transition-colors duration-200"
                >
                  <ClockFadingIcon className="size-3 mr-1" />
                  {data.duration ? formatDuration(data.duration) : "No duration"}
                </Badge>
              </div>

              {/* Summary Content */}
              <div className="text-left max-w-none">
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 mb-4 drop-shadow-sm" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="text-xl font-semibold text-amber-300 mb-3 mt-6 border-b border-zinc-600/30 pb-2" {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="text-lg font-medium text-orange-300 mb-2 mt-4" {...props} />
                    ),
                    h4: (props) => (
                      <h4 className="text-base font-medium text-amber-200 mb-2 mt-3" {...props} />
                    ),
                    p: (props) => (
                      <p className="text-zinc-200 leading-relaxed mb-3" {...props} />
                    ),
                    strong: (props) => (
                      <strong className="text-amber-200 font-semibold" {...props} />
                    ),
                    em: (props) => (
                      <em className="text-orange-300 italic" {...props} />
                    ),
                    ul: (props) => (
                      <ul className="text-zinc-300 space-y-1 mb-3 ml-4" {...props} />
                    ),
                    ol: (props) => (
                      <ol className="text-zinc-300 space-y-1 mb-3 ml-4" {...props} />
                    ),
                    li: (props) => (
                      <li className="text-zinc-300 mb-1" {...props} />
                    ),
                    code: (props) => (
                      <code className="text-amber-200 bg-zinc-800/60 px-2 py-1 rounded text-sm border border-zinc-600/30" {...props} />
                    ),
                    pre: (props) => (
                      <pre className="bg-zinc-800/40 border border-zinc-600/30 rounded-lg p-3 overflow-x-auto text-sm" {...props} />
                    ),
                    blockquote: (props) => (
                      <blockquote className="border-l-3 border-amber-600/50 bg-zinc-800/30 text-zinc-300 italic pl-3 py-2 rounded-r-md mb-3" {...props} />
                    ),
                    hr: (props) => (
                      <hr className="border-zinc-600/40 my-6" {...props} />
                    ),
                    a: (props) => (
                      <a className="text-orange-300 underline decoration-orange-400/50 underline-offset-2 hover:decoration-orange-300 hover:text-orange-200 transition-colors" {...props} />
                    ),
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>

              {/* Cat-inspired decorative element */}
              <div className="h-0.5 w-20 mx-auto rounded-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 opacity-60"></div>
              
            </div>
          </div>
        </TabsContent>

        
      </Tabs>
    </div>
  );
};