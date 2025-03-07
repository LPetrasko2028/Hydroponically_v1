import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { Thermometer, Droplet, TestTube, Sprout, Wind } from 'lucide-react';
const SensorValueQuickView = ({ icon: Icon, label, value, unit, color = "text-blue-500" }) => (
  <Card className="h-full">
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <Icon className={`w-8 h-8 ${color}`} />
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold">
            {value}
            <span className="text-sm text-gray-500 ml-1">{unit}</span>
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Replace with your actual API endpoint
const getQuickStats = () => {
    return [
      {
        name: "airTemp",
        value: 23,
      },
      {
        name: "humidity",
        value: 65,
      },
      {
        name: "pH",
        value: 6.2,
      },
      {
        name: "tds",
        value: 50,
      },
      {
        name: "co2",
        value: 50,
      },
      {
        name: "waterTemp",
        value: 22.5,
      },
    ];
  };

const QuickStatsPanel = () => {
    const [quickStats, setQuickStats] = React.useState([]);
    React.useEffect(() => {
        // Continuously Get Quick Stats from API
        const quickStatsRequest = getQuickStats();
        setQuickStats(quickStatsRequest);
        const quickStatsInterval = setInterval(() => {
          const quickStatsRequest = getQuickStats();
          setQuickStats(quickStatsRequest);
        }, 5000);
        return () => {
            clearInterval(quickStatsInterval);
        };
      }, []);


  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {quickStats.map((stat, index) => {
          switch (stat.name) {
            case "airTemp":
              stat.label = "Air Temperature";
              stat.unit = "°C";
              stat.icon = Thermometer;
              stat.color = "text-red-500";
              break;
            case "humidity":
              stat.label = "Humidity";
              stat.unit = "%";
              stat.icon = Droplet;
              stat.color = "text-blue-500";
              break;
            case "pH":
              stat.label = "pH Level";
              stat.unit = "pH";
              stat.icon = TestTube;
              stat.color = "text-green-500";
              break;
            case "tds":
              stat.label = "Nutrient Level";
              stat.unit = "ppm";
              stat.icon = Sprout;
              stat.color = "text-purple-500";
              break;
            case "co2":
              stat.label = "CO2 Level";
              stat.unit = "ppm";
              stat.icon = Wind;
              stat.color = "text-gray-500";
              break;
            case "waterTemp":
              stat.label = "Water Temperature";
              stat.unit = "°C";
              stat.icon = Thermometer;
              stat.color = "text-red-500";
              break;
          }
          // example
          //   <SensorValueQuickView
          //   icon={Thermometer}
          //   label="Air Temperature"
          //   value="24.5"
          //   unit="°C"
          //   color="text-red-500"
          //  />
          return <SensorValueQuickView key={index} {...stat} />;
        })}
      </div>
  )
}

export default QuickStatsPanel