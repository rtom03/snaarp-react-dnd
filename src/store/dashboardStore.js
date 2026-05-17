import { create } from "zustand";

const initialCards = [
  {
    id: "users",
    icon: "ti-user",
    title: "Users",
    value: "3,836",
    change: "15%",
    positive: false,
  },
  {
    id: "groups",
    icon: "ti-users-group",
    title: "Groups",
    value: "316",
    change: "23%",
    positive: true,
  },
  {
    id: "uploads",
    icon: "ti-upload",
    title: "Uploads",
    value: "316",
    change: "23%",
    positive: true,
  },
  {
    id: "departments",
    icon: "ti-building",
    title: "Departments",
    value: "316",
    change: "23%",
    positive: false,
  },
];

const useDashboardStore = create((set) => ({
  cards: initialCards,

  reorderCards: (activeId, overId) => {
    set((state) => {
      const oldIndex = state.cards.findIndex((c) => c.id === activeId);
      const newIndex = state.cards.findIndex((c) => c.id === overId);

      // nothing to do if same position or item not found
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return state;
      }

      const updated = [...state.cards];
      // pull the dragged card out
      const [moved] = updated.splice(oldIndex, 1);
      // insert it at the new position
      updated.splice(newIndex, 0, moved);

      return { cards: updated };
    });
  },
}));

export default useDashboardStore;
