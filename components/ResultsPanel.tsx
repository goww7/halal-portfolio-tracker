'use client';

import { AnimatedNumber } from './AnimatedNumber';
import { StarMark } from './StarMark';

type Item = {
  symbol: string;
  status: string;
  methodology?: string;
  price?: number;
  reasons?: string[];
};

type Result = {
  results: Item[];
  summary: {
    compliant_pct: number | null;
    purification_owed: number | null;
    total_value: number | null;
    holdings: number;
  };
};

function classify(s: string): 'pass' | 'fail' | 'warn' {
  // Order matters: "non-compliant" contains "compliant", so fail must be checked first.
  if (/fail|non[\s-]?compliant|haram|reject/i.test(s)) return 'fail';
  if (/pass|compliant|halal|accept/i.test(s)) return 'pass';
  return 'warn';
}

function statusWord(s: string) {
  const c = classify(s);
  return c === 'pass' ? 'Compliant' : c === 'fail' ? 'Non-compliant' : 'Under review';
}

export function ResultsPanel({
  loading,
  result,
  hasInput,
}: {
  loading: boolean;
  result: Result | null;
  hasInput: boolean;
}) {
  if (loading) return <Loading />;
  if (!result) return <EmptyState hasInput={hasInput} />;
  return <ResultsView result={result} />;
}

function EmptyState({ hasInput }: { hasInput: boolean }) {
  return (
    <div className="border-l border-rule pl-10 py-4 lg:min-h-[420px] flex flex-col justify-center">
      <div className="kicker mb-6">II · The reading</div>
      <h2 className="display text-5xl md:text-6xl mb-6 max-w-[16ch]">
        A quiet reading of your <em className="display-italic">holdings</em>.
      </h2>
      <p
        className="text-lg text-ink-soft max-w-[44ch] leading-relaxed"
        style={{ fontFamily: 'var(--font-fraunces)' }}
      >
        Enter your portfolio on the left. We screen each name against the AAOIFI Shariah
        methodology — debt, illicit revenue, and liquid-asset ratios — and return a
        compliance reading you can act on.
      </p>
      {!hasInput && (
        <p className="mt-8 text-xs uppercase tracking-kicker text-ink-mute">
          Awaiting input
        </p>
      )}
      <div className="girih-rule mt-12 max-w-xs" />
    </div>
  );
}

function Loading() {
  return (
    <div className="border-l border-rule pl-10 py-4 lg:min-h-[420px] flex flex-col justify-center">
      <div className="flex items-center gap-4 text-ink-mute">
        <StarMark size={20} spin />
        <span className="kicker">Screening — please hold</span>
      </div>
    </div>
  );
}

function ResultsView({ result }: { result: Result }) {
  const { results, summary } = result;
  const pct = summary.compliant_pct ?? 0;
  const cls = pct >= 95 ? 'pass' : pct < 70 ? 'fail' : 'warn';
  const verdict =
    cls === 'pass'
      ? 'Largely compliant.'
      : cls === 'fail'
        ? 'Substantial non-compliance.'
        : 'Mixed reading.';

  const passCount = results.filter((r) => classify(r.status) === 'pass').length;
  const failCount = results.filter((r) => classify(r.status) === 'fail').length;

  return (
    <div className="border-l border-rule pl-6 md:pl-10">
      {/* === Hero — pull-quote stat === */}
      <header className="reveal" style={{ animationDelay: '40ms' }}>
        <div className="kicker mb-6">II · The reading</div>

        <p
          className="text-lg md:text-xl italic max-w-[36ch] mb-8"
          style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--ink-soft)' }}
        >
          {verdict}
        </p>

        <div
          className="display hero-pct flex items-baseline gap-2"
          style={{ color: cls === 'pass' ? 'var(--moss)' : cls === 'fail' ? 'var(--clay)' : 'var(--saffron)' }}
        >
          <AnimatedNumber value={pct} decimals={1} />
          <span className="symbol">%</span>
        </div>

        <p
          className="display-italic text-2xl md:text-3xl mt-3 text-ink-soft"
        >
          of holdings, by value, pass screening.
        </p>
      </header>

      <div className="girih-rule my-12 max-w-md reveal" style={{ animationDelay: '180ms' }} />

      {/* === Sub-stats row === */}
      <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 mb-16" style={{ animationDelay: '260ms' }}>
        <Stat label="Holdings" value={String(summary.holdings)} />
        <Stat
          label="Compliant"
          value={`${passCount}`}
          sub={failCount > 0 ? `${failCount} failed` : undefined}
        />
        <Stat
          label="Total value"
          value={
            summary.total_value != null
              ? `$${summary.total_value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
              : '—'
          }
        />
        <Stat
          label="Purification"
          value={
            summary.purification_owed != null
              ? `$${summary.purification_owed.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
              : '—'
          }
          sub="estimated"
        />
      </div>

      {/* === Holdings table === */}
      <div className="reveal" style={{ animationDelay: '380ms' }}>
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="display text-3xl">Per-holding ledger.</h3>
          <span className="kicker">III · Detail</span>
        </div>

        <table className="holdings">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Status</th>
              <th>Methodology</th>
              <th className="text-right">Last price</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr
                key={r.symbol}
                className="reveal"
                style={{ animationDelay: `${420 + i * 50}ms` }}
              >
                <td>
                  <span className="num text-base font-medium">{r.symbol}</span>
                </td>
                <td>
                  <span className={`status status-${classify(r.status)}`}>
                    {statusWord(r.status)}
                  </span>
                </td>
                <td>
                  <span className="text-sm text-ink-soft tracking-wide">
                    {r.methodology || 'AAOIFI'}
                  </span>
                </td>
                <td className="text-right">
                  <span className="num text-sm text-ink-soft">
                    {r.price != null ? `$${r.price.toFixed(2)}` : '—'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <div className="kicker mb-2">{label}</div>
      <div className="display text-3xl md:text-4xl mb-1" style={{ lineHeight: 1 }}>
        <span className="num font-medium">{value}</span>
      </div>
      {sub && (
        <div
          className="text-xs italic text-ink-mute"
          style={{ fontFamily: 'var(--font-fraunces)' }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
