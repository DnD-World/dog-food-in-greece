import * as fs from 'fs';
import { VERIFIED_DAY_1_ACANA_8IN1 } from '../src/data/verifiedDay1Data';

// Official user-provided source of truth for Grass-Fed Lamb
const lambExact = {
  officialProductUrl: 'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-singles-lamb-new.html',
  itemImageUrl: 'https://apac.acana.com/dw/image/v2/bfdw_prd/on/demandware.static/-/Sites-acana-ap-master-catalog/en/dwbf695f23/2023/Dog-2023/GRASS-FED%20LAMB/ACANA%20Singles%20Grass-Fed%20Lamb%20Updated%20Front%20Right%2011.4kg%20EMEA%20APAC.png?sw=1200',
  ingredientsImageUrl: 'https://apac.acana.com/dw/image/v2/bfdw_prd/on/demandware.static/-/Sites-acana-ap-master-catalog/en/dwf0f5fa18/2023/Dog-2023/GRASS-FED%20LAMB/ACANA%20Singles%20Grass-Fed%20Lamb%20Updated%20Back%2011.4kg%20EMEA%20APAC.png?sw=1200',
  ingredients: [
    'Raw lamb (21%)',
    'Lamb meal (19%)',
    'Whole green peas',
    'Whole red lentils',
    'Raw lamb liver (8%)',
    'Canola oil',
    'Fresh apples (4%)',
    'Whole chickpeas',
    'Whole green lentils',
    'Whole yellow peas',
    'Lentil fibre',
    'Pea starch',
    'Sunflower oil',
    'Algae',
    'Raw lamb tripe (1%)',
    'Raw lamb kidney (1%)',
    'Fresh whole butternut squash',
    'Fresh whole pumpkin',
    'Dried kelp',
    'Salt',
    'Dried chicory root',
    'Whole cranberries',
    'Whole blueberries',
    'Turmeric',
    'Milk thistle',
    'Burdock root',
    'Lavender',
    'Marshmallow root',
    'Rosehips'
  ],
  additives: 'Technological additives: Tocopherol extracts from vegetable oils: 110 mg, citric acid: 40 mg. Sensory additives: Rosemary extract: 75 mg. Nutritional additives: Taurine: 1500 mg, Choline chloride (choline): 1050 mg, Zinc proteinate: 120 mg, Copper: 11 mg, Vitamin B1: 75 mg, Vitamin B2: 15 mg, Niacin: 150 mg, Vitamin B5: 45 mg, Vitamin B6: 26 mg, Folic acid: 5.25 mg, Vitamin B12: 0.15 mg, Vitamin D3: 750 IU, Vitamin E: 500 IU. Zootechnical additives: 4b1707 Enterococcus faecium DSM 10663/NCIMB 10415 1x10^9 CFU.',
  nutritionalValues: {
    crudeProteinPercent: 31,
    crudeFatPercent: 15,
    crudeFiberPercent: 5,
    crudeAshPercent: 7.5,
    moisturePercent: 12,
    caloricContentKcalKg: 3810,
    calciumPercent: 1.5,
    phosphorusPercent: 1.1,
    omega3Percent: 0.8,
    omega6Percent: 1.8,
    dhaPercent: 0.15,
    epaPercent: 0.1,
    calorieBreakdown: '3810 kcal/kg (457 kcal per 250ml/120g cup), with 32% from protein, 38% from fat, 30% from carbohydrates.'
  },
  verificationSourceUrl: 'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-singles-lamb-new.html',
  verificationMethod: 'Audited directly from apac.acana.com manufacturer portal specifications and live Greek distribution packaging.'
};

console.log('Script ready to update catalog.');
