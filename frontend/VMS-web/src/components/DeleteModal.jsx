import "./DeleteModal.css";

function DeleteModal({
  isOpen,
  isLoading = false,
  onClose,
  onConfirm,
  title = "ยืนยันการลบข้อมูล",
  description,
}) {
  if (!isOpen) return null;

  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };

  return (
    <div className="delete-modal-backdrop">
      <div className="delete-modal" role="dialog" aria-modal="true">
        <div className="delete-icon">!</div>

        <h2>{title}</h2>

        <p>
          {description ||
            "คุณต้องการลบข้อมูลนี้ใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้"}
        </p>

        <div className="delete-modal-actions">
          <button
            type="button"
            className="delete-cancel-btn"
            onClick={handleClose}
            disabled={isLoading}
          >
            ยกเลิก
          </button>

          <button
            type="button"
            className="delete-confirm-btn"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "กำลังลบ..." : "ยืนยันการลบ"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
