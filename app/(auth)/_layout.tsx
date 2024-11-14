import { useAuth } from "@/provider/AuthProvider"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Stack } from "expo-router"
import { TouchableOpacity } from "react-native"

const AuthLayout = () => {

    const {signOut , session } = useAuth()

    return (
    <Stack>
        <Stack.Screen name="list"
        redirect={!session}
         options={{
            headerRight: () => (
            <TouchableOpacity onPress={signOut}>
                <Ionicons name="exit-outline" size={24} color={"blue"}/>
            </TouchableOpacity>)
        }}/>

    </Stack>
    )
}

export default AuthLayout