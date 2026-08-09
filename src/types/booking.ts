export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  tenantId: string;
  ownerId: string;
  ownerName: string;
  status: BookingStatus;
  visitDate: string;
  visitTime: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  propertyId: string;
  visitDate: string;
  visitTime: string;
  message?: string;
}
