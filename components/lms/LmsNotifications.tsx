
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Bell, CheckCircle, Book, Award, Lightbulb, GraduationCap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Notification } from "../../lib/types";
import { cn } from "../ui/utils";

interface LmsNotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export function LmsNotifications({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}: LmsNotificationsProps) {
  const [activeTab, setActiveTab] = useState("skills");

  // Filter notifications that are related to skills/training
  const skillsNotifications = notifications.filter(
    notif => notif.type === "plan" || notif.message.toLowerCase().includes("skill") || 
    notif.message.toLowerCase().includes("course") || notif.message.toLowerCase().includes("training")
  );
  
  const unreadCount = skillsNotifications.filter(notif => !notif.read).length;
  
  const filteredNotifications = activeTab === "skills" 
    ? skillsNotifications 
    : activeTab === "unread"
      ? skillsNotifications.filter(notif => !notif.read)
      : notifications.filter(notif => notif.type === activeTab);

  const getNotificationIcon = (type: string, message: string) => {
    // Customize icons based on notification content for skills
    if (message.toLowerCase().includes("course")) {
      return <Book className="h-5 w-5 text-blue-500" />;
    } else if (message.toLowerCase().includes("certificate")) {
      return <Award className="h-5 w-5 text-green-500" />;
    } else if (message.toLowerCase().includes("skill")) {
      return <Lightbulb className="h-5 w-5 text-yellow-500" />;
    } else if (message.toLowerCase().includes("path")) {
      return <GraduationCap className="h-5 w-5 text-purple-500" />;
    } else {
      // Default icon based on type
      switch (type) {
        case "plan":
          return <Bell className="h-5 w-5 text-green-500" />;
        default:
          return <Bell className="h-5 w-5 text-primary" />;
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHrs < 1) {
      return "Just now";
    } else if (diffHrs < 24) {
      return `${diffHrs} hour${diffHrs === 1 ? "" : "s"} ago`;
    } else {
      const diffDays = Math.floor(diffHrs / 24);
      if (diffDays < 7) {
        return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
      } else {
        return date.toLocaleDateString();
      }
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Skills Notifications</CardTitle>
            <CardDescription>Stay updated with your skills progress and opportunities</CardDescription>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={onMarkAllAsRead}>
                Mark all as read
              </Button>
            )}
            <Button variant="ghost" onClick={onClearAll}>
              Clear all
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="skills" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skills">
              Skills
              {skillsNotifications.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {skillsNotifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="plan">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center p-6 border rounded-lg">
                  <Book className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="font-medium">No skill notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === "skills" 
                      ? "You don't have any skills-related notifications at the moment." 
                      : activeTab === "unread"
                        ? "You don't have any unread skills notifications."
                        : `You don't have any ${activeTab} notifications.`}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={cn(
                      "flex gap-4 p-4 border rounded-lg transition-colors",
                      notification.read ? "bg-background" : "bg-primary/5"
                    )}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                        {getNotificationIcon(notification.type, notification.message)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(notification.date)}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        {!notification.read ? (
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            New
                          </Badge>
                        ) : (
                          <span></span>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8"
                          onClick={() => onMarkAsRead(notification.id)}
                        >
                          {notification.read 
                            ? <span className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Read
                              </span> 
                            : "Mark as read"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          You can view all notifications in your main Inbox
        </div>
      </CardFooter>
    </Card>
  );
}
