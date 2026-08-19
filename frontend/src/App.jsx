import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <>
            <Navbar />
            {!loggedIn ? (
                <LoginForm setLoggedIn={setLoggedIn} />
            ) : (
                <Dashboard />
            )}
        </>
    );
}

export default App;