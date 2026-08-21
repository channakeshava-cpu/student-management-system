import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./hooks/useAuth";

function App() {
    const [showLogin, setShowLogin] = useState(true);
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return (
            <>
                <Navbar />
                <Dashboard />
            </>
        );
    }

    return (
        <>
            <Navbar />

            {showLogin ? (
                <LoginForm
                    setShowLogin={setShowLogin}
                />
            ) : (
                <RegisterForm
                    setShowLogin={setShowLogin}
                />
            )}
        </>
    );
}

export default App;
