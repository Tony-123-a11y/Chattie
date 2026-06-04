export default function Pricing() {
  return (
    <section id="pricing" className="max-w-5xl mx-auto px-6 py-24 scroll-mt-24">
      {/* Section header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-600 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5 shadow-sm">
          ✦ Pricing
        </div>
        <h2 className="text-4xl font-bold text-text tracking-tight">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-text-muted">
          Start for free, upgrade when you need more power.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* ── Free plan ── */}
        <div className="flex flex-col bg-card border border-border/40 rounded-2xl p-8 hover:border-primary-400/40 hover:shadow-lg transition-all duration-300">
          <div>
            <h3 className="text-lg font-bold text-text">Free</h3>
            <p className="text-text-muted text-sm mt-1">Everything you need to get started.</p>
          </div>

          <div className="mt-8 flex items-end gap-1.5">
            <span className="text-5xl font-bold tracking-tight text-text">$0</span>
            <span className="text-text-muted text-sm mb-1.5">/month</span>
          </div>

          <div className="mt-8 h-px bg-border/30" />

          <ul className="mt-7 space-y-3.5 flex-1">
            <Bullet>Basic chat capabilities</Bullet>
            <Bullet>Standard response speed</Bullet>
            <Bullet muted>Limited code generation</Bullet>
          </ul>

          <button className="cursor-pointer mt-8 w-full bg-surface hover:bg-primary-50 border border-border/60 hover:border-primary-400 text-text hover:text-primary-800 py-3 rounded-xl text-sm font-semibold transition-all duration-200">
            Current Plan
          </button>
        </div>

        {/* ── Pro plan ── */}
        <div className="relative flex flex-col bg-gradient-to-br from-primary-800 via-primary-800 to-primary-600 rounded-2xl p-8 shadow-2xl shadow-primary-800/25 hover:shadow-primary-800/40 hover:-translate-y-1 transition-all duration-300">
          {/* Popular badge */}
          <span className="absolute -top-3.5 right-6 bg-accent-200 text-accent-800 text-[11px] font-bold px-3.5 py-1.5 rounded-full tracking-wide shadow-md">
            MOST POPULAR
          </span>

          {/* Subtle inner gradient shine */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200/30 to-transparent rounded-t-2xl"
          />

          <div>
            <h3 className="text-lg font-bold text-primary-50">Pro</h3>
            <p className="text-primary-200/80 text-sm mt-1">Unlock the full power of AI.</p>
          </div>

          <div className="mt-8 flex items-end gap-1.5">
            <span className="text-5xl font-bold tracking-tight text-primary-50">$20</span>
            <span className="text-primary-200/70 text-sm mb-1.5">/month</span>
          </div>

          <div className="mt-8 h-px bg-primary-200/20" />

          <ul className="mt-7 space-y-3.5 flex-1">
            <BulletPro>Advanced AI reasoning</BulletPro>
            <BulletPro>Fastest response speed</BulletPro>
            <BulletPro>Unlimited code &amp; data analysis</BulletPro>
            <BulletPro>Priority support</BulletPro>
          </ul>

          <button className="cursor-pointer mt-8 w-full bg-primary-50 hover:bg-card text-primary-800 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Shared bullet components ── */

function Bullet({
  children,
  muted,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
          muted
            ? "bg-surface text-text-muted"
            : "bg-accent-50 text-accent-600 border border-accent-200"
        }`}
      >
        ✓
      </span>
      <span className={`text-sm ${muted ? "text-text-muted" : "text-text"}`}>
        {children}
      </span>
    </li>
  );
}

function BulletPro({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <span className="w-5 h-5 rounded-full bg-primary-50/20 text-primary-100 border border-primary-200/20 flex items-center justify-center text-[11px] font-bold flex-shrink-0">
        ✓
      </span>
      <span className="text-sm text-primary-100">{children}</span>
    </li>
  );
}