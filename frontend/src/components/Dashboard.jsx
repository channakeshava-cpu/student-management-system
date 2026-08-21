import { useState } from "react";
import { LogOut, Moon, Search, Sun } from "lucide-react";
import StatCard from "./StatCard";
import StudentTable from "./StudentTable";
import AddStudentForm from "./AddStudentForm";
import EditStudentModal from "./EditStudentModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ExportButtons from "./ExportButtons";
import { useTheme } from "../hooks/useTheme";
import StudentChart from "./StudentChart.jsx";
import { useAuth } from "../hooks/useAuth";
import { useStudents } from "../hooks/useStudents";
import { DEPARTMENTS, SORT_OPTIONS } from "../utils/studentUtils";

function Dashboard() {
    const { theme, toggleTheme } = useTheme();
    const { username, logout } = useAuth();
    const {
        students,
        filteredStudents,
        stats,
        loading,
        page,
        totalPages,
        search,
        departmentFilter,
        sortOption,
        setPage,
        setSearch,
        setDepartmentFilter,
        setSortOption,
        addStudent,
        saveStudent,
        removeStudent,
    } = useStudents();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const confirmDelete = async () => {
        if (!studentToDelete) return;

        try {
            await removeStudent(studentToDelete.id);
            setStudentToDelete(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <span className="eyebrow">Academic operations</span>
                    <h1>Student Dashboard</h1>
                    <p>Manage student records, performance snapshots, and exports.</p>
                </div>

                <div className="profile-box">
                    <button
                        className="theme-btn"
                        onClick={toggleTheme}
                        title="Toggle theme"
                    >
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className="avatar">
                        {username?.charAt(0).toUpperCase() || "A"}
                    </div>

                    <div>
                        <h4>{username || "Admin"}</h4>
                        <p>Administrator</p>
                    </div>

                    <button className="logout-btn" onClick={logout}>
                        <LogOut size={18} />
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
                    value={stats.departmentCount}
                    color="#10b981"
                />
                <StatCard
                    title="Average CGPA"
                    value={stats.averageCgpa}
                    color="#f59e0b"
                />
                <StatCard
                    title="Highest CGPA"
                    value={stats.highestCgpa}
                    color="#8b5cf6"
                />
                <StatCard
                    title="Top Department"
                    value={stats.topDepartment}
                    color="#ec4899"
                />
            </div>

            <section className="workspace-grid">
                <div className="workspace-main">
                    <div className="toolbar-panel">
                        <label className="search-bar">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search by student name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </label>

                        <div className="filter-bar">
                            <select
                                value={departmentFilter}
                                onChange={(e) => setDepartmentFilter(e.target.value)}
                            >
                                <option value="ALL">All Departments</option>
                                {DEPARTMENTS.map((department) => (
                                    <option key={department} value={department}>
                                        {department}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <ExportButtons students={filteredStudents} />
                    </div>

                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading students...</p>
                        </div>
                    ) : (
                        <StudentTable
                            students={filteredStudents}
                            onEdit={setSelectedStudent}
                            onDelete={(id) => {
                                const student = students.find((s) => s.id === id);
                                setStudentToDelete(student);
                            }}
                        />
                    )}

                    <div className="pagination">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                        <span>
                            Page {page + 1} of {totalPages || 1}
                        </span>
                        <button
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>

                <aside className="workspace-side">
                    <AddStudentForm onSubmitStudent={addStudent} />
                    <StudentChart students={students} />
                </aside>
            </section>

            {selectedStudent && (
                <EditStudentModal
                    key={selectedStudent.id}
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                    onSave={saveStudent}
                />
            )}

            {studentToDelete && (
                <DeleteConfirmModal
                    studentName={studentToDelete.name}
                    onConfirm={confirmDelete}
                    onCancel={() => setStudentToDelete(null)}
                />
            )}
        </div>
    );
}

export default Dashboard;
