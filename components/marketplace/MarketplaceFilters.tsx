
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Search, Filter, X } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { 
  MarketplaceCategory, 
  Industry, 
  Role, 
  BusinessOutcome 
} from "../../lib/marketplaceTypes";

interface MarketplaceFiltersProps {
  onFilterChange: (filters: MarketplaceFilters) => void;
  totalPlans: number;
  filteredCount: number;
}

export interface MarketplaceFilters {
  search: string;
  categories: MarketplaceCategory[];
  industries: Industry[];
  roles: Role[];
  outcomes: BusinessOutcome[];
}

export function MarketplaceFilters({ 
  onFilterChange, 
  totalPlans, 
  filteredCount 
}: MarketplaceFiltersProps) {
  const [filters, setFilters] = useState<MarketplaceFilters>({
    search: "",
    categories: [],
    industries: [],
    roles: [],
    outcomes: []
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const toggleCategory = (category: MarketplaceCategory) => {
    let newCategories: MarketplaceCategory[];
    
    if (filters.categories.includes(category)) {
      newCategories = filters.categories.filter(c => c !== category);
    } else {
      newCategories = [...filters.categories, category];
    }
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleIndustryChange = (value: string) => {
    const industry = value as Industry;
    let newIndustries: Industry[];
    
    if (filters.industries.includes(industry)) {
      newIndustries = filters.industries.filter(i => i !== industry);
    } else {
      newIndustries = [...filters.industries, industry];
    }
    
    const newFilters = { ...filters, industries: newIndustries };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleRoleChange = (value: string) => {
    const role = value as Role;
    let newRoles: Role[];
    
    if (filters.roles.includes(role)) {
      newRoles = filters.roles.filter(r => r !== role);
    } else {
      newRoles = [...filters.roles, role];
    }
    
    const newFilters = { ...filters, roles: newRoles };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleOutcomeChange = (value: string) => {
    const outcome = value as BusinessOutcome;
    let newOutcomes: BusinessOutcome[];
    
    if (filters.outcomes.includes(outcome)) {
      newOutcomes = filters.outcomes.filter(o => o !== outcome);
    } else {
      newOutcomes = [...filters.outcomes, outcome];
    }
    
    const newFilters = { ...filters, outcomes: newOutcomes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearFilters = () => {
    const newFilters: MarketplaceFilters = {
      search: "",
      categories: [],
      industries: [],
      roles: [],
      outcomes: []
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const hasActiveFilters = () => {
    return (
      filters.search !== "" ||
      filters.categories.length > 0 ||
      filters.industries.length > 0 ||
      filters.roles.length > 0 ||
      filters.outcomes.length > 0
    );
  };
  
  const removeFilter = (type: keyof MarketplaceFilters, value: any) => {
    const newFilters = { ...filters };
    
    if (type === 'search') {
      newFilters.search = "";
    } else {
      // @ts-ignore
      newFilters[type] = filters[type].filter((item: any) => item !== value);
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Available options for dropdowns
  const industryOptions: Industry[] = [
    "Legal", "Accounting", "Architecture", "Healthcare", 
    "Manufacturing", "Retail", "Technology", "Education", 
    "Financial", "Nonprofit"
  ];
  
  const roleOptions: Role[] = [
    "CEO", "CTO", "HR", "Finance", "Admin", "IT", 
    "Operations", "Sales", "Marketing", "Customer Service"
  ];
  
  const outcomeOptions: BusinessOutcome[] = [
    "Workforce Optimization", "Risk Reduction", "Cost Savings", 
    "Productivity", "Customer Experience", "Innovation", 
    "Security", "Compliance"
  ];
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for plans..."
              className="pl-8 pr-10"
              value={filters.search}
              onChange={handleSearchChange}
            />
            {filters.search && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8"
                onClick={() => removeFilter('search', null)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2 flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Categories
            </p>
            <div className="flex flex-wrap gap-2">
              {(["Operate", "Secure", "Streamline", "Accelerate"] as MarketplaceCategory[]).map((category) => (
                <Badge
                  key={category}
                  variant={filters.categories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium mb-2">Industry</p>
              <Select onValueChange={handleIndustryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industryOptions.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Role</p>
              <Select onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Business Outcome</p>
              <Select onValueChange={handleOutcomeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select outcome" />
                </SelectTrigger>
                <SelectContent>
                  {outcomeOptions.map((outcome) => (
                    <SelectItem key={outcome} value={outcome}>
                      {outcome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {hasActiveFilters() && (
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredCount} of {totalPlans} plans
                </p>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {filters.search}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1" 
                      onClick={() => removeFilter('search', null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {filters.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="gap-1">
                    {category}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1" 
                      onClick={() => removeFilter('categories', category)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                
                {filters.industries.map((industry) => (
                  <Badge key={industry} variant="secondary" className="gap-1">
                    {industry}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1" 
                      onClick={() => removeFilter('industries', industry)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                
                {filters.roles.map((role) => (
                  <Badge key={role} variant="secondary" className="gap-1">
                    {role}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1" 
                      onClick={() => removeFilter('roles', role)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                
                {filters.outcomes.map((outcome) => (
                  <Badge key={outcome} variant="secondary" className="gap-1">
                    {outcome}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1" 
                      onClick={() => removeFilter('outcomes', outcome)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
