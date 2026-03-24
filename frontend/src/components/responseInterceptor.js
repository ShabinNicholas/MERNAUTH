import axios from "axios";
import axiosInstance from "./requestInterceptor";

axiosInstance.interceptors.request(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken")

                const res = await axios.post(
                    "http://localhost:3000/refreshToken",
                    { token: refreshToken }
                )

                const newAccessToken = res.data.accessToken

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