import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import QuickStatsPanel from '../components/Home Page Components/QuickStatsPanel.jsx';
import QuickControlsPanel from '../components/Home Page Components/QuickControlsPanel';
import TasksPanel from '../components/Home Page Components/TasksPanel.jsx';
import SystemAlertsPanel from '../components/Home Page Components/SystemAlertsPanel.jsx';

// Sample data - replace with real data
const tempData = [
  { time: '00:00', value: 23 },
  { time: '04:00', value: 22 },
  { time: '08:00', value: 24 },
  { time: '12:00', value: 26 },
  { time: '16:00', value: 25 },
  { time: '20:00', value: 23 },
];

const Dashboard = () => {
 
  return (
    <div className=" bg-gray-50 p-6">
      <QuickStatsPanel />

      {/* Temperature Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Temperature Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tempData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* System Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickControlsPanel />
        <TasksPanel />        
        <SystemAlertsPanel />
      </div>
    </div>
  );
};

export default Dashboard;