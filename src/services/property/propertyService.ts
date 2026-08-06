import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../../constants/api';
import { Property, PropertySearchParams } from '../../types/property';

export const propertyService = {
  getProperties: async (params?: PropertySearchParams): Promise<Property[]> => {
    const response = await axiosInstance.get<Property[]>(API_ENDPOINTS.GET_PROPERTIES, { params });
    return response.data;
  },

  getProperty: async (id: string): Promise<Property> => {
    const url = API_ENDPOINTS.GET_PROPERTY.replace(':id', id);
    const response = await axiosInstance.get<Property>(url);
    return response.data;
  },

  createProperty: async (data: Partial<Property>): Promise<Property> => {
    const response = await axiosInstance.post<Property>(API_ENDPOINTS.CREATE_PROPERTY, data);
    return response.data;
  },

  updateProperty: async (id: string, data: Partial<Property>): Promise<Property> => {
    const url = API_ENDPOINTS.UPDATE_PROPERTY.replace(':id', id);
    const response = await axiosInstance.put<Property>(url, data);
    return response.data;
  },

  deleteProperty: async (id: string): Promise<void> => {
    const url = API_ENDPOINTS.DELETE_PROPERTY.replace(':id', id);
    await axiosInstance.delete(url);
  },

  getFeaturedProperties: async (): Promise<Property[]> => {
    const response = await axiosInstance.get<Property[]>(API_ENDPOINTS.FEATURED_PROPERTIES);
    return response.data;
  },

  getNearbyProperties: async (lat: number, lng: number): Promise<Property[]> => {
    const response = await axiosInstance.get<Property[]>(API_ENDPOINTS.NEARBY_PROPERTIES, {
      params: { lat, lng },
    });
    return response.data;
  },

  searchProperties: async (params: PropertySearchParams): Promise<Property[]> => {
    const response = await axiosInstance.get<Property[]>(API_ENDPOINTS.SEARCH_PROPERTIES, {
      params,
    });
    return response.data;
  },
};
