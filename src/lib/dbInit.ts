'use client';

import { openDB } from 'idb';
import { Material } from './materialService';
import { LaborRate } from './laborRateService';

export const DB_NAME = 'brickonomics';
export const MATERIALS_STORE = 'materials';
export const LABOR_RATES_STORE = 'labor_rates';
export const COST_ESTIMATES_STORE = 'cost_estimates';

export async function initDB() {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      // Create all stores if they don't exist
      if (!db.objectStoreNames.contains(MATERIALS_STORE)) {
        const materialsStore = db.createObjectStore(MATERIALS_STORE, { keyPath: 'id', autoIncrement: true });
        materialsStore.createIndex('category', 'category');

        // Add default materials
        materialsStore.put({
          name: 'Portland Cement',
          category: 'cement',
          baseRate: 350, // ₹ per bag
          unit: 'bag',
          description: 'Standard grade Portland cement',
          lastUpdated: new Date()
        });
        
        materialsStore.put({
          name: 'Steel Reinforcement',
          category: 'steel',
          baseRate: 65, // ₹ per kg
          unit: 'kg',
          description: 'Fe500 grade steel reinforcement bars',
          lastUpdated: new Date()
        });
        
        materialsStore.put({
          name: 'Red Clay Bricks',
          category: 'bricks',
          baseRate: 8, // ₹ per piece
          unit: 'piece',
          description: 'Standard size red clay bricks',
          lastUpdated: new Date()
        });
        
        materialsStore.put({
          name: 'River Sand',
          category: 'sand',
          baseRate: 2800, // ₹ per cubic meter
          unit: 'cu.m',
          description: 'Fine river sand for construction',
          lastUpdated: new Date()
        });
        
        materialsStore.put({
          name: 'Crushed Stone Aggregate',
          category: 'aggregate',
          baseRate: 2200, // ₹ per cubic meter
          unit: 'cu.m',
          description: '20mm crushed stone aggregate',
          lastUpdated: new Date()
        });
      }

      // Create labor rates store
      if (!db.objectStoreNames.contains(LABOR_RATES_STORE)) {
        const laborRatesStore = db.createObjectStore(LABOR_RATES_STORE, { keyPath: 'id', autoIncrement: true });
        laborRatesStore.createIndex('category', 'category');

        // Add default labor rates
        laborRatesStore.put({
          name: 'Skilled Mason',
          category: 'skilled',
          baseRate: 800, // ₹ per day
          description: 'Experienced mason for brick and concrete work',
          lastUpdated: new Date()
        });

        laborRatesStore.put({
          name: 'Unskilled Labor',
          category: 'unskilled',
          baseRate: 500, // ₹ per day
          description: 'General construction labor',
          lastUpdated: new Date()
        });

        laborRatesStore.put({
          name: 'Site Supervisor',
          category: 'supervisor',
          baseRate: 1200, // ₹ per day
          description: 'Construction site supervisor',
          lastUpdated: new Date()
        });
      }

      // Create cost estimates store
      if (!db.objectStoreNames.contains(COST_ESTIMATES_STORE)) {
        const costEstimatesStore = db.createObjectStore(COST_ESTIMATES_STORE, { keyPath: 'id', autoIncrement: true });
        costEstimatesStore.createIndex('projectType', 'projectType');
        costEstimatesStore.createIndex('createdAt', 'createdAt');
      }
    }
  });

  return db;
}
