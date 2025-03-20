import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { MinusIcon, PlusIcon, Type } from 'lucide-react';

// Create a context to manage font size globally
const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(100); // 100% is default
  
  // Apply font size to root element when it changes
  useEffect(() => {
    
    document.documentElement.style.fontSize = `${fontSize}%`;
    // Store preference in localStorage
    localStorage.setItem('app-font-size', fontSize.toString());
  }, [fontSize]);
  
  // Load saved preference on mount
  useEffect(() => {
    const savedSize = localStorage.getItem('app-font-size');
    if (savedSize) {
      setFontSize(parseInt(savedSize, 10));
    }
  }, []);
  
  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

// Hook to use font size in components
const useFontSize = () => useContext(FontSizeContext);

// Font size control component with multiple interaction methods
export const FontSizeControl = () => {
  const { fontSize, setFontSize } = useFontSize();
  
  // Predefined size options
  const sizeOptions = [
    { value: 75, label: 'Small' },
    { value: 100, label: 'Medium' },
    { value: 125, label: 'Large' },
  ];
  
  const decreaseSize = () => {
    if (fontSize > 75) setFontSize(Math.max(75, fontSize - 5));
  };
  
  const increaseSize = () => {
    if (fontSize < 150) setFontSize(Math.min(150, fontSize + 5));
  };
  
  const handleSelectChange = (value) => {
    setFontSize(parseInt(value, 10));
  };
  
  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Type className="w-5 h-5 text-gray-500" />
        <h3 className="font-medium">Text Size</h3>
      </div>
      
      {/* Button controls for quick adjustments */}
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={decreaseSize} 
          disabled={fontSize <= 75}
          aria-label="Decrease font size"
        >
          <MinusIcon className="w-4 h-4" />
        </Button>
        
        <span className="font-medium">{fontSize}%</span>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={increaseSize} 
          disabled={fontSize >= 200}
          aria-label="Increase font size"
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Dropdown for preset sizes */}
      <Select value={fontSize.toString()} onValueChange={handleSelectChange}>
        <SelectTrigger aria-label="Select font size preset">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          {sizeOptions.map(option => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Example of App implementation
const AccessibleApp = () => {
  return (
    <FontSizeProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="p-4 bg-white border-b">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">My Accessible App</h1>
            <FontSizeControl />
          </div>
        </header>
        
        <main className="container mx-auto p-4">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to our Accessible App</h2>
            <p className="mb-4">This text will resize based on user preference settings.</p>
            <p>Notice how all text elements scale proportionally while maintaining layout integrity.</p>
          </section>
        </main>
      </div>
    </FontSizeProvider>
  );
};

export default AccessibleApp;