'use client';

const ARCS = [
  'M600 175 Q680 105 752 120',
  'M868 190 Q960 95 1090 118',
  'M970 245 Q1060 120 1180 178',
  'M1180 178 Q1215 100 1250 126',
  'M1340 115 Q1450 50 1555 215',
  'M1250 126 Q1360 90 1420 270',
];

const NODES = [
  [752, 120], [868, 190], [1090, 118], [1180, 178],
  [1250, 126], [1440, 90], [1555, 215], [970, 245],
];

export default function HeroMapAnimation() {
  return (
    <svg
      className="hero-map-animation pointer-events-none absolute inset-0 z-10 h-full w-full"
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="hero-map-glow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {ARCS.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1" />
          <path
            d={d}
            pathLength={1}
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.55"
            strokeWidth="1.4"
            strokeLinecap="round"
            filter="url(#hero-map-glow)"
            className="arc-draw"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
          <circle r="2.5" fill="#FFFFFF" fillOpacity="0.6" filter="url(#hero-map-glow)">
            <animateMotion dur="4s" begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}

      {NODES.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="3"
          fill="#FFFFFF"
          fillOpacity="0.7"
          className="node-pulse"
          style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  );
}
