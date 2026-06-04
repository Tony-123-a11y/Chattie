export default function Hero() {
  return (
    <section className="">
           {/* Ambient glow orbs */}
  
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 rounded-full bg-accent-200/20 blur-[100px]"
      />
          <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-primary-600/15 blur-[120px]"
      />
      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center overflow-hidden">
   

      {/* ── Left copy ── */}
      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-600 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-7 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse" />
          Powered by advanced AI
        </div>

        <h1 className="text-5xl md:text-[3.75rem] font-bold leading-[1.08] tracking-tight">
          <span className="text-text">Your Ideas,</span>
          <br />
          <span className="bg-gradient-to-r from-primary-600 via-primary-400 to-accent-200 bg-clip-text text-transparent">
            Accelerated
          </span>
        </h1>

        <p className="mt-6 text-text-muted text-[1.0625rem] leading-relaxed max-w-[26rem]">
          The most capable AI companion for brainstorming, coding, and learning.
          Experience conversational clarity in a clean, focused workspace.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <button className="cursor-pointer inline-flex items-center gap-2 bg-primary-800 hover:bg-primary-600 text-primary-50 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-primary-800/30 hover:shadow-primary-600/35 hover:-translate-y-0.5">
            Get Started 
            <span aria-hidden className="opacity-80">→</span>
          </button>
         
        </div>

        {/* Social proof strip */}
        <div className="mt-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {["#534AB7", "#3C3489", "#7F77DD", "#AFA9EC"].map((bg, i) => (
              <div
                key={i}
                style={{ background: bg }}
                className="w-8 h-8 rounded-full border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary-50"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-xs text-text-muted">
            Trusted by <span className="text-text font-semibold">12,000+</span> professionals
          </p>
        </div>
      </div>

      {/* ── Right mock chat UI ── */}
      <div className="relative z-10">
        {/* Floating glow behind card */}
        <div
          aria-hidden
          className="absolute inset-0 bg-primary-600/10 rounded-3xl blur-2xl scale-95 pointer-events-none"
        />
        <div className="relative bg-card border border-border/40 rounded-2xl shadow-2xl overflow-hidden">
          {/* Titlebar */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border/30 bg-surface/40 backdrop-blur-sm">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-error/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
            </div>
            <span className="text-[11px] text-text-muted font-medium tracking-wide">
              Chattie — New Chat
            </span>
          </div>

          {/* Messages */}
          <div className="p-5 space-y-5">
            {/* User */}
            <div className="flex justify-end">
              <div className="bg-primary-50 border border-primary-200 text-primary-900 text-[13px] leading-relaxed px-4 py-2.5 rounded-2xl rounded-tr-none max-w-[80%] shadow-sm">
                Help me brainstorm a name for my startup
              </div>
            </div>

            {/* AI */}
            <div className="text-[13px] text-text leading-relaxed max-w-[90%]">
              <p className="text-text-muted mb-2.5">Here are some creative ideas:</p>
              <div className="space-y-2">
                {[
                  { name: "Nexara", note: "suggests next-gen ideas", color: "text-primary-600" },
                  { name: "Lumiq", note: "bright & unique", color: "text-primary-600" },
                  { name: "Vervia", note: "vibrant & vivid", color: "text-accent-200" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2.5 bg-surface/60 rounded-lg px-3 py-2"
                  >
                    <span className={`font-semibold ${item.color}`}>{item.name}</span>
                    <span className="text-text-muted text-[11px]">— {item.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="px-5 pb-5">
            <div className="flex items-center gap-2.5 bg-surface/60 rounded-xl px-4 py-2.5 border border-border/40">
              <span className="text-[13px] text-text-muted flex-1 select-none">Ask anything...</span>
              <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
                <span className="text-primary-50 text-xs font-bold leading-none">↑</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}