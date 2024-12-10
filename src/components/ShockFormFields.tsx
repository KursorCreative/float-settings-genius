import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { BikeDetailsSection } from "./BikeDetailsSection";
import { RidingPreferencesSection } from "./RidingPreferencesSection";
import { ForkDetailsSection } from "./ForkDetailsSection";

interface ShockFormFieldsProps {
  ridingStyle: string;
  setRidingStyle: (value: string) => void;
  bikeType: string;
  setBikeType: (value: string) => void;
  travel: number;
  setTravel: (value: number) => void;
  forkTravel: string;
  setForkTravel: (value: string) => void;
  preferredFeel: string;
  setPreferredFeel: (value: string) => void;
  trailCondition: string;
  setTrailCondition: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  bikeSize: string;
  setBikeSize: (value: string) => void;
}

export const ShockFormFields = ({
  ridingStyle,
  setRidingStyle,
  bikeType,
  setBikeType,
  travel,
  setTravel,
  forkTravel,
  setForkTravel,
  preferredFeel,
  setPreferredFeel,
  trailCondition,
  setTrailCondition,
  priority,
  setPriority,
  bikeSize,
  setBikeSize,
}: ShockFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <BikeDetailsSection
        bikeType={bikeType}
        setBikeType={setBikeType}
        bikeSize={bikeSize}
        setBikeSize={setBikeSize}
      />

      <ForkDetailsSection
        forkTravel={forkTravel}
        setForkTravel={setForkTravel}
      />

      <RidingPreferencesSection
        ridingStyle={ridingStyle}
        setRidingStyle={setRidingStyle}
        preferredFeel={preferredFeel}
        setPreferredFeel={setPreferredFeel}
        trailCondition={trailCondition}
        setTrailCondition={setTrailCondition}
        priority={priority}
        setPriority={setPriority}
      />

      <div className="space-y-3">
        <Label className="text-base font-medium">Rear Travel (140mm)</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="pt-2">
                <Slider
                  value={[140]}
                  disabled={true}
                  min={140}
                  max={140}
                  step={10}
                  className="cursor-not-allowed [&>[role=slider]]:bg-fox-orange [&>[role=slider]]:border-fox-orange [&>.relative>.absolute]:bg-fox-orange"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Trek EXE models have fixed 140mm rear travel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="text-right text-sm text-muted-foreground">
          140mm
        </div>
      </div>
    </div>
  );
};