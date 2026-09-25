import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const AdminRoute = ({ children }) => {
    const { user, loading } = useUser();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;