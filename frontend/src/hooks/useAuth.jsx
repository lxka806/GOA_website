import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProfile = async () => {
        try {
            const data = await api.get("/api/user/profile");
            setUser(data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const login = async (payload) => {
        setError(null);

        const data = await api.post("/api/user/login", payload);

        setUser(data.user);

        return data;
    };

    const signup = async (payload) => {
        setError(null);

        const data = await api.post("/api/user/register", payload);

        setUser(data.user);

        return data;
    };

    const logout = async () => {
        try {
            await api.post("/api/user/logout");
        } finally {
            setUser(null);
        }
    };

    const value = useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            signup,
            logout,
            setError,
            setUser,
        }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return ctx;
};