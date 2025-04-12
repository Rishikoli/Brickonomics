'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

const projectTypes = [
  'residential',
  'commercial',
  'industrial',
  'infrastructure',
] as const;

const locations = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Pune',
  'Nagpur',
  'Chennai',
  'Kolkata',
  'Hyderabad',
] as const;

type ProjectType = typeof projectTypes[number];
type Location = typeof locations[number];

interface FormData {
  projectName: string;
  projectType: ProjectType;
  totalArea: string;
  estimatedDuration: string;
  location: Location;
  requirements: string;
}

export default function ProjectInput() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    projectType: projectTypes[0],
    totalArea: '',
    estimatedDuration: '',
    location: locations[0],
    requirements: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/cost-estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          totalArea: parseFloat(formData.totalArea),
          estimatedDuration: parseInt(formData.estimatedDuration),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate cost estimate');
      }

      const data = await response.json();
      router.push(`/cost-optimization?projectId=${data.project.id}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate cost estimate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Project Details</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={formData.projectName}
              onChange={(e) =>
                setFormData({ ...formData, projectName: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <Select
                value={formData.projectType}
                onValueChange={(value: ProjectType) =>
                  setFormData({ ...formData, projectType: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                value={formData.location}
                onValueChange={(value: Location) =>
                  setFormData({ ...formData, location: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalArea">Total Area (sq.ft)</Label>
              <Input
                id="totalArea"
                type="number"
                min="0"
                step="0.01"
                value={formData.totalArea}
                onChange={(e) =>
                  setFormData({ ...formData, totalArea: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedDuration">
                Estimated Duration (days)
              </Label>
              <Input
                id="estimatedDuration"
                type="number"
                min="1"
                step="1"
                value={formData.estimatedDuration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedDuration: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Special Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              placeholder="Enter any special requirements or notes"
              className="h-32"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Generating Estimate...' : 'Generate Cost Estimate'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
