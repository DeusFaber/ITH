
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { MarketplaceHero } from '../components/marketplace/MarketplaceHero';
import { MarketplaceFilters } from '../components/marketplace/MarketplaceFilters';
import { PlanGrid } from '../components/marketplace/PlanGrid';
import { basicPlans, securityPlans, acceleratePlans } from '../lib/mockPlansData';
import { ArrowRight, Filter, ShieldCheck, Rocket, Server, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface PlansProps {
  defaultTab?: 'marketplace' | 'myplans';
}

export function Plans({ defaultTab = 'marketplace' }: PlansProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const phaseColors = {
    operate: "bg-blue text-white",
    secure: "bg-navy text-white",
    streamline: "bg-primary text-white",
    accelerate: "bg-gold text-white"
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="myplans">My Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="marketplace" className="space-y-6">
          <MarketplaceHero />
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <MarketplaceFilters 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>
            
            <div className="flex-1 space-y-12">
              {/* Recommended Plans Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-light text-navy">Recommended for You</h2>
                  <Button variant="ghost" className="flex items-center gap-1 text-sm">
                    View all <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <PlanGrid 
                  plans={[basicPlans[2], securityPlans[1], acceleratePlans[1]].filter(plan => plan.recommended)}
                  columns={3}
                />
              </div>
              
              {/* Operate Phase Plans */}
              <div id="operate-plans" className="pt-6 space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className={`p-2 rounded-full ${phaseColors.operate}`}>
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-light text-navy">Operate Plans</h2>
                    <p className="text-xs text-muted-foreground">Basic IT infrastructure and management solutions</p>
                  </div>
                </div>
                
                <PlanGrid 
                  plans={basicPlans.filter(plan => plan.phase === 'operate')}
                  columns={3}
                />
              </div>
              
              {/* Secure Phase Plans */}
              <div id="secure-plans" className="pt-6 space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className={`p-2 rounded-full ${phaseColors.secure}`}>
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-light text-navy">Secure Plans</h2>
                    <p className="text-xs text-muted-foreground">Comprehensive security and protection solutions</p>
                  </div>
                </div>
                
                <PlanGrid 
                  plans={securityPlans}
                  columns={3}
                />
              </div>
              
              {/* Accelerate Phase Plans */}
              <div id="accelerate-plans" className="pt-6 space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className={`p-2 rounded-full ${phaseColors.accelerate}`}>
                    <Rocket className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-light text-navy">Accelerate Plans</h2>
                    <p className="text-xs text-muted-foreground">Digital transformation and business acceleration solutions</p>
                  </div>
                </div>
                
                <PlanGrid 
                  plans={acceleratePlans}
                  columns={3}
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="myplans" className="space-y-8">
          <Card className="rounded-[16px] rounded-tr-[0px]">
            <CardHeader>
              <CardTitle>My Active Plans</CardTitle>
              <CardDescription>View and manage your current IThealth plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Active Plan Example */}
                <div className="border rounded-[16px] rounded-tr-[0px] p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="bg-blue mb-2">Operate</Badge>
                      <h3 className="text-xl font-light text-navy">Essential IT</h3>
                      <p className="text-xs text-muted-foreground mb-4">Essential IT management for small businesses</p>
                      
                      <div className="flex items-end mb-4">
                        <span className="text-2xl font-light text-navy">R2,500</span>
                        <span className="text-sm text-muted-foreground ml-1 mb-1">/month</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <BarChart3 className="h-4 w-4" />
                        <span>Next billing date: June 19, 2025</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button className="bg-blue hover:bg-blue/90 rounded-[16px] rounded-tr-[0px]">
                        Manage Plan
                      </Button>
                      <Button variant="outline" className="rounded-[16px] rounded-tr-[0px]">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Empty State for Demonstration */}
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You don't have any other active plans</p>
                  <Button 
                    className="bg-blue hover:bg-blue/90 rounded-[16px] rounded-tr-[0px]"
                    onClick={() => setActiveTab('marketplace')}
                  >
                    Browse Plans
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Plan Recommendations Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-navy">Recommended for You</h2>
            <PlanGrid 
              plans={[basicPlans[2], securityPlans[1]].filter(plan => plan.recommended)}
              columns={2}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
