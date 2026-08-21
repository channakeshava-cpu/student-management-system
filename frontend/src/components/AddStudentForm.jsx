import { useState } from "react";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { DEPARTMENTS } from "../utils/studentUtils";

function AddStudentForm({ onSubmitStudent }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        cgpa: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await onSubmitStudent(form);
            setForm({
                name: "",
                email: "",
                phone: "",
                department: "",
                cgpa: "",
            });
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to add student.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-heading">
                <h2>Add Student</h2>
                <p>Create a record with the backend student fields.</p>
            </div>

            <input
                name="name"
                placeholder="Student Name"
                value={form.name}
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
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
            />

            <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
            >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((department) => (
                    <option key={department} value={department}>
                        {department}
                    </option>
                ))}
            </select>

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

            <button type="submit" disabled={submitting}>
                <Plus size={18} />
                {submitting ? "Adding..." : "Add Student"}
            </button>
        </form>
    );
}

export default AddStudentForm;
