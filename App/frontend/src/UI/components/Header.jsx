import React, { useState } from 'react';
import {
  Bell,
  Menu,
  X,
  Settings,
  Home,
  Activity,
  Calendar,
  Database,
  User,
  Network
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "pH levels need attention" },
    { id: 2, message: "Scheduled maintenance due" }
  ]);

  const devices = [
    { id: 1, name: "Hydro-1", location: "Greenhouse A", status: "online", signalStrength: "high", lastSeen: "2 minutes ago", temperature: "24°C", humidity: "65%" },
    { id: 2, name: "Hydro-2", location: "Indoor Lab", status: "offline", signalStrength: "none", lastSeen: "2 hours ago", temperature: "22°C", humidity: "60%" },
    { id: 3, name: "Hydro-3", location: "Greenhouse B", status: "online", signalStrength: "medium", lastSeen: "Just now", temperature: "25°C", humidity: "70%" },
    { id: 4, name: "Hydro-4", location: "Outdoor Garden", status: "warning", signalStrength: "low", lastSeen: "5 minutes ago", temperature: "26°C", humidity: "55%" }
  ];
  const device = devices[0];
  const navItems = [
    { label: "Dashboard", icon: Home , link: "/" },
    { label: "Monitoring", icon: Activity, link: "/monitoring" },
    { label: "Schedule", icon: Calendar, link: "/schedule" },
    { label: "Data", icon: Database, link: "/data" }
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-md fixed w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/Hydroponically.png"
                  alt="Hydroponically Logo"
                  className="w-8 h-8"
                />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Hydroponically
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-2 lg:space-x-4 xl:space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.link}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side items */}
          <div className="flex items-center md:space-x-2 lg:space-x-4">
            {/* Link to network page */}
            <Link to="/network" className="flex items-center gap-2">
              <Network className="w-5 h-5" />
            </Link>
            {/* System Status Indicator and Device Selection */}
            <div className="hidden md:flex items-center">
              <span className="flex h-3 w-3 relative">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${
                    device.status === "online" ? "green" : "red"
                  }-400 opacity-75`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 bg-${
                    device.status === "online" ? "green" : "red"
                  }-500`}
                ></span>
              </span>
              <Select>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Device" />
                </SelectTrigger>
                <SelectContent>
                  {devices.map((device) => (
                    <SelectItem key={device.id} value={device.name}>{device.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* <span className="ml-2 text-sm text-gray-600">{device.name}</span> */}
            </div>

            {/* Notifications */}
            <Link to="/alerts" className="relative">
              <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                  {notifications.length}
                </span>
              )}
            </Link>

            {/* Settings */}
            <Link to="/settings" className="text-gray-600 hover:text-gray-900">
              <Settings className="w-6 h-6" />
            </Link>

            {/* Help */}
            <Link to="/profile" className=" text-gray-600 hover:text-gray-900">
              <User className="w-6 h-6" />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;