import axios from "axios"

export const handleLogout= async (req, res) => {
    try {
        const refreshToken = localStorage.getItem("refreshToken")

        await axios.post("http://localhost:3000/logout", {
            token: refreshToken
        })

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken")

        window.location.href="/signin"
    } catch (error) {
        console.log("Logout error", error);
        
    }
}