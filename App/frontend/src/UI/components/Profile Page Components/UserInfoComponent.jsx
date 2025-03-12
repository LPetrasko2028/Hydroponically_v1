import { useState } from 'react'
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
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Info</CardTitle>
          <CardDescription>Manage your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="HydroGrower123" />
            </div>

            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" defaultValue="Alex Johnson" />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="alex@example.com" />
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