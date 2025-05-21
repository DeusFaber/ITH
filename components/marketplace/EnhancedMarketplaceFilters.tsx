
import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal, 
  Rocket,
  ShieldCheck,
  Server,
  Clock,
  ArrowUpDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import {
  Slider
} from "../ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "../ui/popover";
import { PlanFilter } from "../../services/planService";
import Vector from "../../imports/Vector";
import Vector29102 from "../../imports/Vector-29-102";

interface EnhancedMarketplaceFiltersProps {
  onFilterChange: (filters: PlanFilter) => void;
  totalPlans: number;
  filteredCount: number;
  isLoading?: boolean;
}

export function EnhancedMarketplaceFilters({
  onFilterChange,
  totalPlans,
  filteredCount,
  isLoading = false
}: EnhancedMarketplaceFiltersProps) {
  // Initialize filters
  const [filters, setFilters] = useState<PlanFilter>({
    search: "",
    phase: undefined,
    priceMin: undefined,
    priceMax: undefined,
    interval: undefined,
    sortBy: "name",
    sortOrder: "asc"
  });

  // Price range state for slider
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Toggle phase filter
  const togglePhase = (phase: 'operate' | 'secure' | 'streamline' | 'accelerate') => {
    const newFilters = { 
      ...filters, 
      phase: filters.phase === phase ? undefined : phase 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Handle billing interval change
  const handleIntervalChange = (value: string) => {
    if (value === "all") {
      const newFilters = { ...filters, interval: undefined };
      setFilters(newFilters);
      onFilterChange(newFilters);
      return;
    }
    
    const newFilters = { 
      ...filters, 
      interval: value as 'monthly' | 'quarterly' | 'annually' | 'once-off'
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Handle price range change
  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };
  
  // Apply price range filter when slider interaction ends
  const handlePriceRangeApply = () => {
    const newFilters = { 
      ...filters, 
      priceMin: priceRange[0],
      priceMax: priceRange[1]
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    let sortBy: 'price' | 'name' | 'popularity' = 'name';
    let sortOrder: 'asc' | 'desc' = 'asc';
    
    switch (value) {
      case 'name-asc':
        sortBy = 'name';
        sortOrder = 'asc';
        break;
      case 'name-desc':
        sortBy = 'name';
        sortOrder = 'desc';
        break;
      case 'price-asc':
        sortBy = 'price';
        sortOrder = 'asc';
        break;
      case 'price-desc':
        sortBy = 'price';
        sortOrder = 'desc';
        break;
      case 'popularity':
        sortBy = 'popularity';
        sortOrder = 'desc';
        break;
    }
    
    const newFilters = { ...filters, sortBy, sortOrder };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Clear all filters
  const clearFilters = () => {
    const newFilters: PlanFilter = {
      search: "",
      phase: undefined,
      priceMin: undefined,
      priceMax: undefined,
      interval: undefined,
      sortBy: "name",
      sortOrder: "asc"
    };
    setFilters(newFilters);
    setPriceRange([0, 10000]);
    onFilterChange(newFilters);
  };
  
  // Check if any filter is active
  const hasActiveFilters = () => {
    return (
      filters.search !== "" ||
      filters.phase !== undefined ||
      filters.priceMin !== undefined ||
      filters.priceMax !== undefined ||
      filters.interval !== undefined ||
      filters.sortBy !== "name" ||
      filters.sortOrder !== "asc"
    );
  };
  
  // Remove a specific filter
  const removeFilter = (type: keyof PlanFilter) => {
    const newFilters = { ...filters };
    
    switch (type) {
      case 'search':
        newFilters.search = "";
        break;
      case 'phase':
        newFilters.phase = undefined;
        break;
      case 'priceMin':
      case 'priceMax':
        newFilters.priceMin = undefined;
        newFilters.priceMax = undefined;
        setPriceRange([0, 10000]);
        break;
      case 'interval':
        newFilters.interval = undefined;
        break;
      case 'sortBy':
      case 'sortOrder':
        newFilters.sortBy = "name";
        newFilters.sortOrder = "asc";
        break;
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Get phase display name
  const getPhaseDisplayName = (phase?: 'operate' | 'secure' | 'streamline' | 'accelerate') => {
    if (!phase) return '';
    return phase.charAt(0).toUpperCase() + phase.slice(1);
  };
  
  // Get interval display name
  const getIntervalDisplayName = (interval?: 'monthly' | 'quarterly' | 'annually' | 'once-off') => {
    if (!interval) return '';
    
    switch (interval) {
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'annually': return 'Annually';
      case 'once-off': return 'Once-off';
      default: return '';
    }
  };
  
  // Get sort display text
  const getSortDisplayText = () => {
    if (filters.sortBy === 'name') {
      return `Name (${filters.sortOrder === 'asc' ? 'A-Z' : 'Z-A'})`;
    } else if (filters.sortBy === 'price') {
      return `Price (${filters.sortOrder === 'asc' ? 'Low to High' : 'High to Low'})`;
    } else if (filters.sortBy === 'popularity') {
      return 'Popularity';
    }
    return 'Sort';
  };
  
  // Phase icon component
  const PhaseIcon = ({ phase }: { phase: 'operate' | 'secure' | 'streamline' | 'accelerate' }) => {
    switch (phase) {
      case 'operate':
        return (
          <div className="h-4 w-4 mr-2 flex items-center justify-center">
            <Vector />
          </div>
        );
      case 'secure':
        return (
          <div className="h-4 w-4 mr-2 flex items-center justify-center">
            <Vector29102 />
          </div>
        );
      case 'streamline':
        return <Clock className="h-4 w-4 mr-2" />;
      case 'accelerate':
        return <Rocket className="h-4 w-4 mr-2" />;
    }
  };
  
  return (
    <Card className="mb-6 rounded-[16px] rounded-tr-[0px]">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for plans..."
              className="pl-8 pr-10"
              value={filters.search}
              onChange={handleSearchChange}
              disabled={isLoading}
            />
            {filters.search && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8"
                onClick={() => removeFilter('search')}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Filters Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Phases Filter */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Phase</p>
              <div className="flex flex-wrap gap-2">
                {(['operate', 'secure', 'streamline', 'accelerate'] as const).map((phase) => (
                  <Badge
                    key={phase}
                    variant={filters.phase === phase ? "default" : "outline"}
                    className={`cursor-pointer ${
                      filters.phase === phase 
                        ? (phase === 'operate' ? 'bg-blue' : 
                           phase === 'secure' ? 'bg-navy' : 
                           phase === 'streamline' ? 'bg-primary' : 
                           'bg-gold') 
                        : ''
                    }`}
                    onClick={() => togglePhase(phase)}
                  >
                    <span className="flex items-center">
                      <PhaseIcon phase={phase} />
                      {getPhaseDisplayName(phase)}
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Price Range</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between rounded-[16px] rounded-tr-[0px]"
                    disabled={isLoading}
                  >
                    <span>
                      {filters.priceMin !== undefined && filters.priceMax !== undefined
                        ? `R${filters.priceMin} - R${filters.priceMax}`
                        : "All prices"}
                    </span>
                    <SlidersHorizontal className="h-4 w-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Price Range</h4>
                    <div className="py-4">
                      <Slider
                        defaultValue={[0, 10000]}
                        value={priceRange}
                        max={10000}
                        step={500}
                        onValueChange={(value) => handlePriceRangeChange(value as [number, number])}
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="text-xs">R{priceRange[0]}</div>
                      <div className="text-xs">R{priceRange[1]}</div>
                    </div>
                    <Button 
                      className="w-full rounded-[16px] rounded-tr-[0px]" 
                      onClick={handlePriceRangeApply}
                    >
                      Apply
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Billing Interval Filter */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Billing Interval</p>
              <Select 
                onValueChange={handleIntervalChange} 
                value={filters.interval || "all"}
                disabled={isLoading}
              >
                <SelectTrigger className="rounded-[16px] rounded-tr-[0px]">
                  <SelectValue placeholder="Select billing interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All intervals</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="once-off">Once-off</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Sorting */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Sort By</p>
              <Select 
                onValueChange={handleSortChange} 
                value={`${filters.sortBy}-${filters.sortOrder}`}
                disabled={isLoading}
              >
                <SelectTrigger className="rounded-[16px] rounded-tr-[0px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {hasActiveFilters() && (
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground">
                  Showing {filteredCount} of {totalPlans} plans
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  disabled={isLoading}
                  className="rounded-[16px] rounded-tr-[0px]"
                >
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
                      onClick={() => removeFilter('search')}
                      disabled={isLoading}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {filters.phase && (
                  <Badge variant="secondary" className="gap-1">
                    Phase: {getPhaseDisplayName(filters.phase)}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1" 
                      onClick={() => removeFilter('phase')}
                      disabled={isLoading}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {(filters.priceMin !== undefined && filters.priceMax !== undefined) && (
                  <Badge variant="secondary" className="gap-1">
                    Price: R{filters.priceMin} - R{filters.priceMax}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1" 
                      onClick={() => removeFilter('priceMin')}
                      disabled={isLoading}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {filters.interval && (
                  <Badge variant="secondary" className="gap-1">
                    Interval: {getIntervalDisplayName(filters.interval)}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1" 
                      onClick={() => removeFilter('interval')}
                      disabled={isLoading}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {(filters.sortBy !== "name" || filters.sortOrder !== "asc") && (
                  <Badge variant="secondary" className="gap-1">
                    Sorted by: {getSortDisplayText()}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1" 
                      onClick={() => removeFilter('sortBy')}
                      disabled={isLoading}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
