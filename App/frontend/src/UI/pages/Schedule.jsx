import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sun,
  Moon,
  Droplet,
  Timer,
  Plus,
  Trash2,
  Power,
  RefreshCw,
  Calendar,
  Check,
  X,
  Edit2,
  AlertCircle
} from 'lucide-react';
import CalendarDisplay from '../components/CalendarDisplay.jsx';

const SchedulePage = () => {
  // Sample schedule data
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      name: 'Main Lighting',
      type: 'lighting',
      startTime: '06:00',
      endTime: '18:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      status: 'active',
      lastRun: '2024-03-18 06:00',
      nextRun: '2024-03-19 06:00'
    },
    {
      id: 2,
      name: 'Nutrient Pump',
      type: 'pump',
      startTime: '08:00',
      duration: '15',
      interval: '4',
      status: 'active',
      lastRun: '2024-03-18 16:00',
      nextRun: '2024-03-18 20:00'
    },
    {
      id: 3,
      name: 'Night Mode',
      type: 'system',
      startTime: '22:00',
      endTime: '05:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      status: 'active',
      lastRun: '2024-03-17 22:00',
      nextRun: '2024-03-18 22:00'
    }
  ]);

  const [newSchedule, setNewSchedule] = useState({
    type: '',
    name: '',
    startTime: '',
    endTime: '',
    duration: '',
    interval: '',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    status: 'active'
  });

  const scheduleTypes = [
    { value: 'lighting', label: 'Lighting Schedule', icon: Sun },
    { value: 'pump', label: 'Pump Schedule', icon: Droplet },
    { value: 'system', label: 'System Schedule', icon: Power }
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getScheduleIcon = (type) => {
    switch (type) {
      case 'lighting':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'pump':
        return <Droplet className="w-5 h-5 text-blue-500" />;
      case 'system':
        return <Power className="w-5 h-5 text-purple-500" />;
      default:
        return <Timer className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleAddSchedule = () => {
    const newId = Math.max(...schedules.map(s => s.id), 0) + 1;
    setSchedules([...schedules, { ...newSchedule, id: newId }]);
    setNewSchedule({
      type: '',
      name: '',
      startTime: '',
      endTime: '',
      duration: '',
      interval: '',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      status: 'active'
    });
  };

  const toggleScheduleStatus = (id) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id
        ? { ...schedule, status: schedule.status === 'active' ? 'inactive' : 'active' }
        : schedule
    ));
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Schedules</h1>
            <p className="text-gray-500 mt-2">
              {schedules.length} schedules • {schedules.filter(s => s.status === 'active').length} active
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Schedule</DialogTitle>
                <DialogDescription>
                  Set up a new automated schedule for your hydroponic system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Schedule Type</Label>
                  <Select
                    value={newSchedule.type}
                    onValueChange={(value) => setNewSchedule({ ...newSchedule, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule type" />
                    </SelectTrigger>
                    <SelectContent>
                      {scheduleTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            {React.createElement(type.icon, { className: "w-4 h-4" })}
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Schedule Name</Label>
                  <Input
                    value={newSchedule.name}
                    onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                    placeholder="Enter schedule name"
                  />
                </div>

                {newSchedule.type === 'pump' ? (
                  <>
                    <div className="grid gap-2">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={newSchedule.startTime}
                        onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Duration (minutes)</Label>
                        <Input
                          type="number"
                          value={newSchedule.duration}
                          onChange={(e) => setNewSchedule({ ...newSchedule, duration: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Interval (hours)</Label>
                        <Input
                          type="number"
                          value={newSchedule.interval}
                          onChange={(e) => setNewSchedule({ ...newSchedule, interval: e.target.value })}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={newSchedule.startTime}
                          onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={newSchedule.endTime}
                          onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Repeat Days</Label>
                      <div className="flex flex-wrap gap-2">
                        {daysOfWeek.map((day) => (
                          <Button
                            key={day}
                            variant={newSchedule.days.includes(day) ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              const newDays = newSchedule.days.includes(day)
                                ? newSchedule.days.filter(d => d !== day)
                                : [...newSchedule.days, day];
                              setNewSchedule({ ...newSchedule, days: newDays });
                            }}
                          >
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handleAddSchedule}>Create Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Schedule Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Timing</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Next Run</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>{getScheduleIcon(schedule.type)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{schedule.name}</p>
                        <p className="text-sm text-gray-500">
                          {schedule.type === 'pump' 
                            ? `Every ${schedule.interval} hours for ${schedule.duration} minutes`
                            : schedule.days.join(', ')}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {schedule.type === 'pump'
                        ? `${schedule.startTime} (+${schedule.interval}h)`
                        : `${schedule.startTime} - ${schedule.endTime}`}
                    </TableCell>
                    <TableCell>{schedule.lastRun}</TableCell>
                    <TableCell>{schedule.nextRun}</TableCell>
                    <TableCell>
                      <Switch
                        checked={schedule.status === 'active'}
                        onCheckedChange={() => toggleScheduleStatus(schedule.id)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => console.log('Edit schedule', schedule.id)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteSchedule(schedule.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <CalendarDisplay />
    </div>
  );
};

export default SchedulePage;