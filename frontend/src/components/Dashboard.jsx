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
                "https://student-management-system-production-7dd5.up.railway.app/api/students?page=0&size=20",
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

    return (
        <div>
            <h2>Student Dashboard</h2>

            <table border="1" cellPadding="10">
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