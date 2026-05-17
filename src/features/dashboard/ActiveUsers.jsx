import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useDashboardStore from "../../store/dashboardStore";
import useDragAndDrop from "../../hooks/useDragAndDrop";

function MapPlaceholder() {
  return (
    <div className="map-placeholder" aria-label="Active users map">
      <svg viewBox="0 0 280 140" width="100%" height="100%">
        <rect width="280" height="140" fill="#f1f5f9" rx="8" />
        {/* grid lines */}
        {[35, 70, 105, 140].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="280"
            y2={y}
            stroke="#e2e8f0"
            strokeWidth="0.5"
          />
        ))}
        {[70, 140, 210].map((x) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2="140"
            stroke="#e2e8f0"
            strokeWidth="0.5"
          />
        ))}
        {/* map blobs */}
        <ellipse cx="70" cy="60" rx="40" ry="25" fill="#cbd5e1" opacity="0.6" />
        <ellipse
          cx="145"
          cy="55"
          rx="30"
          ry="20"
          fill="#cbd5e1"
          opacity="0.6"
        />
        <ellipse
          cx="155"
          cy="85"
          rx="20"
          ry="12"
          fill="#cbd5e1"
          opacity="0.6"
        />
        <ellipse
          cx="210"
          cy="65"
          rx="25"
          ry="18"
          fill="#cbd5e1"
          opacity="0.6"
        />
        <ellipse
          cx="230"
          cy="90"
          rx="18"
          ry="12"
          fill="#cbd5e1"
          opacity="0.6"
        />
        {/* pins */}
        <circle cx="80" cy="50" r="5" fill="#4f46e5" />
        <circle cx="80" cy="50" r="9" fill="#4f46e5" fillOpacity="0.2" />
        <circle cx="155" cy="88" r="5" fill="#22c55e" />
        <circle cx="155" cy="88" r="9" fill="#22c55e" fillOpacity="0.2" />
        {/* labels */}
        <text x="88" y="47" fontSize="8" fill="#4f46e5" fontWeight="500">
          Stanley
        </text>
        <text x="163" y="91" fontSize="8" fill="#22c55e" fontWeight="500">
          Samuel
        </text>
      </svg>
    </div>
  );
}

function CountryList({ id, index, name, flag, pct, color }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging ? 10 : "auto",
  };
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="country-row"
      onClick={() => console.log(setNodeRef)}
    >
      <span className="country-flag">{flag}</span>
      <div className="country-info">
        <div className="country-bar-row">
          <span className="country-name">{name}</span>
          <span className="country-pct">{pct}%</span>
        </div>
        <div className="country-track">
          <div
            className="country-fill"
            style={{ width: `${pct}%`, background: color }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ActiveUsers() {
  const countries = useDashboardStore((s) => s.countries);
  const { sensors, handleDragEnd } = useDragAndDrop("countries");

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">
          <i className="ti ti-users" aria-hidden="true" />
          <p className="panel-heading">Active Users</p>
        </div>
        <select className="panel-select">
          <option>Month</option>
          <option>Week</option>
          <option>Year</option>
        </select>
      </div>

      <MapPlaceholder />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={countries.map((c) => c.id)}
          strategy={rectSortingStrategy}
          className="country-list"
        >
          <div>
            {countries.map((c, idx) => (
              <CountryList
                key={c.id}
                id={c.id}
                index={idx}
                name={c.name}
                flag={c.flag}
                pct={c.pct}
                color={c.color}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
