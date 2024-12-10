import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RidingPreferencesSectionProps {
  ridingStyle: string;
  setRidingStyle: (value: string) => void;
  preferredFeel: string;
  setPreferredFeel: (value: string) => void;
  trailCondition: string;
  setTrailCondition: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
}

export const RidingPreferencesSection = ({
  ridingStyle,
  setRidingStyle,
  preferredFeel,
  setPreferredFeel,
  trailCondition,
  setTrailCondition,
  priority,
  setPriority,
}: RidingPreferencesSectionProps) => {
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
              <SelectItem value="trail">Trail</SelectItem>
              <SelectItem value="flow">Flow Trails</SelectItem>
              <SelectItem value="technical">Technical Trails</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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

        <div className="space-y-2">
          <Label className="text-base font-medium">Priority</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="w-full h-11 transition-colors hover:border-fox-orange">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="climbing">Climbing Efficiency</SelectItem>
              <SelectItem value="descending">Descending Performance</SelectItem>
              <SelectItem value="balanced">Balanced Performance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};