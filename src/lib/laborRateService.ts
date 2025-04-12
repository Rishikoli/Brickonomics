'use client';

import { getLaborRates, addLaborRate, updateLaborRate } from './localDb';

interface LaborRate {
  id?: string;
  name: string;
  unit: string;
  baseRate: number;
  category: string;
  description: string | null;
}

export async function fetchLaborRates(category?: string) {
  try {
    const rates = await getLaborRates(category);
    return rates || [];
  } catch (error) {
    console.error('Error fetching labor rates:', error);
    throw error;
  }
}

export async function createLaborRate(rate: Omit<LaborRate, 'id'>) {
  try {
    const id = await addLaborRate({
      ...rate,
      description: rate.description || null
    });
    return { id, ...rate };
  } catch (error) {
    console.error('Error creating labor rate:', error);
    throw new Error('Failed to save labor rate');
  }
}

export async function updateLaborRateById(id: string, rate: Omit<LaborRate, 'id'>) {
  try {
    await updateLaborRate(id, {
      ...rate,
      description: rate.description || null
    });
    return { id, ...rate };
  } catch (error) {
    console.error('Error updating labor rate:', error);
    throw new Error('Failed to update labor rate');
  }
}
