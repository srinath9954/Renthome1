import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../../constants/api';
import { Conversation, Message } from '../../types/chat';

export const chatService = {
  getConversations: async (): Promise<Conversation[]> => {
    const response = await axiosInstance.get<Conversation[]>(API_ENDPOINTS.GET_CONVERSATIONS);
    return response.data;
  },

  getMessages: async (conversationId: string): Promise<Message[]> => {
    const url = API_ENDPOINTS.GET_MESSAGES.replace(':id', conversationId);
    const response = await axiosInstance.get<Message[]>(url);
    return response.data;
  },

  sendMessage: async (conversationId: string, content: string): Promise<Message> => {
    const url = API_ENDPOINTS.SEND_MESSAGE.replace(':id', conversationId);
    const response = await axiosInstance.post<Message>(url, { content });
    return response.data;
  },
};
