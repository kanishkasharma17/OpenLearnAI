import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./Profile.css";

export default function Profile() {

    const { user } = useAuth();

    if (!user) return null;

    return (
        <>
            <Navbar />

            <div className="profile-page">

                <h1>My Profile</h1>

                <div className="profile-card">
                    <div className="profile-row">
                        <span className="label">Name</span>
                        <span>{user.name}</span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Email</span>
                        <span>{user.email}</span>
                    </div>
                    <div className="profile-row">
                        <span className="label">Role</span>
                        <span className="role-badge">{user.role}</span>
                    </div>
                </div>

            </div>
        </>
    );
}
