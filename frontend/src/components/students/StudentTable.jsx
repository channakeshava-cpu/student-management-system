import { Pencil, Trash2, Users } from "lucide-react";

function StudentTable({ students, isAdmin, onEdit, onDelete, onAddClick }) {
    return (
        <div className="table-wrap">
            <table className="student-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>CGPA</th>
                        {isAdmin && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {students.length === 0 ? (
                        <tr>
                            <td colSpan={isAdmin ? 6 : 5}>
                                <div className="empty-state">
                                    <Users size={42} />
                                    <h3>No students found</h3>
                                    <p>Add a student or adjust your filters.</p>
                                    {isAdmin && (
                                        <button
                                            type="button"
                                            className="primary-button"
                                            onClick={onAddClick}
                                        >
                                            Add Student
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ) : (
                        students.map((student, index) => (
                            <tr key={student.id} className={index % 2 ? "striped" : ""}>
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
                                {isAdmin && (
                                    <td>
                                        <div className="row-actions">
                                            <button
                                                className="icon-text-button"
                                                onClick={() => onEdit(student)}
                                                aria-label={`Edit ${student.name}`}
                                            >
                                                <Pencil size={16} />
                                                Edit
                                            </button>
                                            <button
                                                className="danger-button"
                                                onClick={() => onDelete(student)}
                                                aria-label={`Delete ${student.name}`}
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default StudentTable;
