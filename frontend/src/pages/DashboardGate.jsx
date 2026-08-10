import { useAuth } from "../context/AuthContext";
import Dashboard from "./Dashboard";
import TeacherDashboard from "./TeacherDashboard";

// /dashboard resolves to a different page depending on who's logged
// in - students get their own intelligence/progress view, teachers
// get the class-wide overview.
export default function DashboardGate() {

    const { user } = useAuth();

    if (user?.role === "teacher") {
        return <TeacherDashboard />;
    }

    return <Dashboard />;
}
