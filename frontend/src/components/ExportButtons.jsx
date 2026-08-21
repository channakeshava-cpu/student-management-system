import { FileDown, FileSpreadsheet } from "lucide-react";
import { exportStudentsToExcel, exportStudentsToPDF } from "../utils/exportUtils";

function ExportButtons({ students }) {
    return (
        <div className="export-buttons">
            <button
                className="excel-btn"
                onClick={() => exportStudentsToExcel(students)}
                disabled={!students.length}
            >
                <FileSpreadsheet size={18} />
                Export Excel
            </button>

            <button
                className="pdf-btn"
                onClick={() => exportStudentsToPDF(students)}
                disabled={!students.length}
            >
                <FileDown size={18} />
                Export PDF
            </button>
        </div>
    );
}

export default ExportButtons;
