import { useState } from "react";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Dashboard from "./components/dashboard/Dashboard";
import { useAuth } from "./hooks/useAuth";

function App() {
    const [showLogin, setShowLogin] = useState(true);
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Dashboard />;
    }

    return (
        <>
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
