
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner@2.0.3";
import { Separator } from "../ui/separator";
import { BellRing, Mail, MessageSquare, Smartphone, AlertTriangle } from "lucide-react";

export function NotificationSettings() {
  const [emailSettings, setEmailSettings] = useState({
    assessmentReminders: true,
    assessmentResults: true,
    skillsUpdates: true,
    securityAlerts: true,
    marketingUpdates: false,
    weeklyDigest: true,
  });

  const [pushSettings, setPushSettings] = useState({
    assessmentReminders: true,
    messageNotifications: true,
    teamInvites: true,
    securityAlerts: true,
    skillsAchievements: true,
  });

  const [smsSettings, setSmsSettings] = useState({
    securityAlerts: true,
    criticalUpdates: false,
  });

  const [digestFrequency, setDigestFrequency] = useState("weekly");

  const handleToggleEmail = (key: keyof typeof emailSettings) => {
    setEmailSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTogglePush = (key: keyof typeof pushSettings) => {
    setPushSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleToggleSms = (key: keyof typeof smsSettings) => {
    setSmsSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    toast.success("Notification preferences saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure what emails you receive from IT Health Platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BellRing className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Assessment Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Reminders for upcoming and due assessments
                  </p>
                </div>
              </div>
              <Switch 
                checked={emailSettings.assessmentReminders}
                onCheckedChange={() => handleToggleEmail("assessmentReminders")}
              />
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Assessment Results</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications when assessment results are ready
                  </p>
                </div>
              </div>
              <Switch 
                checked={emailSettings.assessmentResults}
                onCheckedChange={() => handleToggleEmail("assessmentResults")}
              />
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Skills Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Updates about new skills, courses, and certifications
                  </p>
                </div>
              </div>
              <Switch 
                checked={emailSettings.skillsUpdates}
                onCheckedChange={() => handleToggleEmail("skillsUpdates")}
              />
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Important security-related notifications
                  </p>
                </div>
              </div>
              <Switch 
                checked={emailSettings.securityAlerts}
                onCheckedChange={() => handleToggleEmail("securityAlerts")}
              />
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Marketing Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    News, product updates, and promotional materials
                  </p>
                </div>
              </div>
              <Switch 
                checked={emailSettings.marketingUpdates}
                onCheckedChange={() => handleToggleEmail("marketingUpdates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    A summary of activity in your organization
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={emailSettings.weeklyDigest}
                  onCheckedChange={() => handleToggleEmail("weeklyDigest")}
                />
                {emailSettings.weeklyDigest && (
                  <Select value={digestFrequency} onValueChange={setDigestFrequency}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Configure what notifications you receive in your browser or mobile app</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BellRing className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Assessment Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded when assessments are due
                  </p>
                </div>
              </div>
              <Switch 
                checked={pushSettings.assessmentReminders}
                onCheckedChange={() => handleTogglePush("assessmentReminders")}
              />
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Message Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified of new messages and comments
                  </p>
                </div>
              </div>
              <Switch 
                checked={pushSettings.messageNotifications}
                onCheckedChange={() => handleTogglePush("messageNotifications")}
              />
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Team Invites</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you're invited to a team
                  </p>
                </div>
              </div>
              <Switch 
                checked={pushSettings.teamInvites}
                onCheckedChange={() => handleTogglePush("teamInvites")}
              />
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Critical security notifications
                  </p>
                </div>
              </div>
              <Switch 
                checked={pushSettings.securityAlerts}
                onCheckedChange={() => handleTogglePush("securityAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BellRing className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Skills Achievements</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications about new skills earned and certificates
                  </p>
                </div>
              </div>
              <Switch 
                checked={pushSettings.skillsAchievements}
                onCheckedChange={() => handleTogglePush("skillsAchievements")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SMS Notifications</CardTitle>
          <CardDescription>Configure what text messages you receive (charges may apply)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Important security notifications by SMS
                  </p>
                </div>
              </div>
              <Switch 
                checked={smsSettings.securityAlerts}
                onCheckedChange={() => handleToggleSms("securityAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="font-light">Critical Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Critical system alerts and status updates
                  </p>
                </div>
              </div>
              <Switch 
                checked={smsSettings.criticalUpdates}
                onCheckedChange={() => handleToggleSms("criticalUpdates")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Notification Preferences</Button>
      </div>
    </div>
  );
}
