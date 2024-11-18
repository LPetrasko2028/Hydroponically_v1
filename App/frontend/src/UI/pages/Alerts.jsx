import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Filter,
  Info,
  X
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const AlertsPage = () => {
  // Sample alerts data - replace with real data
  /* TODO: 
  - Get alerts from backend,
  - Separate readable and completable alerts,
  - Delete alerts from backend on completion, read and dismissed,
  
  */
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "High pH Level Detected",
      description: "pH level has risen above 6.8. Check nutrient solution.",
      type: "warning",
      timestamp: "2024-03-18T10:30:00",
      status: "unread",
      priority: "high"
    },
    {
      id: 2,
      title: "Low Water Level",
      description: "Reservoir water level is below 20%. Refill recommended.",
      type: "alert",
      timestamp: "2024-03-18T09:45:00",
      status: "read",
      priority: "high"
    },
    {
      id: 3,
      title: "Scheduled Maintenance Due",
      description: "Regular system maintenance is due in 2 days.",
      type: "info",
      timestamp: "2024-03-18T08:15:00",
      status: "unread",
      priority: "medium"
    },
    {
      id: 4,
      title: "Temperature Fluctuation",
      description: "Temperature varies by more than 5°C in the last hour.",
      type: "warning",
      timestamp: "2024-03-18T07:30:00",
      status: "completed",
      priority: "medium"
    },
    // Add more sample alerts as needed
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Alert actions
  const markAsRead = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: 'read' } : alert
    ));
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const completeAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: 'completed' } : alert
    ));
  };

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.status === filter;
  });

  // Sort alerts
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlerts = sortedAlerts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAlerts.length / itemsPerPage);

  // Alert type styles
  const getAlertStyles = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'alert':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'alert':
        return <Bell className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">System Alerts</CardTitle>
            <div className="flex space-x-4">
              {/* Filter Dropdown */}
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter alerts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Alerts</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <Clock className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            {/* Alerts List */}
            <div className="space-y-4">
              {currentAlerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getAlertStyles(alert.type)} relative`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{alert.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {alert.priority.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      {alert.status !== 'completed' && (
                        <>
                          {alert.status === 'unread' && (
                            <button
                              onClick={() => markAsRead(alert.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Mark as read"
                            >
                              <Eye className="w-5 h-5 text-gray-500" />
                            </button>
                          )}
                          <button
                            onClick={() => completeAlert(alert.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Mark as completed"
                          >
                            <CheckCircle2 className="w-5 h-5 text-gray-500" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Dismiss"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  {alert.status === 'completed' && (
                    <div className="absolute top-2 right-2">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedAlerts.length)} of {sortedAlerts.length} alerts
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlertsPage;