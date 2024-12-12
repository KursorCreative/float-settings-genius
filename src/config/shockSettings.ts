export const getShockItems = (settings: {
  airPressure: number;
  hsr: number;
  lsr: number;
  hsc: number;
  lsc: number;
}) => [
  {
    label: "Shock Air Pressure",
    value: `${settings.airPressure} PSI`,
    tooltip: {
      main: "Base air pressure for your weight and riding style.",
      instruction: "Use a shock pump to set pressure with the bike unweighted."
    },
  },
  {
    label: "Shock High-Speed Rebound (HSR)",
    value: `${settings.hsr} clicks`,
    tooltip: {
      main: "Controls rebound damping at higher shaft speeds.",
      instruction: "Adjust using the red knob on top of shock:",
      direction: "↻ Clockwise (looking down): Increase damping\n↺ Counter-clockwise: Decrease"
    },
  },
  {
    label: "Shock Low-Speed Rebound (LSR)",
    value: `${settings.lsr} clicks`,
    tooltip: {
      main: "Controls rebound damping at lower shaft speeds.",
      instruction: "Adjust using the inner red knob on top:",
      direction: "↻ Clockwise (looking down): Increase damping\n↺ Counter-clockwise: Decrease"
    },
  },
  {
    label: "Shock High-Speed Compression (HSC)",
    value: `${settings.hsc} clicks`,
    tooltip: {
      main: "Controls compression damping during big hits.",
      instruction: "Adjust using the outer blue knob on bottom:",
      direction: "↻ Clockwise (looking up): Increase damping\n↺ Counter-clockwise: Decrease"
    },
  },
  {
    label: "Shock Low-Speed Compression (LSC)",
    value: `${settings.lsc} clicks`,
    tooltip: {
      main: "Controls compression damping during small bumps.",
      instruction: "Adjust using the inner blue knob on bottom:",
      direction: "↻ Clockwise (looking up): Increase damping\n↺ Counter-clockwise: Decrease"
    },
  },
];