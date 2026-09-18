import axios from "axios";

const api = await axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh")
        ) {
            originalRequest._retry = true;

            try {
                await api.post("/api/auth/refresh");

                return api(originalRequest);
            } catch (refreshError) {
                window.dispatchEvent(new Event("auth: logout"));

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;