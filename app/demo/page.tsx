// Demo route — renders the results panel with fixture data.
// Useful for design reviews and screenshots without needing an API key.

import { ResultsPanel } from '@/components/ResultsPanel';
import { StarMark } from '@/components/StarMark';

const mk = (overrides: any) => ({
  business_screen_pass: true,
  financial_screen_pass: true,
  business_screen_reason: undefined,
  methodology: 'AAOIFI',
  purification_rate: 0.012,
  ...overrides,
});

const FIXTURE = {
  results: [
    mk({ symbol: 'AAPL', is_compliant: true,  sector: 'Technology', price: 288.17 }),
    mk({ symbol: 'MSFT', is_compliant: true,  sector: 'Technology', price: 420.95 }),
    mk({ symbol: 'JNJ',  is_compliant: true,  sector: 'Healthcare', price: 156.08 }),
    mk({ symbol: 'TSLA', is_compliant: true,  sector: 'Consumer Cyclical', price: 247.93 }),
    mk({ symbol: 'JPM',  is_compliant: false, business_screen_pass: false, business_screen_reason: 'Conventional banking — interest-based revenue exceeds threshold.', sector: 'Financial Services', price: 211.50 }),
    mk({ symbol: 'BA',   is_compliant: false, business_screen_pass: false, business_screen_reason: 'Defense exposure exceeds revenue threshold.', sector: 'Industrials', price: 74.18 }),
    mk({ symbol: 'NVDA', is_compliant: true,  sector: 'Technology', price: 138.07 }),
    mk({ symbol: 'KO',   is_compliant: true,  sector: 'Consumer Defensive', price: 62.41 }),
    mk({ symbol: 'F',    is_compliant: false, business_screen_pass: true, financial_screen_pass: false, business_screen_reason: 'Debt-to-market-cap ratio exceeds 33%.', sector: 'Consumer Cyclical', price: 10.32 }),
  ],
  summary: {
    holdings: 9,
    compliant_count: 6,
    non_compliant_count: 3,
    pending_count: 0,
    compliant_pct: 73.4,
    avg_purification_rate: 2.12,
    total_value: 18420,
    compliant_value: 13520,
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
