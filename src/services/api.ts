import axiosInstance from "./axios-instance"

export const getRequest = <T>(url: string, params?: Record<string, any>) =>
    axiosInstance.get<T>(url + '/', { params }).then(res => res.data)

export const postRequest = <T>(url: string, data?: any) =>
    axiosInstance.post<T>(url + '/', data).then(res => res.data)

export const deleteRequest = (url: string) =>
    axiosInstance.delete(url + '/').then(res => res.data)