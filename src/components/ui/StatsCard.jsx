import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Sparkline from "./Sparkline";

export default function StatCard({ id, icon, title, value, change, positive }) {
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
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="stat-card"
      aria-label={`${title} stat card. Drag to reorder.`}
    >
      <div className="stat-card-header">
        <i className={`ti ${icon} stat-card-icon`} aria-hidden="true" />
        <span className="stat-card-title">{title}</span>
      </div>
      <div className="stat-card-body">
        <div>
          <p className="stat-card-value">{value}</p>
          <div className="stat-card-change">
            <span className={positive ? "change-up" : "change-down"}>
              <i
                className={`ti ${positive ? "ti-arrow-up" : "ti-arrow-down"}`}
              />
              {change}
            </span>
            <span className="change-label">Compared to last week</span>
          </div>
        </div>
        <Sparkline positive={positive} />
      </div>
    </div>
  );
}
