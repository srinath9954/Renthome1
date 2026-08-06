import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../../constants/api';
import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  AuthResponse,
} from '../../types/auth';

// Placeholder service — replace with real API calls when backend is ready

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(API_ENDPOINTS.LOGIN, data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(API_ENDPOINTS.REGISTER, data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
    const response = await axiosInstance.post<{ message: string }>(
      API_ENDPOINTS.FORGOT_PASSWORD,
      data,
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post(API_ENDPOINTS.LOGOUT);
  },

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await axiosInstance.post<{ accessToken: string }>(
      API_ENDPOINTS.REFRESH_TOKEN,
      { refreshToken },
    );
    return response.data;
  },
};
