'use client';

import { useEffect } from 'react';
import { initDB, addMaterial, addLaborRate } from '@/lib/localDb';

// Initialize sample data
async function initSampleData() {
  try {
    // Add sample materials
    await addMaterial({
      name: 'Portland Cement',
      unit: 'bag',
      baseRate: 350,
      category: 'cement',
      description: '50kg bag of premium quality cement'
    });

    await addMaterial({
      name: 'TMT Steel Bars',
      unit: 'kg',
      baseRate: 65,
      category: 'steel',
      description: 'High-strength TMT reinforcement bars'
    });

    await addMaterial({
      name: 'Clay Bricks',
      unit: 'thousand',
      baseRate: 7500,
      category: 'bricks',
      description: 'Standard size red clay bricks'
    });

    // Add sample labor rates
    await addLaborRate({
      role: 'Mason',
      dailyRate: 800,
      location: 'Mumbai',
      skillLevel: 'skilled'
    });

    await addLaborRate({
      role: 'Helper',
      dailyRate: 500,
      location: 'Mumbai',
      skillLevel: 'unskilled'
    });
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
}

export function DatabaseInitializer() {
  useEffect(() => {
    initDB().then(() => {
      initSampleData();
    });
  }, []);

  return null;
}
