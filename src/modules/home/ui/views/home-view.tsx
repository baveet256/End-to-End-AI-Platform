"use client";

export const HomeView = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 md:p-12 overflow-hidden">
      
      {/* Futuristic glowing circles */}

      {/* Foreground content */}
      <div className="relative z-10 max-w-4xl flex flex-col gap-8">
        
        {/* Logo / Home */}
        <div className="flex justify-center">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Meow.AI Logo" className="w-12 h-12 drop-shadow-lg" />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 drop-shadow-lg ">
              Meow.AI
            </h1>
          </a>
        </div>

        {/* Intro Card */}
       <p className="transition-shadow text-lg md:text-xl text-gray-800/90 leading-relaxed 
              bg-white/20 p-6 md:p-8 rounded-3xl shadow-2xl border border-white/30 
              backdrop-blur-lg hover:shadow-3xl hover:scale-[1.02] duration-300">
  Welcome to <span className="font-bold text-purple-400">Meow.AI</span>, your full-stack SaaS where AI meets meetings! Here's how it works:
  <ul className="list-disc ml-6 mt-4 space-y-3 text-gray-900/90">
    <li>Create your own <span className="text-pink-400 font-semibold">AI Agent</span> with custom instructions.</li>
    <li>Assign your agent to a meeting and <span className="font-semibold text-orange-400">join</span> — it will participate in the call with you.</li>
    <li>Use it as your <span className="text-purple-400 font-semibold">mock interviewer</span> — ask queries in any language (real-time + translation enabled).</li>
    <li>After the call, access the recording, AI chat on your transcripts, view transcriptions, and see detailed summaries.</li>
  </ul>

  <p className="mt-4">
    Navigate using the <span className="font-semibold text-pink-400">sidebar</span> to go to your <span className="text-purple-400 font-semibold">Meetings</span> and <span className="text-purple-400 font-semibold">Agents</span>. 
    Click the <span className="font-bold text-orange-400">Meow.AI logo</span> anytime to return here. Click on the user button in the sidebar to Logout.
  </p>

  <p className="mt-4 text-gray-600 font-semibold">
    ⚠️ This is a <span className="text-orange-400 font-bold">trial/demo SaaS</span>. Running real-time AI calls costs me money and as current F1 student in the US, I cannot implement payments. 
    You are allowed <span className="text-pink-400 font-bold">3 - 4 meetings</span> only. You cannot delete or edit meetings. Once a meeting is done, you can view the recording, transcripts, and AI chat. 
    So in summary, you get limited chances to try this app — enjoy your demo!
  </p>
</p>



        {/* Contact */}
        <p className="text-center text-gray-400 text-sm md:text-base">
          Reach out for feedback, suggestions, or anything else:{" "}
          <a href="mailto:bhora@asu.edu" className="underline hover:text-purple-400 transition-colors">
            bhora@asu.edu
          </a>
        </p>
      </div>
    </div>
  );
};
