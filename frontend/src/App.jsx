import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setLoggedIn(true);
        }
    }, []);

    if (loggedIn) {
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
                    setLoggedIn={setLoggedIn}
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