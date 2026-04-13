import { useEffect, useState } from "react";
import { getFarms, updateFarm, deleteFarm } from "@/services/farms/FarmServices";
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

  const handleDelete = async (farm_id: number) => {
    await deleteFarm(farm_id);
    setFarms(farms.filter(f => f.farm_id !== farm_id));
  };

  const handleUpdate = async (farm_id: number, farmData: Partial<Farm>) => {
    await updateFarm(farm_id, farmData);
    const data = await getFarms();
    setFarms(data);
  };

  return { farms, loading, setFarms, handleDelete, handleUpdate };
}