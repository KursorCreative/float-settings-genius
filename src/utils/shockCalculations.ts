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
  preferredFeel: string
): ShockSettings => {
  // Convert weight to kg if needed
  const weightInKg = unit === "lbs" ? weight * 0.453592 : weight;
  
  // Base calculations
  let airPressure = weightInKg * 1.1;
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