import { Card } from "../ui/card";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ShockSettingCardProps {
  label: string;
  value: string;
  tooltip: {
    main: string;
    instruction: string;
    direction?: string;
  };
}

export const ShockSettingCard = ({ label, value, tooltip }: ShockSettingCardProps) => {
  return (
    <Card className="p-4 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{label}</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] space-y-2 p-4">
                  <p className="font-medium">{tooltip.main}</p>
                  <p className="text-sm text-muted-foreground">{tooltip.instruction}</p>
                  {tooltip.direction && (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {tooltip.direction}
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-2xl font-semibold text-fox-orange">{value}</p>
        </div>
      </div>
    </Card>
  );
};