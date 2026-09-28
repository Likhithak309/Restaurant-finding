import React from 'react';
import { Bookmark, Navigation, MapPin } from 'lucide-react';
import { POPULAR_LOCATIONS } from '../data/seedRestaurants';

interface HeaderProps {
  currentLocationName: string;
  onSelectLocation: (loc: { name: string; lat: number; lng: number }) => void;
  onUseCurrentLocation: () => void;
  isLocating: boolean;
  bookmarkCount: number;
  showBookmarksOnly: boolean;
  onToggleBookmarks: () => void;
  viewMode: 'split' | 'list' | 'map';
  onToggleViewMode: (mode: 'split' | 'list' | 'map') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocationName,
  onSelectLocation,
  onUseCurrentLocation,
  isLocating,
  bookmarkCount,
  showBookmarksOnly,
  onToggleBookmarks,
  viewMode,
  onToggleViewMode
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (showBookmarksOnly) onToggleBookmarks();
          }}
          className="font-serif-display text-2xl font-bold tracking-tight text-slate-900 shrink-0 hover:text-slate-700 transition-colors"
        >
          Epicurean
        </a>

        {/* Zone 2: 4-6 clean text navigation links / location controls */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <div className="flex items-center gap-2 text-slate-700">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">City:</span>
            <select
              aria-label="Select dining city"
              value={currentLocationName}
              onChange={(e) => {
                const found = POPULAR_LOCATIONS.find((l) => l.name === e.target.value);
                if (found) onSelectLocation(found);
              }}
              className="bg-transparent font-medium text-slate-800 text-sm border-none focus:ring-0 cursor-pointer pr-4 hover:text-slate-950 transition-colors"
            >
              {POPULAR_LOCATIONS.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onUseCurrentLocation}
            disabled={isLocating}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-amber-700 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-amber-600' : 'text-slate-500'}`} />
            <span>{isLocating ? 'Locating...' : 'Use My GPS'}</span>
          </button>

          <button
            onClick={() => {
              if (showBookmarksOnly) onToggleBookmarks();
            }}
            className={`text-sm transition-colors whitespace-nowrap ${
              !showBookmarksOnly ? 'text-slate-900 font-semibold underline underline-offset-4 decoration-amber-500 decoration-2' : 'hover:text-slate-900'
            }`}
          >
            Top Rated
          </button>

          <button
            onClick={onToggleBookmarks}
            className={`flex items-center gap-1.5 text-sm transition-colors whitespace-nowrap ${
              showBookmarksOnly ? 'text-slate-900 font-semibold underline underline-offset-4 decoration-amber-500 decoration-2' : 'hover:text-slate-900'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>Saved ({bookmarkCount})</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile view switcher */}
          <div className="flex lg:hidden bg-slate-100 rounded-lg p-0.5">
            <button
              onClick={() => onToggleViewMode('list')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              List
            </button>
            <button
              onClick={() => onToggleViewMode('map')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Map
            </button>
          </div>

          <button
            onClick={onUseCurrentLocation}
            disabled={isLocating}
            className="hidden sm:flex lg:hidden items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap"
          >
            <Navigation className="w-3.5 h-3.5 text-slate-500" />
            <span>Nearby</span>
          </button>

          <button
            onClick={onToggleBookmarks}
            className="flex lg:hidden items-center gap-1 p-2 text-slate-700 hover:text-slate-900 bg-slate-100 rounded-lg"
            title="Saved Restaurants"
          >
            <Bookmark className={`w-4 h-4 ${showBookmarksOnly ? 'fill-amber-500 text-amber-500' : ''}`} />
            {bookmarkCount > 0 && (
              <span className="text-xs font-semibold tabular-nums text-slate-900">{bookmarkCount}</span>
            )}
          </button>

          <div className="hidden sm:block">
            <button
              onClick={() => {
                const el = document.getElementById('filter-search-input');
                el?.focus();
              }}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm"
            >
              Find Nearby
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
