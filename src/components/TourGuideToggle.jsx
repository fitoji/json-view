import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";

export function TourGuideToggle({ isTourEnabled, toggleTour }) {
  return (
    <div className="flex items-center space-x-2 mt-2">
      <Label
        htmlFor="tour-mode"
        className="hidden md:block  items-center cursor-pointer"
      >
        {isTourEnabled ? "Guía Introductoria" : "Guía Off"}
      </Label>
      <Switch
        className="bg-gray-200 checked:bg-green-500 checked:hover:bg-green-600"
        id="tour-mode"
        checked={isTourEnabled}
        onCheckedChange={toggleTour}
      />
    </div>
  );
}
