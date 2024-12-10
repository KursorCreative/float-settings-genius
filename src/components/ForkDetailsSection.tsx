import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ForkDetailsSectionProps {
  forkTravel: string;
  setForkTravel: (value: string) => void;
}

export const ForkDetailsSection = ({
  forkTravel,
  setForkTravel,
}: ForkDetailsSectionProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Fox 36 Factory Fork Travel</Label>
      <Select value={forkTravel} onValueChange={setForkTravel}>
        <SelectTrigger className="w-full h-11 transition-colors hover:border-fox-orange">
          <SelectValue placeholder="Select fork travel" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="150">150mm</SelectItem>
          <SelectItem value="160">160mm</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};