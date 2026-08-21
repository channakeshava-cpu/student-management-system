import { GraduationCap } from "lucide-react";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="brand-mark">
                <GraduationCap size={22} />
            </div>

            <h2>
                Student Management System
            </h2>
        </nav>
    );
}

export default Navbar;
