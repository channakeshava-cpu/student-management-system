import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as studentService from "../services/studentService";
import {
    filterAndSortStudents,
    getStudentStats,
    normalizeStudentPayload,
} from "../utils/studentUtils";

const PAGE_SIZE = 5;

export function useStudents() {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("ALL");
    const [sortOption, setSortOption] = useState("NAME_ASC");

    const fetchStudents = useCallback(async () => {
        setLoading(true);

        try {
            const response = await studentService.getStudents({
                page,
                size: PAGE_SIZE,
            });

            setStudents(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            if (error.response?.status !== 401) {
                toast.error("Failed to load students.");
            }
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchStudents();
    }, [fetchStudents]);

    const addStudent = async (form) => {
        await studentService.createStudent(normalizeStudentPayload(form));
        toast.success("Student added successfully.");
        await fetchStudents();
    };

    const saveStudent = async (id, form) => {
        await studentService.updateStudent(id, normalizeStudentPayload(form));
        toast.success("Student updated successfully.");
        await fetchStudents();
    };

    const removeStudent = async (id) => {
        await studentService.deleteStudent(id);
        toast.success("Student deleted successfully.");
        await fetchStudents();
    };

    const filteredStudents = useMemo(
        () =>
            filterAndSortStudents(
                students,
                search,
                departmentFilter,
                sortOption
            ),
        [students, search, departmentFilter, sortOption]
    );

    const stats = useMemo(() => getStudentStats(students), [students]);

    return {
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
        refreshStudents: fetchStudents,
    };
}
