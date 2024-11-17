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
  HelpCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "pH levels need attention" },
    { id: 2, message: "Scheduled maintenance due" }
  ]);

  const navItems = [
    { label: "Dashboard", icon: Home },
    { label: "Monitoring", icon: Activity },
    { label: "Schedule", icon: Calendar },
    { label: "Data", icon: Database }
  ];

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <img src='/Hydroponically.png' alt="Hydroponically Logo" className="w-8 h-8" />
                <span className="ml-2 text-xl font-bold text-gray-900">Hydroponically</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* System Status Indicator */}
            <div className="hidden md:flex items-center">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="ml-2 text-sm text-gray-600">System Online</span>
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                    {notifications.length}
                  </span>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="py-2">
                    {notification.message}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings */}
            <button className="text-gray-600 hover:text-gray-900">
              <Settings className="w-6 h-6" />
            </button>

            {/* Help */}
            <button className="hidden md:block text-gray-600 hover:text-gray-900">
              <HelpCircle className="w-6 h-6" />
            </button>

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