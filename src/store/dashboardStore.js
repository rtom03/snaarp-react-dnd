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

const initialCountries = [
  { id: "uk", name: "United Kingdom", flag: "🇬🇧", pct: 78, color: "#4f46e5" },
  { id: "ng", name: "Nigeria", flag: "🇳🇬", pct: 61, color: "#22c55e" },
  { id: "uae", name: "UAE", flag: "🇦🇪", pct: 40, color: "#ef4444" },
  { id: "ca", name: "Canada", flag: "🇨🇦", pct: 59, color: "#f59e0b" },
  { id: "us", name: "United States", flag: "🇺🇸", pct: 78, color: "#4f46e5" },
];

const initialStats = [
  {
    id: "hours",
    icon: "ti-clock",
    title: "Hours Productivity",
    value: "576 Hrs",
    change: "15%",
    positive: false,
  },
  {
    id: "days",
    icon: "ti-calendar",
    title: "Days Activity",
    value: "267 Days",
    change: "15%",
    positive: true,
  },
  {
    id: "pusers",
    icon: "ti-user",
    title: "Users",
    value: "3,836",
    change: "15%",
    positive: false,
  },
  {
    id: "web",
    icon: "ti-world",
    title: "Web Activity",
    value: "178 Activities",
    change: "15%",
    positive: true,
  },
];

const initialTopStats = [
  {
    id: "devices",
    icon: "ti-device-laptop",
    title: "Number of Devices",
    value: "3,836",
    change: "16%",
    positive: true,
  },
  {
    id: "users",
    icon: "ti-user",
    title: "Users",
    value: "3,836",
    change: "15%",
    positive: false,
  },
  {
    id: "emails",
    icon: "ti-mail",
    title: "Emails",
    value: "316",
    change: "23%",
    positive: false,
  },
  {
    id: "apps",
    icon: "ti-apps",
    title: "Number of Apps",
    value: "316",
    change: "23%",
    positive: false,
  },
];

const initialPairStats = [
  { id: 1, label: "Plugged", icon: "ti-plug", value: "1,923" },
  { id: 2, label: "Unplugged", icon: "ti-plug-x", value: "1,913" },
  {
    id: 3,
    label: "Active",
    icon: "ti-circle-check",
    value: "592",
    positive: true,
  },
  {
    id: 4,
    label: "Offline",
    icon: "ti-power",
    value: "3,836",
    positive: false,
  },
  { id: 5, label: "Sent", icon: "ti-arrow-up-right", value: "592" },
  { id: 6, label: "Received", icon: "ti-arrow-down-left", value: "3,836" },
];

const useDashboardStore = create((set) => ({
  cards: initialCards,
  countries: initialCountries,
  deviceStats: initialStats,
  deviceManagementTopStats: initialTopStats,
  deviceManagementPairStats: initialPairStats,

  // one function handles any array in the store
  reorder: (key, activeId, overId) => {
    set((state) => {
      const list = state[key];

      // guard: key must exist and be an array
      if (!Array.isArray(list)) return state;

      const oldIndex = list.findIndex((item) => item.id === activeId);
      const newIndex = list.findIndex((item) => item.id === overId);

      // guard: invalid positions or no movement
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return state;
      }

      const updated = [...list];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);

      return { [key]: updated };
    });
  },
}));

export default useDashboardStore;
