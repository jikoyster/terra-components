import { useState } from "react";
import { useFarms } from "@/hooks/useFarms"; 
import type { Farm } from "@/services/farms/FarmServices";
import { UpdateFarmModal } from "./UpdateFarmModal";
import { CreateFarmModal } from "./CreateFarmModal";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function FarmList() {
    const { farms, handleDelete, handleUpdate, handleCreate } = useFarms(); 
    const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const confirmDelete = (farmId: number) => {
        if (window.confirm("Are you sure you want to delete this farm?")) {
            handleDelete(farmId);
        }
    };

    return (  
        <>
        {editingFarm && (
          <UpdateFarmModal 
            farm={editingFarm} 
            onClose={() => setEditingFarm(null)}
            onSave={handleUpdate}
          />
        )}
        {showCreateModal && (
          <CreateFarmModal 
            onClose={() => setShowCreateModal(false)}
            onSave={handleCreate}
          />
        )}
        <div style={{ marginBottom: "16px" }}>
          <button onClick={() => setShowCreateModal(true)} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Plus size={16} /> Create Farm
          </button>
        </div>
        <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Region</th>
          <th>Yield</th>
          <th>Address</th>
          <th>Crops</th>
          <th>Hectares</th>
          <th>Carbon Sequestered</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {farms.map((farm) => (
          <tr key={farm.farm_id}>
            <td>{farm.farm_id}</td>
            <td>{farm.name ?? "-"}</td>
            <td>{farm.region ?? "-"}</td>
            <td>{farm.yield ?? "-"}</td>
            <td>{farm.address ?? "-"}</td>
            <td>{farm.crops ?? "-"}</td>
            <td>{farm.hectares ?? "-"}</td>
            <td>{farm.carbon_sequestered ?? "-"}</td>
            <td>
              <button onClick={() => setEditingFarm(farm)} title="Update">
                <Pencil size={16} />
              </button>
              <button onClick={() => confirmDelete(farm.farm_id)} title="Delete" style={{ marginLeft: "8px" }}>
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </>
    );
}