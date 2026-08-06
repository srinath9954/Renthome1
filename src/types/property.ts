export type PropertyType = 'apartment' | 'house' | 'villa' | 'studio' | 'pg' | 'commercial';
export type BHKType = '1RK' | '1BHK' | '2BHK' | '3BHK' | '4BHK' | '4+BHK';
export type FurnishedStatus = 'furnished' | 'semi-furnished' | 'unfurnished';
export type ListingType = 'rent' | 'sale' | 'pg';
export type PropertyStatus = 'available' | 'rented' | 'sold' | 'pending';

export interface PropertyLocation {
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  bhk: BHKType;
  furnishedStatus: FurnishedStatus;
  listingType: ListingType;
  status: PropertyStatus;
  rent: number;
  deposit: number;
  area: number;
  floor?: number;
  totalFloors?: number;
  bathrooms: number;
  parking: boolean;
  petFriendly: boolean;
  location: PropertyLocation;
  amenities: PropertyAmenity[];
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  isOwnerVerified: boolean;
  isAvailableFrom: string;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
  viewCount?: number;
}

export interface PropertyFilter {
  city?: string;
  locality?: string;
  bhk?: BHKType[];
  listingType?: ListingType;
  minRent?: number;
  maxRent?: number;
  furnishedStatus?: FurnishedStatus[];
  propertyType?: PropertyType[];
  amenities?: string[];
  petFriendly?: boolean;
  parking?: boolean;
}

export interface PropertySearchParams extends PropertyFilter {
  query?: string;
  sortBy?: 'rent' | 'date' | 'area';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
