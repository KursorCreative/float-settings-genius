export const getForkItems = (settings: {
  forkAirPressure: number;
  forkHsr: number;
  forkLsr: number;
  forkHsc: number;
  forkLsc: number;
}) => [
  {
    label: "Fork Air Pressure",
    value: `${settings.forkAirPressure} PSI`,
    tooltip: {
      main: "Base air pressure for your weight and riding style.",
      instruction: "Use a shock pump to set pressure with the bike unweighted."
    },
  },
  {
    label: "Fork High-Speed Rebound (HSR)",
    value: `${settings.forkHsr} clicks`,
    tooltip: {
      main: "Controls fork rebound damping at higher shaft speeds.",
      instruction: "Adjust using the red knob on the fork leg:",
      direction: "↻ Clockwise: Increase damping\n↺ Counter-clockwise: Decrease"
    },
  },
  {
    label: "Fork Low-Speed Rebound (LSR)",
    value: `${settings.forkLsr} clicks`,
    tooltip: {
      main: "Controls fork rebound damping at lower shaft speeds.",
      instruction: "Adjust using the red knob on the fork leg:",
      direction: "↻ Clockwise: Increase damping\n↺ Counter-clockwise: Decrease"
    },
  },
  {
    label: "Fork High-Speed Compression (HSC)",
    value: `${settings.forkHsc} clicks`,
    tooltip: {
      main: "Controls fork compression during big hits.",
      instruction: "Adjust using the blue knob on the fork leg:",
      direction: "↻ Clockwise: Increase damping\n↺ Counter-clockwise: Decrease"
    },
  },
  {
    label: "Fork Low-Speed Compression (LSC)",
    value: `${settings.forkLsc} clicks`,
    tooltip: {
      main: "Controls fork compression during small bumps.",
      instruction: "Adjust using the blue knob on the fork leg:",
      direction: "↻ Clockwise: Increase damping\n↺ Counter-clockwise: Decrease"
    },
  },
];