import { NavLink } from "react-router-dom";
import { authColors } from "../colors/colors";

export default function Sidebar({ isOpen }) {
  const c = authColors;

  const menuItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Vehicle Registry", path: "/vehicle-registry" },
  { label: "Trip Dispatcher", path: "/trip-dispatcher" },
  { label: "Maintenance", path: "/maintenance" },
  { label: "Trip & Expense", path: "/trip-expense" },
  { label: "Performance", path: "/performance" },
  { label: "Analytics", path: "/analytics" },
];

  return (
    <div
      className={`absolute left-0 top-full w-64 shadow-lg transition-transform duration-300 z-40 h-screen
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      style={{ backgroundColor: "white" }}
    >
      <div className="flex flex-col p-6 space-y-6">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            label={item.label}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarItem({ label, path }) {
  return (
    <NavLink
      to={path}
      className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-black hover:translate-x-1 transition"
    >
      {label}
    </NavLink>
  );
}