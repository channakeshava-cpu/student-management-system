import { Pencil, Trash2 } from "lucide-react";

function StudentTable({ students, onEdit, onDelete }) {
    return (
        <div className="table-shell">
            <table className="student-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>CGPA</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {students.length === 0 ? (
                        <tr>
                            <td colSpan="6">
                                <div className="empty-state">
                                    <h3>No students found</h3>
                                    <p>Add a student or adjust your filters.</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        students.map((student) => (
                            <tr key={student.id}>
                                <td>
                                    <strong>{student.name}</strong>
                                </td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>
                                    <span className="department-pill">
                                        {student.department}
                                    </span>
                                </td>
                                <td>{student.cgpa}</td>
                                <td>
                                    <div className="row-actions">
                                        <button
                                            className="edit-btn"
                                            onClick={() => onEdit(student)}
                                            title="Edit student"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => onDelete(student.id)}
                                            title="Delete student"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default StudentTable;
