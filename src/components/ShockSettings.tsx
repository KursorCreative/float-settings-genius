import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ShockSettingsProps {
  settings: {
    airPressure: number;
    hsr: number;
    lsr: number;
    hsc: number;
    lsc: number;
  };
}

export const ShockSettings = ({ settings }: ShockSettingsProps) => {
  const settingItems = [
    {
      label: "Air Pressure",
      value: `${settings.airPressure} PSI`,
      tooltip: "Base air pressure for your weight and riding style. Use a shock pump to set pressure with the bike unweighted.",
    },
    {
      label: "High-Speed Rebound (HSR)",
      value: `${settings.hsr} clicks`,
      tooltip: "Controls rebound damping at higher shaft speeds. Adjust by turning the red knob on the top of the shock. Clockwise (looking down at the knob) to increase damping, counter-clockwise to decrease.",
    },
    {
      label: "Low-Speed Rebound (LSR)",
      value: `${settings.lsr} clicks`,
      tooltip: "Controls rebound damping at lower shaft speeds. Adjust using the inner red knob on the top of the shock. Clockwise (looking down at the knob) to increase damping, counter-clockwise to decrease.",
    },
    {
      label: "High-Speed Compression (HSC)",
      value: `${settings.hsc} clicks`,
      tooltip: "Controls compression damping during big hits. Adjust using the blue outer knob on the bottom of the shock. Clockwise (looking up at the knob) to increase damping, counter-clockwise to decrease.",
    },
    {
      label: "Low-Speed Compression (LSC)",
      value: `${settings.lsc} clicks`,
      tooltip: "Controls compression damping during small bumps. Adjust using the blue inner knob on the bottom of the shock. Clockwise (looking up at the knob) to increase damping, counter-clockwise to decrease.",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recommended Settings</h3>
        <Badge variant="secondary">Base Setup</Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {settingItems.map((item) => (
          <Card key={item.label} className="p-4 transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-2xl font-semibold text-fox-orange">{item.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          💡 Pro tip: Start with these settings and adjust based on feel. For rocky terrain,
          try decreasing LSC by 1-2 clicks. For smoother trails, you can increase HSR
          slightly for more pop.
        </p>
      </div>
    </div>
  );
};