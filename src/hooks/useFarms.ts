import { useEffect, useState } from "react";
import { getFarms } from "@/services/farms/FarmList";
import type { Farm } from "@/services/farms/FarmList";
import { updateFarm } from "../services/farms/FarmServices";

export function useFarms() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getFarms();


      await updateFarm(12, {
        name: "New Name",
        region: "Updated Region",
      });
      
      setFarms(data);
      setLoading(false);
    }

    async function update() {
      await updateFarm(12,{
        name: "Updated Farm",
        region: "Updated Region",
      });
    }
    
    load();
  }, []);

  return { farms, loading, setFarms };
}