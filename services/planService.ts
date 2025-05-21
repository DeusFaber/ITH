
import { PlanData } from '../lib/mockPlansData';
import { toast } from 'sonner@2.0.3';

// Types for API responses
export interface PlanAPIResponse {
  plans: PlanData[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PlanDetailsAPIResponse {
  plan: PlanData;
  relatedPlans: PlanData[];
}

// Filter interface
export interface PlanFilter {
  phase?: 'operate' | 'secure' | 'streamline' | 'accelerate';
  priceMin?: number;
  priceMax?: number;
  interval?: 'monthly' | 'quarterly' | 'annually' | 'once-off';
  search?: string;
  sortBy?: 'price' | 'name' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Service for fetching plan data from the backend API
 * In a real application, this would make actual API calls
 * For now, we'll use the mock data and simulate API behavior
 */
export const planService = {
  /**
   * Fetch plans with filtering and pagination
   */
  async getPlans(
    filters: PlanFilter = {}, 
    page = 1, 
    pageSize = 10
  ): Promise<PlanAPIResponse> {
    try {
      // Simulate API request
      await simulateNetworkDelay();
      
      // Fetch mock data
      const { allPlans } = await import('../lib/mockPlansData');
      
      // Combine all plan categories
      let plans: PlanData[] = [
        ...allPlans.basic,
        ...allPlans.security,
        ...allPlans.accelerate
      ];
      
      // Apply filters
      plans = filterPlans(plans, filters);
      
      // Sort plans
      plans = sortPlans(plans, filters.sortBy || 'name', filters.sortOrder || 'asc');
      
      // Calculate pagination
      const total = plans.length;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedPlans = plans.slice(startIndex, endIndex);
      
      return {
        plans: paginatedPlans,
        total,
        page,
        pageSize
      };
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast.error('Failed to load plans. Please try again.');
      return {
        plans: [],
        total: 0,
        page: 1,
        pageSize
      };
    }
  },
  
  /**
   * Fetch a single plan by ID with related plans
   */
  async getPlanById(planId: string): Promise<PlanDetailsAPIResponse | null> {
    try {
      // Simulate API request
      await simulateNetworkDelay();
      
      // Fetch mock data
      const { allPlans } = await import('../lib/mockPlansData');
      
      // Combine all plan categories
      const allPlansList: PlanData[] = [
        ...allPlans.basic,
        ...allPlans.security,
        ...allPlans.accelerate
      ];
      
      // Find the plan
      const plan = allPlansList.find(p => p.id === planId);
      
      if (!plan) {
        throw new Error(`Plan with ID ${planId} not found`);
      }
      
      // Find related plans (same phase)
      let relatedPlans = allPlansList
        .filter(p => p.phase === plan.phase && p.id !== plan.id)
        .slice(0, 3);
      
      return {
        plan,
        relatedPlans
      };
    } catch (error) {
      console.error('Error fetching plan details:', error);
      toast.error('Failed to load plan details. Please try again.');
      return null;
    }
  },
  
  /**
   * Get featured plans for the homepage or dashboard
   */
  async getFeaturedPlans(): Promise<PlanData[]> {
    try {
      // Simulate API request
      await simulateNetworkDelay();
      
      // Fetch mock data
      const { allPlans } = await import('../lib/mockPlansData');
      
      // Get featured plans (1 from each category)
      const featuredPlans = [
        allPlans.basic.find(p => p.recommended || p.popular) || allPlans.basic[0],
        allPlans.security.find(p => p.recommended || p.popular) || allPlans.security[0],
        allPlans.accelerate.find(p => p.recommended || p.popular) || allPlans.accelerate[0]
      ];
      
      return featuredPlans;
    } catch (error) {
      console.error('Error fetching featured plans:', error);
      toast.error('Failed to load featured plans. Please try again.');
      return [];
    }
  },
  
  /**
   * Get plans by phase
   */
  async getPlansByPhase(phase: 'operate' | 'secure' | 'streamline' | 'accelerate'): Promise<PlanData[]> {
    try {
      // Simulate API request
      await simulateNetworkDelay();
      
      // Fetch mock data
      const { allPlans } = await import('../lib/mockPlansData');
      
      // Get plans by phase
      let plans: PlanData[] = [];
      
      if (phase === 'operate') {
        plans = allPlans.basic.filter(p => p.phase === 'operate');
      } else if (phase === 'secure') {
        plans = allPlans.security.filter(p => p.phase === 'secure');
      } else if (phase === 'accelerate') {
        plans = allPlans.accelerate.filter(p => p.phase === 'accelerate');
      } else if (phase === 'streamline') {
        // We don't have streamline plans in the mock data, but this is for illustration
        plans = [];
      }
      
      return plans;
    } catch (error) {
      console.error(`Error fetching ${phase} plans:`, error);
      toast.error(`Failed to load ${phase} plans. Please try again.`);
      return [];
    }
  }
};

// Helper function to simulate network delay
function simulateNetworkDelay(minMs = 300, maxMs = 800): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
}

// Helper function to filter plans
function filterPlans(plans: PlanData[], filters: PlanFilter): PlanData[] {
  return plans.filter(plan => {
    // Filter by phase
    if (filters.phase && plan.phase !== filters.phase) {
      return false;
    }
    
    // Filter by price range
    if (filters.priceMin !== undefined && plan.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && plan.price > filters.priceMax) {
      return false;
    }
    
    // Filter by interval
    if (filters.interval && plan.interval !== filters.interval) {
      return false;
    }
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const nameMatch = plan.name.toLowerCase().includes(searchTerm);
      const descriptionMatch = plan.description.toLowerCase().includes(searchTerm);
      const featureMatch = plan.features.some(f => 
        f.text.toLowerCase().includes(searchTerm)
      );
      
      if (!nameMatch && !descriptionMatch && !featureMatch) {
        return false;
      }
    }
    
    return true;
  });
}

// Helper function to sort plans
function sortPlans(
  plans: PlanData[], 
  sortBy: 'price' | 'name' | 'popularity', 
  sortOrder: 'asc' | 'desc'
): PlanData[] {
  return [...plans].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'price') {
      comparison = a.price - b.price;
    } else if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'popularity') {
      // For popularity, we'll use a points system
      const aPoints = (a.popular ? 2 : 0) + (a.recommended ? 3 : 0);
      const bPoints = (b.popular ? 2 : 0) + (b.recommended ? 3 : 0);
      comparison = bPoints - aPoints; // Higher points first
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
}
