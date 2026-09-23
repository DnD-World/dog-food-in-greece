import fs from 'fs';
import { RawItemSpec, buildDogProduct } from './feedBuilderHelper';

// Collection of 155 top SKUs for Part 1:
// - Royal Canin (34 items)
// - Hill's Science Plan & Prescription Diet (28 items)
// - Farmina N&D & Cibau (24 items)
// - Acana (18 items)
// - Orijen (10 items)
// - Taste of the Wild (12 items)
// - Brit Care & Brit Premium (18 items)
// - Monge Natural & BWild (11 items)
// Total = 155 items
const specs: RawItemSpec[] = [];

// 1. Royal Canin Breed & Health
const rcBreeds = [
  { b: 'Labrador Retriever Adult', sz: '12kg', p: 79.9, cr: 30, fat: 13, fib: 3.9, cal: 3650, ap: 78, k: 'Calibrated calorie balance, EPA/DHA, borage oil for water-resistant coat', spec: ['Waterproof Coat Support', 'Controlled Energy', 'Joint Glucosamine'] },
  { b: 'German Shepherd Adult', sz: '11kg', p: 77.5, cr: 24, fat: 19, fib: 4.0, cal: 3930, ap: 75, k: 'Targeted digestive performance with LIP proteins, copra oil and glucosamine', spec: ['Sensitive Digestion', 'Strong Skeleton', 'GSD Tailored Kibble'] },
  { b: 'French Bulldog Adult', sz: '9kg', p: 68.9, cr: 26, fat: 18, fib: 1.3, cal: 3910, ap: 76, k: 'Wave kibble easy to pick up, optimal protein and L-carnitine for muscle mass', spec: ['Brachycephalic Jaw Wave Kibble', 'Odor Reduction', 'Muscle Tone'] },
  { b: 'Golden Retriever Adult', sz: '12kg', p: 79.9, cr: 25, fat: 13, fib: 3.8, cal: 3620, ap: 75, k: 'Taurine and EPA/DHA for cardiac function, borage oil and biotin for coat', spec: ['Cardiac Tone', 'Skin Barrier Defense', 'Weight Control'] },
  { b: 'Chihuahua Adult', sz: '3kg', p: 29.9, cr: 28, fat: 16, fib: 2.1, cal: 3930, ap: 80, k: 'Miniature adapted kibble with calcium chelators to reduce tartar formation', spec: ['Stool Odor Reduction', 'Mini Jaws Chelation', 'High Palatability'] },
  { b: 'Yorkshire Terrier Adult', sz: '7.5kg', p: 62.0, cr: 28, fat: 18, fib: 3.1, cal: 3950, ap: 78, k: 'Biotin, borage oil and Omega-3 fatty acids for long glossy coats', spec: ['Long Coat Nutrition', 'Picky Eater Palatability', 'Healthy Ageing'] },
  { b: 'Pug Adult', sz: '7.5kg', p: 62.0, cr: 25, fat: 16, fib: 2.0, cal: 3880, ap: 75, k: 'Custom cloverleaf kibble, skin fold barrier nourishment and muscle tone', spec: ['Brachycephalic Adaptation', 'Skin Fold Care', 'Lean Weight'] },
  { b: 'Rottweiler Adult', sz: '12kg', p: 79.9, cr: 26, fat: 20, fib: 2.6, cal: 4080, ap: 78, k: 'Cardiac function, athletic muscle mass and joint cartilage protection', spec: ['Myocardial Support', 'High Energy', 'Bone Robustness'] },
  { b: 'Boxer Adult', sz: '12kg', p: 79.9, cr: 26, fat: 20, fib: 2.5, cal: 4070, ap: 78, k: 'Brachycephalic wave kibble, cellular defense and cardiac endurance', spec: ['Cardiac Health', 'Wave Kibble', 'L-Carnitine Fitness'] },
  { b: 'Cocker Spaniel Adult', sz: '12kg', p: 78.0, cr: 25, fat: 14, fib: 1.4, cal: 3760, ap: 75, k: 'Skin barrier complex, borage oil and calibrated calories for prone spaniels', spec: ['Ear & Skin Complex', 'Weight Moderation', 'Cardio Vitality'] },
  { b: 'Shih Tzu Adult', sz: '7.5kg', p: 63.0, cr: 24, fat: 20, fib: 3.0, cal: 4020, ap: 76, k: 'Specially shaped kibble for short muzzles, reduces fecal odor', spec: ['Dental Tartar Cleanse', 'Stool Odor Reduction', 'Long Hair Sheen'] },
  { b: 'Beagle Adult', sz: '12kg', p: 77.0, cr: 27, fat: 12, fib: 3.7, cal: 3560, ap: 74, k: 'Exclusive kibble shape to slow down ingestion and promote satiety in hungry hounds', spec: ['Satiety Fiber Blend', 'Slow Feeding Kibble', 'Joint Bone Care'] }
];
rcBreeds.forEach(b => {
  specs.push({
    brand: 'Royal Canin', line: 'Breed Health Nutrition', flavor: b.b, type: 'Dry Food', category: 'Pet Specialty & Holistic', age: 'Adult', size: b.sz, msrp: b.p, origin: 'France', cert: 'Royal Canin ISO 9001/22000 Certified', animalProtein: b.ap, summary: b.k,
    ingredients: ['Dehydrated poultry protein', 'Rice', 'Maize', 'Animal fats', 'Vegetable protein isolate LIP', 'Hydrolysed animal proteins', 'Beet pulp', 'Fish oil', 'Minerals', 'Borage oil', 'Marigold extract'],
    protein: b.cr, fat: b.fat, fiber: b.fib, ash: 6.8, moisture: 9.5, kcal: b.cal, allergens: ['Poultry', 'Rice', 'Maize'], grainFree: false, special: b.spec, officialUrl: 'https://www.royalcanin.com/gr/dogs/products/breed-health-nutrition'
  });
});

const rcSizeCare = [
  { f: 'Mini Puppy Growth', sz: '8kg', p: 54.9, cr: 31, fat: 20, fib: 1.4, cal: 4070, ap: 82, ag: 'Puppy' as const, k: 'Intense energy growth kibble for small breed puppies up to 10 months', spec: ['Immune Support', 'Digestive Health', 'High Energy'] },
  { f: 'Mini Adult 8+ Senior', sz: '8kg', p: 56.9, cr: 27, fat: 16, fib: 1.5, cal: 3900, ap: 75, ag: 'Senior' as const, k: 'Vitality support complex with synergistic antioxidant cocktail for mature small dogs', spec: ['Senior Vitality', 'Tartar Control'] },
  { f: 'Medium Puppy Growth', sz: '15kg', p: 76.9, cr: 32, fat: 20, fib: 1.7, cal: 4100, ap: 80, ag: 'Puppy' as const, k: 'Supports natural defenses and balanced intestinal flora during moderate puppy growth', spec: ['Digestive Security', 'Optimal Mineral Balance'] },
  { f: 'Medium Adult 7+ Senior', sz: '15kg', p: 76.9, cr: 25, fat: 14, fib: 1.6, cal: 3780, ap: 72, ag: 'Senior' as const, k: 'Adapted nutrient content to help maintain vitality in aging medium breed dogs', spec: ['Ageing Support', 'Coat Condition'] },
  { f: 'Maxi Puppy Growth', sz: '15kg', p: 78.5, cr: 30, fat: 16, fib: 2.6, cal: 3820, ap: 78, ag: 'Puppy' as const, k: 'Moderate energy level to prevent rapid weight gain during long puppy growth phase', spec: ['Joint Consolidation', 'Natural Defenses'] },
  { f: 'Maxi Adult 5+ Mature', sz: '15kg', p: 75.9, cr: 26, fat: 17, fib: 2.5, cal: 3900, ap: 74, ag: 'Senior' as const, k: 'Bone and joint support for large mature dogs with adapted fiber balance', spec: ['Joint Cartilage Care', 'Transit Regularity'] },
  { f: 'Giant Adult Giant Breeds', sz: '15kg', p: 79.9, cr: 28, fat: 20, fib: 1.8, cal: 4120, ap: 78, ag: 'Adult' as const, k: 'Extra large patented kibble that encourages chewing and slows ingestion in dogs >45kg', spec: ['Giant Kibble Chew', 'Cardiac Endurance'] },
  { f: 'Mini Digestive Care', sz: '8kg', p: 57.9, cr: 30, fat: 22, fib: 1.8, cal: 4200, ap: 80, ag: 'Adult' as const, k: 'Precisely balanced formula with prebiotics and digestible LIP proteins for firm stool', spec: ['Stool Quality Optimization', 'Prebiotic Soluble Fibers'] },
  { f: 'Medium Dermacomfort', sz: '10kg', p: 68.0, cr: 24, fat: 17, fib: 1.4, cal: 3980, ap: 75, ag: 'Adult' as const, k: 'Reduced allergen formula for dogs prone to skin irritation, itching and scratching', spec: ['Anti-Scratch Formula', 'Omega-6 & 3 Enriched'] },
  { f: 'Maxi Joint Care', sz: '10kg', p: 72.0, cr: 26, fat: 15, fib: 6.3, cal: 3660, ap: 72, ag: 'Adult' as const, k: 'Collagen hydrolysate and targeted EPA/DHA to support cartilage flexibility in large dogs', spec: ['Eased Mobility', 'Collagen Peptides'] },
  { f: 'Mini Light Weight Care', sz: '8kg', p: 56.5, cr: 30, fat: 11, fib: 6.6, cal: 3370, ap: 74, ag: 'Adult' as const, k: 'High protein, low fat formula with soluble fibers to maintain satiety and muscle', spec: ['Weight Limiting', 'Satiety Induction'] },
  { f: 'Medium Relax Care', sz: '10kg', p: 71.0, cr: 25, fat: 14, fib: 1.8, cal: 3780, ap: 74, ag: 'Adult' as const, k: 'Calming active hydrolysed milk protein peptide for dogs experiencing environmental changes', spec: ['Calming Peptide Complex', 'Stress Relief'] }
];
rcSizeCare.forEach(s => {
  specs.push({
    brand: 'Royal Canin', line: 'Size & Care Nutrition', flavor: s.f, type: 'Dry Food', category: 'Pet Specialty & Holistic', age: s.ag, size: s.sz, msrp: s.p, origin: 'France', cert: 'Royal Canin Global Quality Audited', animalProtein: s.ap, summary: s.k,
    ingredients: ['Dehydrated poultry protein', 'Rice', 'Wheat', 'Animal fats', 'Maize gluten', 'Hydrolysed animal proteins', 'Beet pulp', 'Fish oil', 'Minerals', 'Psyllium husks', 'Yeast extracts'],
    protein: s.cr, fat: s.fat, fiber: s.fib, ash: 6.5, moisture: 9.5, kcal: s.cal, allergens: ['Poultry', 'Rice', 'Wheat'], grainFree: false, special: s.spec, officialUrl: 'https://www.royalcanin.com/gr/dogs/products'
  });
});

const rcVet = [
  { f: 'Urinary S/O Small Dog', sz: '4kg', p: 42.0, cr: 20, fat: 17, fib: 2.2, cal: 3920, ap: 68, tp: 'Dry Food' as const, k: 'Dissolution of struvite uroliths, RSS urine acidification and tartar prevention', spec: ['Struvite Dissolution', 'Low RSS Index'] },
  { f: 'Urinary S/O Moderate Calorie', sz: '12kg', p: 88.0, cr: 20, fat: 11, fib: 6.5, cal: 3480, ap: 65, tp: 'Dry Food' as const, k: 'Prevention of struvite and oxalate stones with controlled caloric density', spec: ['Struvite & Oxalate Management', 'Caloric Control'] },
  { f: 'Hepatic Veterinary Diet', sz: '12kg', p: 89.9, cr: 16, fat: 16, fib: 1.9, cal: 3890, ap: 60, tp: 'Dry Food' as const, k: 'Low copper content, highly digestible vegetable proteins for chronic liver disease', spec: ['Copper Restriction', 'Vegetable Protein Isolate'] },
  { f: 'Cardiac Veterinary Diet', sz: '14kg', p: 94.0, cr: 26, fat: 20, fib: 1.6, cal: 4140, ap: 75, tp: 'Dry Food' as const, k: 'Vascular support with polyphenols, restricted sodium to relieve heart workload', spec: ['Early Cardiac Support', 'Restricted Sodium'] },
  { f: 'Diabetic Special Veterinary Diet', sz: '12kg', p: 86.0, cr: 37, fat: 12, fib: 6.5, cal: 3420, ap: 72, tp: 'Dry Food' as const, k: 'Gluco-modulation with low glycemic index cereals to control postprandial glucose', spec: ['Gluco-Modulation', 'High Protein Satiety'] },
  { f: 'Sensitivity Control Duck & Rice', sz: '12kg', p: 89.5, cr: 21, fat: 14, fib: 2.5, cal: 3800, ap: 74, tp: 'Dry Food' as const, k: 'Selected single novel protein (duck) and single carbohydrate (rice) for intolerances', spec: ['Selected Protein Duck', 'Skin Barrier Complex'] },
  { f: 'Gastrointestinal Low Fat Wet Can', sz: '420g', p: 4.8, cr: 7.5, fat: 1.7, fib: 1.5, cal: 950, ap: 80, tp: 'Wet Food' as const, k: 'Severe hyperlipidemia and acute pancreatitis wet medical management', spec: ['Low Fat 1.7%', 'Digestive Care Wet'] },
  { f: 'Recovery Liquid / Mousse Can', sz: '195g', p: 3.9, cr: 12.5, fat: 6.5, fib: 2.0, cal: 1160, ap: 90, tp: 'Wet Food' as const, k: 'High energy density for critical care convalescence, anorexia and syringe feeding', spec: ['Critical Care Nutrition', 'Syringe Feedable Mousse'] },
  { f: 'Hypoallergenic Wet Can', sz: '400g', p: 4.9, cr: 6.0, fat: 3.5, fib: 2.0, cal: 960, ap: 75, tp: 'Wet Food' as const, k: 'Hydrolysed soy protein isolate wet diet for severe cutaneous food allergies', spec: ['Hydrolysed Soy Isolate', 'Skin Hydration Barrier'] },
  { f: 'Renal Wet Can Loaf', sz: '410g', p: 4.7, cr: 6.0, fat: 8.0, fib: 1.2, cal: 1220, ap: 70, tp: 'Wet Food' as const, k: 'Low phosphorus and moderate high-quality protein for chronic kidney disease', spec: ['Kidney Phosphorus Control', 'Aromatic Profile'] }
];
rcVet.forEach(v => {
  specs.push({
    brand: 'Royal Canin', line: 'Veterinary Diet', flavor: v.f, type: v.tp, category: 'Veterinary Clinical', age: 'Adult', size: v.sz, msrp: v.p, origin: 'France', cert: 'Royal Canin Clinical Nutrition Verified', animalProtein: v.ap, summary: v.k,
    ingredients: ['Veterinary purified animal and hydrolyzed vegetable extracts', 'Rice / Tapioca', 'Dehydrated novel protein', 'Purified poultry fat', 'Fish oil', 'Prebiotic FOS', 'Essential trace elements'],
    protein: v.cr, fat: v.fat, fiber: v.fib, ash: 5.5, moisture: v.tp === 'Wet Food' ? 75.0 : 9.0, kcal: v.cal, allergens: ['Poultry / Duck / Pork / Soy'], grainFree: false, special: v.spec, officialUrl: 'https://www.royalcanin.com/gr/dogs/products/vet-diets'
  });
});

// 2. Hill's Science Plan & Prescription Diet (28 items)
const hillsList = [
  { b: "Hill's Science Plan", l: 'Adult', f: 'Small & Mini Chicken Adult', sz: '6kg', p: 44.5, cr: 22.5, fat: 14.4, fib: 1.6, cal: 3730, ap: 75, cat: 'Pet Specialty & Holistic' as const, tp: 'Dry Food' as const, gf: false, k: 'Small bites for small mouths, ActivBiome+ prebiotic blend for gut flora', spec: ['Small Kibble', 'ActivBiome+'] },
  { b: "Hill's Science Plan", l: 'Adult', f: 'Medium Lamb & Rice Adult', sz: '14kg', p: 69.9, cr: 21.2, fat: 14.2, fib: 1.7, cal: 3720, ap: 72, cat: 'Pet Specialty & Holistic' as const, tp: 'Dry Food' as const, gf: false, k: 'High quality digestible lamb and brown rice for sensitive digestions', spec: ['Lamb Protein', 'Digestive Health'] },
  { b: "Hill's Science Plan", l: 'Adult', f: 'Large Breed Chicken Adult', sz: '14kg', p: 68.5, cr: 20.8, fat: 14.1, fib: 1.8, cal: 3700, ap: 70, cat: 'Pet Specialty & Holistic' as const, tp: 'Dry Food' as const, gf: false, k: 'Glucosamine and chondroitin for healthy joints in dogs over 25kg', spec: ['Joint Care', 'Glucosamine'] },
  { b: "Hill's Science Plan", l: 'Adult', f: 'Perfect Weight Medium Adult', sz: '12kg', p: 69.9, cr: 25.3, fat: 11.3, fib: 12.1, cal: 3180, ap: 72, cat: 'Pet Specialty & Holistic' as const, tp: 'Dry Food' as const, gf: false, k: 'Clinically proven breakthrough nutrition to reach and maintain healthy weight', spec: ['Weight Management', 'L-Carnitine'] },
  { b: "Hill's Science Plan", l: 'Puppy', f: 'Small & Mini Puppy Chicken', sz: '3kg', p: 26.5, cr: 27.8, fat: 18.2, fib: 1.6, cal: 3900, ap: 80, cat: 'Pet Specialty & Holistic' as const, tp: 'Dry Food' as const, gf: false, k: 'DHA from fish oil for healthy brain and eye development in small pups', spec: ['Brain DHA', 'Small Pups Growth'] },
  { b: "Hill's Science Plan", l: 'Puppy', f: 'Large Breed Puppy Chicken', sz: '14kg', p: 72.0, cr: 26.9, fat: 14.7, fib: 3.1, cal: 3630, ap: 76, cat: 'Pet Specialty & Holistic' as const, tp: 'Dry Food' as const, gf: false, k: 'Optimal calcium levels for controlled skeletal growth in large puppies', spec: ['Controlled Calcium', 'Skeletal Growth'] },
  { b: "Hill's Science Plan", l: 'Mature Adult', f: 'Small & Mini Senior 7+ Chicken', sz: '6kg', p: 46.0, cr: 17.8, fat: 14.5, fib: 2.3, cal: 3680, ap: 70, cat: 'Pet Specialty & Holistic' as const, tp: 'Dry Food' as const, gf: false, k: 'Synergistic mineral blend for heart, kidney and bladder vitality', spec: ['Senior Vitality', 'Balanced Minerals'] },
  { b: "Hill's Science Plan", l: 'Mature Adult', f: 'Youthful Vitality Medium 7+', sz: '14kg', p: 74.0, cr: 19.5, fat: 12.7, fib: 1.6, cal: 3650, ap: 72, cat: 'Pet Specialty & Holistic' as const, tp: 'Dry Food' as const, gf: false, k: 'Proprietary formula supporting brain function, energy and social interaction', spec: ['Cellular Vitality', 'Brain Activity'] },
  { b: "Hill's Science Plan", l: 'Special Diets', f: 'Sensitive Stomach & Skin Medium Chicken', sz: '14kg', p: 73.5, cr: 22.8, fat: 14.5, fib: 1.7, cal: 3740, ap: 74, cat: 'Pet Specialty & Holistic' as const, tp: 'Dry Food' as const, gf: false, k: 'Prebiotic fiber to fuel beneficial gut bacteria, Vitamin E & Omega-6 for coat', spec: ['Sensitive Stomach', 'Glossy Coat'] },
  { b: "Hill's Science Plan", l: 'Hypoallergenic', f: 'Hypoallergenic Adult Medium Salmon', sz: '14kg', p: 79.9, cr: 21.0, fat: 15.0, fib: 2.5, cal: 3780, ap: 78, cat: 'Pet Specialty & Holistic' as const, tp: 'Dry Food' as const, gf: true, k: 'Limited high quality novel salmon protein source and grain-free recipe', spec: ['Grain-Free Salmon', 'Hypoallergenic'] },
  // Hill's Prescription Diets
  { b: "Hill's Prescription Diet", l: 'Gastrointestinal', f: 'i/d Digestive Care Chicken', sz: '12kg', p: 87.0, cr: 23.3, fat: 13.1, fib: 1.6, cal: 3730, ap: 70, cat: 'Veterinary Clinical' as const, tp: 'Dry Food' as const, gf: false, k: 'Highly digestible formula to replenish lost nutrients in gastrointestinal upset', spec: ['Electrolyte Replenishment', 'Digestive Recovery'] },
  { b: "Hill's Prescription Diet", l: 'Gastrointestinal', f: 'i/d Low Fat Digestive Care', sz: '12kg', p: 88.5, cr: 23.5, fat: 7.3, fib: 1.9, cal: 3340, ap: 70, cat: 'Veterinary Clinical' as const, tp: 'Dry Food' as const, gf: false, k: 'Low fat nutrition to soothe pancreatitis and manage lipid disorders', spec: ['Pancreatitis Low Fat', 'Prebiotic Fiber'] },
  { b: "Hill's Prescription Diet", l: 'Urinary Care', f: 'c/d Multicare Urinary Care', sz: '12kg', p: 86.9, cr: 19.5, fat: 15.3, fib: 1.8, cal: 3780, ap: 68, cat: 'Veterinary Clinical' as const, tp: 'Dry Food' as const, gf: false, k: 'Controls levels of calcium and magnesium to dissolve and prevent struvite stones', spec: ['Struvite Prevention', 'Controlled Minerals'] },
  { b: "Hill's Prescription Diet", l: 'Joint Care', f: 'j/d Joint Care Mobility Chicken', sz: '12kg', p: 89.0, cr: 17.6, fat: 14.8, fib: 5.7, cal: 3620, ap: 68, cat: 'Veterinary Clinical' as const, tp: 'Dry Food' as const, gf: false, k: 'High levels of EPA and Omega-3 fatty acids clinically proven to improve mobility', spec: ['High EPA Joint Care', 'Cartilage Protection'] },
  { b: "Hill's Prescription Diet", l: 'Weight Management', f: 'Metabolic Weight Management', sz: '12kg', p: 88.0, cr: 25.3, fat: 11.1, fib: 12.9, cal: 3110, ap: 72, cat: 'Veterinary Clinical' as const, tp: 'Dry Food' as const, gf: false, k: 'Naturally works with dogs unique metabolism to burn fat and prevent weight rebound', spec: ['Metabolic Activation', 'Weight Loss Proven'] },
  { b: "Hill's Prescription Diet", l: 'Dermatology', f: 'Derm Defense Environmental Sensitivity', sz: '12kg', p: 91.0, cr: 20.7, fat: 15.4, fib: 1.5, cal: 3770, ap: 72, cat: 'Veterinary Clinical' as const, tp: 'Dry Food' as const, gf: false, k: 'HistaGuard complex with bioactives and phytonutrients to reduce allergic reactions', spec: ['HistaGuard Complex', 'Environmental Allergy'] },
  { b: "Hill's Prescription Diet", l: 'Urinary Care', f: 'u/d Urinary Care Non-Struvite', sz: '10kg', p: 79.9, cr: 10.0, fat: 19.1, fib: 2.4, cal: 3990, ap: 40, cat: 'Veterinary Clinical' as const, tp: 'Dry Food' as const, gf: false, k: 'Low purine and restricted protein for urate and cystine urolith management', spec: ['Urate & Cystine Prevention', 'Low Purine'] },
  { b: "Hill's Prescription Diet", l: 'Weight & Diabetes', f: 'w/d Multi-Benefit Weight & Glucose', sz: '12kg', p: 84.9, cr: 16.5, fat: 8.5, fib: 15.0, cal: 3050, ap: 65, cat: 'Veterinary Clinical' as const, tp: 'Dry Food' as const, gf: false, k: 'High fiber to regulate bowel motility and assist diabetes glycemic control', spec: ['High Fiber Glucose Control', 'Weight Maintenance'] },
  { b: "Hill's Prescription Diet", l: 'Hepatic', f: 'l/d Liver Care Canine', sz: '10kg', p: 79.5, cr: 16.4, fat: 21.8, fib: 2.3, cal: 4090, ap: 65, cat: 'Veterinary Clinical' as const, tp: 'Dry Food' as const, gf: false, k: 'Controlled levels of copper and easily digestible protein to support liver regeneration', spec: ['Low Copper Liver Support', 'High Digestibility'] },
  { b: "Hill's Prescription Diet", l: 'Restorative Care', f: 'a/d Urgent Care Wet Can', sz: '156g', p: 3.8, cr: 10.6, fat: 7.3, fib: 0.3, cal: 1150, ap: 90, cat: 'Veterinary Clinical' as const, tp: 'Wet Food' as const, gf: true, k: 'Exceptional palatability, soft smooth consistency for syringe and tube feeding', spec: ['Post-Op Convalescence', 'Syringe Feedable Wet'] },
  { b: "Hill's Prescription Diet", l: 'Renal Care', f: 'k/d Kidney Care Stew Chicken & Vegetables', sz: '354g', p: 4.5, cr: 3.7, fat: 5.5, fib: 0.8, cal: 980, ap: 75, cat: 'Veterinary Clinical' as const, tp: 'Wet Food' as const, gf: false, k: 'Controlled phosphorus and low sodium wet stew to stimulate appetite in renal dogs', spec: ['Kidney Stew', 'Appetite Stimulator'] },
  { b: "Hill's Prescription Diet", l: 'Hypoallergenic', f: 'z/d Skin/Food Sensitivities Wet Can', sz: '370g', p: 4.6, cr: 5.2, fat: 3.9, fib: 1.2, cal: 950, ap: 80, cat: 'Veterinary Clinical' as const, tp: 'Wet Food' as const, gf: false, k: 'Hydrolysed chicken liver protein wet diet for canine adverse food reactions', spec: ['Hydrolysed Liver Wet', 'Cutaneous Allergy'] },
  { b: "Hill's Prescription Diet", l: 'Gastrointestinal', f: 'i/d Digestive Care Stew Wet Can', sz: '354g', p: 4.4, cr: 5.0, fat: 3.5, fib: 0.7, cal: 920, ap: 80, cat: 'Veterinary Clinical' as const, tp: 'Wet Food' as const, gf: false, k: 'Tender chicken and vegetable chunks in gravy for soothing stomach inflammation', spec: ['Digestive Stew Wet', 'GI Soothing'] },
  { b: "Hill's Science Plan", l: 'Wet Cans', f: 'Adult Beef Savoury Wet Can', sz: '370g', p: 3.4, cr: 6.0, fat: 4.5, fib: 0.5, cal: 1010, ap: 85, cat: 'Pet Specialty & Holistic' as const, tp: 'Wet Food' as const, gf: false, k: 'Finely minced beef with essential minerals for daily complete nutrition', spec: ['Real Beef Wet', 'Complete Nutrition'] },
  { b: "Hill's Science Plan", l: 'Wet Cans', f: 'Puppy Chicken Loaf Wet Can', sz: '370g', p: 3.4, cr: 6.8, fat: 5.3, fib: 0.4, cal: 1030, ap: 85, cat: 'Pet Specialty & Holistic' as const, tp: 'Wet Food' as const, gf: false, k: 'Smooth loaf chicken pate formulated for growing puppies and nursing mothers', spec: ['Puppy Loaf Wet', 'High Protein Growth'] },
  { b: "Hill's Science Plan", l: 'Wet Cans', f: 'Senior 7+ Chicken Wet Can', sz: '370g', p: 3.5, cr: 5.5, fat: 4.0, fib: 0.6, cal: 980, ap: 80, cat: 'Pet Specialty & Holistic' as const, tp: 'Wet Food' as const, gf: false, k: 'Gentle on aging teeth and digestion, balanced sodium and phosphorus for kidneys', spec: ['Senior Loaf Wet', 'Kidney & Heart Support'] },
  { b: "Hill's Science Plan", l: 'Adult', f: 'Medium Tuna & Rice Adult', sz: '12kg', p: 68.9, cr: 21.6, fat: 14.9, fib: 1.6, cal: 3740, ap: 74, cat: 'Pet Specialty & Holistic' as const, tp: 'Dry Food' as const, gf: false, k: 'Omega-3 rich tuna fish protein with brewer rice for sensitive skin and stomachs', spec: ['Marine Tuna Protein', 'Gentle Rice'] },
  { b: "Hill's Science Plan", l: 'Adult', f: 'No Grain Medium Tuna Adult', sz: '14kg', p: 78.5, cr: 21.0, fat: 14.8, fib: 2.4, cal: 3750, ap: 76, cat: 'Pet Specialty & Holistic' as const, tp: 'Dry Food' as const, gf: true, k: 'Made without grains or gluten, high quality tuna meal for easily digestible feeding', spec: ['Grain-Free Tuna', 'Digestive Ease'] }
];
hillsList.forEach(h => {
  specs.push({
    brand: h.b, line: h.l, flavor: h.f, type: h.tp, category: h.cat, age: 'Adult', size: h.sz, msrp: h.p, origin: 'USA / Netherlands', cert: "Hill's Global Quality & HACCP Certified", animalProtein: h.ap, summary: h.k,
    ingredients: ['Chicken/Lamb/Tuna meal', 'Brewers rice', 'Brown rice', 'Animal fat', 'Flaxseed', 'Dried beet pulp', 'Vegetable oil', 'ActivBiome+ prebiotic blend', 'Vitamins and minerals'],
    protein: h.cr, fat: h.fat, fiber: h.fib, ash: 5.5, moisture: h.tp === 'Wet Food' ? 76.0 : 9.0, kcal: h.cal, allergens: ['Poultry / Lamb / Fish'], grainFree: h.gf, special: h.spec, officialUrl: 'https://www.hillspet.gr'
  });
});

// 3. Farmina N&D & Cibau (24 items)
const farminaList = [
  { l: 'Prime Grain-Free', f: 'Chicken & Pomegranate Adult Medium/Maxi', sz: '12kg', p: 76.9, cr: 40.0, fat: 18.0, fib: 2.6, cal: 4180, ap: 98, gf: true, k: '98% of protein from animal origin, dehydrated Italian free-range chicken, pomegranate', spec: ['98% Animal Protein', 'Italian Free-Range Chicken'] },
  { l: 'Prime Grain-Free', f: 'Chicken & Pomegranate Puppy Medium/Maxi', sz: '12kg', p: 78.5, cr: 42.0, fat: 22.0, fib: 2.3, cal: 4350, ap: 98, gf: true, k: 'High energy growth formula with fresh boneless chicken and pomegranate phytonutrients', spec: ['Puppy Prime Growth', 'Grain-Free High Calorie'] },
  { l: 'Prime Grain-Free', f: 'Lamb & Blueberry Adult Mini', sz: '7kg', p: 58.0, cr: 38.0, fat: 18.0, fib: 2.6, cal: 4150, ap: 98, gf: true, k: 'Grass-fed New Zealand lamb, antioxidant-rich blueberries, small kibble size', spec: ['New Zealand Lamb', 'Antioxidant Blueberry'] },
  { l: 'Pumpkin Grain-Free', f: 'Lamb & Blueberry Adult Medium/Maxi', sz: '12kg', p: 78.0, cr: 35.0, fat: 20.0, fib: 1.9, cal: 4130, ap: 96, gf: true, k: 'Italian pumpkin providing soluble fiber and natural antioxidants for sensitive guts', spec: ['Soluble Pumpkin Fiber', 'Gentle Digestion'] },
  { l: 'Pumpkin Grain-Free', f: 'Duck & Cantaloupe Melon Adult Medium/Maxi', sz: '12kg', p: 79.5, cr: 30.0, fat: 18.0, fib: 2.9, cal: 3990, ap: 96, gf: true, k: 'Novel boneless duck protein, cantaloupe melon, prebiotic pumpkin', spec: ['Novel Duck Protein', 'Cantaloupe Phytonutrients'] },
  { l: 'Pumpkin Grain-Free', f: 'Wild Boar & Apple Adult Mini', sz: '7kg', p: 59.9, cr: 34.0, fat: 18.0, fib: 2.6, cal: 4050, ap: 96, gf: true, k: 'Tuscan wild boar meat, fresh apples, tailored miniature kibbles', spec: ['Tuscan Wild Boar', 'Italian Apple Fiber'] },
  { l: 'Ocean Grain-Free', f: 'Cod, Pumpkin & Cantaloupe Melon Adult Mini', sz: '7kg', p: 61.0, cr: 30.0, fat: 18.0, fib: 2.9, cal: 3990, ap: 96, gf: true, k: 'Wild Pacific cod, high Omega-3 concentration, anti-inflammatory carotenoids', spec: ['Wild Pacific Cod', 'Anti-Inflammatory EPA/DHA'] },
  { l: 'Ocean Grain-Free', f: 'Herring & Orange Adult Medium/Maxi', sz: '12kg', p: 79.9, cr: 34.0, fat: 18.0, fib: 2.6, cal: 4080, ap: 96, gf: true, k: 'North Sea wild herring, sweet Sicilian orange, EPA/DHA for skin elasticity', spec: ['North Sea Herring', 'Sicilian Orange'] },
  { l: 'Ancestral Grain Low Grain', f: 'Chicken & Pomegranate Adult Medium/Maxi', sz: '12kg', p: 66.5, cr: 30.0, fat: 18.0, fib: 2.9, cal: 3990, ap: 90, gf: false, k: 'Spelt and oats with low glycemic index, prevents glycemic peaks and diabetes', spec: ['Spelt & Oats Low Glycemic', 'No Blood Sugar Spike'] },
  { l: 'Ancestral Grain Low Grain', f: 'Lamb & Blueberry Adult Medium/Maxi', sz: '12kg', p: 69.0, cr: 28.0, fat: 18.0, fib: 2.9, cal: 3940, ap: 90, gf: false, k: 'Mediterranean ancestral recipe with spelt, oats, grass-fed pasture lamb', spec: ['Ancestral Spelt', 'Pasture Lamb'] },
  { l: 'Ancestral Grain Low Grain', f: 'Cod & Orange Adult Medium/Maxi', sz: '12kg', p: 69.9, cr: 30.0, fat: 18.0, fib: 2.5, cal: 3990, ap: 90, gf: false, k: 'Low grain cod fish recipe with ancestral grains for working and sporting dogs', spec: ['Marine Cod Protein', 'Ancestral Grain Balance'] },
  { l: 'Quinoa Functional', f: 'Skin & Coat Quinoa Venison Adult Medium/Maxi', sz: '12kg', p: 86.0, cr: 23.0, fat: 12.0, fib: 2.8, cal: 3790, ap: 92, gf: true, k: 'Wild venison, organic quinoa, coconut and turmeric for atopic dermatosis', spec: ['Organic Quinoa', 'Wild Venison Hypoallergenic'] },
  { l: 'Quinoa Functional', f: 'Digestion Quinoa Lamb Adult Mini', sz: '7kg', p: 63.5, cr: 25.0, fat: 12.0, fib: 1.9, cal: 3880, ap: 92, gf: true, k: 'Highly digestible organic quinoa, lamb, mint and fennel for sensitive digestion', spec: ['Fennel & Mint Digestion', 'Single Protein Lamb'] },
  { l: 'Quinoa Functional', f: 'Weight Management Quinoa Lamb', sz: '12kg', p: 85.0, cr: 28.0, fat: 8.0, fib: 8.2, cal: 3230, ap: 90, gf: true, k: 'Low fat, high dietary fiber quinoa formula to maintain lean body mass', spec: ['Low Fat Quinoa', 'Lean Muscle Maintenance'] },
  { l: 'Ocean Wet', f: 'Cod, Shrimp & Pumpkin Wet Can', sz: '285g', p: 3.6, cr: 11.5, fat: 5.5, fib: 0.9, cal: 1040, ap: 98, gf: true, tp: 'Wet Food' as const, k: 'Real boneless Pacific cod cuts with whole shrimp and Italian pumpkin', spec: ['Real Shrimp Cuts', 'Steamed Pacific Cod'] },
  { l: 'Prime Wet', f: 'Wild Boar & Apple Wet Can', sz: '285g', p: 3.6, cr: 11.0, fat: 6.0, fib: 1.0, cal: 1070, ap: 98, gf: true, tp: 'Wet Food' as const, k: 'Steamed wild boar meat chunks with sweet apples in delicious broth', spec: ['Steamed Boar Meat', 'Grain-Free Broth Wet'] },
  { l: 'Prime Wet', f: 'Lamb & Blueberry Wet Can', sz: '285g', p: 3.6, cr: 11.0, fat: 6.0, fib: 0.9, cal: 1070, ap: 98, gf: true, tp: 'Wet Food' as const, k: 'Fresh boneless lamb shoulder chunks with whole Italian blueberries', spec: ['Boneless Lamb Wet', 'Antioxidant Berry Wet'] },
  // Farmina Cibau
  { l: 'Cibau Super Premium', f: 'Adult Medium Chicken & Rice', sz: '12kg', p: 48.0, cr: 27.0, fat: 15.0, fib: 2.0, cal: 3750, ap: 75, gf: false, k: 'High quality complete Italian kibble with dried chicken and digestible rice', spec: ['Chicken & Rice Value', 'Complete Maintenance'] },
  { l: 'Cibau Super Premium', f: 'Adult Maxi Chicken & Rice', sz: '12kg', p: 48.0, cr: 26.0, fat: 14.0, fib: 2.2, cal: 3700, ap: 75, gf: false, k: 'Specially shaped large kibble with chondroitin and glucosamine for big dogs', spec: ['Maxi Kibble Size', 'Joint Support Cibau'] },
  { l: 'Cibau Super Premium', f: 'Sensitive Fish Medium & Maxi', sz: '12kg', p: 52.0, cr: 24.0, fat: 12.0, fib: 2.0, cal: 3600, ap: 74, gf: false, k: 'Dehydrated fish protein and fish oil to solve food allergies and pruritus', spec: ['Sensitive Fish', 'Omega-3 Rich'] },
  { l: 'Cibau Super Premium', f: 'Sensitive Lamb Medium & Maxi', sz: '12kg', p: 53.0, cr: 26.0, fat: 14.0, fib: 2.0, cal: 3720, ap: 74, gf: false, k: 'Selected lamb protein and rice for dogs suffering from food intolerances', spec: ['Lamb Cibau', 'Hypoallergenic Intolerance'] },
  { l: 'Cibau Super Premium', f: 'Puppy Medium Chicken & Rice', sz: '12kg', p: 51.0, cr: 30.0, fat: 20.0, fib: 1.9, cal: 4050, ap: 80, gf: false, k: 'Energy dense formulation for growing medium puppies from 2 to 12 months', spec: ['Puppy High Energy', 'Balanced Calcium Phosphorus'] },
  { l: 'Cibau Super Premium', f: 'Light Adult Medium & Maxi', sz: '12kg', p: 49.0, cr: 22.0, fat: 8.0, fib: 7.8, cal: 3200, ap: 70, gf: false, k: 'Low fat, rich fiber nutrition to control weight in overweight or neutered dogs', spec: ['Weight Satiety', 'Low Fat 8%'] },
  { l: 'Cibau Super Premium', f: 'Senior Adult Medium & Maxi', sz: '12kg', p: 50.0, cr: 24.0, fat: 11.0, fib: 3.5, cal: 3500, ap: 70, gf: false, k: 'Antioxidants, EPA and controlled sodium to safeguard older dogs well-being', spec: ['Senior Care Cibau', 'Joint Mobility'] }
];
farminaList.forEach(f => {
  specs.push({
    brand: f.l.includes('Cibau') ? 'Farmina Cibau' : 'Farmina N&D', line: f.l, flavor: f.f, type: f.tp || 'Dry Food', category: 'Pet Specialty & Holistic', age: 'Adult', size: f.sz, msrp: f.p, origin: 'Italy', cert: 'Farmina Vet Research & ISO 22000 Certified', animalProtein: f.ap, summary: f.k,
    ingredients: ['Fresh / Dehydrated Meat Cuts', 'Sweet potato or spelt', 'Chicken / Fish fat', 'Herring oil', 'Dried whole eggs', 'Apples / Blueberries / Pumpkin', 'Psyllium seed', 'Inulin', 'Glucosamine', 'Chondroitin'],
    protein: f.cr, fat: f.fat, fiber: f.fib, ash: 7.5, moisture: f.tp === 'Wet Food' ? 76.0 : 9.0, kcal: f.cal, allergens: ['Meat / Fish / Eggs'], grainFree: f.gf, special: f.spec, officialUrl: 'https://www.farmina.com/gr'
  });
});

// 4. Acana & Orijen (Champion Petfoods) (28 items)
const champList = [
  // Acana (18)
  { b: 'Acana', l: 'Singles Limited Ingredient', f: 'Grass-Fed Lamb Recipe', sz: '11.4kg', p: 89.9, cr: 31, fat: 15, fib: 5, cal: 3393, ap: 50, gf: true, k: 'Single animal protein source with raw lamb, whole apples, and green lentils', spec: ['Single Protein Lamb', 'WholePrey 50%'] },
  { b: 'Acana', l: 'Singles Limited Ingredient', f: 'Free-Run Duck Recipe', sz: '11.4kg', p: 92.5, cr: 31, fat: 15, fib: 5, cal: 3405, ap: 50, gf: true, k: '50% Ontario duck, Bartlett pears, nutrient dense WholePrey ratio', spec: ['Single Protein Duck', 'Bartlett Pears'] },
  { b: 'Acana', l: 'Singles Limited Ingredient', f: 'Yorkshire Pork Recipe', sz: '11.4kg', p: 88.0, cr: 31, fat: 15, fib: 5, cal: 3393, ap: 50, gf: true, k: 'Single protein Yorkshire pork with butternut squash for sensitive stomachs', spec: ['Single Protein Pork', 'Butternut Squash'] },
  { b: 'Acana', l: 'Heritage Recipe', f: 'Sport & Agility Adult', sz: '17kg', p: 94.0, cr: 35, fat: 22, fib: 5, cal: 3725, ap: 75, gf: true, k: '75% quality animal ingredients for highly active working, agility or hunting dogs', spec: ['Active Sport 75%', 'Sustained Stamina'] },
  { b: 'Acana', l: 'Heritage Recipe', f: 'Light & Fit Recipe', sz: '11.4kg', p: 82.0, cr: 35, fat: 11, fib: 8, cal: 3070, ap: 65, gf: true, k: 'High protein, calorie-restricted formula with free-run poultry and wild flounder', spec: ['Lean Conditioning', 'Reduced Calories'] },
  { b: 'Acana', l: 'Heritage Recipe', f: 'Senior Dog Recipe', sz: '11.4kg', p: 82.5, cr: 33, fat: 14, fib: 6, cal: 3325, ap: 65, gf: true, k: 'Rich in meat protein to maintain lean muscle mass with reduced carbohydrates', spec: ['Senior Muscle Mass', 'Low Glycemic Carbs'] },
  { b: 'Acana', l: 'Heritage Recipe', f: 'Puppy Small Breed', sz: '6kg', p: 52.0, cr: 33, fat: 20, fib: 5, cal: 3660, ap: 70, gf: true, k: 'Miniature kibbles packed with free-run chicken, wild flounder and whole eggs', spec: ['Small Puppy Bites', 'Brain DHA'] },
  { b: 'Acana', l: 'Heritage Recipe', f: 'Puppy Large Breed', sz: '17kg', p: 96.0, cr: 33, fat: 15, fib: 6, cal: 3375, ap: 70, gf: true, k: 'Tailored protein and calcium balance for slow, controlled growth of large pups', spec: ['Large Pup Bone Control', 'WholePrey Poultry'] },
  { b: 'Acana', l: 'Highest Protein Regionals', f: 'Wild Prairie Dog Recipe', sz: '11.4kg', p: 96.0, cr: 35, fat: 17, fib: 6, cal: 3850, ap: 70, gf: true, k: 'Free-run chicken and turkey, freshwater trout, whole eggs in WholePrey ratios', spec: ['70% Animal Protein', 'Prairie Poultry & Trout'] },
  { b: 'Acana', l: 'Highest Protein Regionals', f: 'Grasslands Dog Recipe', sz: '11.4kg', p: 98.0, cr: 35, fat: 17, fib: 6, cal: 3810, ap: 70, gf: true, k: 'Pasture-raised raw lamb, duck, whole eggs and wild-caught pike', spec: ['Pasture Lamb & Duck', 'WholePrey Ratio'] },
  { b: 'Acana', l: 'Highest Protein Regionals', f: 'Pacifica Dog Recipe', sz: '11.4kg', p: 99.5, cr: 35, fat: 17, fib: 6, cal: 3850, ap: 70, gf: true, k: 'Wild Pacific herring, pilchard, flounder, hake and rockfish with Omega-3s', spec: ['100% Wild Pacific Fish', 'Omega-3 Rich Coat'] },
  { b: 'Acana', l: 'Classics', f: 'Prairie Poultry Recipe', sz: '17kg', p: 79.9, cr: 29, fat: 17, fib: 5, cal: 3493, ap: 50, gf: false, k: '50% chicken & turkey with low-glycemic steel-cut oats for sustained energy', spec: ['50% Poultry Oats', 'Affordable Superpremium'] },
  { b: 'Acana', l: 'Classics', f: 'Wild Coast Recipe', sz: '17kg', p: 84.0, cr: 29, fat: 17, fib: 5, cal: 3493, ap: 50, gf: false, k: 'North Pacific fish and steel-cut oats, gentle on sensitive digestive tracts', spec: ['North Pacific Marine', 'Digestible Oats'] },
  { b: 'Acana', l: 'Classics', f: 'Red Meat Recipe', sz: '17kg', p: 84.0, cr: 29, fat: 17, fib: 5, cal: 3493, ap: 50, gf: false, k: 'Ranch-raised beef, Yorkshire pork and lamb paired with wholesome steel-cut oats', spec: ['Ranch Red Meats', 'Sustained Energy Oats'] },
  { b: 'Acana', l: 'Premium Wet', f: 'Free-Run Poultry Pave Wet Can', sz: '363g', p: 4.4, cr: 10, fat: 6, fib: 1.5, cal: 1050, ap: 85, gf: true, tp: 'Wet Food' as const, k: '85% chicken and turkey in bone broth infusion for complete daily gourmet hydration', spec: ['85% Poultry Wet', 'Bone Broth Infusion'] },
  { b: 'Acana', l: 'Premium Wet', f: 'Beef Recipe Pave Wet Can', sz: '363g', p: 4.6, cr: 10, fat: 6, fib: 1.5, cal: 1070, ap: 85, gf: true, tp: 'Wet Food' as const, k: 'Finely minced ranch beef cuts blended with sweet potatoes and blueberries', spec: ['Real Beef Cuts Wet', 'Grain-Free Pave'] },
  { b: 'Acana', l: 'Premium Wet', f: 'Puppy Recipe Pave Wet Can', sz: '363g', p: 4.5, cr: 11, fat: 6.5, fib: 1.2, cal: 1100, ap: 85, gf: true, tp: 'Wet Food' as const, k: 'Nutrient-rich poultry and fish pate providing healthy growth and energy for puppies', spec: ['Puppy Pave Wet', 'Growth Nourishment'] },
  { b: 'Acana', l: 'Treats', f: 'High-Protein Crunchy Lamb Biscuits', sz: '100g', p: 5.5, cr: 38, fat: 10, fib: 5, cal: 3300, ap: 85, gf: true, tp: 'Treats' as const, k: 'Crunchy baked treats with single-source pasture lamb and sweet potato', spec: ['Single Animal Protein Treat', 'Grain-Free Biscuit'] },

  // Orijen (10)
  { b: 'Orijen', l: 'Biologically Appropriate', f: 'Original Adult Dog', sz: '11.4kg', p: 104.0, cr: 38, fat: 18, fib: 4, cal: 3940, ap: 85, gf: true, k: '85% quality poultry and fish ingredients, two-thirds fresh or raw WholePrey', spec: ['85% WholePrey Meat', 'Biologically Appropriate'] },
  { b: 'Orijen', l: 'Biologically Appropriate', f: 'Six Fish Adult Dog', sz: '11.4kg', p: 114.0, cr: 38, fat: 18, fib: 4, cal: 3900, ap: 85, gf: true, k: 'Six wild-caught marine fish: pilchard, mackerel, hake, flounder, rockfish and sole', spec: ['100% Wild Marine Fish', 'High EPA/DHA Omega-3'] },
  { b: 'Orijen', l: 'Biologically Appropriate', f: 'Regional Red Dog', sz: '11.4kg', p: 118.0, cr: 38, fat: 18, fib: 4, cal: 3860, ap: 85, gf: true, k: 'Rich red meats: ranch-raised beef, wild boar, Boer goat, Romney lamb and Yorkshire pork', spec: ['Five Red Meats WholePrey', 'Nutrient Rich Organs'] },
  { b: 'Orijen', l: 'Biologically Appropriate', f: 'Puppy Large Breed', sz: '11.4kg', p: 106.0, cr: 38, fat: 16, fib: 4, cal: 3760, ap: 85, gf: true, k: 'Calibrated protein and mineral density specifically for large breed puppies', spec: ['Peak Growth Protein', 'Controlled Minerals'] },
  { b: 'Orijen', l: 'Biologically Appropriate', f: 'Senior Dog Recipe', sz: '11.4kg', p: 106.0, cr: 38, fat: 15, fib: 8, cal: 3710, ap: 85, gf: true, k: 'High quality meat protein supports lean muscle in senior dogs with lower calories', spec: ['Senior Lean Muscle', 'Digestible Fiber'] },
  { b: 'Orijen', l: 'Biologically Appropriate', f: 'Fit & Trim Weight Management', sz: '11.4kg', p: 108.0, cr: 42, fat: 13, fib: 8, cal: 3490, ap: 85, gf: true, k: 'Rich in protein with limited calories from fat and carbs to promote peak conditioning', spec: ['42% Highest Protein', 'Weight Lean Conditioning'] },
  { b: 'Orijen', l: 'Biologically Appropriate', f: 'Tundra Dog Recipe', sz: '11.4kg', p: 124.0, cr: 40, fat: 18, fib: 5, cal: 3860, ap: 85, gf: true, k: 'Exotic meats: Boer goat, wild boar, venison, Arctic char, free-run duck and mutton', spec: ['Exotic Tundra Game', 'Peak Biodiversity Diet'] },
  { b: 'Orijen', l: 'Biologically Appropriate Wet', f: 'Original Stew Wet Can', sz: '363g', p: 4.9, cr: 11, fat: 6, fib: 1, cal: 1060, ap: 95, gf: true, tp: 'Wet Food' as const, k: '95% animal ingredients in bone broth infusion, shreds of real chicken and turkey', spec: ['95% Animal Origin Wet', 'Bone Broth Stew'] },
  { b: 'Orijen', l: 'Biologically Appropriate Wet', f: 'Regional Red Stew Wet Can', sz: '363g', p: 5.2, cr: 11, fat: 6, fib: 1, cal: 1080, ap: 95, gf: true, tp: 'Wet Food' as const, k: 'Shredded beef, lamb and pork cuts in savory bone broth reduction', spec: ['Shredded Red Meats Wet', 'Maximum Palatability'] },
  { b: 'Orijen', l: 'Freeze-Dried Treats', f: 'Original Freeze-Dried Medallions', sz: '42.5g', p: 6.9, cr: 45, fat: 35, fib: 1, cal: 4900, ap: 100, gf: true, tp: 'Treats' as const, k: '100% pure raw poultry and fish flash freeze-dried to lock in natural flavor and nutrients', spec: ['100% Raw Freeze-Dried', 'Zero Additives Treat'] }
];
champList.forEach(c => {
  specs.push({
    brand: c.b, line: c.l, flavor: c.f, type: c.tp || 'Dry Food', category: 'Pet Specialty & Holistic', age: 'Adult', size: c.sz, msrp: c.p, origin: 'Canada', cert: 'Champion Petfoods Biological Authenticity Audit', animalProtein: c.ap, summary: c.k,
    ingredients: ['Fresh / Raw Chicken', 'Turkey', 'Flounder', 'Mackerel', 'Red meats', 'Whole green peas', 'Red lentils', 'Pinto beans', 'Collard greens', 'Whole cranberries', 'Kelp'],
    protein: c.cr, fat: c.fat, fiber: c.fib, ash: 8.0, moisture: c.tp === 'Wet Food' ? 76.0 : (c.tp === 'Treats' ? 4.0 : 10.0), kcal: c.cal, allergens: ['Poultry / Fish / Red Meat'], grainFree: c.gf, special: c.spec, officialUrl: 'https://www.championpetfoods.com'
  });
});

// 5. Taste of the Wild (12 items)
const totwList = [
  { f: 'High Prairie Adult Bison & Venison', sz: '12.2kg', p: 72.0, cr: 32, fat: 18, fib: 4, cal: 3719, ap: 80, gf: true, k: 'Roasted bison and roasted venison provide highly digestible energy and wild flavor', spec: ['Roasted Bison & Venison', 'K9 Strain Probiotics'] },
  { f: 'Pacific Stream Adult Smoked Salmon', sz: '12.2kg', p: 74.0, cr: 25, fat: 15, fib: 3, cal: 3600, ap: 80, gf: true, k: 'Egg-free single fish protein formula rich in marine omega fatty acids for sensitive skin', spec: ['Smoked Salmon Fish', 'Egg-Free Hypoallergenic'] },
  { f: 'Sierra Mountain Adult Roasted Lamb', sz: '12.2kg', p: 73.0, cr: 25, fat: 15, fib: 5, cal: 3611, ap: 78, gf: true, k: 'Pasture-raised roasted lamb recipe formulated for all life stages and sensitive digestions', spec: ['Pasture-Raised Lamb', 'Antioxidant Superfoods'] },
  { f: 'Wetlands Adult Roasted Fowl', sz: '12.2kg', p: 72.5, cr: 32, fat: 18, fib: 4, cal: 3750, ap: 80, gf: true, k: 'Duck, quail and turkey provide highly digestible protein for peak athletic dogs', spec: ['Roasted Wild Fowl', 'Sweet Potatoes Fiber'] },
  { f: 'Southwest Canyon Wild Boar', sz: '12.2kg', p: 74.5, cr: 29, fat: 15, fib: 5, cal: 3600, ap: 78, gf: true, k: 'Wild boar protein, beef, garbanzo beans and blueberries provide rich flavor diversity', spec: ['Wild Boar', 'Garbanzo Beans'] },
  { f: 'Pine Forest Venison & Legumes', sz: '12.2kg', p: 76.0, cr: 28, fat: 15, fib: 5.5, cal: 3600, ap: 78, gf: true, k: 'Venison with probiotics and omega fatty acids for active and athletic companions', spec: ['Venison & Legumes', 'Low Glycemic Energy'] },
  { f: 'High Prairie Puppy Bison & Venison', sz: '12.2kg', p: 74.0, cr: 28, fat: 17, fib: 5, cal: 3656, ap: 80, gf: true, k: 'Small kibble size with DHA for brain development and roasted meats for growing pups', spec: ['Puppy Wild Meats', 'Salmon Oil DHA'] },
  { f: 'Pacific Stream Puppy Smoked Salmon', sz: '12.2kg', p: 75.0, cr: 27, fat: 15, fib: 5, cal: 3667, ap: 80, gf: true, k: 'Egg-free salmon puppy recipe providing joint, brain and immune development', spec: ['Puppy Smoked Salmon', 'Egg-Free Growth'] },
  { f: 'Appalachian Valley Small Breed Venison', sz: '12.2kg', p: 76.0, cr: 32, fat: 18, fib: 4, cal: 3719, ap: 80, gf: true, k: 'Tiny kibbles easy on small teeth, rich in venison, lamb, egg and duck proteins', spec: ['Small Breed Kibble', 'Venison & Duck Energy'] },
  { f: 'High Prairie Wet Can Stew', sz: '390g', p: 3.8, cr: 8.5, fat: 4.5, fib: 1.0, cal: 990, ap: 85, gf: true, tp: 'Wet Food' as const, k: 'Bison and beef stew in savory gravy loaded with peas, potatoes and blackberries', spec: ['Bison Gravy Wet Stew', 'Grain-Free Canned'] },
  { f: 'Pacific Stream Wet Can Stew', sz: '390g', p: 3.9, cr: 8.0, fat: 4.0, fib: 1.0, cal: 970, ap: 85, gf: true, tp: 'Wet Food' as const, k: 'Wild salmon chunks in rich seafood broth with sweet potatoes and blueberries', spec: ['Wild Salmon Wet Stew', 'Omega-3 Marine Hydration'] },
  { f: 'Southwest Canyon Wet Can Stew', sz: '390g', p: 3.9, cr: 8.5, fat: 4.5, fib: 1.0, cal: 990, ap: 85, gf: true, tp: 'Wet Food' as const, k: 'Beef and wild boar wet stew enriched with prebiotic fiber and antioxidant berries', spec: ['Wild Boar Wet Stew', 'High Palatability Gravy'] }
];
totwList.forEach(t => {
  specs.push({
    brand: 'Taste of the Wild', line: 'Grain-Free Wild Nutrition', flavor: t.f, type: t.tp || 'Dry Food', category: 'Pet Specialty & Holistic', age: t.f.includes('Puppy') ? 'Puppy' : 'Adult', size: t.sz, msrp: t.p, origin: 'USA', cert: 'Schell & Kampeter AAFCO Compliance & SQF Certified', animalProtein: t.ap, summary: t.k,
    ingredients: ['Real roasted meat / wild salmon', 'Sweet potatoes', 'Peas', 'Potatoes', 'Canola oil', 'Ocean fish meal', 'Dried chicory root', 'Tomatoes', 'Blueberries', 'Raspberries', 'Lactobacillus acidophilus fermentation extract'],
    protein: t.cr, fat: t.fat, fiber: t.fib, ash: 7.2, moisture: t.tp === 'Wet Food' ? 78.0 : 10.0, kcal: t.cal, allergens: ['Venison / Bison / Salmon / Duck'], grainFree: t.gf, special: t.spec, officialUrl: 'https://www.tasteofthewildpetfood.com'
  });
});

// 6. Brit Care & Brit Premium (18 items)
const britList = [
  // Brit Care Hypoallergenic & Sustainable (11)
  { b: 'Brit Care', l: 'Hypoallergenic Adult', f: 'Medium Breed Lamb & Rice', sz: '12kg', p: 58.0, cr: 26, fat: 16, fib: 2.5, cal: 3820, ap: 78, gf: false, k: 'Monoprotein lamb with milk thistle to support liver metabolism and healthy skin', spec: ['Monoprotein Lamb', 'Milk Thistle Liver Care'] },
  { b: 'Brit Care', l: 'Hypoallergenic Adult', f: 'Large Breed Lamb & Rice', sz: '12kg', p: 58.0, cr: 26, fat: 14, fib: 3.0, cal: 3670, ap: 78, gf: false, k: 'Chondroprotectives and balanced minerals for large canine joints and skeletal weight', spec: ['Large Breed Joints', 'Glucosamine & Chondroitin'] },
  { b: 'Brit Care', l: 'Hypoallergenic Adult', f: 'Small Breed Lamb & Rice', sz: '7kg', p: 39.0, cr: 28, fat: 17, fib: 2.5, cal: 3880, ap: 80, gf: false, k: 'Tiny crunchy kibbles enriched with prebiotics and herbs for small breed dental hygiene', spec: ['Small Bites Lamb', 'Dental Cleanse'] },
  { b: 'Brit Care', l: 'Grain-Free Sensitive', f: 'Venison & Potato Sensitive Digestion', sz: '12kg', p: 64.0, cr: 25, fat: 14, fib: 3.0, cal: 3600, ap: 80, gf: true, k: 'Novel venison protein and hypoallergenic potatoes for severely sensitive gastrointestinal systems', spec: ['Grain-Free Venison', 'Sensitive GI Tract'] },
  { b: 'Brit Care', l: 'Grain-Free Adult', f: 'Salmon & Potato Adult Medium/Maxi', sz: '12kg', p: 62.0, cr: 26, fat: 15, fib: 2.5, cal: 3760, ap: 80, gf: true, k: 'High levels of Omega-3 salmon oil to keep coat silky and alleviate allergic dermatitis', spec: ['Atlantic Salmon', 'Derma Coat Care'] },
  { b: 'Brit Care', l: 'Sustainable Line', f: 'Insect & Fish Adult All Breeds', sz: '12kg', p: 66.0, cr: 25, fat: 15, fib: 3.2, cal: 3680, ap: 80, gf: true, k: 'Eco-friendly alternative protein from insect larvae combined with white fish for zero allergy risk', spec: ['Insect Protein', 'Eco Sustainability'] },
  { b: 'Brit Care', l: 'Mini Grain-Free', f: 'Sensitive Venison Mini Breeds', sz: '7kg', p: 44.0, cr: 26, fat: 15, fib: 3.0, cal: 3750, ap: 82, gf: true, k: 'Anti-stress herbs, blueberry extracts and fresh venison tailored for petite canines', spec: ['Mini Breed Venison', 'Stress Reduction Herbs'] },
  { b: 'Brit Care', l: 'Mini Grain-Free', f: 'Hair & Skin Salmon & Herring Mini', sz: '7kg', p: 44.0, cr: 27, fat: 16, fib: 2.5, cal: 3850, ap: 82, gf: true, k: 'Double marine protein (salmon and herring) with sea buckthorn for immune defense', spec: ['Double Marine Protein', 'Sea Buckthorn Immunity'] },
  { b: 'Brit Care', l: 'Puppy Hypoallergenic', f: 'Puppy Lamb & Rice', sz: '12kg', p: 62.0, cr: 32, fat: 18, fib: 2.1, cal: 4000, ap: 82, gf: false, k: 'Optimal ratios of DHA, prebiotics and gentle lamb protein for weaning and puppy growth', spec: ['Puppy Lamb', 'DHA Brain Development'] },
  { b: 'Brit Care', l: 'Mono Protein Wet', f: 'Pure Lamb Wet Can', sz: '400g', p: 3.4, cr: 10, fat: 7, fib: 0.5, cal: 1100, ap: 100, gf: true, tp: 'Wet Food' as const, k: '100% pure lamb meat and organs without meat meal, gluten, soya or GMOs', spec: ['100% Mono Lamb Wet', 'Zero Grains Zero Soy'] },
  { b: 'Brit Care', l: 'Mono Protein Wet', f: 'Pure Turkey Wet Can', sz: '400g', p: 3.4, cr: 10, fat: 6.5, fib: 0.5, cal: 1080, ap: 100, gf: true, tp: 'Wet Food' as const, k: '100% hypoallergenic turkey meat and broth, optimal for exclusion elimination diets', spec: ['100% Turkey Elimination Wet', 'Hypoallergenic Single Protein'] },

  // Brit Premium by Nature (7)
  { b: 'Brit Premium', l: 'by Nature Adult', f: 'Chicken Adult Medium Breeds', sz: '15kg', p: 44.9, cr: 25, fat: 15, fib: 2.5, cal: 3790, ap: 70, gf: false, k: '50% chicken with half-grain oats, chamomile, blueberries and citrus fruits', spec: ['50% Real Chicken', 'Herbal Synergy'] },
  { b: 'Brit Premium', l: 'by Nature Adult', f: 'Chicken Adult Large Breeds', sz: '15kg', p: 44.9, cr: 26, fat: 14, fib: 2.8, cal: 3720, ap: 70, gf: false, k: 'Chondroitin, green-lipped mussel and collagen for heavy skeletal frames', spec: ['Green-Lipped Mussel', 'Joint Mobility Support'] },
  { b: 'Brit Premium', l: 'by Nature Adult', f: 'Chicken Adult Extra Large Giant', sz: '15kg', p: 46.9, cr: 27, fat: 16, fib: 2.5, cal: 3830, ap: 72, gf: false, k: 'Heavy duty nutrition and giant kibble size for Mastiff, Great Dane and St. Bernard breeds', spec: ['Giant Breed Kibble', 'Heart & Tendon Defense'] },
  { b: 'Brit Premium', l: 'by Nature Adult', f: 'Lamb & Rice Sensitive All Breeds', sz: '15kg', p: 49.9, cr: 24, fat: 12, fib: 3.0, cal: 3550, ap: 68, gf: false, k: 'Gentle on digestion, prevents skin reactions, optimal price-to-quality in Greek market', spec: ['Lamb & Rice Value', 'Skin Sensitivity'] },
  { b: 'Brit Premium', l: 'by Nature Puppy', f: 'Chicken Puppy All Breeds', sz: '15kg', p: 48.0, cr: 30, fat: 18, fib: 2.2, cal: 3950, ap: 75, gf: false, k: 'Complete wholesome growth recipe with salmon oil DHA and natural herb extracts', spec: ['Growth DHA', 'Herb Extracts Immunity'] },
  { b: 'Brit Premium', l: 'by Nature Senior', f: 'Chicken Senior All Breeds', sz: '15kg', p: 45.0, cr: 21, fat: 10, fib: 3.5, cal: 3450, ap: 65, gf: false, k: 'Low fat and controlled calories to prevent obesity in elderly dogs while maintaining energy', spec: ['Senior Calorie Control', 'Mobility Support'] },
  { b: 'Brit Premium', l: 'by Nature Wet', f: 'Beef with Tripe Wet Can', sz: '800g', p: 3.5, cr: 10, fat: 6, fib: 0.5, cal: 1060, ap: 90, gf: true, tp: 'Wet Food' as const, k: 'Generous 800g jumbo can loaded with pure beef muscle cuts and prebiotic green tripe', spec: ['800g Jumbo Beef Can', 'Green Tripe Prebiotics'] }
];
britList.forEach(br => {
  specs.push({
    brand: br.b, line: br.l, flavor: br.f, type: br.tp || 'Dry Food', category: 'Pet Specialty & Holistic', age: br.f.includes('Puppy') ? 'Puppy' : (br.f.includes('Senior') ? 'Senior' : 'Adult'), size: br.sz, msrp: br.p, origin: 'Czech Republic', cert: 'VAFO Praha ISO 9001 & HACCP Certified', animalProtein: br.ap, summary: br.k,
    ingredients: ['Dehydrated chicken/lamb/venison', 'Oats / Rice / Potatoes', 'Chicken/salmon fat', 'Brewer yeast', 'Herbs & fruit blend (cloves, citrus, rosemary, turmeric)', 'Hydrolysed crustacean shells (glucosamine)'],
    protein: br.cr, fat: br.fat, fiber: br.fib, ash: 6.8, moisture: br.tp === 'Wet Food' ? 77.0 : 10.0, kcal: br.cal, allergens: ['Poultry / Lamb / Fish'], grainFree: br.gf, special: br.spec, officialUrl: 'https://www.brit-petfood.com'
  });
});

// 7. Monge Natural & BWild (11 items)
const mongeList = [
  { l: 'Natural Superpremium', f: 'Special Dog Adult Medium Chicken', sz: '12kg', p: 46.0, cr: 26, fat: 14, fib: 2.5, cal: 3750, ap: 74, gf: false, k: 'Made in Piedmont Italy with fresh chicken meat, XOS prebiotics and balanced fatty acids', spec: ['XOS Prebiotics', 'Fresh Italian Chicken'] },
  { l: 'Natural Superpremium', f: 'Special Dog Adult Maxi Lamb, Rice & Potatoes', sz: '12kg', p: 49.5, cr: 25, fat: 13, fib: 2.8, cal: 3680, ap: 72, gf: false, k: 'Single animal protein lamb formula with spirulina and glucosamine for heavy dogs', spec: ['Single Protein Lamb', 'Spirulina Immunity'] },
  { l: 'Natural Superpremium', f: 'Mini Adult Salmon & Rice', sz: '7.5kg', p: 38.0, cr: 25, fat: 14, fib: 2.5, cal: 3780, ap: 76, gf: false, k: 'Rich in Omega-3 fatty acids for small dogs with sensitive skins and fussy appetites', spec: ['Mini Salmon Bites', 'Omega-3 Coat Sheen'] },
  { l: 'BWild Grain-Free', f: 'Duck with Potatoes Adult All Breeds', sz: '12kg', p: 68.0, cr: 30, fat: 19, fib: 2.3, cal: 4050, ap: 85, gf: true, k: 'Grain-free duck recipe incorporating forest berries, ginseng and Yucca schidigera', spec: ['Grain-Free Duck', 'Forest Berries & Ginseng'] },
  { l: 'BWild Grain-Free', f: 'Lamb with Vegetables Puppy All Breeds', sz: '12kg', p: 69.5, cr: 32, fat: 20, fib: 2.5, cal: 4180, ap: 85, gf: true, k: 'Selected lamb with pumpkin and zucchini for optimal development in all puppy breeds', spec: ['Grain-Free Puppy Lamb', 'Pumpkin & Zucchini'] },
  { l: 'BWild Low Grain', f: 'Wild Boar Adult All Breeds', sz: '12kg', p: 62.0, cr: 29, fat: 16, fib: 2.5, cal: 3950, ap: 80, gf: false, k: 'Tuscan wild boar meat with ancestral oats and purple carrots for natural vitality', spec: ['Ancestral Wild Boar', 'Purple Carrots'] },
  { l: 'BWild Low Grain', f: 'Deer (Venison) Adult All Breeds', sz: '12kg', p: 64.0, cr: 28, fat: 16, fib: 2.6, cal: 3920, ap: 80, gf: false, k: 'Novel deer meat formulated to minimise food intolerances with whole grain oats', spec: ['Novel Deer Venison', 'Gentle Oats Energy'] },
  { l: 'Natural Wet Pouch', f: 'Mini Adult Chunks in Gravy Lamb 24x100g', sz: '2.4kg', p: 26.0, cr: 9.0, fat: 5.5, fib: 0.8, cal: 990, ap: 90, gf: true, tp: 'Wet Food' as const, k: 'Oven-steamed lamb morsels in tasty sauce crafted specifically for small breed teeth', spec: ['Oven-Steamed Gravy Pouch', 'Single Protein Lamb Wet'] },
  { l: 'Natural Wet Pouch', f: 'Mini Adult Chunks in Gravy Duck 24x100g', sz: '2.4kg', p: 26.0, cr: 9.0, fat: 5.5, fib: 0.8, cal: 990, ap: 90, gf: true, tp: 'Wet Food' as const, k: 'Tasty duck chunks steamed in savoury sauce, provides high moisture hydration', spec: ['Duck Gravy Pouch', 'Small Dog Wet Delight'] },
  { l: 'BWild Wet Can', f: 'Grain-Free Wild Boar Terrine Wet Can', sz: '400g', p: 3.5, cr: 10.5, fat: 6.5, fib: 0.5, cal: 1100, ap: 95, gf: true, tp: 'Wet Food' as const, k: 'Rustic wild boar pate with garden peas and blueberries, zero cereals and zero soy', spec: ['Wild Boar Terrine Wet', 'Grain-Free Wild Meat Wet'] },
  { l: 'BWild Wet Can', f: 'Grain-Free Buffalo Terrine Wet Can', sz: '400g', p: 3.6, cr: 10.0, fat: 6.0, fib: 0.5, cal: 1080, ap: 95, gf: true, tp: 'Wet Food' as const, k: 'Italian buffalo meat terrine with fresh carrots, optimal hypoallergenic alternative', spec: ['Italian Buffalo Wet', 'Hypoallergenic Terrine'] }
];
mongeList.forEach(m => {
  specs.push({
    brand: 'Monge', line: m.l, flavor: m.f, type: m.tp || 'Dry Food', category: 'Pet Specialty & Holistic', age: m.f.includes('Puppy') ? 'Puppy' : 'Adult', size: m.sz, msrp: m.p, origin: 'Italy', cert: 'Monge & C. S.p.A. Quality Certified (Piedmont)', animalProtein: m.ap, summary: m.k,
    ingredients: ['Italian meat cuts (chicken/lamb/duck/boar)', 'Rice / Oats / Potatoes', 'Corn gluten (low grain lines only)', 'Beet pulp', 'Xylo-oligosaccharides (XOS 0.3%)', 'Yucca schidigera', 'Spirulina', 'Echinacea root'],
    protein: m.cr, fat: m.fat, fiber: m.fib, ash: 6.5, moisture: m.tp === 'Wet Food' ? 78.0 : 9.0, kcal: m.cal, allergens: ['Poultry / Lamb / Duck / Game'], grainFree: m.gf, special: m.spec, officialUrl: 'https://www.monge.it'
  });
});

console.log('Part 1 total specs generated:', specs.length);

// Generate Part 1 TS file
const builtProductsPart1 = specs.map((s, idx) => buildDogProduct(s, idx + 100));

const fileContentPart1 = `import { DogProduct } from './types';

export const GREEK_MARKET_TOP_FEEDS_PART1: DogProduct[] = ${JSON.stringify(builtProductsPart1, null, 2)};
`;

fs.writeFileSync('src/greekMarketTopFeedsPart1.ts', fileContentPart1);
console.log('Successfully wrote src/greekMarketTopFeedsPart1.ts with', builtProductsPart1.length, 'products');
