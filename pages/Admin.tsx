
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CustomerTable, Customer } from "../components/admin/CustomerTable";
import { DashboardStats } from "../components/admin/DashboardStats";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar } from "../components/ui/avatar";
import { User } from "lucide-react";
import { Button } from "../components/ui/button";

export function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  
  // Mock customers data
  const customers: Customer[] = [
    {
      id: "cust-001",
      name: "Jane Cooper",
      email: "jane@example.com",
      company: "Acme Inc.",
      status: "active",
      plan: "Office Health",
      joined: "2024-10-12",
      revenue: 2499
    },
    {
      id: "cust-002",
      name: "Alex Mitchell",
      email: "alex@techfirm.com",
      company: "TechFirm Solutions",
      status: "active",
      plan: "User Health + Office Health",
      joined: "2025-01-15",
      revenue: 3998
    },
    {
      id: "cust-003",
      name: "Sarah Johnson",
      email: "sarah@innovate.co",
      company: "Innovate Co",
      status: "inactive",
      plan: "User Health",
      joined: "2024-08-22",
      revenue: 1249
    },
    {
      id: "cust-004",
      name: "Michael Brown",
      email: "michael@nextstep.org",
      company: "NextStep Foundation",
      status: "active",
      plan: "Security Health",
      joined: "2025-03-10",
      revenue: 4499
    },
    {
      id: "cust-005",
      name: "Emily Davis",
      email: "emily@startuphaus.com",
      company: "StartupHaus",
      status: "pending",
      plan: "Office Health",
      joined: "2025-05-01",
      revenue: 999
    },
    {
      id: "cust-006",
      name: "David Wilson",
      email: "david@globalcorp.com",
      company: "Global Corp",
      status: "active",
      plan: "Enterprise Plan",
      joined: "2024-12-05",
      revenue: 8999
    },
    {
      id: "cust-007",
      name: "Lisa Taylor",
      email: "lisa@petshop.net",
      company: "Happy Paws Pet Shop",
      status: "active",
      plan: "User Health",
      joined: "2025-02-18",
      revenue: 1749
    }
  ];
  
  const handleViewCustomer = (id: string) => {
    setSelectedCustomerId(id);
    setCustomerDialogOpen(true);
  };
  
  const handleEditCustomer = (id: string) => {
    // In a real app, this would navigate to an edit form
    console.log(`Edit customer ${id}`);
  };
  
  // Get selected customer details
  const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId);
  
  return (
    <div className="space-y-6">
      <div>
        <h1>Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage customers, view analytics, and handle system operations
        </p>
      </div>
      
      <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="system">System Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <DashboardStats />
        </TabsContent>
        
        <TabsContent value="customers" className="mt-6">
          <CustomerTable 
            customers={customers}
            onViewCustomer={handleViewCustomer}
            onEditCustomer={handleEditCustomer}
          />
        </TabsContent>
        
        <TabsContent value="system" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current status of IT Health services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <p className="font-medium">User Health Services</p>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <p className="font-medium">Office Health Services</p>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <p className="font-medium">Billing System</p>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <p className="font-medium">API Services</p>
                  <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <p className="font-medium">Support Portal</p>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Maintenance</CardTitle>
                <CardDescription>Upcoming system maintenance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Database Optimization</h3>
                    <Badge>Scheduled</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    May 25, 2025 • 2:00 AM - 4:00 AM UTC
                  </p>
                  <p className="text-sm">
                    Routine database maintenance to improve system performance.
                    Brief intermittent service disruptions may occur.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Security Updates</h3>
                    <Badge>Scheduled</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    June 8, 2025 • 1:00 AM - 3:00 AM UTC
                  </p>
                  <p className="text-sm">
                    Critical security patches and updates.
                    System will be in read-only mode during this period.
                  </p>
                </div>
                
                <Button className="w-full">Schedule New Maintenance</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Customer Detail Dialog */}
      {selectedCustomer && (
        <Dialog open={customerDialogOpen} onOpenChange={setCustomerDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
              <DialogDescription>
                Complete information about this customer
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <User className="h-8 w-8" />
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{selectedCustomer.name}</h2>
                  <p className="text-muted-foreground">{selectedCustomer.email}</p>
                </div>
                <Badge className="ml-auto">
                  {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                </Badge>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Company Name</p>
                      <p className="font-medium">{selectedCustomer.company}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Industry</p>
                      <p className="font-medium">Technology</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Size</p>
                      <p className="font-medium">50-100 employees</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">123 Business Ave, Suite 100<br />San Francisco, CA 94107</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Plan</p>
                      <p className="font-medium">{selectedCustomer.plan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Billing Cycle</p>
                      <p className="font-medium">Monthly</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Billing Date</p>
                      <p className="font-medium">June 1, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lifetime Value</p>
                      <p className="font-medium">${selectedCustomer.revenue.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-2 border-primary pl-4 py-2">
                        <p className="font-medium">Support Ticket Submitted</p>
                        <p className="text-sm text-muted-foreground">
                          "Network connectivity issues in office" - May 14, 2025
                        </p>
                      </div>
                      <div className="border-l-2 border-border pl-4 py-2">
                        <p className="font-medium">Plan Upgrade</p>
                        <p className="text-sm text-muted-foreground">
                          Upgraded from User Health to User Health + Office Health - May 1, 2025
                        </p>
                      </div>
                      <div className="border-l-2 border-border pl-4 py-2">
                        <p className="font-medium">Payment Processed</p>
                        <p className="text-sm text-muted-foreground">
                          Monthly subscription payment of $149.98 - May 1, 2025
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setCustomerDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setCustomerDialogOpen(false);
                  handleEditCustomer(selectedCustomer.id);
                }}>
                  Edit Customer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
