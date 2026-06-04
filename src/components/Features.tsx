const featureCards = [
  {
    emoji: "🧠",
    gradientFrom: "from-primary-600/20",
    gradientTo: "to-primary-400/10",
    title: "Brainstorm",
    desc: "Generate creative ideas and mind maps instantly. Overcome writer's block with collaborative AI prompting.",
  },
  {
    emoji: "÷",
    gradientFrom: "from-accent-200/30",
    gradientTo: "to-accent-50/10",
    title: "Summarize",
    desc: "Condense long documents and articles into key insights. Quickly extract actionable data from massive reports.",
  },
  {
    emoji: "🎓",
    gradientFrom: "from-primary-400/20",
    gradientTo: "to-accent-200/10",
    title: "Learn Anything",
    desc: "Personalized tutoring on any subject, from advanced mathematics to ancient history, adapted to your learning pace.",
  },
];

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-24">
      {/* Section header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-accent-50 border border-accent-200 text-accent-600 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5 shadow-sm">
          ✦ Features
        </div>
        <h2 className="text-4xl font-bold text-text tracking-tight leading-tight">
          Everything you need to work faster
        </h2>
        <p className="mt-4 text-text-muted max-w-lg mx-auto leading-relaxed">
          Powerful tools designed within a calm, distraction-free environment.
        </p>
      </div>

      {/* Top three cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-5">
        {featureCards.map((f) => (
          <div
            key={f.title}
            className="group bg-card border border-border/40 rounded-2xl p-7 hover:border-primary-400/60 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary-600/5 transition-all duration-300 cursor-default"
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradientFrom} ${f.gradientTo} flex items-center justify-center text-2xl mb-6 border border-border/20`}
            >
              {f.emoji}
            </div>
            <h3 className="font-semibold text-text text-base mb-2">{f.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Write Code — wide showcase card */}
      <div className="group bg-card border border-border/40 rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center hover:border-primary-400/50 hover:shadow-xl hover:shadow-primary-600/5 transition-all duration-300">
        {/* Left copy */}
        <div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600/25 to-accent-200/15 flex items-center justify-center font-mono text-primary-600 text-base font-bold mb-6 border border-border/20">
            &lt;/&gt;
          </div>
          <h3 className="text-text text-xl font-bold mb-3">Write Code</h3>
          <p className="text-text-muted text-sm leading-relaxed">
            Debug and draft code across multiple languages with ease. Get precise,
            context-aware suggestions inline.
          </p>
          {/* Language pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["Python", "TypeScript", "Go", "Rust"].map((lang) => (
              <span
                key={lang}
                className="text-[11px] bg-primary-50 text-primary-600 border border-primary-200 px-2.5 py-1 rounded-full font-semibold tracking-wide"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Code block */}
        <div className="relative">
          {/* Glow */}
          <div
            aria-hidden
            className="absolute -inset-2 bg-primary-600/5 rounded-2xl blur-xl pointer-events-none"
          />
          <pre className="relative bg-bg border border-border/40 rounded-xl p-5 font-mono text-sm text-accent-400 overflow-x-auto leading-[1.75]">
            <code>{`function initChattie() {
  const ai = new Companion();
  ai.brainstorm("New App");
  return ai.accelerate();
}`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}