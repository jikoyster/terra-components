import { useState } from "react";
import { X } from "lucide-react";

type FormData = {
  name: string;
  region: string;
  yield: number | null;
  address: string;
  crops: string;
  hectares: number | null;
  carbon_sequestered: number | null;
};

export function CreateFarmModal({ 
  onClose, 
  onSave 
}: { 
  onClose: () => void; 
  onSave: (data: FormData) => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    region: "",
    yield: null,
    address: "",
    crops: "",
    hectares: null,
    carbon_sequestered: null,
  });

  const handleChange = (field: keyof FormData, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg w-[400px] max-w-[90%]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between mb-4">
          <h2 className="m-0">Create Farm</h2>
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
                value={formData.yield ?? ""}
                onChange={(e) => handleChange("yield", e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-3 flex-1">
              <label className="block mb-1">Hectares</label>
              <input
                type="number"
                value={formData.hectares ?? ""}
                onChange={(e) => handleChange("hectares", e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Carbon Sequestered</label>
            <input
              type="number"
              value={formData.carbon_sequestered ?? ""}
              onChange={(e) => handleChange("carbon_sequestered", e.target.value ? Number(e.target.value) : null)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white border-none rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}