const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const data = [45, 55, 40, 50, 85, 90, 70, 60, 65, 55, 50, 45];

const legend = [
  { label: "Public", color: "#4f46e5" },
  { label: "Anyone with link", color: "#93c5fd" },
  { label: "Within Organisation", color: "#1e40af" },
];

function BarChart() {
  const max = Math.max(...data);
  return (
    <div className="bar-chart">
      <div className="bar-y-axis">
        {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10].map((v) => (
          <span key={v}>{v}</span>
        ))}
      </div>
      <div className="bar-columns">
        {data.map((val, i) => (
          <div key={i} className="bar-col">
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{ height: `${(val / max) * 100}%` }}
                aria-label={`${months[i]}: ${val}`}
              />
            </div>
            <span className="bar-label">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FileSharing() {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">
          <i className="ti ti-share" aria-hidden="true" />
          <div>
            <p className="panel-heading">File Sharing</p>
            <p className="panel-sub">
              Keep track of files and how they're shared
            </p>
          </div>
        </div>
        <div className="panel-actions">
          <i className="ti ti-chart-bar" aria-hidden="true" />
          <i className="ti ti-chart-line" aria-hidden="true" />
          <select className="panel-select">
            <option>Month</option>
            <option>Week</option>
            <option>Year</option>
          </select>
        </div>
      </div>

      <BarChart />

      <div className="bar-legend">
        {legend.map((l) => (
          <div key={l.label} className="legend-row">
            <span className="legend-sq" style={{ background: l.color }} />
            <span>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
