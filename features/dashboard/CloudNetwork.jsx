import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import StorageCard from "./StorageCard";
import useDashboardStore from "../../src/store/dashboardStore";
import StatCard from "../../src/components/ui/StatsCard";
import FileSharing from "./FileSharing";
import ActiveUsers from "./ActiveUsers";

export default function CloudNetwork() {
  const cards = useDashboardStore((s) => s.cards);
  const reorderCards = useDashboardStore((s) => s.reorderCards);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    reorderCards(active.id, over.id);
  }

  return (
    <section className="cloud-network">
      <div className="section-header">
        <i className="ti ti-cloud" aria-hidden="true" />
        <h2>Cloud Network</h2>
      </div>

      <div className="cloud-network-grid">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={cards.map((c) => c.id)}
            strategy={rectSortingStrategy}
          >
            <div className="stat-cards-grid">
              {cards.map((card) => (
                <StatCard key={card.id} {...card} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <StorageCard />
      </div>
      <div className="two-col-row mt-10">
        <FileSharing />
        <ActiveUsers />
      </div>
    </section>
  );
}
