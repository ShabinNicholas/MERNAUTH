import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
})
//REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)

)

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!error.config) return Promise.reject(error)

        const originalRequest = error.config;

        if ((error.response?.status === 403 || error.response?.status === 401) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken")

                if (!refreshToken) {
                    localStorage.clear();
                    window.location.href = "/signin"
                    return
                }

                const res = await axios.post(
                    "http://localhost:3000/refreshToken",
                    { token: refreshToken }
                );

                // const res = await axiosInstance.post("/refreshToken", {
                //     token: refreshToken,
                // })

                const newAccessToken = res.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken)
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                return axiosInstance(originalRequest)
            } catch (error) {
                console.log("Refresh token failed");

                localStorage.clear()
                window.location.href = "/signin"

            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance