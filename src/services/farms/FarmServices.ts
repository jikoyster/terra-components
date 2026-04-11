// src/services/FarmService.ts
import { supabase } from "../../lib/supabaseClient";

// definition of Farm interface and functions to interact with the "farms" table in Supabase
export interface Farm {
  farm_id: number;
  name: string;
  region: string;
  yield?: number; // Optional field, add more fields as necessary
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