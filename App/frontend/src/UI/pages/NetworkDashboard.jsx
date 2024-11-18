import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Network,
  Plus,
  Trash2,
  Signal,
  SignalLow,
  SignalMedium,
  SignalHigh,
  AlertCircle,
  CheckCircle2,
  Circle
} from 'lucide-react';

const NetworkDashboard = () => {
  // Sample devices data - replace with real data
  const [devices, setDevices] = useState([
    {
      id: '1',
      name: 'Hydro-1',
      location: 'Greenhouse A',
      status: 'online',
      signalStrength: 'high',
      lastSeen: '2 minutes ago',
      temperature: '24°C',
      humidity: '65%'
    },
    {
      id: '2',
      name: 'Hydro-2',
      location: 'Indoor Lab',
      status: 'offline',
      signalStrength: 'none',
      lastSeen: '2 hours ago',
      temperature: '22°C',
      humidity: '60%'
    },
    {
      id: '3',
      name: 'Hydro-3',
      location: 'Greenhouse B',
      status: 'online',
      signalStrength: 'medium',
      lastSeen: 'Just now',
      temperature: '25°C',
      humidity: '70%'
    },
    {
      id: '4',
      name: 'Hydro-4',
      location: 'Outdoor Garden',
      status: 'warning',
      signalStrength: 'low',
      lastSeen: '5 minutes ago',
      temperature: '26°C',
      humidity: '55%'
    }
  ]);

  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    location: ''
  });

  // Signal strength icon mapping
  const getSignalIcon = (strength) => {
    switch (strength) {
      case 'high':
        return <SignalHigh className="w-5 h-5 text-green-500" />;
      case 'medium':
        return <SignalMedium className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <SignalLow className="w-5 h-5 text-orange-500" />;
      default:
        return <Signal className="w-5 h-5 text-gray-400" />;
    }
  };

  // Status icon mapping
  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'offline':
        return <Circle className="w-5 h-5 text-gray-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleAddDevice = () => {
    const newId = (devices.length + 1).toString();
    setDevices([...devices, {
      id: newId,
      ...newDevice,
      status: 'offline',
      signalStrength: 'none',
      lastSeen: 'Never',
      temperature: '-',
      humidity: '-'
    }]);
    setNewDevice({ name: '', location: '' });
  };

  const handleDeleteDevices = () => {
    setDevices(devices.filter(device => !selectedDevices.includes(device.id)));
    setSelectedDevices([]);
    setIsDeleteMode(false);
  };

  const toggleDeviceSelection = (deviceId) => {
    if (selectedDevices.includes(deviceId)) {
      setSelectedDevices(selectedDevices.filter(id => id !== deviceId));
    } else {
      setSelectedDevices([...selectedDevices, deviceId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Device Network</h1>
            <p className="text-gray-500 mt-2">
              {devices.length} devices in network • {devices.filter(d => d.status === 'online').length} online
            </p>
          </div>
          <div className="flex gap-4">
            {isDeleteMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDeleteMode(false);
                    setSelectedDevices([]);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteDevices}
                  disabled={selectedDevices.length === 0}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete ({selectedDevices.length})
                </Button>
              </>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Device
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Device</DialogTitle>
                      <DialogDescription>
                        Enter the details for the new hydroponic device.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label htmlFor="name">Device Name</Label>
                        <Input
                          id="name"
                          value={newDevice.name}
                          onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                          placeholder="Enter device name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newDevice.location}
                          onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                          placeholder="Enter device location"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddDevice}>Add Device</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteMode(true)}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Devices
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <Card
              key={device.id}
              className={`relative ${
                isDeleteMode && selectedDevices.includes(device.id)
                  ? 'ring-2 ring-blue-500'
                  : ''
              }`}
            >
              {isDeleteMode && (
                <div className="absolute top-4 left-4 z-10">
                  <Checkbox
                    checked={selectedDevices.includes(device.id)}
                    onCheckedChange={() => toggleDeviceSelection(device.id)}
                  />
                </div>
              )}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  {device.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getSignalIcon(device.signalStrength)}
                  {getStatusIcon(device.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Location: {device.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Last seen: {device.lastSeen}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Temp:</span>
                      <span className="ml-1 font-medium">{device.temperature}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Humidity:</span>
                      <span className="ml-1 font-medium">{device.humidity}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkDashboard;