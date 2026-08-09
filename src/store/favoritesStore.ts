import { create } from 'zustand';
import { Property } from '../types/property';
import { DUMMY_PROPERTIES } from '../constants/dummyData';

interface FavoritesState {
  favorites: Property[];
  addFavorite: (property: Property) => void;
  removeFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  toggleFavorite: (property: Property) => void;
}

const initialFavorites = DUMMY_PROPERTIES.filter((p) => p.isFavorite);

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: initialFavorites,

  addFavorite: (property) =>
    set((state) => ({
      favorites: state.favorites.some((f) => f.id === property.id)
        ? state.favorites
        : [...state.favorites, { ...property, isFavorite: true }],
    })),

  removeFavorite: (propertyId) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f.id !== propertyId),
    })),

  isFavorite: (propertyId) =>
    get().favorites.some((f) => f.id === propertyId),

  toggleFavorite: (property) => {
    const { isFavorite, addFavorite, removeFavorite } = get();
    if (isFavorite(property.id)) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
  },
}));
