import { createContext, use, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const stored = localStorage.getItem('user:v1')
    const [userData, setUserData] = useState(
        stored ? JSON.parse(stored) : undefined
    )

    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return use(AuthContext)
}
