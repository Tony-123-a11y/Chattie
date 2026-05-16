export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-5xl font-semibold leading-tight">
          <span className="text-primary-900">Your Ideas,</span>
          <br />
          <span className="text-primary-600">Accelerated</span>
        </h1>
        <p className="mt-6 text-text-muted max-w-md">
          The most capable AI companion for brainstorming, coding, and learning.
          Experience conversational clarity in a clean, focused workspace.
        </p>
        <div className="mt-8 flex gap-3">
          <button className="bg-primary-800 hover:bg-primary-900 text-white px-5 py-3 rounded-md text-sm font-medium inline-flex items-center gap-2">
            Get Started Free <span aria-hidden>→</span>
          </button>
          <button className="bg-white border border-border/40 text-text px-5 py-3 rounded-md text-sm font-medium">
            View Demo
          </button>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden shadow-lg bg-black aspect-[4/3] flex items-center justify-center">
        <div className="text-primary-200 text-sm">[ AI Companion Visual ]</div>
      </div>
    </section>
  );
}