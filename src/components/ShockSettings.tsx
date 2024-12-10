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
      tooltip: "Base air pressure for your weight and riding style",
    },
    {
      label: "High-Speed Rebound (HSR)",
      value: `${settings.hsr} clicks`,
      tooltip: "Controls rebound damping at higher shaft speeds",
    },
    {
      label: "Low-Speed Rebound (LSR)",
      value: `${settings.lsr} clicks`,
      tooltip: "Controls rebound damping at lower shaft speeds",
    },
    {
      label: "High-Speed Compression (HSC)",
      value: `${settings.hsc} clicks`,
      tooltip: "Controls compression damping during big hits",
    },
    {
      label: "Low-Speed Compression (LSC)",
      value: `${settings.lsc} clicks`,
      tooltip: "Controls compression damping during small bumps",
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
                <p className="text-2xl font-semibold text-fox-blue">{item.value}</p>
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