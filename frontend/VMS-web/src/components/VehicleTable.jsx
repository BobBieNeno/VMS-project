import { useEffect, useState } from "react";
import { deleteVehicle, getVehicles } from "../api/vehicles";
import StatusBadge from "./StatusBadge";
import ActionButton from "./ActionButton";
import DeleteModal from "./DeleteModal";
import "./VehicleTable.css";

function VehicleTable({ refreshKey, onEditVehicle }) {
  const [vehicles, setVehicles] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadVehicles() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getVehicles();
        if (isMounted) {
          setVehicles(data);
        }
      } catch (err) {
        if (isMounted) {
          setVehicles([]);
          setError("");
        }
        console.error(err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadVehicles();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const handleConfirmDelete = async () => {
    if (!deleteItem) return;
    setIsDeleting(true);

    try {
      await deleteVehicle(deleteItem.id);
      setVehicles((currentVehicles) =>
        currentVehicles.filter((vehicle) => vehicle.id !== deleteItem.id),
      );
      setDeleteItem(null);
    } catch (err) {
      setError("ลบข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>หมายเลขทะเบียน</th>
              <th>ยี่ห้อ</th>
              <th>รุ่น</th>
              <th>สถานะ</th>
              <th>หมายเหตุ</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="6" className="table-message">
                  กำลังโหลดข้อมูล...
                </td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td colSpan="6" className="table-message table-error">
                  {error}
                </td>
              </tr>
            )}

            {!isLoading && !error && vehicles.length === 0 && (
              <tr>
                <td colSpan="6" className="table-message">
                  กรุณาเพิ่มข้อมูลรถ
                </td>
              </tr>
            )}

            {!isLoading &&
              !error &&
              vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>
                    <span className="plate">{vehicle.licensePlate}</span>
                  </td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>
                    <StatusBadge status={vehicle.status || "active"} />
                  </td>
                  <td>{vehicle.note || "-"}</td>
                  <td>
                    <ActionButton
                      onEdit={() => onEditVehicle(vehicle)}
                      onDelete={() => setDeleteItem(vehicle)}
                      disabled={isDeleting}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isOpen={!!deleteItem}
        isLoading={isDeleting}
        onClose={() => setDeleteItem(null)}
        description={`คุณต้องการลบรถทะเบียน ${deleteItem?.licensePlate} ใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้`}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default VehicleTable;
