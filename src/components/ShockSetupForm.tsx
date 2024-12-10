import React, { useState } from "react";
import { WeightConverter } from "./WeightConverter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ShockSetupForm = () => {
  const { toast } = useToast();
  const [weight, setWeight] = useState(70);
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [ridingStyle, setRidingStyle] = useState("trail");
  const [bikeType, setBikeType] = useState("full");
  const [travel, setTravel] = useState(150);
  const [preferredFeel, setPreferredFeel] = useState("balanced");
  const [trailCondition, setTrailCondition] = useState("technical");
  const [priority, setPriority] = useState("descending");

  const calculateSettings = () => {
    // Convert weight to kg if needed
    const weightInKg = unit === "lbs" ? weight * 0.453592 : weight;
    
    // Base calculations
    let airPressure = weightInKg * 1.1; // Basic calculation - would need refinement
    let hsr = 8;
    let lsr = 10;
    let hsc = 12;
    let lsc = 14;

    // Adjust for riding style
    if (ridingStyle === "xc") {
      airPressure *= 1.1;
      hsr -= 2;
      lsr -= 2;
    } else if (ridingStyle === "enduro") {
      airPressure *= 0.9;
      hsc += 2;
      lsc += 2;
    }

    // Adjust for preferred feel
    if (preferredFeel === "soft") {
      airPressure *= 0.95;
      hsc -= 1;
      lsc -= 1;
    } else if (preferredFeel === "firm") {
      airPressure *= 1.05;
      hsc += 1;
      lsc += 1;
    }

    return {
      airPressure: Math.round(airPressure),
      hsr,
      lsr,
      hsc,
      lsc,
    };
  };

  const settings = calculateSettings();

  const handleReset = () => {
    setWeight(70);
    setUnit("kg");
    setRidingStyle("trail");
    setBikeType("full");
    setTravel(150);
    setPreferredFeel("balanced");
    setTrailCondition("technical");
    setPriority("descending");
    
    toast({
      title: "Settings Reset",
      description: "All values have been reset to defaults.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Shock Setup Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <WeightConverter
          weight={weight}
          unit={unit}
          onWeightChange={setWeight}
          onUnitChange={setUnit}
        />

        <div className="space-y-4">
          <div>
            <Label>Riding Style</Label>
            <Select value={ridingStyle} onValueChange={setRidingStyle}>
              <SelectTrigger>
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

          <div>
            <Label>Bike Type</Label>
            <Select value={bikeType} onValueChange={setBikeType}>
              <SelectTrigger>
                <SelectValue placeholder="Select bike type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Suspension</SelectItem>
                <SelectItem value="hardtail">Hardtail</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Rear Travel (mm)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Slider
                    value={[travel]}
                    onValueChange={(value) => setTravel(value[0])}
                    min={100}
                    max={200}
                    step={10}
                    className="mt-2"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adjust rear travel in millimeters</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="text-right text-sm text-muted-foreground mt-1">
              {travel}mm
            </div>
          </div>

          <div>
            <Label>Preferred Feel</Label>
            <Select value={preferredFeel} onValueChange={setPreferredFeel}>
              <SelectTrigger>
                <SelectValue placeholder="Select preferred feel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soft">Soft</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="firm">Firm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Trail Conditions</Label>
            <Select value={trailCondition} onValueChange={setTrailCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Select trail conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smooth">Smooth</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="jumps">Jumps or Drops</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="climbing">Climbing Efficiency</SelectItem>
                <SelectItem value="descending">Descending Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Recommended Settings</h3>
          <div className="space-y-2">
            <p>Air Pressure: {settings.airPressure} PSI</p>
            <p>High-Speed Rebound (HSR): {settings.hsr} clicks out</p>
            <p>Low-Speed Rebound (LSR): {settings.lsr} clicks out</p>
            <p>High-Speed Compression (HSC): {settings.hsc} clicks out</p>
            <p>Low-Speed Compression (LSC): {settings.lsc} clicks out</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};