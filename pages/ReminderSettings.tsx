
import { useState, useEffect } from "react";
import { ReminderScheduler } from "../components/assessment/ReminderScheduler";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { AssessmentReminder } from "../lib/assessmentTypes";
import { ArrowLeft, Bell, Calendar, Mail, Settings } from "lucide-react";
import { toast } from "sonner@2.0.3";

// Mock user data
const userData = {
  id: "u-123456",
  firstName: "John",
  lastName: "Smith",
  email: "john@acme.com",
  role: "IT Manager",
  company: "Acme Inc.",
  avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
};

// Mock reminders
const initialReminders: AssessmentReminder[] = [
  {
    id: "reminder-1",
    userId: userData.id,
    frequency: "quarterly",
    nextDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
    emailTemplateId: "template-1",
    enabled: true,
    createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
    recipients: [userData.email]
  },
  {
    id: "reminder-2",
    userId: userData.id,
    frequency: "annually",
    nextDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    emailTemplateId: "template-3",
    enabled: false,
    createdAt: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
    lastSent: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
    recipients: [userData.email, "team@acme.com"]
  }
];

export function ReminderSettings() {
  const [reminders, setReminders] = useState<AssessmentReminder[]>(initialReminders);
  const [activeTab, setActiveTab] = useState("reminders");

  const handleSaveReminder = (reminder: AssessmentReminder) => {
    // Find if this reminder already exists
    const existingIndex = reminders.findIndex(r => r.id === reminder.id);
    
    if (existingIndex >= 0) {
      // Update existing reminder
      const updatedReminders = [...reminders];
      updatedReminders[existingIndex] = reminder;
      setReminders(updatedReminders);
    } else {
      // Add new reminder
      setReminders([...reminders, reminder]);
    }
    
    // In a real app, we would save to backend here
    toast.success("Reminder saved successfully");
  };

  const handleDeleteReminder = (reminderId: string) => {
    setReminders(reminders.filter(r => r.id !== reminderId));
    // In a real app, we would delete from backend here
    toast.success("Reminder deleted successfully");
  };

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 md:px-6">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          className="mr-4"
          data-page-id="dashboard"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-light text-navy">
            Assessment <strong>Settings</strong>
          </h1>
          <p className="text-muted-foreground">
            Configure your assessment reminders and notifications
          </p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="reminders" className="gap-2">
            <Calendar className="h-4 w-4" />
            Reminders
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reminders">
          <ReminderScheduler
            userId={userData.id}
            userEmail={userData.email}
            userName={`${userData.firstName} ${userData.lastName}`}
            existingReminders={reminders}
            onSaveReminder={handleSaveReminder}
            onDeleteReminder={handleDeleteReminder}
          />
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications about assessments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <NotificationSetting
                  title="Assessment Completion"
                  description="Get notified when someone completes an assessment"
                  icon={<Mail className="h-4 w-4" />}
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="Team Assessment Invitations"
                  description="Get notified when you're invited to collaborate on a team assessment"
                  icon={<Mail className="h-4 w-4" />}
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="Assessment Comments"
                  description="Get notified when someone comments on an assessment"
                  icon={<Mail className="h-4 w-4" />}
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="Score Changes"
                  description="Get notified about significant changes in your assessment scores"
                  icon={<Mail className="h-4 w-4" />}
                  defaultEnabled={false}
                />
                
                <NotificationSetting
                  title="Weekly Digest"
                  description="Get a weekly summary of assessment activities and reminders"
                  icon={<Mail className="h-4 w-4" />}
                  defaultEnabled={false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Preferences</CardTitle>
              <CardDescription>
                Configure your default settings for assessments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <NotificationSetting
                  title="Save Assessment History"
                  description="Automatically save all completed assessments to your history"
                  icon={<Settings className="h-4 w-4" />}
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="Detailed Reports"
                  description="Generate detailed reports for all completed assessments"
                  icon={<Settings className="h-4 w-4" />}
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="Industry Benchmarking"
                  description="Compare your results with industry averages"
                  icon={<Settings className="h-4 w-4" />}
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="Auto-share with Team"
                  description="Automatically share assessment results with your team"
                  icon={<Settings className="h-4 w-4" />}
                  defaultEnabled={false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface NotificationSettingProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultEnabled: boolean;
}

function NotificationSetting({ title, description, icon, defaultEnabled }: NotificationSettingProps) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  
  const handleToggle = (newState: boolean) => {
    setEnabled(newState);
    toast.success(`${title} ${newState ? 'enabled' : 'disabled'}`);
  };
  
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button 
        variant={enabled ? "default" : "outline"} 
        size="sm" 
        className={enabled ? "bg-gold hover:bg-gold/90" : ""}
        onClick={() => handleToggle(!enabled)}
      >
        {enabled ? "Enabled" : "Disabled"}
      </Button>
    </div>
  );
}
