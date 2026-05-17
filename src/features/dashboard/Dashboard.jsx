import CloudNetwork from "./CloudNetwork";
import DeviceManagement from "./DeviceManagement";
import OnlineUsers from "./OnlineUser";
import ProductivityReport from "./ProductivityReport";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <CloudNetwork />
      <DeviceManagement />
      <ProductivityReport />
      <OnlineUsers />
    </div>
  );
}
