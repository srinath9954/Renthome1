import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT } from '../../constants/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor — attach JWT
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Token will be injected here once auth is connected
    // const token = useAuthStore.getState().accessToken;
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response interceptor — handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Placeholder: trigger token refresh or logout
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
