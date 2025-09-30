interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="relative min-h-svh flex items-center justify-center p-6 md:p-10 overflow-hidden bg-gradient-to-br from-pink-100 via-orange-100 to-orange-200 animate-gradient">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

      {/* Blurred glowing auras */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 -right-40 w-[32rem] h-[32rem] bg-orange-400/20 rounded-full blur-3xl animate-pulse-slower" />

      {/* Tiny accent paw / cat silhouette (optional decorative SVGs) */}
      <div className="absolute top-12 right-12 opacity-20 rotate-12 animate-pulse-slow transition-transform duration-500 hover:scale-110 hover:rotate-6">
        <img
          src="/paw.svg"
          alt="paw print"
          className="w-16 h-16 drop-shadow-[0_0_10px_rgba(255,200,50,0.4)]"
        />
      </div>

      <div className="absolute top-16 left-8 opacity-15 -rotate-6 animate-pulse-slower transition-transform duration-500 hover:scale-105 hover:-rotate-3">
        <img
          src="/cat2.svg"
          alt="cat print"
          className="w-16 h-16 drop-shadow-[0_0_8px_rgba(255,180,80,0.3)]"
        />
      </div>

      <div className="absolute bottom-12 left-12 opacity-15 -rotate-12 animate-pulse-slower transition-transform duration-500 hover:scale-105 hover:-rotate-6">
        <img
          src="/cat3.svg"
          alt="cat ear"
          className="w-20 h-20 drop-shadow-[0_0_12px_rgba(255,220,100,0.35)]"
        />
      </div>

      {/* Foreground content wrapper */}
      <div className="relative z-10 w-full max-w-sm md:max-w-3xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2">
        {children}
      </div>
    </div>
  );
};

export default Layout;
