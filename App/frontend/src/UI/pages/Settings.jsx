import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Moon,
  Sun,
  Monitor,
  Bell,
  Mail,
  Shield,
  Database,
  HardDrive,
  Cpu,
  Wifi,
  Terminal,
  AlertCircle,
  Info,
  Camera
} from 'lucide-react';

const SettingsPage = () => {
  // Profile settings state
  const [profileSettings, setProfileSettings] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    notifications: {
      email: true,
      push: true,
      alerts: true
    }
  });

  // Theme settings state
  const [themeSettings, setThemeSettings] = useState({
    theme: 'system',
    fontSize: 'medium',
    reducedMotion: false,
    highContrast: false
  });

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

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-500" />
                    </div>
                    <Button variant="outline">Change Photo</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profileSettings.name}
                    onChange={(e) => setProfileSettings({
                      ...profileSettings,
                      name: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({
                      ...profileSettings,
                      email: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings({
                      ...profileSettings,
                      phone: e.target.value
                    })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                  </div>
                  <Switch
                    checked={profileSettings.notifications.email}
                    onCheckedChange={(checked) => setProfileSettings({
                      ...profileSettings,
                      notifications: { ...profileSettings.notifications, email: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                  </div>
                  <Switch
                    checked={profileSettings.notifications.push}
                    onCheckedChange={(checked) => setProfileSettings({
                      ...profileSettings,
                      notifications: { ...profileSettings.notifications, push: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <Label htmlFor="alert-notifications">System Alerts</Label>
                  </div>
                  <Switch
                    checked={profileSettings.notifications.alerts}
                    onCheckedChange={(checked) => setProfileSettings({
                      ...profileSettings,
                      notifications: { ...profileSettings.notifications, alerts: checked }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theme Settings */}
          <TabsContent value="theme" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      variant={themeSettings.theme === 'light' ? 'default' : 'outline'}
                      className="w-full"
                      onClick={() => setThemeSettings({ ...themeSettings, theme: 'light' })}
                    >
                      <Sun className="w-4 h-4 mr-2" />
                      Light
                    </Button>
                    <Button
                      variant={themeSettings.theme === 'dark' ? 'default' : 'outline'}
                      className="w-full"
                      onClick={() => setThemeSettings({ ...themeSettings, theme: 'dark' })}
                    >
                      <Moon className="w-4 h-4 mr-2" />
                      Dark
                    </Button>
                    <Button
                      variant={themeSettings.theme === 'system' ? 'default' : 'outline'}
                      className="w-full"
                      onClick={() => setThemeSettings({ ...themeSettings, theme: 'system' })}
                    >
                      <Monitor className="w-4 h-4 mr-2" />
                      System
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select
                    value={themeSettings.fontSize}
                    onValueChange={(value) => setThemeSettings({
                      ...themeSettings,
                      fontSize: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      <Label>Reduced Motion</Label>
                    </div>
                    <Switch
                      checked={themeSettings.reducedMotion}
                      onCheckedChange={(checked) => setThemeSettings({
                        ...themeSettings,
                        reducedMotion: checked
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      <Label>High Contrast</Label>
                    </div>
                    <Switch
                      checked={themeSettings.highContrast}
                      onCheckedChange={(checked) => setThemeSettings({
                        ...themeSettings,
                        highContrast: checked
                      })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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