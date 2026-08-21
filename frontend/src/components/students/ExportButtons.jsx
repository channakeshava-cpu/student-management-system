import { FileDown, FileSpreadsheet } from "lucide-react";
import { exportStudentsToExcel, exportStudentsToPDF } from "../../utils/exportUtils";

function ExportButtons({ students }) {
    return (
        <div className="export-buttons">
            <button
                className="secondary-button"
                onClick={() => exportStudentsToExcel(students)}
                disabled={!students.length}
            >
                <FileSpreadsheet size={18} />
                Excel
            </button>

            <button
                className="secondary-button"
                onClick={() => exportStudentsToPDF(students)}
                disabled={!students.length}
            >
                <FileDown size={18} />
                PDF
            </button>
        </div>
    );
}

export default ExportButtons;
