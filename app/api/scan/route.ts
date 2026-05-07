import { NextResponse } from 'next/server';
import { scanPortfolio, type Holding } from '@/lib/halal';

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
    return NextResponse.json({ error: err?.message || 'Scan failed' }, { status: 500 });
  }
}
