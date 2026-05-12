import React, { useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "Appointments",
      icon: <CalendarCheck size={20} />,
      path: "/admin/appointments",
    },
    {
      name: "Blog Editor",
      icon: <FileText size={20} />,
      path: "/admin/blog-editor",
    },
    {
      name: "Portfolio",
      icon: <FileText size={20} />,
      path: "/admin/portfolio",
    },
    {
      name: "Customers",
      icon: <Users size={20} />,
      path: "/admin/customers",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-red-600 p-2 rounded-lg text-white shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-black/95 backdrop-blur-xl border-r border-white/10 text-white z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-center">
          <h1 className="text-2xl font-bold uppercase tracking-widest">
            Ink<span className="text-red-500">Admin</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-red-500"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-8 left-0 w-full px-4">
          <button className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-red-600 py-3 rounded-xl font-semibold uppercase tracking-wide transition-all duration-300">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
