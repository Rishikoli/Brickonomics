'use client';

interface CostEstimate {
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
  overhead: number;
  transportation: number;
  totalCost: number;
  projectType: string;
  area: number;
}

export async function generateCostEstimate(params: {
  projectType: string;
  area: number;
  location: string;
}): Promise<CostEstimate> {
  try {
    const response = await fetch('/api/cost-estimate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate cost estimate');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating cost estimate:', error);
    throw error;
  }
}
