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
  msrpEuros: number;
  pricePerKg: number;
  eanBarcode?: string;
  officialProductUrl: string;
  itemImageUrl: string;
  ingredientsImageUrl: string;
  skroutzUrl: string;
  bestPriceUrl: string;
  certifyingBody: string; // e.g. "FEDIAF & TÜV SÜD Food Safety", "Eurofins Scientific Certified Batch", "BRCGS Grade AA"
  labReportUrl: string;
  animalProteinPercent: number; // e.g. 90% for Farmina, 20% for generic supermarket
  greeceRetailers: string[]; // e.g. Sklavenitis, AB Vassilopoulos, Lidl, Pet City, Petvet24, Skroutz, BestPrice
  ingredients: string[];
  keyIngredientsSummary: string;
  nutritionalValues: NutritionalValues;
  allergens: string[];
  grainFree: boolean;
  specialDietaryInfo: string[]; // e.g. "Hypoallergenic", "Monoprotein", "Joint Support", "Sensitive Digestion"
  countryOfOrigin: string;
}

export interface FilterState {
  search: string;
  selectedBrands: string[];
  selectedAgeGroups: PetAgeGroup[];
  selectedTypes: ProductType[];
  selectedChannelCategories: ChannelCategory[];
  grainFreeOnly: boolean;
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
