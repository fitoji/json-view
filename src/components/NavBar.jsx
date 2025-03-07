import React from "react";
import { CircleHelp, Undo2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TourGuideToggle } from "./TourGuideToggle";
import { useDriverPreference } from "@/hooks/useDriverPreferences";

import { Button } from "@/components/ui/button";
import { useTituloOff } from "@/hooks/useTituloOff";
import ExpandableButton from "./menu-exp";
import JavBtn from "./jav-btn-nav";

const NavBar = () => {
  const location = useLocation();
  const { isTourEnabled, toggleTour } = useDriverPreference();
  const { tituloOff } = useTituloOff();
  //console.log("titulo off", tituloOff);

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

        {/* <JavBtn /> */}
        {/* {tituloOff && (
            <div>
              <div className="flex flex-row items-end p-2 gap-4 ">
                <div id="driver-step-6">
                  <TourGuideToggle
                    isTourEnabled={isTourEnabled}
                    toggleTour={toggleTour}
                  />
                </div>
              </div>
            </div>
          )} */}

        {/* <div id="driver-step-4" className="flex justify-end pr-2 pt-1">
            <Link
              className="bg-emerald-400 mt-2 mb-2 text-white hover:text-emerald-500 font-bold rounded-lg p-2 hover:bg-emerald-200 shadow-md"
              to={location.pathname === "/" ? "/docs" : "/"}
            >
              {location.pathname === "/" && <CircleHelp />}
              {location.pathname === "/docs" && <Undo2 />}
            </Link>
          </div> */}
        <div className=" flex justify-end">
          <ExpandableButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
