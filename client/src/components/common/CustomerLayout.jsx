import Navbar from "./Navbar";
import Footer from "./Footer";

const CustomerLayout = ({ children }) => {
    return (
        <div className="w-full min-h-screen flex flex-col relative">
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default CustomerLayout;