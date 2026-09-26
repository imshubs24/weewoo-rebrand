const ServerError = ({ onRetry }) => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="text-5xl mb-4">⚠️</div>

            <h2 className="text-2xl font-semibold text-slate-800">
                Server is waking up
            </h2>

            <p className="mt-2 text-slate-500 max-w-md">
                The server may have been inactive for a while. Please wait a
                few seconds and try again.
            </p>

            <button
                onClick={onRetry}
                className="mt-6 px-5 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
            >
                Try Again
            </button>
        </div>
    );
};

export default ServerError;