'use client';

import { openDB } from 'idb';
import { DB_NAME, LABOR_RATES_STORE } from './dbInit';

export interface LaborRate {
  id?: number;
  name: string;
  category: string;
  baseRate: number;
  description?: string;
  lastUpdated?: Date;
}

const getDb = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(LABOR_RATES_STORE)) {
        const store = db.createObjectStore(LABOR_RATES_STORE, { keyPath: 'id', autoIncrement: true });
        store.createIndex('category', 'category');
        
        // Add default labor rates
        store.put({
          name: 'Skilled Mason',
          category: 'skilled',
          baseRate: 800, // ₹ per day
          description: 'Experienced mason for brick and concrete work'
        });

        store.put({
          name: 'Unskilled Labor',
          category: 'unskilled',
          baseRate: 500, // ₹ per day
          description: 'General construction labor'
        });

        store.put({
          name: 'Site Supervisor',
          category: 'supervisor',
          baseRate: 1200, // ₹ per day
          description: 'Construction site supervisor'
        });
      }
    }
  });
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

export async function addLaborRate(rate: Omit<LaborRate, 'id'>): Promise<LaborRate> {
  try {
    const db = await getDb();
    const rateWithDate = {
      ...rate,
      lastUpdated: new Date()
    };
    const id = await db.add(LABOR_RATES_STORE, rateWithDate);
    return { ...rateWithDate, id: id as number };
  } catch (error) {
    console.error('Error adding labor rate:', error);
    throw new Error('Failed to add labor rate');
  }
}

export async function updateLaborRate(rate: LaborRate): Promise<void> {
  try {
    const db = await getDb();
    await db.put(LABOR_RATES_STORE, {
      ...rate,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Error updating labor rate:', error);
    throw new Error('Failed to update labor rate');
  }
}

export async function deleteLaborRate(id: number): Promise<void> {
  try {
    const db = await getDb();
    await db.delete(LABOR_RATES_STORE, id);
  } catch (error) {
    console.error('Error deleting labor rate:', error);
    throw new Error('Failed to delete labor rate');
  }
}
