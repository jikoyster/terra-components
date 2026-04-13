import { useState } from "react";
import { useFarms } from "@/hooks/useFarms"; 
import type { Farm } from "@/services/farms/FarmServices";
import { UpdateFarmModal } from "./UpdateFarmModal";
import { Pencil, Trash2 } from "lucide-react";

export default function FarmList() {
    const { farms, handleDelete, handleUpdate } = useFarms(); 
    const [editingFarm, setEditingFarm] = useState<Farm | null>(null);

    return (  
        <>
        {editingFarm && (
          <UpdateFarmModal 
            farm={editingFarm} 
            onClose={() => setEditingFarm(null)}
            onSave={handleUpdate}
          />
        )}
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
              <button onClick={() => handleDelete(farm.farm_id)} title="Delete" style={{ marginLeft: "8px" }}>
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