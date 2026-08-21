import { useState } from "react";
import { toast } from "react-toastify";
import { LogIn } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { validateLogin } from "../../utils/validators";

function LoginForm({ setShowLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();

        const validationError = validateLogin({ username, password });
        if (validationError) {
            toast.error(validationError);
            return;
        }

        setSubmitting(true);

        try {
            await login({ username, password });
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Login failed.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="auth-page">
            <form className="auth-card" onSubmit={handleLogin}>
                <div className="auth-heading">
                    <span className="eyebrow">Student Management System</span>
                    <h1>Sign in to your dashboard</h1>
                    <p>Use your existing backend account credentials.</p>
                </div>

                <label>
                    Username
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </label>

                <button type="submit" className="primary-button" disabled={submitting}>
                    <LogIn size={18} />
                    {submitting ? "Signing in..." : "Sign In"}
                </button>

                <p className="auth-switch">
                    New here?{" "}
                    <button type="button" onClick={() => setShowLogin(false)}>
                        Create account
                    </button>
                </p>
            </form>
        </main>
    );
}

export default LoginForm;
