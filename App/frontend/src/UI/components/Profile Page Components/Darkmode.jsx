import React, { createContext, useContext, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Create theme context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    // Check for stored preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Apply theme class to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old theme classes
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(theme);
    
    // Store preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Only update if using system preference (no localStorage value)
      if (!localStorage.getItem('theme')) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const setSystemTheme = () => {
    localStorage.removeItem('theme');
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, setSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Simple toggle button
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};

// Advanced theme selector with dropdown
export const ThemeSelector = () => {
  const { theme, setTheme, setSystemTheme } = useTheme();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Select theme">
          {theme === 'light' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={setSystemTheme}>
          <span className="mr-2">💻</span>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Theme switch with label
export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  
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

// Example App with theme implementation
const ThemeExample = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <header className="border-b p-4">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold">Dark Mode Example</h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <ThemeSwitch />
              <ThemeSelector />
            </div>
          </div>
        </header>
        
        <main className="container mx-auto p-6">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Welcome to Dark Mode</h2>
            <p className="mb-4">This content automatically adapts to your theme preference.</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="mb-2 font-medium">Card Example</h3>
                <p className="text-muted-foreground">This card's appearance changes with the theme.</p>
              </div>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="mb-2 font-medium">Interactive Elements</h3>
                <Button className="mr-2">Primary Button</Button>
                <Button variant="outline">Secondary Button</Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default ThemeExample;