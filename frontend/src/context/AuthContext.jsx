import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as authService from "../services/authService";
import { AuthContext } from "./AuthContextValue";
import { ROLES } from "../utils/constants";

const parseRole = (profile) => {
    const authorities = profile?.authorities || [];
    const authority = authorities
        .map((item) => (typeof item === "string" ? item : item.authority))
        .find((value) => value?.includes("ADMIN") || value?.includes("USER"));

    if (authority?.includes("ADMIN")) return ROLES.ADMIN;
    if (authority?.includes("USER")) return ROLES.USER;

    return profile?.role || localStorage.getItem("role") || ROLES.USER;
};

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [username, setUsername] = useState(
        () => localStorage.getItem("username") || ""
    );
    const [role, setRole] = useState(() => localStorage.getItem("role") || ROLES.USER);

    const isAuthenticated = Boolean(token);
    const isAdmin = role === ROLES.ADMIN;

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setToken(null);
        setUsername("");
        setRole(ROLES.USER);
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

        try {
            const profileResponse = await authService.getProfile();
            const nextRole = parseRole(profileResponse.data);
            const profileUsername = profileResponse.data?.username || nextUsername;

            localStorage.setItem("username", profileUsername);
            localStorage.setItem("role", nextRole);
            setUsername(profileUsername);
            setRole(nextRole);
        } catch (error) {
            console.error(error);
            localStorage.setItem("role", ROLES.USER);
            setRole(ROLES.USER);
            toast.info("Signed in with standard user access.");
        }

        toast.success("Signed in successfully.");
    }, []);

    const register = useCallback(async (payload) => {
        await authService.register(payload);
        toast.success("Registration successful. Please sign in.");
    }, []);

    const value = useMemo(
        () => ({
            isAuthenticated,
            isAdmin,
            role,
            username,
            login,
            logout,
            register,
        }),
        [isAuthenticated, isAdmin, role, username, login, logout, register]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
