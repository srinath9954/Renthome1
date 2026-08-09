import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../../constants/api';
import { Booking, CreateBookingRequest } from '../../types/booking';

export const bookingService = {
  getBookings: async (): Promise<Booking[]> => {
    const response = await axiosInstance.get<Booking[]>(API_ENDPOINTS.GET_BOOKINGS);
    return response.data;
  },

  getBooking: async (id: string): Promise<Booking> => {
    const url = API_ENDPOINTS.GET_BOOKING.replace(':id', id);
    const response = await axiosInstance.get<Booking>(url);
    return response.data;
  },

  createBooking: async (data: CreateBookingRequest): Promise<Booking> => {
    const response = await axiosInstance.post<Booking>(API_ENDPOINTS.CREATE_BOOKING, data);
    return response.data;
  },

  cancelBooking: async (id: string): Promise<Booking> => {
    const url = API_ENDPOINTS.CANCEL_BOOKING.replace(':id', id);
    const response = await axiosInstance.post<Booking>(url);
    return response.data;
  },
};
