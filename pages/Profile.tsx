
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ProfileSettings } from "../components/settings/ProfileSettings";
import { SecuritySettings } from "../components/settings/SecuritySettings";
import { PreferencesSettings } from "../components/settings/PreferencesSettings";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../components/ui/card";
import { 
  User, 
  Shield, 
  Settings, 
  Bell,
  Award,
  Briefcase,
  GraduationCap,
  LogOut
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";

// Access from app context in a real application
const defaultUserData = {
  firstName: "John",
  lastName: "Smith",
  email: "john@acme.com",
  role: "IT Manager",
  company: "Acme Inc.",
  avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
};

// Mock user stats - in a real app these would come from an API
const userStats = {
  rewards: 2150,
  coursesCompleted: 7,
  certifications: 3,
  yearsExperience: 8,
  devicesManagedCount: 127,
  learningStreak: 14,
  teams: ["IT Operations", "Security", "Cloud Infrastructure"]
};

export function Profile() {
  const [activeTab, setActiveTab] = useState<string>("profile");

  // This function would be passed from App.tsx in a real implementation
  const handleLogout = () => {
    // Access the logout function from App.tsx
    // In this simplified example, we'll just reload the page which will return to login
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1>User Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar with User Summary */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Account Summary</CardTitle>
            <CardDescription>Your IT Health profile overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Avatar and Name */}
            <div className="flex flex-col items-center text-center p-4">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={defaultUserData.avatar} />
                <AvatarFallback className="text-xl">
                  {defaultUserData.firstName.charAt(0)}{defaultUserData.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-xl">
                {defaultUserData.firstName} {defaultUserData.lastName}
              </h3>
              <p className="text-muted-foreground mb-2">
                {defaultUserData.role} at {defaultUserData.company}
              </p>
              <div className="flex gap-2 flex-wrap justify-center">
                <Badge variant="secondary" className="bg-sidebar text-white">
                  <Shield className="h-3 w-3 mr-1" /> IT Admin
                </Badge>
                <Badge variant="outline">Pro Plan</Badge>
              </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <Award className="h-5 w-5 text-primary mb-1" />
                <span className="text-lg font-semibold">{userStats.rewards}</span>
                <span className="text-xs text-muted-foreground">Reward Points</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <GraduationCap className="h-5 w-5 text-primary mb-1" />
                <span className="text-lg font-semibold">{userStats.coursesCompleted}</span>
                <span className="text-xs text-muted-foreground">Courses</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <Bell className="h-5 w-5 text-primary mb-1" />
                <span className="text-lg font-semibold">{userStats.learningStreak}</span>
                <span className="text-xs text-muted-foreground">Day Streak</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <Briefcase className="h-5 w-5 text-primary mb-1" />
                <span className="text-lg font-semibold">{userStats.devicesManagedCount}</span>
                <span className="text-xs text-muted-foreground">Devices</span>
              </div>
            </div>

            {/* Teams */}
            <div>
              <h4 className="font-medium mb-2">Teams</h4>
              <div className="flex flex-wrap gap-2">
                {userStats.teams.map(team => (
                  <Badge key={team} variant="outline">{team}</Badge>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Content with Tabs */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                <span>Preferences</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-0">
              <ProfileSettings />
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <SecuritySettings />
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-0">
              <PreferencesSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
