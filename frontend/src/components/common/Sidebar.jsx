import {
    BarChart3,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Users,
    X,
} from "lucide-react";
import { NAV_ITEMS } from "../../utils/constants";

const icons = {
    dashboard: LayoutDashboard,
    students: Users,
    analytics: BarChart3,
    settings: Settings,
};

function Sidebar({ activeSection, collapsed, onToggle, onNavigate, onLogout }) {
    return (
        <aside className={`sidebar ${collapsed ? "is-collapsed" : ""}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo" aria-hidden="true">
                    <GraduationCap size={22} />
                </div>
                <div className="sidebar-brand">
                    <strong>StudentMS</strong>
                    <span>Admin Console</span>
                </div>
                <button
                    className="icon-button sidebar-toggle"
                    onClick={onToggle}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? <Menu size={20} /> : <X size={20} />}
                </button>
            </div>

            <nav className="sidebar-nav" aria-label="Primary">
                {NAV_ITEMS.map((item) => {
                    const Icon = icons[item.id];

                    return (
                        <button
                            key={item.id}
                            className={activeSection === item.id ? "active" : ""}
                            onClick={() => onNavigate(item.id)}
                            aria-current={activeSection === item.id ? "page" : undefined}
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <button className="sidebar-logout" onClick={onLogout}>
                <LogOut size={18} />
                <span>Logout</span>
            </button>
        </aside>
    );
}

export default Sidebar;
