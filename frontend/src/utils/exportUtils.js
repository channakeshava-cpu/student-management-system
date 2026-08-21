import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportStudentsToExcel = (students) => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    const file = new Blob([excelBuffer], {
        type: "application/octet-stream",
    });

    saveAs(file, "Students.xlsx");
};

export const exportStudentsToPDF = (students) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Student Report", 14, 20);

    autoTable(doc, {
        startY: 30,
        head: [["Name", "Email", "Phone", "Department", "CGPA"]],
        body: students.map((student) => [
            student.name,
            student.email,
            student.phone,
            student.department,
            student.cgpa,
        ]),
    });

    doc.save("Students.pdf");
};
