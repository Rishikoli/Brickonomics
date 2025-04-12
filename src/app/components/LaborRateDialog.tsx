'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

interface LaborRate {
  id?: string;
  name: string;
  unit: string;
  baseRate: number;
  category: string;
  description: string | null;
}

interface Props {
  laborRate?: LaborRate;
  onSave: (laborRate: Omit<LaborRate, 'id'>) => Promise<void>;
  trigger: React.ReactNode;
}

export function LaborRateDialog({ laborRate, onSave, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<LaborRate, 'id'>>(
    laborRate || {
      name: '',
      unit: '',
      baseRate: 0,
      category: '',
      description: null,
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.name || !formData.unit || !formData.baseRate || !formData.category) {
        throw new Error('Please fill in all required fields');
      }

      await onSave(formData);
      setOpen(false);
    } catch (err) {
      console.error('Error saving labor rate:', err);
      setError(err instanceof Error ? err.message : 'Failed to save labor rate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {laborRate ? 'Edit Labor Rate' : 'Add Labor Rate'}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Mason"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="skilled">Skilled</SelectItem>
                <SelectItem value="unskilled">Unskilled</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Select
              value={formData.unit}
              onValueChange={(value) =>
                setFormData({ ...formData, unit: value })
              }
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Per Day</SelectItem>
                <SelectItem value="hour">Per Hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseRate">Base Rate (₹)</Label>
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
              placeholder="0.00"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value || null,
                })
              }
              placeholder="Add any additional details"
              disabled={loading}
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
              {loading ? 'Saving...' : laborRate ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
