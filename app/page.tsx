import { PortfolioForm } from '@/components/PortfolioForm';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
          <span aria-hidden>●</span> Open source · MIT
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Halal Portfolio Tracker
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Enter your holdings — get per-stock Shariah compliance, portfolio-level halal %,
          and purification owed. Free, self-hostable, no signup required.
        </p>
      </header>

      <PortfolioForm />

      <footer className="mt-16 border-t border-slate-200 pt-6 text-sm text-slate-500">
        <p>
          Powered by{' '}
          <a
            href="https://halalterminal.com"
            className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
            target="_blank"
            rel="noreferrer"
          >
            Halal Terminal API
          </a>
          {' '}— get a free key (200 screens/month, no credit card).
        </p>
        <p className="mt-2 text-xs">
          Automated screening, not a fatwa. Consult a qualified scholar for personal rulings.
        </p>
      </footer>
    </main>
  );
}
