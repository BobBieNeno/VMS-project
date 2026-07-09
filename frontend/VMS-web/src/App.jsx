import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import VehicleTable from "./components/VehicleTable";
import VehicleModal from "./components/VehicleModal";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshVehicles = () => {
    setRefreshKey((currentKey) => currentKey + 1);
  };

  const openCreateModal = () => {
    setEditingVehicle(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const closeVehicleModal = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
  };

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Topbar onAddClick={openCreateModal} />

        <section className="page-header">
          <h1>รถยนต์ทั้งหมด</h1>
          <p>จัดการและติดตามสถานะยานพาหนะในระบบ</p>
        </section>

        <VehicleTable refreshKey={refreshKey} onEditVehicle={openEditModal} />
      </main>

      <VehicleModal
        isOpen={isModalOpen}
        vehicle={editingVehicle}
        onClose={closeVehicleModal}
        onSuccess={refreshVehicles}
      />
    </div>
  );
}

export default App;
