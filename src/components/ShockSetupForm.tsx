import React, { useState } from "react";
import { WeightConverter } from "./WeightConverter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShockSettings } from "./ShockSettings";
import { ShockFormFields } from "./ShockFormFields";
import { calculateShockSettings } from "@/utils/shockCalculations";

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

  const settings = calculateShockSettings(weight, unit, ridingStyle, preferredFeel);

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

        <ShockFormFields
          ridingStyle={ridingStyle}
          setRidingStyle={setRidingStyle}
          bikeType={bikeType}
          setBikeType={setBikeType}
          travel={travel}
          setTravel={setTravel}
          preferredFeel={preferredFeel}
          setPreferredFeel={setPreferredFeel}
          trailCondition={trailCondition}
          setTrailCondition={setTrailCondition}
          priority={priority}
          setPriority={setPriority}
        />

        <ShockSettings settings={settings} />

        <div className="flex justify-end">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};