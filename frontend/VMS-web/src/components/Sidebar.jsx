import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">🚐</div>
        <div>
          <h2>VMS Office</h2>
          <p>Fleet Control Center</p>
        </div>
      </div>
      <nav className="menu">
        <a className="active">Vehicle Fleet</a>
      </nav>

    </aside>
  );
}

export default Sidebar;
