/**
 * Atmospheric Bengaluru evening — an illustrated balcony scene.
 * Deliberately not a skyline: rain, a warm window, plants, evening light.
 */
export function BengaluruNight({ className }: { className?: string }) {
  const rain = Array.from({ length: 34 }, (_, i) => ({
    x: (i * 53) % 800,
    y: ((i * 97) % 600) - 60,
    len: 16 + ((i * 7) % 22),
    delay: ((i % 9) / 9) * 1.4,
    dur: 0.7 + ((i % 5) / 5) * 0.5,
  }));

  const bokeh = [
    { x: 96, y: 214, r: 5 },
    { x: 168, y: 262, r: 3 },
    { x: 232, y: 196, r: 7 },
    { x: 318, y: 252, r: 4 },
    { x: 392, y: 208, r: 6 },
    { x: 462, y: 268, r: 3 },
    { x: 546, y: 222, r: 5 },
    { x: 618, y: 276, r: 4 },
    { x: 690, y: 232, r: 6 },
    { x: 744, y: 288, r: 3 },
  ];

  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      role="img"
      aria-label="An illustrated balcony at dusk in Bengaluru: warm window light, rain, plants and distant city lights."
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A1F1A" />
          <stop offset="46%" stopColor="#5B4032" />
          <stop offset="78%" stopColor="#9A6248" />
          <stop offset="100%" stopColor="#C8785C" />
        </linearGradient>

        <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE0AE" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F0A868" stopOpacity="0.5" />
        </linearGradient>

        <radialGradient id="bokehGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFCF95" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFCF95" stopOpacity="0" />
        </radialGradient>

        <filter id="bokehBlur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>

        <filter id="softBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      <rect width="800" height="600" fill="url(#sky)" />

      {/* Warm haze */}
      <ellipse
        cx="560"
        cy="430"
        rx="300"
        ry="200"
        fill="#C8785C"
        opacity="0.28"
        filter="url(#softBlur)"
      />

      {/* Distant blocks — low, not a skyline */}
      <g opacity="0.55" fill="#2A1F1A">
        <rect x="0" y="330" width="120" height="270" />
        <rect x="132" y="372" width="86" height="228" />
        <rect x="600" y="348" width="104" height="252" />
        <rect x="716" y="392" width="84" height="208" />
        <rect x="228" y="398" width="70" height="202" opacity="0.7" />
        <rect x="486" y="412" width="96" height="188" opacity="0.6" />
      </g>

      {/* Street / window lights */}
      <g filter="url(#bokehBlur)">
        {bokeh.map((b, i) => (
          <circle
            key={i}
            cx={b.x}
            cy={b.y}
            r={b.r * 3}
            fill="url(#bokehGlow)"
            opacity="0.5"
          />
        ))}
      </g>

      {/* Balcony floor */}
      <path d="M0 470 H800 V600 H0 Z" fill="#1B1411" opacity="0.92" />

      {/* Railing */}
      <g stroke="#1B1411" strokeWidth="7" opacity="0.9">
        <line x1="0" y1="392" x2="800" y2="392" />
        {Array.from({ length: 17 }, (_, i) => (
          <line key={i} x1={i * 50} y1="392" x2={i * 50} y2="470" />
        ))}
      </g>

      {/* Warm window across the street */}
      <g>
        <rect x="300" y="236" width="120" height="136" rx="4" fill="url(#windowGlow)" />
        <rect
          x="300"
          y="236"
          width="120"
          height="136"
          rx="4"
          fill="none"
          stroke="#2A1F1A"
          strokeWidth="6"
          opacity="0.5"
        />
        <line x1="360" y1="236" x2="360" y2="372" stroke="#2A1F1A" strokeWidth="5" opacity="0.5" />
        <ellipse
          cx="360"
          cy="300"
          rx="150"
          ry="150"
          fill="#F0A868"
          opacity="0.18"
          filter="url(#softBlur)"
        />
      </g>

      {/* Plants */}
      <g fill="#15100D">
        <path d="M96 470c0-38 6-64 6-92 0 28 8 54 8 92Z" opacity="0.9" />
        <path d="M110 470c6-30 26-52 52-64-14 26-28 46-38 64Z" />
        <path d="M110 470c-8-28-28-48-52-58 14 24 26 42 34 58Z" />
        <path d="M76 470h84l-10 54H86Z" />
      </g>
      <g fill="#15100D" opacity="0.85">
        <path d="M676 470c2-30 14-52 34-64-10 24-20 42-26 64Z" />
        <path d="M676 470c-6-26-24-46-44-56 12 22 22 38 28 56Z" />
        <path d="M652 470h72l-8 48h-56Z" />
      </g>

      {/* A candle on the railing, breathing */}
      <g>
        <ellipse cx="612" cy="392" rx="16" ry="4" fill="#0E0A08" opacity="0.6" />
        <rect x="601" y="356" width="22" height="36" rx="5" fill="#F6E7CF" opacity="0.92" />
        <rect x="601" y="356" width="22" height="36" rx="5" fill="url(#windowGlow)" opacity="0.35" />
        <ellipse cx="612" cy="356" rx="11" ry="3.6" fill="#F6E7CF" />
        <g className="origin-center animate-[flame_2.6s_ease-in-out_infinite]">
          <ellipse cx="612" cy="348" rx="16" ry="20" fill="#FFC98A" opacity="0.3" filter="url(#bokehBlur)" />
          <path
            d="M612 332c5 7 7 10 7 14a7 7 0 0 1-14 0c0-4 2-7 7-14Z"
            fill="#FFCF95"
          />
        </g>
      </g>

      {/* Rain */}
      <g stroke="#FFF6E6" strokeLinecap="round" opacity="0.32">
        {rain.map((d, i) => (
          <line
            key={i}
            x1={d.x}
            y1={d.y}
            x2={d.x - 6}
            y2={d.y + d.len}
            strokeWidth="1.2"
            className="animate-[rainfall_1.2s_linear_infinite]"
            style={{ animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s` }}
          />
        ))}
      </g>

      {/* Vignette */}
      <rect width="800" height="600" fill="none" />
      <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.75">
        <stop offset="55%" stopColor="#000000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.42" />
      </radialGradient>
      <rect width="800" height="600" fill="url(#vignette)" />
    </svg>
  );
}
