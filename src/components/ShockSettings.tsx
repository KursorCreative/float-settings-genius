import { Badge } from "./ui/badge";
import { GeometrySection } from "./shock-settings/GeometrySection";
import { SettingsSection } from "./shock-settings/SettingsSection";
import { TipsSection } from "./shock-settings/TipsSection";
import { useEffect, useRef } from "react";

interface ShockSettingsProps {
  settings: {
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
  };
}

export const ShockSettings = ({ settings }: ShockSettingsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Debounce resize observations
    let rafId: number;
    const resizeObserver = new ResizeObserver((entries) => {
      // Cancel any pending observations
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      // Schedule the next update
      rafId = requestAnimationFrame(() => {
        for (const entry of entries) {
          if (entry.target === containerRef.current) {
            // Handle resize if needed
          }
        }
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      resizeObserver.disconnect();
    };
  }, []);

  const shockItems = [
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

  const forkItems = [
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

  return (
    <div ref={containerRef} className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recommended Settings</h3>
        <Badge variant="secondary">Base Setup</Badge>
      </div>
      
      <GeometrySection 
        stackHeight={settings.stackHeight}
        headAngle={settings.headAngle}
      />

      <SettingsSection 
        title="Rear Shock Settings"
        items={shockItems}
      />
      
      <SettingsSection 
        title="Fox 36 Factory Fork Settings"
        items={forkItems}
      />
      
      <TipsSection />
    </div>
  );
};