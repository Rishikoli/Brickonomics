'use client';

import { openDB } from 'idb';
import { DB_NAME, COST_ESTIMATES_STORE } from './dbInit';
import { Material, getMaterials } from './materialService';
import { LaborRate, getLaborRates } from './laborRateService';

export interface CostEstimate {
  id?: number;
  projectType: string;
  area: number;
  materials: {
    name: string;
    quantity: number;
    unit: string;
    rate: number;
    total: number;
  }[];
  labor: {
    category: string;
    hours: number;
    rate: number;
    total: number;
  }[];
  materialTotal: number;
  laborTotal: number;
  overhead: number;
  transportation: number;
  totalCost: number;
  createdAt?: Date;
}

// Constants for cost estimation
const OVERHEAD_PERCENTAGE = 0.15; // 15% overhead
const TRANSPORTATION_PERCENTAGE = 0.10; // 10% transportation cost

// Material requirements per square foot based on project type (in basic units)
const MATERIAL_REQUIREMENTS = {
  'residential': {
    'cement': 0.4, // bags per sqft
    'steel': 3.5, // kg per sqft
    'bricks': 8, // pieces per sqft
    'sand': 0.02, // cu.m per sqft
    'aggregate': 0.025, // cu.m per sqft
  },
  'commercial': {
    'cement': 0.45,
    'steel': 4.0,
    'bricks': 9,
    'sand': 0.022,
    'aggregate': 0.028,
  },
  'industrial': {
    'cement': 0.5,
    'steel': 4.5,
    'bricks': 10,
    'sand': 0.025,
    'aggregate': 0.03,
  },
  'infrastructure': {
    'cement': 0.55,
    'steel': 5.0,
    'bricks': 11,
    'sand': 0.028,
    'aggregate': 0.032,
  },
} as const;

// Labor hours per square foot based on project type
const LABOR_REQUIREMENTS = {
  'residential': {
    'skilled': 0.5,
    'unskilled': 1.0,
    'supervisor': 0.2,
  },
  'commercial': {
    'skilled': 0.6,
    'unskilled': 1.2,
    'supervisor': 0.25,
  },
  'industrial': {
    'skilled': 0.7,
    'unskilled': 1.4,
    'supervisor': 0.3,
  },
  'infrastructure': {
    'skilled': 0.8,
    'unskilled': 1.6,
    'supervisor': 0.35,
  },
} as const;

export async function generateCostEstimate(params: {
  projectType: string;
  area: number;
  location: string;
}): Promise<CostEstimate> {
  try {
    const { projectType, area } = params;

    if (!Object.keys(MATERIAL_REQUIREMENTS).includes(projectType)) {
      throw new Error('Invalid project type');
    }

    // Get materials and labor rates from local DB
    const materials = await getMaterials();
    const laborRates = await getLaborRates();

    if (!materials || !laborRates) {
      throw new Error('Failed to fetch materials or labor rates');
    }

    // Calculate material costs
    const materialCosts = Object.entries(MATERIAL_REQUIREMENTS[projectType as keyof typeof MATERIAL_REQUIREMENTS])
      .map(([materialType, requirement]) => {
        const material = materials.find(m => m.category === materialType);
        if (!material) return null;

        const quantity = requirement * area;
        const rate = material.baseRate;
        const total = quantity * rate;

        return {
          name: material.name,
          quantity: Number(quantity.toFixed(2)),
          unit: material.unit,
          rate: rate,
          total: Number(total.toFixed(2))
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    // Calculate labor costs
    const laborCosts = Object.entries(LABOR_REQUIREMENTS[projectType as keyof typeof LABOR_REQUIREMENTS])
      .map(([category, hoursPerSqft]) => {
        const laborRate = laborRates.find(l => l.category === category);
        if (!laborRate) return null;

        const hours = hoursPerSqft * area;
        const rate = laborRate.baseRate;
        const total = hours * rate;

        return {
          category: laborRate.name,
          hours: Number(hours.toFixed(2)),
          rate: rate,
          total: Number(total.toFixed(2))
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    // Calculate totals
    const materialTotal = materialCosts.reduce((sum, item) => sum + item.total, 0);
    const laborTotal = laborCosts.reduce((sum, item) => sum + item.total, 0);
    const subtotal = materialTotal + laborTotal;
    const overhead = Number((subtotal * OVERHEAD_PERCENTAGE).toFixed(2));
    const transportation = Number((subtotal * TRANSPORTATION_PERCENTAGE).toFixed(2));
    const totalCost = Number((subtotal + overhead + transportation).toFixed(2));

    const estimate: CostEstimate = {
      projectType,
      area,
      materials: materialCosts,
      labor: laborCosts,
      materialTotal,
      laborTotal,
      overhead,
      transportation,
      totalCost,
      createdAt: new Date()
    };

    // Save to local DB
    const db = await openDB(DB_NAME);
    await db.add(COST_ESTIMATES_STORE, estimate);

    return estimate;
  } catch (error) {
    console.error('Error generating cost estimate:', error);
    throw error;
  }
}

export async function getCostEstimates(): Promise<CostEstimate[]> {
  try {
    const db = await openDB(DB_NAME);
    return db.getAll(COST_ESTIMATES_STORE);
  } catch (error) {
    console.error('Error getting cost estimates:', error);
    throw new Error('Failed to get cost estimates');
  }
}

export async function getCostEstimatesByType(projectType: string): Promise<CostEstimate[]> {
  try {
    const db = await openDB(DB_NAME);
    const tx = db.transaction(COST_ESTIMATES_STORE, 'readonly');
    const store = tx.objectStore(COST_ESTIMATES_STORE);
    const index = store.index('projectType');
    return index.getAll(projectType);
  } catch (error) {
    console.error('Error getting cost estimates by type:', error);
    throw new Error('Failed to get cost estimates');
  }
}
