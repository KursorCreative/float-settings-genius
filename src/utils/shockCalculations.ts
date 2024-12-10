interface ShockSettings {
  airPressure: number;
  hsr: number;
  lsr: number;
  hsc: number;
  lsc: number;
}

export const calculateShockSettings = (
  weight: number,
  unit: "kg" | "lbs",
  ridingStyle: string,
  preferredFeel: string,
  frameSize: string
): ShockSettings => {
  // Convert weight to kg if needed
  const weightInKg = unit === "lbs" ? weight * 0.453592 : weight;
  
  // Base calculations for Trek EXE (Horst Link suspension)
  // Starting point optimized for 140mm travel
  let airPressure = weightInKg * 1.2; // Slightly higher base pressure for Horst Link
  let hsr = 8;  // Base HSR for Horst Link
  let lsr = 10; // Base LSR for Horst Link
  let hsc = 12; // Base HSC for Horst Link
  let lsc = 14; // Base LSC for Horst Link

  // Adjust for frame size
  switch (frameSize) {
    case "XL":
      // Larger frames need slightly slower rebound due to longer leverage
      hsr += 1;
      lsr += 1;
      break;
    case "L":
      // Slight adjustment for large frames
      hsr += 0.5;
      lsr += 0.5;
      break;
    case "S":
      // Smaller frames might need slightly faster rebound
      hsr -= 0.5;
      lsr -= 0.5;
      break;
    // Medium is default
  }

  // Adjust for riding style
  switch (ridingStyle) {
    case "trail":
      // Balanced settings for trail riding
      hsr += 1;
      lsc += 1;
      break;
    case "flow":
      // More pop and support for flow trails
      airPressure *= 1.05;
      hsr -= 1;
      hsc += 2;
      break;
    case "technical":
      // More compliance for technical terrain
      airPressure *= 0.95;
      lsc -= 2;
      lsr += 1;
      break;
  }

  // Adjust for preferred feel
  switch (preferredFeel) {
    case "soft":
      airPressure *= 0.95;
      hsc -= 2;
      lsc -= 2;
      break;
    case "firm":
      airPressure *= 1.05;
      hsc += 2;
      lsc += 2;
      break;
    // balanced is default
  }

  return {
    airPressure: Math.round(airPressure),
    hsr: Math.max(0, Math.min(Math.round(hsr), 16)), // Ensure within 0-16 range
    lsr: Math.max(0, Math.min(Math.round(lsr), 16)),
    hsc: Math.max(0, Math.min(Math.round(hsc), 16)),
    lsc: Math.max(0, Math.min(Math.round(lsc), 16)),
  };
};