import { Link } from "react-router-dom";

const AddressRequiredPopup = ({ onClose }) => {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md bg-white border border-slate-200 rounded-xl shadow-lg p-5">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-red-50 flex items-center justify-center">
                    <i className="fa-solid fa-location-dot text-red-500"></i>
                </div>

                <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                        Delivery address required
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Please enter your delivery address before placing your order.
                    </p>

                    <Link
                        to="/profile"
                        onClick={onClose}
                        className="inline-block mt-3 text-sm font-medium text-red-500 underline underline-offset-2 hover:text-red-600"
                    >
                        Go to Profile
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Close"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
    );
};

export default AddressRequiredPopup;