// src/services/FarmService.ts
import { supabase } from "../../lib/supabaseClient";

export interface Farm {
  farm_id: number;
  name: string;
  region: string;
}

export async function getFarms(): Promise<Farm[]> {
  const { data, error } = await supabase
    .from("farms") // ⚠️ make sure table name is correct
    .select("*");

  if (error) {
    console.error(error);
    throw error;
  }

  return data || [];
}

export async function updateFarm(farm_id: number, farmData: Partial<Farm>): Promise<Farm | null> {
  const { data, error } = await supabase
    .from("farms")
    .update(farmData)
    .eq("farm_id", farm_id);

  if (error) {
    console.error(error);
    throw error;
  }

  return data && data.length > 0 ? data[0] : null;
}