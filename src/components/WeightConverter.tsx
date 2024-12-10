import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WeightConverterProps {
  weight: number;
  unit: "kg" | "lbs";
  onWeightChange: (weight: number) => void;
  onUnitChange: (unit: "kg" | "lbs") => void;
}

export const WeightConverter: React.FC<WeightConverterProps> = ({
  weight,
  unit,
  onWeightChange,
  onUnitChange,
}) => {
  const handleWeightChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    onWeightChange(numValue);
  };

  return (
    <div className="flex gap-4 items-end">
      <div className="flex-1">
        <Label htmlFor="weight">Rider Weight</Label>
        <Input
          id="weight"
          type="number"
          value={weight || ""}
          onChange={(e) => handleWeightChange(e.target.value)}
          className="mt-1"
          placeholder="Enter weight"
        />
      </div>
      <Select value={unit} onValueChange={(value: "kg" | "lbs") => onUnitChange(value)}>
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Unit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="kg">kg</SelectItem>
          <SelectItem value="lbs">lbs</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};