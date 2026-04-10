// src/services/farmService.ts
import { supabase } from "../lib/supabaseClient";

export interface Farm {
  id: number;
  name: string;
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