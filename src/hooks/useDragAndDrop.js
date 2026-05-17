import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import useDashboardStore from "../store/dashboardStore";

export default function useDragAndDrop(key) {
  const reorder = useDashboardStore((s) => s.reorder);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    reorder(key, active.id, over.id);
  }

  return { sensors, handleDragEnd };
}
