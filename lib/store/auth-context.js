"use client"

import { createContext } from "react"
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../firebase"

export const authContext = createContext({
    user: null,
    loading: false,
    googleLoginHandler: async () => { },
    logout: () => { },
})

export default function AuthContextProvider({ children }) {

    const [user, loading] = useAuthState(auth);
    const googleProvider = new GoogleAuthProvider()

    const googleLoginHandler = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        signOut(auth);
    };

    const values = { user, loading, googleLoginHandler, logout }

    return <authContext.Provider value={values}>{children}</authContext.Provider>
}