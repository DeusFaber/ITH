
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { RedemptionOptions } from "../components/rewards/RedemptionOptions";
import { 
  mockSavingsCredits, 
  mockRedemptionOptions 
} from "../lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function Rewards() {
  // Calculate total available credits
  const totalAvailableCredits = mockSavingsCredits
    .filter(credit => credit.status === "available")
    .reduce((sum, credit) => sum + credit.amount, 0);
  
  // Group credits by status
  const availableCredits = mockSavingsCredits.filter(credit => credit.status === "available");
  const pendingCredits = mockSavingsCredits.filter(credit => credit.status === "pending");
  const redeemedCredits = mockSavingsCredits.filter(credit => credit.status === "redeemed");

  return (
    <div className="space-y-6">

      
      <Tabs defaultValue="redeem" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="redeem">Redeem Rewards</TabsTrigger>
          <TabsTrigger value="history">Rewards History</TabsTrigger>
          <TabsTrigger value="faq">How It Works</TabsTrigger>
        </TabsList>
        
        <TabsContent value="redeem" className="mt-6">
          <RedemptionOptions 
            options={mockRedemptionOptions}
            availableCredits={totalAvailableCredits}
          />
        </TabsContent>
        
        <TabsContent value="history" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rewards History</CardTitle>
              <CardDescription>Track all your rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Available Rewards</h3>
                  {availableCredits.length === 0 ? (
                    <p className="text-muted-foreground">No available rewards.</p>
                  ) : (
                    <div className="space-y-3">
                      {availableCredits.map(credit => (
                        <div 
                          key={credit.id} 
                          className="flex items-center justify-between p-3 border rounded"
                        >
                          <div>
                            <p className="font-medium">{credit.source}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(credit.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">R {credit.amount}</span>
                            <Badge className="bg-green-100 text-green-800">Available</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Pending Rewards</h3>
                  {pendingCredits.length === 0 ? (
                    <p className="text-muted-foreground">No pending rewards.</p>
                  ) : (
                    <div className="space-y-3">
                      {pendingCredits.map(credit => (
                        <div 
                          key={credit.id} 
                          className="flex items-center justify-between p-3 border rounded"
                        >
                          <div>
                            <p className="font-medium">{credit.source}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(credit.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">R {credit.amount}</span>
                            <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Redeemed Rewards</h3>
                  {redeemedCredits.length === 0 ? (
                    <p className="text-muted-foreground">No redeemed rewards.</p>
                  ) : (
                    <div className="space-y-3">
                      {redeemedCredits.map(credit => (
                        <div 
                          key={credit.id} 
                          className="flex items-center justify-between p-3 border rounded"
                        >
                          <div>
                            <p className="font-medium">{credit.source}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(credit.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">R {credit.amount}</span>
                            <Badge className="bg-blue-100 text-blue-800">Redeemed</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>How Savings Credits Work</CardTitle>
              <CardDescription>Learn about our rewards program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">What are Rewards?</h3>
                <p>
                  Rewards are earned through your ongoing subscription to IT Health services. 
                  These rewards represent real Rand value that can be applied towards additional IT services 
                  and projects for your business.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">How do I earn Rewards?</h3>
                <p>
                  You automatically earn rewards through your monthly or annual subscription. 
                  The amount earned depends on your subscription tier and length of service. Special 
                  promotions and loyalty bonuses may provide additional rewards.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">How do I redeem Credits?</h3>
                <p>
                  Credits can be redeemed through this portal for various IT services like website development, 
                  CRM implementation, workflow mapping, and AI integration. Simply select the service you're 
                  interested in and follow the redemption process.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Do Credits expire?</h3>
                <p>
                  Savings Credits are valid for 12 months from the date they are earned. We recommend 
                  reviewing your credits regularly to ensure you make the most of this benefit.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">What if I don't have enough Credits?</h3>
                <p>
                  If you don't have enough credits for a particular service, you can either wait until 
                  you accumulate more or pay the difference to redeem the service immediately.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
