
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ITPlanCard } from '../marketplace/ITPlanCard';
import { EnhancedMarketplaceFilters } from '../marketplace/EnhancedMarketplaceFilters';
import { SplitSquareVertical, ArrowRight, ChevronRight } from 'lucide-react';
import Vector from "../../imports/Vector";
import Vector29102 from "../../imports/Vector-29-102";
import Vector29159 from "../../imports/Vector-29-159";
import Vector29178 from "../../imports/Vector-29-178";

// Get plans data from the marketplace
const PLANS = {
  operate: [
    {
      id: "user-health-plan",
      name: "User Health Plan",
      price: 299,
      interval: "monthly" as const,
      description: "End-user device support, proactive AI-assisted helpdesk, onboarding",
      features: [
        { text: "End-user device support", included: true },
        { text: "Proactive AI-assisted helpdesk", included: true },
        { text: "User onboarding & offboarding", included: true },
        { text: "Keeps staff productive without ticket chaos", included: true, highlighted: true },
      ],
      phase: "operate" as const,
    },
    {
      id: "office-health-plan",
      name: "Office Health Plan",
      price: 499,
      interval: "monthly" as const,
      description: "Network infrastructure, printers, shared devices, firmware patching",
      features: [
        { text: "Network infrastructure monitoring", included: true },
        { text: "Printer & shared device support", included: true },
        { text: "Firmware patching & maintenance", included: true },
        { text: "Ensures your office tech works like it should", included: true, highlighted: true },
      ],
      phase: "operate" as const,
    },
    {
      id: "communication-plan",
      name: "Communication Plan",
      price: 399,
      interval: "monthly" as const,
      description: "Microsoft Teams PSTN calling, 5G routers, mobile-first communications",
      features: [
        { text: "Microsoft Teams PSTN calling", included: true },
        { text: "5G failover routers", included: true },
        { text: "Mobile-first communications", included: true },
        { text: "Connects your team and clients with minimal fuss", included: true, highlighted: true },
      ],
      phase: "operate" as const,
    }
  ],
  secure: [
    {
      id: "itsafe-user-plan",
      name: "ITsafe User Plan",
      price: 199,
      interval: "monthly" as const,
      description: "Endpoint protection, compliance patching, device control",
      features: [
        { text: "Endpoint protection for all devices", included: true },
        { text: "Compliance patching & updates", included: true },
        { text: "Device control & management", included: true },
        { text: "Personal cybersecurity for every employee", included: true, highlighted: true },
      ],
      phase: "secure" as const,
    },
    {
      id: "itsafe-server-plan",
      name: "ITsafe Server Plan",
      price: 599,
      interval: "monthly" as const,
      description: "Server hardening, firewall management, access control",
      features: [
        { text: "Server hardening & protection", included: true },
        { text: "Firewall management", included: true },
        { text: "Access control & user permissions", included: true },
        { text: "Locks down core business systems and prevents breaches", included: true, highlighted: true },
      ],
      phase: "secure" as const,
    }
  ],
  streamline: [
    {
      id: "mail-plan",
      name: "Mail Plan",
      price: 129,
      interval: "monthly" as const,
      description: "Spam filtering, malware protection, journaling, Microsoft 365",
      features: [
        { text: "Advanced spam filtering", included: true },
        { text: "Email malware protection", included: true },
        { text: "Email journaling & archiving", included: true },
        { text: "Microsoft 365 email integration", included: true },
        { text: "Secure, compliant, fast business email", included: true, highlighted: true },
      ],
      phase: "streamline" as const,
    },
    {
      id: "business-basic-plan",
      name: "Business Basic Plan",
      price: 199,
      interval: "monthly" as const,
      description: "Standard Microsoft 365 apps, cloud file storage",
      features: [
        { text: "Microsoft 365 apps (standard)", included: true },
        { text: "Cloud file storage & sharing", included: true },
        { text: "Basic collaboration tools", included: true },
        { text: "The essentials for modern digital work", included: true, highlighted: true },
      ],
      phase: "streamline" as const,
    },
    {
      id: "business-standard-plan",
      name: "Business Standard Plan",
      price: 329,
      interval: "monthly" as const,
      description: "Full Microsoft 365 suite + Teams + device sync",
      features: [
        { text: "Complete Microsoft 365 suite", included: true },
        { text: "Teams with advanced features", included: true },
        { text: "Multi-device synchronization", included: true },
        { text: "Ideal for growing businesses with hybrid teams", included: true, highlighted: true },
      ],
      phase: "streamline" as const,
    },
    {
      id: "sharepoint-plan",
      name: "SharePoint Plan",
      price: 449,
      interval: "monthly" as const,
      description: "SharePoint intranet, document management, file governance",
      features: [
        { text: "SharePoint intranet setup", included: true },
        { text: "Document management system", included: true },
        { text: "File governance & permissions", included: true },
        { text: "Structure and automate your files and knowledge", included: true, highlighted: true },
      ],
      phase: "streamline" as const,
    }
  ],
  accelerate: [
    {
      id: "reporting-plan",
      name: "Reporting Plan",
      price: 599,
      interval: "monthly" as const,
      description: "Power BI dashboards, real-time metrics, ROI insights",
      features: [
        { text: "Power BI dashboard setup", included: true },
        { text: "Real-time business metrics", included: true },
        { text: "ROI tracking & insights", included: true },
        { text: "Measure what matters and track IT impact", included: true, highlighted: true },
      ],
      phase: "accelerate" as const,
    },
    {
      id: "workflow-optimisation-plan",
      name: "Workflow Optimisation Plan",
      price: 799,
      interval: "monthly" as const,
      description: "Power Automate + business process mapping",
      features: [
        { text: "Power Automate workflow setup", included: true },
        { text: "Business process mapping", included: true },
        { text: "Custom automation development", included: true },
        { text: "Remove bottlenecks and reduce manual work", included: true, highlighted: true },
      ],
      phase: "accelerate" as const,
    },
    {
      id: "digital-customer-plan",
      name: "Digital Customer Plan",
      price: 899,
      interval: "monthly" as const,
      description: "Customer portal setup, email journeys, form workflows",
      features: [
        { text: "Customer portal implementation", included: true },
        { text: "Automated email journey setup", included: true },
        { text: "Interactive form workflows", included: true },
        { text: "Enhance how you acquire, serve, and retain clients", included: true, highlighted: true },
      ],
      phase: "accelerate" as const,
    },
    {
      id: "ai-connect-plan",
      name: "AI Connect Plan",
      price: 1299,
      interval: "monthly" as const,
      description: "AI automation, chat agents, internal data copilots",
      features: [
        { text: "AI automation implementation", included: true },
        { text: "Customer chat agent setup", included: true },
        { text: "Internal data copilots & assistants", included: true },
        { text: "Intelligent IT that works for you 24/7", included: true, highlighted: true },
      ],
      phase: "accelerate" as const,
    }
  ]
};

// Calculate total number of plans
const TOTAL_PLANS = 
  PLANS.operate.length + 
  PLANS.secure.length + 
  PLANS.streamline.length + 
  PLANS.accelerate.length;

// Phase descriptions for UI
const PHASE_DESCRIPTIONS = {
  operate: "Foundation services that keep your business running smoothly",
  secure: "Protect your business, people, and data from risk",
  streamline: "Drive efficiency, reduce waste, and automate routine work",
  accelerate: "Unlock digital transformation, insights, and innovation"
};

interface MarketplacePublicPlansProps {
  className?: string;
  onPlanSelect?: (planId: string) => void;
}

export function MarketplacePublicPlans({ className, onPlanSelect }: MarketplacePublicPlansProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filters, setFilters] = useState<{
    phase?: 'operate' | 'secure' | 'streamline' | 'accelerate';
    search?: string;
  }>({});
  
  // Handle plan selection
  const handlePlanSelect = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
    if (onPlanSelect) {
      onPlanSelect(planId);
    } else {
      // Default behavior if no callback is provided
      window.history.pushState({}, '', `/plans/${planId}`);
    }
  };
  
  // Get filtered plans based on current filters
  const getFilteredPlans = () => {
    let filteredPlans = [];
    
    // If we're on a specific phase tab, only show those plans
    if (activeTab === 'operate') {
      filteredPlans = [...PLANS.operate];
    } else if (activeTab === 'secure') {
      filteredPlans = [...PLANS.secure];
    } else if (activeTab === 'streamline') {
      filteredPlans = [...PLANS.streamline];
    } else if (activeTab === 'accelerate') {
      filteredPlans = [...PLANS.accelerate];
    } else {
      // On the "all" tab, combine all plans
      filteredPlans = [
        ...PLANS.operate,
        ...PLANS.secure,
        ...PLANS.streamline,
        ...PLANS.accelerate
      ];
    }
    
    // Apply phase filter if set
    if (filters.phase) {
      filteredPlans = filteredPlans.filter(plan => plan.phase === filters.phase);
    }
    
    // Apply search filter if set
    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase().trim();
      filteredPlans = filteredPlans.filter(plan => 
        plan.name.toLowerCase().includes(searchTerm) || 
        plan.description.toLowerCase().includes(searchTerm) ||
        plan.features.some(feature => feature.text.toLowerCase().includes(searchTerm))
      );
    }
    
    return filteredPlans;
  };
  
  // Calculate counts for each phase
  const operateCount = filters.search ? getFilteredPlans().filter(p => p.phase === 'operate').length : PLANS.operate.length;
  const secureCount = filters.search ? getFilteredPlans().filter(p => p.phase === 'secure').length : PLANS.secure.length;
  const streamlineCount = filters.search ? getFilteredPlans().filter(p => p.phase === 'streamline').length : PLANS.streamline.length;
  const accelerateCount = filters.search ? getFilteredPlans().filter(p => p.phase === 'accelerate').length : PLANS.accelerate.length;
  const allCount = filters.search ? getFilteredPlans().length : TOTAL_PLANS;
  
  // Handle filter changes from the filter component
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  // Handle comparison
  const handleCompareClick = () => {
    window.history.pushState({}, '', '/plans/compare');
  };

  return (
    <div className={`space-y-8 public-container ${className}`} id="marketplace-plans">
      <div className="ithealth-section-header">
        <h2 className="text-3xl font-extralight text-navy mb-4">Explore All IT Health Plans</h2>
        <p className="text-muted-foreground mb-4 max-w-3xl">
          Browse our comprehensive range of IT plans designed specifically for South African professional firms, from foundational support to advanced solutions.
        </p>
      </div>
      
      {/* Filter & Compare Button */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <EnhancedMarketplaceFilters 
          onFilterChange={handleFilterChange}
          totalPlans={TOTAL_PLANS}
          filteredCount={getFilteredPlans().length}
          isLoading={false}
        />
        
        <Button 
          onClick={handleCompareClick}
          className="flex items-center gap-2 rounded-[16px] rounded-tr-[0px] md:ml-auto"
          variant="outline"
        >
          <SplitSquareVertical className="h-4 w-4" />
          Compare Plans
        </Button>
      </div>
      
      {/* Phase Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Plans ({allCount})</TabsTrigger>
          <TabsTrigger value="operate">Operate ({operateCount})</TabsTrigger>
          <TabsTrigger value="secure">Secure ({secureCount})</TabsTrigger>
          <TabsTrigger value="streamline">Streamline ({streamlineCount})</TabsTrigger>
          <TabsTrigger value="accelerate">Accelerate ({accelerateCount})</TabsTrigger>
        </TabsList>
        
        {/* All Plans Tab */}
        <TabsContent value="all" className="space-y-8">
          {/* Operate Phase */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-blue rounded-full flex items-center justify-center">
                <div className="h-5 w-5 flex items-center justify-center">
                  <Vector />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-extralight text-navy">Operate Phase</h3>
                <p className="text-xs text-muted-foreground">{PHASE_DESCRIPTIONS.operate}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredPlans().filter(plan => plan.phase === 'operate').map(plan => (
                <ITPlanCard
                  key={plan.id}
                  {...plan}
                  onPrimaryAction={() => handlePlanSelect(plan.id)}
                  onSecondaryAction={() => handlePlanSelect(plan.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Secure Phase */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-navy rounded-full flex items-center justify-center">
                <div className="h-5 w-5 flex items-center justify-center">
                  <Vector29102 />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-extralight text-navy">Secure Phase</h3>
                <p className="text-xs text-muted-foreground">{PHASE_DESCRIPTIONS.secure}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredPlans().filter(plan => plan.phase === 'secure').map(plan => (
                <ITPlanCard
                  key={plan.id}
                  {...plan}
                  onPrimaryAction={() => handlePlanSelect(plan.id)}
                  onSecondaryAction={() => handlePlanSelect(plan.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Streamline Phase */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <div className="h-5 w-5 flex items-center justify-center">
                  <Vector29178 />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-extralight text-navy">Streamline Phase</h3>
                <p className="text-xs text-muted-foreground">{PHASE_DESCRIPTIONS.streamline}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredPlans().filter(plan => plan.phase === 'streamline').map(plan => (
                <ITPlanCard
                  key={plan.id}
                  {...plan}
                  onPrimaryAction={() => handlePlanSelect(plan.id)}
                  onSecondaryAction={() => handlePlanSelect(plan.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Accelerate Phase */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-gold rounded-full flex items-center justify-center">
                <div className="h-5 w-5 flex items-center justify-center">
                  <Vector29159 />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-extralight text-navy">Accelerate Phase</h3>
                <p className="text-xs text-muted-foreground">{PHASE_DESCRIPTIONS.accelerate}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredPlans().filter(plan => plan.phase === 'accelerate').map(plan => (
                <ITPlanCard
                  key={plan.id}
                  {...plan}
                  onPrimaryAction={() => handlePlanSelect(plan.id)}
                  onSecondaryAction={() => handlePlanSelect(plan.id)}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Operate Phase Tab */}
        <TabsContent value="operate" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-8 bg-blue rounded-full flex items-center justify-center">
              <div className="h-5 w-5 flex items-center justify-center">
                <Vector />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-extralight text-navy">Operate Phase</h3>
              <p className="text-xs text-muted-foreground">{PHASE_DESCRIPTIONS.operate}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredPlans().filter(plan => plan.phase === 'operate').length > 0 ? (
              getFilteredPlans().filter(plan => plan.phase === 'operate').map(plan => (
                <ITPlanCard
                  key={plan.id}
                  {...plan}
                  onPrimaryAction={() => handlePlanSelect(plan.id)}
                  onSecondaryAction={() => handlePlanSelect(plan.id)}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-muted/30 rounded-[16px] rounded-tr-[0px]">
                <h3 className="text-xl font-extralight mb-2">No Plans Found</h3>
                <p className="text-xs text-muted-foreground mb-6">
                  We couldn't find any plans matching your current filters.
                </p>
                <Button onClick={() => setFilters({})}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Secure Phase Tab */}
        <TabsContent value="secure" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-8 bg-navy rounded-full flex items-center justify-center">
              <div className="h-5 w-5 flex items-center justify-center">
                <Vector29102 />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-extralight text-navy">Secure Phase</h3>
              <p className="text-xs text-muted-foreground">{PHASE_DESCRIPTIONS.secure}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredPlans().filter(plan => plan.phase === 'secure').length > 0 ? (
              getFilteredPlans().filter(plan => plan.phase === 'secure').map(plan => (
                <ITPlanCard
                  key={plan.id}
                  {...plan}
                  onPrimaryAction={() => handlePlanSelect(plan.id)}
                  onSecondaryAction={() => handlePlanSelect(plan.id)}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-muted/30 rounded-[16px] rounded-tr-[0px]">
                <h3 className="text-xl font-extralight mb-2">No Plans Found</h3>
                <p className="text-xs text-muted-foreground mb-6">
                  We couldn't find any plans matching your current filters.
                </p>
                <Button onClick={() => setFilters({})}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Streamline Phase Tab */}
        <TabsContent value="streamline" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <div className="h-5 w-5 flex items-center justify-center">
                <Vector29178 />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-extralight text-navy">Streamline Phase</h3>
              <p className="text-xs text-muted-foreground">{PHASE_DESCRIPTIONS.streamline}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredPlans().filter(plan => plan.phase === 'streamline').length > 0 ? (
              getFilteredPlans().filter(plan => plan.phase === 'streamline').map(plan => (
                <ITPlanCard
                  key={plan.id}
                  {...plan}
                  onPrimaryAction={() => handlePlanSelect(plan.id)}
                  onSecondaryAction={() => handlePlanSelect(plan.id)}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-muted/30 rounded-[16px] rounded-tr-[0px]">
                <h3 className="text-xl font-extralight mb-2">No Plans Found</h3>
                <p className="text-xs text-muted-foreground mb-6">
                  We couldn't find any plans matching your current filters.
                </p>
                <Button onClick={() => setFilters({})}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Accelerate Phase Tab */}
        <TabsContent value="accelerate" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-8 bg-gold rounded-full flex items-center justify-center">
              <div className="h-5 w-5 flex items-center justify-center">
                <Vector29159 />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-extralight text-navy">Accelerate Phase</h3>
              <p className="text-xs text-muted-foreground">{PHASE_DESCRIPTIONS.accelerate}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredPlans().filter(plan => plan.phase === 'accelerate').length > 0 ? (
              getFilteredPlans().filter(plan => plan.phase === 'accelerate').map(plan => (
                <ITPlanCard
                  key={plan.id}
                  {...plan}
                  onPrimaryAction={() => handlePlanSelect(plan.id)}
                  onSecondaryAction={() => handlePlanSelect(plan.id)}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-muted/30 rounded-[16px] rounded-tr-[0px]">
                <h3 className="text-xl font-extralight mb-2">No Plans Found</h3>
                <p className="text-xs text-muted-foreground mb-6">
                  We couldn't find any plans matching your current filters.
                </p>
                <Button onClick={() => setFilters({})}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          className="bg-blue hover:bg-blue/90 text-white rounded-[16px] rounded-tr-[0px]"
          onClick={() => window.history.pushState({}, '', '/get-started')}
        >
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          className="rounded-[16px] rounded-tr-[0px]"
          onClick={() => window.history.pushState({}, '', '/contact')}
        >
          Need a Custom Plan? Contact Us <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
