import { useEffect, useState } from "react";
import { createVehicle, updateVehicle } from "../api/vehicles";
import "./VehicleModal.css";

const initialForm = {
  licensePlate: "",
  brand: "",
  model: "",
  note: "",
};

function getFormFromVehicle(vehicle) {
  if (!vehicle) return initialForm;

  return {
    licensePlate: vehicle.licensePlate || "",
    brand: vehicle.brand || "",
    model: vehicle.model || "",
    note: vehicle.note || "",
  };
}

function VehicleModal({ isOpen, vehicle, onClose, onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const isEditMode = Boolean(vehicle?.id);

  useEffect(() => {
    if (isOpen) {
      setForm(getFormFromVehicle(vehicle));
      setError("");
    }
  }, [isOpen, vehicle]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleClose = () => {
    if (isSaving) return;
    setForm(initialForm);
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    const payload = {
      licensePlate: form.licensePlate.trim(),
      brand: form.brand.trim(),
      model: form.model.trim(),
      note: form.note.trim(),
    };

    try {
      if (isEditMode) {
        await updateVehicle(vehicle.id, payload);
      } else {
        await createVehicle(payload);
      }

      setForm(initialForm);
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      );
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="vehicle-modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2>{isEditMode ? "แก้ไขข้อมูลรถยนต์" : "เพิ่มรถยนต์ใหม่"}</h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            disabled={isSaving}
            aria-label="ปิด"
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>หมายเลขทะเบียน</label>
          <input
            name="licensePlate"
            value={form.licensePlate}
            onChange={handleChange}
            disabled={isSaving}
            required
          />

          <label>ยี่ห้อ</label>
          <select
            name="brand"
            value={form.brand}
            onChange={handleChange}
            disabled={isSaving}
            required
          >
            <option value="">-- เลือกยี่ห้อ --</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Isuzu">Isuzu</option>
            <option value="Nissan">Nissan</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Mazda">Mazda</option>
            <option value="Ford">Ford</option>
            <option value="Suzuki">Suzuki</option>
            <option value="MG">MG</option>
            <option value="BYD">BYD</option>
            <option value="Tesla">Tesla</option>
          </select>

          <label>รุ่น</label>
          <input
            name="model"
            value={form.model}
            onChange={handleChange}
            disabled={isSaving}
            required
          />

          <label>หมายเหตุ</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            disabled={isSaving}
          />

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" onClick={handleClose} disabled={isSaving}>
              ยกเลิก
            </button>
            <button type="submit" disabled={isSaving}>
              {isSaving
                ? "กำลังบันทึก..."
                : isEditMode
                  ? "บันทึกการแก้ไข"
                  : "บันทึก"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VehicleModal;
