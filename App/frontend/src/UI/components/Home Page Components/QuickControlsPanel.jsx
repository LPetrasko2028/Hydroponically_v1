import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from "@/components/ui/switch";
import { Power } from 'lucide-react';

const getRelays = () => {
  return [
    {
      name: "Relay 1",
      status: "on",
    },
    {
      name: "Relay 2",
      status: "off",
    },
    {
      name: "Relay 3",
      status: "on",
    },
  ];
};

const QuickControlsPanel = () => {
    const [Relays, setRelays] = React.useState([]);
    const [RelayChecked, setRelayChecked] = React.useState([]);
    // const handleSwitchChange = (id) => {
        
    //     setRelays(
    //       Relays.map((relay) =>
    //         relay.name === id
    //           ? { ...relay, status: relay.status === "on" ? "off" : "on" }
    //           : relay
    //       )
    //     );

    // };
    const handleSwitchChange = (id) => {
        setRelayChecked(prev => ({
          ...prev,
          [id]: !prev[id]
        }));
    };
    React.useEffect(() => {
        const relaysRequest = getRelays();
        setRelays(relaysRequest);
        setRelayChecked(relaysRequest.reduce((acc, relay) => {
          acc[relay.name] = relay.status === "on";
          return acc;
        }, {}));
    }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Relays.map((relay, index) => (
            <div
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
              key={index}
            >
              <div className="flex items-center gap-2">
                <Power className="w-5 h-5" />
                <span>{relay.name}</span>
              </div>
              <Switch
                id={relay.name}
                checked={RelayChecked[relay.name]}
                onCheckedChange={() => handleSwitchChange(relay.name)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default QuickControlsPanel