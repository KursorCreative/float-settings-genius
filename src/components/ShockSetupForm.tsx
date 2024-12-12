import React, { useState } from "react";
import { WeightConverter } from "./WeightConverter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShockSettings } from "./ShockSettings";
import { ShockFormFields } from "./ShockFormFields";
import { SagCalculator } from "./SagCalculator";
import { calculateShockSettings } from "@/utils/shockCalculations";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import { SpacerRecommendation } from "./SpacerRecommendation";

export const ShockSetupForm = () => {
  const { toast } = useToast();
  const [weight, setWeight] = useState(70);
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [ridingStyle, setRidingStyle] = useState("trail");
  const [bikeType, setBikeType] = useState("exe-9.8");
  const [travel, setTravel] = useState(140);
  const [forkTravel, setForkTravel] = useState("150");
  const [preferredFeel, setPreferredFeel] = useState("balanced");
  const [trailCondition, setTrailCondition] = useState("technical");
  const [priority, setPriority] = useState("balanced");
  const [bikeSize, setBikeSize] = useState("M");

  const settings = calculateShockSettings(weight, unit, ridingStyle, preferredFeel, bikeSize);

  const handleReset = () => {
    setWeight(70);
    setUnit("kg");
    setRidingStyle("trail");
    setBikeType("exe-9.8");
    setTravel(140);
    setForkTravel("150");
    setPreferredFeel("balanced");
    setTrailCondition("technical");
    setPriority("balanced");
    setBikeSize("M");
    
    toast({
      title: "Settings Reset",
      description: "All values have been reset to defaults.",
    });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text("Trek EXE Suspension Settings", 20, 20);
    
    // Add rider details
    doc.setFontSize(12);
    doc.text(`Rider Weight: ${weight} ${unit}`, 20, 40);
    doc.text(`Trek EXE Model: ${bikeType}`, 20, 50);
    doc.text(`Frame Size: ${bikeSize}`, 20, 60);
    doc.text(`Riding Style: ${ridingStyle}`, 20, 70);
    doc.text(`Rear Travel: ${travel}mm`, 20, 80);
    doc.text(`Fork Travel: ${forkTravel}mm`, 20, 90);
    doc.text(`Preferred Feel: ${preferredFeel}`, 20, 100);
    doc.text(`Trail Condition: ${trailCondition}`, 20, 110);
    doc.text(`Priority: ${priority}`, 20, 120);
    
    // Add shock settings
    doc.setFontSize(16);
    doc.text("Recommended Shock Settings:", 20, 140);
    
    doc.setFontSize(12);
    doc.text(`Air Pressure: ${settings.airPressure} PSI`, 20, 160);
    doc.text(`High-Speed Rebound (HSR): ${settings.hsr} clicks`, 20, 170);
    doc.text(`Low-Speed Rebound (LSR): ${settings.lsr} clicks`, 20, 180);
    doc.text(`High-Speed Compression (HSC): ${settings.hsc} clicks`, 20, 190);
    doc.text(`Low-Speed Compression (LSC): ${settings.lsc} clicks`, 20, 200);

    // Add fork settings
    doc.setFontSize(16);
    doc.text("Recommended Fork Settings:", 20, 220);
    
    doc.setFontSize(12);
    doc.text(`Air Pressure: ${settings.forkAirPressure} PSI`, 20, 240);
    doc.text(`High-Speed Rebound (HSR): ${settings.forkHsr} clicks`, 20, 250);
    doc.text(`Low-Speed Rebound (LSR): ${settings.forkLsr} clicks`, 20, 260);
    doc.text(`High-Speed Compression (HSC): ${settings.forkHsc} clicks`, 20, 270);
    doc.text(`Low-Speed Compression (LSC): ${settings.forkLsc} clicks`, 20, 280);
    
    // Save the PDF
    doc.save("trek-exe-suspension-settings.pdf");
    
    toast({
      title: "PDF Downloaded",
      description: "Your suspension settings have been saved as a PDF.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Trek EXE Suspension Setup Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <WeightConverter
          weight={weight}
          unit={unit}
          onWeightChange={setWeight}
          onUnitChange={setUnit}
        />

        <SagCalculator 
          weight={weight}
          unit={unit}
          ridingStyle={ridingStyle}
        />

        <ShockFormFields
          ridingStyle={ridingStyle}
          setRidingStyle={setRidingStyle}
          bikeType={bikeType}
          setBikeType={setBikeType}
          travel={travel}
          setTravel={setTravel}
          forkTravel={forkTravel}
          setForkTravel={setForkTravel}
          preferredFeel={preferredFeel}
          setPreferredFeel={setPreferredFeel}
          trailCondition={trailCondition}
          setTrailCondition={setTrailCondition}
          priority={priority}
          setPriority={setPriority}
          bikeSize={bikeSize}
          setBikeSize={setBikeSize}
        />

        <ShockSettings settings={settings} />

        <SpacerRecommendation
          weight={weight}
          unit={unit}
          ridingStyle={ridingStyle}
          preferredFeel={preferredFeel}
        />

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
