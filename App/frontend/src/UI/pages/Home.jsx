import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Droplet, 
  Thermometer, 
  Clock, 
  Leaf, 
  AlertCircle,
  Power,
  TestTube,
  Sun
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - replace with real data
const tempData = [
  { time: '00:00', value: 23 },
  { time: '04:00', value: 22 },
  { time: '08:00', value: 24 },
  { time: '12:00', value: 26 },
  { time: '16:00', value: 25 },
  { time: '20:00', value: 23 },
];

const SystemStatus = ({ icon: Icon, label, value, unit, color = "text-blue-500" }) => (
  <Card className="h-full">
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <Icon className={`w-8 h-8 ${color}`} />
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold">
            {value}
            <span className="text-sm text-gray-500 ml-1">{unit}</span>
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className=" bg-gray-50 p-6">


      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SystemStatus
          icon={Thermometer}
          label="Temperature"
          value="24.5"
          unit="°C"
          color="text-red-500"
        />
        <SystemStatus
          icon={Droplet}
          label="Humidity"
          value="65"
          unit="%"
          color="text-blue-500"
        />
        <SystemStatus
          icon={TestTube}
          label="pH Level"
          value="6.2"
          unit="pH"
          color="text-green-500"
        />
        <SystemStatus
          icon={Sun}
          label="Light Intensity"
          value="850"
          unit="lux"
          color="text-yellow-500"
        />
      </div>

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
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <Power className="w-5 h-5" />
                  <span>Water Pump</span>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                  <span className="w-4 h-4 transform translate-x-6 rounded-full bg-white transition" />
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  <span>Grow Lights</span>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="w-4 h-4 transform translate-x-1 rounded-full bg-white transition" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>Nutrient check in 2 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-500" />
                <span>Plant maintenance due</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-yellow-500">
              <AlertCircle className="w-5 h-5" />
              <span>Nutrient levels slightly low</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;