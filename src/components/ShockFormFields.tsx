import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShockFormFieldsProps {
  ridingStyle: string;
  setRidingStyle: (value: string) => void;
  bikeType: string;
  setBikeType: (value: string) => void;
  travel: number;
  setTravel: (value: number) => void;
  preferredFeel: string;
  setPreferredFeel: (value: string) => void;
  trailCondition: string;
  setTrailCondition: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
}

export const ShockFormFields = ({
  ridingStyle,
  setRidingStyle,
  bikeType,
  setBikeType,
  travel,
  setTravel,
  preferredFeel,
  setPreferredFeel,
  trailCondition,
  setTrailCondition,
  priority,
  setPriority,
}: ShockFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-base font-medium">Riding Style</Label>
          <Select value={ridingStyle} onValueChange={setRidingStyle}>
            <SelectTrigger className="w-full h-11 transition-colors hover:border-fox-orange">
              <SelectValue placeholder="Select riding style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xc">Cross-Country (XC)</SelectItem>
              <SelectItem value="trail">Trail</SelectItem>
              <SelectItem value="flow">Flow Trails</SelectItem>
              <SelectItem value="enduro">Enduro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-base font-medium">Bike Type</Label>
          <Select value={bikeType} onValueChange={setBikeType}>
            <SelectTrigger className="w-full h-11 transition-colors hover:border-fox-orange">
              <SelectValue placeholder="Select bike type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Suspension</SelectItem>
              <SelectItem value="hardtail">Hardtail</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium">Rear Travel (mm)</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="pt-2">
                <Slider
                  value={[travel]}
                  onValueChange={(value) => setTravel(value[0])}
                  min={100}
                  max={200}
                  step={10}
                  className="[&>[role=slider]]:bg-fox-orange [&>[role=slider]]:border-fox-orange [&>.relative>.absolute]:bg-fox-orange"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjust rear travel in millimeters</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="text-right text-sm text-muted-foreground">
          {travel}mm
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-base font-medium">Preferred Feel</Label>
          <Select value={preferredFeel} onValueChange={setPreferredFeel}>
            <SelectTrigger className="w-full h-11 transition-colors hover:border-fox-orange">
              <SelectValue placeholder="Select preferred feel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soft">Soft</SelectItem>
              <SelectItem value="balanced">Balanced</SelectItem>
              <SelectItem value="firm">Firm</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-base font-medium">Trail Conditions</Label>
          <Select value={trailCondition} onValueChange={setTrailCondition}>
            <SelectTrigger className="w-full h-11 transition-colors hover:border-fox-orange">
              <SelectValue placeholder="Select trail conditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="smooth">Smooth</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="jumps">Jumps or Drops</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-medium">Priority</Label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="w-full h-11 transition-colors hover:border-fox-orange">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="climbing">Climbing Efficiency</SelectItem>
            <SelectItem value="descending">Descending Performance</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};