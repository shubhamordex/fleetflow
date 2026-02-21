import { useState } from "react";
import { Menu, X } from "lucide-react";
import { authColors } from "../colors/colors";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const c = authColors;

  return (
    <div className="relative w-full">
      
      {/* Navbar */}
      <nav className="w-full shadow-md px-4 py-3 flex items-center justify-between relative z-50" style={{backgroundColor:c.ambientGree}}>
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <h1 className="text-xl font-semibold text-gray-800">
            FleetFlow
          </h1>
        </div>

        {/* Right Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold cursor-pointer hover:scale-105 transition">
          U
        </div>
      </nav>

      {/* Sidebar BELOW Navbar */}
      <Sidebar isOpen={isOpen} />

    </div>
  );
}