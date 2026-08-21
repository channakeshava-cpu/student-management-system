import api from "./api";

export const getStudents = ({ page = 0, size = 5 } = {}) =>
    api.get("/api/students", {
        params: { page, size },
    });

export const createStudent = (student) => api.post("/api/students", student);

export const updateStudent = (id, student) =>
    api.put(`/api/students/${id}`, student);

export const deleteStudent = (id) => api.delete(`/api/students/${id}`);
