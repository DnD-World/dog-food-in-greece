import { DogProduct, HomeCookingRecipe } from '../types';
import { POPULAR_HOME_COOKING_RECIPES } from '../recipesData';

const escapeCSV = (str: string | number | undefined | null) => {
  if (str === undefined || str === null) return '""';
  const val = String(str).replace(/"/g, '""');
  return `"${val}"`;
};

export function downloadProductsAsCSV(products: DogProduct[], filename = 'greece_dog_products_catalog.csv') {
  const headers = [
    'Brand',
    'Product Line',
    'Flavor',
    'Channel Category',
    'Product Type',
    'Pet Age Group',
    'Package Size',
    'MSRP (EUR)',
    'Price per Kg (EUR)',
    'Item Image URL',
    'Ingredients Label Image URL',
    'Official Product URL',
    'Skroutz.gr Price URL',
    'BestPrice.gr Price URL',
    'Certifying Body / Quality Standard',
    'Lab Report URL',
    'Animal Protein (%)',
    'EAN Barcode',
    'Crude Protein (%)',
    'Crude Fat (%)',
    'Crude Fiber (%)',
    'Crude Ash (%)',
    'Moisture (%)',
    'Calories (kcal/kg)',
    'Grain Free',
    'Allergens',
    'Dietary Features',
    'Full Ingredients',
    'Greece Retailers',
    'Origin',
  ];

  const rows = products.map((p) => [
    escapeCSV(p.brand),
    escapeCSV(p.productLine),
    escapeCSV(p.flavor),
    escapeCSV(p.channelCategory),
    escapeCSV(p.productType),
    escapeCSV(p.petAgeGroup),
    escapeCSV(p.packageSize),
    p.msrpEuros.toFixed(2),
    p.pricePerKg.toFixed(2),
    escapeCSV(p.itemImageUrl),
    escapeCSV(p.ingredientsImageUrl),
    escapeCSV(p.officialProductUrl),
    escapeCSV(p.skroutzUrl),
    escapeCSV(p.bestPriceUrl),
    escapeCSV(p.certifyingBody),
    escapeCSV(p.labReportUrl),
    escapeCSV(p.animalProteinPercent ? `${p.animalProteinPercent}%` : ''),
    escapeCSV(p.eanBarcode || ''),
    p.nutritionalValues.crudeProteinPercent,
    p.nutritionalValues.crudeFatPercent,
    p.nutritionalValues.crudeFiberPercent,
    p.nutritionalValues.crudeAshPercent ?? '',
    p.nutritionalValues.moisturePercent ?? '',
    p.nutritionalValues.caloricContentKcalKg ?? '',
    p.grainFree ? 'Yes' : 'No',
    escapeCSV(p.allergens.join('; ')),
    escapeCSV(p.specialDietaryInfo.join('; ')),
    escapeCSV(p.ingredients.join(', ')),
    escapeCSV(p.greeceRetailers.join('; ')),
    escapeCSV(p.countryOfOrigin),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  triggerDownload(csvContent, filename);
}

export function downloadRecipesAsCSV(recipes: HomeCookingRecipe[] = POPULAR_HOME_COOKING_RECIPES, filename = 'popular_dog_home_cooking_recipes.csv') {
  const headers = [
    'Recipe Title',
    'Greek Title',
    'Target Profile',
    'Dog Size Suitability',
    'Daily Portion (per 10kg)',
    'Ingredients List',
    'Step-by-Step Cooking Instructions',
    'Calcium Balancer Rule',
    'Omega 3 Source',
    'Protein (%)',
    'Fat (%)',
    'Fiber (%)',
    'Kcal per 100g',
    'Veterinary Notes',
    'Storage Instructions',
  ];

  const rows = recipes.map((r) => [
    escapeCSV(r.title),
    escapeCSV(r.greekTitle),
    escapeCSV(r.targetProfile),
    escapeCSV(r.dogSizeSuitability),
    escapeCSV(r.dailyPortionPer10KgDog),
    escapeCSV(r.ingredients.map((i: { name: string; quantityGrams: number; purpose: string }) => `${i.name}: ${i.quantityGrams}g (${i.purpose})`).join('; ')),
    escapeCSV(r.stepByStepInstructions.join(' | ')),
    escapeCSV(`${r.vitalNutritionalBalancer.recommendedSupplement}. Rule: ${r.vitalNutritionalBalancer.calciumPhosphorusRule}`),
    escapeCSV(r.vitalNutritionalBalancer.omega3Source),
    r.macronutrientsPer100g.proteinPercent,
    r.macronutrientsPer100g.fatPercent,
    r.macronutrientsPer100g.fiberPercent,
    r.macronutrientsPer100g.kcalPer100g,
    escapeCSV(r.veterinaryNotes),
    escapeCSV(r.storageInstructions),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  triggerDownload(csvContent, filename);
}

function triggerDownload(content: string, filename: string) {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
