import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import StatCard from "../../components/ui/StatsCard";
import useDashboardStore from "../../store/dashboardStore";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import useDragAndDrop from "../../hooks/useDragAndDrop";

const emailLegend = [
  { label: "Sent", color: "#f59e0b" },
  { label: "Received", color: "#4f46e5" },
  { label: "Unsent", color: "#e2e8f0" },
];

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

const lineData = [
  1200, 1800, 1400, 2200, 1900, 2800, 3200, 2600, 2100, 1800, 2400, 2000,
];

function EmailDonut() {
  const r = 42,
    cx = 52,
    cy = 52,
    stroke = 10;
  const circ = 2 * Math.PI * r;
  const segments = [
    { pct: 55, color: "#f59e0b" },
    { pct: 35, color: "#4f46e5" },
    { pct: 10, color: "#e2e8f0" },
  ];
  let offset = 0;

  return (
    <svg
      width="104"
      height="104"
      viewBox="0 0 104 104"
      aria-label="Email donut chart"
    >
      {segments.map((seg, i) => {
        const dash = (seg.pct / 100) * circ;
        const el = (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
        offset += dash;
        return el;
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="9" fill="#94a3b8">
        Emails
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="9" fill="#94a3b8">
        Chart
      </text>
    </svg>
  );
}

function TotalEmailChart() {
  const w = 340,
    h = 120;
  const max = Math.max(...lineData);
  const min = Math.min(...lineData);
  const pad = { t: 12, r: 12, b: 24, l: 32 };
  const chartW = w - pad.l - pad.r;
  const chartH = h - pad.t - pad.b;

  const points = lineData
    .map((v, i) => {
      const x = pad.l + (i / (lineData.length - 1)) * chartW;
      const y = pad.t + (1 - (v - min) / (max - min)) * chartH;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `${pad.l},${pad.t + chartH} ${points} ${pad.l + chartW},${pad.t + chartH}`;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${w} ${h}`}
      aria-label="Total email line chart"
    >
      {/* y grid lines */}
      {[0, 1, 2, 3].map((i) => {
        const y = pad.t + (i / 3) * chartH;
        const val = Math.round(max - (i / 3) * (max - min));
        return (
          <g key={i}>
            <line
              x1={pad.l}
              y1={y}
              x2={w - pad.r}
              y2={y}
              stroke="#f1f5f9"
              strokeWidth="1"
            />
            <text
              x={pad.l - 4}
              y={y + 4}
              textAnchor="end"
              fontSize="8"
              fill="#94a3b8"
            >
              {val > 999 ? `${Math.round(val / 1000)}k` : val}
            </text>
          </g>
        );
      })}

      {/* area fill */}
      <polygon points={areaPoints} fill="#ede9fe" opacity="0.5" />

      {/* line */}
      <polyline
        points={points}
        fill="none"
        stroke="#4f46e5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* x labels */}
      {months.map((m, i) => {
        const x = pad.l + (i / (months.length - 1)) * chartW;
        return (
          <text
            key={m}
            x={x}
            y={h - 6}
            textAnchor="middle"
            fontSize="8"
            fill="#94a3b8"
          >
            {m}
          </text>
        );
      })}
    </svg>
  );
}

export default function ProductivityReport() {
  const deviceStats = useDashboardStore((s) => s.deviceStats);
  const { sensors, handleDragEnd } = useDragAndDrop("deviceStats");

  return (
    <section className="panel mb-4">
      {/* Header */}
      <div className="dm-header">
        <div className="panel-title">
          <i className="ti ti-chart-bar" aria-hidden="true" />
          <p className="panel-heading">Productivity Report</p>
        </div>
        <div className="dm-header-actions">
          <button className="upgrade-btn">
            <i className="ti ti-bolt" aria-hidden="true" />
            Upgrade Plan
          </button>
          <i
            className="ti ti-chevron-down text-gray-400 text-base cursor-pointer"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Row 1 — stat cards */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={deviceStats.map((c) => c.id)}
          strategy={rectSortingStrategy}
        >
          <div className="dm-top-grid mb-4">
            {deviceStats.map((s) => (
              <StatCard key={s.id} {...s} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Row 2 — email charts */}
      <div className="pr-charts-row">
        {/* Email donut */}
        <div className="pr-donut-card">
          <div className="panel-title mb-3">
            <i className="ti ti-mail" aria-hidden="true" />
            <p className="panel-heading">Email Chart</p>
          </div>
          <div className="pr-donut-body">
            <EmailDonut />
            <div className="pr-donut-legend">
              {emailLegend.map((l) => (
                <div key={l.label} className="legend-row">
                  <span className="legend-sq" style={{ background: l.color }} />
                  <span>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="pr-total-label">TOTAL EMAILS SENT</p>
          <p className="pr-total-value">5,421</p>
        </div>

        {/* Total email line chart */}
        <div className="pr-line-card">
          <div className="flex items-center justify-between mb-3">
            <div className="panel-title">
              <i className="ti ti-mail" aria-hidden="true" />
              <p className="panel-heading">Total Email</p>
            </div>
            <div className="panel-actions">
              <i className="ti ti-chart-bar" aria-hidden="true" />
              <i className="ti ti-chart-line" aria-hidden="true" />
              <select className="panel-select">
                <option>Month</option>
                <option>Week</option>
              </select>
            </div>
          </div>
          <TotalEmailChart />
        </div>
      </div>
    </section>
  );
}
