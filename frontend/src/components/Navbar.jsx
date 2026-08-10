import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (

        <nav className="navbar">

            <h2>OpenLearnAI</h2>

            <div className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/profile">Profile</Link>
            </div>

            <div className="nav-right">

                <span>
                    Welcome, {user?.name || "Student"}
                </span>

                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}