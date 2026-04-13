import { useState } from "react";
import type { Farm } from "@/services/farms/FarmServices";
import { X } from "lucide-react";

export function UpdateFarmModal({ 
  farm, 
  onClose, 
  onSave 
}: { 
  farm: Farm; 
  onClose: () => void; 
  onSave: (id: number, data: Partial<Farm>) => void;
}) {
  const [formData, setFormData] = useState<Partial<Farm>>({
    name: farm.name ?? "",
    region: farm.region ?? "",
    yield: farm.yield ?? 0,
    address: farm.address ?? "",
    crops: farm.crops ?? "",
    hectares: farm.hectares ?? 0,
    carbon_sequestered: farm.carbon_sequestered ?? 0,
  });

  const handleChange = (field: keyof Farm, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(farm.farm_id, formData);
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }} onClick={onClose}>
      <div style={{
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "8px",
        width: "400px",
        maxWidth: "90%",
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2 style={{ margin: 0 }}>Update Farm</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Region</label>
            <input
              type="text"
              value={formData.region}
              onChange={(e) => handleChange("region", e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Crops</label>
            <input
              type="text"
              value={formData.crops}
              onChange={(e) => handleChange("crops", e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ marginBottom: "12px", flex: 1 }}>
              <label style={{ display: "block", marginBottom: "4px" }}>Yield</label>
              <input
                type="number"
                value={formData.yield ?? 0}
                onChange={(e) => handleChange("yield", Number(e.target.value))}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "12px", flex: 1 }}>
              <label style={{ display: "block", marginBottom: "4px" }}>Hectares</label>
              <input
                type="number"
                value={formData.hectares ?? 0}
                onChange={(e) => handleChange("hectares", Number(e.target.value))}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Carbon Sequestered</label>
            <input
              type="number"
              value={formData.carbon_sequestered ?? 0}
              onChange={(e) => handleChange("carbon_sequestered", Number(e.target.value))}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} style={{ padding: "8px 16px" }}>Cancel</button>
            <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#2563eb", color: "white", border: "none" }}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}