import { useState } from "react";
import { useFarmers } from "@/hooks/useFarmers";
import type { Farmer } from "@/services/farmers/FarmerServices";
import { UpdateFarmerModal } from "./UpdateFarmerModal";
import { CreateFarmerModal } from "./CreateFarmerModal";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function FarmerList() {
  const { farmers, handleDelete, handleUpdate, handleCreate } = useFarmers();
  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const confirmDelete = (farmerId: number) => {
    if (window.confirm("Are you sure you want to delete this farmer?")) {
      handleDelete(farmerId);
    }
  };

  return (
    <>
      {editingFarmer && (
        <UpdateFarmerModal
          farmer={editingFarmer}
          onClose={() => setEditingFarmer(null)}
          onSave={handleUpdate}
        />
      )}
      {showCreateModal && (
        <CreateFarmerModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreate}
        />
      )}
      <div className="mb-4">
        <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-1">
          <Plus size={16} /> Create Farmer
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farm ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {farmers.map((farmer) => (
            <tr key={farmer.farmer_id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{farmer.farmer_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{farmer.name ?? "-"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{farmer.email ?? "-"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{farmer.phone ?? "-"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{farmer.address ?? "-"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{farmer.farm_id ?? "-"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button onClick={() => setEditingFarmer(farmer)} title="Update">
                  <Pencil size={16} />
                </button>
                <button onClick={() => confirmDelete(farmer.farmer_id)} title="Delete" className="ml-2">
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
