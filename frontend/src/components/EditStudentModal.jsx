import { useState, useEffect } from "react";
import axios from "axios";

function EditStudentModal({ student, onClose, onUpdated }) {

    const [form, setForm] = useState(student || {});

    useEffect(() => {
        if (student) {
            setForm(student);
        }
    }, [student]);

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

            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/students/${student.id}`,
                {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    department: form.department,
                    cgpa: Number(form.cgpa)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            onUpdated();
            onClose();

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                JSON.stringify(error.response?.data)
            );
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

                    <input
                        name="department"
                        placeholder="Department"
                        value={form.department || ""}
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
                        value={form.cgpa || ""}
                        onChange={handleChange}
                        required
                    />

                    <div className="modal-buttons">

                        <button type="submit">
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default EditStudentModal;