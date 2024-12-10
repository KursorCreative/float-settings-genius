import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WeightConverterProps {
  weight: number;
  unit: 'kg' | 'lbs';
  onWeightChange: (weight: number) => void;
  onUnitChange: (unit: 'kg' | 'lbs') => void;
}

export const WeightConverter: React.FC<WeightConverterProps> = ({
  weight,
  unit,
  onWeightChange,
  onUnitChange,
}) => {
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = parseFloat(e.target.value) || 0;
    onWeightChange(newWeight);
  };

  const toggleUnit = () => {
    const newUnit = unit === 'kg' ? 'lbs' : 'kg';
    const newWeight = unit === 'kg' ? weight * 2.20462 : weight / 2.20462;
    onUnitChange(newUnit);
    onWeightChange(Math.round(newWeight * 10) / 10);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <Label htmlFor="weight">Rider Weight</Label>
        <Input
          id="weight"
          type="number"
          value={weight}
          onChange={handleWeightChange}
          min="0"
          step="0.1"
          className="mt-1"
        />
      </div>
      <button
        onClick={toggleUnit}
        className="px-3 py-2 rounded bg-fox-blue text-white hover:bg-opacity-90 transition-colors mt-6"
      >
        {unit.toUpperCase()}
      </button>
    </div>
  );
};