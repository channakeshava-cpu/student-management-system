function StudentTable({
                          students,
                          onEdit,
                          onDelete
                      }) {

    return (

        <table className="student-table">

            <thead>
            <tr>
                <th>Name</th>
                <th>Department</th>
                <th>CGPA</th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>

            {students.length === 0 ? (

                <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                        No students found
                    </td>
                </tr>

            ) : (

                students.map(student => (

                    <tr key={student.id}>

                        <td>{student.name}</td>
                        <td>{student.department}</td>
                        <td>{student.cgpa}</td>

                        <td>

                            <button
                                className="edit-btn"
                                onClick={() => onEdit(student)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => onDelete(student.id)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))

            )}

            </tbody>

        </table>

    );

}

export default StudentTable;