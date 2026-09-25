import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50">
            <AdminNavbar />

            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 min-w-0 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;