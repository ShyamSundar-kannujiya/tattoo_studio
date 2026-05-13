  import axios from "axios";

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      const token =
        localStorage.getItem("adminToken") || localStorage.getItem("userToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API ERROR:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("userToken");

        if (window.location.pathname.startsWith("/admin")) {
          window.location.href = "/admin/login";
        }
      }

      return Promise.reject(error);
    },
  );

  export default api;
