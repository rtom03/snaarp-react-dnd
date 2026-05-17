const segments = [
  { label: "Files", color: "#6366f1", pct: 22 },
  { label: "Folders", color: "#22c55e", pct: 18 },
  { label: "Videos", color: "#f59e0b", pct: 20 },
  { label: "Apps", color: "#3b82f6", pct: 15 },
  { label: "Audios", color: "#ec4899", pct: 13 },
  { label: "Miscellaneous", color: "#94a3b8", pct: 12 },
];

function DonutChart() {
  const r = 42,
    cx = 52,
    cy = 52,
    stroke = 10;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg
      width="104"
      height="104"
      viewBox="0 0 104 104"
      aria-label="Storage usage donut chart"
    >
      {segments.map((seg) => {
        const dash = (seg.pct / 100) * circ;
        const el = (
          <circle
            key={seg.label}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
        offset += dash;
        return el;
      })}
      <text
        x={cx}
        y={cy - 5}
        textAnchor="middle"
        fontSize="14"
        fontWeight="500"
        fill="#1e293b"
      >
        80%
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill="#94a3b8">
        Used
      </text>
    </svg>
  );
}

export default function StorageCard() {
  return (
    <div className="storage-card">
      <div className="storage-note">
        <i className="ti ti-info-circle" aria-hidden="true" />
        <div>
          <p className="note-title">Note</p>
          <p className="note-text">
            You've almost reached your limit. You've used 80% of your available
            storage. Upgrade plan to access more storage.
          </p>
        </div>
      </div>

      <div className="storage-body">
        <DonutChart />
        <div className="storage-legend">
          {segments.map((s) => (
            <div key={s.label} className="legend-item">
              <span className="legend-dot" style={{ background: s.color }} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="upgrade-btn">
        <i className="ti ti-bolt" aria-hidden="true" />
        Upgrade Plan
      </button>
    </div>
  );
}
