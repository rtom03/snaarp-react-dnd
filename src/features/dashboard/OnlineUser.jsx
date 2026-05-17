import { closestCenter, DndContext } from "@dnd-kit/core";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import useDashboardStore from "../../store/dashboardStore";
import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div className="ou-avatar" aria-hidden="true">
      {initials}
    </div>
  );
}

function UsersTable({
  id,
  online,
  name,
  location,
  org,
  device,
  activity,
  time,
  app,
}) {
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
    <tr
      className="ou-row"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <td>
        <div className="ou-name-cell">
          <span
            className={`ou-status-dot ${online ? "online" : "offline"}`}
            aria-label={online ? "Online" : "Offline"}
          />
          <Avatar name={name} />
          <span className="ou-name">{name}</span>
        </div>
      </td>

      {/* Location */}
      <td className="ou-cell">{location}</td>

      {/* Organization */}
      <td className="ou-cell">{org}</td>

      {/* Device */}
      <td>
        <i
          className={`ti ${device} ou-icon`}
          aria-label={device.replace("ti-brand-", "")}
        />
      </td>

      {/* Current Activity */}
      <td>
        <div className="ou-activity-cell">
          <i className={`ti ${activity} ou-icon`} aria-hidden="true" />
          <span className="ou-cell">{app}</span>
        </div>
      </td>

      {/* Time Usage */}
      <td className="ou-cell">{time}</td>
    </tr>
  );
}

export default function OnlineUsers() {
  const { sensors, handleDragEnd } = useDragAndDrop("users");
  const users = useDashboardStore((s) => s.users);

  return (
    <section className="panel mb-4">
      {/* Header */}
      <div className="dm-header">
        <div>
          <div className="panel-title mb-0.5">
            <i className="ti ti-user" aria-hidden="true" />
            <p className="panel-heading">Online Users</p>
          </div>
          <p className="ou-subtitle">View your comprehensive online users</p>
        </div>
        <select className="panel-select">
          <option>All Organization</option>
          <option>MSBM, Lagos</option>
          <option>MSBM, London</option>
        </select>
      </div>

      {/* Table */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={users.map((c) => c.id)}
          strategy={rectSortingStrategy}
        >
          <div className="ou-table-wrapper">
            <table className="ou-table" aria-label="Online users table">
              <thead>
                <tr>
                  {[
                    "Name",
                    "Location",
                    "Organization",
                    "Device",
                    "Current Activity",
                    "Time Usage",
                  ].map((h) => (
                    <th key={h}>
                      <div className="ou-th">
                        <i className="ti ti-arrows-sort" aria-hidden="true" />
                        {h}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {users.map((u, i) => (
                  <UsersTable
                    id={u.id}
                    key={u.id}
                    online={u.online}
                    name={u.name}
                    location={u.location}
                    org={u.org}
                    device={u.device}
                    activity={u.activity}
                    time={u.time}
                    app={u.app}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
}
