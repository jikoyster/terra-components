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
        <div className="mb-4">
          <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-1">
            <Plus size={16} /> Create Farm
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Yield</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Crops</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hectares</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Carbon Sequestered</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {farms.map((farm) => (
          <tr key={farm.farm_id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{farm.farm_id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{farm.name ?? "-"}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{farm.region ?? "-"}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{farm.yield ?? "-"}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{farm.address ?? "-"}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{farm.crops ?? "-"}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{farm.hectares ?? "-"}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{farm.carbon_sequestered ?? "-"}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <button onClick={() => setEditingFarm(farm)} title="Update">
                <Pencil size={16} />
              </button>
              <button onClick={() => confirmDelete(farm.farm_id)} title="Delete" className="ml-2">
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