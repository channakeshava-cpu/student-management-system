import { useRef, useState } from "react";
import { Filter, Search } from "lucide-react";
import Header from "../common/Header";
import LoadingSkeleton from "../common/LoadingSkeleton";
import Sidebar from "../common/Sidebar";
import AddStudentForm from "../students/AddStudentForm";
import DeleteConfirmModal from "../students/DeleteConfirmModal";
import EditStudentModal from "../students/EditStudentModal";
import ExportButtons from "../students/ExportButtons";
import StudentTable from "../students/StudentTable";
import StatCard from "./StatCard";
import StudentChart from "./StudentChart";
import { useAuth } from "../../hooks/useAuth";
import { useStudents } from "../../hooks/useStudents";
import { useTheme } from "../../hooks/useTheme";
import { DEPARTMENTS, SORT_OPTIONS } from "../../utils/constants";

function Dashboard() {
    const { theme, toggleTheme } = useTheme();
    const { username, role, isAdmin, logout } = useAuth();
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
    const [activeSection, setActiveSection] = useState("dashboard");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const addPanelRef = useRef(null);

    const confirmDelete = async () => {
        if (!studentToDelete) return;

        try {
            await removeStudent(studentToDelete.id);
            setStudentToDelete(null);
        } catch (error) {
            console.error(error);
        }
    };

    const navigate = (section) => {
        setActiveSection(section);
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    };

    const focusAddStudent = () => {
        addPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className={`app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
            <Sidebar
                activeSection={activeSection}
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed((value) => !value)}
                onNavigate={navigate}
                onLogout={logout}
            />

            <main className="dashboard-main">
                <Header
                    username={username}
                    role={role}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    onLogout={logout}
                />

                <section className="dashboard-section" id="dashboard">
                    <div className="section-heading">
                        <div>
                            <span className="eyebrow">Overview</span>
                            <h2>Student Operations</h2>
                            <p>Review records, analytics, and academic performance.</p>
                        </div>
                    </div>

                    <div className="stats-grid">
                        <StatCard title="Total Students" value={students.length} />
                        <StatCard title="Departments" value={stats.departmentCount} />
                        <StatCard title="Average CGPA" value={stats.averageCgpa} />
                        <StatCard title="Highest CGPA" value={stats.highestCgpa} />
                        <StatCard title="Top Department" value={stats.topDepartment} />
                    </div>
                </section>

                <section className="panel student-panel" id="students">
                    <div className="panel-heading">
                        <div>
                            <span className="eyebrow">Students</span>
                            <h2>Student List</h2>
                        </div>
                        {isAdmin && <ExportButtons students={filteredStudents} />}
                    </div>

                    <div className="toolbar" aria-label="Student table filters">
                        <label className="search-control">
                            <Search size={18} />
                            <input
                                type="search"
                                placeholder="Search by name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                aria-label="Search students by name"
                            />
                        </label>

                        <label className="select-control">
                            <Filter size={18} />
                            <select
                                value={departmentFilter}
                                onChange={(e) => setDepartmentFilter(e.target.value)}
                                aria-label="Filter by department"
                            >
                                <option value="ALL">All Departments</option>
                                {DEPARTMENTS.map((department) => (
                                    <option key={department} value={department}>
                                        {department}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="select-control">
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                aria-label="Sort students"
                            >
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {loading ? (
                        <LoadingSkeleton />
                    ) : (
                        <StudentTable
                            students={filteredStudents}
                            isAdmin={isAdmin}
                            onEdit={setSelectedStudent}
                            onDelete={setStudentToDelete}
                            onAddClick={focusAddStudent}
                        />
                    )}

                    <div className="pagination" aria-label="Student pagination">
                        <button
                            className="secondary-button"
                            disabled={page === 0}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                        <span>
                            Page {page + 1} of {totalPages || 1}
                        </span>
                        <button
                            className="secondary-button"
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </section>

                <StudentChart students={students} />

                {isAdmin && (
                    <div ref={addPanelRef}>
                        <AddStudentForm onSubmitStudent={addStudent} />
                    </div>
                )}
            </main>

            {isAdmin && selectedStudent && (
                <EditStudentModal
                    key={selectedStudent.id}
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                    onSave={saveStudent}
                />
            )}

            {isAdmin && studentToDelete && (
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
