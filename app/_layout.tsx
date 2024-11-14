import { AuthProvider } from "@/provider/AuthProvider";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {


  const InitialLayout = () => {
    return (
      <></>
    )
  }

  return (
    <AuthProvider>
      <InitialLayout/>
    </AuthProvider>
  )
}
