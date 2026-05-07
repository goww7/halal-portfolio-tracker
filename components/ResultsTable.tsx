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
  if (/pass|compliant|halal/i.test(s)) return 'pass';
  if (/fail|non-?compliant|haram/i.test(s)) return 'fail';
  return 'warn';
}

function Badge({ status }: { status: string }) {
  const cls = classify(status);
  const styles =
    cls === 'pass'
      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
      : cls === 'fail'
        ? 'bg-red-50 text-red-700 ring-red-200'
        : 'bg-amber-50 text-amber-700 ring-amber-200';
  const label = cls === 'pass' ? 'Halal' : cls === 'fail' ? 'Non-compliant' : status || 'Unknown';
  const icon = cls === 'pass' ? '✓' : cls === 'fail' ? '✗' : '!';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles}`}>
      <span aria-hidden>{icon}</span>
      {label}
    </span>
  );
}

export function ResultsTable({ result }: { result: Result }) {
  const { results, summary } = result;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Holdings" value={String(summary.holdings)} />
        <Stat
          label="Compliant"
          value={summary.compliant_pct != null ? `${summary.compliant_pct.toFixed(1)}%` : '—'}
          tone={summary.compliant_pct != null && summary.compliant_pct >= 95 ? 'pass' : summary.compliant_pct != null && summary.compliant_pct < 70 ? 'fail' : 'warn'}
        />
        <Stat
          label="Total value"
          value={summary.total_value != null ? `$${summary.total_value.toLocaleString()}` : '—'}
        />
        <Stat
          label="Purification"
          value={summary.purification_owed != null ? `$${summary.purification_owed.toLocaleString()}` : '—'}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Ticker</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Methodology</th>
              <th className="px-4 py-3 text-right font-medium">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((r) => (
              <tr key={r.symbol}>
                <td className="px-4 py-3 font-mono font-medium">{r.symbol}</td>
                <td className="px-4 py-3"><Badge status={r.status} /></td>
                <td className="px-4 py-3 text-slate-600">{r.methodology || 'AAOIFI'}</td>
                <td className="px-4 py-3 text-right tabular-nums text-slate-600">
                  {r.price != null ? `$${r.price.toFixed(2)}` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'pass' | 'fail' | 'warn' }) {
  const valueColor =
    tone === 'pass' ? 'text-emerald-600' : tone === 'fail' ? 'text-red-600' : tone === 'warn' ? 'text-amber-600' : 'text-slate-900';
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`mt-1 text-2xl font-semibold tabular-nums ${valueColor}`}>{value}</div>
    </div>
  );
}
