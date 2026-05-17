export default function Header() {
  return (
    <header className="header">
      <div className="search-bar">
        <i className="ti ti-search" />
        <input type="text" placeholder="Search for users, groups or settings" />
      </div>
      <div className="header-right">
        <span className="agent-badge">
          Agent Code: <strong>...</strong>
        </span>
        <button aria-label="Notifications">
          <i className="ti ti-bell" />
        </button>
        <button aria-label="Share">
          <i className="ti ti-share" />
        </button>
      </div>
    </header>
  );
}
