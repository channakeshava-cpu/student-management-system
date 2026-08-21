import { useState } from "react";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { DEPARTMENTS } from "../../utils/constants";
import { validateStudent } from "../../utils/validators";

const initialForm = {
    name: "",
    email: "",
    phone: "",
    department: "",
    cgpa: "",
};

function AddStudentForm({ onSubmitStudent }) {
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateStudent(form);
        if (validationError) {
            toast.error(validationError);
            return;
        }

        setSubmitting(true);

        try {
            await onSubmitStudent(form);
            setForm(initialForm);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to add student.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="panel add-student-panel" id="settings">
            <div className="panel-heading">
                <div>
                    <span className="eyebrow">Admin</span>
                    <h2>Add Student</h2>
                </div>
            </div>

            <form className="student-form" onSubmit={handleSubmit}>
                <label>
                    Name
                    <input name="name" value={form.name} onChange={handleChange} />
                </label>

                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Phone
                    <input name="phone" value={form.phone} onChange={handleChange} />
                </label>

                <label>
                    Department
                    <select
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                    >
                        <option value="">Select Department</option>
                        {DEPARTMENTS.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    CGPA
                    <input
                        name="cgpa"
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={form.cgpa}
                        onChange={handleChange}
                    />
                </label>

                <button className="primary-button" type="submit" disabled={submitting}>
                    <Plus size={18} />
                    {submitting ? "Adding..." : "Add Student"}
                </button>
            </form>
        </section>
    );
}

export default AddStudentForm;
