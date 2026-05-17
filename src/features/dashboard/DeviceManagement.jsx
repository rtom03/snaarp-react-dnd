import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Sparkline from "../../components/ui/Sparkline";
import StatCard from "../../components/ui/StatsCard";
import useDashboardStore from "../../store/dashboardStore";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const tags = [
  {
    group: "ti-brand-windows",
    items: [
      { label: "Windows", value: "1,403 devices" },
      { label: "Mac", value: "632 devices" },
      { label: "Linux", value: "1,801 devices" },
    ],
  },
  {
    group: "ti-building",
    items: [
      { label: "Organizations", value: "1,403 users" },
      { label: "Departments", value: "632 users" },
      { label: "Groups", value: "1,801 users" },
    ],
  },
  {
    group: "ti-mail",
    items: [
      { label: "Read", value: "1,403 emails" },
      { label: "Unread", value: "632 emails" },
    ],
  },
];

function PairStats({ id, label, icon, value }) {
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
      aria-label={`${label} stat card. Drag to reorder.`}
      key={label}
      className="dm-pair-item"
    >
      <div className="dm-pair-header">
        <i className={`ti ${icon}`} aria-hidden="true" />
        <span>{label}</span>
      </div>
      <p className="dm-pair-value">{value}</p>
    </div>
  );
}

export default function DeviceManagement() {
  const deviceManagementTopStats = useDashboardStore(
    (s) => s.deviceManagementTopStats,
  );
  const deviceManagementPairStats = useDashboardStore(
    (s) => s.deviceManagementPairStats,
  );

  const { sensors, handleDragEnd } = useDragAndDrop("deviceManagementTopStats");
  const { sensors: pairStatsSensor, handleDragEnd: pairStatsDrag } =
    useDragAndDrop("deviceManagementPairStats");

  return (
    <section className="panel mb-4">
      {/* Header */}
      <div className="dm-header">
        <div className="panel-title">
          <i className="ti ti-device-laptop" aria-hidden="true" />
          <p className="panel-heading">Device Management Dashboard</p>
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

      {/* Row 1 — top stat cards */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={deviceManagementTopStats.map((c) => c.id)}
          strategy={rectSortingStrategy}
          className="country-list"
        >
          <div className="dm-top-grid">
            {deviceManagementTopStats.map((s) => (
              <StatCard key={s.id} {...s} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="dm-bottom-row">
        {/* Row 2 left — 6 pair stats + tags */}
        <div className="dm-pairs-col">
          {/* Pair stats */}
          <DndContext
            sensors={pairStatsSensor}
            collisionDetection={closestCenter}
            onDragEnd={pairStatsDrag}
          >
            <SortableContext
              items={deviceManagementPairStats.map((c) => c.id)}
              strategy={rectSortingStrategy}
              className="country-list"
            >
              <div className="dm-pairs-grid">
                {deviceManagementPairStats.map((s) => (
                  <PairStats
                    id={s.id}
                    key={s.id}
                    label={s.label}
                    icon={s.icon}
                    value={s.value}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Tag rows */}
          <div className="dm-tags-row">
            {tags.map((group, i) => (
              <div key={i} className="dm-tag-group">
                {group.items.map((item) => (
                  <div key={item.label} className="dm-tag">
                    <span className="dm-tag-label">{item.label}</span>
                    <span className="dm-tag-value">{item.value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 right — Number of Downloads card */}
        <div className="dm-downloads-card">
          <div className="dm-pair-header mb-2">
            <i className="ti ti-download" aria-hidden="true" />
            <span>Number of Downloads</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="stat-card-value">316</p>
              <div className="stat-card-change">
                <span className="change-up">
                  <i className="ti ti-arrow-up" />
                  23%
                </span>
                <span className="change-label">Compared to last week</span>
              </div>
            </div>
            <Sparkline positive={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
