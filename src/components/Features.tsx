export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border border-border/30 rounded-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-primary-900">
          Everything you need to work faster
        </h2>
        <p className="mt-3 text-text-muted">
          Powerful tools designed within a calm, distraction-free environment.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card
          iconBg="bg-primary-50"
          iconColor="text-primary-600"
          title="Brainstorm"
          desc="Generate creative ideas and mind maps instantly. Overcome writer's block with collaborative AI prompting."
          icon="🧠"
        />
        <Card
          iconBg="bg-accent-50"
          iconColor="text-accent-600"
          title="Summarize"
          desc="Condense long documents and articles into key insights. Quickly extract actionable data from massive reports."
          icon="÷"
        />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6 bg-[#1f1f1f] rounded-xl p-8 items-center">
        <div>
          <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white mb-4">
            {"<>"}
          </div>
          <h3 className="text-white text-xl font-semibold">Write Code</h3>
          <p className="text-white/70 mt-2 text-sm">
            Debug and draft code across multiple languages with ease. Get precise, context-aware suggestions inline.
          </p>
        </div>
        <pre className="bg-black/40 rounded-lg p-4 font-mono text-sm text-green-300 overflow-x-auto">
{`function initChattie() {
  const ai = new Companion();
  ai.brainstorm("New App");
  return ai.accelerate();
}`}
        </pre>
      </div>

      <div className="mt-6 bg-surface/60 rounded-xl p-10 text-center">
        <div className="w-10 h-10 mx-auto rounded-full bg-primary-50 flex items-center justify-center text-primary-600 mb-4">
          🎓
        </div>
        <h3 className="text-lg font-semibold text-primary-900">Learn Anything</h3>
        <p className="mt-2 text-text-muted max-w-xl mx-auto text-sm">
          Personalized tutoring on any subject, from advanced mathematics to ancient history, adapted to your learning pace.
        </p>
      </div>
    </section>
  );
}

function Card({ iconBg, iconColor, title, desc, icon }: {
  iconBg: string; iconColor: string; title: string; desc: string; icon: string;
}) {
  return (
    <div className="bg-surface/60 rounded-xl p-8">
      <div className={`w-10 h-10 rounded-full ${iconBg} ${iconColor} flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-primary-900">{title}</h3>
      <p className="mt-2 text-text-muted text-sm">{desc}</p>
    </div>
  );
}