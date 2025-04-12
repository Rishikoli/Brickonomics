'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Material, getMaterials, updateMaterial, deleteMaterial } from '@/lib/materialService';
import { useRouter } from 'next/navigation';

export default function MaterialsTable() {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      const data = await getMaterials();
      setMaterials(data);
    } catch (error) {
      console.error('Error loading materials:', error);
    }
  };

  const handleUpdateMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMaterial) return;

    try {
      await updateMaterial(editingMaterial);
      setIsEditDialogOpen(false);
      setEditingMaterial(null);
      loadMaterials();
      router.refresh();
    } catch (error) {
      console.error('Error updating material:', error);
    }
  };

  const handleDeleteMaterial = async (id: number) => {
    if (!confirm('Are you sure you want to delete this material?')) return;

    try {
      await deleteMaterial(id);
      loadMaterials();
      router.refresh();
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Base Rate (₹)</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((material) => (
            <TableRow key={material.id}>
              <TableCell>{material.name}</TableCell>
              <TableCell className="capitalize">{material.category}</TableCell>
              <TableCell>{material.baseRate.toLocaleString('en-IN')}</TableCell>
              <TableCell>{material.unit}</TableCell>
              <TableCell>{material.description}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingMaterial(material);
                    setIsEditDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-100"
                  onClick={() => material.id && handleDeleteMaterial(material.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Material</DialogTitle>
          </DialogHeader>
          {editingMaterial && (
            <form onSubmit={handleUpdateMaterial} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingMaterial.name}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingMaterial.category}
                  onValueChange={(value) => setEditingMaterial({ ...editingMaterial, category: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
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
                <Label htmlFor="edit-baseRate">Base Rate (₹)</Label>
                <Input
                  id="edit-baseRate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingMaterial.baseRate}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, baseRate: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-unit">Unit</Label>
                <Select
                  value={editingMaterial.unit}
                  onValueChange={(value) => setEditingMaterial({ ...editingMaterial, unit: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
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
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={editingMaterial.description || ''}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, description: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">Update Material</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
