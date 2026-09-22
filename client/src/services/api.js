import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        const isAuthRequest =
            originalRequest.url.includes("/auth/login") ||
            originalRequest.url.includes("/auth/register") ||
            originalRequest.url.includes("/auth/refresh");

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isAuthRequest
        ) {
            originalRequest._retry = true;

            try {
                await api.post("/api/auth/refresh");

                return api(originalRequest);
            } catch (refreshError) {
                window.dispatchEvent(new Event("auth:logout"));

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;