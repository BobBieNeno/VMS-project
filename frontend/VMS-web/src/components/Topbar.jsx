import "./Topbar.css";
function Topbar({ onAddClick }) {
  return (
    <header className="topbar">
      <button className="add-btn" onClick={onAddClick}>
        + เพิ่มรถยนต์ใหม่
      </button>
    </header>
  );
}

export default Topbar;
