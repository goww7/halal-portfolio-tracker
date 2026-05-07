const BASE_URL = process.env.HALAL_API_BASE || 'https://api.halalterminal.com';

function key() {
  const k = process.env.HALAL_TERMINAL_API_KEY;
  if (!k) throw new Error('HALAL_TERMINAL_API_KEY not set. Get a free key at halalterminal.com');
  return k;
}

export type Holding = { symbol: string; shares: number };

export type ScanItem = {
  symbol: string;
  status: string;
  methodology?: string;
  ratios?: Record<string, number>;
  reasons?: string[];
  price?: number;
};

export type ScanResult = {
  results: ScanItem[];
  summary: {
    compliant_pct: number | null;
    purification_owed: number | null;
    total_value: number | null;
    holdings: number;
  };
};

export class HalalApiError extends Error {
  status: number;
  code?: string;
  constructor(msg: string, status: number, code?: string) {
    super(msg);
    this.status = status;
    this.code = code;
  }
}

async function call(method: string, path: string, body?: unknown) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'X-API-Key': key(),
      'Content-Type': 'application/json',
      'User-Agent': 'halal-portfolio-tracker/0.1',
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  const text = await res.text();
  let json: any;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!res.ok) {
    const msg = json?.message || json?.error || `HTTP ${res.status}`;
    throw new HalalApiError(msg, res.status, json?.code);
  }
  return json;
}

function classify(raw: string): 'pass' | 'fail' | 'warn' {
  // Order matters: "non-compliant" contains "compliant", so fail must be checked first.
  if (/fail|non[\s-]?compliant|haram|reject/i.test(raw)) return 'fail';
  if (/pass|compliant|halal|accept/i.test(raw)) return 'pass';
  return 'warn';
}

export function badgeFor(status: string) {
  const cls = classify(status);
  return {
    label: cls === 'pass' ? 'Halal' : cls === 'fail' ? 'Non-compliant' : status || 'Unknown',
    icon: cls === 'pass' ? '✅' : cls === 'fail' ? '❌' : '⚠️',
    color: cls,
  };
}

export async function scanPortfolio(holdings: Holding[]): Promise<ScanResult> {
  const symbols = holdings.map((h) => h.symbol.toUpperCase());

  // Don't swallow auth errors — they masquerade as 'all non-compliant' downstream.
  // If the screen call fails, propagate. Quote failures are non-fatal (we just
  // skip price/value computation).
  const [scan, quotes] = await Promise.all([
    call('POST', '/api/portfolio/scan', { symbols }),
    call('POST', '/api/quotes/batch', { symbols }).catch(() => null),
  ]);

  const rawResults: any[] = scan?.results || scan?.holdings || [];
  const quoteMap = new Map<string, number>();
  const quoteList: any[] = quotes?.quotes || quotes?.results || quotes || [];
  for (const q of Array.isArray(quoteList) ? quoteList : []) {
    const sym = (q.symbol || q.ticker || '').toUpperCase();
    const price = q.price ?? q.regularMarketPrice;
    if (sym && typeof price === 'number') quoteMap.set(sym, price);
  }

  const results: ScanItem[] = rawResults.map((r) => {
    const symbol = (r.symbol || r.ticker || '').toUpperCase();
    return {
      symbol,
      status: r.status || r.compliance || r.verdict || 'unknown',
      methodology: r.methodology || r.standard,
      ratios: r.ratios || r.financial_ratios,
      reasons: r.reasons || r.failures,
      price: quoteMap.get(symbol),
    };
  });

  let totalValue = 0;
  let compliantValue = 0;
  let purification = 0;
  for (const h of holdings) {
    const sym = h.symbol.toUpperCase();
    const price = quoteMap.get(sym) ?? 0;
    const value = price * h.shares;
    totalValue += value;
    const item = results.find((r) => r.symbol === sym);
    if (item && classify(item.status) === 'pass') compliantValue += value;
    if (item) {
      const purRatio = (item.ratios as any)?.purification_ratio;
      if (typeof purRatio === 'number') purification += purRatio * value;
    }
  }

  return {
    results,
    summary: {
      compliant_pct: totalValue > 0 ? (compliantValue / totalValue) * 100 : null,
      purification_owed: purification > 0 ? Number(purification.toFixed(2)) : null,
      total_value: totalValue > 0 ? Number(totalValue.toFixed(2)) : null,
      holdings: holdings.length,
    },
  };
}
