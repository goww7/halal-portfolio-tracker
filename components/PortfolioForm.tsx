'use client';

import { useState } from 'react';
import { ResultsTable } from './ResultsTable';

type Row = { symbol: string; shares: string };

const SAMPLE: Row[] = [
  { symbol: 'AAPL', shares: '10' },
  { symbol: 'MSFT', shares: '5' },
  { symbol: 'JNJ', shares: '8' },
];

export function PortfolioForm() {
  const [rows, setRows] = useState<Row[]>(SAMPLE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  function update(i: number, patch: Partial<Row>) {
    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }
  function addRow() {
    setRows((rs) => [...rs, { symbol: '', shares: '' }]);
  }
  function removeRow(i: number) {
    setRows((rs) => rs.filter((_, idx) => idx !== i));
  }

  async function scan() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const holdings = rows
        .filter((r) => r.symbol.trim())
        .map((r) => ({
          symbol: r.symbol.trim().toUpperCase(),
          shares: Number(r.shares) || 0,
        }));
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ holdings }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
      setResult(json);
    } catch (err: any) {
      setError(err?.message || 'Scan failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-[1fr_120px_40px] gap-3 text-xs font-medium uppercase tracking-wide text-slate-500">
          <div>Ticker</div>
          <div>Shares</div>
          <div></div>
        </div>
        <div className="mt-2 space-y-2">
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_120px_40px] gap-3">
              <input
                value={r.symbol}
                onChange={(e) => update(i, { symbol: e.target.value })}
                placeholder="AAPL"
                className="rounded-lg border border-slate-200 px-3 py-2 font-mono uppercase outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
              <input
                value={r.shares}
                onChange={(e) => update(i, { shares: e.target.value })}
                placeholder="0"
                inputMode="decimal"
                className="rounded-lg border border-slate-200 px-3 py-2 text-right outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Remove row"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={addRow}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            + Add holding
          </button>
          <button
            type="button"
            onClick={scan}
            disabled={loading || rows.every((r) => !r.symbol.trim())}
            className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? 'Scanning…' : 'Scan portfolio'}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {result && <ResultsTable result={result} />}
    </div>
  );
}
