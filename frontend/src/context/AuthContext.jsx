import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // On mount, check if tokens exist in localStorage
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserData(decoded);
            } catch (e) {
                localStorage.removeItem('access_token');
            }
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ userData, setUserData, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};