import supabase from "@/DBconfig/supabaseClient";
import { Session, User } from "@supabase/supabase-js"
import React, { createContext, PropsWithChildren, useEffect, useState } from "react"

type AuthProps = {
    user : User | null,
    session: Session | null,
    initialized ?: boolean,
    signOut?: () => void
}

export const AuthContext = createContext<Partial<AuthProps>>({});

//creating custom hook to read the context
export function useAuth () {
    return React.useContext(AuthContext)
}


//building the actual auth provider
 export const AuthProvider = ({children} : PropsWithChildren) => {

    const [user,setUser] = useState<User | null>()
    const [session, setSession] = useState<Session | null>(null)
    const [initialized, setInitialized] = useState<boolean>(false)


    // UseEffect for listening to changes in authentication state
    useEffect(() => {
        const {data} = supabase.auth.onAuthStateChange(async(event,session) => {
            setSession(session)
            setUser( session ? session.user : null)
            setInitialized(true)

        })
        return () => {
            data.subscription.unsubscribe();
        }
    }, [])

    //log out the user
    const signOut = async () => {
        await supabase.auth.signOut()
    }

    const value = {
        user, session, initialized, signOut
    }
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

 }