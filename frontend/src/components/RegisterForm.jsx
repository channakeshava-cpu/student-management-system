import { useState } from "react";
import axios from "axios";


function RegisterForm({ setShowLogin }) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "ADMIN",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
                form
            );

            alert("Registration successful! Please sign in.");
            setShowLogin(true);
        } catch (error) {
            console.error(error);
            alert("Registration failed.");
        }
    };

    return (
        <form onSubmit={handleRegister} className="auth-form">
            <h2>Create Account</h2>

            <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
            />

            <button type="submit">Sign Up</button>

            <p>
                Already have an account?{" "}
                <span
                    style={{ color: "#2563eb", cursor: "pointer" }}
                    onClick={() => setShowLogin(true)}
                >
          Sign In
        </span>
            </p>
        </form>
    );
}

export default RegisterForm;