import React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateSpacers } from "@/utils/spacerCalculations";

interface SpacerRecommendationProps {
  weight: number;
  unit: "kg" | "lbs";
  ridingStyle: string;
  preferredFeel: string;
}

export const SpacerRecommendation = ({
  weight,
  unit,
  ridingStyle,
  preferredFeel,
}: SpacerRecommendationProps) => {
  const spacers = calculateSpacers({
    weight,
    unit,
    ridingStyle,
    preferredFeel,
  });

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Volume Spacer Recommendation</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px] p-4">
                <p>Volume spacers change the air spring's progression:</p>
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  <li>More spacers increase bottom-out resistance</li>
                  <li>Fewer spacers provide a more linear feel</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold text-fox-orange">{spacers}</span>
          <span className="text-lg ml-2 text-muted-foreground">spacers recommended</span>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="font-medium mb-2">💡 Pro Tip:</p>
          <p>
            Add more spacers for aggressive riding or steep descents. 
            Remove spacers for smoother trails or to increase small bump compliance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};