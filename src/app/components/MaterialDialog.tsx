'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Alert, AlertDescription } from '../../components/ui/alert';

interface Material {
  id?: string;
  name: string;
  unit: string;
  baseRate: number;
  category: string;
  description: string | null;
}

interface MaterialDialogProps {
  material?: Material;
  onSave: (material: Omit<Material, 'id'>) => Promise<void>;
  trigger: React.ReactNode;
}

const categories = [
  'cement',
  'steel',
  'bricks',
  'sand',
  'aggregate',
  'tiles',
  'paint',
  'wood',
  'electrical',
  'plumbing',
] as const;

const units = [
  'bag',
  'kg',
  'thousand',
  'cu.m',
  'sq.m',
  'liter',
  'piece',
  'bundle',
  'roll',
  'box',
] as const;

export function MaterialDialog({
  material,
  onSave,
  trigger,
}: MaterialDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Material, 'id'>>(
    material || {
      name: '',
      unit: units[0],
      baseRate: 0,
      category: categories[0],
      description: '',
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.unit || !formData.baseRate || !formData.category) {
        throw new Error('Please fill in all required fields');
      }

      await onSave(formData);
      setOpen(false);
    } catch (err) {
      console.error('Error saving material:', err);
      setError(err instanceof Error ? err.message : 'Failed to save material');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {material ? 'Edit Material' : 'Add New Material'}
          </DialogTitle>
        </DialogHeader>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Unit *</Label>
            <Select
              value={formData.unit}
              onValueChange={(value) =>
                setFormData({ ...formData, unit: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseRate">Base Rate (₹) *</Label>
            <Input
              id="baseRate"
              type="number"
              min="0"
              step="0.01"
              value={formData.baseRate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  baseRate: parseFloat(e.target.value) || 0,
                })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : material ? 'Save Changes' : 'Add Material'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
