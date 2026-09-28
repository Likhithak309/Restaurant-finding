import React from 'react';
import { Star, MapPin, Bookmark, Utensils, ExternalLink, Clock } from 'lucide-react';
import { Restaurant } from '../types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected: boolean;
  isBookmarked: boolean;
  onSelect: () => void;
  onToggleBookmark: () => void;
  onViewDetails: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  isSelected,
  isBookmarked,
  onSelect,
  onToggleBookmark,
  onViewDetails
}) => {
  const priceSymbols = '$'.repeat(restaurant.priceLevel || 1);
  const primaryPhoto = restaurant.photos?.[0];

  return (
    <article
      onClick={onSelect}
      className={`group bg-white rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col sm:flex-row hover:shadow-md ${
        isSelected
          ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Thumbnail with Zero-Broken-Image Policy */}
      <div className="relative w-full sm:w-48 sm:min-w-[12rem] h-48 sm:h-auto shrink-0 bg-slate-100 overflow-hidden">
        {primaryPhoto ? (
          <img
            src={primaryPhoto}
            alt={restaurant.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Hide broken image and reveal fallback container underneath
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : null}

        {/* Fallback pattern container behind or when photo fails */}
        <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400 p-4 text-center">
          <Utensils className="w-8 h-8 mb-1.5 opacity-60" />
          <span className="text-[11px] font-medium text-slate-500 line-clamp-1">{restaurant.cuisine}</span>
        </div>

        {/* Bookmark quick button over image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark();
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors ${
            isBookmarked
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950'
          }`}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark restaurant'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
        </button>

        {/* Open/Closed subtle indicator */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[11px] font-medium text-white flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${restaurant.isOpenNow ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
          <span>{restaurant.isOpenNow ? 'Open Now' : 'Closed'}</span>
        </div>
      </div>

      {/* Card Content: Zero-Pill Typography */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Header (NO PILLS) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-800">{restaurant.cuisine}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-slate-700">{priceSymbols}</span>
            {restaurant.distanceKm !== undefined && (
              <>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{restaurant.distanceKm} km away</span>
              </>
            )}
          </div>

          {/* Primary Restaurant Title */}
          <h2 className="font-serif-display text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
            {restaurant.name}
          </h2>

          {/* Rating Display */}
          <div className="flex items-center gap-2 mt-1.5 mb-2">
            <div className="flex items-center gap-1 text-amber-600">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
              <span className="text-sm font-bold text-slate-900 tabular-nums">
                {restaurant.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-slate-400 tabular-nums">
              ({restaurant.userRatingCount.toLocaleString()} verified reviews)
            </span>
          </div>

          {/* Summary / Snippet */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {restaurant.summary || (restaurant.popularDishes?.[0] ? `Specialties include ${restaurant.popularDishes[0].name}.` : 'Highly acclaimed dining experience with seasonal menus.')}
          </p>

          {/* Address Line */}
          <div className="flex items-start gap-1 text-xs text-slate-500 mb-3 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="truncate">{restaurant.address}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {restaurant.googleMapsUrl && (
              <a
                href={restaurant.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
                title="Open in Google Maps"
              >
                <span>Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            View Details & Menu
          </button>
        </div>
      </div>
    </article>
  );
};
