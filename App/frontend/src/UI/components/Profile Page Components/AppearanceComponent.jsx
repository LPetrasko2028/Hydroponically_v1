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
 
  import { ThemeSwitch } from './AppearanceSubComponents/ThemeSwitch';
  import { FontSizeControl } from "./AppearanceSubComponents/FontSizeControl";
  import { usePreferencesStore } from '../../../store/preferencesStorePouchDB';

const AppearanceComponent = () => {
  const { contrast, reducedMotion, setContrast, setReducedMotion } = usePreferencesStore();
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
        <CardDescription>Customize how the app looks and feels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Theme Mode</span>
          </div>
            <ThemeSwitch />
        </div>

        <div className="flex items-center justify-between">
          <span>Font Size</span>
            <FontSizeControl />
        </div>

        <div className="flex items-center justify-between">
          <span>High Contrast Mode</span>
          <Switch checked={contrast} onCheckedChange={setContrast} />
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