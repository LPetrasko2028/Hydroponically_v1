import { useState } from 'react';


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';


import UserInfoComponent from '../components/Profile Page Components/UserInfoComponent.jsx';
import NotificationsComponent from '../components/Profile Page Components/NotificationsComponent.jsx';
import AppearanceComponent from '../components/Profile Page Components/AppearanceComponent.jsx';
import ChangePasswordComponent from '../components/Profile Page Components/ChangePasswordComponent.jsx';
import DeleteAccountComponent from '../components/Profile Page Components/DeleteAccountComponent.jsx';


const ProfilePage = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div
      className={`p-6 ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>

        <Tabs defaultValue="user-info" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="user-info">User Info</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="user-info">
            <UserInfoComponent />
            <ChangePasswordComponent />
            <DeleteAccountComponent />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <NotificationsComponent />
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <AppearanceComponent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;