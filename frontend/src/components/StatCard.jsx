import { Award, Building2, Sparkles, Trophy, Users } from "lucide-react";

function StatCard({ title, value, color }) {

    const icons = {
        "Total Students": <Users size={28}/>,
        "Departments": <Building2 size={28}/>,
        "Average CGPA": <Award size={28}/>,
        "Highest CGPA": <Trophy size={28}/>,
        "Top Department": <Sparkles size={28}/>
    };

    return (

        <div className="stat-card">

            <div style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"
            }}>

                <p className="stat-title">{title}</p>

                <div style={{color}}>
                    {icons[title]}
                </div>

            </div>

            <h1 style={{
                marginTop:"12px",
                color
            }}>
                {value}
            </h1>

        </div>

    );

}

export default StatCard;
