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

const AppearanceComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
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
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
            <span>Theme Mode</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 rounded-md p-1">
            <Button
              variant={!isDarkMode ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsDarkMode(false)}
              className="flex items-center gap-1"
            >
              <Sun size={16} />
              Light
            </Button>
            <Button
              variant={isDarkMode ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsDarkMode(true)}
              className="flex items-center gap-1"
            >
              <Moon size={16} />
              Dark
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span>Font Size</span>
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Medium" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
              <SelectItem value="xl">Extra Large</SelectItem>
            </SelectContent>
          </Select>
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