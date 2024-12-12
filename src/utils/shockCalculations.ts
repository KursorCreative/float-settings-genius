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

const calculateAirPressure = (weightKg: number, ridingStyle: string): number => {
  // Base multiplier (K) varies by riding style
  let k = 2.8; // Default for trail riding
  
  switch (ridingStyle) {
    case "flow":
      k = 3.0; // Firmer for jumps and drops
      break;
    case "technical":
      k = 2.5; // Softer for technical terrain
      break;
    default: // trail
      k = 2.8;
  }
  
  return Math.round(weightKg * k);
};

const calculateCompressionSettings = (weightKg: number, ridingStyle: string, preferredFeel: string) => {
  // Base values for shock compression (Fox recommended)
  const baseLSC = 12;
  const baseHSC = 8;
  
  // Calculate initial LSC and HSC based on weight
  let lsc = Math.round(baseLSC - (weightKg / 10));
  let hsc = Math.round(baseHSC - (weightKg / 15));
  
  // Riding style adjustments
  const styleAdjustments = {
    "trail": 0,
    "flow": -2,
    "technical": 2
  };
  
  // Feel adjustments
  const feelAdjustments = {
    "balanced": 0,
    "soft": 1,
    "firm": -1
  };
  
  // Apply adjustments
  lsc += (styleAdjustments[ridingStyle] || 0);
  hsc += (styleAdjustments[ridingStyle] || 0);
  lsc += (feelAdjustments[preferredFeel] || 0);
  hsc += (feelAdjustments[preferredFeel] || 0);
  
  // Ensure values stay within valid range (2-14 clicks)
  return {
    lsc: Math.max(2, Math.min(14, lsc)),
    hsc: Math.max(2, Math.min(14, hsc))
  };
};

const calculateReboundSettings = (airPressure: number, ridingStyle: string) => {
  // Base values
  const baseLSR = 10;
  const baseHSR = 3;
  
  // Calculate using air pressure-based formulas
  let lsr = Math.round(baseLSR + (airPressure / 40));
  let hsr = Math.round(baseHSR + (airPressure / 60));
  
  // Adjust for riding style
  switch (ridingStyle) {
    case "flow":
      lsr -= 1; // Faster rebound for better pop
      hsr -= 1;
      break;
    case "technical":
      lsr += 1; // Slower rebound for better control
      hsr += 1;
      break;
  }
  
  // Ensure values stay within valid range (0-16)
  return {
    lsr: Math.max(0, Math.min(16, lsr)),
    hsr: Math.max(0, Math.min(16, hsr))
  };
};

const calculateForkSettings = (shockSettings: Partial<ShockSettings>, ridingStyle: string) => {
  // Fork compression settings are typically 1-2 clicks softer than shock
  const forkLSC = Math.max(2, shockSettings.lsc! - 1);
  const forkHSC = Math.max(2, shockSettings.hsc! - 1);
  
  return {
    forkAirPressure: Math.round(shockSettings.airPressure! * 0.9),
    forkHsr: Math.max(2, (shockSettings.hsr! - 1)),
    forkLsr: Math.max(2, (shockSettings.lsr! - 1)),
    forkHsc: forkHSC,
    forkLsc: forkLSC
  };
};

export const calculateShockSettings = (
  weight: number,
  unit: "kg" | "lbs",
  ridingStyle: string,
  preferredFeel: string,
  frameSize: string,
  forkTravel: string = "150"
): ShockSettings => {
  // Convert weight to kg if needed
  const weightInKg = unit === "lbs" ? weight * 0.453592 : weight;
  
  // Calculate base air pressure
  let airPressure = calculateAirPressure(weightInKg, ridingStyle);
  
  // Calculate compression and rebound settings
  const compressionSettings = calculateCompressionSettings(weightInKg, ridingStyle, preferredFeel);
  const reboundSettings = calculateReboundSettings(airPressure, ridingStyle);
  
  // Calculate geometry changes
  const geometryChanges = calculateGeometryChanges(forkTravel);
  const stackHeight = 630 + geometryChanges.stackHeightDiff;
  const headAngle = 65.5 + geometryChanges.headAngleDiff;
  
  // Create base shock settings
  const baseSettings: ShockSettings = {
    airPressure,
    hsr: reboundSettings.hsr,
    lsr: reboundSettings.lsr,
    hsc: compressionSettings.hsc,
    lsc: compressionSettings.lsc,
    stackHeight,
    headAngle,
    ...calculateForkSettings({
      airPressure,
      hsr: reboundSettings.hsr,
      lsr: reboundSettings.lsr,
      hsc: compressionSettings.hsc,
      lsc: compressionSettings.lsc
    }, ridingStyle)
  };
  
  return baseSettings;
};
