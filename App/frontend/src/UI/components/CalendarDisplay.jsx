import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sun,
  Moon,
  Droplet,
  Power,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon
} from 'lucide-react';

const ScheduleCalendar = () => {
  // Sample schedule data
  const schedules = [
    {
      id: 1,
      name: 'Main Lighting',
      type: 'lighting',
      startTime: 6, // 6:00 AM in hours
      endTime: 18, // 6:00 PM in hours
      color: '#FCD34D'
    },
    {
      id: 2,
      name: 'Nutrient Pump',
      type: 'pump',
      startTime: 8, // 8:00 AM
      endTime: 20, // 8:00 PM
      interval: 4, // Every 4 hours
      duration: 0.25, // 15 minutes
      color: '#60A5FA'
    },
    {
      id: 3,
      name: 'Night Mode',
      type: 'system',
      startTime: 22, // 10:00 PM
      endTime: 5, // 5:00 AM
      color: '#8B5CF6'
    }
  ];

  // Get current week dates
  const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDay);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
    });
  };

  const [weekDates] = useState(getCurrentWeekDates());

  // Generate donut segments for a schedule
  const generateDonutSegments = (schedule) => {
    const segments = [];
    const totalHours = 24;
    let startAngle = 0;

    if (schedule.type === 'pump') {
      // For pump schedules, create multiple segments based on interval
      let currentHour = schedule.startTime;
      while (currentHour < schedule.endTime) {
        const startPercent = (currentHour / totalHours) * 100;
        const endPercent = ((currentHour + schedule.duration) / totalHours) * 100;
        const dashArray = `${endPercent - startPercent} ${100 - (endPercent - startPercent)}`;
        const rotation = startPercent * 3.6; // Convert percentage to degrees

        segments.push(
          <circle
            key={`${schedule.id}-${currentHour}`}
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke={schedule.color}
            strokeWidth="10%"
            strokeDasharray={dashArray}
            strokeDashoffset="25"
            transform={`rotate(${rotation} 50 50)`}
          />
        );

        currentHour += schedule.interval;
      }
    } else {
      // For continuous schedules
      let startHour = schedule.startTime;
      let endHour = schedule.endTime;
      
      // Handle schedules that cross midnight
      if (endHour < startHour) {
        endHour += 24;
      }

      const startPercent = (startHour / totalHours) * 100;
      const endPercent = (endHour / totalHours) * 100;
      const dashArray = `${endPercent - startPercent} ${100 - (endPercent - startPercent)}`;
      const rotation = startPercent * 3.6; // Convert percentage to degrees

      segments.push(
        <circle
          key={schedule.id}
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke={schedule.color}
          strokeWidth="10%"
          strokeDasharray={dashArray}
          strokeDashoffset="25"
          transform={`rotate(${rotation} 50 50)`}
        />
      );
    }

    return segments;
  };

  const getScheduleIcon = (type) => {
    switch (type) {
      case 'lighting':
        return <Sun className="w-4 h-4 text-yellow-400" />;
      case 'pump':
        return <Droplet className="w-4 h-4 text-blue-400" />;
      case 'system':
        return <Power className="w-4 h-4 text-purple-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Schedule Calendar</h1>
            <p className="text-gray-500 mt-2">
              {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Today
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Schedule Legend */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex flex-wrap gap-6">
              {schedules.map(schedule => (
                <div key={schedule.id} className="flex items-center gap-2">
                  {getScheduleIcon(schedule.type)}
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: schedule.color }} />
                  <span className="text-sm font-medium">{schedule.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4">
          {weekDates.map((date, index) => (
            <Card key={index} className={`${
              date.toDateString() === new Date().toDateString() ? 'ring-2 ring-blue-500' : ''
            }`}>
              <CardHeader className="pb-2">
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className={`text-xl font-bold ${
                    date.toDateString() === new Date().toDateString() ? 'text-blue-500' : 'text-gray-900'
                  }`}>
                    {date.getDate()}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="relative w-full pt-[100%]">
                  {/* Clock face */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full -rotate-90"
                  >
                    {/* Clock markers */}
                    {Array.from({ length: 24 }, (_, i) => (
                      <line
                        key={i}
                        x1="50"
                        y1="5"
                        x2="50"
                        y2="10"
                        stroke="#E5E7EB"
                        strokeWidth="1"
                        transform={`rotate(${i * 15} 50 50)`}
                      />
                    ))}
                    
                    {/* Schedule segments */}
                    {schedules.map(schedule => generateDonutSegments(schedule))}

                    {/* Center dot */}
                    <circle
                      cx="50"
                      cy="50"
                      r="2"
                      fill="#374151"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Time Markers */}
        <div className="mt-4 px-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
            <span>12 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;