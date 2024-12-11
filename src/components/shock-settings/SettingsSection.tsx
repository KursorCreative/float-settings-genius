import { ShockSettingCard } from "./ShockSettingCard";

interface SettingsSectionProps {
  title: string;
  items: Array<{
    label: string;
    value: string;
    tooltip: {
      main: string;
      instruction: string;
      direction?: string;
    };
  }>;
}

export const SettingsSection = ({ title, items }: SettingsSectionProps) => {
  return (
    <div>
      <h4 className="text-md font-medium mb-4">{title}</h4>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ShockSettingCard key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
};