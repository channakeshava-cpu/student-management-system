import { useState } from "react";
import { toast } from "react-toastify";
import { LogIn } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

function LoginForm({ setShowLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            await login({ username, password });
        } catch (error) {
            console.error(error);
            toast.error("Login failed. Check your credentials.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="auth-shell">
            <form className="auth-form auth-panel" onSubmit={handleLogin}>
                <div className="auth-heading">
                    <span className="eyebrow">Welcome back</span>
                    <h1>Sign in to manage students</h1>
                    <p>Access student records, analytics, exports, and CRUD tools.</p>
                </div>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={submitting}>
                    <LogIn size={18} />
                    {submitting ? "Signing in..." : "Sign In"}
                </button>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <button type="button" onClick={() => setShowLogin(false)}>
                        Sign Up
                    </button>
                </p>
            </form>
        </main>
    );
}

export default LoginForm;
