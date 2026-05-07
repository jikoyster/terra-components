import { useState } from "react";
import type { Farmer } from "@/services/farmers/FarmerServices";
import { X } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  farm_id: number | null;
};

export function UpdateFarmerModal({
  farmer,
  onClose,
  onSave
}: {
  farmer: Farmer;
  onClose: () => void;
  onSave: (id: number, data: Partial<Farmer>) => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    name: farmer.name ?? "",
    email: farmer.email ?? "",
    phone: farmer.phone ?? "",
    address: farmer.address ?? "",
    farm_id: farmer.farm_id ?? null,
  });

  const handleChange = (field: keyof FormData, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(farmer.farmer_id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg w-[400px] max-w-[90%]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between mb-4">
          <h2 className="m-0">Update Farmer</h2>
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Farm ID</label>
            <input
              type="number"
              value={formData.farm_id ?? ""}
              onChange={(e) => handleChange("farm_id", e.target.value ? Number(e.target.value) : null)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white border-none rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
