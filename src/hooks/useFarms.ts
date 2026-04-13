import { useEffect, useState, useCallback } from "react";
import { getFarms, deleteFarm, updateFarm, createFarm } from "@/services/farms/FarmServices";
import type { Farm } from "@/services/farms/FarmServices";

export function useFarms() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getFarms();

      setFarms(data);
      setLoading(false);
    }

    load();
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    await deleteFarm(id);
    setFarms((prev) => prev.filter((farm) => farm.farm_id !== id));
  }, []);

  const handleUpdate = useCallback(async (id: number, data: Partial<Farm>) => {
    const updated = await updateFarm(id, data);
    if (updated) {
      setFarms((prev) =>
        prev.map((farm) => (farm.farm_id === id ? { ...farm, ...updated } : farm))
      );
    }
  }, []);

  const handleCreate = useCallback(async (data: {
    name: string;
    region: string;
    yield: number | null;
    address: string;
    crops: string;
    hectares: number | null;
    carbon_sequestered: number | null;
  }) => {
    try {
      await createFarm(data as Omit<Farm, "farm_id">);
      const updatedFarms = await getFarms();
      setFarms(updatedFarms);
    } catch (error) {
      console.error("Error creating farm:", error);
    }
  }, []);

  return { farms, loading, handleDelete, handleUpdate, handleCreate };
}