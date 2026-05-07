import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Halal Portfolio — Demo reading';
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
          padding: '52px 80px',
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
            paddingBottom: 18,
            paddingTop: 16,
            borderBottom: '1px solid #0e0c0a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18 }}>
            <Star size={48} />
            <div
              style={{
                fontFamily: 'Fraunces',
                fontSize: 56,
                letterSpacing: '-0.025em',
                lineHeight: 0.92,
              }}
            >
              Halal Portfolio
            </div>
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#6b5f4d',
            }}
          >
            II · The reading
          </div>
        </div>

        {/* === STAT === */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 12,
          }}
        >
          <div
            style={{
              fontFamily: 'FrauncesItalic',
              fontSize: 40,
              color: '#2c2620',
              marginBottom: 8,
            }}
          >
            Mixed reading.
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              fontFamily: 'Fraunces',
              color: '#b08018',
              lineHeight: 0.9,
            }}
          >
            <span style={{ fontSize: 280, letterSpacing: '-0.04em' }}>73.4</span>
            <span
              style={{
                fontSize: 120,
                color: '#6b5f4d',
                marginLeft: 12,
                marginBottom: 24,
              }}
            >
              %
            </span>
          </div>
          <div
            style={{
              fontFamily: 'FrauncesItalic',
              fontSize: 38,
              color: '#2c2620',
              marginTop: 10,
            }}
          >
            of holdings, by value, pass screening.
          </div>
        </div>

        {/* === FOOTER === */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 18,
            borderTop: '1px solid #0e0c0a',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 14,
              fontSize: 18,
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 9,
                  background: '#2d5a3a',
                }}
              />
              <span
                style={{ fontFamily: 'FrauncesItalic', color: '#2d5a3a', fontSize: 22 }}
              >
                Compliant 6
              </span>
            </div>
            <span style={{ color: '#c9bfae' }}>·</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 9,
                  background: '#8b3a2f',
                }}
              />
              <span
                style={{ fontFamily: 'FrauncesItalic', color: '#8b3a2f', fontSize: 22 }}
              >
                Non-compliant 3
              </span>
            </div>
            <span style={{ color: '#c9bfae' }}>·</span>
            <span
              style={{
                fontFamily: 'PlexSans',
                fontSize: 18,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#0e0c0a',
              }}
            >
              AAOIFI
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                fontFamily: 'FrauncesItalic',
                fontSize: 20,
                color: '#2c2620',
              }}
            >
              halalterminal.com
            </span>
            <Star size={16} />
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
