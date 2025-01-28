import React from "react";
import { CircleHelp, Undo2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TourGuideToggle } from "./TourGuideToggle";
import { useDriverPreference } from "@/hooks/useDriverPreferences";

const NavBar = () => {
  const location = useLocation();
  const { isTourEnabled, toggleTour } = useDriverPreference();

  return (
    <nav className="navbar-fondo text-white">
      <div className="flex flex-row items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 pb-2">
        <div className="flex items-center">
          <img
            className="h-12"
            src="https://utfs.io/f/OrgeCo8Gum6ew8Je4bkx3j7VtxfKkAlXC98D0ovYap6nHgwh"
            alt="SuperTest Mascota"
          />
          <span className="font-bold text-xl">Visor JsonTest </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div id="driver-step-5">
            <TourGuideToggle
              isTourEnabled={isTourEnabled}
              toggleTour={toggleTour}
            />
          </div>
          <div id="driver-step-4" className="flex justify-end pr-2 pt-1">
            <Link
              className="bg-emerald-300 mt-2 text-white font-bold rounded-lg p-2 hover:bg-emerald-200"
              to={location.pathname === "/" ? "/docs" : "/"}
            >
              {location.pathname === "/" && <CircleHelp />}
              {location.pathname === "/docs" && <Undo2 />}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
