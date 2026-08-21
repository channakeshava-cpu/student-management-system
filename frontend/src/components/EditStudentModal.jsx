import { useState } from "react";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import { DEPARTMENTS } from "../utils/studentUtils";

function EditStudentModal({ student, onClose, onSave }) {
    const [form, setForm] = useState(student || {});
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
            await onSave(student.id, form);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update student.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!student) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Student</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name || ""}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email || ""}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        value={form.phone || ""}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="department"
                        value={form.department || ""}
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
                        value={form.cgpa || ""}
                        onChange={handleChange}
                        required
                    />

                    <div className="modal-buttons">
                        <button type="submit" disabled={submitting}>
                            <Save size={18} />
                            {submitting ? "Saving..." : "Save"}
                        </button>

                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditStudentModal;
