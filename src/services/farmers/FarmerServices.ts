// src/services/farmers/FarmerServices.ts
import { supabase } from "../../lib/supabaseClient";

// Definition of Farmer interface and functions to interact with the "farmers" table in Supabase
export interface Farmer {
  farmer_id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  farm_id: number | null;
  created_at: string | null;
  updated_at: string | null;
}

// CREATE: Add a new farmer
export async function createFarmer(farmerData: Omit<Farmer, "farmer_id">): Promise<Farmer> {
  const { data, error } = await supabase
    .from("farmers")
    .insert(farmerData)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

// READ: Get all farmers
export async function getFarmers(): Promise<Farmer[]> {
  const { data, error } = await supabase
    .from("farmers")
    .select("*")
    .order("farmer_id", { ascending: true });

  if (error) {
    console.error(error);
    throw error;
  }

  return data || [];
}

// UPDATE: Update a farmer by its ID
export async function updateFarmer(farmer_id: number, farmerData: Partial<Farmer>): Promise<Farmer | null> {
  const { data, error } = await supabase
    .from("farmers")
    .update(farmerData)
    .eq("farmer_id", farmer_id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

// DELETE: Delete a farmer by its ID
export async function deleteFarmer(farmer_id: number): Promise<void> {
  const { error } = await supabase
    .from("farmers")
    .delete()
    .eq("farmer_id", farmer_id);

  if (error) {
    console.error(error);
    throw error;
  }
}
