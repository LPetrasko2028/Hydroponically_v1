import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, RefreshCw } from "lucide-react";

const Monitoring = () => {
  // State for sensor data
  const [sensorData, setSensorData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for time range selection
  const [timeRange, setTimeRange] = useState('24h');
  const [customDateRange, setCustomDateRange] = useState({
    from: new Date(Date.now() - 24 * 60 * 60 * 1000), // Default to last 24 hours
    to: new Date()
  });

  // Mock sensor types for demonstration
  const sensorTypes = ['pH', 'EC', 'Temperature', 'Humidity', 'Water Level', 'Light'];

  // Function to fetch sensor data from API
  const fetchSensorData = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      // const response = await fetch(`/api/sensor-data?from=${customDateRange.from.toISOString()}&to=${customDateRange.to.toISOString()}`);
      // const data = await response.json();
      
      // Mock data for demonstration
      const mockData = {};
      sensorTypes.forEach(type => {
        mockData[type] = generateMockData(type, customDateRange.from, customDateRange.to);
      });
      
      setSensorData(mockData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch sensor data. Please try again later.');
      console.error('Error fetching sensor data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate mock data for demonstration
  const generateMockData = (sensorType, fromDate, toDate) => {
    const data = [];
    const totalPoints = 100;
    const timeDiff = toDate - fromDate;
    
    const getValueRange = (type) => {
      switch(type) {
        case 'pH': return { min: 5.5, max: 6.5, unit: '' };
        case 'EC': return { min: 1.0, max: 2.5, unit: 'ppm' };
        case 'Temperature': return { min: 18, max: 24, unit: '°C' };
        case 'Humidity': return { min: 40, max: 80, unit: '%' };
        case 'Water Level': return { min: 70, max: 100, unit: '%' };
        case 'Light': return { min: 0, max: 100, unit: '%' };
        default: return { min: 0, max: 100, unit: '' };
      }
    };
    
    const { min, max, unit } = getValueRange(sensorType);
    
    for (let i = 0; i < totalPoints; i++) {
      const timestamp = new Date(fromDate.getTime() + (timeDiff * (i / totalPoints)));
      
      // Create some realistic patterns with randomness
      const baseValue = min + (Math.sin(i / 10) + 1) * (max - min) / 2;
      const randomVariation = (Math.random() - 0.5) * (max - min) / 5;
      const value = Math.max(min, Math.min(max, baseValue + randomVariation));
      
      data.push({
        timestamp: timestamp.toISOString(),
        value: parseFloat(value.toFixed(2)),
        unit
      });
    }
    
    return data;
  };

  // Handle time range changes
  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    
    const now = new Date();
    let from = now;
    
    switch(value) {
      case '1h':
        from = new Date(now.getTime() - 1 * 60 * 60 * 1000);
        break;
      case '6h':
        from = new Date(now.getTime() - 6 * 60 * 60 * 1000);
        break;
      case '24h':
        from = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'custom':
        // Don't change dates for custom selection
        return;
      default:
        from = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
    
    setCustomDateRange({ from, to: now });
  };

  // Format time for display
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const options = timeRange === '30d' || timeRange === '7d' 
      ? { month: 'short', day: 'numeric' } 
      : { hour: '2-digit', minute: '2-digit' };
      
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  // Fetch data on component mount and when date range changes
  useEffect(() => {
    fetchSensorData();
  }, [customDateRange.from, customDateRange.to]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hydroponic Sensor Dashboard</h1>
          <p className="text-gray-500">Monitor your system's vital parameters</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Time Range:</span>
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="6h">Last 6 Hours</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {timeRange === 'custom' && (
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex gap-2 items-center">
                    <CalendarIcon className="h-4 w-4" />
                    <span>
                      {customDateRange.from.toLocaleDateString()} - {customDateRange.to.toLocaleDateString()}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="range"
                    selected={{
                      from: customDateRange.from,
                      to: customDateRange.to,
                    }}
                    onSelect={range => {
                      if (range?.from && range?.to) {
                        setCustomDateRange({ from: range.from, to: range.to });
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
          
          <Button onClick={fetchSensorData} size="sm" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </header>
      
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <Tabs defaultValue="graphs" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="graphs">Graphs</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="graphs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sensorTypes.map((sensorType) => (
                <Card key={sensorType}>
                  <CardHeader className="pb-2">
                    <CardTitle>{sensorType}</CardTitle>
                    <CardDescription>
                      Current: {' '}
                      {sensorData[sensorType] && sensorData[sensorType].length > 0 
                        ? `${sensorData[sensorType][sensorData[sensorType].length - 1].value} ${sensorData[sensorType][sensorData[sensorType].length - 1].unit}`
                        : 'Loading...'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart
                        data={sensorData[sensorType] || []}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="timestamp" 
                          tickFormatter={formatTime} 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          domain={['auto', 'auto']}
                          tickFormatter={(value) => `${value}`}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          labelFormatter={(label) => new Date(label).toLocaleString()}
                          formatter={(value, name, props) => [`${value} ${props.payload.unit}`, sensorType]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#2563eb" 
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="grid">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sensorTypes.map((sensorType) => {
                    const currentReading = sensorData[sensorType] && sensorData[sensorType].length > 0
                      ? sensorData[sensorType][sensorData[sensorType].length - 1]
                      : null;
                      
                    return (
                      <div key={sensorType} className="bg-slate-50 p-4 rounded-lg border">
                        <h3 className="text-lg font-medium">{sensorType}</h3>
                        {currentReading ? (
                          <>
                            <div className="text-3xl font-bold mt-2">{currentReading.value}{currentReading.unit}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              Updated: {new Date(currentReading.timestamp).toLocaleTimeString()}
                            </div>
                          </>
                        ) : (
                          <div className="text-3xl font-bold mt-2">--</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Monitoring;