// Demo route — renders the results panel with fixture data.
// Useful for design reviews and screenshots without needing an API key.

import { ResultsPanel } from '@/components/ResultsPanel';
import { StarMark } from '@/components/StarMark';

const FIXTURE = {
  results: [
    { symbol: 'AAPL', status: 'compliant',     methodology: 'AAOIFI', price: 188.42 },
    { symbol: 'MSFT', status: 'compliant',     methodology: 'AAOIFI', price: 412.16 },
    { symbol: 'JNJ',  status: 'compliant',     methodology: 'AAOIFI', price: 156.08 },
    { symbol: 'TSLA', status: 'compliant',     methodology: 'AAOIFI', price: 247.93 },
    { symbol: 'JPM',  status: 'non-compliant', methodology: 'AAOIFI', price: 211.50 },
    { symbol: 'BA',   status: 'non-compliant', methodology: 'AAOIFI', price:  74.18 },
    { symbol: 'NVDA', status: 'compliant',     methodology: 'AAOIFI', price: 138.07 },
    { symbol: 'KO',   status: 'compliant',     methodology: 'AAOIFI', price:  62.41 },
    { symbol: 'F',    status: 'non-compliant', methodology: 'AAOIFI', price:  10.32 },
  ],
  summary: {
    compliant_pct: 73.4,
    purification_owed: 47,
    total_value: 18420,
    holdings: 9,
  },
};

export default function Demo() {
  return (
    <main className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-16 py-10 md:py-14">
      <header className="masthead py-5 mb-12 md:mb-16">
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-end gap-4">
            <StarMark size={36} className="text-ink mb-1" />
            <div>
              <div className="kicker mb-1">Vol. I · No. 01</div>
              <h1 className="display text-4xl md:text-5xl leading-none">Halal Portfolio</h1>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end text-right">
            <div className="kicker mb-1">Demo</div>
            <div className="text-sm italic text-ink-soft" style={{ fontFamily: 'var(--font-fraunces)' }}>
              fixture data
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-20">
        <aside className="text-ink-mute italic text-sm" style={{ fontFamily: 'var(--font-fraunces)' }}>
          (form omitted — demo route)
        </aside>
        <section>
          <ResultsPanel loading={false} result={FIXTURE} hasInput />
        </section>
      </div>
    </main>
  );
}
