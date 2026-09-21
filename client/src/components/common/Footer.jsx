import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full bg-[#02060C] text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                    <div className="select-none">
                        <p className="font-Mogra text-3xl text-red-500">WEEWOO!</p>
                        <p className="mt-3 text-sm">Online Food Delivery App</p>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
                            Delicious food, simple ordering, and doorstep delivery.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
                        <ul className="mt-5 flex flex-col gap-3 text-sm">
                            <li><span className="cursor-pointer hover:text-white transition-colors">About</span></li>
                            <li><span className="cursor-pointer hover:text-white transition-colors">Careers</span></li>
                            <li><span className="cursor-pointer hover:text-white transition-colors">Team</span></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact & Legal</h3>
                        <ul className="mt-5 flex flex-col gap-3 text-sm">
                            <li><Link to="/help" className="hover:text-white transition-colors">Help & Support</Link></li>
                            <li><span className="cursor-pointer hover:text-white transition-colors">Partner with us</span></li>
                            <li><span className="cursor-pointer hover:text-white transition-colors">Terms & Conditions</span></li>
                            <li><span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">We deliver to</h3>
                        <ul className="mt-5 flex flex-col gap-3 text-sm">
                            <li>Pune</li>
                            <li>Mumbai</li>
                            <li>Bangalore</li>
                            <li>Delhi</li>
                            <li>Hyderabad</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} WeeWoo. All rights reserved.</p>
                    <p>Made with ❤️ for food lovers.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;