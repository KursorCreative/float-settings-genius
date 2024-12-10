interface ShockSettings {
  airPressure: number;
  hsr: number;
  lsr: number;
  hsc: number;
  lsc: number;
  forkAirPressure: number;
  forkHsr: number;
  forkLsr: number;
  forkHsc: number;
  forkLsc: number;
  stackHeight: number;
  headAngle: number;
}

const calculateGeometryChanges = (forkTravel: string) => {
  // Base geometry for 150mm fork (stock)
  const baseStackHeight = 630; // mm
  const baseHeadAngle = 65.5; // degrees
  
  // Calculate differences based on fork travel
  switch (forkTravel) {
    case "140":
      return {
        stackHeightDiff: -10, // 10mm lower
        headAngleDiff: 0.5, // 0.5° steeper
      };
    case "160":
      return {
        stackHeightDiff: 10, // 10mm higher
        headAngleDiff: -0.5, // 0.5° slacker
      };
    default: // 150mm (stock)
      return {
        stackHeightDiff: 0,
        headAngleDiff: 0,
      };
  }
};

export const calculateShockSettings = (
  weight: number,
  unit: "kg" | "lbs",
  ridingStyle: string,
  preferredFeel: string,
  frameSize: string,
  forkTravel: string = "150" // Default to 150mm
): ShockSettings => {
  // Convert weight to kg if needed
  const weightInKg = unit === "lbs" ? weight * 0.453592 : weight;
  
  // Base calculations for Trek EXE (Horst Link suspension)
  let airPressure = weightInKg * 1.2;
  let hsr = 8;
  let lsr = 10;
  let hsc = 12;
  let lsc = 14;

  // Fork base calculations
  let forkAirPressure = weightInKg * 0.9;
  let forkHsr = 7;
  let forkLsr = 9;
  let forkHsc = 11;
  let forkLsc = 13;

  // Calculate geometry changes based on fork travel
  const geometryChanges = calculateGeometryChanges(forkTravel);
  const stackHeight = 630 + geometryChanges.stackHeightDiff; // Base stack height + difference
  const headAngle = 65.5 + geometryChanges.headAngleDiff; // Base head angle + difference

  // Adjust fork settings based on travel
  if (forkTravel === "160") {
    forkAirPressure *= 1.05; // Slightly higher pressure for longer travel
    forkHsc += 1; // More high-speed compression for bigger hits
  } else if (forkTravel === "140") {
    forkAirPressure *= 0.95; // Slightly lower pressure for shorter travel
    forkLsc -= 1; // Less low-speed compression for better small bump sensitivity
  }

  switch (frameSize) {
    case "XL":
      hsr += 1;
      lsr += 1;
      forkHsr += 1;
      forkLsr += 1;
      break;
    case "L":
      hsr += 0.5;
      lsr += 0.5;
      forkHsr += 0.5;
      forkLsr += 0.5;
      break;
    case "S":
      hsr -= 0.5;
      lsr -= 0.5;
      forkHsr -= 0.5;
      forkLsr -= 0.5;
      break;
  }

  // Adjust for riding style
  switch (ridingStyle) {
    case "trail":
      hsr += 1;
      lsc += 1;
      forkHsr += 1;
      forkLsc += 1;
      break;
    case "flow":
      airPressure *= 1.05;
      forkAirPressure *= 1.05;
      hsr -= 1;
      forkHsr -= 1;
      hsc += 2;
      forkHsc += 2;
      break;
    case "technical":
      airPressure *= 0.95;
      forkAirPressure *= 0.95;
      lsc -= 2;
      forkLsc -= 2;
      lsr += 1;
      forkLsr += 1;
      break;
  }

  // Adjust for preferred feel
  switch (preferredFeel) {
    case "soft":
      airPressure *= 0.95;
      forkAirPressure *= 0.95;
      hsc -= 2;
      forkHsc -= 2;
      lsc -= 2;
      forkLsc -= 2;
      break;
    case "firm":
      airPressure *= 1.05;
      forkAirPressure *= 1.05;
      hsc += 2;
      forkHsc += 2;
      lsc += 2;
      forkLsc += 2;
      break;
  }

  return {
    airPressure: Math.round(airPressure),
    hsr: Math.max(0, Math.min(Math.round(hsr), 16)),
    lsr: Math.max(0, Math.min(Math.round(lsr), 16)),
    hsc: Math.max(0, Math.min(Math.round(hsc), 16)),
    lsc: Math.max(0, Math.min(Math.round(lsc), 16)),
    forkAirPressure: Math.round(forkAirPressure),
    forkHsr: Math.max(0, Math.min(Math.round(forkHsr), 16)),
    forkLsr: Math.max(0, Math.min(Math.round(forkLsr), 16)),
    forkHsc: Math.max(0, Math.min(Math.round(forkHsc), 16)),
    forkLsc: Math.max(0, Math.min(Math.round(forkLsc), 16)),
    stackHeight,
    headAngle,
  };
};
