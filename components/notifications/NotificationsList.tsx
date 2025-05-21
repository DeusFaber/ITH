
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
import { Bell, CheckCircle, AlertTriangle, CreditCard, Gift, TicketCheck } from "lucide-react";
import { Badge } from "../ui/badge";
import { Notification } from "../../lib/types";
import { cn } from "../ui/utils";

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export function NotificationsList({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}: NotificationsListProps) {
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter(notif => !notif.read).length;
  
  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : activeTab === "unread"
      ? notifications.filter(notif => !notif.read)
      : notifications.filter(notif => notif.type === activeTab);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case "system":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "ticket":
        return <TicketCheck className="h-4 w-4 text-purple-500" />;
      case "plan":
        return <Bell className="h-4 w-4 text-green-500" />;
      case "reward":
        return <Gift className="h-4 w-4 text-orange-500" />;
      default:
        return <Bell className="h-4 w-4 text-primary" />;
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
      <CardHeader className="py-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Notifications</CardTitle>
            <CardDescription className="text-xs">Stay updated with alerts and information</CardDescription>
          </div>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={onMarkAllAsRead}>
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={onClearAll}>
              Clear all
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="text-xs py-1">
              All
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs py-1">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="payment" className="text-xs py-1">Payment</TabsTrigger>
            <TabsTrigger value="ticket" className="text-xs py-1">Tickets</TabsTrigger>
            <TabsTrigger value="system" className="text-xs py-1">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-3">
            <div className="space-y-2">
              {filteredNotifications.length === 0 ? (
                <div className="text-center p-4 border rounded-lg">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <h3 className="font-medium text-sm">No notifications</h3>
                  <p className="text-xs text-muted-foreground">
                    {activeTab === "all" 
                      ? "You don't have any notifications at the moment." 
                      : activeTab === "unread"
                        ? "You don't have any unread notifications."
                        : `You don't have any ${activeTab} notifications.`}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={cn(
                      "flex gap-2 p-2 border rounded-lg transition-colors",
                      notification.read ? "bg-background" : "bg-primary/5"
                    )}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground flex-shrink-0">
                          {formatDate(notification.date)}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        {!notification.read ? (
                          <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                            New
                          </Badge>
                        ) : (
                          <span></span>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs"
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
        <div className="text-xs text-muted-foreground">
          You can customize your notification preferences in the Settings
        </div>
      </CardFooter>
    </Card>
  );
}
