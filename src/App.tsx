import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { RestaurantCard } from './components/RestaurantCard';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { MapView } from './components/MapView';
import { QuotaWarningBanner } from './components/QuotaWarningBanner';
import { N8nChatWidget } from './components/N8nChatWidget';
import { Restaurant, FilterState, SortOption } from './types/restaurant';
import { POPULAR_LOCATIONS } from './data/seedRestaurants';
import { fetchNearbyRestaurants } from './services/placesService';
import { Utensils, Star, Compass, AlertCircle, RefreshCw } from 'lucide-react';

const GOOGLE_MAPS_API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || 'AIzaSyBegFvO2wpsSkqz3ZvSlNpuUsIZLKgmqTI';

const DEFAULT_FILTERS: FilterState = {
  minRating: 4.0,
  priceLevels: [],
  cuisine: 'All',
  searchQuery: '',
  openNowOnly: false,
  sortBy: 'rating_desc',
  radiusKm: 5
};

export default function App() {
  const [currentCity, setCurrentCity] = useState(POPULAR_LOCATIONS[0].name);
  const [centerCoordinates, setCenterCoordinates] = useState({
    lat: POPULAR_LOCATIONS[0].lat,
    lng: POPULAR_LOCATIONS[0].lng
  });
  const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [modalRestaurant, setModalRestaurant] = useState<Restaurant | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');

  // Bookmarks persistence
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('epicurean_saved_restaurants');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('epicurean_saved_restaurants', JSON.stringify(next));
      } catch {
        // Ignore localStorage quota
      }
      return next;
    });
  }, []);

  // Fetch restaurants nearby when coordinates, radius, or cuisine change
  const loadRestaurants = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const results = await fetchNearbyRestaurants({
        lat: centerCoordinates.lat,
        lng: centerCoordinates.lng,
        radiusMeters: filters.radiusKm * 1000,
        cuisine: filters.cuisine,
        minRating: filters.minRating,
        priceLevels: filters.priceLevels,
        keyword: filters.searchQuery
      });
      setRestaurants(results);
    } catch (err) {
      console.error('Failed to load nearby restaurants:', err);
      setErrorMsg('Unable to retrieve places for this location. Showing curated dining venues.');
    } finally {
      setIsLoading(false);
    }
  }, [centerCoordinates, filters.radiusKm, filters.cuisine, filters.minRating, filters.priceLevels, filters.searchQuery]);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  // Handle GPS Current Location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserCoordinates(coords);
        setCenterCoordinates(coords);
        setCurrentCity('Your Current Location');
        setIsLocating(false);
      },
      (error) => {
        console.warn('Geolocation access failed or denied:', error);
        setIsLocating(false);
        // Inform gently without alerts
        setCurrentCity(POPULAR_LOCATIONS[0].name);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Handle Location Switch
  const handleSelectLocation = (loc: { name: string; lat: number; lng: number }) => {
    setCurrentCity(loc.name);
    setCenterCoordinates({ lat: loc.lat, lng: loc.lng });
  };

  // Filter and Sort restaurants client-side
  const filteredRestaurants = useMemo(() => {
    let list = [...restaurants];

    // Filter bookmarks only
    if (showBookmarksOnly) {
      list = list.filter((r) => bookmarkedIds.includes(r.id));
    }

    // Min rating
    if (filters.minRating > 0) {
      list = list.filter((r) => r.rating >= filters.minRating);
    }

    // Price levels
    if (filters.priceLevels.length > 0) {
      list = list.filter((r) => filters.priceLevels.includes(r.priceLevel as any));
    }

    // Open Now
    if (filters.openNowOnly) {
      list = list.filter((r) => r.isOpenNow !== false);
    }

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.cuisines?.some((c) => c.toLowerCase().includes(q)) ||
          r.address.toLowerCase().includes(q)
      );
    }

    // Radius distance
    if (filters.radiusKm > 0) {
      list = list.filter((r) => r.distanceKm === undefined || r.distanceKm <= filters.radiusKm);
    }

    // Sorting
    list.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating_desc':
          return b.rating - a.rating;
        case 'reviews_desc':
          return (b.userRatingCount || 0) - (a.userRatingCount || 0);
        case 'distance_asc':
          return (a.distanceKm || 0) - (b.distanceKm || 0);
        case 'price_asc':
          return (a.priceLevel || 1) - (b.priceLevel || 1);
        case 'price_desc':
          return (b.priceLevel || 1) - (a.priceLevel || 1);
        default:
          return b.rating - a.rating;
      }
    });

    return list;
  }, [restaurants, filters, showBookmarksOnly, bookmarkedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Client-Side Demo Key Quota Defense Banner */}
      <QuotaWarningBanner />

      {/* Top Bar Contract Navigation */}
      <Header
        currentLocationName={currentCity}
        onSelectLocation={handleSelectLocation}
        onUseCurrentLocation={handleUseCurrentLocation}
        isLocating={isLocating}
        bookmarkCount={bookmarkedIds.length}
        showBookmarksOnly={showBookmarksOnly}
        onToggleBookmarks={() => setShowBookmarksOnly((prev) => !prev)}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
      />

      {/* Filter and Control Bar */}
      <FilterBar
        filters={filters}
        onChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
        onReset={() => setFilters(DEFAULT_FILTERS)}
        totalMatches={filteredRestaurants.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
        {/* Left Column: Restaurant List */}
        <section
          className={`w-full lg:w-[55%] xl:w-[50%] h-[calc(100vh-14rem)] overflow-y-auto px-4 sm:px-6 py-5 border-r border-slate-200 ${
            viewMode === 'map' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Header indicator inside list */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900">
                {showBookmarksOnly
                  ? 'Saved Bookmarks'
                  : `Top-Rated Dining in ${currentCity}`}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing vetted venues with verified high ratings and authentic patron feedback.
              </p>
            </div>

            <button
              onClick={loadRestaurants}
              disabled={isLoading}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Refresh nearby places"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-600' : ''}`} />
            </button>
          </div>

          {/* Error Notice if any */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-4 animate-pulse"
                >
                  <div className="w-full sm:w-48 h-36 bg-slate-200 rounded-lg shrink-0"></div>
                  <div className="flex-1 space-y-2.5 py-1">
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRestaurants.length > 0 ? (
            /* Restaurant Cards List */
            <div className="space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  isSelected={selectedRestaurant?.id === restaurant.id}
                  isBookmarked={bookmarkedIds.includes(restaurant.id)}
                  onSelect={() => {
                    setSelectedRestaurant(restaurant);
                    // On mobile, switch to map or keep view
                  }}
                  onToggleBookmark={() => toggleBookmark(restaurant.id)}
                  onViewDetails={() => setModalRestaurant(restaurant)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center my-6 max-w-md mx-auto">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Utensils className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-1">
                No matching restaurants found
              </h2>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                We couldn't find any places matching your current rating, cuisine, or price range filters in this area.
              </p>
              <button
                onClick={() => {
                  setFilters(DEFAULT_FILTERS);
                  setShowBookmarksOnly(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </section>

        {/* Right Column: Google Maps Interactive View */}
        <section
          className={`w-full lg:w-[45%] xl:w-[50%] h-[calc(100vh-14rem)] relative ${
            viewMode === 'list' ? 'hidden lg:block' : 'block'
          }`}
        >
          <MapView
            apiKey={GOOGLE_MAPS_API_KEY}
            center={centerCoordinates}
            zoom={13}
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            onSelectRestaurant={(r) => setSelectedRestaurant(r)}
            onViewDetails={(r) => setModalRestaurant(r)}
            userCoordinates={userCoordinates}
          />
        </section>
      </main>

      {/* Restaurant Detailed View Modal */}
      <RestaurantDetailModal
        restaurant={modalRestaurant}
        isOpen={Boolean(modalRestaurant)}
        onClose={() => setModalRestaurant(null)}
        isBookmarked={modalRestaurant ? bookmarkedIds.includes(modalRestaurant.id) : false}
        onToggleBookmark={() => {
          if (modalRestaurant) toggleBookmark(modalRestaurant.id);
        }}
      />

      {/* n8n AI Chatbot Widget */}
      <N8nChatWidget />
    </div>
  );
}
