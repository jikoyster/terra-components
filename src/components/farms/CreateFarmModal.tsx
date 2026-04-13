import { useState } from "react";
import type { Farm } from "@/services/farms/FarmServices";
import { X } from "lucide-react";

export function CreateFarmModal({ 
  onClose, 
  onSave 
}: { 
  onClose: () => void; 
  onSave: (data: Omit<Farm, "farm_id">) => void;
}) {
  const [formData, setFormData] = useState<Omit<Farm, "farm_id">>({
    name: "",
    region: "",
    yield: null,
    address: "",
    crops: "",
    hectares: null,
    carbon_sequestered: null,
  });

  const handleChange = (field: keyof Omit<Farm, "farm_id">, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
          <h2 style={{ margin: 0 }}>Create Farm</h2>
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
                value={formData.yield ?? ""}
                onChange={(e) => handleChange("yield", e.target.value ? Number(e.target.value) : null)}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "12px", flex: 1 }}>
              <label style={{ display: "block", marginBottom: "4px" }}>Hectares</label>
              <input
                type="number"
                value={formData.hectares ?? ""}
                onChange={(e) => handleChange("hectares", e.target.value ? Number(e.target.value) : null)}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Carbon Sequestered</label>
            <input
              type="number"
              value={formData.carbon_sequestered ?? ""}
              onChange={(e) => handleChange("carbon_sequestered", e.target.value ? Number(e.target.value) : null)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} style={{ padding: "8px 16px" }}>Cancel</button>
            <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#2563eb", color: "white", border: "none" }}>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}