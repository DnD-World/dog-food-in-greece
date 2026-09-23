import { DogProduct } from '../types';

/**
 * 28-Day Monthly Verification Calendar for 45 Greek Pet Food & Treats Brands.
 * Designed to spread audits evenly across the month (1-2 brands per day).
 */

export interface DaySchedule {
  day: number;
  brands: string[];
  focusNotes: string;
}

export const MONTHLY_SCHEDULE_28_DAYS: DaySchedule[] = [
  { day: 1, brands: ['8in1', 'Acana'], focusNotes: 'Chews/Treats & Premium Holistic Dry/Wet' },
  { day: 2, brands: ['Advance', 'Alpha Spirit'], focusNotes: 'Veterinary/Dry & Semi-Moist / Cold-Pressed' },
  { day: 3, brands: ['Ambrosia Pet Food', 'Amila Pet'], focusNotes: 'Greek Holistic & Greek Economy' },
  { day: 4, brands: ['Arden Grange', 'BARRON (Σκλαβενίτης)'], focusNotes: 'Hypoallergenic & Supermarket Private Label' },
  { day: 5, brands: ['Bavaro', 'Belcando'], focusNotes: 'German Working Dog & Holistic Super-Premium' },
  { day: 6, brands: ['Bellosan (Lidl Hellas)', 'Brit Care'], focusNotes: 'Supermarket Private Label & Hypoallergenic' },
  { day: 7, brands: ['Brit Premium', 'Cesar'], focusNotes: 'Mid-Tier Dry & Supermarket Wet Pouches/Trays' },
  { day: 8, brands: ['Eukanuba', 'Farmina Cibau'], focusNotes: 'Heritage Super-Premium & Italian Mid-Tier' },
  { day: 9, brands: ['Farmina N&D'], focusNotes: 'Italian Holistic (Grain-Free / Ancestral Grain / Pumpkin)' },
  { day: 10, brands: ['Farmina Vet Life', 'Greenies'], focusNotes: 'Clinical Diets & Dental Chews' },
  { day: 11, brands: ['Happy Dog', "Hill's Prescription Diet"], focusNotes: 'Bavarian Holistic & Clinical Veterinary Diets' },
  { day: 12, brands: ["Hill's Science Plan", 'Josera'], focusNotes: 'Wellness Premium & German Premium/Economy' },
  { day: 13, brands: ['JUMP (ΑΒ Βασιλόπουλος)', 'Loved by Pets (ΑΒ Βασιλόπουλος)'], focusNotes: 'Greek Supermarket Private Labels' },
  { day: 14, brands: ['Monge', 'Mr. Grand (Masoutis)'], focusNotes: 'Italian Super-Premium & Supermarket Private Label' },
  { day: 15, brands: ['My Gusto (My Market)', "Nature's Protection"], focusNotes: 'Supermarket Private Label & White Dog / MicroZeoGen Diets' },
  { day: 16, brands: ['Orijen', 'Orlando (Lidl Hellas)'], focusNotes: 'Biologically Appropriate & Supermarket Private Label' },
  { day: 17, brands: ['Pedigree', 'Platinum Natural'], focusNotes: 'Mass Market & Semi-Moist 70% Fresh Meat Diets' },
  { day: 18, brands: ['Purina Dentalife', 'Purina Friskies'], focusNotes: 'Dental Chews & Mass Commercial Dry/Wet' },
  { day: 19, brands: ['Purina ONE', 'Purina Pro Plan'], focusNotes: 'Grocery Premium & Veterinary / Performance Diets' },
  { day: 20, brands: ['Reflex Plus', 'Rinti'], focusNotes: 'Economy Super-Premium & Pure Meat Wet Diets' },
  { day: 21, brands: ['Royal Canin (Dry/Wet)'], focusNotes: 'Breed Health & Size Health Nutrition' },
  { day: 22, brands: ['Royal Canin (Vet/Treats)'], focusNotes: 'Clinical Veterinary Diets & Educ/Energy Treats' },
  { day: 23, brands: ['Taste of the Wild', 'Terra Canis'], focusNotes: 'Grain-Free Smoked Meats & Human-Grade German Cans' },
  { day: 24, brands: ['Trixie', 'Wanpy'], focusNotes: 'Functional Snacks/Treats & Jerky/Freeze-Dried Treats' },
  { day: 25, brands: ['Whimzees'], focusNotes: 'All-Natural Vegetarian Dental Chews' },
  { day: 26, brands: ['Audit Reconciliation: Reformulations'], focusNotes: 'Checks for manufacturer recipe adjustments' },
  { day: 27, brands: ['Audit Reconciliation: Image Refresh'], focusNotes: 'Re-verifies packaging redesigns and drive links' },
  { day: 28, brands: ['Audit Reconciliation: Price Delta'], focusNotes: 'Checks price variations on Skroutz and BestPrice' },
];

/**
 * Robust product matcher for a given DaySchedule slice.
 * Properly partitions brands like Royal Canin across Days 21 and 22.
 */
export function getProductsForDay(schedule: DaySchedule, allProducts: DogProduct[]): DogProduct[] {
  return allProducts.filter((p) => {
    return schedule.brands.some((b) => {
      const bLower = b.toLowerCase().trim();
      const pBrandLower = (p.brand || '').toLowerCase().trim();
      if (bLower === pBrandLower) return true;
      if (bLower.includes('royal canin') && pBrandLower === 'royal canin') {
        if (bLower.includes('dry/wet')) {
          return p.productType === 'Dry Food' || p.productType === 'Wet Food';
        }
        if (bLower.includes('vet/treats')) {
          return (
            (p.productLine || '').toLowerCase().includes('vet') ||
            p.productType === 'Treats' ||
            p.productType === 'Dental Chews'
          );
        }
        return true;
      }
      return false;
    });
  });
}

