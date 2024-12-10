import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

interface ForkDetailsSectionProps {
  forkTravel: string;
  setForkTravel: (value: string) => void;
}

export const ForkDetailsSection = ({
  forkTravel,
  setForkTravel,
}: ForkDetailsSectionProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 pb-2">
        <SlidersHorizontal className="w-5 h-5 text-fox-blue" />
        <h2 className="text-lg font-semibold">Fork Settings</h2>
      </div>
      
      <div className="space-y-2">
        <Label className="text-base font-medium">Fox 36 Factory Fork Travel</Label>
        <Select value={forkTravel} onValueChange={setForkTravel}>
          <SelectTrigger className="w-full h-11 transition-all duration-300 hover:border-fox-blue focus:ring-fox-blue">
            <SelectValue placeholder="Select fork travel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="150">150mm</SelectItem>
            <SelectItem value="160">160mm</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};