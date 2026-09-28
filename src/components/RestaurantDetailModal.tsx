import React, { useEffect } from 'react';
import { X, Star, MapPin, Phone, Globe, Navigation, Bookmark, Utensils, Clock, Check } from 'lucide-react';
import { Restaurant } from '../types/restaurant';

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({
  restaurant,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !restaurant) return null;

  const priceSymbols = '$'.repeat(restaurant.priceLevel || 1);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close and Bookmark */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              {restaurant.cuisine}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-slate-700">{priceSymbols}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleBookmark}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                isBookmarked
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Photo Gallery */}
          {restaurant.photos && restaurant.photos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl overflow-hidden">
              <div className="h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                <img
                  src={restaurant.photos[0]}
                  alt={restaurant.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              {restaurant.photos[1] && (
                <div className="hidden sm:block h-72 w-full overflow-hidden bg-slate-100">
                  <img
                    src={restaurant.photos[1]}
                    alt={`${restaurant.name} specialty`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* Title & Overall Rating */}
          <div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              {restaurant.name}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md text-amber-800 font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="tabular-nums">{restaurant.rating.toFixed(1)}</span>
                <span className="text-xs font-normal text-amber-700">out of 5</span>
              </div>

              <span className="text-slate-500 tabular-nums">
                Based on {restaurant.userRatingCount.toLocaleString()} patron reviews
              </span>

              {restaurant.distanceKm !== undefined && (
                <>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-600 font-medium tabular-nums">
                    {restaurant.distanceKm} km from chosen location
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Highlights */}
          {restaurant.highlights && restaurant.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs">
              {restaurant.highlights.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md font-medium"
                >
                  <Check className="w-3 h-3 text-emerald-600" />
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* Editorial Summary */}
          {restaurant.summary && (
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                About the Restaurant
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {restaurant.summary}
              </p>
            </div>
          )}

          {/* Popular Signature Dishes */}
          {restaurant.popularDishes && restaurant.popularDishes.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-600" />
                Signature Dishes & Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {restaurant.popularDishes.map((dish, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-semibold text-sm text-slate-900">{dish.name}</span>
                      {dish.price && (
                        <span className="text-xs font-bold text-amber-700 tabular-nums">
                          {dish.price}
                        </span>
                      )}
                    </div>
                    {dish.description && (
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {dish.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Information & Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {/* Contact Details */}
            <div className="space-y-3 text-xs">
              <h3 className="font-semibold text-slate-900 text-sm mb-2">Location & Contact</h3>

              <div className="flex items-start gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{restaurant.address}</span>
              </div>

              {restaurant.phoneNumber && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <a
                    href={`tel:${restaurant.phoneNumber}`}
                    className="text-amber-700 hover:underline font-medium"
                  >
                    {restaurant.phoneNumber}
                  </a>
                </div>
              )}

              {restaurant.website && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:underline font-medium truncate"
                  >
                    Visit Official Website
                  </a>
                </div>
              )}
            </div>

            {/* Operating Hours */}
            <div>
              <h3 className="font-semibold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                Operating Hours
              </h3>
              {restaurant.openingHours && restaurant.openingHours.length > 0 ? (
                <ul className="space-y-1 text-xs text-slate-600">
                  {restaurant.openingHours.map((schedule, i) => (
                    <li key={i}>{schedule}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">
                  {restaurant.isOpenNow ? 'Currently open for dine-in & takeout.' : 'Call ahead or check website for daily service hours.'}
                </p>
              )}
            </div>
          </div>

          {/* Patron Reviews */}
          {restaurant.reviews && restaurant.reviews.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-3">Patron Experiences</h3>
              <div className="space-y-3">
                {restaurant.reviews.map((rev, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
                      <span className="font-semibold text-slate-900">{rev.author}</span>
                      <div className="flex items-center gap-1 text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="font-bold">{rev.rating}</span>
                        <span className="text-slate-400 ml-1.5">{rev.relativeTime}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{rev.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Coordinates: <span className="font-mono">{restaurant.lat.toFixed(4)}, {restaurant.lng.toFixed(4)}</span>
          </div>

          <div className="flex items-center gap-2">
            {restaurant.googleMapsUrl && (
              <a
                href={restaurant.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate in Google Maps</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
