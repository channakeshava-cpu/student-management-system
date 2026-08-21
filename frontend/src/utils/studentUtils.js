export const normalizeStudentPayload = (form) => ({
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    department: form.department,
    cgpa: Number(form.cgpa),
});

export const filterAndSortStudents = (
    students,
    search,
    departmentFilter,
    sortOption
) =>
    [...students]
        .filter((student) =>
            student.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((student) =>
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

export const getStudentStats = (students) => {
    const departmentCount = new Set(students.map((student) => student.department))
        .size;
    const averageCgpa = students.length
        ? (
              students.reduce((sum, student) => sum + Number(student.cgpa), 0) /
              students.length
          ).toFixed(2)
        : "0.00";
    const highestCgpa = students.length
        ? Math.max(...students.map((student) => Number(student.cgpa)))
        : 0;

    const departmentStats = students.reduce((acc, student) => {
        acc[student.department] = (acc[student.department] || 0) + 1;
        return acc;
    }, {});

    const topDepartment = Object.keys(departmentStats).length
        ? Object.entries(departmentStats).sort((a, b) => b[1] - a[1])[0][0]
        : "-";

    return {
        departmentCount,
        averageCgpa,
        highestCgpa,
        topDepartment,
    };
};
