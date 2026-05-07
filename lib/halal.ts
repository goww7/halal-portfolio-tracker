const BASE_URL = process.env.HALAL_API_BASE || 'https://api.halalterminal.com';

function key() {
  const k = process.env.HALAL_TERMINAL_API_KEY;
  if (!k) throw new Error('HALAL_TERMINAL_API_KEY not set. Get a free key at halalterminal.com');
  return k;
}

export type Holding = { symbol: string; shares: number };

export type ScanItem = {
  symbol: string;
  is_compliant: boolean | null;
  business_screen_pass: boolean | null;
  business_screen_reason?: string;
  financial_screen_pass: boolean | null;
  methodology: string;
  per_methodology: {
    aaoifi: boolean | null;
    djim: boolean | null;
    ftse: boolean | null;
    msci: boolean | null;
    sp: boolean | null;
  };
  purification_rate: number | null;
  sector?: string;
  industry?: string;
  price?: number;
  error?: string | null;
};

export type ScanResult = {
  results: ScanItem[];
  summary: {
    holdings: number;
    compliant_count: number;
    non_compliant_count: number;
    pending_count: number;
    compliant_pct: number | null;
    avg_purification_rate: number | null;
    total_value: number | null;
    compliant_value: number | null;
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
      'User-Agent': 'halal-portfolio-tracker/0.2',
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

export function classifyItem(item: ScanItem): 'pass' | 'fail' | 'warn' {
  if (item.is_compliant === true) return 'pass';
  if (item.is_compliant === false) return 'fail';
  return 'warn';
}

export function statusWord(item: ScanItem): string {
  if (item.error) return 'Error';
  if (item.is_compliant === true) return 'Compliant';
  if (item.is_compliant === false) return 'Non-compliant';
  return 'Pending';
}

export async function scanPortfolio(holdings: Holding[]): Promise<ScanResult> {
  const symbols = holdings.map((h) => h.symbol.toUpperCase());

  // Auth errors must propagate; quote failures stay non-fatal (cosmetic only).
  const [scan, quotes] = await Promise.all([
    call('POST', '/api/portfolio/scan', { symbols }),
    call('POST', '/api/quotes/batch', { symbols }).catch(() => null),
  ]);

  // /api/portfolio/scan returns { results: { AAPL: {...}, MSFT: {...} }, summary: {...} }
  const rawResults: Record<string, any> = scan?.results || {};
  // /api/quotes/batch returns { AAPL: { price: ..., ... }, MSFT: {...} }
  const quoteMap: Record<string, any> = quotes && typeof quotes === 'object' ? quotes : {};

  // Preserve user's input ordering rather than the API's response order.
  const results: ScanItem[] = symbols.map((sym) => {
    const r = rawResults[sym] || {};
    const q = quoteMap[sym];
    return {
      symbol: sym,
      is_compliant: typeof r.is_compliant === 'boolean' ? r.is_compliant : null,
      business_screen_pass:
        typeof r.business_screen_pass === 'boolean' ? r.business_screen_pass : null,
      business_screen_reason: r.business_screen_reason,
      financial_screen_pass:
        typeof r.financial_screen_pass === 'boolean' ? r.financial_screen_pass : null,
      methodology: 'AAOIFI',
      per_methodology: {
        aaoifi: typeof r.aaoifi_compliant === 'boolean' ? r.aaoifi_compliant : null,
        djim: typeof r.djim_compliant === 'boolean' ? r.djim_compliant : null,
        ftse: typeof r.ftse_compliant === 'boolean' ? r.ftse_compliant : null,
        msci: typeof r.msci_compliant === 'boolean' ? r.msci_compliant : null,
        sp: typeof r.sp_compliant === 'boolean' ? r.sp_compliant : null,
      },
      purification_rate: typeof r.purification_rate === 'number' ? r.purification_rate : null,
      sector: r.sector,
      industry: r.industry,
      price: typeof q?.price === 'number' ? q.price : undefined,
      error: r.error_message || r.error || null,
    };
  });

  // Value-weighted compliance: more meaningful than count-based for a portfolio.
  let totalValue = 0;
  let compliantValue = 0;
  for (let i = 0; i < holdings.length; i++) {
    const h = holdings[i];
    const item = results[i];
    const price = item.price ?? 0;
    const value = price * h.shares;
    totalValue += value;
    if (item.is_compliant === true) compliantValue += value;
  }

  const apiSummary = scan?.summary || {};
  const compliantCount = results.filter((r) => r.is_compliant === true).length;
  const nonCompliantCount = results.filter((r) => r.is_compliant === false).length;
  const pendingCount = results.filter((r) => r.is_compliant == null).length;

  // Prefer value-weighted compliance when we have prices, else fall back to count.
  const compliant_pct =
    totalValue > 0
      ? (compliantValue / totalValue) * 100
      : results.length > 0
        ? (compliantCount / results.length) * 100
        : null;

  return {
    results,
    summary: {
      holdings: results.length,
      compliant_count: compliantCount,
      non_compliant_count: nonCompliantCount,
      pending_count: pendingCount,
      compliant_pct,
      avg_purification_rate:
        typeof apiSummary.avg_purification_rate === 'number'
          ? apiSummary.avg_purification_rate
          : null,
      total_value: totalValue > 0 ? Number(totalValue.toFixed(2)) : null,
      compliant_value: totalValue > 0 ? Number(compliantValue.toFixed(2)) : null,
    },
  };
}
