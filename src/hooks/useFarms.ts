import { useEffect, useState } from "react";
import { getFarms } from "@/services/farms/FarmServices";
import type { Farm } from "@/services/farms/FarmServices";
import { updateFarm } from "@/services/farms/FarmServices";

export function useFarms() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getFarms();

      await updateFarm(12, { 
        name: "aaa",
        region: "aaa",
        yield: 11111 
      }); // Example update, replace with actual logic
      
      setFarms(data);
      setLoading(false);
    }

    
    load();
  }, []);

  return { farms, loading, setFarms };
}