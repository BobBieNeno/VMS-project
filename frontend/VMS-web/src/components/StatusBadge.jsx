import "./StatusBadge.css";

function StatusBadge({ status }) {
  if (status === "active") {
    return <span className="badge success">พร้อมใช้งาน</span>;
  }

  if (status === "repair") {
    return <span className="badge warning">ซ่อมบำรุง</span>;
  }

  return <span className="badge">ไม่ทราบสถานะ</span>;
}

export default StatusBadge;
