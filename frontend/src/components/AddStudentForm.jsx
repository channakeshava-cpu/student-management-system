import { useState } from "react";
import axios from "axios";

function AddStudentForm({ onStudentAdded }) {

    const [form, setForm] = useState({
        name: "",
        department: "",
        cgpa: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/students`,
                {
                    name: form.name,
                    department: form.department,
                    cgpa: Number(form.cgpa)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setForm({
                name: "",
                department: "",
                cgpa: ""
            });

            onStudentAdded();

        } catch (error) {

            console.error(error);
            alert("Failed to add student.");

        }

    };

    return (

        <form className="auth-form" onSubmit={handleSubmit}>

            <h2>Add Student</h2>

            <input
                name="name"
                placeholder="Student Name"
                value={form.name}
                onChange={handleChange}
                required
            />

            <input
                name="department"
                placeholder="Department"
                value={form.department}
                onChange={handleChange}
                required
            />

            <input
                name="cgpa"
                type="number"
                step="0.01"
                min="0"
                max="10"
                placeholder="CGPA"
                value={form.cgpa}
                onChange={handleChange}
                required
            />

            <button type="submit">
                Add Student
            </button>

        </form>

    );

}

export default AddStudentForm;