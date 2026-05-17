export default function Sparkline({ positive }) {
  const color = positive ? "#22c55e" : "#ef4444";
  const fill = positive ? "#dcfce7" : "#fee2e2";

  const points = positive
    ? "0,28 10,22 20,25 30,18 40,20 50,12 60,15 70,8 80,10 90,4 100,6"
    : "0,6  10,10 20,8  30,16 40,12 50,20 60,18 70,24 80,22 90,28 100,26";

  return (
    <svg width="90" height="36" viewBox="0 0 100 36" aria-hidden="true">
      <defs>
        <linearGradient id={`grad-${positive}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity="1" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,28 ${points} 100,36 0,36`}
        fill={`url(#grad-${positive})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
