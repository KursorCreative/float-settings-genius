import { Badge } from "./ui/badge";
import { GeometrySection } from "./shock-settings/GeometrySection";
import { SettingsSection } from "./shock-settings/SettingsSection";
import { TipsSection } from "./shock-settings/TipsSection";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { getShockItems } from "@/config/shockSettings";
import { getForkItems } from "@/config/forkSettings";

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
  const containerRef = useResizeObserver();

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
        items={getShockItems(settings)}
      />
      
      <SettingsSection 
        title="Fox 36 Factory Fork Settings"
        items={getForkItems(settings)}
      />
      
      <TipsSection />
    </div>
  );
};