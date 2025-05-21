
import { useState } from "react";
import { TeamAssessment } from "../components/assessment/TeamAssessment";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ArrowLeft, Users, Settings, Bell, Calendar } from "lucide-react";
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

export function TeamSettings() {
  const [activeTab, setActiveTab] = useState("teams");

  const handleCreateAssessment = (teamId: string) => {
    toast.success(`Creating new assessment for team ${teamId}`);
    // In a real application, this would navigate to the assessment page
  };

  const handleViewAssessment = (assessmentId: string) => {
    toast.success(`Viewing assessment ${assessmentId}`);
    // In a real application, this would navigate to the assessment results page
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
            Team <strong>Collaboration</strong>
          </h1>
          <p className="text-muted-foreground">
            Manage team assessments and collaborate with your colleagues
          </p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="teams" className="gap-2">
            <Users className="h-4 w-4" />
            Team Management
          </TabsTrigger>
          <TabsTrigger value="reminders" className="gap-2">
            <Calendar className="h-4 w-4" />
            Team Reminders
          </TabsTrigger>
          <TabsTrigger value="notification-settings" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="teams">
          <TeamAssessment 
            currentUserId={userData.id}
            onCreateAssessment={handleCreateAssessment}
            onViewAssessment={handleViewAssessment}
          />
        </TabsContent>
        
        <TabsContent value="reminders">
          <Card>
            <CardHeader>
              <CardTitle>Team Assessment Reminders</CardTitle>
              <CardDescription>
                Schedule reminders for your teams to complete assessments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 flex flex-col items-center justify-center space-y-4 text-center bg-muted/30 rounded-md">
                <Calendar className="h-12 w-12 text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-medium">Team reminders coming soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We're building team assessment reminders to help you keep your entire team on track with regular IT health evaluations.
                  </p>
                </div>
                <Button className="mt-2 bg-gold hover:bg-gold/90" data-page-id="reminder-settings">
                  Configure Personal Reminders
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notification-settings">
          <Card>
            <CardHeader>
              <CardTitle>Team Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive notifications about team activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <NotificationSetting
                  title="Team Assessment Completion"
                  description="Get notified when a team member completes an assessment"
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="New Team Comments"
                  description="Get notified when someone comments on a team assessment"
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="Team Member Joins/Leaves"
                  description="Get notified when someone joins or leaves your team"
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="Team Assessment Results"
                  description="Get notified when a team assessment is finalized"
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="Team Score Changes"
                  description="Get notified about significant changes in team assessment scores"
                  defaultEnabled={false}
                />
                
                <NotificationSetting
                  title="Team Weekly Digest"
                  description="Get a weekly summary of team assessment activities"
                  defaultEnabled={false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Team Assessment Preferences</CardTitle>
              <CardDescription>
                Configure your default settings for team assessments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <NotificationSetting
                  title="Auto-share Results with Team"
                  description="Automatically share assessment results with team members"
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="Allow Team Comments"
                  description="Enable commenting on team assessments"
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="Team Comparison View"
                  description="Compare results across multiple team assessments"
                  defaultEnabled={true}
                />
                
                <NotificationSetting
                  title="Anonymous Contribution Mode"
                  description="Hide individual contributions in collaborative assessments"
                  defaultEnabled={false}
                />
                
                <NotificationSetting
                  title="Require Team Approval for Final Results"
                  description="Final results need approval from team admins"
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
  defaultEnabled: boolean;
}

function NotificationSetting({ title, description, defaultEnabled }: NotificationSettingProps) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  
  const handleToggle = (newState: boolean) => {
    setEnabled(newState);
    toast.success(`${title} ${newState ? 'enabled' : 'disabled'}`);
  };
  
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
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
