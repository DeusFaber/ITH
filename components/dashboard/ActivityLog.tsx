
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, TicketCheck, CreditCard, Gift, Package, Clock } from "lucide-react";
import { ActivityLog as ActivityLogType } from "../../lib/types";

interface ActivityLogProps {
  logs?: ActivityLogType[];
}

export function ActivityLog({ logs = [] }: ActivityLogProps) {
  // Function to get icon based on activity type
  const getActivityIcon = (action: string) => {
    switch (action) {
      case "Support Ticket":
        return <TicketCheck className="h-4 w-4" />;
      case "Payment":
        return <CreditCard className="h-4 w-4" />;
      case "Credit Earned":
      case "Reward Earned":
      case "Redemption":
        return <Gift className="h-4 w-4" />;
      case "Plan Update":
        return <Package className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (logs.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions and updates on your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-center">
          <Clock className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium mb-2">No recent activity</h3>
          <p className="text-sm text-muted-foreground">
            Your recent account activity will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions and updates on your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {logs.map((activity) => (
          <div key={activity.id} className="flex gap-3 border-l-2 border-border pl-4 py-2">
            <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-muted">
              {getActivityIcon(activity.action)}
            </div>
            <div className="flex-1">
              <p className="font-medium">{activity.action}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{formatDate(activity.date)}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full justify-between">
          View all activity
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
