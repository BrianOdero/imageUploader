import { AuthProvider, useAuth } from "@/provider/AuthProvider";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {


  const InitialLayout = () => {

    const {session , initialized } = useAuth();
    const segments = useSegments()
    const router = useRouter()

    //use effect for redirecting based on authentication status
    useEffect(() => {

      if(!initialized) return;

      //declaring folder requiring authentication
      const InAuthGroup = segments[0] === '(auth)';

      if(session && !InAuthGroup){
        //redirect authenticated users to list
        router.replace('list')
      }
      else if(!session && InAuthGroup){
        //redirect unauthenticated users to login
        router.replace('/')
      }
      
    }, [session,initialized])
    
    
    return <Slot/>
  }

  return (
    <AuthProvider>
      <InitialLayout/>
    </AuthProvider>
  )
}
