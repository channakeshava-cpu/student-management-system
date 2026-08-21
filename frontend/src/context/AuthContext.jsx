import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as authService from "../services/authService";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [username, setUsername] = useState(
        () => localStorage.getItem("username") || ""
    );

    const isAuthenticated = Boolean(token);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken(null);
        setUsername("");
    }, []);

    useEffect(() => {
        window.addEventListener("auth:unauthorized", logout);

        return () => {
            window.removeEventListener("auth:unauthorized", logout);
        };
    }, [logout]);

    const login = useCallback(async ({ username: nextUsername, password }) => {
        const response = await authService.login({
            username: nextUsername,
            password,
        });

        const nextToken = response.data.token;
        localStorage.setItem("token", nextToken);
        localStorage.setItem("username", nextUsername);
        setToken(nextToken);
        setUsername(nextUsername);
        toast.success("Signed in successfully.");
    }, []);

    const register = useCallback(async (payload) => {
        await authService.register(payload);
        toast.success("Registration successful. Please sign in.");
    }, []);

    const value = useMemo(
        () => ({
            isAuthenticated,
            username,
            login,
            logout,
            register,
        }),
        [isAuthenticated, username, login, logout, register]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
