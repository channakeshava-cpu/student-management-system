import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportButtons({students}){

    const exportExcel=()=>{

        const worksheet=XLSX.utils.json_to_sheet(students);

        const workbook=XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Students"
        );

        const excelBuffer=XLSX.write(
            workbook,
            {
                bookType:"xlsx",
                type:"array"
            }
        );

        const file=new Blob(
            [excelBuffer],
            {
                type:"application/octet-stream"
            }
        );

        saveAs(file,"Students.xlsx");

    };

    return(

        <button
            className="excel-btn"
            onClick={exportExcel}
        >

            Export Excel

        </button>

    );

}

export default ExportButtons;