
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { PlanGrid } from './PlanGrid';
import { PlanCard } from './PlanCard';
import { EnhancedMarketplaceFilters } from './EnhancedMarketplaceFilters';
import { planService, PlanFilter } from '../../services/planService';
import { PlanData } from '../../lib/mockPlansData';
import { ArrowRight, BarChart3, Loader2, SplitSquareVertical } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { toast } from 'sonner@2.0.3';

interface EnhancedPlansProps {
  defaultTab?: 'marketplace' | 'myplans';
}

export function EnhancedPlans({ defaultTab = 'marketplace' }: EnhancedPlansProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [totalPlans, setTotalPlans] = useState<number>(0);
  const [filters, setFilters] = useState<PlanFilter>({});
  
  // For pagination if implemented
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(9);
  
  // Get display name for phases
  const getPhaseDisplayName = (phase?: 'operate' | 'secure' | 'streamline' | 'accelerate') => {
    if (!phase) return '';
    return phase.charAt(0).toUpperCase() + phase.slice(1);
  };
  
  // Load plans based on current filters
  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const response = await planService.getPlans(filters, page, pageSize);
        setPlans(response.plans);
        setTotalPlans(response.total);
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast.error('Failed to load plans. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPlans();
  }, [filters, page, pageSize]);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: PlanFilter) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };
  
  // Navigate to plan detail page
  const handlePlanClick = (planId: string) => {
    // Set the button with proper data attribute
    const button = document.createElement('button');
    button.setAttribute('data-page-id', 'plan_detail');
    button.setAttribute('data-subpath', planId);
    document.body.appendChild(button);
    button.click();
    document.body.removeChild(button);
  };
  
  // Handle compare plans button click
  const handleComparePlansClick = () => {
    // Set the button with proper data attribute
    const button = document.createElement('button');
    button.setAttribute('data-page-id', 'plan_comparison');
    document.body.appendChild(button);
    button.click();
    document.body.removeChild(button);
  };
  
  // Render loading skeletons
  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6).fill(0).map((_, i) => (
        <Card key={i} className="rounded-[16px] rounded-tr-[0px]">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-1/3" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
  
  return (
    <div className="space-y-8">
      <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="myplans">My Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="marketplace" className="space-y-6">
          {/* Marketplace Hero */}
          <div className="bg-hero-bg text-white p-8 rounded-[16px] rounded-tr-[0px] mb-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extralight mb-2">IT Health Marketplace</h2>
              <p className="text-white/80 text-xs mb-6">
                Browse our extensive catalog of IT plans designed to help your business 
                operate, secure, streamline, and accelerate your technology infrastructure.
              </p>
              <Button className="bg-white text-blue hover:bg-white/90 ithealth-button">
                Schedule Consultation
              </Button>
            </div>
          </div>
          
          {/* Marketplace Filters with Compare Button */}
          <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
            <EnhancedMarketplaceFilters 
              onFilterChange={handleFilterChange}
              totalPlans={totalPlans}
              filteredCount={plans.length}
              isLoading={isLoading}
            />
            
            <Button 
              onClick={handleComparePlansClick}
              className="flex items-center gap-2 ithealth-button md:ml-auto"
              variant="outline"
            >
              <SplitSquareVertical className="h-4 w-4" />
              Compare Plans
            </Button>
          </div>
          
          {/* Plans Display */}
          <div className="space-y-10">
            {/* Main plans grid with loading state */}
            <div>
              {isLoading ? (
                renderSkeletons()
              ) : plans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plans.map(plan => (
                    <PlanCard
                      key={plan.id}
                      {...plan}
                      onPrimaryAction={() => handlePlanClick(plan.id)}
                      onSecondaryAction={() => handlePlanClick(plan.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-[16px] rounded-tr-[0px]">
                  <div className="mb-4 text-muted-foreground">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="48" 
                      height="48" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="mx-auto"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                      <path d="M8 11h6" />
                      <path d="M11 8v6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-extralight mb-2">No Plans Found</h3>
                  <p className="text-xs text-muted-foreground mb-6">
                    We couldn't find any plans matching your current filters. 
                    Try adjusting your search criteria.
                  </p>
                  <Button onClick={() => handleFilterChange({})} className="ithealth-button">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
            
            {/* Pagination could be added here */}
          </div>
        </TabsContent>
        
        <TabsContent value="myplans" className="space-y-8">
          <Card className="ithealth-card">
            <CardHeader>
              <CardTitle className="text-left-override">My Active Plans</CardTitle>
              <CardDescription>View and manage your current IThealth plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Active Plan Example */}
                <div className="border ithealth-card p-6">
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
                      <Button className="bg-blue hover:bg-blue/90 ithealth-button">
                        Manage Plan
                      </Button>
                      <Button variant="outline" className="ithealth-button">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Empty State for Demonstration */}
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You don't have any other active plans</p>
                  <Button 
                    className="bg-blue hover:bg-blue/90 ithealth-button"
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
            {isLoading ? (
              renderSkeletons()
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.filter(plan => plan.recommended).slice(0, 2).map(plan => (
                  <PlanCard
                    key={plan.id}
                    {...plan}
                    onPrimaryAction={() => handlePlanClick(plan.id)}
                    onSecondaryAction={() => handlePlanClick(plan.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
