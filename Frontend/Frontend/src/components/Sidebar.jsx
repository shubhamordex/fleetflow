import { Home, User, Settings, LogOut } from "lucide-react";
import { authColors } from "../colors/colors";

export default function Sidebar({ isOpen }) {
  const c=authColors;
  return (
    <div
      className={`absolute left-0 top-full w-64 bg-white shadow-lg transition-transform duration-300 z-40 h-screen
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      style={{backgroundColor:c.ambientBlue}}
    >
      <div className="flex flex-col p-6 space-y-6">

        <SidebarItem icon={<Home size={18} />} label="Dashboard" />
        <SidebarItem icon={<User size={18} />} label="Profile" />
        <SidebarItem icon={<Settings size={18} />} label="Settings" />
        <SidebarItem icon={<LogOut size={18} />} label="Logout" />

      </div>
    </div>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-black hover:translate-x-1 transition">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}