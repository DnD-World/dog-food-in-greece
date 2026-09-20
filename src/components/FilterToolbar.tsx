import React from 'react';
import { FilterState, PetAgeGroup, ProductType, ChannelCategory } from '../types';
import { Search, RotateCcw, Filter, WheatOff, Store, ShoppingBag } from 'lucide-react';

interface FilterToolbarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableBrands: string[];
  totalCount: number;
  filteredCount: number;
}

const AGE_GROUPS: PetAgeGroup[] = ['Puppy', 'Adult', 'Senior', 'All Life Stages'];
const PRODUCT_TYPES: ProductType[] = ['Dry Food', 'Wet Food', 'Treats', 'Dental Chews'];
const CHANNEL_CATEGORIES: ChannelCategory[] = [
  'Supermarket Generic',
  'Commercial & Aggregator (Skroutz/BestPrice)',
  'Pet Specialty & Holistic',
  'Veterinary Clinical',
];
const COMMON_ALLERGENS = ['Chicken', 'Beef', 'Pork', 'Fish', 'Eggs', 'Wheat', 'Maize', 'Soy', 'Dairy'];

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filters,
  onFilterChange,
  availableBrands,
  totalCount,
  filteredCount,
}) => {
  const toggleBrand = (brand: string) => {
    const exists = filters.selectedBrands.includes(brand);
    const updated = exists
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];
    onFilterChange({ ...filters, selectedBrands: updated });
  };

  const toggleAgeGroup = (age: PetAgeGroup) => {
    const exists = filters.selectedAgeGroups.includes(age);
    const updated = exists
      ? filters.selectedAgeGroups.filter((a) => a !== age)
      : [...filters.selectedAgeGroups, age];
    onFilterChange({ ...filters, selectedAgeGroups: updated });
  };

  const toggleType = (t: ProductType) => {
    const exists = filters.selectedTypes.includes(t);
    const updated = exists
      ? filters.selectedTypes.filter((x) => x !== t)
      : [...filters.selectedTypes, t];
    onFilterChange({ ...filters, selectedTypes: updated });
  };

  const toggleChannel = (c: ChannelCategory) => {
    const exists = (filters.selectedChannelCategories || []).includes(c);
    const updated = exists
      ? (filters.selectedChannelCategories || []).filter((x) => x !== c)
      : [...(filters.selectedChannelCategories || []), c];
    onFilterChange({ ...filters, selectedChannelCategories: updated });
  };

  const resetFilters = () => {
    onFilterChange({
      search: '',
      selectedBrands: [],
      selectedAgeGroups: [],
      selectedTypes: [],
      selectedChannelCategories: [],
      grainFreeOnly: false,
      maxPrice: 120,
      allergenFreeFilter: '',
      specialDiet: '',
    });
  };

  const hasActiveFilters =
    filters.search !== '' ||
    filters.selectedBrands.length > 0 ||
    filters.selectedAgeGroups.length > 0 ||
    filters.selectedTypes.length > 0 ||
    (filters.selectedChannelCategories && filters.selectedChannelCategories.length > 0) ||
    filters.grainFreeOnly ||
    filters.allergenFreeFilter !== '' ||
    filters.maxPrice < 120;

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 shadow-sm space-y-4">
      {/* Top row: search & stats & reset */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            id="catalog-search-input"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search flavor, barcode, ingredient (e.g. lamb, rice, pumpkin), or brand..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <span className="text-xs font-medium text-zinc-400">
            Showing <strong className="text-emerald-400">{filteredCount}</strong> of {totalCount} formulas
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              id="reset-filters-btn"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Channel Categories (Supermarket generic, Skroutz/BestPrice, Specialty, Veterinary) */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 mb-2">
          <Store className="w-3.5 h-3.5 text-amber-400" />
          Sales Channel / Category in Greece:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CHANNEL_CATEGORIES.map((channel) => {
            const isSelected = (filters.selectedChannelCategories || []).includes(channel);
            return (
              <button
                key={channel}
                id={`channel-filter-${channel.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                onClick={() => toggleChannel(channel)}
                className={`text-xs px-2.5 py-1 rounded-md transition font-medium border ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-xs'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {channel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand filters (requested: ensure filterable by brand) */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 mb-2">
          <Filter className="w-3.5 h-3.5 text-emerald-400" />
          Filter by Brand:
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
          {availableBrands.map((brand) => {
            const isSelected = filters.selectedBrands.includes(brand);
            return (
              <button
                key={brand}
                id={`brand-filter-${brand.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => toggleBrand(brand)}
                className={`text-xs px-2.5 py-1 rounded-md transition font-medium border ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-xs'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Age group filters & product type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 border-t border-zinc-800/80">
        <div>
          <div className="text-xs font-semibold text-zinc-400 mb-2">Pet Age Group:</div>
          <div className="flex flex-wrap gap-1.5">
            {AGE_GROUPS.map((age) => {
              const isSelected = filters.selectedAgeGroups.includes(age);
              return (
                <button
                  key={age}
                  id={`age-filter-${age.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => toggleAgeGroup(age)}
                  className={`text-xs px-2.5 py-1 rounded-md transition font-medium border ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {age}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-zinc-400 mb-2">Product Category:</div>
          <div className="flex flex-wrap gap-1.5">
            {PRODUCT_TYPES.map((type) => {
              const isSelected = filters.selectedTypes.includes(type);
              return (
                <button
                  key={type}
                  id={`type-filter-${type.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => toggleType(type)}
                  className={`text-xs px-2.5 py-1 rounded-md transition font-medium border ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dietary & Allergen quick filters & price slider */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 border-t border-zinc-800/80">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-300">
          <input
            type="checkbox"
            id="grain-free-checkbox"
            checked={filters.grainFreeOnly}
            onChange={(e) => onFilterChange({ ...filters, grainFreeOnly: e.target.checked })}
            className="w-4 h-4 rounded bg-zinc-950 border-zinc-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
          />
          <WheatOff className="w-3.5 h-3.5 text-emerald-400" />
          <span>Grain-Free Only (Χωρίς Σιτηρά)</span>
        </label>

        <div>
          <select
            id="allergen-exclude-select"
            value={filters.allergenFreeFilter}
            onChange={(e) => onFilterChange({ ...filters, allergenFreeFilter: e.target.value })}
            className="w-full text-xs bg-zinc-950 text-zinc-300 border border-zinc-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="">Exclude Allergen (All)</option>
            {COMMON_ALLERGENS.map((allergen) => (
              <option key={allergen} value={allergen}>
                Exclude {allergen} Allergen
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>Max MSRP: €{filters.maxPrice}</span>
          <input
            type="range"
            id="max-price-slider"
            min={3}
            max={120}
            step={1}
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
