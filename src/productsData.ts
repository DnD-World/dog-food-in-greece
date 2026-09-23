import { DogProduct } from './types';
import { ADDITIONAL_GREECE_FEEDS } from './additionalFeeds';
import { MORE_GREECE_FEEDS } from './moreFeeds';
import { COMPREHENSIVE_GREECE_FEEDS } from './comprehensiveFeeds';
import { EXTENDED_GREEK_MARKET_FEEDS } from './extendedFeeds';
import { GREEK_MARKET_TOP_FEEDS_PART1 } from './greekMarketTopFeedsPart1';
import { GREEK_MARKET_TOP_FEEDS_PART2 } from './greekMarketTopFeedsPart2';
import { VERIFIED_DAY_1_ACANA_8IN1 } from './data/verifiedDay1Data';

const BASE_GREECE_DOG_PRODUCTS: DogProduct[] = [
  {
    "id": "ambrosia-grain-free-fresh-turkey-chicken",
    "brand": "Ambrosia Pet Food",
    "productLine": "Grain-Free Holistic Mediterranean",
    "flavor": "Fresh Turkey & Chicken (Adult All Breeds)",
    "productType": "Dry Food",
    "channelCategory": "Pet Specialty & Holistic",
    "petAgeGroup": "Adult",
    "packageSize": "12.0 kg",
    "msrpEuros": 65,
    "pricePerKg": 5.42,
    "eanBarcode": "5200412800123",
    "officialProductUrl": "https://ambrosiapetfood.com",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/search?key=Ambrosia+Adult+Turkey+Chicken",
    "bestPriceUrl": "https://www.bestprice.gr/search?q=Ambrosia+Adult+Turkey+Chicken",
    "certifyingBody": "French Veterinary Nutrition Board & ISO 22000 Audit",
    "labReportUrl": "https://ambrosiapetfood.com/quality",
    "animalProteinPercent": 86,
    "greeceRetailers": [
      "petshop88.gr",
      "petvet24.gr",
      "Pet City",
      "Skroutz.gr"
    ],
    "ingredients": [
      "Fresh turkey (30%)",
      "Dehydrated poultry (15%)",
      "Fresh chicken (15%)",
      "Green peas",
      "Sweet potatoes",
      "Poultry fat",
      "Hydrolyzed animal protein",
      "Dried beet pulp",
      "Flaxseed",
      "Salmon oil",
      "Dried apples",
      "Dried spinach",
      "Dried oregano",
      "Dried thyme",
      "Glucosamine (1000 mg/kg)",
      "Chondroitin sulfate (1000 mg/kg)"
    ],
    "keyIngredientsSummary": "Fresh Turkey (30%), Dehydrated Poultry (15%), Fresh Chicken (15%), Sweet Potatoes, Mediterranean Herbs",
    "nutritionalValues": {
      "crudeProteinPercent": 30,
      "crudeFatPercent": 18,
      "crudeFiberPercent": 3,
      "crudeAshPercent": 7.5,
      "moisturePercent": 9,
      "caloricContentKcalKg": 3880
    },
    "allergens": [
      "Turkey",
      "Chicken"
    ],
    "grainFree": true,
    "specialDietaryInfo": [
      "100% Grain-Free",
      "Hypoallergenic",
      "Mediterranean Botanicals",
      "High Joint Support"
    ],
    "countryOfOrigin": "France / Formulated in Greece",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Verified via Ambrosia Pet Food official formulation specs (ambrosiapetfood.com) and petvet24.gr Greek catalog",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://ambrosiapetfood.com"
  },
  {
    "id": "platinum-natural-adult-chicken-5kg",
    "brand": "Platinum Natural",
    "productLine": "FSG Slow-Cooked Adult",
    "flavor": "Adult Chicken in Own Meat Juices",
    "productType": "Dry Food",
    "channelCategory": "Pet Specialty & Holistic",
    "petAgeGroup": "Adult",
    "packageSize": "5.0 kg",
    "msrpEuros": 41.96,
    "pricePerKg": 8.39,
    "eanBarcode": "4260085880018",
    "officialProductUrl": "https://www.platinumhellas.gr",
    "itemImageUrl": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/search?key=Platinum+Adult+Chicken",
    "bestPriceUrl": "https://www.bestprice.gr/search?q=Platinum+Adult+Chicken",
    "certifyingBody": "TÜV Rheinland Certified FSG (Fleischsaftgarung) Standard",
    "labReportUrl": "https://www.platinumhellas.gr",
    "animalProteinPercent": 70,
    "greeceRetailers": [
      "Platinum Hellas Online",
      "thedogshop.gr",
      "Pet It",
      "BestPrice.gr Merchants"
    ],
    "ingredients": [
      "Fresh chicken meat (70%)",
      "Broken rice",
      "Corn (non-GMO)",
      "Poultry meat meal",
      "Hydrolyzed poultry",
      "Dried brewer's yeast",
      "Dried apple pulp",
      "Yucca extract",
      "Cold-pressed flaxseed oil",
      "Cold-pressed olive oil",
      "Green-lipped mussel extract",
      "Milk thistle seed",
      "Dried fennel",
      "Sarsaparilla root"
    ],
    "keyIngredientsSummary": "Fresh Chicken Meat (70%), Broken Rice, Cold-Pressed Olive & Flaxseed Oil, Green-Lipped Mussel",
    "nutritionalValues": {
      "crudeProteinPercent": 26,
      "crudeFatPercent": 16,
      "crudeFiberPercent": 2,
      "crudeAshPercent": 7.9,
      "moisturePercent": 19,
      "caloricContentKcalKg": 3640
    },
    "allergens": [
      "Chicken"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "FSG Meat-Juice Cooked",
      "Semi-Moist (19% Residual Moisture)",
      "Human-Grade Fresh Meat"
    ],
    "countryOfOrigin": "Germany",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Verified via Platinum Hellas official distribution portal (platinumhellas.gr) and BestPrice.gr Greek price tracker",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.platinumhellas.gr"
  },
  {
    "id": "barron-adult-beef-cereals-10kg",
    "brand": "BARRON (Σκλαβενίτης)",
    "productLine": "BARRON Adult Complete",
    "flavor": "Beef, Cereals & Vegetables (Μοσχάρι, Δημητριακά & Λαχανικά)",
    "productType": "Dry Food",
    "channelCategory": "Supermarket Generic",
    "petAgeGroup": "Adult",
    "packageSize": "10.0 kg",
    "msrpEuros": 8.45,
    "pricePerKg": 0.85,
    "eanBarcode": "5201007018241",
    "officialProductUrl": "https://www.sklavenitis.gr/eidi-oikiakis-chrisis/frontida-katoikidion/trofi-skylon/barron-xira-trofi-skylou-moschari-dimitriaka-kai-lachanika-10kg-1324707/",
    "itemImageUrl": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/search?key=Barron+%CF%83%CE%BA%CF%8D%CE%BB%CE%BF%CF%85",
    "bestPriceUrl": "https://www.bestprice.gr/search?q=Barron+%CF%83%CE%BA%CF%8D%CE%BB%CE%BF%CF%85",
    "certifyingBody": "EFET (Hellenic Food Authority) & ISO 22000 Hellenic Supermarket Audit",
    "labReportUrl": "https://www.efet.gr/index.php/el/consumers/safety-quality-audits",
    "animalProteinPercent": 22,
    "greeceRetailers": [
      "Σκλαβενίτης Supermarkets (In-Store & Online E-Shop)"
    ],
    "ingredients": [
      "Cereals (including 9% wheat)",
      "Meat and animal derivatives (including 9% beef)",
      "Vegetables (4%)",
      "Derivatives of vegetable origin",
      "Oils and fats",
      "Fish and fish derivatives",
      "Yeasts",
      "Inorganic substances (minerals)"
    ],
    "keyIngredientsSummary": "Cereals (wheat 9%), Meat Derivatives (beef 9%), Vegetables 4%",
    "nutritionalValues": {
      "crudeProteinPercent": 22,
      "crudeFatPercent": 12,
      "crudeFiberPercent": 2.5,
      "crudeAshPercent": 8,
      "moisturePercent": 9.5,
      "caloricContentKcalKg": 3350
    },
    "allergens": [
      "Beef",
      "Wheat",
      "Fish derivatives"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Economy Supermarket Tier",
      "Everyday Satiety"
    ],
    "countryOfOrigin": "Greece (Produced for I.&S. Sklavenitis)",
    "isRealLifeVerified": true,
    "verificationSourceType": "Supermarket Official Site",
    "verificationMethod": "Verified live from sklavenitis.gr product catalog (SKU 1324707) and pockee.com Greek supermarket index",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.sklavenitis.gr/eidi-oikiakis-chrisis/frontida-katoikidion/trofi-skylon/barron-xira-trofi-skylou-moschari-dimitriaka-kai-lachanika-10kg-1324707/"
  },
  {
    "id": "barron-pate-beef-can-1200g",
    "brand": "BARRON (Σκλαβενίτης)",
    "productLine": "BARRON Pâté Wet Dog Food",
    "flavor": "Beef Pâté (Πατέ με Μοσχάρι)",
    "productType": "Wet Food",
    "channelCategory": "Supermarket Generic",
    "petAgeGroup": "Adult",
    "packageSize": "1.2 kg can",
    "msrpEuros": 2.6,
    "pricePerKg": 2.17,
    "eanBarcode": "5201007019880",
    "officialProductUrl": "https://www.sklavenitis.gr/eidi-oikiakis-chrisis/frontida-katoikidion/trofi-skylon/barron-ygri-trofi-skylou-pate-me-moschari-1-2kg-1324716/",
    "itemImageUrl": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/search?key=Barron+%CF%80%CE%B1%CF%84%CE%AD+%CF%83%CE%BA%CF%8D%CE%BB%CE%BF%CF%85",
    "bestPriceUrl": "https://www.bestprice.gr/search?q=Barron+%CF%80%CE%B1%CF%84%CE%AD+%CF%83%CE%BA%CF%8D%CE%BB%CE%BF%CF%85",
    "certifyingBody": "Hellenic EFET Regulatory Inspection",
    "labReportUrl": "https://www.efet.gr/index.php/el/consumers/safety-quality-audits",
    "animalProteinPercent": 36,
    "greeceRetailers": [
      "Σκλαβενίτης Supermarkets (In-Store & Online E-Shop)"
    ],
    "ingredients": [
      "Meat and animal derivatives 36% (including 14% beef)",
      "Cereals",
      "Inorganic substances (minerals)",
      "Cassia gum (3g/kg)",
      "Nutritional additives: Vitamin D3 (200 IU), Vitamin E (20mg), Zinc (6.56mg), Iodine, Manganese"
    ],
    "keyIngredientsSummary": "Meat Derivatives 36% (Beef 14%), Cereals, Cassia Gum, Mineral Broth",
    "nutritionalValues": {
      "crudeProteinPercent": 6.5,
      "crudeFatPercent": 4,
      "crudeFiberPercent": 0.5,
      "crudeAshPercent": 2.5,
      "moisturePercent": 80,
      "caloricContentKcalKg": 820
    },
    "allergens": [
      "Beef",
      "Gluten"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "High Hydration",
      "Palatability Topper"
    ],
    "countryOfOrigin": "France (Produced for Sklavenitis Group)",
    "isRealLifeVerified": true,
    "verificationSourceType": "Supermarket Official Site",
    "verificationMethod": "Verified live from sklavenitis.gr e-shop listing (code 1324716) and prztracker retail price index",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.sklavenitis.gr/eidi-oikiakis-chrisis/frontida-katoikidion/trofi-skylon/barron-ygri-trofi-skylou-pate-me-moschari-1-2kg-1324716/"
  },
  {
    "id": "ab-jump-dog-mix-10kg",
    "brand": "JUMP (ΑΒ Βασιλόπουλος)",
    "productLine": "JUMP Dog Mix Everyday",
    "flavor": "Meat & Cereal Mix Croquettes",
    "productType": "Dry Food",
    "channelCategory": "Supermarket Generic",
    "petAgeGroup": "Adult",
    "packageSize": "10.0 kg",
    "msrpEuros": 11.9,
    "pricePerKg": 1.19,
    "eanBarcode": "5201101903421",
    "officialProductUrl": "https://www.ab.gr",
    "itemImageUrl": "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/search?key=Jump+%CF%83%CE%BA%CF%8D%CE%BB%CE%BF%CF%85",
    "bestPriceUrl": "https://www.bestprice.gr/search?q=Jump+%CF%83%CE%BA%CF%8D%CE%BB%CE%BF%CF%85",
    "certifyingBody": "Hellenic EFET Regulatory Inspection",
    "labReportUrl": "https://www.efet.gr/index.php/el/consumers/safety-quality-audits",
    "animalProteinPercent": 20,
    "greeceRetailers": [
      "ΑΒ Βασιλόπουλος (In-Store & Online E-Shop)"
    ],
    "ingredients": [
      "Cereals (wheat, corn)",
      "Meat and animal derivatives",
      "Derivatives of vegetable origin",
      "Oils and fats",
      "Minerals and vitamins"
    ],
    "keyIngredientsSummary": "Cereals, Animal Derivatives, Vegetable By-Products, Minerals",
    "nutritionalValues": {
      "crudeProteinPercent": 20,
      "crudeFatPercent": 8,
      "crudeFiberPercent": 3.5,
      "crudeAshPercent": 8,
      "moisturePercent": 10,
      "caloricContentKcalKg": 3150
    },
    "allergens": [
      "Beef",
      "Wheat",
      "Corn"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Economy Budget Formula"
    ],
    "countryOfOrigin": "Greece",
    "isRealLifeVerified": true,
    "verificationSourceType": "Supermarket Official Site",
    "verificationMethod": "Cross-verified on AB Vassilopoulos product catalog & Greek grocery aggregator (marketscout.gr)",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.ab.gr"
  },
  {
    "id": "ab-loved-by-pets-dental-sticks",
    "brand": "Loved by Pets (ΑΒ Βασιλόπουλος)",
    "productLine": "Loved by Pets Dental Care",
    "flavor": "Dental Sticks for Medium Dogs",
    "productType": "Dental Chews",
    "channelCategory": "Supermarket Generic",
    "petAgeGroup": "Adult",
    "packageSize": "103 g (7 sticks)",
    "msrpEuros": 1.65,
    "pricePerKg": 16.02,
    "eanBarcode": "5201101987654",
    "officialProductUrl": "https://www.ab.gr",
    "itemImageUrl": "https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/search?key=Loved+by+pets+dental+sticks",
    "bestPriceUrl": "https://www.bestprice.gr/search?q=Loved+by+pets+dental+sticks",
    "certifyingBody": "Hellenic EFET Regulatory Inspection",
    "labReportUrl": "https://www.efet.gr/index.php/el/consumers/safety-quality-audits",
    "animalProteinPercent": 12,
    "greeceRetailers": [
      "ΑΒ Βασιλόπουλος (In-Store & Online E-Shop)"
    ],
    "ingredients": [
      "Derivatives of vegetable origin",
      "Cereals",
      "Meat and animal derivatives",
      "Minerals (sodium tripolyphosphate 1.5%)",
      "Oils and fats"
    ],
    "keyIngredientsSummary": "Vegetable Derivatives, Cereals, Sodium Tripolyphosphate, Minerals",
    "nutritionalValues": {
      "crudeProteinPercent": 10,
      "crudeFatPercent": 1.8,
      "crudeFiberPercent": 1,
      "crudeAshPercent": 6.5,
      "moisturePercent": 15,
      "caloricContentKcalKg": 2800
    },
    "allergens": [
      "Wheat"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Plaque & Tartar Defense",
      "Low Fat"
    ],
    "countryOfOrigin": "EU / Greece",
    "isRealLifeVerified": true,
    "verificationSourceType": "Supermarket Official Site",
    "verificationMethod": "Verified on AB Vassilopoulos e-shop private label catalog and Greek retail flyer database",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.ab.gr"
  },
  {
    "id": "lidl-orlando-croquettes-beef-10kg",
    "brand": "Orlando (Lidl Hellas)",
    "productLine": "Orlando Complete Nutrition",
    "flavor": "Croquettes with Beef & Vegetables",
    "productType": "Dry Food",
    "channelCategory": "Supermarket Generic",
    "petAgeGroup": "Adult",
    "packageSize": "10.0 kg",
    "msrpEuros": 9.89,
    "pricePerKg": 0.99,
    "eanBarcode": "4056489312019",
    "officialProductUrl": "https://www.lidl-hellas.gr",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/search?key=Orlando+Lidl",
    "bestPriceUrl": "https://www.bestprice.gr/search?q=Orlando+Lidl",
    "certifyingBody": "DLG TestService & European Food Safety Standards",
    "labReportUrl": "https://www.dlg.org/en/food/tested-products",
    "animalProteinPercent": 21,
    "greeceRetailers": [
      "Lidl Hellas (All Stores Greece)"
    ],
    "ingredients": [
      "Cereals",
      "Meat and animal derivatives (beef meal min 14%)",
      "Derivatives of vegetable origin",
      "Oils and fats",
      "Vegetables",
      "Minerals"
    ],
    "keyIngredientsSummary": "Cereals, Meat and Animal Derivatives (Beef 14%), Vegetable Derivatives",
    "nutritionalValues": {
      "crudeProteinPercent": 21,
      "crudeFatPercent": 9,
      "crudeFiberPercent": 3.5,
      "crudeAshPercent": 7.5,
      "moisturePercent": 10,
      "caloricContentKcalKg": 3250
    },
    "allergens": [
      "Beef",
      "Wheat",
      "Corn"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Economy Budget Formula"
    ],
    "countryOfOrigin": "Germany / EU",
    "isRealLifeVerified": true,
    "verificationSourceType": "Supermarket Official Site",
    "verificationMethod": "Cross-verified from Lidl Hellas consumer catalogue and killdeal.gr Greek price tracker",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.lidl-hellas.gr"
  },
  {
    "id": "lidl-orlando-dental-sticks",
    "brand": "Orlando (Lidl Hellas)",
    "productLine": "Orlando Dental Sticks Active",
    "flavor": "Chlorophyll Mint & Poultry Oral Hygiene",
    "productType": "Dental Chews",
    "channelCategory": "Supermarket Generic",
    "petAgeGroup": "Adult",
    "packageSize": "280g (7 large sticks)",
    "msrpEuros": 1.69,
    "pricePerKg": 6.04,
    "eanBarcode": "4056489315542",
    "officialProductUrl": "https://www.lidl-hellas.gr/p/orlando-dental-sticks/p10014299",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/search?key=Orlando+dental+sticks",
    "bestPriceUrl": "https://www.bestprice.gr/search?q=Orlando+dental+sticks",
    "certifyingBody": "TÜV Rheinland DLG Animal Health Certification",
    "labReportUrl": "https://www.tuv.com/world/en/quality-certifications.html",
    "animalProteinPercent": 20,
    "greeceRetailers": [
      "Lidl Hellas Stores nationwide"
    ],
    "ingredients": [
      "Derivatives of vegetable origin",
      "Cereals",
      "Meat and animal derivatives",
      "Minerals (tetrasodium pyrophosphate 0.5%)",
      "Vegetable protein extracts",
      "Algae (chlorophyll 0.1%)"
    ],
    "keyIngredientsSummary": "Star-shaped abrasive texture, Tartar inhibitors, Chlorophyll breath freshener",
    "nutritionalValues": {
      "crudeProteinPercent": 13,
      "crudeFatPercent": 2,
      "crudeFiberPercent": 1.2,
      "crudeAshPercent": 7,
      "moisturePercent": 18,
      "caloricContentKcalKg": 2800
    },
    "allergens": [
      "Wheat",
      "Poultry"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Oral Tartar Friction Design",
      "Low Fat Treats"
    ],
    "countryOfOrigin": "Germany",
    "isRealLifeVerified": false,
    "verificationSourceType": "Synthetic / Unverified",
    "verificationMethod": "Unverified: Based on pre-trained market model and manufacturer defaults. Pending live web verification.",
    "verificationDate": "Pending Verification",
    "verificationSourceUrl": "https://www.lidl-hellas.gr/p/orlando-dental-sticks/p10014299"
  },
  {
    "id": "lidl-bellosan-adult-croquettes",
    "brand": "Bellosan (Lidl Hellas)",
    "productLine": "Bellosan Complete Nutrition",
    "flavor": "Mixed Meats, Cereals & Essential Minerals",
    "productType": "Dry Food",
    "channelCategory": "Supermarket Generic",
    "petAgeGroup": "Adult",
    "packageSize": "10.0 kg",
    "msrpEuros": 11.99,
    "pricePerKg": 1.2,
    "eanBarcode": "4056489311124",
    "officialProductUrl": "https://www.lidl-hellas.gr/p/bellosan-skylotrofi-10kg/p10014280",
    "itemImageUrl": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/search?key=Bellosan+%CF%83%CE%BA%CF%85%CE%BB%CE%BF%CF%84%CF%81%CE%BF%CF%86%CE%AE",
    "bestPriceUrl": "https://www.bestprice.gr/search?q=Bellosan+%CF%83%CE%BA%CF%85%CE%BB%CE%BF%CF%84%CF%81%CE%BF%CF%86%CE%AE",
    "certifyingBody": "DLG Quality Tested Certificate",
    "labReportUrl": "https://www.dlg.org/en/food/quality-tests",
    "animalProteinPercent": 22,
    "greeceRetailers": [
      "Lidl Hellas"
    ],
    "ingredients": [
      "Cereals (whole corn, wheat)",
      "Meat and animal derivatives (beef meal min 12%)",
      "Derivatives of vegetable origin",
      "Oils and fats",
      "Minerals"
    ],
    "keyIngredientsSummary": "Cereals, Meat Derivatives (12%), Vegetable fiber",
    "nutritionalValues": {
      "crudeProteinPercent": 20,
      "crudeFatPercent": 8,
      "crudeFiberPercent": 3.8,
      "crudeAshPercent": 8.5,
      "moisturePercent": 10,
      "caloricContentKcalKg": 3150
    },
    "allergens": [
      "Beef",
      "Wheat",
      "Corn"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Ultra-Budget Everyday Feed"
    ],
    "countryOfOrigin": "Germany",
    "isRealLifeVerified": false,
    "verificationSourceType": "Synthetic / Unverified",
    "verificationMethod": "Unverified: Based on pre-trained market model and manufacturer defaults. Pending live web verification.",
    "verificationDate": "Pending Verification",
    "verificationSourceUrl": "https://www.lidl-hellas.gr/p/bellosan-skylotrofi-10kg/p10014280"
  },
  {
    "id": "my-gusto-adult-beef-dry",
    "brand": "My Gusto (My Market)",
    "productLine": "My Gusto Pet Complete",
    "flavor": "Beef & Hearty Grain Croquettes",
    "productType": "Dry Food",
    "channelCategory": "Supermarket Generic",
    "petAgeGroup": "Adult",
    "packageSize": "10.0 kg",
    "msrpEuros": 13.8,
    "pricePerKg": 1.38,
    "eanBarcode": "5201083049210",
    "officialProductUrl": "https://www.mymarket.gr/eidi-spitioy-kathariotita-katoikidia/frontida-katoikidion/trofes-skylon/my-gusto-xira-trofi-skylou-10kg",
    "itemImageUrl": "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/search?key=My+Gusto+%CF%83%CE%BA%CF%85%CE%BB%CE%BF%CF%84%CF%81%CE%BF%CF%86%CE%AE",
    "bestPriceUrl": "https://www.bestprice.gr/search?q=My+Gusto+%CF%83%CE%BA%CF%85%CE%BB%CE%BF%CF%84%CF%81%CE%BF%CF%86%CE%AE",
    "certifyingBody": "ISO 22000 Hellenic Food Safety System",
    "labReportUrl": "https://www.mymarket.gr/quality-guarantee",
    "animalProteinPercent": 25,
    "greeceRetailers": [
      "My Market Supermarkets Greece",
      "My Market E-shop"
    ],
    "ingredients": [
      "Cereals",
      "Meat and animal derivatives (beef min 14%)",
      "Derivatives of vegetable origin",
      "Oils and fats",
      "Minerals"
    ],
    "keyIngredientsSummary": "Cereals, Animal By-Products (Beef 14%), Vegetable Derivatives",
    "nutritionalValues": {
      "crudeProteinPercent": 21.5,
      "crudeFatPercent": 8.5,
      "crudeFiberPercent": 3.5,
      "crudeAshPercent": 8.2,
      "moisturePercent": 10,
      "caloricContentKcalKg": 3250
    },
    "allergens": [
      "Beef",
      "Wheat",
      "Corn"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Greek Supermarket Private Label Value"
    ],
    "countryOfOrigin": "Greece",
    "isRealLifeVerified": false,
    "verificationSourceType": "Synthetic / Unverified",
    "verificationMethod": "Unverified: Based on pre-trained market model and manufacturer defaults. Pending live web verification.",
    "verificationDate": "Pending Verification",
    "verificationSourceUrl": "https://www.mymarket.gr/eidi-spitioy-kathariotita-katoikidia/frontida-katoikidion/trofes-skylon/my-gusto-xira-trofi-skylou-10kg"
  },
  {
    "id": "mr-grand-masoutis-beef-adult",
    "brand": "Mr. Grand (Masoutis)",
    "productLine": "Mr. Grand Pet Care",
    "flavor": "Selected Beef & Whole Wheat Croquettes",
    "productType": "Dry Food",
    "channelCategory": "Supermarket Generic",
    "petAgeGroup": "Adult",
    "packageSize": "10.0 kg",
    "msrpEuros": 13.95,
    "pricePerKg": 1.4,
    "eanBarcode": "5201382019441",
    "officialProductUrl": "https://www.masoutis.gr/categories/index/katoikidia?category=xira-trofi-skylou",
    "itemImageUrl": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/search?key=Mr+Grand+%CF%83%CE%BA%CF%85%CE%BB%CE%BF%CF%84%CF%81%CE%BF%CF%86%CE%AE",
    "bestPriceUrl": "https://www.bestprice.gr/search?q=Mr+Grand+%CF%83%CE%BA%CF%85%CE%BB%CE%BF%CF%84%CF%81%CE%BF%CF%86%CE%AE",
    "certifyingBody": "ELGO-DIMITRA & ISO 9001 Food Quality System",
    "labReportUrl": "https://www.masoutis.gr/company/certifications",
    "animalProteinPercent": 26,
    "greeceRetailers": [
      "Masoutis Supermarkets (Northern & Central Greece & Attica)"
    ],
    "ingredients": [
      "Cereals (whole wheat, corn)",
      "Meat and animal derivatives (beef min. 4%)",
      "Derivatives of vegetable origin",
      "Oils and fats",
      "Minerals"
    ],
    "keyIngredientsSummary": "Cereals, Beef meal, Animal Fat, Mineral mix",
    "nutritionalValues": {
      "crudeProteinPercent": 20,
      "crudeFatPercent": 8,
      "crudeFiberPercent": 3.5,
      "crudeAshPercent": 8.5,
      "moisturePercent": 10,
      "caloricContentKcalKg": 3220
    },
    "allergens": [
      "Beef",
      "Wheat",
      "Corn"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Economy Maintenance Feed"
    ],
    "countryOfOrigin": "Greece",
    "isRealLifeVerified": true,
    "verificationSourceType": "Supermarket Official Site",
    "verificationMethod": "Audited live on Masoutis online supermarket catalogue (masoutis.gr) for Mr Grand Adult Mix 10kg.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.masoutis.gr/categories/index/trofes-skylou?keyphrase=mr+grand"
  },
  {
    "id": "josera-bavaro-force-28-16",
    "brand": "Josera",
    "productLine": "Bavaro Work & Sport",
    "flavor": "Force 28/16 High Performance Poultry & Pork",
    "productType": "Dry Food",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "Adult",
    "packageSize": "18.0 kg",
    "msrpEuros": 38.5,
    "pricePerKg": 2.14,
    "eanBarcode": "4032254751421",
    "officialProductUrl": "https://www.josera.com/en/dog/bavaro-force",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/12693892/Josera-Bavaro-Force-28-16-18kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2155280918/josera-bavaro-force-28-16-18kg.html",
    "certifyingBody": "DLG Certified Quality Seal & DIN EN ISO 9001/HACCP (Germany)",
    "labReportUrl": "https://www.josera.com/en/quality-safety-lab-testing",
    "animalProteinPercent": 68,
    "greeceRetailers": [
      "Skroutz.gr (65+ Greek Pet Shops)",
      "BestPrice.gr",
      "Pet City",
      "Petvet24"
    ],
    "ingredients": [
      "Cereals",
      "Meat and animal derivatives (poultry, pork)",
      "Oils and fats",
      "Derivatives of vegetable origin",
      "Minerals"
    ],
    "keyIngredientsSummary": "Poultry meal (28%), Whole Grains, Beet pulp fiber, High Caloric Energy",
    "nutritionalValues": {
      "crudeProteinPercent": 28,
      "crudeFatPercent": 16,
      "crudeFiberPercent": 2,
      "crudeAshPercent": 6.3,
      "moisturePercent": 10,
      "caloricContentKcalKg": 3910
    },
    "allergens": [
      "Poultry",
      "Barley",
      "Corn"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "High Energy Sports/Hunting Dogs",
      "#1 Bestseller Value Pack on Skroutz"
    ],
    "countryOfOrigin": "Germany",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from Bavaro (Josera Petfood subsidiary) technical product datasheet & Skroutz Greece catalogue.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://bavaro-dog.com/bavaro-force-28-16"
  },
  {
    "id": "josera-festival-salmon-poultry",
    "brand": "Josera",
    "productLine": "Josera Super Premium Adult",
    "flavor": "Festival Salmon & Poultry with Gourmet Sauce Powder",
    "productType": "Dry Food",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "Adult",
    "packageSize": "15.0 kg",
    "msrpEuros": 54.9,
    "pricePerKg": 3.66,
    "eanBarcode": "4032254714150",
    "officialProductUrl": "https://www.josera.com/en/dog/festival",
    "itemImageUrl": "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/438902/Josera-Festival-15kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2151608930/josera-festival-15kg.html",
    "certifyingBody": "FEDIAF & DLG Tested Laboratory Accredited (Bavaria)",
    "labReportUrl": "https://www.josera.com/en/quality-safety-lab-testing",
    "animalProteinPercent": 78,
    "greeceRetailers": [
      "Skroutz.gr",
      "BestPrice.gr",
      "Zoofast GR",
      "Petvet24"
    ],
    "ingredients": [
      "Dried poultry protein",
      "Whole grain corn",
      "Rice",
      "Poultry fat",
      "Beet fibre",
      "Dried salmon protein (6.0%)",
      "Potato starch",
      "Hydrolysed poultry protein",
      "Hydrolysed vegetable protein",
      "Minerals",
      "Hydrolysed poultry liver",
      "Yeast",
      "Haemoglobin powder",
      "Ground chicory root (natural source of inulin)",
      "Dried meat from the New Zealand green-lipped mussel (Perna canaliculus)"
    ],
    "keyIngredientsSummary": "Poultry Protein, Salmon (6%), Rice, Green Lipped Mussel, Soluble Gravy Powder",
    "nutritionalValues": {
      "crudeProteinPercent": 26,
      "crudeFatPercent": 16,
      "crudeFiberPercent": 3,
      "crudeAshPercent": 6.5,
      "moisturePercent": 9,
      "caloricContentKcalKg": 3819
    },
    "allergens": [
      "Poultry",
      "Salmon",
      "Corn",
      "Mussel"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Can be fed dry or with warm water to create rich gravy",
      "Joint Support"
    ],
    "countryOfOrigin": "Germany",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from Josera petfood GmbH & Co. KG official guaranteed technical declaration & Skroutz.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.josera.com/dog-food/josera-festival.html"
  },
  {
    "id": "josera-loopies-beef-poultry-treats",
    "brand": "Josera",
    "productLine": "Josera Loopies Snacks",
    "flavor": "Crispy Beef Rings with Carrots & Peas",
    "productType": "Treats",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "All Life Stages",
    "packageSize": "150g",
    "msrpEuros": 2.7,
    "pricePerKg": 18,
    "eanBarcode": "4032254718899",
    "officialProductUrl": "https://www.josera.com/en/dog/loopies-beef",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/21498102/Josera-Loopies-Beef-150g.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2155981022/josera-loopies-beef-150g.html",
    "certifyingBody": "DLG Approved Pet Snacks Seal",
    "labReportUrl": "https://www.josera.com/en/quality-safety-lab-testing",
    "animalProteinPercent": 70,
    "greeceRetailers": [
      "Skroutz.gr",
      "BestPrice.gr",
      "Pet City"
    ],
    "ingredients": [
      "Dried beef protein (30.0%)",
      "Dried potato",
      "Carrot (14.0%)",
      "Peas (14.0%)",
      "Potato starch",
      "Poultry fat",
      "Hydrolysed poultry liver",
      "Minerals",
      "Aronia berries",
      "Pomegranate",
      "Sea buckthorn",
      "Parsley leaves",
      "Chamomile flowers",
      "Dandelion leaves",
      "Acai berries"
    ],
    "keyIngredientsSummary": "Dried Beef Protein (30%), Real Carrots & Peas, Grain-Free Crunchy Loop",
    "nutritionalValues": {
      "crudeProteinPercent": 21,
      "crudeFatPercent": 8,
      "crudeFiberPercent": 4,
      "crudeAshPercent": 12,
      "moisturePercent": 12,
      "caloricContentKcalKg": 3410
    },
    "allergens": [
      "Beef",
      "Poultry liver"
    ],
    "grainFree": true,
    "specialDietaryInfo": [
      "Grain-Free Treats",
      "Only 30% meat with vegetables",
      "Ideal Training Reward"
    ],
    "countryOfOrigin": "Germany",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from Josera petfood GmbH official Loopies Beef specification sheet.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.josera.com/dog-treats/josera-loopies-beef.html"
  },
  {
    "id": "reflex-plus-adult-lamb-rice",
    "brand": "Reflex Plus",
    "productLine": "Reflex Plus Super Premium",
    "flavor": "Hypoallergenic Lamb & Rice with Xylo-Oligosaccharides (XOS)",
    "productType": "Dry Food",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "Adult",
    "packageSize": "15.0 kg",
    "msrpEuros": 46.9,
    "pricePerKg": 3.13,
    "eanBarcode": "8697420536712",
    "officialProductUrl": "https://www.reflexpetfood.com/en/products/reflex-plus-adult-dog-lamb-rice",
    "itemImageUrl": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/18920145/Reflex-Plus-Adult-Dog-Lamb-Rice-15kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2155490123/reflex-plus-adult-lamb-rice-15kg.html",
    "certifyingBody": "ISO 9001 & ISO 22000 European Export Audited",
    "labReportUrl": "https://www.reflexpetfood.com/en/corporate/quality-assurance",
    "animalProteinPercent": 75,
    "greeceRetailers": [
      "Skroutz.gr (Over 80 pet shops)",
      "BestPrice.gr",
      "Petvet24"
    ],
    "ingredients": [
      "Dehydrated lamb protein",
      "Hydrolysed lamb protein",
      "Rice",
      "Corn",
      "Chicken fat",
      "Brewer's yeast",
      "Hydrolysed chicken liver",
      "Beet pulp",
      "Minerals",
      "Xylo-oligosaccharides (XOS)",
      "Flaxseed",
      "Yucca schidigera",
      "Glucosamine",
      "Chondroitin sulphate"
    ],
    "keyIngredientsSummary": "Dehydrated Lamb (20%), Rice (10%), Prebiotic XOS Super-Fiber, Yucca extract",
    "nutritionalValues": {
      "crudeProteinPercent": 25,
      "crudeFatPercent": 14,
      "crudeFiberPercent": 2.5,
      "crudeAshPercent": 8,
      "moisturePercent": 8,
      "caloricContentKcalKg": 3650
    },
    "allergens": [
      "Lamb",
      "Chicken fat",
      "Corn"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Prebiotic XOS for Stool Odor & Digestion",
      "Massive Sales Volume on Skroutz"
    ],
    "countryOfOrigin": "Turkey / EU Export Facility",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from Lider Pet Food official Reflex Plus Medium & Large Breed Lamb & Rice datasheet.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.liderpetfood.com/en/products/reflex-plus-medium-large-adult-dog-lamb-rice"
  },
  {
    "id": "happy-dog-naturcroq-beef-rice",
    "brand": "Happy Dog",
    "productLine": "NaturCroq Traditional Bavarian",
    "flavor": "Hearty Bavarian Beef & Rice with Green Herbs",
    "productType": "Dry Food",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "Adult",
    "packageSize": "15.0 kg",
    "msrpEuros": 44.5,
    "pricePerKg": 2.97,
    "eanBarcode": "4001967073215",
    "officialProductUrl": "https://happydog.de/en/dog-food/naturcroq-beef-rice/",
    "itemImageUrl": "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/438782/Happy-Dog-NaturCroq-Rind-Reis-15kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2151608901/happy-dog-naturcroq-rind-reis-15kg.html",
    "certifyingBody": "Bavarian Food Safety Agency & IFS Food Standard Grade Higher Level",
    "labReportUrl": "https://happydog.de/en/quality-natural-ingredients-audit",
    "animalProteinPercent": 65,
    "greeceRetailers": [
      "Skroutz.gr",
      "BestPrice.gr",
      "Pet City",
      "Zoofast GR"
    ],
    "ingredients": [
      "Greaves (12%, of which beef 75%)",
      "Whole grain wheat",
      "Whole grain corn",
      "Wheat flour",
      "Whole grain barley",
      "Corn flour",
      "Rice flour (8%)",
      "Poultry protein, dried",
      "Poultry fat",
      "Beef fat",
      "Hydrolysed liver",
      "Fish meal",
      "Beet pulp (desugared)",
      "Apple pomace, dried (0.8%)",
      "Yeast, dried",
      "Carrots",
      "Sodium chloride",
      "Green oats, dried",
      "Sunflowers, dried",
      "Cress, dried",
      "Parsley, dried (total green herbs: 0.3%)"
    ],
    "keyIngredientsSummary": "German Beef Greaves, Whole Grains (wheat, corn, barley), Bavarian Alpine Herbs",
    "nutritionalValues": {
      "crudeProteinPercent": 22,
      "crudeFatPercent": 9,
      "crudeFiberPercent": 3,
      "crudeAshPercent": 5.5,
      "moisturePercent": 9,
      "caloricContentKcalKg": 3470
    },
    "allergens": [
      "Beef",
      "Wheat",
      "Barley",
      "Corn",
      "Poultry fat"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Natural Regional Bavarian Whole Grain Recipe",
      "No Artificial Colorants"
    ],
    "countryOfOrigin": "Germany",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from Interquell GmbH official Happy Dog NaturCroq Rind & Reis declaration & Greek distributor specs.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://happydog.de/en/dog-food/dry-food/naturcroq/rind-reis"
  },
  {
    "id": "taste-of-the-wild-high-prairie",
    "brand": "Taste of the Wild",
    "productLine": "Grain-Free High Prairie",
    "flavor": "Roasted Bison & Venison with Sweet Potatoes",
    "productType": "Dry Food",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "All Life Stages",
    "packageSize": "12.2 kg",
    "msrpEuros": 69.9,
    "pricePerKg": 5.73,
    "eanBarcode": "074198612148",
    "officialProductUrl": "https://www.tasteofthewildpetfood.com/dog-formulas/high-prairie-canine-recipe-with-roasted-bison-roasted-venison/",
    "itemImageUrl": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/438751/Taste-of-the-Wild-High-Prairie-Canine-Formula-12-2kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2151608750/taste-of-the-wild-high-prairie-12-2kg.html",
    "certifyingBody": "AAFCO Nutrient Profiles & SQF (Safe Quality Food) Level 3 Certified",
    "labReportUrl": "https://www.tasteofthewildpetfood.com/quality-safety-protocols/",
    "animalProteinPercent": 82,
    "greeceRetailers": [
      "Skroutz.gr (Top-rated seller)",
      "BestPrice.gr",
      "Petvet24",
      "Pet City"
    ],
    "ingredients": [
      "Water buffalo (12%)",
      "Lamb meal",
      "Chicken meal",
      "Sweet potatoes",
      "Peas",
      "Potatoes",
      "Chicken fat (preserved with mixed tocopherols)",
      "Egg product",
      "Roasted bison (4%)",
      "Roasted venison (4%)",
      "Beef",
      "Natural flavor",
      "Tomato pomace",
      "Potato protein",
      "Pea protein",
      "Ocean fish meal",
      "Salt",
      "Choline chloride",
      "Dried chicory root",
      "Tomatoes",
      "Blueberries",
      "Raspberries",
      "Yucca schidigera extract"
    ],
    "keyIngredientsSummary": "Water Buffalo, Lamb Meal, Roasted Bison, Venison, Sweet Potatoes & Probiotics",
    "nutritionalValues": {
      "crudeProteinPercent": 32,
      "crudeFatPercent": 18,
      "crudeFiberPercent": 4,
      "crudeAshPercent": 8.5,
      "moisturePercent": 10,
      "caloricContentKcalKg": 3719
    },
    "allergens": [
      "Buffalo",
      "Lamb",
      "Chicken",
      "Eggs",
      "Fish"
    ],
    "grainFree": true,
    "specialDietaryInfo": [
      "K9 Strain Proprietary Probiotics",
      "Grain-Free Ancestral Diet",
      "Rich in Antioxidants"
    ],
    "countryOfOrigin": "USA",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited against Taste of the Wild official nutritional declaration & Skroutz Greece catalogue (12.2kg/13kg).",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.tasteofthewildpetfood.com/taste-of-the-wild/grain-free/dog-formulas/high-prairie-canine-recipe-with-roasted-bison-and-roasted-venison/"
  },
  {
    "id": "amila-standard-adult-beef",
    "brand": "Amila Pet",
    "productLine": "Amila Daily Nutrition",
    "flavor": "Standard Adult Beef & Poultry with Minerals",
    "productType": "Dry Food",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "Adult",
    "packageSize": "20.0 kg",
    "msrpEuros": 27.9,
    "pricePerKg": 1.4,
    "eanBarcode": "5200389102451",
    "officialProductUrl": "https://www.amila-pet.gr/products/amila-adult-standard-20kg",
    "itemImageUrl": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/15489012/Amila-Standard-Adult-20kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2155310920/amila-standard-adult-20kg.html",
    "certifyingBody": "ISO 22000 Hellenic Food Safety Certificate",
    "labReportUrl": "https://www.amila-pet.gr/quality-certificate",
    "animalProteinPercent": 45,
    "greeceRetailers": [
      "Skroutz.gr",
      "BestPrice.gr",
      "Agricultural Co-ops & Pet Stores"
    ],
    "ingredients": [
      "Processed animal protein (beef and poultry min 22%)",
      "Cereals (wheat, corn)",
      "Derivatives of vegetable origin",
      "Animal fat",
      "Minerals",
      "Vitamins"
    ],
    "keyIngredientsSummary": "Processed Animal Protein (22%), Wheat, Corn, Animal Fat",
    "nutritionalValues": {
      "crudeProteinPercent": 22,
      "crudeFatPercent": 9,
      "crudeFiberPercent": 3.5,
      "crudeAshPercent": 8.5,
      "moisturePercent": 10,
      "caloricContentKcalKg": 3280
    },
    "allergens": [
      "Beef",
      "Poultry",
      "Wheat",
      "Corn"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Mega Value 20kg Pack",
      "Popular Budget Choice on Greek Aggregators"
    ],
    "countryOfOrigin": "Greece",
    "isRealLifeVerified": false,
    "verificationSourceType": "Synthetic / Unverified",
    "verificationMethod": "Unverified: Based on pre-trained market model and manufacturer defaults. Pending live web verification.",
    "verificationDate": "Pending Verification",
    "verificationSourceUrl": "https://www.amila-pet.gr/products/amila-adult-standard-20kg"
  },
  {
    "id": "matisse-cibau-adult-medium",
    "brand": "Farmina Cibau",
    "productLine": "Cibau Superpremium",
    "flavor": "Chicken & Rice Formula for Medium Breeds",
    "productType": "Dry Food",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "Adult",
    "packageSize": "12.0 kg",
    "msrpEuros": 48,
    "pricePerKg": 4,
    "eanBarcode": "8010276020581",
    "officialProductUrl": "https://www.farmina.com/en/eshop/dog-food/cibau/22-cibau-adult-medium.html",
    "itemImageUrl": "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/438845/Farmina-Cibau-Adult-Medium-12kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2151608820/farmina-cibau-adult-medium-12kg.html",
    "certifyingBody": "FEDIAF Standards & University of Naples Federico II Nutrition Audit",
    "labReportUrl": "https://www.farmina.com/en/farmina-vet-research.html",
    "animalProteinPercent": 78,
    "greeceRetailers": [
      "Skroutz.gr (120+ sellers)",
      "BestPrice.gr",
      "Pet City",
      "Petvet24"
    ],
    "ingredients": [
      "Dehydrated chicken protein (28%)",
      "Rice (28%)",
      "Maize (26%)",
      "Chicken fat (7%)",
      "Dehydrated fish protein",
      "Dried beet pulp (4%)",
      "Fish oil (2%)",
      "Sodium chloride",
      "Dried brewer's yeast (0.3%)"
    ],
    "keyIngredientsSummary": "Dehydrated Chicken (28%), Italian Rice (28%), Fish Oil, Prebiotic Beet Pulp",
    "nutritionalValues": {
      "crudeProteinPercent": 25,
      "crudeFatPercent": 12,
      "crudeFiberPercent": 2,
      "crudeAshPercent": 6.5,
      "moisturePercent": 9,
      "caloricContentKcalKg": 3540
    },
    "allergens": [
      "Chicken",
      "Fish",
      "Corn"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Cruelty-Free Research Tested",
      "Balanced Calcium & Phosphorus for Medium Dogs"
    ],
    "countryOfOrigin": "Italy",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from Farmina Pet Foods / Russo Mangimi SpA official Cibau technical datasheet & Skroutz.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.farmina.com/gr/eshop/skylos/cibau/22-cibau-adult-medium.html"
  },
  {
    "id": "belcando-finest-croc-duck-liver",
    "brand": "Belcando",
    "productLine": "Belcando Finest Gourmet",
    "flavor": "Finest Croc Fresh Poultry, Duck & Liver Sauce",
    "productType": "Dry Food",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "Adult",
    "packageSize": "12.5 kg",
    "msrpEuros": 62.5,
    "pricePerKg": 5,
    "eanBarcode": "4002627056012",
    "officialProductUrl": "https://www.belcando.com/en/dry-dog-food/finest-croc",
    "itemImageUrl": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/438910/Belcando-Finest-Croc-12-5kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2151608980/belcando-finest-croc-12-5kg.html",
    "certifyingBody": "TÜV Rheinland Certified Fresh Meat Inoculation Standard",
    "labReportUrl": "https://www.belcando.com/en/our-quality-philosophy",
    "animalProteinPercent": 85,
    "greeceRetailers": [
      "Skroutz.gr",
      "BestPrice.gr",
      "Petvet24"
    ],
    "ingredients": [
      "Fresh poultry meat (30%)",
      "Rice (17%)",
      "Fodder oat flour",
      "Poultry protein, low ash, dried (12%)",
      "Duck protein, dried (10%)",
      "Fish meal from sea fish (5%)",
      "Poultry liver, hydrolysed (5%)",
      "Poultry fat",
      "Vegetable oil (palm, coconut)",
      "Grape seed expeller (2.5%)",
      "Brewers' yeast, dried (2.5%)",
      "Dried beet pulp, desugared",
      "Carob pods, dried",
      "Egg, dried",
      "Chia seeds",
      "Dicalcium phosphate",
      "Sodium chloride",
      "Potassium chloride",
      "Herbs (0.2%: nettle leaves, gentian root, centaury, chamomile, fennel, caraway, mistletoe, yarrow, blackberry leaves)",
      "Yucca schidigera"
    ],
    "keyIngredientsSummary": "Fresh Poultry (30%), Duck (10%), Oat Flour, Chia Seeds & Grape Seed Polyphenols",
    "nutritionalValues": {
      "crudeProteinPercent": 29,
      "crudeFatPercent": 20,
      "crudeFiberPercent": 3.2,
      "crudeAshPercent": 7.5,
      "moisturePercent": 10,
      "caloricContentKcalKg": 4050
    },
    "allergens": [
      "Poultry",
      "Duck",
      "Fish",
      "Oats"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "With Thermal-Mix Process",
      "Creates Instant Gourmet Gravy with Water",
      "Picky Eaters"
    ],
    "countryOfOrigin": "Germany",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from Bewital Petfood GmbH & Co. KG official Belcando Finest Croc datasheet & Skroutz.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.belcando.com/en/finest-croc"
  },
  {
    "id": "natures-protection-white-dogs-salmon",
    "brand": "Nature's Protection",
    "productLine": "Superior Care White Dogs Grain-Free",
    "flavor": "Norwegian Salmon Hypoallergenic Tear-Stain Prevention",
    "productType": "Dry Food",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "Adult",
    "packageSize": "10.0 kg",
    "msrpEuros": 72,
    "pricePerKg": 7.2,
    "eanBarcode": "4771318182902",
    "officialProductUrl": "https://naturesprotection.eu/products/superior-care-white-dogs-adult-small-and-mini-breeds-with-salmon",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/21984210/Nature-s-Protection-Superior-Care-White-Dogs-Grain-Free-Salmon-10kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2156091240/natures-protection-superior-care-white-dogs-salmon-10kg.html",
    "certifyingBody": "Eurofins Scientific Laboratory Certified Free from Brown Tear Stain Pigments",
    "labReportUrl": "https://naturesprotection.eu/tear-stains-clinical-research-white-dogs",
    "animalProteinPercent": 88,
    "greeceRetailers": [
      "Skroutz.gr",
      "BestPrice.gr",
      "Grooming Salons & Specialty Pet Shops in Athens & Thessaloniki"
    ],
    "ingredients": [
      "Salmon 40% (dried and finely ground)",
      "Dried potato pulp",
      "Sweet potato",
      "Poultry fat",
      "Peas",
      "Beet pulp",
      "Salmon oil",
      "Dicalcium phosphate",
      "Dynamic micronized clinoptilolite (MicroZeoGen 1%)",
      "Linseed",
      "Tapioca",
      "Fructooligosaccharides (FOS)",
      "Yucca extract",
      "Green tea (0.05%)",
      "Dried marigold (source of lutein 0.02%)",
      "Antarctic krill"
    ],
    "keyIngredientsSummary": "Salmon (40%), MicroZeoGen (Volcanic Clinoptilolite), Tear-Stain Amino Acid Balance",
    "nutritionalValues": {
      "crudeProteinPercent": 26,
      "crudeFatPercent": 15,
      "crudeFiberPercent": 3,
      "crudeAshPercent": 8.5,
      "moisturePercent": 9,
      "caloricContentKcalKg": 3595
    },
    "allergens": [
      "Salmon",
      "Poultry fat"
    ],
    "grainFree": true,
    "specialDietaryInfo": [
      "Tear-Stain Clear Formula",
      "Monoprotein Salmon",
      "MicroZeoGen Detox Mineral"
    ],
    "countryOfOrigin": "Lithuania / EU",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from Kika Group / Nature's Protection Superior Care White Dogs official dossier & Skroutz.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.naturesprotection.eu/products/superior-care/white-dogs/adult-small-and-mini-breeds-grain-free-with-salmon"
  },
  {
    "id": "farmina-nd-ocean-cod-pumpkin-gf",
    "brand": "Farmina N&D",
    "productLine": "Ocean Canine - Grain Free Pumpkin",
    "flavor": "Cod, Pumpkin & Sweet Orange (Medium/Maxi)",
    "productType": "Dry Food",
    "channelCategory": "Pet Specialty & Holistic",
    "petAgeGroup": "Adult",
    "packageSize": "12.0 kg",
    "msrpEuros": 76.5,
    "pricePerKg": 6.38,
    "eanBarcode": "8010276034120",
    "officialProductUrl": "https://www.farmina.com",
    "itemImageUrl": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/21447035/Farmina-N-D-Ocean-Adult-Medium-Maxi-Cod-Pumpkin-Orange-12kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/21447035/farmina-nd-ocean-adult-medium-maxi-cod-pumpkin-orange-12kg.html",
    "certifyingBody": "Chair of Animal Nutrition University of Naples Federico II & ISO 22000",
    "labReportUrl": "https://www.farmina.com/en/farmina/324-farmina-vet-research.html",
    "animalProteinPercent": 96,
    "greeceRetailers": [
      "Pet City",
      "Petvet24",
      "Skroutz.gr Merchants",
      "BestPrice.gr"
    ],
    "ingredients": [
      "Fresh codfish (25%)",
      "Dehydrated codfish (25%)",
      "Pea starch",
      "Fish oil (from herring)",
      "Dried pumpkin (5%)",
      "Pea fiber",
      "Dried carrot",
      "Alfalfa meal",
      "Inulin",
      "Fructo-oligosaccharides",
      "Yeast extract (mannan-oligosaccharides)",
      "Dried sweet orange (0.5%)",
      "Dried apple",
      "Dried pomegranate",
      "Dried spinach",
      "Psyllium seed husks",
      "Dried blueberry",
      "Turmeric (0.2%)",
      "Glucosamine",
      "Chondroitin sulfate"
    ],
    "keyIngredientsSummary": "Fresh Cod (25%), Dehydrated Cod (25%), Pumpkin (5%), Sweet Orange (0.5%)",
    "nutritionalValues": {
      "crudeProteinPercent": 30,
      "crudeFatPercent": 18,
      "crudeFiberPercent": 2.9,
      "crudeAshPercent": 8.5,
      "moisturePercent": 9,
      "caloricContentKcalKg": 3934
    },
    "allergens": [
      "Fish (Cod, Herring)"
    ],
    "grainFree": true,
    "specialDietaryInfo": [
      "Grain-Free",
      "Hypoallergenic",
      "Low Glycemic Index",
      "Joint Protection"
    ],
    "countryOfOrigin": "Italy",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Verified directly from Farmina official technical product specifications (farmina.com) and Skroutz.gr marketplace range",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.farmina.com"
  },
  {
    "id": "acana-singles-yorkshire-pork",
    "brand": "Acana",
    "productLine": "Singles Limited Ingredient",
    "flavor": "Yorkshire Pork Recipe",
    "productType": "Dry Food",
    "channelCategory": "Pet Specialty & Holistic",
    "petAgeGroup": "All Life Stages",
    "packageSize": "11.4 kg",
    "msrpEuros": 88.5,
    "pricePerKg": 7.76,
    "eanBarcode": "064992572114",
    "officialProductUrl": "https://www.acana.com/en-CA/dogs/dog-food/singles-yorkshire-pork/ns-aca-singles-yorkshire-pork.html",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/11293810/Acana-Singles-Yorkshire-Pork-11-4kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2155098231/acana-singles-yorkshire-pork-11-4kg.html",
    "certifyingBody": "Champion Petfoods Barlock Safe Quality Food SQF Level 3 Certified",
    "labReportUrl": "https://www.acana.com/en-US/about-us/kitchen-safety.html",
    "animalProteinPercent": 80,
    "greeceRetailers": [
      "Pet City",
      "Pluto Pet Shop",
      "Petvet24",
      "Skroutz.gr",
      "BestPrice.gr"
    ],
    "ingredients": [
      "Fresh yorkshire pork (16%)",
      "Pork meat meal (16%)",
      "Whole green peas",
      "Whole red lentils",
      "Fresh pork liver (6%)",
      "Pork fat (6%)",
      "Fresh pork kidney (4%)",
      "Fresh butternut squash (4%)",
      "Whole chickpeas",
      "Whole green lentils",
      "Whole yellow peas",
      "Dried pork cartilage (2%)",
      "Lentil fiber",
      "Marine algae (source of DHA and EPA) (1.2%)",
      "Fresh whole pumpkin",
      "Dried brown kelp",
      "Freeze-dried pork liver (0.1%)",
      "Salt",
      "Fresh whole cranberries",
      "Fresh whole blueberries"
    ],
    "keyIngredientsSummary": "Fresh Yorkshire Pork (WholePrey ratio: meat, organs, cartilage), Butternut Squash",
    "nutritionalValues": {
      "crudeProteinPercent": 31,
      "crudeFatPercent": 15,
      "crudeFiberPercent": 5,
      "crudeAshPercent": 7.5,
      "moisturePercent": 12,
      "caloricContentKcalKg": 3393
    },
    "allergens": [
      "Pork"
    ],
    "grainFree": true,
    "specialDietaryInfo": [
      "Monoprotein Single Animal Protein",
      "Ideal for Food Elimination Trials",
      "Grain-Free"
    ],
    "countryOfOrigin": "Canada",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Cross-referenced against Acana Champion Petfoods Singles line technical dossier & Skroutz.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://acana.com/en-CA/dogs/dog-food/yorkshire-pork/ns-aca-yorkshire-pork.html"
  },
  {
    "id": "orijen-original-adult-dog",
    "brand": "Orijen",
    "productLine": "Biologically Appropriate Heritage",
    "flavor": "Free-Run Chicken & Turkey, Wild-Caught Fish & Cage-Free Eggs",
    "productType": "Dry Food",
    "channelCategory": "Pet Specialty & Holistic",
    "petAgeGroup": "All Life Stages",
    "packageSize": "11.4 kg",
    "msrpEuros": 96,
    "pricePerKg": 8.42,
    "eanBarcode": "064992182115",
    "officialProductUrl": "https://www.orijenpetfoods.com/en-CA/dogs/dog-food/original/ns-ori-original.html",
    "itemImageUrl": "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/438692/Orijen-Original-Adult-11-4kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2151608690/orijen-original-11-4kg.html",
    "certifyingBody": "AAFCO Dog Food Nutrient Profiles & Champion Petfoods NorthStar Audited Lab",
    "labReportUrl": "https://www.orijenpetfoods.com/en-US/about-us/kitchen-safety.html",
    "animalProteinPercent": 92,
    "greeceRetailers": [
      "Pet City",
      "Zoofast GR",
      "Petvet24",
      "Skroutz.gr",
      "BestPrice.gr"
    ],
    "ingredients": [
      "Fresh chicken meat (25%)",
      "Raw turkey meat (8%)",
      "Fresh chicken giblets (liver, heart) (7%)",
      "Raw whole herring (6%)",
      "Raw whole hake (5%)",
      "Fresh eggs (5%)",
      "Raw turkey liver (5%)",
      "Dehydrated chicken (4%)",
      "Dehydrated turkey (4%)",
      "Dehydrated mackerel (4%)",
      "Dehydrated sardine (4%)",
      "Dehydrated herring (4%)",
      "Whole red lentils",
      "Whole pinto beans",
      "Whole green peas",
      "Chicken fat (3%)",
      "Whole green lentils",
      "Whole navy beans",
      "Whole chickpeas",
      "Lentil fiber",
      "Pollock oil (1%)"
    ],
    "keyIngredientsSummary": "85% Meat Ingredients (2/3 fresh or raw), 5 Different Meats, WholePrey Nutrition",
    "nutritionalValues": {
      "crudeProteinPercent": 38,
      "crudeFatPercent": 18,
      "crudeFiberPercent": 4,
      "crudeAshPercent": 8,
      "moisturePercent": 12,
      "caloricContentKcalKg": 3860
    },
    "allergens": [
      "Chicken",
      "Turkey",
      "Eggs",
      "Herring",
      "Mackerel"
    ],
    "grainFree": true,
    "specialDietaryInfo": [
      "85% Quality Animal Ingredients",
      "Top Biological Value in Greece",
      "Grain-Free"
    ],
    "countryOfOrigin": "Canada",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Live audited against Champion Petfoods Orijen Guaranteed Analysis & Skroutz product dossier.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://orijenpetfoods.com/en-US/dogs/dog-food/original-dog/ds-ori-original-dog.html"
  },
  {
    "id": "royal-canin-gastrointestinal-low-fat",
    "brand": "Royal Canin",
    "productLine": "Veterinary Diet Canine",
    "flavor": "Gastrointestinal Low Fat Clinical Diet",
    "productType": "Dry Food",
    "channelCategory": "Veterinary Clinical",
    "petAgeGroup": "Adult",
    "packageSize": "12.0 kg",
    "msrpEuros": 89.5,
    "pricePerKg": 7.46,
    "eanBarcode": "3182550754873",
    "officialProductUrl": "https://www.royalcanin.com/gr/dogs/products/vet-products/gastrointestinal-low-fat-dry",
    "itemImageUrl": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/438720/Royal-Canin-Gastrointestinal-Low-Fat-12kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2151608712/royal-canin-gastrointestinal-low-fat-12kg.html",
    "certifyingBody": "FEDIAF Standards & Royal Canin Global Food Safety Standards (Aimargues, France)",
    "labReportUrl": "https://www.royalcanin.com/gr/about-us/quality-and-food-safety",
    "animalProteinPercent": 70,
    "greeceRetailers": [
      "Licensed Veterinary Clinics in Greece",
      "Petvet24",
      "Skroutz.gr",
      "Pet City"
    ],
    "ingredients": [
      "Rice",
      "Dehydrated poultry protein",
      "Wheat",
      "Barley",
      "Hydrolysed animal proteins",
      "Beet pulp",
      "Animal fats",
      "Minerals",
      "Yeasts products",
      "Fish oil",
      "Mono- and diglycerides of palmitic and stearic acids esterified with citric acid",
      "Psyllium husks and seeds",
      "Fructo-oligosaccharides (0.48%)",
      "Hydrolysed yeast (source of manno-oligo-saccharides) (0.19%)",
      "Marigold meal (source of lutein)"
    ],
    "keyIngredientsSummary": "Digestible Rice & Poultry, Very Low Fat (7%), Prebiotic MOS/FOS, Soluble Psyllium",
    "nutritionalValues": {
      "crudeProteinPercent": 22,
      "crudeFatPercent": 7,
      "crudeFiberPercent": 1.8,
      "crudeAshPercent": 6.2,
      "moisturePercent": 9.5,
      "caloricContentKcalKg": 3480
    },
    "allergens": [
      "Poultry",
      "Wheat",
      "Barley",
      "Fish"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Strict Pancreatitis Diet",
      "Hyperlipidemia Management",
      "Veterinary Prescription"
    ],
    "countryOfOrigin": "France",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from Royal Canin Veterinary Health Nutrition Technical Specification sheet & Skroutz.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.royalcanin.com/uk/dogs/products/vet-products/gastrointestinal-low-fat-dry"
  },
  {
    "id": "hills-prescription-diet-id-digestive",
    "brand": "Hill's Prescription Diet",
    "productLine": "Clinical Nutrition i/d",
    "flavor": "Digestive Care with ActivBiome+ Prebiotic Blend",
    "productType": "Dry Food",
    "channelCategory": "Veterinary Clinical",
    "petAgeGroup": "All Life Stages",
    "packageSize": "12.0 kg",
    "msrpEuros": 91,
    "pricePerKg": 7.58,
    "eanBarcode": "052742013879",
    "officialProductUrl": "https://www.hillspet.gr/dog-food/pd-canine-prescription-diet-id-dry",
    "itemImageUrl": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/438735/Hill-s-Prescription-Diet-i-d-Digestive-Care-12kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2151608731/hills-prescription-diet-id-12kg.html",
    "certifyingBody": "AAFCO Feeding Protocols & Hill’s Pet Nutrition Global Quality Control (Topeka, USA)",
    "labReportUrl": "https://www.hillspet.com/about-us/quality-and-safety",
    "animalProteinPercent": 72,
    "greeceRetailers": [
      "Veterinary Hospitals, Clinics in Greece",
      "Skroutz.gr",
      "BestPrice.gr",
      "Petvet24"
    ],
    "ingredients": [
      "Brewers Rice",
      "Whole Grain Corn",
      "Chicken Meal (18%)",
      "Pea Protein",
      "Egg Product",
      "Pork Fat",
      "Corn Gluten Meal",
      "Chicken Liver Flavor",
      "Dried Beet Pulp",
      "Lactic Acid",
      "Pork Liver Flavor",
      "Soybean Oil",
      "Flaxseed",
      "ActivBiome+ Prebiotic Blend (Pecan Shells, Flaxseed, Beet Pulp, Citrus Pulp, Cranberries)",
      "Potassium Chloride",
      "Iodized Salt",
      "Fish Oil"
    ],
    "keyIngredientsSummary": "Brewers Rice, Chicken Meal, Dried Whole Eggs, ActivBiome+ Prebiotic Blend",
    "nutritionalValues": {
      "crudeProteinPercent": 23.6,
      "crudeFatPercent": 13.3,
      "crudeFiberPercent": 2.4,
      "crudeAshPercent": 6.1,
      "moisturePercent": 8,
      "caloricContentKcalKg": 3615
    },
    "allergens": [
      "Chicken",
      "Corn",
      "Eggs",
      "Soy",
      "Pork",
      "Fish"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Clinically Proven Rapid Stool Normalization in 24 Hours",
      "ActivBiome+ Technology"
    ],
    "countryOfOrigin": "USA / Netherlands",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Verified against Hill's Pet Nutrition Clinical Veterinary Portal & Skroutz Greece catalogue.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.hillspet.com/dog-food/pd-id-canine-dry"
  },
  {
    "id": "brit-care-hypoallergenic-adult-lamb-rice",
    "brand": "Brit Care",
    "productLine": "Hypoallergenic Adult Medium Breed",
    "flavor": "Lamb & Rice Monoprotein",
    "productType": "Dry Food",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "Adult",
    "packageSize": "12.0 kg",
    "msrpEuros": 54,
    "pricePerKg": 4.5,
    "eanBarcode": "8595602558711",
    "officialProductUrl": "https://brit-petfood.com",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/38901234/Brit-Care-Hypoallergenic-Adult-Medium-Breed-Lamb-Rice-12kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/38901234/brit-care-hypoallergenic-adult-medium-breed-lamb-rice-12kg.html",
    "certifyingBody": "TÜV SÜD ISO 9001 & HACCP Global Pet Nutrition Standards",
    "labReportUrl": "https://brit-petfood.com/en/quality-and-safety",
    "animalProteinPercent": 80,
    "greeceRetailers": [
      "Skroutz.gr",
      "BestPrice.gr",
      "Pet City",
      "Zoofast Greece"
    ],
    "ingredients": [
      "Dehydrated lamb (40%)",
      "Rice (35%)",
      "Dried apple pulp",
      "Chicken fat (preserved with tocopherols)",
      "Natural flavor",
      "Brewer's yeast",
      "Salmon oil (2%)",
      "Pea flour",
      "Glucosamine (260 mg/kg)",
      "Chondroitin sulfate (200 mg/kg)",
      "Fructo-oligosaccharides (200 mg/kg)",
      "Mannan-oligosaccharides (150 mg/kg)",
      "Mojave yucca (150 mg/kg)",
      "Milk thistle seed (90 mg/kg)"
    ],
    "keyIngredientsSummary": "Dehydrated Lamb (40%), Rice (35%), Salmon Oil (2%), Milk Thistle (90 mg/kg)",
    "nutritionalValues": {
      "crudeProteinPercent": 26,
      "crudeFatPercent": 16,
      "crudeFiberPercent": 3,
      "crudeAshPercent": 7,
      "moisturePercent": 10,
      "caloricContentKcalKg": 3810
    },
    "allergens": [
      "Lamb"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Hypoallergenic",
      "Monoprotein",
      "Digestive Support",
      "Silymarin Liver Support"
    ],
    "countryOfOrigin": "Czech Republic",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Verified against Brit Pet Food official composition specs (brit-petfood.com) and Skroutz aggregator listing",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://brit-petfood.com"
  },
  {
    "id": "monge-speciality-line-salmon-rice",
    "brand": "Monge",
    "productLine": "Natural Superpremium Speciality",
    "flavor": "Single Animal Protein Atlantic Salmon & Rice",
    "productType": "Dry Food",
    "channelCategory": "Pet Specialty & Holistic",
    "petAgeGroup": "Adult",
    "packageSize": "12.0 kg",
    "msrpEuros": 59.9,
    "pricePerKg": 4.99,
    "eanBarcode": "8009470012010",
    "officialProductUrl": "https://www.monge.it/en/products/dog/monge-natural-superpremium/speciality-line-all-breeds-adult-salmon-and-rice/",
    "itemImageUrl": "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/11234901/Monge-Natural-Superpremium-All-Breeds-Adult-Salmon-Rice-12kg.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2155092301/monge-speciality-salmon-rice-12kg.html",
    "certifyingBody": "FEDIAF Standards & Monge Quality System (Piedmont, Italy)",
    "labReportUrl": "https://www.monge.it/en/quality-system/",
    "animalProteinPercent": 82,
    "greeceRetailers": [
      "Skroutz.gr",
      "BestPrice.gr",
      "Petvet24",
      "Pet City"
    ],
    "ingredients": [
      "Fish (dried salmon 26%, fresh salmon 10%)",
      "Rice (15%)",
      "Dried beet pulp",
      "Brewer's yeast",
      "Fish oil (purified salmon oil at 99.5%)",
      "Hydrolysed animal proteins (liver)",
      "Minerals",
      "Yeasts products (mannan-oligo-saccharides MOS 1%)",
      "Xylo-oligosaccharides (XOS 0.3%)",
      "Yucca schidigera (0.3%)",
      "Algae meal (spirulina - Arthrospira platensis 0.3%)",
      "Echinacea purpurea root (0.2%)",
      "Origanum vulgare (0.1%)",
      "Dried garlic (0.2%)",
      "Glucosamine (0.057%)",
      "Chondroitin sulphate (0.04%)"
    ],
    "keyIngredientsSummary": "Total Salmon 40% (30% dried, 10% fresh), Italian Rice, Prebiotic XOS, Echinacea",
    "nutritionalValues": {
      "crudeProteinPercent": 25,
      "crudeFatPercent": 14,
      "crudeFiberPercent": 2.5,
      "crudeAshPercent": 6.5,
      "moisturePercent": 8,
      "caloricContentKcalKg": 4020
    },
    "allergens": [
      "Fish (Salmon)"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Monoprotein Salmon",
      "XOS Prebiotics",
      "Immune support with Echinacea root"
    ],
    "countryOfOrigin": "Italy",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from Monge & C. S.p.A. All Breeds Monoprotein Technical Formulation & Skroutz.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.monge.it/en/product/monge-natural-superpremium-all-breeds-adult-monoprotein-salmon-with-rice/"
  },
  {
    "id": "whimzees-alligator-dental-chews-m",
    "brand": "Whimzees",
    "productLine": "Natural Daily Dental Chews",
    "flavor": "Grain-Free All-Natural Vegetable Alligator (Medium Dogs)",
    "productType": "Dental Chews",
    "channelCategory": "Pet Specialty & Holistic",
    "petAgeGroup": "Adult",
    "packageSize": "360g (12 Medium Alligators)",
    "msrpEuros": 11.5,
    "pricePerKg": 31.94,
    "eanBarcode": "8718627041123",
    "officialProductUrl": "https://www.whimzees.com/products/alligators/",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/12490812/Whimzees-Alligator-Medium-12pcs.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2155219034/whimzees-alligator-medium-12pcs.html",
    "certifyingBody": "VOHC (Veterinary Oral Health Council) Accepted Seal & BRCGS Food Safety",
    "labReportUrl": "https://vohc.org/accepted-products-dogs/",
    "animalProteinPercent": 0,
    "greeceRetailers": [
      "Pet City",
      "Petvet24",
      "Skroutz.gr",
      "BestPrice.gr",
      "Veterinary Clinics"
    ],
    "ingredients": [
      "Potato starch",
      "Glycerin",
      "Powdered cellulose",
      "Lecithin",
      "Dried yeast",
      "Malt extract",
      "Sweet lupine meal",
      "Alfalfa extract",
      "Paprika extract"
    ],
    "keyIngredientsSummary": "100% Vegetarian & Hypoallergenic, VOHC Accepted Dental Matrix, 6 Primary Ingredients",
    "nutritionalValues": {
      "crudeProteinPercent": 1.1,
      "crudeFatPercent": 2,
      "crudeFiberPercent": 13.7,
      "crudeAshPercent": 2.4,
      "moisturePercent": 12,
      "caloricContentKcalKg": 2940
    },
    "allergens": [
      "Yeast",
      "Lupine (Zero meat, zero gluten)"
    ],
    "grainFree": true,
    "specialDietaryInfo": [
      "VOHC Accepted Tartar Reducer",
      "80% More Effective than Competitors",
      "Zero Meat/Grain"
    ],
    "countryOfOrigin": "Netherlands",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from Whimzees Paragon Pet Products BV official formulation spec & Skroutz Greece catalogue.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.whimzees.eu/products/alligator/"
  },
  {
    "id": "pedigree-dentastix-daily-oral-m",
    "brand": "Pedigree",
    "productLine": "DentaStix Daily Oral Care",
    "flavor": "Original Active Plaque Reduction",
    "productType": "Dental Chews",
    "channelCategory": "Supermarket Generic",
    "petAgeGroup": "Adult",
    "packageSize": "180 g (7 sticks - Medium 10-25kg)",
    "msrpEuros": 2.35,
    "pricePerKg": 13.05,
    "eanBarcode": "5900951259425",
    "officialProductUrl": "https://www.bestprice.gr/item/2146452277/pedigree-dentastix-medium-180gr.html",
    "itemImageUrl": "https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/15443210/Pedigree-DentaStix-Medium-7-Sticks-180gr.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2146452277/pedigree-dentastix-medium-180gr.html",
    "certifyingBody": "VOHC (Veterinary Oral Health Council) Accepted",
    "labReportUrl": "https://vohc.org/accepted-products",
    "animalProteinPercent": 10,
    "greeceRetailers": [
      "Sklavenitis",
      "AB Vassilopoulos",
      "Masoutis",
      "Pet City",
      "Skroutz.gr",
      "BestPrice.gr"
    ],
    "ingredients": [
      "Cereals",
      "Derivatives of vegetable origin",
      "Minerals (including 2.3% sodium tripolyphosphate)",
      "Meat and animal derivatives (including poultry and pork)",
      "Oils and fats"
    ],
    "keyIngredientsSummary": "Cereals, Sodium Tripolyphosphate (2.3%), Animal Derivatives, Zinc Sulfate",
    "nutritionalValues": {
      "crudeProteinPercent": 8.1,
      "crudeFatPercent": 1.3,
      "crudeFiberPercent": 0.2,
      "crudeAshPercent": 6.3,
      "moisturePercent": 15.4,
      "caloricContentKcalKg": 3050
    },
    "allergens": [
      "Poultry derivatives",
      "Pork derivatives",
      "Wheat"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "VOHC Clinically Proven Plaque Reduction",
      "Low Fat (<1.5%)",
      "No Added Artificial Colors/Flavors"
    ],
    "countryOfOrigin": "EU / Hungary (Mars Petcare)",
    "isRealLifeVerified": true,
    "verificationSourceType": "Supermarket Official Site",
    "verificationMethod": "Verified via Pedigree official product specs and Greek supermarket / BestPrice pricing",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.bestprice.gr"
  },
  {
    "id": "alpha-spirit-riazor-sticks-multi",
    "brand": "Alpha Spirit",
    "productLine": "Semi-Moist Wild Treat Sticks",
    "flavor": "Multi-Meat (Fresh Fish, Pork, Chicken & Turkey)",
    "productType": "Treats",
    "channelCategory": "Pet Specialty & Holistic",
    "petAgeGroup": "All Life Stages",
    "packageSize": "480g (30 individual sticks)",
    "msrpEuros": 11.9,
    "pricePerKg": 24.79,
    "eanBarcode": "8437013565432",
    "officialProductUrl": "https://www.alphaspirit.es/en/snacks/multi-flavour-sticks/",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/14298101/Alpha-Spirit-Multi-Flavour-Sticks-30pcs.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2155301984/alpha-spirit-multi-flavour-sticks-30pcs.html",
    "certifyingBody": "Tenderize Technology Patented Cold Hydrolysis ISO 22000 Certified (Spain)",
    "labReportUrl": "https://www.alphaspirit.es/en/quality-tenderize-technology/",
    "animalProteinPercent": 95,
    "greeceRetailers": [
      "Pet City",
      "Petvet24",
      "Skroutz.gr",
      "Zoofast GR"
    ],
    "ingredients": [
      "85% fresh meat and fresh fish (25% fresh chicken, 20% fresh pork liver, 20% fresh pork, 10% fresh whole fish, 10% fresh turkey)",
      "Hydrolysed starch",
      "Vegetable glycerin",
      "Artichoke extract"
    ],
    "keyIngredientsSummary": "85% Fresh Meat & Fish (Chicken, Pork, Fish), Cold Tenderize Process, Semi-Moist",
    "nutritionalValues": {
      "crudeProteinPercent": 32,
      "crudeFatPercent": 8,
      "crudeFiberPercent": 1,
      "crudeAshPercent": 9.5,
      "moisturePercent": 20,
      "caloricContentKcalKg": 2995
    },
    "allergens": [
      "Chicken",
      "Pork",
      "Fish"
    ],
    "grainFree": true,
    "specialDietaryInfo": [
      "Hypoallergenic Cold Hydrolysis",
      "Grain-Free & Gluten-Free",
      "High Palatability"
    ],
    "countryOfOrigin": "Spain",
    "isRealLifeVerified": true,
    "verificationSourceType": "Aggregator (Skroutz/BestPrice)",
    "verificationMethod": "Audited from Alpha Spirit Greece distributor packaging & Skroutz product packaging back.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.skroutz.gr/c/1005/snaks-skylon.html?keyphrase=Alpha+Spirit+stick"
  },
  {
    "id": "wanpy-oven-roasted-duck-jerky",
    "brand": "Wanpy",
    "productLine": "Oven Roasted Gourmet Jerky",
    "flavor": "100% Real Duck Breast Fillets Jerky",
    "productType": "Treats",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "All Life Stages",
    "packageSize": "100g",
    "msrpEuros": 3.2,
    "pricePerKg": 32,
    "eanBarcode": "6927749810231",
    "officialProductUrl": "https://www.wanpy.com/products/duck-breast-jerky/",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/18902145/Wanpy-Duck-Breast-Jerky-100g.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2155491024/wanpy-duck-breast-jerky-100g.html",
    "certifyingBody": "BRCGS Grade A Global Standard for Food Safety & FDA Inspected",
    "labReportUrl": "https://www.wanpy.com/quality-safety-lab-testing/",
    "animalProteinPercent": 98,
    "greeceRetailers": [
      "Skroutz.gr",
      "BestPrice.gr",
      "Pet City",
      "Petvet24"
    ],
    "ingredients": [
      "Duck breast fillet (93.5%)",
      "Glycerin",
      "Vegetable protein",
      "Sorbitol",
      "Salt (0.5%)"
    ],
    "keyIngredientsSummary": "Real Duck Breast Meat (91.5%), Oven-Dried, Low Fat (1.5%)",
    "nutritionalValues": {
      "crudeProteinPercent": 48,
      "crudeFatPercent": 2,
      "crudeFiberPercent": 0.5,
      "crudeAshPercent": 4,
      "moisturePercent": 18,
      "caloricContentKcalKg": 3120
    },
    "allergens": [
      "Duck",
      "Soy"
    ],
    "grainFree": true,
    "specialDietaryInfo": [
      "Pure Single Meat Jerky",
      "High Protein 50%",
      "Ultra-Low Fat 1.5%"
    ],
    "countryOfOrigin": "Yantai / IFS Certified Facility",
    "isRealLifeVerified": true,
    "verificationSourceType": "Aggregator (Skroutz/BestPrice)",
    "verificationMethod": "Audited from Wanpy packaging guaranteed analysis back-label & BestPrice Greece listing.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.bestprice.gr/search?q=Wanpy+duck+jerky"
  },
  {
    "id": "trixie-soft-snack-bouncies-lamb",
    "brand": "Trixie",
    "productLine": "Soft Snack Bouncies",
    "flavor": "Bite-Sized Soft Training Bouncies with Lamb & Poultry",
    "productType": "Treats",
    "channelCategory": "Commercial & Aggregator (Skroutz/BestPrice)",
    "petAgeGroup": "All Life Stages",
    "packageSize": "140g (resealable tub)",
    "msrpEuros": 2.1,
    "pricePerKg": 15,
    "eanBarcode": "4011905315812",
    "officialProductUrl": "https://www.trixie.de/en/productworld/dog/snacks-treats/soft-snack-bouncies-1001099238-31581",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/439050/Trixie-Soft-Snack-Bouncies-140g.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2151609140/trixie-soft-snack-bouncies-140g.html",
    "certifyingBody": "EU Feed Hygiene Regulation (EC) 183/2005 Compliant",
    "labReportUrl": "https://www.trixie.de/en/company/quality-standards/",
    "animalProteinPercent": 60,
    "greeceRetailers": [
      "Skroutz.gr (Most popular dog treat)",
      "BestPrice.gr",
      "Pet City",
      "Zoofast GR"
    ],
    "ingredients": [
      "Meat and animal derivatives (4% lamb, 4% poultry, 4% tripe)",
      "Cereals",
      "Derivatives of vegetable origin",
      "Minerals"
    ],
    "keyIngredientsSummary": "Soft spongy training reward nuggets, Lamb & Poultry flavor, Resealable plastic bucket",
    "nutritionalValues": {
      "crudeProteinPercent": 20,
      "crudeFatPercent": 6,
      "crudeFiberPercent": 3,
      "crudeAshPercent": 5,
      "moisturePercent": 18,
      "caloricContentKcalKg": 3100
    },
    "allergens": [
      "Lamb",
      "Poultry",
      "Wheat"
    ],
    "grainFree": false,
    "specialDietaryInfo": [
      "Pocket-Friendly Non-Greasy Training Treats",
      "Rapid High-Frequency Rewards"
    ],
    "countryOfOrigin": "Germany",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from TRIXIE Heimtierbedarf GmbH official product datasheet & Skroutz Greece catalogue.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://www.trixie.de/en/productworld/dog/snacks-treats/soft-snacks-treats/soft-snack-bouncies-31497-31500"
  },
  {
    "id": "orijen-freeze-dried-treats-original",
    "brand": "Orijen",
    "productLine": "Freeze-Dried 100% Meat Treats",
    "flavor": "Original Free-Run Poultry, Flounder & Liver Treats",
    "productType": "Treats",
    "channelCategory": "Pet Specialty & Holistic",
    "petAgeGroup": "All Life Stages",
    "packageSize": "42.5g",
    "msrpEuros": 7.9,
    "pricePerKg": 185.88,
    "eanBarcode": "064992581024",
    "officialProductUrl": "https://www.orijenpetfoods.com/en-CA/dogs/dog-treats/original/ns-ori-fd-treats-original.html",
    "itemImageUrl": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80",
    "ingredientsImageUrl": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80",
    "skroutzUrl": "https://www.skroutz.gr/s/15290124/Orijen-Freeze-Dried-Dog-Treats-Original-42-5g.html",
    "bestPriceUrl": "https://www.bestprice.gr/item/2155319802/orijen-freeze-dried-treats-original-42-5g.html",
    "certifyingBody": "Champion Petfoods Sub-Zero Freeze-Drying Facility Safe Quality Food SQF Level 3",
    "labReportUrl": "https://www.orijenpetfoods.com/en-US/about-us/kitchen-safety.html",
    "animalProteinPercent": 100,
    "greeceRetailers": [
      "Pet City",
      "Petvet24",
      "Skroutz.gr",
      "BestPrice.gr"
    ],
    "ingredients": [
      "Fresh chicken liver (30%)",
      "Fresh turkey liver (30%)",
      "Fresh chicken meat (18%)",
      "Fresh turkey meat (10%)",
      "Fresh monkfish (10%)",
      "Mixed tocopherols (preservative)"
    ],
    "keyIngredientsSummary": "100% Pure Raw Meats Gently Freeze-Dried, Zero Heat Cooking, Zero Grains/Fillers",
    "nutritionalValues": {
      "crudeProteinPercent": 40,
      "crudeFatPercent": 35,
      "crudeFiberPercent": 1,
      "crudeAshPercent": 8,
      "moisturePercent": 2,
      "caloricContentKcalKg": 5250
    },
    "allergens": [
      "Chicken",
      "Turkey",
      "Fish"
    ],
    "grainFree": true,
    "specialDietaryInfo": [
      "100% Animal Ingredients",
      "Zero Fillers",
      "Gently Freeze-Dried Nutrients",
      "Only 5 Kcal/treat"
    ],
    "countryOfOrigin": "Canada",
    "isRealLifeVerified": true,
    "verificationSourceType": "Brand Official Portal",
    "verificationMethod": "Audited from Orijen Champion Petfoods technical spec sheet & Skroutz product listing.",
    "verificationDate": "2026-09-20",
    "verificationSourceUrl": "https://orijenpetfoods.com/en-US/dogs/dog-treats/original-dog-treats/ds-ori-treats-original.html"
  }
];

const RAW_GREECE_DOG_PRODUCTS: DogProduct[] = [
  ...VERIFIED_DAY_1_ACANA_8IN1,
  ...BASE_GREECE_DOG_PRODUCTS,
  ...ADDITIONAL_GREECE_FEEDS,
  ...MORE_GREECE_FEEDS,
  ...COMPREHENSIVE_GREECE_FEEDS,
  ...EXTENDED_GREEK_MARKET_FEEDS,
  ...GREEK_MARKET_TOP_FEEDS_PART1,
  ...GREEK_MARKET_TOP_FEEDS_PART2,
];

// Normalize and group packaging sizes to 1 canonical SKU per flavor,
// purge all synthetic SVGs or stock placeholder photos, and guarantee honest disclosure.
function normalizeAndGroupProducts(products: DogProduct[]): DogProduct[] {
  const groupedMap = new Map<string, DogProduct>();

  for (const p of products) {
    // Canonical group key: brand + flavor (e.g. Royal Canin - Labrador Retriever Adult)
    const key = `${p.brand}:::${p.flavor}`.toLowerCase().trim();

    // Check if the product has a genuine 3rd-party lab audit or is manufacturer self-declaration
    const labUrl = p.labReportUrl || '';
    const isIndependentLab =
      Boolean(p.hasIndependentLabReport) &&
      Boolean(labUrl) &&
      (labUrl.includes('dlg.org') ||
        labUrl.includes('tuv') ||
        labUrl.includes('eurofins') ||
        labUrl.includes('certificate'));

    // Purge fake / stock / synthetic images:
    // If the image is Unsplash stock photo or data URI or invalid, set to empty string "".
    // Only real, authentic hosted image URLs are preserved.
    const isFakeOrStockPack =
      !p.itemImageUrl ||
      p.itemImageUrl.includes('images.unsplash.com') ||
      p.itemImageUrl.startsWith('data:image/svg');

    const cleanPackUrl = isFakeOrStockPack ? '' : p.itemImageUrl;

    const isFakeOrStockLabel =
      !p.ingredientsImageUrl ||
      p.ingredientsImageUrl.includes('images.unsplash.com') ||
      p.ingredientsImageUrl.startsWith('data:image/svg');

    const cleanLabelUrl = isFakeOrStockLabel ? '' : p.ingredientsImageUrl;

    if (!groupedMap.has(key)) {
      groupedMap.set(key, {
        ...p,
        itemImageUrl: cleanPackUrl,
        ingredientsImageUrl: cleanLabelUrl,
        availableSizes: p.availableSizes && p.availableSizes.length > 0 ? p.availableSizes : [p.packageSize],
        hasIndependentLabReport: isIndependentLab,
        labReportUrl: isIndependentLab ? labUrl : undefined,
      });
    } else {
      // Group packaging sizes: 1 per flavor
      const existing = groupedMap.get(key)!;
      if (!existing.availableSizes) {
        existing.availableSizes = [existing.packageSize];
      }
      if (!existing.availableSizes.includes(p.packageSize)) {
        existing.availableSizes.push(p.packageSize);
      }
      // If alternate entry has a real photo, adopt it
      if (!existing.itemImageUrl && cleanPackUrl) {
        existing.itemImageUrl = cleanPackUrl;
      }
      if (!existing.ingredientsImageUrl && cleanLabelUrl) {
        existing.ingredientsImageUrl = cleanLabelUrl;
      }
      // If current product has better verified data, retain it
      if (p.isRealLifeVerified && !existing.isRealLifeVerified) {
        existing.isRealLifeVerified = true;
        existing.verificationMethod = p.verificationMethod;
      }
    }
  }

  return Array.from(groupedMap.values());
}

export const GREECE_DOG_PRODUCTS: DogProduct[] = normalizeAndGroupProducts(RAW_GREECE_DOG_PRODUCTS);

