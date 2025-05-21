
import { PlanFeature } from "../components/marketplace/PlanCard";

export interface PlanData {
  id: string;
  name: string;
  price: number;
  currency?: string;
  interval: 'monthly' | 'quarterly' | 'annually' | 'once-off';
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  recommended?: boolean;
  phase?: 'operate' | 'secure' | 'streamline' | 'accelerate';
  ctaLabel?: string;
  secondaryCtaLabel?: string;
  discountPercentage?: number; 
  originalPrice?: number;
  comingSoon?: boolean;
}

// Basic IT Health Plans
export const basicPlans: PlanData[] = [
  {
    id: "basic-assessment",
    name: "IT Health Assessment",
    price: 0,
    interval: "once-off",
    description: "Understand your current IT health with our comprehensive assessment",
    features: [
      { text: "IT Infrastructure Assessment", included: true },
      { text: "Security Vulnerability Check", included: true },
      { text: "Basic Recommendations", included: true },
      { text: "Detailed Report", included: false },
      { text: "Follow-up Consultation", included: false },
    ],
    ctaLabel: "Start Free Assessment",
    secondaryCtaLabel: "Learn More",
    phase: "operate"
  },
  {
    id: "essential-it",
    name: "Essential IT",
    price: 2500,
    interval: "monthly",
    description: "Essential IT management for small businesses",
    features: [
      { text: "Full IT Health Assessment", included: true },
      { text: "Basic Security Suite", included: true },
      { text: "24/7 Email Support", included: true },
      { text: "Monthly System Checks", included: true },
      { text: "Data Backup Solutions", included: false },
    ],
    popular: true,
    phase: "operate"
  },
  {
    id: "business-it",
    name: "Business IT",
    price: 4900,
    interval: "monthly",
    description: "Comprehensive IT solutions for growing businesses",
    features: [
      { text: "Everything in Essential IT", included: true },
      { text: "Advanced Security Suite", included: true },
      { text: "24/7 Phone & Email Support", included: true },
      { text: "Weekly System Checks", included: true },
      { text: "Cloud Backup Solutions", included: true, highlighted: true },
    ],
    recommended: true,
    phase: "secure",
    discountPercentage: 15,
    originalPrice: 5750
  },
  {
    id: "enterprise-it",
    name: "Enterprise IT",
    price: 9900,
    interval: "monthly",
    description: "Enterprise-grade IT management and security solutions",
    features: [
      { text: "Everything in Business IT", included: true },
      { text: "Premium Security Protection", included: true, highlighted: true },
      { text: "Dedicated IT Support Manager", included: true },
      { text: "Daily System Monitoring", included: true },
      { text: "Disaster Recovery Planning", included: true },
    ],
    phase: "accelerate"
  }
];

// Security-focused Plans
export const securityPlans: PlanData[] = [
  {
    id: "security-essentials",
    name: "Security Essentials",
    price: 1500,
    interval: "monthly",
    description: "Basic security protection for small businesses",
    features: [
      { text: "Endpoint Protection", included: true },
      { text: "Email Security Filtering", included: true },
      { text: "Security Awareness Training", included: true },
      { text: "Vulnerability Scanning", included: false },
      { text: "Threat Hunting", included: false },
    ],
    phase: "secure"
  },
  {
    id: "security-advanced",
    name: "Security Advanced",
    price: 3500,
    interval: "monthly",
    description: "Advanced security for business-critical systems",
    features: [
      { text: "Everything in Security Essentials", included: true },
      { text: "24/7 Security Monitoring", included: true },
      { text: "Vulnerability Management", included: true },
      { text: "Data Loss Prevention", included: true },
      { text: "Incident Response Planning", included: true, highlighted: true },
    ],
    recommended: true,
    phase: "secure"
  },
  {
    id: "security-complete",
    name: "Security Complete",
    price: 6500,
    interval: "monthly",
    description: "Total security protection for enterprise organizations",
    features: [
      { text: "Everything in Security Advanced", included: true },
      { text: "Dedicated Security Team", included: true },
      { text: "Threat Hunting & Intelligence", included: true, highlighted: true },
      { text: "Security Compliance Management", included: true },
      { text: "Complete Incident Response", included: true },
    ],
    phase: "secure"
  },
  {
    id: "security-compliance",
    name: "Compliance Plus",
    price: 8500,
    interval: "monthly",
    description: "Security compliance solutions for regulated industries",
    features: [
      { text: "Everything in Security Complete", included: true },
      { text: "POPIA Compliance Management", included: true, highlighted: true },
      { text: "Industry-specific Compliance", included: true },
      { text: "Compliance Reporting", included: true },
      { text: "Third-party Risk Management", included: true },
    ],
    comingSoon: true,
    phase: "secure"
  }
];

// Accelerate Plans
export const acceleratePlans: PlanData[] = [
  {
    id: "accelerate-starter",
    name: "Accelerate Starter",
    price: 25000,
    interval: "quarterly",
    description: "Begin your digital transformation journey",
    features: [
      { text: "Digital Transformation Assessment", included: true },
      { text: "Technology Roadmap", included: true },
      { text: "Process Optimization", included: true },
      { text: "Quarterly Strategy Sessions", included: true },
      { text: "Custom Software Development", included: false },
    ],
    phase: "accelerate"
  },
  {
    id: "accelerate-growth",
    name: "Accelerate Growth",
    price: 60000,
    interval: "quarterly",
    description: "Accelerate your business growth with comprehensive digital solutions",
    features: [
      { text: "Everything in Accelerate Starter", included: true },
      { text: "Business Process Automation", included: true, highlighted: true },
      { text: "Custom Application Development", included: true },
      { text: "Data Analytics & Insights", included: true },
      { text: "Monthly Strategy Sessions", included: true },
    ],
    popular: true,
    phase: "accelerate",
    discountPercentage: 10,
    originalPrice: 66500
  },
  {
    id: "accelerate-enterprise",
    name: "Accelerate Enterprise",
    price: 120000,
    interval: "quarterly",
    description: "Enterprise-grade digital transformation and acceleration",
    features: [
      { text: "Everything in Accelerate Growth", included: true },
      { text: "Enterprise Architecture Planning", included: true },
      { text: "Full Digital Transformation", included: true, highlighted: true },
      { text: "Advanced Analytics & AI Solutions", included: true },
      { text: "Dedicated Digital Transformation Team", included: true },
    ],
    phase: "accelerate"
  }
];

// Consolidated Plans export
export const allPlans = {
  basic: basicPlans,
  security: securityPlans,
  accelerate: acceleratePlans
};
