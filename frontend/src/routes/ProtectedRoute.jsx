import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wrap a route with this to require login, and optionally a specific
 * role (e.g. <ProtectedRoute role="teacher">...</ProtectedRoute>).
 * Waits for AuthContext to finish rehydrating from localStorage before
 * making a redirect decision, so a page refresh doesn't briefly bounce
 * a logged-in user back to /login.
 */
function ProtectedRoute({ children, role }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <p style={{ padding: 40 }}>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;
