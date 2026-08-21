import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function StudentChart({ students }) {
    const data = Object.entries(
        students.reduce((acc, student) => {
            acc[student.department] =
                (acc[student.department] || 0) + 1;

            return acc;
        }, {})
    ).map(([department, count]) => ({
        department,
        count
    }));

    return (
        <div className="chart-card">
            <h3>Students by Department</h3>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={data}>

                    <XAxis dataKey="department"/>

                    <YAxis/>

                    <Tooltip/>

                    <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]}/>

                </BarChart>

            </ResponsiveContainer>
        </div>
    );
}

export default StudentChart;
