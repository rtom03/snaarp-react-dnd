const users = [
  {
    name: "Annette Black",
    online: true,
    location: "Ottawa, Canada",
    org: "MSBM, Ottawa",
    device: "ti-brand-windows",
    activity: "ti-brand-chrome",
    app: "Google Chrome",
    time: "3 hours 12 minutes",
  },
  {
    name: "Floyd Miles",
    online: true,
    location: "Lagos, Nigeria",
    org: "MSBM, Lagos",
    device: "ti-brand-windows",
    activity: "ti-brand-instagram",
    app: "Instagram",
    time: "2 hours 8 minutes",
  },
  {
    name: "Ronald Richards",
    online: false,
    location: "Dubai, UAE",
    org: "MSBM, Dubai",
    device: "ti-brand-apple",
    activity: "ti-brand-teams",
    app: "Microsoft Teams",
    time: "6 hours 45 minutes",
  },
  {
    name: "Guy Hawkins",
    online: true,
    location: "London, UK",
    org: "MSBM, London",
    device: "ti-brand-windows",
    activity: "ti-brand-chrome",
    app: "Google Chrome",
    time: "1 hour 30 minutes",
  },
  {
    name: "Jane Cooper",
    online: false,
    location: "Frankfurt, Germany",
    org: "MSBM, Frankfurt",
    device: "ti-brand-apple",
    activity: "ti-brand-chrome",
    app: "Google Chrome",
    time: "9 hours 10 minutes",
  },
  {
    name: "Leslie Alexander",
    online: false,
    location: "Rome, Italy",
    org: "MSBM, Rome",
    device: "ti-brand-windows",
    activity: "ti-brand-youtube",
    app: "YouTube",
    time: "45 minutes",
  },
  {
    name: "Annette Black",
    online: false,
    location: "Calgary, Canada",
    org: "MSBM, Calgary",
    device: "ti-brand-linux",
    activity: "ti-brand-opera",
    app: "Opera Mini",
    time: "45 minutes",
  },
  {
    name: "Floyd Miles",
    online: false,
    location: "Mumbai, India",
    org: "MSBM, Mumbai",
    device: "ti-brand-apple",
    activity: "ti-brand-whatsapp",
    app: "WhatsApp",
    time: "45 minutes",
  },
  {
    name: "Cody Fisher",
    online: true,
    location: "Lagos, Nigeria",
    org: "MSBM, Lagos",
    device: "ti-brand-windows",
    activity: "ti-brand-teams",
    app: "Microsoft Teams",
    time: "45 minutes",
  },
  {
    name: "Dianne Russell",
    online: false,
    location: "London, UK",
    org: "MSBM, London",
    device: "ti-brand-linux",
    activity: "ti-brand-youtube",
    app: "YouTube",
    time: "45 minutes",
  },
];

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

export default function OnlineUsers() {
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
              <tr key={i} className="ou-row">
                {/* Name */}
                <td>
                  <div className="ou-name-cell">
                    <span
                      className={`ou-status-dot ${u.online ? "online" : "offline"}`}
                      aria-label={u.online ? "Online" : "Offline"}
                    />
                    <Avatar name={u.name} />
                    <span className="ou-name">{u.name}</span>
                  </div>
                </td>

                {/* Location */}
                <td className="ou-cell">{u.location}</td>

                {/* Organization */}
                <td className="ou-cell">{u.org}</td>

                {/* Device */}
                <td>
                  <i
                    className={`ti ${u.device} ou-icon`}
                    aria-label={u.device.replace("ti-brand-", "")}
                  />
                </td>

                {/* Current Activity */}
                <td>
                  <div className="ou-activity-cell">
                    <i
                      className={`ti ${u.activity} ou-icon`}
                      aria-hidden="true"
                    />
                    <span className="ou-cell">{u.app}</span>
                  </div>
                </td>

                {/* Time Usage */}
                <td className="ou-cell">{u.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
