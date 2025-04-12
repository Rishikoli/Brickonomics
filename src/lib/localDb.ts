'use client';

import { openDB } from 'idb';

export interface Material {
  id?: number;
  name: string;
  category: string;
  baseRate: number;
  unit: string;
  description?: string;
  lastUpdated?: Date;
}

export interface LaborRate {
  id?: number;
  name: string;
  category: string;
  baseRate: number;
  description?: string;
  lastUpdated?: Date;
}

const DB_NAME = 'brickonomics';
const MATERIALS_STORE = 'materials';
const LABOR_RATES_STORE = 'labor_rates';

async function getDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      // Materials store
      if (!db.objectStoreNames.contains(MATERIALS_STORE)) {
        const materialsStore = db.createObjectStore(MATERIALS_STORE, { keyPath: 'id', autoIncrement: true });
        materialsStore.createIndex('category', 'category');
        
        // Add default materials
        materialsStore.put({
          name: 'Portland Cement',
          category: 'cement',
          baseRate: 350, // ₹ per bag
          unit: 'bag',
          description: 'Standard grade Portland cement'
        });
        
        materialsStore.put({
          name: 'Steel Reinforcement',
          category: 'steel',
          baseRate: 65, // ₹ per kg
          unit: 'kg',
          description: 'Fe500 grade steel reinforcement bars'
        });
        
        materialsStore.put({
          name: 'Red Clay Bricks',
          category: 'bricks',
          baseRate: 8, // ₹ per piece
          unit: 'piece',
          description: 'Standard size red clay bricks'
        });
        
        materialsStore.put({
          name: 'River Sand',
          category: 'sand',
          baseRate: 2800, // ₹ per cubic meter
          unit: 'cu.m',
          description: 'Fine river sand for construction'
        });
        
        materialsStore.put({
          name: 'Crushed Stone Aggregate',
          category: 'aggregate',
          baseRate: 2200, // ₹ per cubic meter
          unit: 'cu.m',
          description: '20mm crushed stone aggregate'
        });
      }

      // Labor rates store
      if (!db.objectStoreNames.contains(LABOR_RATES_STORE)) {
        const laborRatesStore = db.createObjectStore(LABOR_RATES_STORE, { keyPath: 'id', autoIncrement: true });
        laborRatesStore.createIndex('category', 'category');

        // Add default labor rates
        laborRatesStore.put({
          name: 'Skilled Mason',
          category: 'skilled',
          baseRate: 800, // ₹ per day
          description: 'Experienced mason for brick and concrete work'
        });

        laborRatesStore.put({
          name: 'Unskilled Labor',
          category: 'unskilled',
          baseRate: 500, // ₹ per day
          description: 'General construction labor'
        });

        laborRatesStore.put({
          name: 'Site Supervisor',
          category: 'supervisor',
          baseRate: 1200, // ₹ per day
          description: 'Construction site supervisor'
        });
      }
    }
  });
}

export async function getMaterials(): Promise<Material[]> {
  try {
    const db = await getDb();
    return db.getAll(MATERIALS_STORE);
  } catch (error) {
    console.error('Error getting materials:', error);
    throw new Error('Failed to get materials');
  }
}

export async function getLaborRates(): Promise<LaborRate[]> {
  try {
    const db = await getDb();
    return db.getAll(LABOR_RATES_STORE);
  } catch (error) {
    console.error('Error getting labor rates:', error);
    throw new Error('Failed to get labor rates');
  }
}

export async function getMaterialByCategory(category: string): Promise<Material | undefined> {
  try {
    const db = await getDb();
    const tx = db.transaction(MATERIALS_STORE, 'readonly');
    const store = tx.objectStore(MATERIALS_STORE);
    const index = store.index('category');
    return index.get(category);
  } catch (error) {
    console.error('Error getting material by category:', error);
    throw new Error('Failed to get material');
  }
}

export async function getLaborRateByCategory(category: string): Promise<LaborRate | undefined> {
  try {
    const db = await getDb();
    const tx = db.transaction(LABOR_RATES_STORE, 'readonly');
    const store = tx.objectStore(LABOR_RATES_STORE);
    const index = store.index('category');
    return index.get(category);
  } catch (error) {
    console.error('Error getting labor rate by category:', error);
    throw new Error('Failed to get labor rate');
  }
}
