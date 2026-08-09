import { create } from 'zustand';
import { Property, PropertyFilter } from '../types/property';
import { DUMMY_PROPERTIES } from '../constants/dummyData';

interface PropertyState {
  properties: Property[];
  featuredProperties: Property[];
  nearbyProperties: Property[];
  recentlyViewed: Property[];
  selectedProperty: Property | null;
  filters: PropertyFilter;
  isLoading: boolean;
  error: string | null;
  setProperties: (properties: Property[]) => void;
  setSelectedProperty: (property: Property | null) => void;
  addRecentlyViewed: (property: Property) => void;
  setFilters: (filters: Partial<PropertyFilter>) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: DUMMY_PROPERTIES,
  featuredProperties: DUMMY_PROPERTIES.slice(0, 3),
  nearbyProperties: DUMMY_PROPERTIES.slice(1, 4),
  recentlyViewed: DUMMY_PROPERTIES.slice(2, 5),
  selectedProperty: null,
  filters: {},
  isLoading: false,
  error: null,

  setProperties: (properties) => set({ properties }),

  setSelectedProperty: (selectedProperty) => set({ selectedProperty }),

  addRecentlyViewed: (property) =>
    set((state) => {
      const filtered = state.recentlyViewed.filter((p) => p.id !== property.id);
      return { recentlyViewed: [property, ...filtered].slice(0, 10) };
    }),

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  clearFilters: () => set({ filters: {} }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}));
