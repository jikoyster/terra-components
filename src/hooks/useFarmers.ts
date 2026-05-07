import { useEffect, useState, useCallback } from "react";
import { getFarmers, deleteFarmer, updateFarmer, createFarmer } from "@/services/farmers/FarmerServices";
import type { Farmer } from "@/services/farmers/FarmerServices";

export function useFarmers() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getFarmers();
      setFarmers(data);
      setLoading(false);
    }

    load();
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    await deleteFarmer(id);
    setFarmers((prev) => prev.filter((farmer) => farmer.farmer_id !== id));
  }, []);

  const handleUpdate = useCallback(async (id: number, data: Partial<Farmer>) => {
    const updated = await updateFarmer(id, data);
    if (updated) {
      setFarmers((prev) =>
        prev.map((farmer) => (farmer.farmer_id === id ? { ...farmer, ...updated } : farmer))
      );
    }
  }, []);

  const handleCreate = useCallback(async (data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    farm_id: number | null;
  }) => {
    try {
      await createFarmer(data as Omit<Farmer, "farmer_id">);
      const updatedFarmers = await getFarmers();
      setFarmers(updatedFarmers);
    } catch (error) {
      console.error("Error creating farmer:", error);
    }
  }, []);

  return { farmers, loading, handleDelete, handleUpdate, handleCreate };
}
