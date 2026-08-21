import api from "./api";

export const login = (credentials) => api.post("/api/auth/login", credentials);

export const register = (payload) => api.post("/api/auth/register", payload);

export const getProfile = () => api.get("/api/auth/me");
