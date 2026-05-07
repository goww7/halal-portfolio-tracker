// Rub el Hizb — 8-pointed star (two overlapping squares).
// Used sparingly: brand mark in masthead, loading spinner, footer ornament.

export function StarMark({
  size = 24,
  className = '',
  spin = false,
}: {
  size?: number;
  className?: string;
  spin?: boolean;
}) {
  const s = size;
  const c = s / 2;

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      className={`${className} ${spin ? 'spin-slow' : ''}`}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="miter">
        {/* Square 1 — axis-aligned */}
        <rect x={s * 0.18} y={s * 0.18} width={s * 0.64} height={s * 0.64} />
        {/* Square 2 — rotated 45° around center */}
        <rect
          x={s * 0.18}
          y={s * 0.18}
          width={s * 0.64}
          height={s * 0.64}
          transform={`rotate(45 ${c} ${c})`}
        />
        {/* Inner accent dot */}
        <circle cx={c} cy={c} r={1} fill="currentColor" />
      </g>
    </svg>
  );
}
