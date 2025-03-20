import { usePreferencesStore } from '../../../../store/preferencesStorePouchDB';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Theme switch with label
export const ThemeSwitch = () => {
  const { theme, setTheme } = usePreferencesStore();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch 
        id="theme-mode" 
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme} 
      />
      <Label htmlFor="theme-mode">
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </Label>
    </div>
  );
};
