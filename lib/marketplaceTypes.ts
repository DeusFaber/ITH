
import { Plan } from "./types";

export type MarketplaceCategory = "Operate" | "Secure" | "Streamline" | "Accelerate";
export type Industry = "Legal" | "Accounting" | "Architecture" | "Healthcare" | "Manufacturing" | "Retail" | "Technology" | "Education" | "Financial" | "Nonprofit";
export type Role = "CEO" | "CTO" | "HR" | "Finance" | "Admin" | "IT" | "Operations" | "Sales" | "Marketing" | "Customer Service";
export type BusinessOutcome = "Workforce Optimization" | "Risk Reduction" | "Cost Savings" | "Productivity" | "Customer Experience" | "Innovation" | "Security" | "Compliance";

export interface RunbookStep {
  title: string;
  description: string;
  hasAITrigger?: boolean;
}

export interface PlanFeature {
  title: string;
  description: string;
  included: boolean;
}

export interface PlanBillingTier {
  id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "annually";
  perUser: boolean;
  minUsers?: number;
  maxUsers?: number;
  mostPopular?: boolean;
}

export interface PlanAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: "monthly" | "annually";
  perUser: boolean;
}

export interface MarketplacePlan {
  id: string;
  name: string;
  description: string;
  tagline: string;
  heroStatement: string;
  thumbnail?: string;
  
  // Categorization
  category: MarketplaceCategory;
  industries: Industry[];
  roles: Role[];
  businessOutcomes: BusinessOutcome[];
  skillsDelivered?: string[];
  
  // Plan details
  runbook: RunbookStep[];
  features: PlanFeature[];
  billingTiers: PlanBillingTier[];
  addOns: PlanAddOn[];
  
  // Comparison data
  comparisonHighlights: string[];
  
  // Marketing
  popularityScore?: number;
  testimonials?: {
    quote: string;
    author: string;
    company: string;
    role: string;
  }[];
}

export interface SubscriptionOptions {
  planId: string;
  tierId: string;
  userCount?: number;
  addOns: string[];
  billingCycle: "monthly" | "annually";
}

export interface CheckoutFormData {
  company: {
    name: string;
    size: string;
    industry: Industry;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  billing: {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    paymentMethod: "credit" | "invoice" | "ach";
    cardDetails?: {
      number: string;
      expiry: string;
      cvc: string;
      name: string;
    };
  };
  termsAccepted: boolean;
}

export interface PlanSetupProgress {
  planId: string;
  completedSteps: string[];
  nextSteps: string[];
  percentComplete: number;
}
