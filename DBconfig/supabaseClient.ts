import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";


//function to store the supabase client JWT tokens
const ExPoSecureStoreAdapter =  {
    getItem: async (key: string) => {
        const result = await SecureStore.getItemAsync(key);
        return result;
    },
    setItem: async (key: string, value: string) => {
        await SecureStore.setItemAsync(key, value);
    },
    removeItem: async (key: string) => {
        await SecureStore.deleteItemAsync(key);
    },

}

const supabaseKey : string = process.env.EXPO_PUBLIC_ANON_KEY as string;
const supabaseUrl : string = process.env.EXPO_PUBLIC_PROJECT_URL as string;

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: ExPoSecureStoreAdapter,
        detectSessionInUrl: false,
    },
});

export default supabase;

