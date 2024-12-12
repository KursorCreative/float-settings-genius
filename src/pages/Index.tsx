import { ShockSetupForm } from "@/components/ShockSetupForm";
import { Bike, Sparkles, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-fox-orange animate-pulse" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fox-orange to-fox-blue">
              Fox Float X2 Setup Guide
            </h1>
            <Sparkles className="w-8 h-8 text-fox-blue animate-pulse" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get personalised shock settings based on your riding style and preferences
          </p>
        </div>
        
        <div className="transform hover:scale-[1.01] transition-all duration-300">
          <ShockSetupForm />
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <p>All recommendations are starting points. Fine-tune based on your feel and preferences.</p>
        </div>

        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <span>Developed by Matt Pirani</span>
            <Bike className="inline-block w-5 h-5 text-fox-orange" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>© 2024</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1">
                    <Info className="w-4 h-4" />
                    <span>v1.2.0</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2">
                    <p className="font-medium">Latest Updates:</p>
                    <ul className="text-xs list-disc pl-4 space-y-1">
                      <li>Dynamic LSC/HSC calculations</li>
                      <li>Improved fork settings</li>
                      <li>Enhanced UI responsiveness</li>
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;