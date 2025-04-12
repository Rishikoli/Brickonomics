'use client';

import { useState } from 'react';
import MaterialsTable from '../components/MaterialsTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addMaterial } from '@/lib/materialService';
import { useRouter } from 'next/navigation';

export default function MaterialsPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    category: '',
    baseRate: 0,
    unit: '',
    description: ''
  });

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMaterial(newMaterial);
      setOpen(false);
      setNewMaterial({
        name: '',
        category: '',
        baseRate: 0,
        unit: '',
        description: ''
      });
      router.refresh();
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

  return (
    <main className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Materials Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add New Material</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Material</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddMaterial} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMaterial.name}
                  onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newMaterial.category}
                  onValueChange={(value) => setNewMaterial({ ...newMaterial, category: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cement">Cement</SelectItem>
                    <SelectItem value="steel">Steel</SelectItem>
                    <SelectItem value="bricks">Bricks</SelectItem>
                    <SelectItem value="sand">Sand</SelectItem>
                    <SelectItem value="aggregate">Aggregate</SelectItem>
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
                  value={newMaterial.baseRate}
                  onChange={(e) => setNewMaterial({ ...newMaterial, baseRate: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select
                  value={newMaterial.unit}
                  onValueChange={(value) => setNewMaterial({ ...newMaterial, unit: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bag">Bag</SelectItem>
                    <SelectItem value="kg">Kilogram</SelectItem>
                    <SelectItem value="piece">Piece</SelectItem>
                    <SelectItem value="cu.m">Cubic Meter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">Add Material</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <MaterialsTable />
    </main>
  );
}
