import { useState } from "react";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import { DEPARTMENTS } from "../../utils/constants";
import { validateStudent } from "../../utils/validators";

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

        const validationError = validateStudent(form);
        if (validationError) {
            toast.error(validationError);
            return;
        }

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
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal">
                <div className="modal-heading">
                    <h2>Edit Student</h2>
                    <p>Update details for {student.name}.</p>
                </div>

                <form onSubmit={handleSubmit} className="student-form">
                    <label>
                        Name
                        <input name="name" value={form.name || ""} onChange={handleChange} />
                    </label>
                    <label>
                        Email
                        <input
                            name="email"
                            type="email"
                            value={form.email || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Phone
                        <input name="phone" value={form.phone || ""} onChange={handleChange} />
                    </label>
                    <label>
                        Department
                        <select
                            name="department"
                            value={form.department || ""}
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
                            value={form.cgpa || ""}
                            onChange={handleChange}
                        />
                    </label>

                    <div className="modal-actions">
                        <button type="button" className="secondary-button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="primary-button" disabled={submitting}>
                            <Save size={18} />
                            {submitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditStudentModal;
