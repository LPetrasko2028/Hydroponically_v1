import { useState } from 'react'
import { useAuthStore } from '../../../store/authStore.js';
import { Label } from '@/components/ui/label';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
  } from '@/components/ui/card';
  import { Input } from '@/components/ui/input';
  import { Button } from '@/components/ui/button';
  import { 
    Save
  } from 'lucide-react';

const UserInfoComponent = () => {
  const { user, isLoading, logout } = useAuthStore();
  return (
    <div>
      <Card className="mb-6">
        <CardHeader className="flex flex-row justify-between">
          <div>
          <CardTitle>User Info</CardTitle>
          <CardDescription>Manage your account</CardDescription>
          </div>

          <Button id="logout" onClick={() => logout()} className="w-fit bg-red-500 rounded-xs">
              Logout
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6">
            {/* Username */}
            <div>
              <Label htmlFor="username">Username</Label>
              <p id="username" defaultValue="Username" className="font-medium">{user.name}</p>
            </div>
            
            {/* Roles */}
            <div className="flex flex-row justify-between">
              <div>
              <Label htmlFor="roles">Role(s)</Label>
              <ul id="roles" className="font-medium">
                {user.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
              </div>
              <Button id="editRoles" className="w-fit bg-blue-500 rounded-xs">Change Roles</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserInfoComponent