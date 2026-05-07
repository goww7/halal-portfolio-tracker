import { NextResponse } from 'next/server';
import { scanPortfolio, HalalApiError, type Holding } from '@/lib/halal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const holdings: Holding[] = Array.isArray(body?.holdings) ? body.holdings : [];
    const cleaned: Holding[] = holdings
      .filter((h) => h && typeof h.symbol === 'string')
      .map((h) => ({
        symbol: h.symbol.trim().toUpperCase(),
        shares: Number(h.shares) || 0,
      }))
      .filter((h) => h.symbol && h.shares >= 0)
      .slice(0, 100);

    if (cleaned.length === 0) {
      return NextResponse.json({ error: 'No holdings provided' }, { status: 400 });
    }

    const scan = await scanPortfolio(cleaned);
    return NextResponse.json(scan);
  } catch (err: any) {
    if (err instanceof HalalApiError) {
      const friendly =
        err.code === 'INVALID_API_KEY' || err.status === 401
          ? 'The Halal Terminal API key configured on this deployment is invalid. The site owner needs to update HALAL_TERMINAL_API_KEY.'
          : err.code === 'RATE_LIMITED' || err.status === 429
            ? 'Halal Terminal API quota exhausted for this deployment. Try again later or contact the site owner.'
            : err.message;
      return NextResponse.json(
        { error: friendly, code: err.code },
        { status: err.status >= 400 && err.status < 500 ? err.status : 502 },
      );
    }
    return NextResponse.json({ error: err?.message || 'Scan failed' }, { status: 500 });
  }
}
