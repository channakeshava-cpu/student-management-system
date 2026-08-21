import { Award, Building2, Sparkles, Trophy, Users } from "lucide-react";

const icons = {
    "Total Students": Users,
    Departments: Building2,
    "Average CGPA": Award,
    "Highest CGPA": Trophy,
    "Top Department": Sparkles,
};

function StatCard({ title, value }) {
    const Icon = icons[title] || Users;

    return (
        <article className="stat-card">
            <div className="stat-icon" aria-hidden="true">
                <Icon size={22} />
            </div>
            <div>
                <p>{title}</p>
                <strong>{value}</strong>
            </div>
        </article>
    );
}

export default StatCard;
