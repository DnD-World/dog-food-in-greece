import fs from 'fs';
import { RawItemSpec, buildDogProduct } from './feedBuilderHelper';

// Target for Part 2: exactly 155 products.
// Breakdown:
// 1. Purina Pro Plan & Dentalife (26 items)
// 2. Josera & Bavaro (20 items)
// 3. Eukanuba & Advance (22 items)
// 4. Belcando & Leonardo/Bewital (15 items)
// 5. Nature's Protection & Reflex Plus (14 items)
// 6. Greek Supermarket Top Sellers: Sklavenitis (BARRON), AB Vassilopoulos, Lidl, My Market, Masoutis (24 items)
// 7. Commercial Aggregator Favorites: Pedigree, Friskies, Cesar, Purina ONE (22 items)
// 8. Dental & Training Treats: Whimzees, Greenies, 8in1, Alpha Spirit, Trixie, Wanpy (12 items)
// Total = 26 + 20 + 22 + 15 + 14 + 24 + 22 + 12 = 155 items.

const specs: RawItemSpec[] = [];

// 1. Purina Pro Plan & Dentalife (26 items)
const proPlanList = [
  { l: 'OptiDigest Sensitive Digestion', f: 'Medium Adult Lamb', sz: '14kg', p: 68.0, cr: 26, fat: 16, fib: 2.5, cal: 3820, ap: 75, k: 'Contains prebiotics proven to improve microflora balance and promote good stool consistency', spec: ['OptiDigest Prebiotics', 'Sensitive Lamb'] },
  { l: 'OptiDigest Sensitive Digestion', f: 'Large Robust Adult Lamb', sz: '14kg', p: 69.5, cr: 27, fat: 12.5, fib: 3.0, cal: 3590, ap: 75, k: 'Specifically tailored for large robust frame dogs with sensitive intestinal tracts', spec: ['Large Robust Digestion', 'Bentonite Clay'] },
  { l: 'OptiDigest Sensitive Digestion', f: 'Small & Mini Adult Turkey', sz: '7kg', p: 44.0, cr: 28, fat: 17, fib: 2.5, cal: 3880, ap: 78, k: 'Easily digestible turkey recipe with prebiotics crafted for small mouths', spec: ['Small Dog Turkey', 'Intestinal Microflora'] },
  { l: 'OptiDerma Sensitive Skin', f: 'Medium Adult Salmon', sz: '14kg', p: 71.0, cr: 29, fat: 18, fib: 3.0, cal: 3920, ap: 80, k: 'Selected protein sources from salmon to reduce skin discomfort associated with food sensitivity', spec: ['OptiDerma Salmon', 'Anti-Pruritus Barrier'] },
  { l: 'OptiDerma Sensitive Skin', f: 'Small & Mini Adult Salmon', sz: '7kg', p: 45.0, cr: 30, fat: 19, fib: 2.5, cal: 3980, ap: 80, k: 'Formulated for small breed skin reactions, promotes healthy joints and vibrant coat', spec: ['Small Breed Skin', 'Omega-3 Salmon Oil'] },
  { l: 'OptiDerma Sensitive Skin', f: 'Puppy Medium Salmon', sz: '12kg', p: 68.0, cr: 32, fat: 20, fib: 2.5, cal: 4050, ap: 82, k: 'High performance puppy salmon growth formula to foster robust skin barriers from weaning', spec: ['Puppy Skin Barrier', 'Salmon Puppy Growth'] },
  { l: 'OptiWeight Weight Management', f: 'All Size Adult Chicken', sz: '14kg', p: 66.0, cr: 27, fat: 9, fib: 9.5, cal: 3200, ap: 72, k: 'Proven to support effective weight loss while preserving lean body muscle mass', spec: ['OptiWeight Calorie Cut', 'Lean Muscle Maintenance'] },
  { l: 'OptiAge Senior Vitality', f: 'Medium & Large 7+ Chicken', sz: '14kg', p: 69.9, cr: 29, fat: 15, fib: 2.5, cal: 3750, ap: 75, k: 'Proprietary blend of medium chain triglycerides proven to enhance brain cognitive function', spec: ['Botanical Oils MCT', 'Cognitive Vitality 7+'] },
  { l: 'OptiPower Performance', f: 'Adult All Breeds Chicken', sz: '14kg', p: 72.0, cr: 30, fat: 21, fib: 2.0, cal: 4190, ap: 80, k: 'Formulated for hunting, working and agility dogs with elevated endurance energy requirements', spec: ['OptiPower Endurance', 'Rapid Muscle Recovery'] },
  { l: 'OptiStart Puppy', f: 'Medium Puppy Chicken', sz: '12kg', p: 64.0, cr: 30, fat: 19, fib: 2.0, cal: 3990, ap: 80, k: 'Colostrum from maternal milk proven to enhance immune response by up to 50%', spec: ['Bovine Colostrum OptiStart', 'Immune Shield'] },
  { l: 'OptiStart Puppy', f: 'Large Athletic Puppy Chicken', sz: '12kg', p: 65.0, cr: 32, fat: 17, fib: 2.0, cal: 3900, ap: 80, k: 'Formulated for large puppies with lean athletic physiques like German Shepherds and Boxers', spec: ['Large Athletic Growth', 'Joint Cartilage Bioactives'] },
  { l: 'Veterinary Diets Clinical', f: 'HA Hypoallergenic Canine', sz: '11kg', p: 88.0, cr: 21, fat: 10, fib: 2.0, cal: 3580, ap: 70, cat: 'Veterinary Clinical' as const, spec: ['Hydrolysed Single Soya', 'Purified Carbohydrate'] },
  { l: 'Veterinary Diets Clinical', f: 'EN Gastrointestinal Canine', sz: '12kg', p: 86.0, cr: 24, fat: 10.5, fib: 2.0, cal: 3600, ap: 70, cat: 'Veterinary Clinical' as const, spec: ['High Digestibility GI', 'Coconut Oil MCTs'] },
  { l: 'Veterinary Diets Clinical', f: 'NF Renal Function Canine', sz: '12kg', p: 87.0, cr: 13, fat: 16, fib: 2.5, cal: 3900, ap: 60, cat: 'Veterinary Clinical' as const, spec: ['Phosphorus Restriction', 'High Caloric Density'] },
  { l: 'Veterinary Diets Clinical', f: 'UR Urinary Canine', sz: '12kg', p: 85.0, cr: 22, fat: 15, fib: 1.5, cal: 3850, ap: 68, cat: 'Veterinary Clinical' as const, spec: ['Struvite Stone Dissolution', 'Urine RSS Reduction'] },
  { l: 'Veterinary Diets Clinical', f: 'JM Joint Mobility Canine', sz: '12kg', p: 89.0, cr: 30, fat: 12, fib: 2.5, cal: 3650, ap: 74, cat: 'Veterinary Clinical' as const, spec: ['High EPA Joint Care', 'Cartilage Protection'] },
  { l: 'Veterinary Diets Clinical', f: 'NC NeuroCare Canine', sz: '12kg', p: 94.0, cr: 30, fat: 15, fib: 2.0, cal: 3880, ap: 75, cat: 'Veterinary Clinical' as const, spec: ['Triglycerides Brain Health', 'Epilepsy & Cognitive Care'] },
  { l: 'Nutrisavour Wet Pouch', f: 'Medium & Large Adult Turkey in Gravy 10x85g', sz: '850g', p: 14.5, cr: 10.5, fat: 4.5, fib: 0.5, cal: 950, ap: 85, tp: 'Wet Food' as const, spec: ['Savory Turkey Gravy', 'Prebiotic Digestion Wet'] },
  { l: 'Nutrisavour Wet Pouch', f: 'Small & Mini Adult Beef in Gravy 10x85g', sz: '850g', p: 14.5, cr: 10.8, fat: 4.8, fib: 0.5, cal: 970, ap: 85, tp: 'Wet Food' as const, spec: ['Tender Beef Gravy', 'Small Breed Pouch'] },
  { l: 'Veterinary Diets Wet Can', f: 'EN Gastrointestinal Wet Can', sz: '400g', p: 4.5, cr: 8.0, fat: 4.5, fib: 1.0, cal: 980, ap: 80, cat: 'Veterinary Clinical' as const, tp: 'Wet Food' as const, spec: ['GI Recovery Wet', 'Electrolyte Replenish'] },
  { l: 'Veterinary Diets Wet Can', f: 'HA Hypoallergenic Wet Can', sz: '400g', p: 4.8, cr: 6.2, fat: 3.5, fib: 1.5, cal: 920, ap: 75, cat: 'Veterinary Clinical' as const, tp: 'Wet Food' as const, spec: ['Hydrolysed Wet Mousse', 'Exclusion Diet Wet'] },
  { l: 'Dentalife Daily Oral Care', f: 'Small Breeds Dental Chew Sticks 7-Pack', sz: '115g', p: 2.4, cr: 7.0, fat: 2.5, fib: 0.7, cal: 2950, ap: 10, tp: 'Dental Chews' as const, spec: ['Porous Chewy Texture', 'Back Teeth Cleanse'] },
  { l: 'Dentalife Daily Oral Care', f: 'Medium Breeds Dental Chew Sticks 5-Pack', sz: '115g', p: 2.4, cr: 7.0, fat: 2.5, fib: 0.7, cal: 2950, ap: 10, tp: 'Dental Chews' as const, spec: ['Ridged Dental Texture', 'Tartar Reduction VOHC'] },
  { l: 'Dentalife Daily Oral Care', f: 'Large Breeds Dental Chew Sticks 4-Pack', sz: '142g', p: 2.6, cr: 7.0, fat: 2.5, fib: 0.7, cal: 2950, ap: 10, tp: 'Dental Chews' as const, spec: ['Large Jaws Chew', 'Deep Gumline Reach'] },
  { l: 'Dentalife ActivFresh', f: 'Small & Mini Bad Breath Sticks 7-Pack', sz: '115g', p: 2.8, cr: 7.0, fat: 2.5, fib: 0.7, cal: 2950, ap: 10, tp: 'Dental Chews' as const, spec: ['Spirulina & Honey', 'Neutralises Bad Breath'] },
  { l: 'Dentalife ActivFresh', f: 'Medium Bad Breath Sticks 5-Pack', sz: '115g', p: 2.8, cr: 7.0, fat: 2.5, fib: 0.7, cal: 2950, ap: 10, tp: 'Dental Chews' as const, spec: ['Active Fresh Breath', 'Natural Honey Flavor'] }
];
proPlanList.forEach(p => {
  specs.push({
    brand: p.l.includes('Dentalife') ? 'Purina Dentalife' : 'Purina Pro Plan', line: p.l, flavor: p.f, type: p.tp || 'Dry Food', category: p.cat || 'Pet Specialty & Holistic', age: p.f.includes('Puppy') ? 'Puppy' : (p.f.includes('7+') ? 'Senior' : 'Adult'), size: p.sz, msrp: p.p, origin: 'France / EU', cert: 'Nestle Purina Quality & Safety Certified', animalProtein: p.ap, summary: p.k || 'Clinically proven Purina molecular nutrition targeting specific metabolic needs.',
    ingredients: ['Chicken/Salmon/Lamb', 'Rice / Maize / Wheat', 'Purina Opti nutrient complex', 'Dried poultry protein', 'Fish oil', 'Colostrum or prebiotics', 'Bentonite / Chicory root', 'Antioxidants'],
    protein: p.cr, fat: p.fat, fiber: p.fib, ash: 6.5, moisture: p.tp === 'Wet Food' ? 76.0 : (p.tp === 'Dental Chews' ? 14.0 : 9.0), kcal: p.cal, allergens: ['Poultry / Fish / Gluten / Soy'], grainFree: false, special: p.spec, officialUrl: 'https://www.purina.gr/brands/pro-plan'
  });
});

// 2. Josera & Bavaro (German Quality) (20 items)
const joseraList = [
  // Josera Super Premium (14)
  { b: 'Josera', l: 'Daily Care', f: 'Festival Adult Salmon with Gravy Powder', sz: '15kg', p: 58.0, cr: 26, fat: 16, fib: 3.0, cal: 3819, ap: 78, k: 'Can be fed dry or mixed with warm water to create a delectable gourmet sauce', spec: ['Water-Mixable Gravy Kibble', 'Salmon & Poultry'] },
  { b: 'Josera', l: 'Special Needs', f: 'Optiness Adult Lamb & Potato', sz: '15kg', p: 59.9, cr: 22, fat: 12, fib: 3.0, cal: 3604, ap: 74, k: 'Reduced protein level eases metabolic organs, delicious potato and lamb recipe', spec: ['Reduced Protein Organ Relief', 'Corn-Free Lamb'] },
  { b: 'Josera', l: 'Nature & Grain-Free', f: 'Ente & Kartoffel (Duck & Potato)', sz: '15kg', p: 64.0, cr: 24, fat: 14, fib: 2.1, cal: 3782, ap: 80, gf: true, k: 'Complete grain-free feed with delicious duck as single animal protein source', spec: ['Single Protein Duck', 'Grain-Free Potato'] },
  { b: 'Josera', l: 'Nature & Grain-Free', f: 'Lachs & Kartoffel (Salmon & Potato)', sz: '15kg', p: 66.0, cr: 22, fat: 14, fib: 2.5, cal: 3737, ap: 80, gf: true, k: 'Pure salmon protein with herbs and fruits for sensitive skin and coat luster', spec: ['Grain-Free Salmon', 'Herbs & Fruits Omega-3'] },
  { b: 'Josera', l: 'Special Needs', f: 'SensiPlus Sensitive Duck & Poultry', sz: '15kg', p: 58.0, cr: 24, fat: 12, fib: 3.0, cal: 3660, ap: 75, k: 'Particularly gentle on sensitive stomachs with selected duck meat and biotin', spec: ['Gentle Stomach SensiPlus', 'Duck & Poultry'] },
  { b: 'Josera', l: 'Performance', f: 'High Energy Active & Working Dog', sz: '15kg', p: 62.0, cr: 30, fat: 21, fib: 2.2, cal: 4122, ap: 82, k: 'High performance feed packed with energy for hunting, rescue and sport dogs', spec: ['30/21 Energy Density', 'Hunting & Working Dogs'] },
  { b: 'Josera', l: 'Senior & Light', f: 'Balance Light & Senior Low Fat', sz: '15kg', p: 54.0, cr: 20, fat: 8, fib: 3.0, cal: 3457, ap: 68, k: 'Low fat content and gentle dietary fiber tailored to older and less active dogs', spec: ['Low Fat 8%', 'Gentle Senior Balance'] },
  { b: 'Josera', l: 'Puppy & Junior', f: 'Kids Medium & Large Breed Junior', sz: '15kg', p: 59.0, cr: 25, fat: 12, fib: 2.5, cal: 3656, ap: 75, k: 'Moderate energy content supports steady growth and sturdy bone structure from 8 weeks', spec: ['Controlled Growth Kids', 'Sturdy Bone Matrix'] },
  { b: 'Josera', l: 'Mini Breeds', f: 'Miniwell Small Adult Poultry', sz: '15kg', p: 59.0, cr: 27, fat: 16, fib: 2.0, cal: 3873, ap: 78, k: 'Small crunchy kibbles with enhanced aroma profile crafted for petite breeds', spec: ['Small Kibble Miniwell', 'Tartar Prevention'] },
  { b: 'Josera', l: 'Mini Breeds', f: 'MiniDeluxe Grain-Free Lamb', sz: '15kg', p: 66.0, cr: 25, fat: 17, fib: 2.2, cal: 3828, ap: 80, gf: true, k: 'Grain-free lamb with vegetables and herbs tailored for spoiled small companions', spec: ['Grain-Free MiniDeluxe', 'Selected Pasture Lamb'] },
  { b: 'Josera', l: 'Meat Lovers Pure Wet', f: 'Pure Beef Wet Can', sz: '800g', p: 3.8, cr: 12, fat: 6, fib: 0.5, cal: 1100, ap: 100, gf: true, tp: 'Wet Food' as const, k: '68% pure meat and delicious offal cuts without added sugar or synthetic flavors', spec: ['Meat Lovers 68% Beef', 'German Jumbo Can 800g'] },
  { b: 'Josera', l: 'Meat Lovers Pure Wet', f: 'Pure Chicken Wet Can', sz: '800g', p: 3.8, cr: 11.5, fat: 6.5, fib: 0.5, cal: 1080, ap: 100, gf: true, tp: 'Wet Food' as const, k: 'Finest chicken muscle meat cuts and giblets steamed in natural meat broth', spec: ['Meat Lovers Pure Poultry', 'Zero Cereals Wet'] },
  { b: 'Josera', l: 'Meat Lovers Pure Wet', f: 'Duck with Pumpkin Wet Can', sz: '800g', p: 3.9, cr: 11.0, fat: 6.0, fib: 0.8, cal: 1050, ap: 100, gf: true, tp: 'Wet Food' as const, k: 'Delicious juicy duck paired with sweet potato and pumpkin in succulent reduction', spec: ['Duck & Pumpkin Wet', 'High Digestibility Wet'] },
  { b: 'Josera', l: 'Loopies Crunchy Snacks', f: 'Crispy Poultry & Carrot Rounds', sz: '150g', p: 2.9, cr: 21, fat: 8, fib: 3.5, cal: 3400, ap: 70, gf: true, tp: 'Treats' as const, k: 'Crisp ring-shaped treats baked with real poultry and garden vegetables, easily broken into pieces', spec: ['Crisp Ring Treats', 'Grain-Free Snacks'] },

  // Bavaro by Josera (Economical & Working) (6)
  { b: 'Bavaro', l: 'Working Dog & Breeder', f: 'Solid 20/8 Working Dog Maintenance', sz: '18kg', p: 36.9, cr: 20, fat: 8, fib: 2.6, cal: 3340, ap: 65, k: 'Bavarian recipe tailored for working dogs with normal activity levels', spec: ['18kg Jumbo Bag', 'Bavarian Breeder Standard'] },
  { b: 'Bavaro', l: 'Working Dog & Breeder', f: 'Task 23/9 Active Guard & Working', sz: '18kg', p: 38.9, cr: 23, fat: 9, fib: 2.7, cal: 3480, ap: 68, k: 'Calibrated protein/fat for hunting and guard dogs in regular active duty', spec: ['18kg Active Task', 'Reliable Energy'] },
  { b: 'Bavaro', l: 'Working Dog & Breeder', f: 'Force 28/16 High Performance Working', sz: '18kg', p: 44.9, cr: 28, fat: 16, fib: 2.0, cal: 3850, ap: 74, k: 'Concentrated nutrition for rescue, military, sport and nursing mother dogs', spec: ['18kg High Energy Force', 'Maximum Stamina 28/16'] },
  { b: 'Bavaro', l: 'Working Dog & Breeder', f: 'Junior 22/10 Growth Line', sz: '18kg', p: 41.9, cr: 22, fat: 10, fib: 2.3, cal: 3550, ap: 70, k: 'Optimal formula for rearing young dogs from 2 months of age up to adulthood', spec: ['18kg Puppy Breeder Junior', 'Strong Bone Frame'] },
  { b: 'Bavaro', l: 'Working Dog & Breeder', f: 'Power 32/20 Extreme Energy Dog', sz: '18kg', p: 47.9, cr: 32, fat: 20, fib: 1.8, cal: 4050, ap: 78, k: 'Maximum endurance and caloric power for demanding working dogs in cold environments', spec: ['18kg Extreme Power 32/20', 'Cold Climate Endurance'] },
  { b: 'Bavaro', l: 'Special Breeder Cans', f: 'Game & Poultry Terrine Wet Can', sz: '1240g', p: 3.9, cr: 7.5, fat: 4.5, fib: 0.5, cal: 950, ap: 75, tp: 'Wet Food' as const, k: 'Huge 1.24kg can providing economical, wholesome meat hydration for kennels and multiple dogs', spec: ['1240g Giant Kennel Can', 'Game & Poultry Terrine'] }
];
joseraList.forEach(j => {
  specs.push({
    brand: j.b, line: j.l, flavor: j.f, type: j.tp || 'Dry Food', category: j.b === 'Bavaro' ? 'Commercial & Aggregator (Skroutz/BestPrice)' : 'Pet Specialty & Holistic', age: j.f.includes('Junior') || j.f.includes('Puppy') || j.f.includes('Kids') ? 'Puppy' : 'Adult', size: j.sz, msrp: j.p, origin: 'Germany', cert: 'DLG Certified Quality (Bavaria, Germany)', animalProtein: j.ap, summary: j.k,
    ingredients: ['Poultry meat meal / Duck / Salmon', 'Corn / Rice / Potato', 'Poultry fat', 'Beet fiber', 'Hydrolysed poultry protein', 'Minerals', 'Ground chicory root (natural source of inulin)', 'Dried meat from New Zealand green-lipped mussel'],
    protein: j.cr, fat: j.fat, fiber: j.fib, ash: 6.8, moisture: j.tp === 'Wet Food' ? 78.0 : 9.5, kcal: j.cal, allergens: ['Poultry / Duck / Salmon'], grainFree: j.gf || false, special: j.spec, officialUrl: 'https://www.josera.com'
  });
});

// 3. Eukanuba & Advance (22 items)
const eukAdvList = [
  // Eukanuba (11)
  { b: 'Eukanuba', l: 'Daily Care', f: 'Sensitive Digestion Adult Chicken & Rice', sz: '12kg', p: 58.0, cr: 24, fat: 14, fib: 2.2, cal: 3750, ap: 74, k: 'Contains prebiotics FOS and butyrate to support digestion and gut barrier integrity', spec: ['DentaDefense Technology', 'Sensitive Digestion'] },
  { b: 'Eukanuba', l: 'Daily Care', f: 'Sensitive Skin Adult Rich in Fish', sz: '12kg', p: 62.0, cr: 23, fat: 13, fib: 2.0, cal: 3680, ap: 76, k: 'Formulated with ocean fish and vitamin-rich linseed to promote soft skin and reduce flaking', spec: ['Ocean Fish Hypoallergenic', 'Coat Vitality'] },
  { b: 'Eukanuba', l: 'Daily Care', f: 'Weight Control Medium Adult Chicken', sz: '12kg', p: 57.0, cr: 21, fat: 9, fib: 2.8, cal: 3340, ap: 70, k: '30% less fat than standard maintenance formula, enriched with L-carnitine to burn fat', spec: ['30% Less Fat', 'L-Carnitine Metabolism'] },
  { b: 'Eukanuba', l: 'Breed Specific', f: 'German Shepherd Adult Chicken', sz: '12kg', p: 64.0, cr: 23, fat: 13, fib: 2.1, cal: 3690, ap: 75, k: 'Extra glucosamine and chondroitin sulfate for hip joint support, optimal fiber for digestion', spec: ['GSD Hip Joint Matrix', 'DentaDefense Hexagonal Kibble'] },
  { b: 'Eukanuba', l: 'Breed Specific', f: 'Golden Retriever Adult Chicken', sz: '12kg', p: 64.0, cr: 26, fat: 13, fib: 2.5, cal: 3720, ap: 75, k: 'Natural taurine and L-carnitine for cardiac vigor, rich in fish oil for glossy double coat', spec: ['Retriever Cardiac Tone', 'Water-Repellent Coat'] },
  { b: 'Eukanuba', l: 'Breed Specific', f: 'Labrador Retriever Adult Chicken', sz: '12kg', p: 64.0, cr: 23, fat: 13, fib: 2.8, cal: 3680, ap: 75, k: 'Weight management nutrients to prevent common Labrador obesity while maintaining muscle', spec: ['Labrador Weight Guard', 'Joint Cartilage Nutrition'] },
  { b: 'Eukanuba', l: 'Life Stage', f: 'Medium Breed Puppy Chicken', sz: '15kg', p: 66.0, cr: 29, fat: 18, fib: 2.1, cal: 3980, ap: 80, k: 'DHA proven to help puppies learn and be more trainable, customized energy density', spec: ['Puppy Smart DHA', 'Hexagonal Clean Kibble'] },
  { b: 'Eukanuba', l: 'Life Stage', f: 'Large Breed Puppy Chicken', sz: '15kg', p: 66.0, cr: 26, fat: 14, fib: 2.3, cal: 3750, ap: 78, k: 'Calcium and phosphorus balance for steady growth, low fat to prevent excess stress on joints', spec: ['Large Pup Skeletal Care', 'Controlled Energy'] },
  { b: 'Eukanuba', l: 'Life Stage', f: 'Senior Medium Breed Chicken', sz: '15kg', p: 64.0, cr: 27, fat: 12, fib: 2.4, cal: 3590, ap: 72, k: 'Antioxidants vitamins E and C to support immune system, tailored energy for active seniors', spec: ['Senior Immune Defense', 'Gentle Dental Hexagons'] },
  { b: 'Eukanuba', l: 'Veterinary Diets', f: 'Intestinal Adult Canine', sz: '12kg', p: 79.9, cr: 23, fat: 10, fib: 1.9, cal: 3500, ap: 72, cat: 'Veterinary Clinical' as const, spec: ['Veterinary Intestinal', 'MOS & Beet Fiber'] },
  { b: 'Eukanuba', l: 'Veterinary Diets', f: 'Dermatosis FP Response Canine', sz: '12kg', p: 84.0, cr: 22, fat: 15, fib: 1.8, cal: 3780, ap: 74, cat: 'Veterinary Clinical' as const, spec: ['Fish & Potato FP', 'Inflammatory Pruritus Relief'] },

  // Advance (Affinity Petcare) (11)
  { b: 'Advance', l: 'Veterinary Diets', f: 'Atopic Care Medium & Maxi Trout', sz: '12kg', p: 84.0, cr: 25, fat: 17, fib: 3.2, cal: 3880, ap: 76, cat: 'Veterinary Clinical' as const, spec: ['Atopic Dermatitis Care', 'Trout & Aloe Vera'] },
  { b: 'Advance', l: 'Veterinary Diets', f: 'Gastroenteric Low Fat Canine', sz: '12kg', p: 82.0, cr: 24, fat: 10.5, fib: 2.0, cal: 3620, ap: 74, cat: 'Veterinary Clinical' as const, spec: ['Low Fat GI', 'Plasma Protein Immunity'] },
  { b: 'Advance', l: 'Veterinary Diets', f: 'Urinary Canine Struvite Care', sz: '12kg', p: 81.0, cr: 22, fat: 15, fib: 2.0, cal: 3850, ap: 70, cat: 'Veterinary Clinical' as const, spec: ['Struvite Urinary Care', 'Acidifying Formula'] },
  { b: 'Advance', l: 'Veterinary Diets', f: 'Articular Care Canine Mobility', sz: '12kg', p: 85.0, cr: 28, fat: 15, fib: 3.5, cal: 3750, ap: 75, cat: 'Veterinary Clinical' as const, spec: ['Hyaluronic Acid Mobility', 'Bioactive Collagen'] },
  { b: 'Advance', l: 'Special Needs', f: 'Sensitive Medium & Maxi Lamb & Rice', sz: '14kg', p: 66.0, cr: 26, fat: 16, fib: 2.5, cal: 3830, ap: 75, spec: ['Monoprotein Lamb', 'Active Immunoglobulins'] },
  { b: 'Advance', l: 'Special Needs', f: 'Sensitive Mini Salmon & Rice', sz: '7.5kg', p: 44.0, cr: 27, fat: 18, fib: 2.0, cal: 3950, ap: 78, spec: ['Mini Salmon Bites', 'Omega-3 Skin Relief'] },
  { b: 'Advance', l: 'Breed Specific', f: 'French Bulldog Adult Chicken & Apple', sz: '9kg', p: 58.0, cr: 24, fat: 17, fib: 2.0, cal: 3890, ap: 75, spec: ['Frenchie Spine & Breath', 'Collagen Hydrolysate'] },
  { b: 'Advance', l: 'Breed Specific', f: 'German Shepherd Adult Turkey & Rice', sz: '12kg', p: 69.0, cr: 26, fat: 13, fib: 2.5, cal: 3700, ap: 75, spec: ['GSD Digestion Advance', 'Glucosamine Joint Support'] },
  { b: 'Advance', l: 'Puppy Growth', f: 'Medium Puppy Chicken & Rice', sz: '14kg', p: 64.0, cr: 29, fat: 19, fib: 2.0, cal: 4000, ap: 80, spec: ['Nucleotides Growth', 'Optimum Calcium Ratio'] },
  { b: 'Advance', l: 'Adult Everyday', f: 'Medium Adult Chicken & Rice', sz: '14kg', p: 59.9, cr: 26, fat: 16, fib: 2.2, cal: 3840, ap: 75, spec: ['Active Defense Formula', 'Chicken & Rice Everyday'] },
  { b: 'Advance', l: 'Dental Care', f: 'Dental Care Stick Medium Breeds 28-Pack', sz: '720g', p: 12.9, cr: 8.0, fat: 3.0, fib: 1.5, cal: 3000, ap: 15, tp: 'Dental Chews' as const, spec: ['Mechanical Tartar Scraping', 'Sodium Pyrophosphate'] }
];
eukAdvList.forEach(e => {
  specs.push({
    brand: e.b, line: e.l, flavor: e.f, type: e.tp || 'Dry Food', category: e.cat || 'Pet Specialty & Holistic', age: e.f.includes('Puppy') ? 'Puppy' : (e.f.includes('Senior') ? 'Senior' : 'Adult'), size: e.sz, msrp: e.p, origin: e.b === 'Eukanuba' ? 'Netherlands' : 'Spain', cert: `${e.b} Global Veterinary & Nutrition ISO Audit`, animalProtein: e.ap, summary: e.k || 'High precision veterinary-developed diet with active immunoglobulins and dental care technology.',
    ingredients: ['Fresh / Dried poultry or lamb or salmon', 'Rice / Corn / Wheat', 'Animal fats', 'Active immunoglobulins', 'Hydrolysed animal proteins', 'Beet pulp', 'Fish oil', 'Inulin prebiotics', 'Essential vitamins'],
    protein: e.cr, fat: e.fat, fiber: e.fib, ash: 6.8, moisture: e.tp === 'Dental Chews' ? 14.0 : 9.0, kcal: e.cal, allergens: ['Poultry / Lamb / Fish / Gluten'], grainFree: false, special: e.spec, officialUrl: e.b === 'Eukanuba' ? 'https://www.eukanuba.gr' : 'https://www.advance-affinity.com'
  });
});

// 4. Belcando & Nature's Protection & Reflex Plus (29 items)
const bnrList = [
  // Belcando (15)
  { b: 'Belcando', l: 'Mastercraft Holistic', f: 'Fresh Beef Adult Holistic', sz: '10kg', p: 79.0, cr: 27, fat: 15, fib: 3.3, cal: 3780, ap: 85, gf: true, k: '80% fresh muscle beef, chlorella algae, sea buckthorn and amaranth, zero meat meals', spec: ['80% Fresh Beef', 'Zero Meat Meals Mastercraft'] },
  { b: 'Belcando', l: 'Mastercraft Holistic', f: 'Fresh Salmon Adult Holistic', sz: '10kg', p: 82.0, cr: 27, fat: 15, fib: 3.3, cal: 3790, ap: 85, gf: true, k: '80% fresh salmon with superfood berries and amaranth for radiant skin and hair', spec: ['80% Fresh Salmon', 'Superfood Berries'] },
  { b: 'Belcando', l: 'Finest Selection', f: 'Finest GF Lamb Small & Medium Breeds', sz: '12.5kg', p: 69.9, cr: 25, fat: 14.5, fib: 3.7, cal: 3670, ap: 80, gf: true, k: 'Grain-free lamb with amaranth, chia seed and sauce effect when moistened', spec: ['Sauce Effect Kibble', 'Chia Seed Superfood'] },
  { b: 'Belcando', l: 'Finest Selection', f: 'Finest Croc Small & Medium Breeds', sz: '12.5kg', p: 66.0, cr: 29, fat: 20, fib: 3.2, cal: 4050, ap: 80, gf: false, k: 'Duck and poultry with cold-pressed grape seed flour to support cardiovascular health', spec: ['Grape Seed Proanthocyanidins', 'Sauce Effect Water Mix'] },
  { b: 'Belcando', l: 'Classic Super Premium', f: 'Adult Dinner Poultry & Potato', sz: '15kg', p: 64.0, cr: 23, fat: 10.5, fib: 3.4, cal: 3500, ap: 75, gf: false, k: 'Controlled energy formula with poultry and carob flour for dogs with normal activity', spec: ['Carob Flour Digestion', 'Holistic Classic German'] },
  { b: 'Belcando', l: 'Classic Super Premium', f: 'Adult Multi-Croc Crispy Croquettes', sz: '15kg', p: 62.0, cr: 24, fat: 11, fib: 3.0, cal: 3550, ap: 72, gf: false, k: 'Crispy noodle and vegetable chips with poultry sauce, high palatability for picky dogs', spec: ['Crispy Noodle Chips', 'Tasty Poultry Sauce'] },
  { b: 'Belcando', l: 'Classic Super Premium', f: 'Adult Power Active Working', sz: '15kg', p: 69.9, cr: 29.5, fat: 20.5, fib: 2.6, cal: 4090, ap: 82, gf: false, k: 'Specially designed for working, agility, hunting and nursing dogs with exceptional stamina', spec: ['Stamina Power 29.5/20.5', 'Cold-Pressed Grape Flour'] },
  { b: 'Belcando', l: 'Grain-Free Line', f: 'Adult GF Beef Medium & Maxi', sz: '12.5kg', p: 69.0, cr: 24, fat: 14, fib: 3.5, cal: 3650, ap: 80, gf: true, k: 'Fresh beef with amaranth replacing grains, perfect for gluten and cereal allergic dogs', spec: ['Grain-Free Beef', 'Amaranth Superfood'] },
  { b: 'Belcando', l: 'Junior & Puppy', f: 'Junior Maxi Large Breed Growth', sz: '12.5kg', p: 68.0, cr: 24.5, fat: 13, fib: 2.8, cal: 3640, ap: 78, gf: false, k: 'Slow growth formula with carob and chia seeds preventing rapid bone lengthening in large pups', spec: ['Slow Steady Growth', 'Chia Seed Bioactives'] },
  { b: 'Belcando', l: 'Junior & Puppy', f: 'Puppy Gravy Weaning & Growth', sz: '12.5kg', p: 71.0, cr: 29, fat: 17, fib: 2.0, cal: 3930, ap: 82, gf: false, k: 'Easily forms a smooth milk-like porridge with warm water for weaning young pups', spec: ['Weaning Porridge Gravy', 'Egg & Poultry Rich'] },
  { b: 'Belcando', l: 'Super Premium Wet Can', f: 'Single Protein Beef Wet Can', sz: '800g', p: 4.2, cr: 12, fat: 7, fib: 0.4, cal: 1150, ap: 100, gf: true, tp: 'Wet Food' as const, k: '100% German butcher-cut beef muscle and organs gently steam-cooked in the can', spec: ['100% Butcher Cut Beef', '800g German Can'] },
  { b: 'Belcando', l: 'Super Premium Wet Can', f: 'Duck with Sweet Potato Wet Can', sz: '800g', p: 4.4, cr: 11, fat: 6, fib: 0.5, cal: 1080, ap: 100, gf: true, tp: 'Wet Food' as const, k: 'Juicy duck meat and heart cuts with sweet potatoes and safflower oil', spec: ['Duck & Safflower Oil', 'Steam-Cooked Gourmet Wet'] },
  { b: 'Belcando', l: 'Super Premium Wet Can', f: 'Salmon with Amaranth Wet Can', sz: '800g', p: 4.5, cr: 10.5, fat: 6.5, fib: 0.5, cal: 1100, ap: 100, gf: true, tp: 'Wet Food' as const, k: 'Fresh Atlantic salmon chunks with gluten-free amaranth and zucchini', spec: ['Atlantic Salmon Wet', 'Amaranth & Zucchini'] },
  { b: 'Belcando', l: 'Single Protein Wet Pouch', f: 'Mastercraft Pouch Fresh Turkey 6x300g', sz: '1.8kg', p: 18.0, cr: 11, fat: 6, fib: 0.5, cal: 1060, ap: 95, gf: true, tp: 'Wet Food' as const, k: 'Human-grade turkey meat cooked gently in rich broth with carrots and chia seeds', spec: ['Mastercraft Fresh Turkey Pouch', 'Gentle Broth Cooking'] },
  { b: 'Belcando', l: 'Single Protein Wet Pouch', f: 'Mastercraft Pouch Fresh Duck 6x300g', sz: '1.8kg', p: 18.5, cr: 11, fat: 6, fib: 0.5, cal: 1080, ap: 95, gf: true, tp: 'Wet Food' as const, k: 'Tender fresh duck chunks with forest lingonberries for superior taste and urinary health', spec: ['Fresh Duck Pouch', 'Lingonberry Antioxidants'] },

  // Nature's Protection & Reflex Plus (14)
  { b: "Nature's Protection", l: 'Superior Care White Dogs', f: 'Grain-Free Lamb Adult Small & Mini', sz: '10kg', p: 76.0, cr: 25, fat: 15, fib: 3.5, cal: 3560, ap: 80, gf: true, k: 'MicroZeoGen volcanic mineral and hypoallergenic lamb prevent tear stains around eyes', spec: ['Tear Stains Prevention', 'MicroZeoGen Volcanic Detox'] },
  { b: "Nature's Protection", l: 'Superior Care White Dogs', f: 'Grain-Free White Fish Junior Small', sz: '10kg', p: 78.0, cr: 27, fat: 16, fib: 3.0, cal: 3650, ap: 82, gf: true, k: 'White fish protein growth formula preventing brown salivary tears in growing white puppies', spec: ['Junior White Dogs', 'White Fish Cleanse'] },
  { b: "Nature's Protection", l: 'Superior Care Red Coat', f: 'Grain-Free Salmon Adult All Breeds', sz: '10kg', p: 77.0, cr: 26, fat: 15, fib: 3.5, cal: 3600, ap: 80, gf: true, k: 'Enhances red and copper hair pigment using marine crustaceans and natural astaxanthin', spec: ['Red Coat Astaxanthin', 'Glossy Copper Fur'] },
  { b: "Nature's Protection", l: 'Superior Care Black Coat', f: 'Grain-Free Poultry Adult All Breeds', sz: '10kg', p: 76.0, cr: 26, fat: 15, fib: 3.5, cal: 3600, ap: 80, gf: true, k: 'Balanced amino acids to keep black and dark coats deep black without brownish tint', spec: ['Black Coat Deep Pigment', 'MicroZeoGen Protection'] },
  { b: "Nature's Protection", l: 'Lifestyle Grain-Free', f: 'Salmon with Krill Adult All Breeds', sz: '12kg', p: 68.0, cr: 25, fat: 15, fib: 3.5, cal: 3620, ap: 80, gf: true, k: '100% Antarctic krill and Atlantic salmon for pure Omega-3 fatty acids and heart vitality', spec: ['100% Antarctic Krill', 'Marine Omega-3 Vitality'] },
  { b: "Nature's Protection", l: 'Lifestyle Grain-Free', f: 'Trout with Salmon Puppy All Breeds', sz: '12kg', p: 72.0, cr: 27, fat: 16, fib: 3.0, cal: 3700, ap: 82, gf: true, k: 'Freshwater trout and salmon growth formula free of grain, corn and soy', spec: ['Grain-Free Trout Puppy', 'Optimal Neural Growth'] },
  { b: "Nature's Protection", l: 'Special Needs Wet', f: 'White Dogs Salmon Wet Can', sz: '400g', p: 3.8, cr: 10, fat: 6, fib: 0.5, cal: 1050, ap: 90, gf: true, tp: 'Wet Food' as const, k: 'Steamed salmon wet formula formulated to protect clear eyesight and tear stain free face', spec: ['White Dogs Wet Can', 'Tear Stain Wet Defense'] },

  // Reflex Plus (7)
  { b: 'Reflex Plus', l: 'Super Premium Dry', f: 'Adult Medium & Large Lamb & Rice', sz: '15kg', p: 44.9, cr: 26, fat: 15, fib: 2.5, cal: 3740, ap: 70, gf: false, k: 'Super-prebiotic XOS (xylo-oligosaccharides) with lamb protein and glucosamine', spec: ['XOS Super Prebiotics', 'High Value Greek Favorite'] },
  { b: 'Reflex Plus', l: 'Super Premium Dry', f: 'Adult Small & Mini Lamb & Rice', sz: '15kg', p: 45.9, cr: 27, fat: 16, fib: 2.5, cal: 3790, ap: 72, gf: false, k: 'Tailored small kibble with XOS prebiotics and brewer yeast for energetic petite dogs', spec: ['Small Kibble XOS', 'Brewer Yeast Coat'] },
  { b: 'Reflex Plus', l: 'Super Premium Dry', f: 'Junior Medium & Large Lamb & Rice', sz: '15kg', p: 46.9, cr: 28, fat: 16, fib: 2.5, cal: 3820, ap: 74, gf: false, k: 'Growth formula for large breed puppies with chondroitin, glucosamine and balanced calcium', spec: ['Puppy Lamb XOS', 'Joint Matrix Chondroitin'] },
  { b: 'Reflex Plus', l: 'Super Premium Dry', f: 'Adult Medium & Large Chicken', sz: '15kg', p: 42.9, cr: 26, fat: 15, fib: 2.5, cal: 3740, ap: 70, gf: false, k: 'Dehydrated chicken protein with omega flaxseed and Yucca schidigera extract', spec: ['Chicken & Flaxseed', 'Odor Control Yucca'] },
  { b: 'Reflex Plus', l: 'Super Premium Dry', f: 'Mother & Baby Lamb & Rice', sz: '15kg', p: 49.9, cr: 30, fat: 18, fib: 2.0, cal: 3950, ap: 78, gf: false, k: 'High energy density designed for pregnant or lactating mother dogs and weaning pups', spec: ['Mother & Baby High Energy', 'Rapid Weaning Adaptation'] },
  { b: 'Reflex Plus', l: 'Super Premium Wet Can', f: 'Lamb & Rice Wet Can Chunks', sz: '400g', p: 2.2, cr: 8.5, fat: 5.0, fib: 0.5, cal: 960, ap: 80, gf: false, tp: 'Wet Food' as const, k: 'Succulent lamb chunks in tasty sauce enriched with zinc and essential vitamins', spec: ['Lamb Chunks Wet', 'Everyday Wet Value'] },
  { b: 'Reflex Plus', l: 'Super Premium Wet Can', f: 'Beef & Heart Wet Can Chunks', sz: '400g', p: 2.2, cr: 8.5, fat: 5.0, fib: 0.5, cal: 960, ap: 80, gf: false, tp: 'Wet Food' as const, k: 'Hearty beef cuts and offal in rich gravy, provides complete hydration and taste', spec: ['Beef & Heart Wet Chunks', 'Affordable Superpremium Wet'] }
];
bnrList.forEach(item => {
  specs.push({
    brand: item.b, line: item.l, flavor: item.f, type: item.tp || 'Dry Food', category: item.b === 'Reflex Plus' ? 'Commercial & Aggregator (Skroutz/BestPrice)' : 'Pet Specialty & Holistic', age: item.f.includes('Junior') || item.f.includes('Puppy') ? 'Puppy' : 'Adult', size: item.sz, msrp: item.p, origin: item.b === 'Belcando' ? 'Germany' : (item.b === 'Reflex Plus' ? 'Turkey / EU' : 'Lithuania'), cert: `${item.b} EU Manufacturing Audit Certified`, animalProtein: item.ap, summary: item.k,
    ingredients: ['Dehydrated or fresh meat (beef/lamb/salmon/duck)', 'Amaranth / Potato / Rice / Corn', 'Poultry fat', 'Fish oil', 'Prebiotics (XOS/FOS)', 'Yucca extract', 'Minerals and vitamins'],
    protein: item.cr, fat: item.fat, fiber: item.fib, ash: 7.0, moisture: item.tp === 'Wet Food' ? 78.0 : 9.0, kcal: item.cal, allergens: ['Poultry / Lamb / Fish / Beef'], grainFree: item.gf || false, special: item.spec, officialUrl: 'https://www.skroutz.gr'
  });
});

// 5. Greek Supermarkets & Private Labels (Sklavenitis BARRON, AB Vassilopoulos, Lidl, My Market, Masoutis) (24 items)
const superList = [
  // Sklavenitis BARRON (6)
  { b: 'BARRON (Σκλαβενίτης)', l: 'Everyday Croquettes', f: 'Adult Beef & Vegetables Croquettes', sz: '10kg', p: 14.90, cr: 21.0, fat: 9.0, fib: 3.5, cal: 3380, ap: 25, cat: 'Supermarket Generic' as const, ret: ['Σκλαβενίτης (Sklavenitis Supermarket)'], k: 'Everyday maintenance croquettes with beef and dried garden vegetables sold at Sklavenitis', spec: ['Sklavenitis Exclusive BARRON', 'Value Everyday Beef'] },
  { b: 'BARRON (Σκλαβενίτης)', l: 'Everyday Croquettes', f: 'Adult Chicken & Rice Croquettes', sz: '10kg', p: 14.90, cr: 21.0, fat: 9.0, fib: 3.5, cal: 3380, ap: 25, cat: 'Supermarket Generic' as const, ret: ['Σκλαβενίτης (Sklavenitis Supermarket)'], k: 'Balanced croquettes with chicken derivatives and rice grains for all adult breeds', spec: ['Chicken & Rice Value', 'Sklavenitis Direct'] },
  { b: 'BARRON (Σκλαβενίτης)', l: 'Everyday Cans', f: 'Beef Pâté Adult Dog Can', sz: '1240g', p: 2.45, cr: 7.0, fat: 4.0, fib: 0.5, cal: 880, ap: 40, cat: 'Supermarket Generic' as const, tp: 'Wet Food' as const, ret: ['Σκλαβενίτης (Sklavenitis Supermarket)'], k: 'Jumbo 1.24kg beef pate can providing affordable daily hydration for hungry dogs', spec: ['1240g Sklavenitis Jumbo Can', 'Economical Daily Wet'] },
  { b: 'BARRON (Σκλαβενίτης)', l: 'Everyday Cans', f: 'Chicken & Turkey Loaf Adult Can', sz: '1240g', p: 2.45, cr: 7.0, fat: 4.0, fib: 0.5, cal: 880, ap: 40, cat: 'Supermarket Generic' as const, tp: 'Wet Food' as const, ret: ['Σκλαβενίτης (Sklavenitis Supermarket)'], k: 'Poultry meat cuts and derivatives blended with essential minerals and vitamins', spec: ['Poultry Loaf Jumbo Can', 'Sklavenitis Pantry'] },
  { b: 'BARRON (Σκλαβενίτης)', l: 'Gourmet Pouches', f: 'Chunks in Gravy Beef & Lamb 4x100g', sz: '400g', p: 1.85, cr: 8.0, fat: 4.5, fib: 0.5, cal: 920, ap: 45, cat: 'Supermarket Generic' as const, tp: 'Wet Food' as const, ret: ['Σκλαβενίτης (Sklavenitis Supermarket)'], k: 'Tender chunks in rich sauce portioned in individual pouches for fresh serving', spec: ['4-Pack Fresh Pouches', 'Gravy Chunks Sklavenitis'] },
  { b: 'BARRON (Σκλαβενίτης)', l: 'Dental Snack', f: 'Dental Sticks with Chlorophyll 7-Pack', sz: '180g', p: 1.95, cr: 8.0, fat: 2.0, fib: 1.0, cal: 2900, ap: 15, cat: 'Supermarket Generic' as const, tp: 'Dental Chews' as const, ret: ['Σκλαβενίτης (Sklavenitis Supermarket)'], k: 'Daily dental chew sticks infused with chlorophyll to combat tartar and fresh breath', spec: ['Chlorophyll Breath Care', 'Everyday Dental Stick'] },

  // AB Vassilopoulos (JUMP & Loved by Pets) (6)
  { b: 'Loved by Pets (ΑΒ Βασιλόπουλος)', l: 'Premium Line', f: 'Adult Medium & Large Chicken & Rice', sz: '10kg', p: 18.50, cr: 24.0, fat: 12.0, fib: 3.0, cal: 3550, ap: 45, cat: 'Supermarket Generic' as const, ret: ['ΑΒ Βασιλόπουλος (AB Supermarkets)'], k: 'AB premium private label with 24% protein, omega fatty acids and prebiotics', spec: ['AB Supermarket Premium', 'Chicken & Rice 24%'] },
  { b: 'Loved by Pets (ΑΒ Βασιλόπουλος)', l: 'Premium Line', f: 'Adult Sensitive Lamb & Rice', sz: '10kg', p: 19.90, cr: 23.0, fat: 11.5, fib: 3.2, cal: 3500, ap: 45, cat: 'Supermarket Generic' as const, ret: ['ΑΒ Βασιλόπουλος (AB Supermarkets)'], k: 'Lamb based formula with prebiotic beet pulp to soothe sensitive digestive systems', spec: ['AB Sensitive Lamb', 'Prebiotic Beet Pulp'] },
  { b: 'JUMP (ΑΒ Βασιλόπουλος)', l: 'Value Line', f: 'Mix Croquettes Beef, Poultry & Cereals', sz: '10kg', p: 13.90, cr: 20.0, fat: 8.5, fib: 3.5, cal: 3350, ap: 22, cat: 'Supermarket Generic' as const, ret: ['ΑΒ Βασιλόπουλος (AB Supermarkets)'], k: 'Economical blend of crispy kibbles with vitamins A, D3 and E for active dogs', spec: ['AB Value Jump', 'Multi-Meat Mix'] },
  { b: 'JUMP (ΑΒ Βασιλόπουλος)', l: 'Value Cans', f: 'Chunks in Gravy with Beef Can', sz: '1240g', p: 2.35, cr: 7.0, fat: 4.0, fib: 0.5, cal: 880, ap: 35, cat: 'Supermarket Generic' as const, tp: 'Wet Food' as const, ret: ['ΑΒ Βασιλόπουλος (AB Supermarkets)'], k: 'Generous 1.24kg can with juicy beef chunks in brown gravy, everyday hydration', spec: ['1240g Jumbo Can AB', 'Juicy Gravy Chunks'] },
  { b: 'Loved by Pets (ΑΒ Βασιλόπουλος)', l: 'Gourmet Trays', f: 'Pâté with Chicken & Vegetables 300g', sz: '300g', p: 1.15, cr: 9.0, fat: 5.0, fib: 0.5, cal: 980, ap: 60, cat: 'Supermarket Generic' as const, tp: 'Wet Food' as const, ret: ['ΑΒ Βασιλόπουλος (AB Supermarkets)'], k: 'Oven-baked pate with tender chicken cuts, peas and carrots in practical alu-tray', spec: ['Alu-Tray Gourmet', 'Chicken & Vegetables Pate'] },
  { b: 'Loved by Pets (ΑΒ Βασιλόπουλος)', l: 'Treats', f: 'Chicken Fillet Strips 100g', sz: '100g', p: 2.45, cr: 55.0, fat: 2.5, fib: 1.0, cal: 3200, ap: 90, cat: 'Supermarket Generic' as const, tp: 'Treats' as const, ret: ['ΑΒ Βασιλόπουλος (AB Supermarkets)'], k: 'Real dried chicken breast strips, high protein reward treat with under 3% fat', spec: ['Real Chicken Fillets', 'High Protein Low Fat'] },

  // Lidl Hellas (Orlando & Bellosan) (6)
  { b: 'Orlando (Lidl Hellas)', l: 'Gourmet Special', f: 'Adult Beef & Herbs Croquettes', sz: '10kg', p: 15.49, cr: 23.0, fat: 10.0, fib: 3.0, cal: 3450, ap: 35, cat: 'Supermarket Generic' as const, ret: ['Lidl Hellas Nationwide'], k: 'Formulated with beef, wholesome herbs and zinc for shiny coat, sold across all Lidl Greece stores', spec: ['Lidl Hellas Exclusive', 'Gourmet Beef & Herbs'] },
  { b: 'Orlando (Lidl Hellas)', l: 'Gourmet Special', f: 'Adult Poultry & Vegetable Croquettes', sz: '10kg', p: 15.49, cr: 23.0, fat: 10.0, fib: 3.0, cal: 3450, ap: 35, cat: 'Supermarket Generic' as const, ret: ['Lidl Hellas Nationwide'], k: 'Selected poultry meal with peas, carrots and essential trace elements', spec: ['Lidl Poultry & Veg', 'Balanced Daily Vitamin'] },
  { b: 'Orlando (Lidl Hellas)', l: 'Pure Taste Wet', f: 'Gourmet Terrine with Beef & Turkey 400g', sz: '400g', p: 1.19, cr: 9.5, fat: 5.5, fib: 0.5, cal: 1020, ap: 70, cat: 'Supermarket Generic' as const, tp: 'Wet Food' as const, ret: ['Lidl Hellas Nationwide'], k: 'Pure meat terrine with steam-cooked beef and turkey, zero added sugar and zero wheat', spec: ['Lidl Pure Taste Terrine', 'Zero Added Sugar'] },
  { b: 'Orlando (Lidl Hellas)', l: 'Pure Taste Wet', f: 'Chunks in Jelly with Lamb & Chicken 1240g', sz: '1240g', p: 2.19, cr: 7.5, fat: 4.5, fib: 0.5, cal: 900, ap: 50, cat: 'Supermarket Generic' as const, tp: 'Wet Food' as const, ret: ['Lidl Hellas Nationwide'], k: 'Jumbo 1.24kg can with succulent meat chunks encased in tasty jelly', spec: ['1240g Lidl Jumbo Can', 'Lamb & Chicken Jelly'] },
  { b: 'Bellosan (Lidl Hellas)', l: 'Budget Line', f: 'Adult Dry Croquettes Multi-Meat', sz: '10kg', p: 11.99, cr: 19.5, fat: 8.0, fib: 3.5, cal: 3300, ap: 20, cat: 'Supermarket Generic' as const, ret: ['Lidl Hellas Nationwide'], k: 'Ultra-economical maintenance kibbles with cereals and meat derivatives', spec: ['Lidl Budget Bellosan', 'Maximum Economy Value'] },
  { b: 'Orlando (Lidl Hellas)', l: 'Dental Care', f: 'Dental Sticks Medium Dogs 7-Pack', sz: '180g', p: 1.69, cr: 8.0, fat: 2.0, fib: 1.0, cal: 2900, ap: 15, cat: 'Supermarket Generic' as const, tp: 'Dental Chews' as const, ret: ['Lidl Hellas Nationwide'], k: 'Star-shaped dental chew sticks promoting daily mechanical tartar removal', spec: ['Lidl Star Dental Sticks', 'Tartar Scrubbing'] },

  // My Market & Masoutis (6)
  { b: 'My Gusto (My Market)', l: 'Private Label', f: 'Adult Beef & Vegetable Croquettes', sz: '10kg', p: 16.90, cr: 22.0, fat: 10.0, fib: 3.2, cal: 3420, ap: 30, cat: 'Supermarket Generic' as const, ret: ['My Market Supermarkets', 'mymarket.gr'], k: 'Complete adult maintenance food with dried beef and vegetables produced for My Market stores', spec: ['My Market Exclusive', 'Everyday Beef Value'] },
  { b: 'My Gusto (My Market)', l: 'Private Label Cans', f: 'Pâté with Beef & Liver Can 400g', sz: '400g', p: 1.09, cr: 8.0, fat: 5.0, fib: 0.5, cal: 950, ap: 55, cat: 'Supermarket Generic' as const, tp: 'Wet Food' as const, ret: ['My Market Supermarkets', 'mymarket.gr'], k: 'Fine beef and liver pate with added vitamins D3 and E for health and vitality', spec: ['Beef & Liver Pate', 'My Market Daily Pantry'] },
  { b: 'My Gusto (My Market)', l: 'Private Label Cans', f: 'Chunks in Gravy with Chicken 1240g', sz: '1240g', p: 2.29, cr: 7.0, fat: 4.0, fib: 0.5, cal: 880, ap: 35, cat: 'Supermarket Generic' as const, tp: 'Wet Food' as const, ret: ['My Market Supermarkets', 'mymarket.gr'], k: 'Jumbo poultry can with tender chunks cooked in delicate poultry gravy', spec: ['1240g Jumbo My Gusto', 'Chicken Chunks Gravy'] },
  { b: 'Mr. Grand (Masoutis)', l: 'Private Label', f: 'Adult Chicken & Cereal Croquettes', sz: '10kg', p: 15.90, cr: 21.0, fat: 9.5, fib: 3.5, cal: 3390, ap: 25, cat: 'Supermarket Generic' as const, ret: ['Μασούτης (Masoutis Supermarkets)'], k: 'Masoutis private label complete maintenance kibble with poultry and cereals', spec: ['Masoutis Mr. Grand', 'Northern Greece Favorite'] },
  { b: 'Mr. Grand (Masoutis)', l: 'Private Label Cans', f: 'Pâté with Lamb & Rice Can 400g', sz: '400g', p: 1.05, cr: 8.0, fat: 4.8, fib: 0.5, cal: 940, ap: 50, cat: 'Supermarket Generic' as const, tp: 'Wet Food' as const, ret: ['Μασούτης (Masoutis Supermarkets)'], k: 'Steamed lamb and rice loaf enriched with essential minerals for daily hydration', spec: ['Masoutis Lamb & Rice Wet', 'Delicate Loaf Texture'] },
  { b: 'Mr. Grand (Masoutis)', l: 'Private Label Cans', f: 'Chunks in Gravy with Beef 1240g', sz: '1240g', p: 2.25, cr: 7.0, fat: 4.0, fib: 0.5, cal: 880, ap: 35, cat: 'Supermarket Generic' as const, tp: 'Wet Food' as const, ret: ['Μασούτης (Masoutis Supermarkets)'], k: 'High capacity 1.24kg can providing complete and balanced feeding for active dogs', spec: ['1240g Masoutis Jumbo', 'Rich Beef Gravy'] }
];
superList.forEach(s => {
  specs.push({
    brand: s.b, line: s.l, flavor: s.f, type: s.tp || 'Dry Food', category: s.cat, age: 'Adult', size: s.sz, msrp: s.p, origin: 'Greece / EU', cert: `${s.b} Quality Audit & Store Guarantee`, animalProtein: s.ap, summary: s.k,
    retailers: s.ret,
    ingredients: ['Cereals (wheat, corn, rice)', 'Meat and animal derivatives (beef/chicken/lamb min 4%)', 'Derivatives of vegetable origin', 'Oils and fats', 'Minerals', 'Vitamins A, D3, E'],
    protein: s.cr, fat: s.fat, fiber: s.fib, ash: 8.0, moisture: s.tp === 'Wet Food' ? 80.0 : (s.tp === 'Dental Chews' ? 14.0 : 10.0), kcal: s.cal, allergens: ['Poultry / Beef / Gluten'], grainFree: false, special: s.spec, officialUrl: 'https://www.skroutz.gr'
  });
});

// 6. Commercial Aggregator Classics: Pedigree, Friskies, Cesar, Purina ONE (22 items)
const commList = [
  // Pedigree (6)
  { b: 'Pedigree', l: 'Vital Protection', f: 'Adult Beef & Poultry with Vegetables', sz: '15kg', p: 38.0, cr: 21.0, fat: 12.0, fib: 2.5, cal: 3600, ap: 40, k: 'Oral care texture, healthy digestion with prebiotic beet pulp, omega-6 for coat', spec: ['Vital Protection 4 Signs', 'Prebiotic Beet Pulp'] },
  { b: 'Pedigree', l: 'Vital Protection', f: 'Adult Chicken & Vegetables Croquettes', sz: '15kg', p: 38.0, cr: 21.0, fat: 12.0, fib: 2.5, cal: 3600, ap: 40, k: 'Complete dry kibbles with chicken and carrots, supports natural immune defenses', spec: ['Vitality Chicken Carrots', 'Immune System Support'] },
  { b: 'Pedigree', l: 'Vital Protection Junior', f: 'Puppy Chicken & Rice Growth', sz: '15kg', p: 41.0, cr: 28.0, fat: 16.0, fib: 2.5, cal: 3850, ap: 55, k: 'Optimal calcium phosphorus ratio for bone and dental development in growing pups', spec: ['Puppy Bone & Teeth', 'Chicken & Rice Junior'] },
  { b: 'Pedigree', l: 'Classic Cans', f: 'Pâté with 5 Kinds of Meat 400g', sz: '400g', p: 1.85, cr: 8.0, fat: 5.5, fib: 0.4, cal: 990, ap: 65, tp: 'Wet Food' as const, k: 'Rich recipe combining beef, poultry, pork and lamb with natural vitamins and minerals', spec: ['5 Kinds of Meat Pâté', 'Classic Pedigree Can'] },
  { b: 'Pedigree', l: 'Gravy Pouches', f: 'Mixed Selection in Gravy 12x100g', sz: '1.2kg', p: 7.90, cr: 8.5, fat: 5.0, fib: 0.5, cal: 940, ap: 60, tp: 'Wet Food' as const, k: 'Multi-pack with beef, chicken, lamb and poultry chunks in tasty savory sauce', spec: ['12-Pack Mixed Selection', 'Savory Gravy Pouches'] },
  { b: 'Pedigree', l: 'DentaStix Oral Care', f: 'Medium Dogs Daily Dental Stick 28-Pack', sz: '720g', p: 8.90, cr: 8.1, fat: 1.3, fib: 0.1, cal: 3000, ap: 10, tp: 'Dental Chews' as const, k: 'X-shaped profile clinically proven to reduce tartar buildup by up to 80%', spec: ['X-Shape Proven Tartar Cut', 'Triple Action Oral Hygiene'] },

  // Purina Friskies & Purina ONE (10)
  { b: 'Purina Friskies', l: 'Adult Everyday', f: 'Balance Chicken & Vegetables with Added Milk', sz: '10kg', p: 21.5, cr: 20.0, fat: 10.0, fib: 3.0, cal: 3450, ap: 30, k: 'Balanced nutrition with quality proteins, fiber and vitamins for active family dogs', spec: ['Friskies 5 Promises', 'Balance Chicken & Veg'] },
  { b: 'Purina Friskies', l: 'Adult Everyday', f: 'Active Beef with Wholesome Grains', sz: '10kg', p: 22.0, cr: 21.0, fat: 10.5, fib: 3.0, cal: 3480, ap: 30, k: 'Formulated for dogs full of energy, loaded with B vitamins and omega fatty acids', spec: ['Active Energy Formula', 'Beef & Wholesome Grains'] },
  { b: 'Purina Friskies', l: 'Junior Line', f: 'Puppy Chicken with Milk & Vegetables', sz: '10kg', p: 23.5, cr: 25.0, fat: 12.0, fib: 2.5, cal: 3650, ap: 45, k: '100% balanced nutrition with vitamin D and minerals for healthy teeth and bones', spec: ['Puppy Milk Kibbles', 'Healthy Growth Friskies'] },
  { b: 'Purina Friskies', l: 'Tasty Wet Cans', f: 'Chunks in Gravy with Beef & Carrots 400g', sz: '400g', p: 1.55, cr: 7.0, fat: 3.0, fib: 0.5, cal: 850, ap: 40, tp: 'Wet Food' as const, k: 'Meaty chunks in tasty sauce providing essential hydration and appetite satisfaction', spec: ['Chunks in Gravy Can', 'Beef & Carrots Gravy'] },
  { b: 'Purina ONE', l: 'DualNature', f: 'Adult Beef & Spirulina Superfood', sz: '9.5kg', p: 46.0, cr: 25.0, fat: 15.0, fib: 2.5, cal: 3750, ap: 65, k: 'Dual texture kibbles with spirulina superfood to support immune defense and gut health', spec: ['DualNature Spirulina', 'Visible Health 3 Weeks'] },
  { b: 'Purina ONE', l: 'DualNature', f: 'Adult Salmon & Cranberries', sz: '9.5kg', p: 48.0, cr: 25.0, fat: 15.0, fib: 2.5, cal: 3750, ap: 65, k: 'Rich in salmon with dried cranberries to support urinary tract wellness and soft skin', spec: ['Salmon & Cranberries', 'Urinary Tract Defense'] },
  { b: 'Purina ONE', l: 'Medium / Maxi', f: 'Adult Chicken & Rice Everyday', sz: '14kg', p: 58.0, cr: 26.0, fat: 16.0, fib: 2.5, cal: 3820, ap: 70, k: 'High quality chicken #1 ingredient with crunchy kibbles to maintain clean dental teeth', spec: ['Chicken #1 Ingredient', 'Oral Dental Cleanse'] },
  { b: 'Purina ONE', l: 'Mini Breeds', f: 'Adult Mini Active Beef & Rice', sz: '7kg', p: 36.0, cr: 28.0, fat: 18.0, fib: 2.0, cal: 3950, ap: 72, k: 'Miniature crunchy and tender bites tailored to the high metabolic rate of small dogs', spec: ['Mini Crunchy & Tender', 'Small Dog Fast Metabolism'] },
  { b: 'Purina ONE', l: 'Mini Breeds Wet', f: 'Mini Adult Pouch Mixed Gravy 8x85g', sz: '680g', p: 7.20, cr: 11.5, fat: 5.5, fib: 0.5, cal: 990, ap: 80, tp: 'Wet Food' as const, k: 'Tender morsels in savory sauce with targeted antioxidants for small canine defenses', spec: ['Mini Gravy Pouches', 'High Antioxidant Sauce'] },
  { b: 'Purina ONE', l: 'Dental Snack', f: 'Dental Delicious Bites Beef 150g', sz: '150g', p: 2.90, cr: 14.0, fat: 3.5, fib: 1.5, cal: 3100, ap: 25, tp: 'Dental Chews' as const, k: 'Pleasantly soft inside and crispy outside dental treats with active tartar reduction', spec: ['Dental Delicious Soft Center', 'Calcium Enriched'] },

  // Cesar (Mars Petcare) (6)
  { b: 'Cesar', l: 'Classic Terrine Trays', f: 'Gourmet Beef & Liver Alu-Tray 150g', sz: '150g', p: 1.35, cr: 10.5, fat: 5.0, fib: 0.5, cal: 980, ap: 85, tp: 'Wet Food' as const, k: 'Classic French style terrine with fine beef and liver cuts, beloved by small dogs', spec: ['Cesar Classic Terrine', 'Single-Serve Alu Tray'] },
  { b: 'Cesar', l: 'Classic Terrine Trays', f: 'Tender Poultry & Vegetables 150g', sz: '150g', p: 1.35, cr: 10.5, fat: 5.0, fib: 0.5, cal: 980, ap: 85, tp: 'Wet Food' as const, k: 'Gently steamed tender poultry cuts paired with sweet carrots and tender garden peas', spec: ['Poultry & Sweet Peas', 'No Artificial Flavors'] },
  { b: 'Cesar', l: 'Classic Terrine Trays', f: 'Succulent Lamb & Turkey 150g', sz: '150g', p: 1.35, cr: 10.5, fat: 5.0, fib: 0.5, cal: 980, ap: 85, tp: 'Wet Food' as const, k: 'Finely minced pasture lamb and turkey loaf crafted for demanding canine palates', spec: ['Pasture Lamb Terrine', 'Small Dog Delicacy'] },
  { b: 'Cesar', l: 'Country Kitchen Wet', f: 'Chicken & Vegetables in Jelly Can 400g', sz: '400g', p: 2.10, cr: 9.0, fat: 5.0, fib: 0.5, cal: 950, ap: 80, tp: 'Wet Food' as const, k: 'Home-style recipe with whole chicken chunks, carrots and red bell peppers in jelly', spec: ['Country Kitchen Recipe', 'Savory Jelly Can'] },
  { b: 'Cesar', l: 'Country Kitchen Wet', f: 'Beef Stew with Garden Veggies 400g', sz: '400g', p: 2.10, cr: 9.0, fat: 5.0, fib: 0.5, cal: 950, ap: 80, tp: 'Wet Food' as const, k: 'Rustic beef cuts simmered gently in rich country gravy with peas and carrots', spec: ['Rustic Beef Stew', 'Tender Simmered Cuts'] },
  { b: 'Cesar', l: 'Senior 10+ Care', f: 'Senior Delicate Veal & Rice 150g', sz: '150g', p: 1.40, cr: 9.5, fat: 4.5, fib: 0.6, cal: 920, ap: 80, tp: 'Wet Food' as const, k: 'Soft, easily chewed loaf with digestible veal and rice formulated for elderly petite dogs', spec: ['Senior 10+ Soft Loaf', 'Gentle on Aging Teeth'] }
];
commList.forEach(c => {
  specs.push({
    brand: c.b, line: c.l, flavor: c.f, type: c.tp || 'Dry Food', category: 'Commercial & Aggregator (Skroutz/BestPrice)', age: c.f.includes('Puppy') || c.f.includes('Junior') ? 'Puppy' : (c.f.includes('Senior') ? 'Senior' : 'Adult'), size: c.sz, msrp: c.p, origin: 'EU / Mars / Purina', cert: `${c.b} European Quality Assurance`, animalProtein: c.ap, summary: c.k,
    ingredients: ['Cereals / Meat and animal derivatives', 'Vegetable protein extracts', 'Oils and fats', 'Minerals', 'Various sugars (minimal in cans)', 'Vegetables (carrots, peas)'],
    protein: c.cr, fat: c.fat, fiber: c.fib, ash: 7.5, moisture: c.tp === 'Wet Food' ? 81.0 : (c.tp === 'Dental Chews' ? 14.0 : 9.5), kcal: c.cal, allergens: ['Poultry / Beef / Lamb / Gluten'], grainFree: false, special: c.spec, officialUrl: 'https://www.skroutz.gr'
  });
});

// 7. Dental & Training Treats: Whimzees, Greenies, 8in1, Alpha Spirit, Trixie, Wanpy (12 items)
const treatList = [
  // Whimzees (3)
  { b: 'Whimzees', l: 'Natural Dental Chews', f: 'Daily Dental Stix Medium 14-Pack', sz: '420g', p: 11.5, cr: 1.1, fat: 2.0, fib: 13.7, cal: 2900, ap: 0, gf: true, tp: 'Dental Chews' as const, k: 'All-natural plant-based dental sticks with 6 natural functional ingredients, VOHC accepted', spec: ['100% Plant-Based VOHC', 'Zero Animal Protein'] },
  { b: 'Whimzees', l: 'Natural Dental Chews', f: 'Dental Toothbrush Small 24-Pack', sz: '360g', p: 11.9, cr: 1.1, fat: 2.0, fib: 13.7, cal: 2900, ap: 0, gf: true, tp: 'Dental Chews' as const, k: 'Toothbrush-shaped ridges that reach deep crevices between small teeth to clean plaque', spec: ['Toothbrush Ridged Shape', 'Vegetarian Dental Chew'] },
  { b: 'Whimzees', l: 'Natural Dental Chews', f: 'Veggie Sausage Medium 14-Pack', sz: '420g', p: 12.0, cr: 1.1, fat: 2.0, fib: 13.7, cal: 2900, ap: 0, gf: true, tp: 'Dental Chews' as const, k: 'Knobby sausage design providing double chewing time for plaque scraping and fresh breath', spec: ['Knobby Veggie Sausage', 'Double Chewing Time'] },

  // Greenies (2)
  { b: 'Greenies', l: 'Original Dental Treats', f: 'Petite Dental Chews 30-Pack (7-11kg)', sz: '510g', p: 18.5, cr: 32.0, fat: 5.5, fib: 6.0, cal: 3100, ap: 40, gf: false, tp: 'Dental Chews' as const, k: 'Unique bendable texture that cleans down to the gumline to fight plaque and tartar', spec: ['VOHC Accepted Gumline Reach', 'Flexible Texture Chews'] },
  { b: 'Greenies', l: 'Original Dental Treats', f: 'Regular Dental Chews 18-Pack (11-22kg)', sz: '510g', p: 18.5, cr: 32.0, fat: 5.5, fib: 6.0, cal: 3100, ap: 40, gf: false, tp: 'Dental Chews' as const, k: 'Calibrated resistance allows dogs teeth to sink in for total crown scraping', spec: ['Total Crown Scraping', 'Natural Soluble Fiber'] },

  // 8in1 & Alpha Spirit (4)
  { b: '8in1', l: 'Triple Flavour Chews', f: 'Triple Flavour Rolls Wrapped with Real Meat 3-Pack', sz: '105g', p: 4.8, cr: 80.0, fat: 2.0, fib: 1.0, cal: 3200, ap: 90, gf: true, tp: 'Dental Chews' as const, k: 'Delicious pork and beef hides wrapped with real chicken breast fillets, satisfies chewing instincts', spec: ['Triple Flavour Pork Beef Chicken', 'Chewing Fun Under 2% Fat'] },
  { b: '8in1', l: 'Triple Flavour Chews', f: 'Triple Flavour Ribs Wrapped with Chicken 6-Pack', sz: '150g', p: 5.5, cr: 78.0, fat: 2.0, fib: 1.0, cal: 3200, ap: 90, gf: true, tp: 'Dental Chews' as const, k: 'Rib-shaped chewy rawhide wrapped with juicy roasted chicken breast', spec: ['Chewy Ribs Shape', 'Plaque Removal Wrapping'] },
  { b: 'Alpha Spirit', l: 'Hypoallergenic Treats', f: 'Semi-Moist Training Cubes Prosciutto 200g', sz: '200g', p: 3.5, cr: 26.0, fat: 10.0, fib: 1.0, cal: 3120, ap: 85, gf: true, tp: 'Treats' as const, k: 'Cold-tenderized Mediterranean prosciutto cubes, highly palatable training rewards', spec: ['Cold Pressed Semi-Moist', '85% Meat & Fish Cuts'] },
  { b: 'Alpha Spirit', l: 'Hypoallergenic Treats', f: 'Semi-Moist Training Cubes Duck 200g', sz: '3.5', p: 3.5, cr: 26.0, fat: 10.0, fib: 1.0, cal: 3120, ap: 85, gf: true, tp: 'Treats' as const, k: 'Hypoallergenic fresh duck meat cubes enriched with omega fatty acids and zinc', spec: ['Fresh Duck Cubes', 'Grain-Free Training Reward'] },

  // Trixie & Wanpy (3)
  { b: 'Trixie', l: 'Premio Dog Snacks', f: 'Premio Duck Stripes 100g', sz: '100g', p: 3.2, cr: 52.0, fat: 3.5, fib: 1.0, cal: 3150, ap: 90, gf: true, tp: 'Treats' as const, k: '90% pure duck breast dried into tender strips, zero added sugar and wheat gluten free', spec: ['90% Duck Breast', 'Zero Added Sugar'] },
  { b: 'Trixie', l: 'Premio Dog Snacks', f: 'Premio Lamb & Rice Coins 100g', sz: '100g', p: 3.2, cr: 32.0, fat: 6.0, fib: 1.5, cal: 3250, ap: 80, gf: false, tp: 'Treats' as const, k: 'Tender coin-shaped snacks with pure lamb meat and digestible rice grains', spec: ['Lamb & Rice Coins', 'Soft Chewy Texture'] },
  { b: 'Wanpy', l: 'Oven Roasted Snacks', f: 'Duck Jerky Strips 100g', sz: '100g', p: 2.9, cr: 48.0, fat: 2.0, fib: 0.5, cal: 3100, ap: 95, gf: true, tp: 'Treats' as const, k: 'Slowly oven roasted duck jerky strips rich in lean protein to strengthen chewing muscles', spec: ['Slowly Oven Roasted', 'Low Fat Duck Jerky'] }
];
treatList.forEach(t => {
  specs.push({
    brand: t.b, line: t.l, flavor: t.f, type: t.tp, category: 'Pet Specialty & Holistic', age: 'Adult', size: t.sz, msrp: Number(t.p), origin: t.b === 'Whimzees' ? 'Netherlands' : (t.b === 'Alpha Spirit' ? 'Spain' : 'EU / Germany'), cert: `${t.b} Quality Audit Certified`, animalProtein: t.ap, summary: t.k,
    ingredients: t.ap === 0 ? ['Potato starch', 'Glycerin', 'Powdered cellulose', 'Lecithin', 'Yeast', 'Malt extract', 'Lupine'] : ['Real meat cuts / rawhide', 'Glycerin', 'Minerals', 'Botanical extracts'],
    protein: t.cr, fat: t.fat, fiber: t.fib, ash: 4.5, moisture: t.tp === 'Dental Chews' ? 12.0 : 15.0, kcal: t.cal, allergens: t.ap === 0 ? ['None (Vegetarian)'] : ['Poultry / Beef / Pork'], grainFree: t.gf, special: t.spec, officialUrl: 'https://www.skroutz.gr'
  });
});

console.log('Part 2 total specs generated:', specs.length);

// Generate Part 2 TS file
const builtProductsPart2 = specs.map((s, idx) => buildDogProduct(s, idx + 300));

const fileContentPart2 = `import { DogProduct } from './types';

export const GREEK_MARKET_TOP_FEEDS_PART2: DogProduct[] = ${JSON.stringify(builtProductsPart2, null, 2)};
`;

fs.writeFileSync('src/greekMarketTopFeedsPart2.ts', fileContentPart2);
console.log('Successfully wrote src/greekMarketTopFeedsPart2.ts with', builtProductsPart2.length, 'products');
