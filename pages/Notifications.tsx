
import { useState } from "react";
import { NotificationsList } from "../components/notifications/NotificationsList";
import { mockNotifications } from "../lib/mockData";
import { Notification } from "../lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

export function Notifications() {
  // Create a stateful copy of notifications
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  // Mark a notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Inbox</h1>
        <p className="text-muted-foreground">
          Manage updates, alerts, and information about your IT Health services
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <NotificationsList 
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onClearAll={handleClearAll}
          />
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Customize how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails for important updates
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="payment-reminders">Payment Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications before payment is due
                    </p>
                  </div>
                  <Switch id="payment-reminders" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="support-updates">Support Ticket Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when your support tickets change status
                    </p>
                  </div>
                  <Switch id="support-updates" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-alerts">System Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about maintenance and service issues
                    </p>
                  </div>
                  <Switch id="system-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing">Marketing & Promotions</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new services and special offers
                    </p>
                  </div>
                  <Switch id="marketing" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
