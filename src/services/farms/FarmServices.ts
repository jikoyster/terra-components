// src/services/FarmService.ts
import { supabase } from "../../lib/supabaseClient";

// definition of Farm interface and functions to interact with the "farms" table in Supabase
export interface Farm {
  farm_id: number;
  name: string | null;
  region: string | null;
  yield: number | null;
  address: string | null;
  crops: string | null;
  hectares: number | null;
  carbon_sequestered: number | null;
  created_at: string | null;
  updated_at: string | null;
}

// CREATE: Add a new farm
export async function createFarm(farmData: Omit<Farm, "farm_id">): Promise<Farm> {
  const { data, error } = await supabase
    .from("farms")
    .insert(farmData)
    .single(); // Get the inserted row back

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

// READ: Get all farms
export async function getFarms(): Promise<Farm[]> {
  const { data, error } = await supabase
    .from("farms") // ⚠️ make sure table name is correct
    .select("*")
    .order("farm_id", { ascending: true }); // Optional: order by farm_id

  if (error) {
    console.error(error);
    throw error;
  }

  return data || [];
}

// UPDATE: Update a farm by its ID
export async function updateFarm(farm_id: number, farmData: Partial<Farm>): Promise<Farm | null> {
  const { data, error } = await supabase
    .from("farms")
    .update(farmData)
    .eq("farm_id", farm_id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

// DELETE: Delete a farm by its ID
export async function deleteFarm(farm_id: number): Promise<void> {
  const { error } = await supabase
    .from("farms")
    .delete()
    .eq("farm_id", farm_id);

  if (error) {
    console.error(error);
    throw error;
  }
} 