import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "../features/dashboard/Dashboard";

function Placeholder({ title }) {
  return (
    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
      {title} page
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route
          path="organization"
          element={<Placeholder title="Organization & Reg." />}
        />
        <Route path="reporting" element={<Placeholder title="Reporting" />} />
        <Route path="billing" element={<Placeholder title="Billing" />} />
        <Route path="account" element={<Placeholder title="Account" />} />
        <Route path="storage" element={<Placeholder title="Storage" />} />
        <Route path="settings" element={<Placeholder title="Settings" />} />
        <Route
          path="devices"
          element={<Placeholder title="Device Management" />}
        />
        <Route
          path="productivity"
          element={<Placeholder title="Productivity Report" />}
        />
        <Route path="user-panel" element={<Placeholder title="User Panel" />} />
        <Route path="support" element={<Placeholder title="Support" />} />
      </Route>
    </Routes>
  );
}
