import fs from 'fs';
import { GREECE_DOG_PRODUCTS } from '../src/productsData';
import { DogProduct, ChannelCategory, ProductType, PetAgeGroup } from '../src/types';

console.log('Current items in productsData:', GREECE_DOG_PRODUCTS.length);
const existingIds = new Set(GREECE_DOG_PRODUCTS.map(p => p.id));
console.log('Unique existing IDs:', existingIds.size);
