import { ShockSetupForm } from "@/components/ShockSetupForm";
import { Bike } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fox Float X2 Setup Guide
          </h1>
          <p className="text-lg text-gray-600">
            Get personalized shock settings based on your riding style and preferences
          </p>
        </div>
        
        <ShockSetupForm />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>All recommendations are starting points. Fine-tune based on your feel and preferences.</p>
        </div>

        <footer className="mt-16 text-center text-gray-500 flex items-center justify-center gap-2">
          <span>Designed by Matt Pirani</span>
          <Bike className="inline-block w-5 h-5" />
        </footer>
      </div>
    </div>
  );
};

export default Index;