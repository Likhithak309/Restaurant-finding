import React, { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap
} from '@vis.gl/react-google-maps';
import { Restaurant } from '../types/restaurant';
import { Star, MapPin, Navigation, ExternalLink } from 'lucide-react';

interface MapViewProps {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onSelectRestaurant: (restaurant: Restaurant | null) => void;
  onViewDetails: (restaurant: Restaurant) => void;
  userCoordinates?: { lat: number; lng: number } | null;
}

// Controller to smoothly pan the map when center or selection changes
const MapController: React.FC<{
  center: { lat: number; lng: number };
  selectedRestaurant: Restaurant | null;
}> = ({ center, selectedRestaurant }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (selectedRestaurant) {
      map.panTo({ lat: selectedRestaurant.lat, lng: selectedRestaurant.lng });
    } else {
      map.panTo(center);
    }
  }, [map, center, selectedRestaurant]);

  return null;
};

export const MapView: React.FC<MapViewProps> = ({
  apiKey,
  center,
  zoom,
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
  onViewDetails,
  userCoordinates
}) => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-100 min-h-[400px]">
      <APIProvider apiKey={apiKey} libraries={['places', 'marker', 'geometry', 'core']}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          gestureHandling="greedy"
          disableDefaultUI={false}
          className="w-full h-full"
          onClick={() => onSelectRestaurant(null)}
        >
          <MapController center={center} selectedRestaurant={selectedRestaurant} />

          {/* User Location Marker */}
          {userCoordinates && (
            <AdvancedMarker
              position={userCoordinates}
              title="Your Location"
              zIndex={50}
            >
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-75"></span>
                <div className="w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-lg z-10"></div>
              </div>
            </AdvancedMarker>
          )}

          {/* Restaurant Markers */}
          {restaurants.map((restaurant) => {
            const isSelected = selectedRestaurant?.id === restaurant.id;
            const isHovered = activeHoverId === restaurant.id;

            return (
              <AdvancedMarker
                key={restaurant.id}
                position={{ lat: restaurant.lat, lng: restaurant.lng }}
                title={restaurant.name}
                zIndex={isSelected ? 100 : isHovered ? 90 : 10}
                onClick={() => onSelectRestaurant(restaurant)}
              >
                {/* Custom Marker Pin */}
                <div
                  onMouseEnter={() => setActiveHoverId(restaurant.id)}
                  onMouseLeave={() => setActiveHoverId(null)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold shadow-md transition-all transform cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-white ring-4 ring-amber-500/30 scale-110 -translate-y-1'
                      : isHovered
                      ? 'bg-slate-900 text-white scale-105 -translate-y-0.5'
                      : 'bg-white text-slate-800 border border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <Star
                    className={`w-3 h-3 ${
                      isSelected || isHovered
                        ? 'fill-white text-white'
                        : 'fill-amber-400 text-amber-500'
                    }`}
                  />
                  <span className="tabular-nums">{restaurant.rating.toFixed(1)}</span>
                </div>
              </AdvancedMarker>
            );
          })}

          {/* InfoWindow for Selected Restaurant */}
          {selectedRestaurant && (
            <InfoWindow
              position={{ lat: selectedRestaurant.lat, lng: selectedRestaurant.lng }}
              onCloseClick={() => onSelectRestaurant(null)}
              headerContent={
                <div className="font-serif-display font-bold text-sm text-slate-900 pr-2">
                  {selectedRestaurant.name}
                </div>
              }
            >
              <div className="p-1 max-w-[220px] text-xs">
                {/* Image preview */}
                {selectedRestaurant.photos?.[0] && (
                  <div className="w-full h-24 rounded-lg overflow-hidden mb-2 bg-slate-100">
                    <img
                      src={selectedRestaurant.photos[0]}
                      alt={selectedRestaurant.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Rating & Cuisine */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
                  <div className="flex items-center text-amber-600 font-bold">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                    <span>{selectedRestaurant.rating.toFixed(1)}</span>
                  </div>
                  <span>·</span>
                  <span className="font-medium text-slate-700">{selectedRestaurant.cuisine}</span>
                  <span>·</span>
                  <span className="font-semibold text-slate-800">
                    {'$'.repeat(selectedRestaurant.priceLevel || 1)}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                  {selectedRestaurant.address}
                </p>

                <button
                  onClick={() => onViewDetails(selectedRestaurant)}
                  className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-[11px] font-semibold transition-colors"
                >
                  View Details & Menu
                </button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};
