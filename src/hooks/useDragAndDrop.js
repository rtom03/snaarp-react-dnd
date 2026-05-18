import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,        // ← add
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"; // ← add
import useDashboardStore from "../store/dashboardStore";

export default function useDragAndDrop(key) {
  const reorder = useDashboardStore((s) => s.reorder);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates, // ← tells keyboard sensor how to calculate next position
    })
  );

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    reorder(key, active.id, over.id);
  }

  return { sensors, handleDragEnd };
}