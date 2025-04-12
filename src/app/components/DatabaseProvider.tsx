'use client';

import { useEffect } from 'react';
import { initDB } from '@/lib/dbInit';

export default function DatabaseProvider() {
  useEffect(() => {
    initDB().catch(console.error);
  }, []);

  return null;
}
