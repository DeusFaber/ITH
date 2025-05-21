
import React, { useState, useMemo, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Info, Filter, X, ChevronDown, ShieldCheck, Server, Clock, Rocket } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "../ui/select";
import { PlanData } from "../../lib/mockPlansData";
import { cn } from "../ui/utils";

interface EnhancedPlanComparisonProps {
  plans: PlanData[];
  availablePlans: PlanData[];
  onAddPlan: (planId: string) => void;
  onRemovePlan: (planId: string) => void;
  onSelectPlan: (planId: string) => void;
  onBack: () => void;
  maxComparisons?: number;
}

// Group feature categories
type FeatureCategory = {
  name: string;
  features: string[];
};

// Feature categories based on common patterns found in plan features
const featureCategories: FeatureCategory[] = [
  {
    name: "Core Features",
    features: [
      "IT Infrastructure Assessment",
      "Full IT Health Assessment",
      "Basic Security Suite",
      "Advanced Security Suite",
      "Premium Security Protection",
      "24/7 Email Support",
      "24/7 Phone & Email Support",
      "Endpoint Protection",
      "Email Security Filtering",
      "24/7 Security Monitoring",
      "Digital Transformation Assessment"
    ]
  },
  {
    name: "Support",
    features: [
      "24/7 Email Support",
      "24/7 Phone & Email Support",
      "Follow-up Consultation",
      "Dedicated IT Support Manager",
      "Dedicated Security Team"
    ]
  },
  {
    name: "Security",
    features: [
      "Security Vulnerability Check",
      "Basic Security Suite",
      "Advanced Security Suite",
      "Premium Security Protection",
      "Endpoint Protection",
      "Email Security Filtering",
      "Security Awareness Training",
      "Vulnerability Scanning",
      "Vulnerability Management",
      "Threat Hunting",
      "Incident Response Planning"
    ]
  },
  {
    name: "Monitoring",
    features: [
      "Monthly System Checks",
      "Weekly System Checks",
      "Daily System Monitoring",
      "24/7 Security Monitoring",
      "Quarterly Strategy Sessions",
      "Monthly Strategy Sessions"
    ]
  },
  {
    name: "Data Management",
    features: [
      "Data Backup Solutions",
      "Cloud Backup Solutions",
      "Data Loss Prevention",
      "Disaster Recovery Planning"
    ]
  },
  {
    name: "Advanced Services",
    features: [
      "Custom Software Development",
      "Business Process Automation",
      "Custom Application Development",
      "Data Analytics & Insights",
      "Enterprise Architecture Planning",
      "Full Digital Transformation",
      "Advanced Analytics & AI Solutions"
    ]
  }
];

// Function to determine which category a feature belongs to
const getFeatureCategory = (featureText: string): string => {
  for (const category of featureCategories) {
    if (category.features.some(f => featureText.includes(f))) {
      return category.name;
    }
  }
  return "Other Features";
};

// Phase icon component
const PhaseIcon = ({ phase }: { phase?: string }) => {
  switch (phase) {
    case 'operate':
      return <Server className="h-5 w-5 text-blue" />;
    case 'secure':
      return <ShieldCheck className="h-5 w-5 text-navy" />;
    case 'streamline':
      return <Clock className="h-5 w-5 text-primary" />;
    case 'accelerate':
      return <Rocket className="h-5 w-5 text-gold" />;
    default:
      return null;
  }
};

// Phase colors mapping
const phaseColors = {
  operate: {
    badge: "bg-blue text-white",
    button: "bg-blue hover:bg-blue/90 text-white",
    icon: "text-blue",
    iconBg: "bg-blue/10",
    border: "border-blue/30"
  },
  secure: {
    badge: "bg-navy text-white",
    button: "bg-navy hover:bg-navy/90 text-white",
    icon: "text-navy",
    iconBg: "bg-navy/10",
    border: "border-navy/30"
  },
  streamline: {
    badge: "bg-primary text-white",
    button: "bg-primary hover:bg-primary/90 text-white",
    icon: "text-primary",
    iconBg: "bg-primary/10",
    border: "border-primary/30"
  },
  accelerate: {
    badge: "bg-gold text-white",
    button: "bg-gold hover:bg-gold/90 text-white",
    icon: "text-gold",
    iconBg: "bg-gold/10",
    border: "border-gold/30"
  }
};

export function EnhancedPlanComparison({ 
  plans, 
  availablePlans,
  onAddPlan, 
  onRemovePlan, 
  onSelectPlan,
  onBack,
  maxComparisons = 4
}: EnhancedPlanComparisonProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [phaseFilter, setPhaseFilter] = useState<string[]>([]);
  const [featureFilter, setFeatureFilter] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);
  const [highlightDifferences, setHighlightDifferences] = useState(true);
  
  // Calculate unique features and categorize them
  const categorizedFeatures = useMemo(() => {
    // Get all unique features across all plans
    const allFeatures = plans.reduce((features, plan) => {
      plan.features.forEach(feature => {
        if (!features.some(f => f.text === feature.text)) {
          features.push(feature);
        }
      });
      return features;
    }, [] as { text: string; included: boolean; highlighted?: boolean }[]);
    
    // Group features by category
    const categorized: Record<string, { text: string; included: boolean; highlighted?: boolean }[]> = {};
    
    allFeatures.forEach(feature => {
      const category = getFeatureCategory(feature.text);
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(feature);
    });
    
    return categorized;
  }, [plans]);
  
  // Filter available plans for add plan dropdown
  const filteredAvailablePlans = useMemo(() => {
    // Filter plans that are not already in the comparison
    return availablePlans.filter(plan => !plans.some(p => p.id === plan.id));
  }, [availablePlans, plans]);
  
  // Format interval text for display
  const formatInterval = (interval: string): string => {
    switch (interval) {
      case 'monthly': return '/month';
      case 'quarterly': return '/quarter';
      case 'annually': return '/year';
      case 'once-off': return '';
      default: return '';
    }
  };
  
  // Sort plans based on price
  const sortedPlans = useMemo(() => {
    if (!priceSort) return plans;
    
    return [...plans].sort((a, b) => {
      // Handle free plans (price = 0)
      if (a.price === 0 && b.price > 0) return priceSort === "asc" ? -1 : 1;
      if (b.price === 0 && a.price > 0) return priceSort === "asc" ? 1 : -1;
      
      // Sort by price
      return priceSort === "asc" 
        ? a.price - b.price 
        : b.price - a.price;
    });
  }, [plans, priceSort]);
  
  // Check if feature is different across plans
  const isFeatureDifferent = (feature: string) => {
    if (!highlightDifferences) return false;
    
    const statuses = plans.map(plan => {
      const planFeature = plan.features.find(f => f.text === feature);
      return planFeature ? planFeature.included : false;
    });
    
    // Check if there are both true and false values in statuses
    return statuses.some(status => status) && statuses.some(status => !status);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Plans
        </Button>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters & Options
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                disabled={plans.length >= maxComparisons || filteredAvailablePlans.length === 0}
                className="flex items-center gap-2"
              >
                Add Plan
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <div className="p-4 border-b">
                <h3 className="text-sm font-medium">Add a plan to compare</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Select a plan to add to the comparison table 
                  ({plans.length}/{maxComparisons})
                </p>
              </div>
              <div className="py-2 max-h-[300px] overflow-y-auto">
                {filteredAvailablePlans.length > 0 ? (
                  filteredAvailablePlans.map(plan => (
                    <button
                      key={plan.id}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center justify-between"
                      onClick={() => onAddPlan(plan.id)}
                    >
                      <div className="flex items-center">
                        {plan.phase && <PhaseIcon phase={plan.phase} />}
                        <span className="ml-2">{plan.name}</span>
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {plan.phase && plan.phase.charAt(0).toUpperCase() + plan.phase.slice(1)}
                      </Badge>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    All available plans added
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-extralight text-navy">Compare Plans</h1>
          <p className="text-xs text-muted-foreground">
            Compare different plans side-by-side to find the best fit for your business needs.
          </p>
        </div>
        
        {/* Filter and options panel */}
        {showFilters && (
          <Card className="mb-4 rounded-[16px] rounded-tr-[0px]">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Filter by Phase</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-operate" 
                        checked={phaseFilter.includes('operate')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPhaseFilter([...phaseFilter, 'operate']);
                          } else {
                            setPhaseFilter(phaseFilter.filter(p => p !== 'operate'));
                          }
                        }}
                      />
                      <Label htmlFor="filter-operate" className="text-xs flex items-center">
                        <Server className="h-3 w-3 text-blue mr-2" />
                        Operate
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-secure" 
                        checked={phaseFilter.includes('secure')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPhaseFilter([...phaseFilter, 'secure']);
                          } else {
                            setPhaseFilter(phaseFilter.filter(p => p !== 'secure'));
                          }
                        }}
                      />
                      <Label htmlFor="filter-secure" className="text-xs flex items-center">
                        <ShieldCheck className="h-3 w-3 text-navy mr-2" />
                        Secure
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-streamline" 
                        checked={phaseFilter.includes('streamline')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPhaseFilter([...phaseFilter, 'streamline']);
                          } else {
                            setPhaseFilter(phaseFilter.filter(p => p !== 'streamline'));
                          }
                        }}
                      />
                      <Label htmlFor="filter-streamline" className="text-xs flex items-center">
                        <Clock className="h-3 w-3 text-primary mr-2" />
                        Streamline
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-accelerate" 
                        checked={phaseFilter.includes('accelerate')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPhaseFilter([...phaseFilter, 'accelerate']);
                          } else {
                            setPhaseFilter(phaseFilter.filter(p => p !== 'accelerate'));
                          }
                        }}
                      />
                      <Label htmlFor="filter-accelerate" className="text-xs flex items-center">
                        <Rocket className="h-3 w-3 text-gold mr-2" />
                        Accelerate
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Sorting and Filtering</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="price-sort" className="text-xs block mb-1">Sort by Price</Label>
                      <Select 
                        value={priceSort || ""} 
                        onValueChange={(value) => setPriceSort(value as "asc" | "desc" | null)}
                      >
                        <SelectTrigger id="price-sort" className="w-full">
                          <SelectValue placeholder="Sort by price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">No sorting</SelectItem>
                          <SelectItem value="asc">Low to High</SelectItem>
                          <SelectItem value="desc">High to Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="search-features" className="text-xs block mb-1">Search Features</Label>
                      <Input 
                        id="search-features" 
                        placeholder="Search for features..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Display Options</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="highlight-differences" 
                        checked={highlightDifferences}
                        onCheckedChange={(checked) => setHighlightDifferences(!!checked)}
                      />
                      <Label htmlFor="highlight-differences" className="text-xs">
                        Highlight feature differences
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {plans.length > 0 ? (
          <Card className="rounded-[16px] rounded-tr-[0px]">
            <ScrollArea className="w-full overflow-x-auto" type="always">
              <div className="min-w-max">
                <div className="grid grid-cols-[250px_repeat(auto-fill,minmax(200px,1fr))]">
                  {/* Header */}
                  <CardHeader className="border-r bg-muted/10">
                    <CardTitle className="text-lg font-extralight">Features</CardTitle>
                  </CardHeader>
                  
                  {sortedPlans.map((plan) => (
                    <CardHeader 
                      key={plan.id} 
                      className={`border-r last:border-r-0 text-center ${
                        plan.phase ? phaseColors[plan.phase].iconBg : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-extralight">{plan.name}</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 -mt-1 -mr-1"
                          onClick={() => onRemovePlan(plan.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{plan.description}</p>
                      <div className="mt-2">
                        <Badge 
                          className={plan.phase ? phaseColors[plan.phase].badge : "bg-blue text-white"}
                        >
                          {plan.phase ? plan.phase.charAt(0).toUpperCase() + plan.phase.slice(1) : 'Plan'}
                        </Badge>
                        {plan.popular && (
                          <Badge className="ml-2 bg-primary text-white">
                            Popular
                          </Badge>
                        )}
                        {plan.recommended && (
                          <Badge className="ml-2 bg-gold text-white">
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                  ))}
                  
                  {/* Pricing section */}
                  <div className="p-4 border-r border-t bg-muted/10">
                    <p className="font-medium">Pricing</p>
                  </div>
                  
                  {sortedPlans.map((plan) => {
                    return (
                      <div key={`${plan.id}-pricing`} className="p-4 border-r last:border-r-0 border-t text-center">
                        <p className="font-bold text-lg">
                          {plan.price === 0 ? 'Free' : `R${plan.price.toLocaleString()}`}
                          {plan.price > 0 && (
                            <span className="text-sm font-normal text-muted-foreground ml-1">
                              {formatInterval(plan.interval)}
                            </span>
                          )}
                        </p>
                        {plan.discountPercentage && plan.originalPrice && (
                          <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-2">
                            <span className="line-through">R{plan.originalPrice.toLocaleString()}</span>
                            <Badge className="bg-primary/10 text-primary text-[10px]">
                              Save {plan.discountPercentage}%
                            </Badge>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Features by category */}
                  {Object.entries(categorizedFeatures).map(([category, features]) => (
                    <React.Fragment key={category}>
                      <div className="col-span-full border-t bg-muted/5">
                        <p className="font-medium p-4">{category}</p>
                      </div>
                      
                      {features
                        .filter(feature => searchTerm ? feature.text.toLowerCase().includes(searchTerm.toLowerCase()) : true)
                        .map((feature, index) => (
                        <div key={feature.text} className="contents">
                          <div 
                            className={`p-4 border-r ${
                              index === features.length - 1 ? "" : "border-b"
                            } ${
                              isFeatureDifferent(feature.text) ? "bg-muted/20" : ""
                            }`}
                          >
                            <p className="font-medium text-sm flex items-center gap-1">
                              {feature.text}
                              {feature.highlighted && (
                                <Badge className="ml-1 text-[10px] bg-gold/10 text-gold">Highlighted</Badge>
                              )}
                            </p>
                          </div>
                          
                          {sortedPlans.map((plan) => {
                            const planFeature = plan.features.find(f => f.text === feature.text);
                            const included = planFeature ? planFeature.included : false;
                            const highlighted = planFeature?.highlighted;
                            
                            return (
                              <div 
                                key={`${plan.id}-${feature.text}`} 
                                className={`p-4 border-r last:border-r-0 text-center ${
                                  index === features.length - 1 ? "" : "border-b"
                                } ${
                                  isFeatureDifferent(feature.text) ? "bg-muted/20" : ""
                                }`}
                              >
                                {included ? (
                                  <div className="flex flex-col items-center">
                                    <Check 
                                      className={`h-5 w-5 ${
                                        plan.phase ? phaseColors[plan.phase].icon : "text-green-500"
                                      } mx-auto`} 
                                    />
                                    {highlighted && (
                                      <span className="text-[10px] text-muted-foreground mt-1">Premium</span>
                                    )}
                                  </div>
                                ) : (
                                  <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                  
                  {/* Actions */}
                  <CardFooter className="border-r border-t pt-6 bg-muted/10">
                    <div></div>
                  </CardFooter>
                  
                  {sortedPlans.map((plan) => (
                    <CardFooter 
                      key={`${plan.id}-actions`} 
                      className="border-r last:border-r-0 border-t pt-6 flex-col items-stretch gap-2"
                    >
                      <Button 
                        onClick={() => onSelectPlan(plan.id)}
                        className={cn(
                          "rounded-[16px] rounded-tr-[0px]",
                          plan.phase ? phaseColors[plan.phase].button : "bg-blue hover:bg-blue/90 text-white"
                        )}
                        disabled={plan.comingSoon}
                      >
                        {plan.comingSoon ? 'Coming Soon' : (plan.ctaLabel || 'Select Plan')}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => onSelectPlan(plan.id)}
                        className="rounded-[16px] rounded-tr-[0px]"
                      >
                        View Details 
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </Card>
        ) : (
          <Card className="rounded-[16px] rounded-tr-[0px] p-8 text-center">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                <Info className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-extralight text-navy mb-2">No Plans Selected</h3>
              <p className="text-xs text-muted-foreground mb-6 max-w-md mx-auto">
                Select plans to compare their features, pricing, and benefits side by side.
                You can add up to {maxComparisons} plans to compare at once.
              </p>
              <Button 
                onClick={() => {
                  if (filteredAvailablePlans.length > 0) {
                    onAddPlan(filteredAvailablePlans[0].id);
                  }
                }}
                disabled={filteredAvailablePlans.length === 0}
                className="rounded-[16px] rounded-tr-[0px] bg-blue text-white hover:bg-blue/90"
              >
                Add First Plan
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
