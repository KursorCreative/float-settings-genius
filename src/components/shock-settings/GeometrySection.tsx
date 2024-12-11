import { Card } from "../ui/card";

interface GeometrySectionProps {
  stackHeight: number;
  headAngle: number;
}

export const GeometrySection = ({ stackHeight, headAngle }: GeometrySectionProps) => {
  return (
    <div>
      <h4 className="text-md font-medium mb-4">Geometry Changes</h4>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4 transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Stack Height</p>
              <p className="text-2xl font-semibold text-fox-orange">
                {stackHeight}mm
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Head Tube Angle</p>
              <p className="text-2xl font-semibold text-fox-orange">
                {headAngle.toFixed(1)}°
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};