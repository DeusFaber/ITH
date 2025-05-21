
import { InvoiceList } from "../components/billing/InvoiceList";
import { mockInvoices, mockPlans } from "../lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CreditCard, Edit } from "lucide-react";

export function Billing() {
  // Calculate total monthly cost
  const totalMonthlyCost = mockPlans
    .filter(plan => plan.status === "active")
    .reduce((sum, plan) => sum + plan.price, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1>Billing & Payment</h1>
        <p className="text-muted-foreground">
          Manage your payment methods and view invoice history
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded">
              <div className="p-2 bg-muted rounded">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 06/2027</p>
              </div>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded">
              <div>
                <p className="font-medium">Billing Contact</p>
                <p className="text-sm text-muted-foreground">John Smith (john@acme.com)</p>
              </div>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded">
              <div>
                <p className="font-medium">Billing Address</p>
                <p className="text-sm text-muted-foreground">
                  123 Business Ave, Suite 100<br />
                  San Francisco, CA 94107
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" className="w-full">Update Payment Method</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Subscription Summary</CardTitle>
            <CardDescription>Your current billing information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <p className="font-medium">Next billing date</p>
                <p>June 1, 2025</p>
              </div>
              
              {mockPlans
                .filter(plan => plan.status === "active")
                .map(plan => (
                  <div key={plan.id} className="flex justify-between items-center">
                    <p>{plan.name}</p>
                    <p>R{plan.price.toFixed(2)}/mo</p>
                  </div>
                ))
              }
              
              <div className="flex justify-between items-center pt-4 border-t">
                <p className="font-medium">Total monthly cost</p>
                <p className="font-medium">R{totalMonthlyCost.toFixed(2)}/mo</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Change Plan</Button>
              <Button variant="outline" className="flex-1">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <InvoiceList invoices={mockInvoices} />
    </div>
  );
}
