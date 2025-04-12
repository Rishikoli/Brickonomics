'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { generateCostEstimate } from '@/lib/costEstimateService';

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

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [costEstimate, setCostEstimate] = useState<CostEstimate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const projectType = searchParams.get('projectType');
    const area = parseFloat(searchParams.get('area') || '0');
    const location = searchParams.get('location') || '';

    if (projectType && area && location) {
      setLoading(true);
      setError(null);

      generateCostEstimate({ projectType, area, location })
        .then((estimate) => {
          setCostEstimate(estimate);
        })
        .catch((err) => {
          setError(err.message || 'Failed to generate cost estimate');
          console.error('Error:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Generating cost estimate...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!costEstimate) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">No cost estimate available</div>
      </div>
    );
  }

  const materialCost = costEstimate.materials.reduce((sum, item) => sum + item.total, 0);
  const laborCost = costEstimate.labor.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Project Cost Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Materials Cost"
          amount={materialCost}
          icon="💰"
          color="bg-blue-100"
        />
        <Card
          title="Labor Cost"
          amount={laborCost}
          icon="👷"
          color="bg-green-100"
        />
        <Card
          title="Overhead"
          amount={costEstimate.overhead}
          icon="🏢"
          color="bg-yellow-100"
        />
        <Card
          title="Total Cost"
          amount={costEstimate.totalCost}
          icon="📊"
          color="bg-purple-100"
        />
      </div>

      <div className="mt-8 space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Materials Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {costEstimate.materials.map((material, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{material.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{material.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{material.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{material.rate.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{material.total.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Labor Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {costEstimate.labor.map((labor, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{labor.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{labor.hours}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{labor.rate.toLocaleString('en-IN')}/hr</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{labor.total.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
