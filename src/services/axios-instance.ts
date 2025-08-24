import axios from "axios"

// export const baseURL = "http://localhost:3000"
export const baseURL = "https://api.reactgo.uz"

const axiosInstance = axios.create({
    // baseURL: "https://api.reactgo.uz",
    baseURL
})


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        // config.headers.Authorization = `Bearer ${token}`
        config.headers.Authorization = token
    }
    return config
})

axiosInstance.interceptors.response.use(
    (resp) => resp,
    (error) => {
        if (error.status === 401) {
            localStorage.removeItem('token')
        }
        return Promise.reject(error)
    }
)



export default axiosInstance
