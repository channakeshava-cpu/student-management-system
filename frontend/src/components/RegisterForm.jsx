import { useState } from "react";
import { toast } from "react-toastify";
import { UserPlus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

function RegisterForm({ setShowLogin }) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "ADMIN",
    });
    const [submitting, setSubmitting] = useState(false);
    const { register } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await register(form);
            setShowLogin(true);
        } catch (error) {
            console.error(error);
            toast.error("Registration failed.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="auth-shell">
            <form onSubmit={handleRegister} className="auth-form auth-panel">
                <div className="auth-heading">
                    <span className="eyebrow">New workspace</span>
                    <h1>Create your account</h1>
                    <p>Register an admin account using the existing backend contract.</p>
                </div>

                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={submitting}>
                    <UserPlus size={18} />
                    {submitting ? "Creating..." : "Sign Up"}
                </button>

                <p className="auth-switch">
                    Already have an account?{" "}
                    <button type="button" onClick={() => setShowLogin(true)}>
                        Sign In
                    </button>
                </p>
            </form>
        </main>
    );
}

export default RegisterForm;
