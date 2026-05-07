'use client';

import { useState } from 'react';
import { ResultsPanel } from './ResultsPanel';
import { StarMark } from './StarMark';

type Row = { symbol: string; shares: string };

const SAMPLE: Row[] = [
  { symbol: 'AAPL', shares: '12' },
  { symbol: 'MSFT', shares: '8' },
  { symbol: 'JNJ', shares: '15' },
  { symbol: 'TSLA', shares: '4' },
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
  function clearAll() {
    setRows([{ symbol: '', shares: '' }]);
    setResult(null);
    setError(null);
  }

  async function scan() {
    setLoading(true);
    setError(null);
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
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-20">
      {/* === LEFT COLUMN — entry === */}
      <aside className="lg:sticky lg:top-12 lg:self-start">
        <div className="kicker mb-4">I · Holdings</div>
        <h2 className="display text-3xl mb-1">Your ledger.</h2>
        <p className="text-sm text-ink-mute italic mb-8" style={{ fontFamily: 'var(--font-fraunces)' }}>
          Enter the names. Numbers, when you have them.
        </p>

        <div className="space-y-1">
          <div className="grid grid-cols-[1fr_120px_28px] gap-4 pb-2">
            <span className="kicker">Ticker</span>
            <span className="kicker text-right">Shares</span>
            <span></span>
          </div>

          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_120px_28px] items-center gap-4">
              <input
                value={r.symbol}
                onChange={(e) => update(i, { symbol: e.target.value })}
                placeholder="—"
                className="hairline-input uppercase tracking-wide font-medium"
                style={{ fontFamily: 'var(--font-plex-mono)' }}
                spellCheck={false}
              />
              <input
                value={r.shares}
                onChange={(e) => update(i, { shares: e.target.value })}
                placeholder="—"
                inputMode="decimal"
                className="hairline-input num"
              />
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="text-ink-mute/60 hover:text-clay text-lg leading-none transition-colors"
                aria-label="Remove row"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button type="button" onClick={addRow} className="btn-ghost">
            + Add line
          </button>
          {rows.some((r) => r.symbol.trim()) && (
            <button type="button" onClick={clearAll} className="btn-ghost">
              Clear
            </button>
          )}
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={scan}
            disabled={loading || rows.every((r) => !r.symbol.trim())}
            className="btn-editorial w-full justify-center"
          >
            {loading ? (
              <>
                <StarMark size={14} spin />
                <span>Reading</span>
              </>
            ) : (
              <>
                <span>Read the portfolio</span>
                <span aria-hidden>→</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="mt-6 text-sm text-clay italic" style={{ fontFamily: 'var(--font-fraunces)' }}>
            — {error}
          </p>
        )}
      </aside>

      {/* === RIGHT COLUMN — readout === */}
      <section className="min-w-0">
        <ResultsPanel loading={loading} result={result} hasInput={rows.some((r) => r.symbol.trim())} />
      </section>
    </div>
  );
}
