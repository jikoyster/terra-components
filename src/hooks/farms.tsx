// src/hooks/useFarms.ts
import { useEffect, useState } from "react";
import { getFarms, Farm } from "../services/farms";

export function useFarms() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFarms()
      .then(setFarms)
      .finally(() => setLoading(false));
  }, []);

  return { farms, loading };
}