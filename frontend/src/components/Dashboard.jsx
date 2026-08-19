import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/students?page=0&size=20`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStudents(response.data.content);

        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");

        window.location.reload();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Student Dashboard</h2>

            <button onClick={handleLogout}>
                Logout
            </button>

            <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>CGPA</th>
                </tr>
                </thead>

                <tbody>
                {students.map(student => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.department}</td>
                        <td>{student.cgpa}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}

export default Dashboard;