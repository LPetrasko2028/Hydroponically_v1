# Schedule Data Types Design

I need to be able to build a schedule for a given day and convert it to a js object that can be used to render a calendar and trigger actions when events occur.

## Requirements

- I need to be able to build a schedule for a given day
- I need to be able to convert it to a js object that can be used to render a calendar
- I need to be able to convert the schedule object to actions as events occur


- I need to be able to add events to the schedule
- I need to be able to remove events from the schedule

## Design

### Design Notes

I will use 2 ways to represent the schedule:

1. Daily schedule - a list of events that occur on a given day
    - Best for (usually large) chunks of time that do not repeat much within a day
2. Interval schedule - an event that occurs at a given time interval
    - Best for (usually small) chunks of time that repeat often within a day

### Schedule Data

```javascript
const config = {
    relays: [
        { 
            pin: 518, 
            name: 'WaterCircuitRelay', 
            schedule: {
                type: 'interval',
                interval: { intervalMinutes: 30, durationMinutes: 2 }
            }
        },
        {
            pin: 538, 
            name: 'WaterCircuitRelay2',
            schedule: {
                type: 'interval',
                IntervalWindow: [
                    { startTime: '08:00', endTime: '22:00',
                        interval: { intervalMinutes: 15, durationMinutes: 2 }
                    },
                    { startTime: '22:00', endTime: '08:00',
                        interval: { intervalMinutes: 60, durationMinutes: 2 }
                    },
                ]
            }
        },
        { 
            pin: 525, 
            name: 'LightingCircuitRelay',
            schedule: {
                type: 'daily',
                events: [
                    { startTime: '09:00', stopTime: '17:00' }
                ]
            }
         },
        { 
            pin: 531, 
            name: 'LightingCircuitRelay2',
            schedule: {
                type: 'daily',
                events: [
                    { startTime: '09:00', stopTime: '17:00' }
                ]
            }
         },
    ],
    onValue: 0,
    offValue: 1,
    checkInterval: 15000
};
```

The relays array contains objects with the following properties:

- pin: The GPIO pin number of the relay
- name: The name of the relay
- schedule: An object containing the schedule for the relay.
