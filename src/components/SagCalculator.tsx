import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ruler, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SagCalculatorProps {
  weight: number;
  unit: "kg" | "lbs";
  ridingStyle: string;
}

export const SagCalculator = ({ weight, unit, ridingStyle }: SagCalculatorProps) => {
  const [desiredSag, setDesiredSag] = React.useState("30");
  const [observedSag, setObservedSag] = React.useState("");
  const totalTravel = 55; // Fox Float X2 on Trek Fuel EXe

  const calculateStaticSag = () => {
    return (totalTravel * parseInt(desiredSag)) / 100;
  };

  const getRecommendedSag = (style: string) => {
    switch (style) {
      case "flow":
        return "25-30%";
      case "technical":
        return "28-33%";
      case "trail":
      default:
        return "25-30%";
    }
  };

  const getSagFeedback = () => {
    if (!observedSag) return null;
    
    const observed = parseFloat(observedSag);
    const target = calculateStaticSag();
    const difference = observed - target;
    
    if (Math.abs(difference) <= 2) {
      return "Perfect sag achieved! ✅";
    } else if (difference > 0) {
      return "Decrease air pressure to achieve target sag";
    } else {
      return "Increase air pressure to achieve target sag";
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Ruler className="w-5 h-5 text-fox-orange" />
          <CardTitle>Sag Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-base font-medium">Desired Sag Percentage</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[300px] p-4">
                    <p>Recommended sag for your style: {getRecommendedSag(ridingStyle)}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Sag is the suspension compression under rider weight in riding position
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select value={desiredSag} onValueChange={setDesiredSag}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select desired sag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20% (XC/Race)</SelectItem>
                <SelectItem value="25">25% (Trail/Flow)</SelectItem>
                <SelectItem value="30">30% (All-Mountain)</SelectItem>
                <SelectItem value="35">35% (Enduro/DH)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Observed Sag (mm)</Label>
            <Input
              type="number"
              value={observedSag}
              onChange={(e) => setObservedSag(e.target.value)}
              placeholder="Measure using o-ring"
              className="w-full"
            />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Target Sag Distance</p>
              <p className="text-2xl font-semibold text-fox-orange">
                {calculateStaticSag().toFixed(1)}mm
              </p>
            </div>
            {observedSag && (
              <div>
                <p className="text-sm text-muted-foreground">Feedback</p>
                <p className="text-lg font-medium">{getSagFeedback()}</p>
              </div>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>💡 How to measure sag:</p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Clean the shock stanchion and slide the o-ring against the wiper seal</li>
              <li>Gear up and carefully mount your bike</li>
              <li>Stand on the pedals in your natural riding position</li>
              <li>Carefully dismount and measure the distance the o-ring has moved</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};