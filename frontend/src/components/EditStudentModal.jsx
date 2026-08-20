import { useState, useEffect } from "react";
import axios from "axios";

function EditStudentModal({

                              student,
                              onClose,
                              onUpdated

                          }) {

    const [form, setForm] = useState(student);

    useEffect(() => {
        setForm(student);
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
                    ...form,
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
            alert("Update failed.");

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
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                    />

                    <input
                        name="cgpa"
                        type="number"
                        step="0.01"
                        value={form.cgpa}
                        onChange={handleChange}
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