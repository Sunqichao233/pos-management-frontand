import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios, { type AxiosRequestConfig } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 原始 Axios 实例
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000, // 超时时间，避免一直卡住
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器（保持返回原始响应，统一在封装层取 data）
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// 轻量封装，确保泛型返回的是 data 而非 AxiosResponse
type ApiClient = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
}

const api: ApiClient = {
  get: (url, config) => axiosInstance.get(url, config).then((res) => res.data),
  post: (url, data, config) => axiosInstance.post(url, data, config).then((res) => res.data),
  put: (url, data, config) => axiosInstance.put(url, data, config).then((res) => res.data),
  delete: (url, config) => axiosInstance.delete(url, config).then((res) => res.data),
}

export default api;
