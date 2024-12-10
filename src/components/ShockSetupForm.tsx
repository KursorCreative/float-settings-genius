import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WeightConverter } from './WeightConverter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShockSettings {
  airPressure: number;
  hsr: number;
  lsr: number;
  hsc: number;
  lsc: number;
}

export const ShockSetupForm = () => {
  const [weight, setWeight] = useState(70);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [ridingStyle, setRidingStyle] = useState('trail');
  const [bikeTravel, setBikeTravel] = useState('150');
  const [preferredFeel, setPreferredFeel] = useState('balanced');
  const { toast } = useToast();

  const calculateSettings = (): ShockSettings => {
    const weightInKg = unit === 'kg' ? weight : weight / 2.20462;
    
    // Base pressure calculation (simplified for demo)
    let pressure = weightInKg * 1.1;
    
    // Adjust for riding style
    switch(ridingStyle) {
      case 'xc':
        pressure *= 1.1;
        break;
      case 'enduro':
        pressure *= 0.9;
        break;
    }
    
    // Adjust for preferred feel
    switch(preferredFeel) {
      case 'soft':
        pressure *= 0.95;
        break;
      case 'firm':
        pressure *= 1.05;
        break;
    }

    return {
      airPressure: Math.round(pressure),
      hsr: 8,  // Default values for demo
      lsr: 10,
      hsc: 12,
      lsc: 14,
    };
  };

  const handleReset = () => {
    setWeight(70);
    setUnit('kg');
    setRidingStyle('trail');
    setBikeTravel('150');
    setPreferredFeel('balanced');
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  const settings = calculateSettings();

  return (
    <Card className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Shock Settings</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="flex items-center gap-2"
          aria-label="Reset all settings to default values"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <WeightConverter
        weight={weight}
        unit={unit}
        onWeightChange={setWeight}
        onUnitChange={setUnit}
      />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="riding-style">Riding Style</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Choose your primary riding style for optimal settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <RadioGroup
          defaultValue="trail"
          onValueChange={setRidingStyle}
          className="flex flex-wrap gap-4"
          aria-label="Select your riding style"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="xc" id="xc" />
            <Label htmlFor="xc">XC</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="trail" id="trail" />
            <Label htmlFor="trail">Trail</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="flow" id="flow" />
            <Label htmlFor="flow">Flow</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="enduro" id="enduro" />
            <Label htmlFor="enduro">Enduro</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="bike-travel">Rear Travel (mm)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your bike's rear suspension travel in millimeters</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select 
          defaultValue="150" 
          onValueChange={setBikeTravel}
          aria-label="Select rear suspension travel"
        >
          <SelectTrigger id="bike-travel">
            <SelectValue placeholder="Select travel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="130">130mm</SelectItem>
            <SelectItem value="140">140mm</SelectItem>
            <SelectItem value="150">150mm</SelectItem>
            <SelectItem value="160">160mm</SelectItem>
            <SelectItem value="170">170mm</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label>Preferred Feel</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Choose how you want your suspension to feel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <RadioGroup
          defaultValue="balanced"
          onValueChange={setPreferredFeel}
          className="flex flex-wrap gap-4"
          aria-label="Select your preferred suspension feel"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="soft" id="soft" />
            <Label htmlFor="soft">Soft</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="balanced" id="balanced" />
            <Label htmlFor="balanced">Balanced</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="firm" id="firm" />
            <Label htmlFor="firm">Firm</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg dark:bg-gray-800 transition-all">
        <h3 className="text-lg font-semibold mb-4">Recommended Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white dark:bg-gray-700 rounded-lg transition-all hover:shadow-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">Air Pressure</p>
            <p className="text-xl font-bold text-fox-orange">{settings.airPressure} PSI</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-700 rounded-lg transition-all hover:shadow-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">HSR</p>
            <p className="text-xl font-bold">{settings.hsr} clicks</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-700 rounded-lg transition-all hover:shadow-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">LSR</p>
            <p className="text-xl font-bold">{settings.lsr} clicks</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-700 rounded-lg transition-all hover:shadow-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">HSC</p>
            <p className="text-xl font-bold">{settings.hsc} clicks</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-700 rounded-lg transition-all hover:shadow-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">LSC</p>
            <p className="text-xl font-bold">{settings.lsc} clicks</p>
          </div>
        </div>
      </div>
    </Card>
  );
};