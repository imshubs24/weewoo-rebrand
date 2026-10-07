import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Application error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                    <div className="text-5xl mb-4">⚠️</div>

                    <h1 className="text-2xl font-semibold text-slate-800">
                        Something went wrong
                    </h1>

                    <p className="mt-2 text-slate-500 max-w-md">
                        Something unexpected happened. Please refresh the page and try again.
                    </p>

                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="mt-6 px-5 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;