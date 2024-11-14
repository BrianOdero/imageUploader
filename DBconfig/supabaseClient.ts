import { createClient } from "@supabase/supabase-js";

const supabaseKey : string = process.env.EXPO_PUBLIC_ANON_KEY as string;
const supabaseUrl : string = process.env.EXPO_PUBLIC_PROJECT_URL as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

