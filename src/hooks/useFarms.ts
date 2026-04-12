import { useEffect, useState } from "react";
import { getFarms } from "@/services/farms/FarmServices";
import type { Farm } from "@/services/farms/FarmServices";
import { updateFarm, createFarm, deleteFarm } from "@/services/farms/FarmServices";

export function useFarms() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getFarms();

      // await createFarm({
      //   name: "New Farm",
      //   region: "Unknown",
      //   yield: 0,
      // });

      setFarms(data);
      setLoading(false);
    }

    
    load();
  }, []);

  return { farms, loading, setFarms };
}