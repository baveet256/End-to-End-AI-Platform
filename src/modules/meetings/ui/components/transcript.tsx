import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GeneratedAvatarUri } from "@/lib/avatar";
import { trpc } from "@/trpc/client";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  meetingId: string;

}

export const Transcript = ({ meetingId }: Props) => {
  const { data } = trpc.meetings.getTranscript.useQuery({
    id: meetingId,
  });
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredData = (data ?? []).filter((item) =>
    item.text.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper to highlight search terms
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-amber-600/40 text-amber-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };


  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200">
          Transcript
        </h3>

        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-800/60 border-zinc-600/40 text-zinc-200 placeholder:text-zinc-500 focus:border-amber-500/50 focus:ring-amber-500/20"
          />
        </div>

        {/* Results count */}
        {searchQuery && (
          <p className="text-sm text-zinc-400">
            Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Transcript Content */}
      <ScrollArea className="flex-1 pr-4">
        <div className="flex flex-col gap-4">
          {filteredData.length === 0 ? (
            <div className="text-center py-8 text-zinc-400">
              {searchQuery ? 'No results found' : 'No transcript available'}
            </div>
          ) : (
            filteredData.map((item) => (
              <div
                key={item.start_ts}
                className="flex gap-3 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30 hover:bg-zinc-800/60 transition-colors duration-200"
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <Avatar className="w-10 h-10 border-2 border-amber-600/30">
                    <AvatarImage
                      src={
                        typeof item.user.image === 'string' ? item.user.image :
                        GeneratedAvatarUri({
                          seed: item.user.name,
                          variant: "initials",
                        })
                      }
                      alt={item.user.name}
                    />
                  </Avatar>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* User name and timestamp */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-medium text-amber-300 text-sm">
                      {item.user.name}
                    </span>
                  </div>

                  {/* Transcript text */}
                  <p className="text-zinc-200 text-sm leading-relaxed">
                    {highlightText(item.text, searchQuery)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};