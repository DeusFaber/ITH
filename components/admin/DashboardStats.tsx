
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUp, ArrowDown, Users, DollarSign, TicketCheck, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, trend, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span
            className={`inline-flex items-center ${
              trend > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend > 0 ? (
              <ArrowUp className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4" />
            )}
            {Math.abs(trend)}%
          </span>
          <span className="ml-1 text-muted-foreground">from previous month</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  // Mock data for revenue chart
  const revenueData = [
    { name: "Jan", revenue: 18000 },
    { name: "Feb", revenue: 21000 },
    { name: "Mar", revenue: 19500 },
    { name: "Apr", revenue: 22500 },
    { name: "May", revenue: 28000 },
    { name: "Jun", revenue: 25000 },
    { name: "Jul", revenue: 30000 },
  ];
  
  // Mock data for customers by plan
  const planData = [
    { name: "User Health", value: 42 },
    { name: "Office Health", value: 28 },
    { name: "Security Health", value: 15 },
    { name: "Data Health", value: 10 },
    { name: "Cloud Health", value: 5 },
  ];
  
  // Calculate total for progress bars
  const planTotal = planData.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Customers"
          value="187"
          description="Active subscribers"
          trend={12}
          icon={<Users className="h-6 w-6 text-primary" />}
        />
        <StatCard
          title="Monthly Revenue"
          value="$28,459"
          description="May 2025"
          trend={8}
          icon={<DollarSign className="h-6 w-6 text-primary" />}
        />
        <StatCard
          title="Open Tickets"
          value="32"
          description="5 critical priority"
          trend={-3}
          icon={<TicketCheck className="h-6 w-6 text-primary" />}
        />
        <StatCard
          title="Conversion Rate"
          value="24.8%"
          description="From trial to paid"
          trend={2}
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, "Revenue"]}
                  labelFormatter={(label) => `${label} 2025`}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--primary)"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Customers by Plan</CardTitle>
            <CardDescription>Distribution across IT Health plans</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {planData.map((plan) => (
              <div key={plan.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{plan.name}</span>
                  <span className="font-medium">{plan.value} customers ({Math.round(plan.value / planTotal * 100)}%)</span>
                </div>
                <Progress value={(plan.value / planTotal) * 100} className="h-2" />
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">View Detailed Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
