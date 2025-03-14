import { useState } from 'react'
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
  } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  
  import { Switch } from '@/components/ui/switch';
  import { 
    Moon, 
    Sun, 
  } from 'lucide-react';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
  import { ThemeProvider, ThemeSwitch } from './Darkmode';
  import { FontSizeProvider, FontSizeControl } from "./FontSizeControl";

const AppearanceComponent = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
        <CardDescription>Customize how the app looks and feels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Theme Mode</span>
          </div>
          <ThemeProvider>
            <ThemeSwitch />
          </ThemeProvider>
        </div>

        <div className="flex items-center justify-between">
          <span>Font Size</span>
          <FontSizeProvider>
            <FontSizeControl />
          </FontSizeProvider>
        </div>

        <div className="flex items-center justify-between">
          <span>High Contrast Mode</span>
          <Switch checked={highContrast} onCheckedChange={setHighContrast} />
        </div>

        <div className="flex items-center justify-between">
          <span>Reduced Motion</span>
          <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Appearance Settings</Button>
      </CardFooter>
    </Card>
  );
};

export default AppearanceComponent