import "./ActionButton.css";
function ActionButton({ onEdit, onDelete, disabled = false }) {
  return (
    <div className="actions">
      <button
        type="button"
        className="icon-btn"
        onClick={onEdit}
        disabled={disabled}
      >
        Edit
      </button>

      <button
        type="button"
        className="icon-btn danger"
        onClick={onDelete}
        disabled={disabled}
      >
        Delete
      </button>
    </div>
  );
}

export default ActionButton;
