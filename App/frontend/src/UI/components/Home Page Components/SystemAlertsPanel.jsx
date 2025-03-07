import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const getAlerts = () => {
  return [
    {
      severity: "urgent",
      message: "Nutrient levels slightly low",
    },
    {
      severity: "warning",
      message: "Plant maintenance due",
    },
  ];
};

const SystemAlertsPanel = () => {
    const [Alerts, setAlerts] = React.useState([]);
    React.useEffect(() => {
        const alertsRequest = getAlerts();
        setAlerts(alertsRequest);
    }, []);
  return (
    <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Alerts</CardTitle>
          </CardHeader>
          { Alerts.filter((alert) => alert.severity === "urgent").map((alert, index) => (
            <CardContent key={index}>
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                <span>{alert.message}</span>
              </div>
            </CardContent>
          ))}
          { Alerts.filter((alert) => alert.severity === "warning").map((alert, index) => (
            <CardContent key={index}>
              <div className="flex items-center gap-2 text-yellow-600">
                <AlertCircle className="w-5 h-5" />
                <span>{alert.message}</span>
              </div>
            </CardContent>
          ))}
        </Card>
  )
}

export default SystemAlertsPanel