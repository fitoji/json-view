import React from "react";
import { useLocation } from "react-router-dom";
import { useDriverPreference } from "@/hooks/useDriverPreferences";
import { useTituloOff } from "@/hooks/useTituloOff";
import ExpandableButton from "./menu-exp";

const NavBar = () => {
  return (
    <nav className="navbar-fondo text-slate-50">
      <div className="flex flex-row items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 pb-2">
        <div className="flex items-center">
          <img
            className="h-12"
            src="https://utfs.io/f/OrgeCo8Gum6ew8Je4bkx3j7VtxfKkAlXC98D0ovYap6nHgwh"
            alt="SuperTest Mascota"
          />
          <span className="font-bold text-xl">Visor JsonTest </span>
        </div>

        <div className=" flex justify-end">
          <ExpandableButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
