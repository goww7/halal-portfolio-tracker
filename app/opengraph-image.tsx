import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Halal Portfolio — A Compliance Journal';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadFont(name: string) {
  return readFile(join(process.cwd(), 'public', 'fonts', name));
}

export default async function Image() {
  const [fraunces, fraunceItalic, plexSans] = await Promise.all([
    loadFont('Fraunces-Regular.ttf'),
    loadFont('Fraunces-Italic.ttf'),
    loadFont('IBMPlexSans-Regular.ttf'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#f4ede1',
          color: '#0e0c0a',
          fontFamily: 'PlexSans',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Double rule — top */}
        <div style={{ display: 'flex', flexDirection: 'column', height: 7 }}>
          <div style={{ height: 2, background: '#0e0c0a' }} />
          <div style={{ flex: 1 }} />
          <div style={{ height: 1, background: '#0e0c0a' }} />
        </div>

        {/* === MASTHEAD === */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingBottom: 24,
            paddingTop: 22,
            borderBottom: '1px solid #0e0c0a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
            <Star size={64} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: 16,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#6b5f4d',
                  marginBottom: 6,
                }}
              >
                Vol. I · No. 01
              </div>
              <div
                style={{
                  fontFamily: 'Fraunces',
                  fontSize: 88,
                  letterSpacing: '-0.025em',
                  lineHeight: 0.92,
                }}
              >
                Halal Portfolio
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              textAlign: 'right',
            }}
          >
            <div
              style={{
                fontSize: 14,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#6b5f4d',
                marginBottom: 4,
              }}
            >
              A Compliance Journal
            </div>
            <div
              style={{
                fontFamily: 'FrauncesItalic',
                fontSize: 24,
                color: '#2c2620',
              }}
            >
              halalterminal.com
            </div>
          </div>
        </div>

        {/* === HERO === */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            paddingTop: 30,
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 16,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#6b5f4d',
              marginBottom: 24,
            }}
          >
            On the question of compliance —
          </div>

          <div
            style={{
              fontFamily: 'Fraunces',
              fontSize: 96,
              lineHeight: 0.96,
              letterSpacing: '-0.025em',
            }}
          >
            A quiet reading
          </div>
          <div
            style={{
              fontFamily: 'FrauncesItalic',
              fontSize: 96,
              lineHeight: 0.96,
              letterSpacing: '-0.025em',
              marginTop: 4,
              marginBottom: 56,
            }}
          >
            of your holdings.
          </div>

          <div
            style={{
              fontFamily: 'FrauncesItalic',
              fontSize: 26,
              lineHeight: 1.35,
              color: '#2c2620',
              maxWidth: 880,
            }}
          >
            Per-stock Shariah screening, portfolio compliant %, and purification owed —
            free, open-source, self-hosted.
          </div>
        </div>

        {/* === FOOTER === */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 22,
            borderTop: '1px solid #0e0c0a',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 28,
              fontSize: 18,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#0e0c0a',
            }}
          >
            <span>AAOIFI</span>
            <span style={{ color: '#c9bfae' }}>·</span>
            <span>DJIM</span>
            <span style={{ color: '#c9bfae' }}>·</span>
            <span>FTSE</span>
            <span style={{ color: '#c9bfae' }}>·</span>
            <span>MSCI</span>
            <span style={{ color: '#c9bfae' }}>·</span>
            <span>S&P</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span
              style={{
                fontFamily: 'FrauncesItalic',
                fontSize: 22,
                color: '#2c2620',
              }}
            >
              Powered by Halal Terminal
            </span>
            <Star size={18} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: fraunces, weight: 400, style: 'normal' },
        { name: 'FrauncesItalic', data: fraunceItalic, weight: 400, style: 'italic' },
        { name: 'PlexSans', data: plexSans, weight: 400, style: 'normal' },
      ],
    },
  );
}

// 8-pointed rub el hizb. Inline SVG since ImageResponse won't read components.
function Star({ size }: { size: number }) {
  const inset = size * 0.18;
  const dim = size * 0.64;
  const c = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block' }}
    >
      <rect
        x={inset}
        y={inset}
        width={dim}
        height={dim}
        fill="none"
        stroke="#0e0c0a"
        strokeWidth={size * 0.022}
      />
      <rect
        x={inset}
        y={inset}
        width={dim}
        height={dim}
        fill="none"
        stroke="#0e0c0a"
        strokeWidth={size * 0.022}
        transform={`rotate(45 ${c} ${c})`}
      />
      <circle cx={c} cy={c} r={size * 0.04} fill="#0e0c0a" />
    </svg>
  );
}
