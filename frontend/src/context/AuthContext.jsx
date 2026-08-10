import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Minimal, dependency-free JWT payload decode + expiry check.
// (No jwt-decode package is installed, and this app only ever needs
// to read its own token's exp/claims client-side, never verify it -
// verification always happens server-side via authMiddleware.)
function decodeToken(token) {
    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
        return decoded;
    } catch {
        return null;
    }
}

function isTokenExpired(decoded) {
    if (!decoded?.exp) return false;
    return decoded.exp * 1000 < Date.now();
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Rehydrate the session on refresh instead of always bouncing
    // back to a signed-out state.
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            const decoded = decodeToken(token);

            if (decoded && !isTokenExpired(decoded)) {
                setUser(JSON.parse(storedUser));
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }

        setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}