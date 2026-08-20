import { useState, useEffect } from "react";
import axios from "axios";
import StatCard from "./StatCard";
import StudentTable from "./StudentTable";
import AddStudentForm from "./AddStudentForm";
import EditStudentModal from "./EditStudentModal";

function Dashboard() {

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchStudents();
    }, [page]);

    const fetchStudents = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/students?page=${page}&size=5`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStudents(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch (error) {

            console.error("Failed to fetch students:", error);

            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                window.location.reload();
            }

        }

    };

    const deleteStudent = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this student?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await axios.delete(

                `${import.meta.env.VITE_API_BASE_URL}/api/students/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            fetchStudents();

        } catch (error) {

            console.error(error);
            alert("Delete failed.");

        }

    };


    const handleLogout = () => {

        localStorage.removeItem("token");
        window.location.reload();

    };

    const departmentCount = new Set(
        students.map(student => student.department)
    ).size;

    const averageCgpa = students.length
        ? (
            students.reduce((sum, student) => sum + student.cgpa, 0) /
            students.length
        ).toFixed(2)
        : "0.00";

    const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <h1>Student Dashboard</h1>
                    <p>Manage your students efficiently</p>
                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            <div className="stats-grid">

                <StatCard
                    title="Total Students"
                    value={students.length}
                    color="#2563eb"
                />

                <StatCard
                    title="Departments"
                    value={departmentCount}
                    color="#10b981"
                />

                <StatCard
                    title="Average CGPA"
                    value={averageCgpa}
                    color="#f59e0b"
                />

            </div>

            <div className="search-bar">

                <input
                    type="text"
                    placeholder="Search student..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />

            </div>

            <AddStudentForm onStudentAdded={fetchStudents} />

            <StudentTable
                students={filteredStudents}
                onEdit={setSelectedStudent}
                onDelete={deleteStudent}
            />

            <div className="pagination">

                <button
                    disabled={page===0}
                    onClick={()=>setPage(page-1)}
                >
                    Previous
                </button>

                <span>
                    Page {page+1} of {totalPages || 1}
                </span>

                <button
                    disabled={page+1>=totalPages}
                    onClick={()=>setPage(page+1)}
                >
                    Next
                </button>

            </div>

            {selectedStudent && (

                <EditStudentModal

                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                    onUpdated={fetchStudents}

                />

            )}

        </div>

    );

}

export default Dashboard;