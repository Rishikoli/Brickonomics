'use client';

import { openDB } from 'idb';
import { DB_NAME, MATERIALS_STORE } from './dbInit';

export interface Material {
  id?: number;
  name: string;
  category: string;
  baseRate: number;
  unit: string;
  description?: string;
  lastUpdated?: Date;
}

const getDb = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(MATERIALS_STORE)) {
        const store = db.createObjectStore(MATERIALS_STORE, { keyPath: 'id', autoIncrement: true });
        store.createIndex('category', 'category');
        
        // Add default materials
        store.put({
          name: 'Portland Cement',
          category: 'cement',
          baseRate: 350, // ₹ per bag
          unit: 'bag',
          description: 'Standard grade Portland cement'
        });
        
        store.put({
          name: 'Steel Reinforcement',
          category: 'steel',
          baseRate: 65, // ₹ per kg
          unit: 'kg',
          description: 'Fe500 grade steel reinforcement bars'
        });
        
        store.put({
          name: 'Red Clay Bricks',
          category: 'bricks',
          baseRate: 8, // ₹ per piece
          unit: 'piece',
          description: 'Standard size red clay bricks'
        });
        
        store.put({
          name: 'River Sand',
          category: 'sand',
          baseRate: 2800, // ₹ per cubic meter
          unit: 'cu.m',
          description: 'Fine river sand for construction'
        });
        
        store.put({
          name: 'Crushed Stone Aggregate',
          category: 'aggregate',
          baseRate: 2200, // ₹ per cubic meter
          unit: 'cu.m',
          description: '20mm crushed stone aggregate'
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

export async function addMaterial(material: Omit<Material, 'id'>): Promise<Material> {
  try {
    const db = await getDb();
    const materialWithDate = {
      ...material,
      lastUpdated: new Date()
    };
    const id = await db.add(MATERIALS_STORE, materialWithDate);
    return { ...materialWithDate, id: id as number };
  } catch (error) {
    console.error('Error adding material:', error);
    throw new Error('Failed to add material');
  }
}

export async function updateMaterial(material: Material): Promise<void> {
  try {
    const db = await getDb();
    await db.put(MATERIALS_STORE, {
      ...material,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Error updating material:', error);
    throw new Error('Failed to update material');
  }
}

export async function deleteMaterial(id: number): Promise<void> {
  try {
    const db = await getDb();
    await db.delete(MATERIALS_STORE, id);
  } catch (error) {
    console.error('Error deleting material:', error);
    throw new Error('Failed to delete material');
  }
}
