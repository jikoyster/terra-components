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

  const handleCreate = useCallback(async (data: Omit<Farm, "farm_id">) => {
    try {
      await createFarm(data);
      const updatedFarms = await getFarms();
      setFarms(updatedFarms);
    } catch (error) {
      console.error("Error creating farm:", error);
    }
  }, []);

  return { farms, loading, handleDelete, handleUpdate, handleCreate };
}