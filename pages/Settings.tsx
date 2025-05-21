
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ProfileSettings } from "../components/settings/ProfileSettings";
import { SecuritySettings } from "../components/settings/SecuritySettings";
import { PreferencesSettings } from "../components/settings/PreferencesSettings";
import { NotificationSettings } from "../components/settings/NotificationSettings";
import { BrandingSettings } from "../components/settings/BrandingSettings";
import { ApiSettings } from "../components/settings/ApiSettings";
import { RolePermissions } from "../components/settings/RolePermissions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Billing } from "./Billing";
import { Feedback } from "./Feedback";
import { Admin } from "./Admin";

interface SettingsProps {
  defaultTab?: string;
}

export function Settings({ defaultTab = "profile" }: SettingsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if user is admin
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdmin(true);
    }
    
    // Set active tab based on URL path or current location state
    const pathname = window.location.pathname;
    const currentPage = window.location.hash ? window.location.hash.substring(1) : '';
    
    // Check if we navigated here from a specific settings page in the sidebar
    if (defaultTab !== "profile") {
      setActiveTab(defaultTab);
    } else if (pathname.includes('billing') || currentPage === 'billing') {
      setActiveTab('billing');
    } else if (pathname.includes('feedback') || currentPage === 'feedback') {
      setActiveTab('feedback');
    } else if ((pathname.includes('admin') || currentPage === 'admin') && isAdmin) {
      setActiveTab('admin');
    }
  }, [isAdmin, defaultTab]);
  
  const handleDownloadData = () => {
    toast.info("Your data export has been initiated. You will receive an email when it's ready.");
  };
  
  const handleDeleteAccount = () => {
    toast.error("Account deletion is disabled in this demo.");
  };
  
  return (
    <Tabs defaultValue={activeTab} value={activeTab} className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
        {isAdmin && <TabsTrigger value="branding">Branding</TabsTrigger>}
        {isAdmin && <TabsTrigger value="api">API</TabsTrigger>}
        {isAdmin && <TabsTrigger value="roles">Roles</TabsTrigger>}
      </TabsList>
      
      <TabsContent value="profile" className="mt-6">
        <div className="grid gap-6">
          <ProfileSettings />
          
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>Information about your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Company Name</p>
                  <p>Acme Inc.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Industry</p>
                  <p>Technology</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p>50-100 employees</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p>123 Business Ave, Suite 100<br />San Francisco, CA 94107</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  To update company information, please contact your IT Health account manager
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="security" className="mt-6">
        <div className="grid gap-6">
          <SecuritySettings />
          
          <Card>
            <CardHeader>
              <CardTitle>Sessions & Devices</CardTitle>
              <CardDescription>Manage where you're signed in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground">
                      MacBook Pro • San Francisco, USA • May 18, 2025
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </div>
                
                <div className="flex justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">iPhone 15 Pro</p>
                    <p className="text-sm text-muted-foreground">
                      Mobile App • San Francisco, USA • May 16, 2025
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">Sign Out</Button>
                </div>
                
                <div className="flex justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Office iMac</p>
                    <p className="text-sm text-muted-foreground">
                      Chrome • San Francisco, USA • May 15, 2025
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">Sign Out</Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">Sign Out All Other Sessions</Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="preferences" className="mt-6">
        <div className="grid gap-6">
          <PreferencesSettings />
          
          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Manage your data and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Your Data</h3>
                <p className="text-sm text-muted-foreground">
                  You can download a copy of your data or request account deletion.
                  Downloading your data will export all information associated with your account.
                </p>
                <Button variant="outline" onClick={handleDownloadData}>
                  Download Your Data
                </Button>
              </div>
              
              <div className="border-t pt-4 space-y-4">
                <h3 className="font-medium text-destructive">Danger Zone</h3>
                <div className="flex gap-3 p-3 bg-red-50 text-red-800 rounded-md">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Delete Account</p>
                    <p className="mt-1">
                      This action is irreversible and will permanently delete all your data,
                      including your profile, subscriptions, and usage history.
                    </p>
                  </div>
                </div>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="notifications" className="mt-6">
        <NotificationSettings />
      </TabsContent>
      
      <TabsContent value="billing" className="mt-6">
        <Billing />
      </TabsContent>
      
      <TabsContent value="feedback" className="mt-6">
        <Feedback />
      </TabsContent>
      
      {isAdmin && (
        <TabsContent value="branding" className="mt-6">
          <BrandingSettings />
        </TabsContent>
      )}
      
      {isAdmin && (
        <TabsContent value="api" className="mt-6">
          <ApiSettings />
        </TabsContent>
      )}
      
      {isAdmin && (
        <TabsContent value="roles" className="mt-6">
          <RolePermissions />
        </TabsContent>
      )}
    </Tabs>
  );
}
