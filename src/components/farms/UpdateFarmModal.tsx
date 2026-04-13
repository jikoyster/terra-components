import { useState } from "react";
import type { Farm } from "@/services/farms/FarmServices";
import { X } from "lucide-react";

type FormData = {
  name: string;
  region: string;
  yield: number;
  address: string;
  crops: string;
  hectares: number;
  carbon_sequestered: number;
};

export function UpdateFarmModal({ 
  farm, 
  onClose, 
  onSave 
}: { 
  farm: Farm; 
  onClose: () => void; 
  onSave: (id: number, data: Partial<Farm>) => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    name: farm.name ?? "",
    region: farm.region ?? "",
    yield: farm.yield ?? 0,
    address: farm.address ?? "",
    crops: farm.crops ?? "",
    hectares: farm.hectares ?? 0,
    carbon_sequestered: farm.carbon_sequestered ?? 0,
  });

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(farm.farm_id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg w-[400px] max-w-[90%]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between mb-4">
          <h2 className="m-0">Update Farm</h2>
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
            <label className="block mb-1">Region</label>
            <input
              type="text"
              value={formData.region}
              onChange={(e) => handleChange("region", e.target.value)}
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
          <div className="mb-3">
            <label className="block mb-1">Crops</label>
            <input
              type="text"
              value={formData.crops}
              onChange={(e) => handleChange("crops", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex gap-3">
            <div className="mb-3 flex-1">
              <label className="block mb-1">Yield</label>
              <input
                type="number"
                value={formData.yield ?? 0}
                onChange={(e) => handleChange("yield", Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-3 flex-1">
              <label className="block mb-1">Hectares</label>
              <input
                type="number"
                value={formData.hectares ?? 0}
                onChange={(e) => handleChange("hectares", Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Carbon Sequestered</label>
            <input
              type="number"
              value={formData.carbon_sequestered ?? 0}
              onChange={(e) => handleChange("carbon_sequestered", Number(e.target.value))}
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