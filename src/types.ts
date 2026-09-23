export type PetAgeGroup = 'Puppy' | 'Adult' | 'Senior' | 'All Life Stages';

export type ProductType = 'Dry Food' | 'Wet Food' | 'Treats' | 'Dental Chews';

export type ChannelCategory =
  | 'Supermarket Generic'
  | 'Commercial & Aggregator (Skroutz/BestPrice)'
  | 'Pet Specialty & Holistic'
  | 'Veterinary Clinical';

export interface NutritionalValues {
  crudeProteinPercent: number;
  crudeFatPercent: number;
  crudeFiberPercent: number;
  crudeAshPercent?: number;
  moisturePercent?: number;
  caloricContentKcalKg?: number;
  calciumPercent?: number;
  phosphorusPercent?: number;
  omega3Percent?: number;
  omega6Percent?: number;
  dhaPercent?: number;
  epaPercent?: number;
  calorieBreakdown?: string;
}

export interface DogProduct {
  id: string;
  brand: string;
  productLine: string;
  flavor: string;
  productType: ProductType;
  channelCategory: ChannelCategory;
  petAgeGroup: PetAgeGroup;
  packageSize: string;
  availableSizes?: string[]; // e.g. ["800g", "2.5kg", "12kg"] grouped under this canonical flavor
  msrpEuros: number;
  pricePerKg: number;
  eanBarcode?: string;
  officialProductUrl: string;
  itemImageUrl: string;
  ingredientsImageUrl: string;
  drivePackImageUrl?: string; // Direct Google Drive View/Download link in user's vault
  driveIngredientsImageUrl?: string; // Direct Google Drive View/Download link for ingredients panel
  skroutzUrl: string;
  bestPriceUrl: string;
  certifyingBody: string; // e.g. "DLG Gold Award (Bavaria)", "FEDIAF European Pet Food Standards", "ISO 22000 Food Safety"
  hasIndependentLabReport?: boolean; // Transparent: true ONLY if genuine 3rd-party lab analysis exists
  labReportUrl?: string; // Empty if no public independent lab test is available
  animalProteinPercent: number; // e.g. 90% for Farmina, 20% for generic supermarket
  greeceRetailers: string[]; // e.g. Sklavenitis, AB Vassilopoulos, Lidl, Pet City, Petvet24, Skroutz, BestPrice
  ingredients: string[];
  additives?: string;
  keyIngredientsSummary: string;
  nutritionalValues: NutritionalValues;
  allergens: string[];
  grainFree: boolean;
  specialDietaryInfo: string[]; // e.g. "Hypoallergenic", "Monoprotein", "Joint Support", "Sensitive Digestion"
  countryOfOrigin: string;
  isRealLifeVerified: boolean;
  verificationMethod?: string;
  verificationSourceUrl?: string;
  verificationDate?: string;
  verificationSourceType?:
    | 'Supermarket Official Site'
    | 'Aggregator (Skroutz/BestPrice)'
    | 'Brand Official Portal'
    | 'Synthetic / Unverified';
}

export interface FilterState {
  search: string;
  selectedBrands: string[];
  selectedAgeGroups: PetAgeGroup[];
  selectedTypes: ProductType[];
  selectedChannelCategories: ChannelCategory[];
  grainFreeOnly: boolean;
  verifiedOnly?: boolean;
  maxPrice: number;
  allergenFreeFilter: string;
  specialDiet: string;
}

export interface RecipeIngredient {
  name: string;
  quantityGrams: number;
  purpose: string; // e.g. "Primary lean animal protein", "Digestible complex carbs", "Vitamins & prebiotic fiber"
}

export interface HomeCookingRecipe {
  id: string;
  title: string;
  greekTitle: string;
  subtitle: string;
  targetProfile: string; // e.g. "Sensitive Digestion & All-Age Maintenance", "Severe Food Allergies (Skin/Ear)"
  dogSizeSuitability: string; // e.g. "All breeds (5kg - 45kg)"
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  dailyPortionPer10KgDog: string; // e.g. "approx. 380g - 420g split into two meals"
  ingredients: RecipeIngredient[];
  stepByStepInstructions: string[];
  vitalNutritionalBalancer: {
    calciumPhosphorusRule: string;
    recommendedSupplement: string; // e.g. "Calcium carbonate / food-grade sterilized eggshell powder (1/2 tsp per 500g food)"
    omega3Source: string; // e.g. "Wild Alaskan salmon oil or sardine oil (1 tsp)"
    essentialVitamins: string;
  };
  macronutrientsPer100g: {
    proteinPercent: number;
    fatPercent: number;
    fiberPercent: number;
    moisturePercent: number;
    kcalPer100g: number;
  };
  veterinaryNotes: string;
  storageInstructions: string;
}
