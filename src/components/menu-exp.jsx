import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDriverPreference } from "@/hooks/useDriverPreferences";
import {
  Home,
  Settings,
  User,
  Bell,
  Search,
  CircleHelp,
  Undo2,
} from "lucide-react";

import { Link } from "react-router-dom";
import { TourGuideToggle } from "./TourGuideToggle";
import JavBtn from "./jav-btn-nav";
import { useLocation } from "react-router-dom";

export default function MenuExp() {
  const location = useLocation();
  const { isTourEnabled, toggleTour } = useDriverPreference();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isTourEnabled);
  }, [isTourEnabled]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const buttonVariants = {
    closed: {
      scale: 1,
    },
    open: {
      scale: 1.1,
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  const menuItems = [
    {
      icon: <Home size={20} />,
      href: "/",
      color: "bg-sky-400 hover:bg-sky-300",
    },

    {
      icon: <CircleHelp size={20} />,
      href: "/docs",
      color: "bg-emerald-400 hover:bg-emerald-300",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center ">
      <div id="driver-step-4" className="relative">
        {/* Main button */}
        <motion.button
          className="bg-emerald-400 hover:bg-emerald-300 text-white rounded-lg w-10 h-10 mt-2 flex items-center justify-center shadow-lg z-20 relative"
          onClick={toggleOpen}
          variants={buttonVariants}
          animate={isOpen ? "open" : "closed"}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Settings className="w-5 h-5" />
          </motion.span>
        </motion.button>

        {/* Expandable menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-0 right-16 flex flex-row-reverse gap-2 items-center"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div>
                <Link
                  id="driver-step-5"
                  className="bg-emerald-400 hover:bg-emerald-300 text-white w-10 h-10 mt-2 flex items-center justify-center rounded-lg shadow-md"
                  to={location.pathname === "/" ? "/docs" : "/"}
                >
                  {location.pathname === "/" ? (
                    <CircleHelp className="w-5 h-5" />
                  ) : (
                    <Undo2 className="w-5 h-5" />
                  )}
                </Link>
              </div>
              <div className="mt-2">
                <JavBtn />
              </div>
              <div id="driver-step-7" className="mt-2">
                <TourGuideToggle
                  isTourEnabled={isTourEnabled}
                  toggleTour={toggleTour}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
