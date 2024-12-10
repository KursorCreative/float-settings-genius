import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bike, Ruler } from "lucide-react";

interface BikeDetailsSectionProps {
  bikeType: string;
  setBikeType: (value: string) => void;
  bikeSize: string;
  setBikeSize: (value: string) => void;
}

export const BikeDetailsSection = ({
  bikeType,
  setBikeType,
  bikeSize,
  setBikeSize,
}: BikeDetailsSectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 pb-2">
        <Bike className="w-5 h-5 text-fox-orange" />
        <h2 className="text-lg font-semibold">Bike Details</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-base font-medium inline-flex items-center gap-2">
            Trek EXE Model
          </Label>
          <Select value={bikeType} onValueChange={setBikeType}>
            <SelectTrigger className="w-full h-11 transition-all duration-300 hover:border-fox-orange focus:ring-fox-orange">
              <SelectValue placeholder="Select EXE model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exe-9.9">EXE 9.9 XX1 AXS</SelectItem>
              <SelectItem value="exe-9.8">EXE 9.8 XT</SelectItem>
              <SelectItem value="exe-9.7">EXE 9.7 GX AXS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-base font-medium inline-flex items-center gap-2">
            <Ruler className="w-4 h-4 text-fox-orange" />
            Frame Size
          </Label>
          <Select value={bikeSize} onValueChange={setBikeSize}>
            <SelectTrigger className="w-full h-11 transition-all duration-300 hover:border-fox-orange focus:ring-fox-orange">
              <SelectValue placeholder="Select frame size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="S">Small</SelectItem>
              <SelectItem value="M">Medium</SelectItem>
              <SelectItem value="L">Large</SelectItem>
              <SelectItem value="XL">X-Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};