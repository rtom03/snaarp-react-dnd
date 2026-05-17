import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", icon: "ti-layout-dashboard", label: "Dashboard" },
  { to: "/organization", icon: "ti-building", label: "Organization & Reg." },
  { to: "/reporting", icon: "ti-chart-bar", label: "Reporting" },
  { to: "/billing", icon: "ti-receipt", label: "Billing" },
  { to: "/account", icon: "ti-user", label: "Account" },
  { to: "/storage", icon: "ti-database", label: "Storage" },
  { to: "/settings", icon: "ti-settings", label: "Settings" },
  { to: "/devices", icon: "ti-device-laptop", label: "Device Management" },
  {
    to: "/productivity",
    icon: "ti-file-analytics",
    label: "Productivity Report",
  },
];

const generalItems = [
  { to: "/user-panel", icon: "ti-layout-sidebar", label: "User Panel" },
  { to: "/support", icon: "ti-help-circle", label: "Support" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Snaarp</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            end
          >
            <i className={`ti ${item.icon}`} />
            {item.label}
          </NavLink>
        ))}
        <p className="section-label">General</p>
        {generalItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <i className={`ti ${item.icon}`} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="avatar">CS</div>
        <div>
          <p className="avatar-name">Chidinma Snaarp</p>
          <p className="avatar-email">chidinma@example.com</p>
        </div>
      </div>
    </aside>
  );
}
