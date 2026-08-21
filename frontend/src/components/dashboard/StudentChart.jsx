import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function StudentChart({ students }) {
    const data = Object.entries(
        students.reduce((acc, student) => {
            acc[student.department] = (acc[student.department] || 0) + 1;
            return acc;
        }, {})
    ).map(([department, count]) => ({
        department,
        count,
    }));

    return (
        <section className="panel analytics-panel" id="analytics">
            <div className="panel-heading">
                <div>
                    <span className="eyebrow">Analytics</span>
                    <h2>Students by Department</h2>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="department" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
}

export default StudentChart;
