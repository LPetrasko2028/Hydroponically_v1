import { useState } from 'react';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
  } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Switch } from '@/components/ui/switch';
  import { 
    Mail, 
    Phone, 
    MessageCircle, 
  } from 'lucide-react';

const NotificationsComponent = () => {
  // Sample notification settings
  const [notifications, setNotifications] = useState({
    waterLevel: true,
    nutrientLevel: true,
    pHLevel: true,
    systemAlerts: true,
    weeklyReports: true,
    tips: false,
  });
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure how and when you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Notification Contacts</h3>
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>Email</span>
              </div>
              <div className="flex items-center gap-2">
                <Input className="w-48" defaultValue="alex@example.com" />
                <Switch defaultChecked id="email-switch" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>SMS</span>
              </div>
              <div className="flex items-center gap-2">
                <Input className="w-48" defaultValue="+1 (555) 123-4567" />
                <Switch defaultChecked id="sms-switch" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle size={18} />
                <span>Telegram</span>
              </div>
              <div className="flex items-center gap-2">
                <Input className="w-48" defaultValue="@hydroalex" />
                <Switch id="telegram-switch" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle size={18} />
                <span>Signal</span>
              </div>
              <div className="flex items-center gap-2">
                <Input className="w-48" defaultValue="+1 (555) 123-4567" />
                <Switch id="signal-switch" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Water Level Alerts</span>
              <Switch
                checked={notifications.waterLevel}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    waterLevel: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Nutrient Level Alerts</span>
              <Switch
                checked={notifications.nutrientLevel}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    nutrientLevel: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span>pH Level Changes</span>
              <Switch
                checked={notifications.pHLevel}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    pHLevel: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span>System Alerts</span>
              <Switch
                checked={notifications.systemAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    systemAlerts: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Weekly Reports</span>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    weeklyReports: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Growing Tips & Advice</span>
              <Switch
                checked={notifications.tips}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, tips: checked })
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Notification Settings</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsComponent