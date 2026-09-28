export interface RestaurantReview {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface MenuItem {
  name: string;
  price?: string;
  description?: string;
  isPopular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  userRatingCount: number;
  priceLevel: number; // 1 to 4
  cuisine: string;
  cuisines: string[];
  address: string;
  lat: number;
  lng: number;
  distanceKm?: number;
  isOpenNow?: boolean;
  openingHours?: string[];
  phoneNumber?: string;
  website?: string;
  googleMapsUrl?: string;
  photos: string[];
  summary?: string;
  highlights?: string[];
  popularDishes?: MenuItem[];
  reviews?: RestaurantReview[];
}

export type PriceLevelFilter = 1 | 2 | 3 | 4;

export type SortOption = 'rating_desc' | 'reviews_desc' | 'distance_asc' | 'price_asc' | 'price_desc';

export interface FilterState {
  minRating: number;
  priceLevels: PriceLevelFilter[];
  cuisine: string;
  searchQuery: string;
  openNowOnly: boolean;
  sortBy: SortOption;
  radiusKm: number;
}
