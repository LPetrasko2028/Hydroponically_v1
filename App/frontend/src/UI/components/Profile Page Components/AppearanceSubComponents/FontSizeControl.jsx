import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { MinusIcon, PlusIcon, Type } from 'lucide-react';
import { usePreferencesStore } from '../../../../store/preferencesStorePouchDB';


// Font size control component with multiple interaction methods
export const FontSizeControl = () => {
    const { fontSize, setFontSize } = usePreferencesStore();
    
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
  