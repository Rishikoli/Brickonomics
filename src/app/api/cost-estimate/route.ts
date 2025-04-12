import { NextResponse } from 'next/server';
import { getMaterials } from '@/lib/localDb';
import { getLaborRates } from '@/lib/localDb';

// Constants for cost estimation
const OVERHEAD_PERCENTAGE = 0.15; // 15% overhead
const TRANSPORTATION_PERCENTAGE = 0.10; // 10% transportation cost

// Cost estimation factors based on project type
const PROJECT_TYPE_FACTORS = {
  'residential': 1.0,
  'commercial': 1.2,
  'industrial': 1.3,
  'infrastructure': 1.4,
} as const;

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

type ProjectType = keyof typeof PROJECT_TYPE_FACTORS;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectType, area, location } = body;

    if (!projectType || !area || !location) {
      return NextResponse.json(
        { error: 'Missing required fields: projectType, area, or location' },
        { status: 400 }
      );
    }

    if (!Object.keys(PROJECT_TYPE_FACTORS).includes(projectType)) {
      return NextResponse.json(
        { error: 'Invalid project type' },
        { status: 400 }
      );
    }

    // Get materials and labor rates from local DB
    const materials = await getMaterials();
    const laborRates = await getLaborRates();

    if (!materials || !laborRates) {
      return NextResponse.json(
        { error: 'Failed to fetch materials or labor rates' },
        { status: 500 }
      );
    }

    // Calculate material costs
    const materialCosts = Object.entries(MATERIAL_REQUIREMENTS[projectType as ProjectType])
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
    const laborCosts = Object.entries(LABOR_REQUIREMENTS[projectType as ProjectType])
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

    return NextResponse.json({
      projectType,
      area,
      materials: materialCosts,
      labor: laborCosts,
      materialTotal,
      laborTotal,
      overhead,
      transportation,
      totalCost
    });
  } catch (error) {
    console.error('Error generating cost estimate:', error);
    return NextResponse.json(
      { error: 'Failed to generate cost estimate' },
      { status: 500 }
    );
  }
}
