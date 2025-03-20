import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
  HardDrive,
  Cpu,
  Wifi,
  Info,
} from 'lucide-react';

const SettingsPage = () => {
  // Profile settings state

  // System info state
  const systemInfo = {
    version: '1.0.3',
    uptime: '15 days, 7 hours',
    lastUpdate: '2024-03-18',
    storage: {
      total: '32 GB',
      used: '12.5 GB',
      free: '19.5 GB'
    },
    network: {
      status: 'Connected',
      ip: '192.168.1.100',
      signal: 'Excellent'
    },
    hardware: {
      cpu: 'Raspberry Pi 4B',
      memory: '4 GB RAM',
      temperature: '45°C'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {/* System Information */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-gray-500">Version</Label>
                    <p className="font-medium">{systemInfo.version}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-gray-500">Uptime</Label>
                    <p className="font-medium">{systemInfo.uptime}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-gray-500">Last Update</Label>
                    <p className="font-medium">{systemInfo.lastUpdate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  Storage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Used Space</span>
                    <span className="font-medium">{systemInfo.storage.used}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Total Space</Label>
                    <p className="font-medium">{systemInfo.storage.total}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Free Space</Label>
                    <p className="font-medium">{systemInfo.storage.free}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Hardware Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-500">CPU</Label>
                      <p className="font-medium">{systemInfo.hardware.cpu}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Memory</Label>
                      <p className="font-medium">{systemInfo.hardware.memory}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Temperature</Label>
                      <p className="font-medium">{systemInfo.hardware.temperature}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="w-5 h-5" />
                  Network Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Status</Label>
                    <p className="font-medium">{systemInfo.network.status}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">IP Address</Label>
                    <p className="font-medium">{systemInfo.network.ip}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Signal Strength</Label>
                    <p className="font-medium">{systemInfo.network.signal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;