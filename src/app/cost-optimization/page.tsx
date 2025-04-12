'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '../components/Card';

type Project = {
  id: string;
  project_name: string;
  project_type: string;
  total_area: number;
  estimated_duration: number;
  location: string;
  requirements: string;
  status: string;
};

type CostAnalysis = {
  id: string;
  project_id: string;
  material_cost: number;
  labor_cost: number;
  transportation_cost: number;
  overhead_cost: number;
  total_cost: number;
  cost_per_sqft: number;
};

type Optimization = {
  title: string;
  description: string;
  potentialSavings: number;
  implementationCost: number;
  netSavings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeframe: string;
};

export default function CostOptimization() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');
  const [project, setProject] = useState<Project | null>(null);
  const [costAnalysis, setCostAnalysis] = useState<CostAnalysis | null>(null);
  const [optimizations, setOptimizations] = useState<Optimization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) return;

      try {
        // Fetch project and cost analysis data
        const response = await fetch(`/api/cost-analysis?project=${projectId}`);
        if (!response.ok) throw new Error('Failed to fetch project data');
        
        const data = await response.json();
        setProject(data.project);
        setCostAnalysis(data.costAnalysis);

        // Generate optimizations based on project data
        const suggestions: Optimization[] = generateOptimizations(data.project, data.costAnalysis);
        setOptimizations(suggestions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const generateOptimizations = (project: Project, costs: CostAnalysis): Optimization[] => {
    const suggestions: Optimization[] = [];

    // Material optimization
    if (costs.material_cost > 0) {
      suggestions.push({
        title: 'Alternative Material Selection',
        description: `Consider using alternative materials that offer similar properties at a lower cost for ${project.project_type} projects.`,
        potentialSavings: costs.material_cost * 0.15,
        implementationCost: costs.material_cost * 0.05,
        netSavings: costs.material_cost * 0.1,
        difficulty: 'Medium',
        timeframe: '2-3 weeks'
      });
    }

    // Labor optimization
    if (costs.labor_cost > 0) {
      suggestions.push({
        title: 'Optimized Labor Schedule',
        description: 'Implement a more efficient work schedule to reduce overtime and improve productivity.',
        potentialSavings: costs.labor_cost * 0.12,
        implementationCost: costs.labor_cost * 0.02,
        netSavings: costs.labor_cost * 0.1,
        difficulty: 'Easy',
        timeframe: '1 week'
      });
    }

    // Design optimization
    suggestions.push({
      title: 'Structural Design Optimization',
      description: 'Optimize the structural design to reduce material usage while maintaining safety standards.',
      potentialSavings: costs.total_cost * 0.1,
      implementationCost: costs.total_cost * 0.03,
      netSavings: costs.total_cost * 0.07,
      difficulty: 'Hard',
      timeframe: '4-6 weeks'
    });

    return suggestions;
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl text-gray-300">Loading cost analysis...</div>
    </div>;
  }

  if (!project || !costAnalysis) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl text-gray-300">No project data found</div>
    </div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Cost Optimization
        </h1>
        <p className="text-gray-300 text-lg">
          Project: {project.project_name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card
          title="Material Cost"
          value={costAnalysis.material_cost}
          type="currency"
        />
        <Card
          title="Labor Cost"
          value={costAnalysis.labor_cost}
          type="currency"
        />
        <Card
          title="Total Cost"
          value={costAnalysis.total_cost}
          type="currency"
          highlight
        />
        <Card
          title="Cost per Sq.ft"
          value={costAnalysis.cost_per_sqft}
          type="currency"
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">
          Optimization Suggestions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {optimizations.map((opt, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            >
              <h3 className="text-xl font-semibold text-gray-100 mb-3">
                {opt.title}
              </h3>
              <p className="text-gray-300 mb-4">{opt.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Potential Savings</span>
                  <span className="text-green-400">
                    ₹{opt.potentialSavings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Implementation Cost</span>
                  <span className="text-red-400">
                    ₹{opt.implementationCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-400">Net Savings</span>
                  <span className="text-blue-400">
                    ₹{opt.netSavings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-4">
                  <span className="text-gray-400">Difficulty</span>
                  <span
                    className={`${
                      opt.difficulty === 'Easy'
                        ? 'text-green-400'
                        : opt.difficulty === 'Medium'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}
                  >
                    {opt.difficulty}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Timeframe</span>
                  <span className="text-gray-300">{opt.timeframe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
