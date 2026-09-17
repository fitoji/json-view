import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";

export function TourGuideToggle({ isTourEnabled, toggleTour }) {
  return (
    <div className="flex items-center space-x-2 mt-2 hover:bg-accent transition-colors ease-in-out duration-400 rounded-md p-2 hover:text-accent-foreground">
      <Label
        htmlFor="tour-mode"
        className="hidden md:block  items-center cursor-pointer"
      >
        {isTourEnabled ? "Guía Introductoria" : "Tour Off"}
      </Label>
      <Switch
        className="bg-muted checked:bg-success checked:hover:bg-success/90"
        id="tour-mode"
        checked={isTourEnabled}
        onCheckedChange={toggleTour}
      />
    </div>
  );
}
