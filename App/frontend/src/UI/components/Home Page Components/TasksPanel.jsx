import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, WashingMachine } from 'lucide-react';

const getTasks = () => {
  return [
    {
      message: "Refill water tank",
    },
    {
      message: "Clean Grow Sections",
    },
  ];
};

const TasksPanel = () => {
    const [Tasks, setTasks] = React.useState([]);
    React.useEffect(() => {
        const tasksRequest = getTasks();
        setTasks(tasksRequest);
    }, []);
  return (
    <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Tasks.map((task, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>{task.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
  )
}

export default TasksPanel