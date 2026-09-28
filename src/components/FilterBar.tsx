import React from 'react';
import { Search, SlidersHorizontal, Star, X, Check } from 'lucide-react';
import { FilterState, PriceLevelFilter, SortOption } from '../types/restaurant';
import { CUISINE_CATEGORIES } from '../data/seedRestaurants';

interface FilterBarProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalMatches: number;
}

const RATING_OPTIONS = [
  { value: 0, label: 'All Ratings' },
  { value: 4.0, label: '★ 4.0+' },
  { value: 4.3, label: '★ 4.3+' },
  { value: 4.5, label: '★ 4.5+ Top Rated' },
  { value: 4.8, label: '★ 4.8+ Elite' }
];

const PRICE_OPTIONS: { level: PriceLevelFilter; symbol: string; label: string; desc: string }[] = [
  { level: 1, symbol: '$', label: 'Under $15', desc: 'Inexpensive' },
  { level: 2, symbol: '$$', label: '$15–$30', desc: 'Moderate' },
  { level: 3, symbol: '$$$', label: '$30–$60', desc: 'Upscale' },
  { level: 4, symbol: '$$$$', label: '$60+', desc: 'Fine Dining' }
];

const RADIUS_OPTIONS = [
  { value: 1, label: '1 km' },
  { value: 3, label: '3 km' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 25, label: '25 km' }
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'rating_desc', label: 'Highest Star Rating' },
  { value: 'reviews_desc', label: 'Most Reviewed' },
  { value: 'distance_asc', label: 'Closest Distance' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' }
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset,
  totalMatches
}) => {
  const togglePriceLevel = (level: PriceLevelFilter) => {
    const current = filters.priceLevels;
    if (current.includes(level)) {
      // Remove if multiple selected, else keep at least empty to mean all
      onChange({ priceLevels: current.filter((l) => l !== level) });
    } else {
      onChange({ priceLevels: [...current, level] });
    }
  };

  const isFiltered =
    filters.minRating > 0 ||
    filters.priceLevels.length > 0 ||
    filters.cuisine !== 'All' ||
    filters.searchQuery.trim() !== '' ||
    filters.openNowOnly;

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-3.5">
        {/* Row 1: Search keyword, Quick Rating Selector, Sort dropdown */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="filter-search-input"
              type="text"
              placeholder="Search by restaurant name, specialty, or dish..."
              value={filters.searchQuery}
              onChange={(e) => onChange({ searchQuery: e.target.value })}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onChange({ searchQuery: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Star Rating Threshold Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap shrink-0 mr-1">
              Rating:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg shrink-0">
              {RATING_OPTIONS.map((opt) => {
                const active = filters.minRating === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => onChange({ minRating: opt.value })}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden xl:inline">
              Sort:
            </span>
            <select
              aria-label="Sort restaurants"
              value={filters.sortBy}
              onChange={(e) => onChange({ sortBy: e.target.value as SortOption })}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
            >
              {SORT_OPTIONS.map((sort) => (
                <option key={sort.value} value={sort.value}>
                  {sort.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Price range buttons, Open Now switch, Distance radius, Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-3">
            {/* Price Range Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
                Price:
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                {PRICE_OPTIONS.map((p) => {
                  const isSelected = filters.priceLevels.includes(p.level);
                  return (
                    <button
                      key={p.level}
                      onClick={() => togglePriceLevel(p.level)}
                      title={`${p.desc} (${p.label})`}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-colors whitespace-nowrap flex items-center gap-1 ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
                      }`}
                    >
                      <span>{p.symbol}</span>
                      <span className="text-[10px] font-normal opacity-80 hidden sm:inline">
                        {p.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Radius Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Radius:
              </span>
              <select
                aria-label="Distance search radius"
                value={filters.radiusKm}
                onChange={(e) => onChange({ radiusKm: Number(e.target.value) })}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {RADIUS_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    Within {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Open Now Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={filters.openNowOnly}
                onChange={(e) => onChange({ openNowOnly: e.target.checked })}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                Open Now Only
              </span>
            </label>
          </div>

          {/* Right side: Matches count & Reset Filter */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs text-slate-500 font-medium tabular-nums">
              <strong className="text-slate-900 font-semibold">{totalMatches}</strong> high-rated places found
            </span>

            {isFiltered && (
              <button
                onClick={onReset}
                className="text-xs font-semibold text-amber-700 hover:text-amber-900 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Row 3: Cuisine Categories Bar (Horizontal Scroll) */}
        <div className="pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1.5">
              Cuisine:
            </span>
            {CUISINE_CATEGORIES.map((cat) => {
              const active = filters.cuisine === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onChange({ cuisine: cat })}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white font-semibold shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
