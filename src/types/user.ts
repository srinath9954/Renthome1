export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  isVerified: boolean;
  createdAt: string;
  totalProperties?: number;
  totalBookings?: number;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  avatarUrl?: string;
}
