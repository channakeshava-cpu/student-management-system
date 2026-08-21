import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/table.css";
import "./styles/modal.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <App />
                <ToastContainer position="top-right" theme="colored" />
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>
);
