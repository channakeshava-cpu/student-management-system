import { LogOut, Moon, Sun } from "lucide-react";

function Header({ username, role, theme, onToggleTheme, onLogout }) {
    return (
        <header className="top-header">
            <div>
                <span className="eyebrow">Dashboard</span>
                <h1>Welcome {username || "User"}</h1>
            </div>

            <div className="header-actions">
                <button
                    className="icon-button"
                    onClick={onToggleTheme}
                    aria-label="Toggle theme"
                    title="Toggle theme"
                >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="user-chip" aria-label={`Signed in as ${username}`}>
                    <span className="avatar">{username?.charAt(0).toUpperCase() || "U"}</span>
                    <span>
                        <strong>{username || "User"}</strong>
                        <small>{role}</small>
                    </span>
                </div>

                <button className="secondary-button" onClick={onLogout}>
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
