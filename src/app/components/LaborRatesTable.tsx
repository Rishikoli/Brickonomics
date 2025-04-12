'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { LaborRateDialog } from './LaborRateDialog';
import { PencilIcon, PlusIcon } from 'lucide-react';

interface LaborRate {
  id: string;
  role: string;
  dailyRate: number;
  location: string;
  skillLevel: string;
}

export function LaborRatesTable() {
  const [laborRates, setLaborRates] = useState<LaborRate[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const fetchLaborRates = async () => {
    try {
      const url = selectedLocation !== "all"
        ? `/api/labor-rates?location=${encodeURIComponent(selectedLocation)}`
        : '/api/labor-rates';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch labor rates');
      const data = await response.json();
      setLaborRates(data);
      
      // Extract unique locations with type safety
      const uniqueLocations = Array.from(
        new Set(data.map((rate: LaborRate) => rate.location))
      ).sort() as string[];
      setLocations(uniqueLocations);
    } catch (error) {
      console.error('Error fetching labor rates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaborRates();
  }, [selectedLocation]);

  const handleSaveLaborRate = async (laborRate: Omit<LaborRate, 'id'>) => {
    try {
      const response = await fetch('/api/labor-rates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(laborRate),
      });

      if (!response.ok) throw new Error('Failed to save labor rate');
      await fetchLaborRates(); // Refresh the list
    } catch (error) {
      console.error('Error saving labor rate:', error);
    }
  };

  if (loading) {
    return <div>Loading labor rates...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label htmlFor="location" className="text-sm font-medium">
            Filter by Location:
          </label>
          <Select
            value={selectedLocation}
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <LaborRateDialog
          onSave={handleSaveLaborRate}
          trigger={
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Labor Rate
            </Button>
          }
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Skill Level</TableHead>
              <TableHead className="text-right">Daily Rate (₹)</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {laborRates.map((rate) => (
              <TableRow key={rate.id}>
                <TableCell className="font-medium">{rate.role}</TableCell>
                <TableCell>{rate.location}</TableCell>
                <TableCell>{rate.skillLevel}</TableCell>
                <TableCell className="text-right">₹{rate.dailyRate.toFixed(2)}</TableCell>
                <TableCell>
                  <LaborRateDialog
                    laborRate={rate}
                    onSave={handleSaveLaborRate}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
