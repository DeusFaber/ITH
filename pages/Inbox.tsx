
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { NotificationsList } from "../components/notifications/NotificationsList";
import { TicketList } from "../components/tickets/TicketList";
import { mockNotifications, mockTickets } from "../lib/mockData";
import { Notification, Ticket } from "../lib/types";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import {
  Inbox as InboxIcon,
  BellRing,
  TicketCheck,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Filter,
  Sliders,
  User,
  MessageCircle,
  CreditCard,
  MailOpen,
  Bell,
  Book,
  AlertOctagon,
  Lightbulb,
  BookOpen
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../components/ui/dropdown-menu";

export function Inbox() {
  // Create stateful copies of tickets and notifications
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [activeTab, setActiveTab] = useState("all");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showReadMessages, setShowReadMessages] = useState(true);
  const [showResolvedTickets, setShowResolvedTickets] = useState(true);
  const [priorityFilters, setPriorityFilters] = useState({
    low: true,
    medium: true,
    high: true,
    critical: true
  });
  const [typeFilters, setTypeFilters] = useState({
    payment: true,
    system: true,
    ticket: true,
    plan: true,
    reward: true,
    skill: true,
    alert: true
  });

  // Compute unread counts for badges
  const unreadNotificationsCount = notifications.filter(notif => !notif.read).length;
  const openTicketsCount = tickets.filter(ticket => ticket.status === "open" || ticket.status === "in-progress").length;
  const totalItemsCount = tickets.length + notifications.length;
  
  // Compute specific counters for skill requirements and alerts
  const unreadSkillRequirementsCount = notifications.filter(notif => !notif.read && notif.type === "skill").length;
  const unreadAlertsCount = notifications.filter(notif => !notif.read && notif.type === "alert").length;
  const criticalAlertsCount = notifications.filter(notif => notif.type === "alert" && notif.priority === "critical").length;
  
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
  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Filter inbox items based on active tab, filter settings, etc.
  const getFilteredItems = () => {
    let filteredNotifications: Notification[] = [];
    let filteredTickets: Ticket[] = [];

    // First filter by main content type tab
    if (activeTab === "all" || activeTab === "notifications" || activeTab === "skills" || activeTab === "alerts") {
      filteredNotifications = notifications.filter(notif => {
        // Filter by read/unread status
        if (!showReadMessages && notif.read) return false;
        
        // Filter by notification type
        if (!typeFilters[notif.type]) return false;
        
        // Filter by specific tab
        if (activeTab === "skills" && notif.type !== "skill") return false;
        if (activeTab === "alerts" && notif.type !== "alert") return false;
        
        // Filter by specific filter dropdown selection
        if (activeFilter !== "all" && activeFilter !== notif.type) return false;
        
        return true;
      });
    }

    if (activeTab === "all" || activeTab === "tickets") {
      filteredTickets = tickets.filter(ticket => {
        // Filter out resolved/closed tickets if not showing them
        if (!showResolvedTickets && (ticket.status === "resolved" || ticket.status === "closed")) return false;
        
        // Filter by priority
        if (!priorityFilters[ticket.priority]) return false;
        
        // For more specific filtering we could add more conditions here
        return true;
      });
    }

    return { filteredNotifications, filteredTickets };
  };

  const { filteredNotifications, filteredTickets } = getFilteredItems();
  const totalFilteredItems = filteredNotifications.length + filteredTickets.length;
  
  // Toggle priority filter
  const togglePriorityFilter = (priority: string) => {
    setPriorityFilters(prev => ({
      ...prev,
      [priority]: !prev[priority as keyof typeof prev]
    }));
  };
  
  // Toggle notification type filter
  const toggleTypeFilter = (type: string) => {
    setTypeFilters(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment": return <CreditCard className="h-5 w-5 text-blue-500" />;
      case "system": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "ticket": return <TicketCheck className="h-5 w-5 text-purple-500" />;
      case "plan": return <Bell className="h-5 w-5 text-green-500" />;
      case "reward": return <Bell className="h-5 w-5 text-orange-500" />;
      case "skill": return <BookOpen className="h-5 w-5 text-blue" />;
      case "alert": return <AlertOctagon className="h-5 w-5 text-primary" />;
      default: return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  // Get badge color based on priority
  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-blue-100 text-blue-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="md:col-span-3 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex items-center space-x-2">
                <InboxIcon className="h-5 w-5 text-blue" />
                <CardTitle>Message Center</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7">
                      <Filter className="h-3.5 w-3.5 mr-1" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Message Types</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={typeFilters.payment}
                      onCheckedChange={() => toggleTypeFilter("payment")}
                    >
                      <CreditCard className="h-4 w-4 text-blue-500 mr-2" />
                      Payment
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={typeFilters.system}
                      onCheckedChange={() => toggleTypeFilter("system")}
                    >
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                      System
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={typeFilters.ticket}
                      onCheckedChange={() => toggleTypeFilter("ticket")}
                    >
                      <TicketCheck className="h-4 w-4 text-purple-500 mr-2" />
                      Ticket
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={typeFilters.plan}
                      onCheckedChange={() => toggleTypeFilter("plan")}
                    >
                      <Bell className="h-4 w-4 text-green-500 mr-2" />
                      Plan
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={typeFilters.skill}
                      onCheckedChange={() => toggleTypeFilter("skill")}
                    >
                      <BookOpen className="h-4 w-4 text-blue mr-2" />
                      Skill Requirements
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={typeFilters.alert}
                      onCheckedChange={() => toggleTypeFilter("alert")}
                    >
                      <AlertOctagon className="h-4 w-4 text-primary mr-2" />
                      Alerts
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Ticket Priority</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={priorityFilters.low}
                      onCheckedChange={() => togglePriorityFilter("low")}
                    >
                      <Badge className="bg-green-100 text-green-800 mr-2">Low</Badge>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={priorityFilters.medium}
                      onCheckedChange={() => togglePriorityFilter("medium")}
                    >
                      <Badge className="bg-blue-100 text-blue-800 mr-2">Medium</Badge>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={priorityFilters.high}
                      onCheckedChange={() => togglePriorityFilter("high")}
                    >
                      <Badge className="bg-orange-100 text-orange-800 mr-2">High</Badge>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={priorityFilters.critical}
                      onCheckedChange={() => togglePriorityFilter("critical")}
                    >
                      <Badge className="bg-red-100 text-red-800 mr-2">Critical</Badge>
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="flex items-center space-x-1">
                  <Switch
                    id="show-read"
                    checked={showReadMessages}
                    onCheckedChange={setShowReadMessages}
                    className="scale-75"
                  />
                  <Label htmlFor="show-read" className="text-xs cursor-pointer">
                    Show Read
                  </Label>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Switch
                    id="show-resolved"
                    checked={showResolvedTickets}
                    onCheckedChange={setShowResolvedTickets}
                    className="scale-75"
                  />
                  <Label htmlFor="show-resolved" className="text-xs cursor-pointer">
                    Show Resolved
                  </Label>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5 mb-4">
                <TabsTrigger value="all">
                  All
                  {totalItemsCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {totalFilteredItems}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  Notifications
                  {unreadNotificationsCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {unreadNotificationsCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="tickets">
                  Support Tickets
                  {openTicketsCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {openTicketsCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="skills">
                  Skills
                  {unreadSkillRequirementsCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {unreadSkillRequirementsCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="alerts">
                  Alerts
                  {unreadAlertsCount > 0 && (
                    <Badge variant={criticalAlertsCount > 0 ? "destructive" : "secondary"} className="ml-2">
                      {unreadAlertsCount}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-3">
                {filteredNotifications.length === 0 && filteredTickets.length === 0 ? (
                  <div className="text-center p-6 border rounded-lg">
                    <MailOpen className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-medium">Your inbox is empty</h3>
                    <p className="text-sm text-muted-foreground">
                      No messages or tickets match your current filters
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Alerts Section - Show first if there are any */}
                    {filteredNotifications.filter(n => n.type === "alert").length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <AlertOctagon className="h-4 w-4 mr-1 text-primary" />
                          System Alerts
                        </h3>
                        <div className="space-y-2">
                          {filteredNotifications
                            .filter(n => n.type === "alert")
                            .sort((a, b) => {
                              // Sort by priority first (critical > high > medium > low)
                              const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
                              const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 4;
                              const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 4;
                              if (aPriority !== bPriority) return aPriority - bPriority;
                              
                              // Then by date (newest first)
                              return new Date(b.date).getTime() - new Date(a.date).getTime();
                            })
                            .map((notification) => (
                              <Card key={notification.id} className={`border ${!notification.read ? "border-primary/20 bg-primary/5" : ""}`}>
                                <CardContent className="p-2 px-3">
                                  <div className="flex gap-2">
                                    <div className="flex-shrink-0 mt-0.5">
                                      <div className={`h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center`}>
                                        <AlertOctagon className="h-4 w-4 text-primary" />
                                      </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-start gap-2">
                                        <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                                        <div className="flex items-center flex-shrink-0">
                                          {notification.priority && (
                                            <Badge className={`${getPriorityBadgeColor(notification.priority)} text-xs mr-1`}>
                                              {notification.priority}
                                            </Badge>
                                          )}
                                          <p className="text-xs text-muted-foreground whitespace-nowrap">
                                            {new Date(notification.date).toLocaleDateString()}
                                          </p>
                                        </div>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                        {notification.message}
                                      </p>
                                      <div className="flex justify-end mt-1 space-x-1">
                                        {notification.action && (
                                          <Button 
                                            variant="default" 
                                            size="sm" 
                                            className="h-6 text-xs px-2"
                                          >
                                            {notification.action}
                                          </Button>
                                        )}
                                        {!notification.read && (
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-6 text-xs px-2"
                                            onClick={() => handleMarkAsRead(notification.id)}
                                          >
                                            Mark as read
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Skills Section */}
                    {filteredNotifications.filter(n => n.type === "skill").length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <BookOpen className="h-4 w-4 mr-1 text-blue" />
                          Skill Requirements
                        </h3>
                        <div className="space-y-2">
                          {filteredNotifications
                            .filter(n => n.type === "skill")
                            .map((notification) => (
                              <Card key={notification.id} className={`border ${!notification.read ? "border-blue/20 bg-blue/5" : ""}`}>
                                <CardContent className="p-2 px-3">
                                  <div className="flex gap-2">
                                    <div className="flex-shrink-0 mt-0.5">
                                      <div className="h-8 w-8 rounded-full bg-blue/10 flex items-center justify-center">
                                        <BookOpen className="h-4 w-4 text-blue" />
                                      </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-start gap-2">
                                        <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                                        <div className="flex items-center flex-shrink-0">
                                          {notification.priority && (
                                            <Badge className={`${getPriorityBadgeColor(notification.priority)} text-xs mr-1`}>
                                              {notification.priority}
                                            </Badge>
                                          )}
                                          <p className="text-xs text-muted-foreground whitespace-nowrap">
                                            {new Date(notification.date).toLocaleDateString()}
                                          </p>
                                        </div>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                        {notification.message}
                                      </p>
                                      <div className="flex justify-end mt-1 space-x-1">
                                        {notification.action && (
                                          <Button 
                                            variant="default" 
                                            size="sm" 
                                            className="h-6 text-xs px-2"
                                          >
                                            {notification.action}
                                          </Button>
                                        )}
                                        {!notification.read && (
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-6 text-xs px-2"
                                            onClick={() => handleMarkAsRead(notification.id)}
                                          >
                                            Mark as read
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Other Notifications */}
                    {filteredNotifications.filter(n => n.type !== "alert" && n.type !== "skill").length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <BellRing className="h-4 w-4 mr-1 text-blue" />
                          Notifications
                        </h3>
                        <div className="space-y-2">
                          {filteredNotifications
                            .filter(n => n.type !== "alert" && n.type !== "skill")
                            .map((notification) => (
                              <Card key={notification.id} className={`border ${!notification.read ? "border-blue/20 bg-blue/5" : ""}`}>
                                <CardContent className="p-2 px-3">
                                  <div className="flex gap-2">
                                    <div className="flex-shrink-0 mt-0.5">
                                      <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
                                        {getNotificationIcon(notification.type)}
                                      </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-start gap-2">
                                        <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                                        <div className="flex items-center flex-shrink-0">
                                          <Badge variant="outline" className="text-xs mr-1 capitalize">
                                            {notification.type}
                                          </Badge>
                                          <p className="text-xs text-muted-foreground whitespace-nowrap">
                                            {new Date(notification.date).toLocaleDateString()}
                                          </p>
                                        </div>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                        {notification.message}
                                      </p>
                                      {!notification.read && (
                                        <div className="flex justify-end mt-1">
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-6 text-xs px-2"
                                            onClick={() => handleMarkAsRead(notification.id)}
                                          >
                                            Mark as read
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Support Tickets */}
                    {filteredTickets.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <TicketCheck className="h-4 w-4 mr-1 text-blue" />
                          Support Tickets
                        </h3>
                        <div className="space-y-2">
                          {filteredTickets.map(ticket => (
                            <Card key={ticket.id} className={`border ${ticket.status === "open" || ticket.status === "in-progress" ? "border-blue/20" : ""}`}>
                              <CardContent className="p-2 px-3">
                                <div className="flex flex-col space-y-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-sm">{ticket.title}</h4>
                                    <div className="flex items-center space-x-1">
                                      <Badge className={ticket.status === "open" ? "bg-blue-100 text-blue-800 text-xs" : 
                                        ticket.status === "in-progress" ? "bg-yellow-100 text-yellow-800 text-xs" : 
                                        ticket.status === "resolved" ? "bg-green-100 text-green-800 text-xs" : 
                                        "bg-gray-100 text-gray-800 text-xs"}>
                                        {ticket.status.replace('-', ' ')}
                                      </Badge>
                                      <Badge className={
                                        ticket.priority === "low" ? "bg-green-100 text-green-800 text-xs" :
                                        ticket.priority === "medium" ? "bg-blue-100 text-blue-800 text-xs" :
                                        ticket.priority === "high" ? "bg-orange-100 text-orange-800 text-xs" :
                                        "bg-red-100 text-red-800 text-xs"
                                      }>
                                        {ticket.priority}
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-1">{ticket.description}</p>
                                  <div className="flex justify-between items-center">
                                    <div className="flex gap-2 text-xs text-muted-foreground">
                                      <span>ID: {ticket.id.substring(0, 8)}</span>
                                      <span className="hidden sm:inline">Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex gap-1">
                                      <Button size="sm" variant="outline" className="h-6 text-xs px-2">View</Button>
                                      {(ticket.status === "open" || ticket.status === "in-progress") && (
                                        <Button size="sm" className="h-6 text-xs px-2">Update</Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationsList 
                  notifications={filteredNotifications.filter(notif => notif.type !== "alert" && notif.type !== "skill")}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                  onClearAll={handleClearNotifications}
                />
              </TabsContent>
              
              <TabsContent value="tickets">
                <TicketList tickets={filteredTickets} />
              </TabsContent>
              
              <TabsContent value="skills">
                <NotificationsList 
                  notifications={filteredNotifications.filter(notif => notif.type === "skill")}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                  onClearAll={handleClearNotifications}
                />
              </TabsContent>
              
              <TabsContent value="alerts">
                <NotificationsList 
                  notifications={filteredNotifications.filter(notif => notif.type === "alert")}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                  onClearAll={handleClearNotifications}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <div className="hidden md:block">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-sm h-8" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              New Message
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm h-8" size="sm">
              <TicketCheck className="h-4 w-4 mr-2" />
              Create Support Ticket 
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm h-8" size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm h-8" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notification Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
