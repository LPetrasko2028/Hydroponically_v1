import React from 'react';
import { 
  Github, 
  Mail, 
  AlertCircle, 
  Settings2, 
  HelpCircle,
  Database
} from 'lucide-react';

const Footer = () => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  // System info - replace with real data
  const systemInfo = {
    version: "v1.0.3",
    lastUpdate: "2024-03-15",
    status: "Operational"
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* System Status */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                System Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  <span className="text-sm text-gray-600">{systemInfo.status}</span>
                </div>
                <p className="text-sm text-gray-600">Version: {systemInfo.version}</p>
                <p className="text-sm text-gray-600">Last Update: {systemInfo.lastUpdate}</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-2">
                    <Settings2 className="w-4 h-4" />
                    <span>System Settings</span>
                  </button>
                </li>
                <li>
                  <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>Data Export</span>
                  </button>
                </li>
                <li>
                  <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>System Logs</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>Documentation</span>
                  </button>
                </li>
                <li>
                  <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-2">
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </button>
                </li>
                <li>
                  <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Contact Support</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* System Resources */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                System Resources
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">CPU Usage</span>
                  <span className="text-sm font-medium text-gray-900">23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage</span>
                  <span className="text-sm font-medium text-gray-900">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                © {currentYear} Hydroponically. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <button className="text-gray-400 hover:text-gray-500">
                  <span className="text-sm">Privacy Policy</span>
                </button>
                <button className="text-gray-400 hover:text-gray-500">
                  <span className="text-sm">Terms of Service</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;