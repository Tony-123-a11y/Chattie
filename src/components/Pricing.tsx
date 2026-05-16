export default function Pricing() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-primary-900">Simple, transparent pricing</h2>
        <p className="mt-3 text-text-muted">Start for free, upgrade when you need more power.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-primary-900">Free</h3>
          <div className="mt-3 text-4xl font-semibold text-primary-900">
            $0<span className="text-base text-text-muted font-normal">/mo</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            <Bullet>Basic chat capabilities</Bullet>
            <Bullet>Standard response speed</Bullet>
            <Bullet muted>Limited code generation</Bullet>
          </ul>
          <button className="mt-8 w-full bg-primary-50 text-primary-800 py-3 rounded-md text-sm font-medium">
            Current Plan
          </button>
        </div>

        <div className="bg-primary-50 rounded-xl p-8 border-2 border-primary-400 relative">
          <span className="absolute -top-3 right-6 bg-primary-800 text-white text-xs px-3 py-1 rounded-full">
            MOST POPULAR
          </span>
          <h3 className="text-xl font-semibold text-primary-900">Pro</h3>
          <div className="mt-3 text-4xl font-semibold text-primary-900">
            $20<span className="text-base text-text-muted font-normal">/mo</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            <Bullet>Advanced AI reasoning</Bullet>
            <Bullet>Fastest response speed</Bullet>
            <Bullet>Unlimited code &amp; data analysis</Bullet>
            <Bullet>Priority support</Bullet>
          </ul>
          <button className="mt-8 w-full bg-primary-800 hover:bg-primary-900 text-white py-3 rounded-md text-sm font-medium">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </section>
  );
}

function Bullet({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <li className="flex items-center gap-2">
      <span className={muted ? "text-text-muted" : "text-accent-400"}>✓</span>
      <span className={muted ? "text-text-muted" : "text-text"}>{children}</span>
    </li>
  );
}