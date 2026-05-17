import { create } from "zustand";

const countries = [
  { id: 1, name: "United Kingdom", flag: "🇬🇧", pct: 78, color: "#4f46e5" },
  { id: 2, name: "Nigeria", flag: "🇳🇬", pct: 61, color: "#22c55e" },
  { id: 3, name: "UAE", flag: "🇦🇪", pct: 40, color: "#ef4444" },
  { id: 4, name: "Canada", flag: "🇨🇦", pct: 59, color: "#f59e0b" },
  {
    id: 5,
    name: "United States of America",
    flag: "🇺🇸",
    pct: 78,
    color: "#4f46e5",
  },
];
export const useActiveUserStore = create((set) => ({
  items: countries,
  reorderCountries: (activeId, overId) => {
    set((state) => {
      const oldIndex = state.items.findIndex((c) => c.id === activeId);
      const newIndex = state.items.findIndex((c) => c.id === overId);

      // nothing to do if same position or item not found
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return state;
      }

      const updated = [...state.items];
      // pull the dragged card out
      const [moved] = updated.splice(oldIndex, 1);
      // insert it at the new position
      updated.splice(newIndex, 0, moved);

      return { items: updated };
    });
  },
}));
