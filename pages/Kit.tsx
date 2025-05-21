
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  Search,
  Laptop,
  Smartphone,
  Printer,
  HardDrive,
  Server,
  Cpu,
  MonitorSmartphone,
  Cloud,
  Plus,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  CheckCircle,
  XCircle,
  ArrowRight,
  LayoutGrid
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { mockHardware, mockSoftware, mockCloudServices } from "../lib/mockKitData";
import { mockPlans } from "../lib/mockData";
import { mockMarketplacePlans, mockPlanSetupProgress } from "../lib/mockMarketplaceData";
import { MarketplacePlanCard } from "../components/marketplace/MarketplacePlanCard";
import { MarketplaceFilters } from "../components/marketplace/MarketplaceFilters";
import { PlanDetails } from "../components/marketplace/PlanDetails";
import { PlanCheckout } from "../components/marketplace/PlanCheckout";
import { PlanComparison } from "../components/marketplace/PlanComparison";
import { PostPurchaseSetup } from "../components/marketplace/PostPurchaseSetup";
import { PlanOverview } from "../components/dashboard/PlanOverview";
import { toast } from "sonner@2.0.3";
import { 
  CheckoutFormData, 
  MarketplaceFilters as IMarketplaceFilters,
  MarketplacePlan,
  SubscriptionOptions,
} from "../lib/marketplaceTypes";

interface KitProps {
  initialTab?: string;
}

export function Kit({ initialTab = "all" }: KitProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Plans related state
  const [activeSubTab, setActiveSubTab] = useState("my-plans");
  const [marketplaceView, setMarketplaceView] = useState<
    "list" | "details" | "checkout" | "compare" | "success"
  >("list");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedPlansForComparison, setSelectedPlansForComparison] = useState<string[]>([]);
  const [filters, setFilters] = useState<IMarketplaceFilters>({
    search: "",
    categories: [],
    industries: [],
    roles: [],
    outcomes: []
  });
  
  // Helper function to filter items based on search term and filters
  const filterItems = (items: any[], itemType: string) => {
    return items.filter(item => {
      const matchesSearch = 
        searchTerm === "" || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.model?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesType = typeFilter === "all" || (itemType === typeFilter);
      
      return matchesSearch && matchesStatus && matchesType;
    });
  };
  
  // Apply filters to each type of item
  const filteredHardware = filterItems(mockHardware, "hardware");
  const filteredSoftware = filterItems(mockSoftware, "software");
  const filteredCloud = filterItems(mockCloudServices, "cloud");
  
  // Get all unique statuses from all items
  const allStatuses = [
    ...new Set([
      ...mockHardware.map(h => h.status),
      ...mockSoftware.map(s => s.status),
      ...mockCloudServices.map(c => c.status)
    ])
  ];
  
  // Calculate summary statistics
  const totalHardware = mockHardware.length;
  const activeHardware = mockHardware.filter(h => h.status === "active").length;
  
  const totalSoftware = mockSoftware.length;
  const activeSoftware = mockSoftware.filter(s => s.status === "active").length;
  
  const totalCloud = mockCloudServices.length;
  const activeCloud = mockCloudServices.filter(c => c.status === "active").length;
  
  const expiringItems = [
    ...mockSoftware.filter(s => 
      s.licenseExpiryDate && 
      new Date(s.licenseExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ),
    ...mockCloudServices.filter(c => 
      c.subscriptionEndDate && 
      new Date(c.subscriptionEndDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    )
  ];
  
  // Helper to format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Helper to check if a date is approaching (within 30 days)
  const isApproaching = (dateString: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    const daysUntil = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil >= 0 && daysUntil <= 30;
  };
  
  // Helper to check if a date is expired
  const isExpired = (dateString: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date < new Date();
  };

  // Apply filters to marketplace plans
  const filteredPlans = mockMarketplacePlans.filter(plan => {
    // Search filter
    if (filters.search && !plan.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !plan.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(plan.category)) {
      return false;
    }
    
    // Industry filter
    if (filters.industries.length > 0 && 
        !filters.industries.some(industry => plan.industries.includes(industry))) {
      return false;
    }
    
    // Role filter
    if (filters.roles.length > 0 && 
        !filters.roles.some(role => plan.roles.includes(role))) {
      return false;
    }
    
    // Outcome filter
    if (filters.outcomes.length > 0 && 
        !filters.outcomes.some(outcome => plan.businessOutcomes.includes(outcome))) {
      return false;
    }
    
    return true;
  });
  
  const handleFilterChange = (newFilters: IMarketplaceFilters) => {
    setFilters(newFilters);
  };
  
  const handleViewPlanDetails = (planId: string) => {
    setSelectedPlanId(planId);
    setMarketplaceView("details");
    window.scrollTo(0, 0);
  };
  
  const handleSubscribe = (planId: string) => {
    setSelectedPlanId(planId);
    setMarketplaceView("checkout");
    window.scrollTo(0, 0);
  };
  
  const handleRequestDemo = (planId: string) => {
    toast.success("Demo request sent! Our team will contact you shortly.");
  };
  
  const handleTalkToAdvisor = (planId: string) => {
    toast.success("An advisor will contact you within 24 hours.");
  };
  
  const handleCompareToggle = (planId: string) => {
    let newSelectedPlans = [...selectedPlansForComparison];
    
    if (newSelectedPlans.includes(planId)) {
      newSelectedPlans = newSelectedPlans.filter(id => id !== planId);
    } else {
      if (newSelectedPlans.length >= 3) {
        toast.error("You can only compare up to 3 plans at a time");
        return;
      }
      newSelectedPlans.push(planId);
    }
    
    setSelectedPlansForComparison(newSelectedPlans);
  };
  
  const handleCompare = () => {
    if (selectedPlansForComparison.length < 2) {
      toast.error("Please select at least 2 plans to compare");
      return;
    }
    
    setMarketplaceView("compare");
    window.scrollTo(0, 0);
  };
  
  const handleBackToMarketplace = () => {
    setMarketplaceView("list");
    window.scrollTo(0, 0);
  };
  
  const handleCheckoutComplete = (
    formData: CheckoutFormData, 
    subscriptionOptions: SubscriptionOptions
  ) => {
    // In a real app, this would submit to a backend
    console.log("Checkout form data:", formData);
    console.log("Subscription options:", subscriptionOptions);
    
    setMarketplaceView("success");
    window.scrollTo(0, 0);
  };
  
  const getSelectedPlan = (): MarketplacePlan | null => {
    if (!selectedPlanId) return null;
    return mockMarketplacePlans.find(plan => plan.id === selectedPlanId) || null;
  };
  
  const getPlansForComparison = (): MarketplacePlan[] => {
    return mockMarketplacePlans.filter(plan => 
      selectedPlansForComparison.includes(plan.id)
    );
  };
  
  const getSetupProgress = (planId: string) => {
    return mockPlanSetupProgress.find(progress => progress.planId === planId) || {
      planId,
      completedSteps: [],
      nextSteps: [],
      percentComplete: 0
    };
  };

  // Render marketplace content based on current view
  const renderMarketplaceContent = () => {
    const selectedPlan = getSelectedPlan();
    
    switch (marketplaceView) {
      case "list":
        return (
          <div className="space-y-6">
            <MarketplaceFilters 
              onFilterChange={handleFilterChange}
              totalPlans={mockMarketplacePlans.length}
              filteredCount={filteredPlans.length}
            />
            
            {selectedPlansForComparison.length > 0 && (
              <div className="bg-muted p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {selectedPlansForComparison.length} plans selected
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Select up to 3 plans to compare
                  </p>
                </div>
                <Button 
                  onClick={handleCompare}
                  disabled={selectedPlansForComparison.length < 2}
                >
                  Compare Plans
                </Button>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPlans.map((plan) => (
                <div key={plan.id} className="relative">
                  {selectedPlansForComparison.includes(plan.id) && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="rounded-full h-8 px-2"
                        onClick={() => handleCompareToggle(plan.id)}
                      >
                        Selected
                      </Button>
                    </div>
                  )}
                  <div 
                    className="relative group cursor-pointer"
                    onClick={() => handleViewPlanDetails(plan.id)}
                  >
                    <MarketplacePlanCard 
                      plan={plan}
                      onViewDetails={handleViewPlanDetails}
                    />
                    
                    <div className="absolute bottom-0 right-0 p-3 transition-opacity opacity-0 group-hover:opacity-100">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-background/80 backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCompareToggle(plan.id);
                        }}
                      >
                        {selectedPlansForComparison.includes(plan.id) 
                          ? "Remove from Compare" 
                          : "Add to Compare"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredPlans.length === 0 && (
              <div className="text-center p-12 border rounded-lg">
                <h3 className="font-medium text-lg">No plans match your criteria</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilters({
                      search: "",
                      categories: [],
                      industries: [],
                      roles: [],
                      outcomes: []
                    });
                  }}
                  className="mt-4"
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        );
        
      case "details":
        if (!selectedPlan) return null;
        
        return (
          <PlanDetails
            plan={selectedPlan}
            onSubscribe={handleSubscribe}
            onRequestDemo={handleRequestDemo}
            onTalkToAdvisor={handleTalkToAdvisor}
            onBack={handleBackToMarketplace}
          />
        );
        
      case "checkout":
        if (!selectedPlan) return null;
        
        return (
          <PlanCheckout
            plan={selectedPlan}
            onBack={() => {
              setMarketplaceView("details");
              window.scrollTo(0, 0);
            }}
            onComplete={handleCheckoutComplete}
          />
        );
        
      case "compare":
        const plansToCompare = getPlansForComparison();
        return (
          <PlanComparison
            plans={plansToCompare}
            onSubscribe={handleSubscribe}
            onViewDetails={handleViewPlanDetails}
            onBack={handleBackToMarketplace}
          />
        );
        
      case "success":
        if (!selectedPlan) return null;
        
        return (
          <div className="space-y-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveSubTab("my-plans");
                setMarketplaceView("list");
              }}
              className="mb-4"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Back to My Plans
            </Button>
            
            <Card className="border-green-200 bg-green-50 mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-green-800 mb-2">
                    Subscription Successful!
                  </h2>
                  <p className="text-green-700 mb-4">
                    Your subscription to the {selectedPlan.name} has been activated.
                  </p>
                  <Button 
                    onClick={() => {
                      setActiveSubTab("my-plans");
                      setMarketplaceView("list");
                    }}
                  >
                    View My Plans
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <PostPurchaseSetup
              plan={selectedPlan}
              setupProgress={getSetupProgress(selectedPlan.id)}
            />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Asset
        </Button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Laptop className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Hardware</h3>
              <p className="text-2xl font-bold">{activeHardware} / {totalHardware}</p>
              <p className="text-sm text-muted-foreground">Active devices</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Software</h3>
              <p className="text-2xl font-bold">{activeSoftware} / {totalSoftware}</p>
              <p className="text-sm text-muted-foreground">Active licenses</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Cloud className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Cloud Services</h3>
              <p className="text-2xl font-bold">{activeCloud} / {totalCloud}</p>
              <p className="text-sm text-muted-foreground">Active subscriptions</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">IT Plans</h3>
              <p className="text-2xl font-bold">{mockPlans.length}</p>
              <p className="text-sm text-muted-foreground">Active plans</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Expiring Licenses Alert */}
      {expiringItems.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-destructive">Expiring Licenses</CardTitle>
            </div>
            <CardDescription>
              The following licenses will expire in the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expiringItems.slice(0, 3).map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 rounded-md border border-border">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {item.licenseExpiryDate 
                        ? `Expires: ${formatDate(item.licenseExpiryDate)}`
                        : `Expires: ${formatDate(item.subscriptionEndDate)}`
                      }
                    </span>
                  </div>
                  <Button size="sm" variant="outline">Renew</Button>
                </div>
              ))}
              
              {expiringItems.length > 3 && (
                <Button variant="link" className="w-full gap-2">
                  See all {expiringItems.length} expiring items
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Main Content Tabs */}
      <Tabs defaultValue={initialTab} className="space-y-6">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
            <TabsTrigger value="software">Software</TabsTrigger>
            <TabsTrigger value="cloud">Cloud Services</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Search and filters - excluding plans tab */}
        <TabsContent value="all">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, model, serial number..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {allStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <MonitorSmartphone className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="cloud">Cloud Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="hardware">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, model, serial number..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {allStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="software">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, vendor, version..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {allStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="cloud">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by service, provider, tier..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {allStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="plans">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="mt-4">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="my-plans">My Plans</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-plans" className="mt-6">
              <PlanOverview plans={mockPlans} expanded={true} />
            </TabsContent>
            
            <TabsContent value="marketplace" className="mt-6">
              {renderMarketplaceContent()}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
