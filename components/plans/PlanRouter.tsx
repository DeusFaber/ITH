
import React from 'react';
import { PLAN_ROUTES, getPlanUrl, navigateToPlan } from '../../lib/utils';

// Interface for plan route item
interface PlanRoute {
  slug: string;
  path: string;
  displayName: string;
  phase: 'operate' | 'secure' | 'streamline' | 'accelerate';
}

// Comprehensive plan route data
const PLAN_ROUTE_DATA: PlanRoute[] = [
  // Operate Phase
  { slug: 'user-health-plan', path: '/plans/user-health-plan', displayName: 'User Health Plan', phase: 'operate' },
  { slug: 'office-health-plan', path: '/plans/office-health-plan', displayName: 'Office Health Plan', phase: 'operate' },
  { slug: 'communication-plan', path: '/plans/communication-plan', displayName: 'Communication Plan', phase: 'operate' },
  
  // Secure Phase
  { slug: 'itsafe-user-plan', path: '/plans/itsafe-user-plan', displayName: 'ITsafe User Plan', phase: 'secure' },
  { slug: 'itsafe-server-plan', path: '/plans/itsafe-server-plan', displayName: 'ITsafe Server Plan', phase: 'secure' },
  
  // Streamline Phase
  { slug: 'mail-plan', path: '/plans/mail-plan', displayName: 'Mail Plan', phase: 'streamline' },
  { slug: 'business-basic-plan', path: '/plans/business-basic-plan', displayName: 'Business Basic Plan', phase: 'streamline' },
  { slug: 'business-standard-plan', path: '/plans/business-standard-plan', displayName: 'Business Standard Plan', phase: 'streamline' },
  { slug: 'sharepoint-plan', path: '/plans/sharepoint-plan', displayName: 'SharePoint Plan', phase: 'streamline' },
  
  // Accelerate Phase
  { slug: 'reporting-plan', path: '/plans/reporting-plan', displayName: 'Reporting Plan', phase: 'accelerate' },
  { slug: 'workflow-optimization-plan', path: '/plans/workflow-optimization-plan', displayName: 'Workflow Optimization Plan', phase: 'accelerate' },
  { slug: 'digital-customer-plan', path: '/plans/digital-customer-plan', displayName: 'Digital Customer Plan', phase: 'accelerate' },
  { slug: 'ai-connect-plan', path: '/plans/ai-connect-plan', displayName: 'AI Connect Plan', phase: 'accelerate' },
];

// Map of all plan paths for quick lookup
const PLAN_PATH_MAP: Record<string, PlanRoute> = PLAN_ROUTE_DATA.reduce((acc, plan) => {
  acc[plan.path] = plan;
  return acc;
}, {} as Record<string, PlanRoute>);

// Map of all plan slugs for quick lookup
const PLAN_SLUG_MAP: Record<string, PlanRoute> = PLAN_ROUTE_DATA.reduce((acc, plan) => {
  acc[plan.slug] = plan;
  return acc;
}, {} as Record<string, PlanRoute>);

// Get information about a plan by slug or path
export function getPlanInfo(slugOrPath: string): PlanRoute | null {
  // Try to match as a slug first
  if (PLAN_SLUG_MAP[slugOrPath]) {
    return PLAN_SLUG_MAP[slugOrPath];
  }
  
  // Then try to match as a path
  if (PLAN_PATH_MAP[slugOrPath]) {
    return PLAN_PATH_MAP[slugOrPath];
  }
  
  // If no direct match, try to normalize and match the slug
  const normalizedSlug = slugOrPath
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^\/plans\//, ''); // Remove prefix if present
  
  if (PLAN_SLUG_MAP[normalizedSlug]) {
    return PLAN_SLUG_MAP[normalizedSlug];
  }
  
  return null;
}

// Get all plans in a specific phase
export function getPlansByPhase(phase: 'operate' | 'secure' | 'streamline' | 'accelerate'): PlanRoute[] {
  return PLAN_ROUTE_DATA.filter(plan => plan.phase === phase);
}

// Get all plan routes
export function getAllPlanRoutes(): PlanRoute[] {
  return PLAN_ROUTE_DATA;
}

// Check if a path is a valid plan path
export function isPlanPath(path: string): boolean {
  // Check if it's one of our known plan paths
  if (PLAN_PATH_MAP[path]) {
    return true;
  }
  
  // Check if it matches the generic plan path pattern
  return path.startsWith('/plans/') && path !== '/plans/' && path !== '/plans/compare';
}

// PlanLink component - For consistent plan link rendering
interface PlanLinkProps {
  slug: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  replaceUrl?: boolean;
}

export function PlanLink({ slug, children, className = '', onClick, replaceUrl = false }: PlanLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Execute any additional onClick handler
    if (onClick) {
      onClick(e);
    }
    
    // Navigate to the plan page
    navigateToPlan(slug, { replaceHistory: replaceUrl });
  };
  
  return (
    <a 
      href={getPlanUrl(slug)} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

export default {
  PLAN_ROUTE_DATA,
  PlanLink,
  getPlanInfo,
  getPlansByPhase,
  getAllPlanRoutes,
  isPlanPath
};
