interface SpacerCalculationParams {
  weight: number;
  unit: "kg" | "lbs";
  ridingStyle: string;
  preferredFeel: string;
  shockTravel?: number;
}

export const calculateSpacers = ({
  weight,
  unit,
  ridingStyle,
  preferredFeel,
  shockTravel = 140,
}: SpacerCalculationParams): number => {
  // Convert weight to kg if needed
  const weightInKg = unit === "lbs" ? weight * 0.453592 : weight;
  
  // Calculate base spacers based on weight
  const baseSpacers = Math.ceil(weightInKg / 50);

  // Adjustments for riding style
  const styleAdjustments: Record<string, number> = {
    "flow": -1,        // Flow trails need fewer spacers
    "trail": 0,        // Neutral adjustment
    "technical": 1     // Technical trails need more spacers
  };

  // Adjustments for preferred feel
  const feelAdjustments: Record<string, number> = {
    "soft": -1,      // Softer feel reduces spacers
    "balanced": 0,   // Neutral adjustment
    "firm": 1        // Firmer feel adds spacers
  };

  // Calculate final spacers
  let spacers = baseSpacers + 
    (styleAdjustments[ridingStyle] || 0) + 
    (feelAdjustments[preferredFeel] || 0);

  // Ensure spacers stay within realistic limits (0-5)
  return Math.max(0, Math.min(5, spacers));
};