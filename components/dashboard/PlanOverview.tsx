
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { CheckCircle, PlusCircle } from "lucide-react";
import { Plan } from "../../lib/types";

interface PlanOverviewProps {
  plans?: Plan[];
  expanded?: boolean;
}

export function PlanOverview({ plans = [], expanded = false }: PlanOverviewProps) {
  // Calculate days until renewal
  const calculateDaysUntilRenewal = (renewalDate: string) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handle case when plans is undefined or empty
  if (!plans || plans.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>My Plans</CardTitle>
          <CardDescription>Overview of your active IT Health subscriptions</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-center">
          <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium mb-2">No active plans</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You don't have any active IT Health plans. Subscribe to get started.
          </p>
          <Button>Explore Plans</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>My Plans</CardTitle>
        <CardDescription>Overview of your active IT Health subscriptions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {plans.slice(0, expanded ? undefined : 2).map((plan) => {
          const daysUntil = calculateDaysUntilRenewal(plan.renewalDate);
          const progress = 100 - (daysUntil / 30) * 100;
          
          return (
            <div key={plan.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <Badge className="bg-primary/10 text-primary">
                  {plan.status === "active" ? "Active" : plan.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Billing cycle: {plan.billingCycle === "monthly" ? "Monthly" : "Annually"}</span>
                  <span>R{plan.price}/{plan.billingCycle === "monthly" ? "mo" : "yr"}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Next renewal in {daysUntil} days</span>
                    <span>{plan.renewalDate}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {plan.features && plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Manage Plan</Button>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
            </div>
          );
        })}
        
        {plans.length > 2 && !expanded && (
          <div className="text-center">
            <Button variant="link">View all {plans.length} plans</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
