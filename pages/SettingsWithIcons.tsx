
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
import { 
  AlertTriangle, 
  UserCircle, 
  ShieldCheck, 
  Settings, 
  Bell, 
  CreditCard, 
  MessageSquare, 
  Palette, 
  Code, 
  Users 
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Billing } from "./Billing";
import { Feedback } from "./Feedback";
import { Admin } from "./Admin";

interface SettingsProps {
  defaultTab?: string;
}

export function SettingsWithIcons({ defaultTab = "profile" }: SettingsProps) {
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
        <TabsTrigger value="profile">
          <UserCircle className="h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="security">
          <ShieldCheck className="h-4 w-4" />
          Security
        </TabsTrigger>
        <TabsTrigger value="preferences">
          <Settings className="h-4 w-4" />
          Preferences
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="billing">
          <CreditCard className="h-4 w-4" />
          Billing
        </TabsTrigger>
        <TabsTrigger value="feedback">
          <MessageSquare className="h-4 w-4" />
          Feedback
        </TabsTrigger>
        {isAdmin && <TabsTrigger value="branding">
          <Palette className="h-4 w-4" />
          Branding
        </TabsTrigger>}
        {isAdmin && <TabsTrigger value="api">
          <Code className="h-4 w-4" />
          API
        </TabsTrigger>}
        {isAdmin && <TabsTrigger value="roles">
          <Users className="h-4 w-4" />
          Roles
        </TabsTrigger>}
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
      
      {/* Other tabs content remains the same as in the original Settings.tsx */}
      {/* ... */}
    </Tabs>
  );
}
