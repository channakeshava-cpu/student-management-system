import { useState, useEffect } from "react";
import axios from "axios";
import StatCard from "./StatCard";
import StudentTable from "./StudentTable";
import AddStudentForm from "./AddStudentForm";
import EditStudentModal from "./EditStudentModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { toast } from "react-toastify";
import ExportButtons from "./ExportButtons";

function Dashboard() {

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [departmentFilter, setDepartmentFilter] = useState("ALL");
    const [sortOption, setSortOption] = useState("NAME_ASC");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchStudents();
    }, [page]);

    const fetchStudents = async () => {

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/students?page=${page}&size=5`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            setStudents(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch(error){

            console.error(error);

            toast.error("Failed to load students.");

        } finally{

            setLoading(false);

        }

    };

    const deleteStudent = async () => {

        if (!studentToDelete) return;

        try {

            const token = localStorage.getItem("token");

            await axios.delete(

                `${import.meta.env.VITE_API_BASE_URL}/api/students/${studentToDelete.id}`,

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );

            toast.success("Student deleted.");

            setStudentToDelete(null);

            fetchStudents();

        } catch(error){

            console.error(error);

            toast.error("Delete failed.");

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

    const filteredStudents = [...students]

        .filter(student =>
            student.name.toLowerCase().includes(search.toLowerCase())
        )

        .filter(student =>
            departmentFilter === "ALL"
                ? true
                : student.department === departmentFilter
        )



        .sort((a, b) => {

            switch (sortOption) {

                case "NAME_ASC":
                    return a.name.localeCompare(b.name);

                case "NAME_DESC":
                    return b.name.localeCompare(a.name);

                case "CGPA_DESC":
                    return b.cgpa - a.cgpa;

                case "DEPARTMENT":
                    return a.department.localeCompare(b.department);

                default:
                    return 0;

            }

        });
    const username=localStorage.getItem("username");

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <h1>Student Dashboard</h1>
                    <p>Manage your students efficiently</p>
                </div>

                <div className="profile-box">

                    <div className="avatar">
                        {username?.charAt(0).toUpperCase()}
                    </div>

                    <div>

                        <h4>{username}</h4>

                        <p>Administrator</p>

                    </div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >

                        Logout

                    </button>

                </div>

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

            <div className="filter-bar">

                <select
                    value={departmentFilter}
                    onChange={(e)=>setDepartmentFilter(e.target.value)}
                >

                    <option value="ALL">All Departments</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="AIML">AIML</option>
                    <option value="IT">IT</option>
                    <option value="MECH">MECH</option>

                </select>

                <select
                    value={sortOption}
                    onChange={(e)=>setSortOption(e.target.value)}
                >

                    <option value="NAME_ASC">Name A-Z</option>
                    <option value="NAME_DESC">Name Z-A</option>
                    <option value="CGPA_DESC">CGPA High-Low</option>
                    <option value="DEPARTMENT">Department</option>

                </select>

            </div>

            <AddStudentForm onStudentAdded={fetchStudents} />

            {loading ? (

                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading students...</p>
                </div>

            ) : (

                <StudentTable
                    students={filteredStudents}
                    onEdit={setSelectedStudent}
                    onDelete={(id)=>{
                        const student=students.find(s=>s.id===id);
                        setStudentToDelete(student);
                    }}
                />

            )}

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

            {studentToDelete && (

                <DeleteConfirmModal

                    studentName={studentToDelete.name}
                    onConfirm={deleteStudent}
                    onCancel={()=>setStudentToDelete(null)}

                />

            )}

        </div>

    );

}

export default Dashboard;