import { useState, useEffect, useMemo } from 'react';
import { User } from 'firebase/auth';
import { DogProduct, FilterState } from './types';
import { GREECE_DOG_PRODUCTS } from './productsData';
import { initAuth, googleSignIn } from './services/auth';
import { AuthHeader } from './components/AuthHeader';
import { FilterToolbar } from './components/FilterToolbar';
import { ProductTable } from './components/ProductTable';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ExportBar } from './components/ExportBar';
import { AISearchAssistant } from './components/AISearchAssistant';
import { HomeCookingRecipesView } from './components/HomeCookingRecipesView';
import { OrchestrationDashboard } from './components/OrchestrationDashboard';
import { PawPrint, Bone, Utensils, ChefHat, Sparkles, Store, ShieldCheck, CheckCircle2, UploadCloud } from 'lucide-react';

export default function App() {
  // Navigation tabs: orchestrator, all, food, treats, recipes
  const [activeTab, setActiveTab] = useState<'orchestrator' | 'all' | 'food' | 'treats' | 'recipes'>('orchestrator');

  // Dynamic products state allowing live Drive URL attachments and URL ingestion with persistent verification caching
  const [productsList, setProductsList] = useState<DogProduct[]>(() => {
    try {
      const saved = localStorage.getItem('greece_dog_products_verified_cache');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge cached verified updates with GREECE_DOG_PRODUCTS
          const cacheMap = new Map(parsed.map((p: DogProduct) => [p.id, p]));
          return GREECE_DOG_PRODUCTS.map((base) => cacheMap.get(base.id) || base);
        }
      }
    } catch (e) {
      console.warn('Could not read verified products cache:', e);
    }
    return GREECE_DOG_PRODUCTS;
  });

  // Auth state for Google Workspace / Sheets / Drive
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Selected product modal
  const [selectedProduct, setSelectedProduct] = useState<DogProduct | null>(null);

  const handleUpdateProduct = (updated: DogProduct) => {
    setProductsList((prev) => {
      const next = prev.map((item) => (item.id === updated.id ? updated : item));
      try {
        localStorage.setItem('greece_dog_products_verified_cache', JSON.stringify(next));
      } catch (err) {
        console.warn('Could not save verified products cache:', err);
      }
      return next;
    });
  };

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    selectedBrands: [],
    selectedAgeGroups: [],
    selectedTypes: [],
    selectedChannelCategories: [],
    grainFreeOnly: false,
    verifiedOnly: false,
    maxPrice: 120,
    allergenFreeFilter: '',
    specialDiet: '',
  });

  // Distinct brands available in Greece
  const availableBrands = useMemo(() => {
    const set = new Set(productsList.map((p) => p.brand));
    return Array.from(set).sort();
  }, [productsList]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return productsList.filter((p) => {
      // Tab constraint
      if (activeTab === 'food') {
        if (p.productType !== 'Dry Food' && p.productType !== 'Wet Food') return false;
      } else if (activeTab === 'treats') {
        if (p.productType !== 'Treats' && p.productType !== 'Dental Chews') return false;
      }

      // 1. Text search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesFlavor = p.flavor.toLowerCase().includes(query);
        const matchesBarcode = p.eanBarcode ? p.eanBarcode.includes(query) : false;
        const matchesIngredients = p.ingredients.some((i) => i.toLowerCase().includes(query));
        const matchesRetailers = p.greeceRetailers.some((r) => r.toLowerCase().includes(query));
        if (!matchesBrand && !matchesFlavor && !matchesBarcode && !matchesIngredients && !matchesRetailers) {
          return false;
        }
      }

      // 2. Filter by Channel Category
      if (
        filters.selectedChannelCategories &&
        filters.selectedChannelCategories.length > 0 &&
        !filters.selectedChannelCategories.includes(p.channelCategory)
      ) {
        return false;
      }

      // 3. Filter by Brand (strictly requested: "Ensure the data is filterable by brand")
      if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(p.brand)) {
        return false;
      }

      // 4. Filter by Pet Age Group (strictly requested: "and pet age group")
      if (filters.selectedAgeGroups.length > 0 && !filters.selectedAgeGroups.includes(p.petAgeGroup)) {
        return false;
      }

      // 5. Filter by Product Type
      if (filters.selectedTypes.length > 0 && !filters.selectedTypes.includes(p.productType)) {
        return false;
      }

      // 6. Grain-Free check
      if (filters.grainFreeOnly && !p.grainFree) {
        return false;
      }

      // 7. Allergen Exclusion check
      if (filters.allergenFreeFilter) {
        const hasExcludedAllergen = p.allergens.some(
          (a) => a.toLowerCase() === filters.allergenFreeFilter.toLowerCase()
        );
        if (hasExcludedAllergen) return false;
      }

      // 8. Max price filter
      if (p.msrpEuros > filters.maxPrice) {
        return false;
      }

      // 9. Real-life verified filter
      if (filters.verifiedOnly && !p.isRealLifeVerified) {
        return false;
      }

      return true;
    });
  }, [filters, activeTab]);

  // Counts for quick badges
  const totalFoodCount = useMemo(
    () => productsList.filter((p) => p.productType === 'Dry Food' || p.productType === 'Wet Food').length,
    [productsList]
  );
  const totalTreatsCount = useMemo(
    () => productsList.filter((p) => p.productType === 'Treats' || p.productType === 'Dental Chews').length,
    [productsList]
  );
  const genericSupermarketCount = useMemo(
    () => productsList.filter((p) => p.channelCategory === 'Supermarket Generic').length,
    [productsList]
  );
  const verifiedCount = useMemo(
    () => productsList.filter((p) => p.isRealLifeVerified).length,
    [productsList]
  );

  // Initialize Firebase Auth listener on load
  useEffect(() => {
    const unsubscribe = initAuth(
      (authUser, token) => {
        setUser(authUser);
        setAccessToken(token);
      },
      () => {
        // No cached token
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleLoginPrompt = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
      }
    } catch (e) {
      console.error('Login prompt error', e);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased font-sans flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navigation & App Identity */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 shrink-0">
              <PawPrint className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight leading-tight flex items-center gap-2">
                Greece Dog Feeds & Treats Catalog
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  GR Retail & Aggregators
                </span>
              </h1>
              <p className="text-[11px] text-zinc-400">
                Official composition, dietary specs, images & laboratory standards for Google Sheets
              </p>
            </div>
          </div>

          {/* Quick Stat Pill counters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-zinc-400 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg">
              <strong className="text-emerald-400">{GREECE_DOG_PRODUCTS.length}</strong> Products
            </span>
            <span className="text-[11px] text-zinc-400 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg">
              <strong className="text-amber-400">{genericSupermarketCount}</strong> Supermarket Generics
            </span>
            <span className="text-[11px] text-blue-400 px-2.5 py-1 bg-blue-950/40 border border-blue-500/30 rounded-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>
                <strong className="text-blue-300">{verifiedCount}</strong> Verified (
                {Math.round((verifiedCount / GREECE_DOG_PRODUCTS.length) * 100)}%)
              </span>
            </span>
            <span className="text-[11px] text-zinc-400 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg">
              <strong className="text-cyan-400">10</strong> Vet Recipes
            </span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 border-t border-zinc-850 pt-2 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orchestrator')}
            id="tab-orchestrator"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
              activeTab === 'orchestrator'
                ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                : 'text-zinc-400 hover:text-emerald-300 hover:bg-zinc-900'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5 text-emerald-400" />
            Ingestion & Drive Orchestrator (Days 1–28)
          </button>

          <button
            onClick={() => setActiveTab('all')}
            id="tab-all-products"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
              activeTab === 'all'
                ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-600'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <PawPrint className="w-3.5 h-3.5" />
            All Products ({productsList.length})
          </button>

          <button
            onClick={() => setActiveTab('food')}
            id="tab-food-sheet"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
              activeTab === 'food'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            Dog Food Sheet ({totalFoodCount})
          </button>

          <button
            onClick={() => setActiveTab('treats')}
            id="tab-treats-sheet"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
              activeTab === 'treats'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Bone className="w-3.5 h-3.5" />
            Dog Treats & Chews Sheet ({totalTreatsCount})
          </button>

          <button
            onClick={() => setActiveTab('recipes')}
            id="tab-recipes"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
              activeTab === 'recipes'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-amber-300 hover:bg-zinc-900'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5 text-amber-400" />
            10 Popular Home Cooking Recipes
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* Auth / Google Workspace status bar */}
        <AuthHeader
          user={user}
          hasToken={!!accessToken}
          onLoginSuccess={(u, token) => {
            setUser(u);
            setAccessToken(token);
          }}
          onLogout={() => {
            setUser(null);
            setAccessToken(null);
          }}
        />

        {/* Google Sheets Export Banner (Divided into 2 Sheets: Food and Treats + Recipes tab) */}
        <ExportBar
          products={filteredProducts}
          user={user}
          accessToken={accessToken}
          onPromptLogin={handleLoginPrompt}
        />

        {/* View content switch */}
        {activeTab === 'orchestrator' ? (
          <OrchestrationDashboard
            products={productsList}
            accessToken={accessToken}
            onSignInRequired={handleLoginPrompt}
            onUpdateProduct={handleUpdateProduct}
          />
        ) : activeTab === 'recipes' ? (
          <HomeCookingRecipesView />
        ) : (
          <>
            {/* Filter Toolbar (Filterable by brand, age group, sales channel, dietary specs) */}
            <FilterToolbar
              filters={filters}
              onFilterChange={setFilters}
              availableBrands={availableBrands}
              totalCount={
                activeTab === 'food'
                  ? totalFoodCount
                  : activeTab === 'treats'
                  ? totalTreatsCount
                  : productsList.length
              }
              filteredCount={filteredProducts.length}
            />

            {/* Catalog Table: One row per flavor with images, nutritional values, allergens, MSRP in Euros, aggregator links */}
            <ProductTable
              products={filteredProducts}
              onSelectProduct={(p) => setSelectedProduct(p)}
              selectedProductId={selectedProduct?.id}
            />
          </>
        )}

        {/* Gemini Search Grounding Verification Assistant */}
        <AISearchAssistant currentProduct={selectedProduct} />
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAskAI={() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 py-6 px-4 text-center text-xs text-zinc-400">
        <p>
          Greece Dog Feeds &amp; Treats Database • Covers supermarket generics (Sklavenitis Marathon, AB Comfort, Lidl Orlando, Masoutis Mr. Grand), aggregator bestsellers on Skroutz.gr and BestPrice.gr, specialty pet stores (Pet City, Petvet24), and certified veterinary clinics.
        </p>
      </footer>
    </div>
  );
}
