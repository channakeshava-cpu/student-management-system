import { useState } from "react";
import { toast } from "react-toastify";
import { UserPlus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { ROLES } from "../../utils/constants";
import { validateRegister } from "../../utils/validators";

function RegisterForm({ setShowLogin }) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: ROLES.USER,
    });
    const [submitting, setSubmitting] = useState(false);
    const { register } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const validationError = validateRegister(form);
        if (validationError) {
            toast.error(validationError);
            return;
        }

        setSubmitting(true);

        try {
            await register(form);
            setShowLogin(true);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Registration failed.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="auth-page">
            <form onSubmit={handleRegister} className="auth-card">
                <div className="auth-heading">
                    <span className="eyebrow">Create Account</span>
                    <h1>Register a new user</h1>
                    <p>The payload matches the existing Spring Boot DTO.</p>
                </div>

                <label>
                    Username
                    <input
                        name="username"
                        placeholder="Enter username"
                        value={form.username}
                        onChange={handleChange}
                        autoComplete="username"
                    />
                </label>

                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />
                </label>

                <label>
                    Password
                    <input
                        name="password"
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                </label>

                <label>
                    Role
                    <select name="role" value={form.role} onChange={handleChange}>
                        <option value={ROLES.USER}>USER</option>
                        <option value={ROLES.ADMIN}>ADMIN</option>
                    </select>
                </label>

                <button type="submit" className="primary-button" disabled={submitting}>
                    <UserPlus size={18} />
                    {submitting ? "Creating..." : "Create Account"}
                </button>

                <p className="auth-switch">
                    Already registered?{" "}
                    <button type="button" onClick={() => setShowLogin(true)}>
                        Sign in
                    </button>
                </p>
            </form>
        </main>
    );
}

export default RegisterForm;
