
import {
  MarketplacePlan,
  PlanSetupProgress,
  SubscriptionOptions,
} from "./marketplaceTypes";

export const mockMarketplacePlans: MarketplacePlan[] = [
  {
    id: "user-health",
    name: "User Health Plan",
    description: "Comprehensive IT support for your team members with responsive helpdesk and troubleshooting services",
    tagline: "Your team's IT lifeline",
    heroStatement: "Stop letting small IT problems become big disruptions. Keep your team productive with dedicated support at their fingertips.",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    
    category: "Operate",
    industries: ["Legal", "Accounting", "Technology", "Healthcare", "Financial", "Education"],
    roles: ["HR", "IT", "Operations", "Admin"],
    businessOutcomes: ["Productivity", "Workforce Optimization", "Cost Savings"],
    skillsDelivered: ["Technical Support", "Problem Solving", "IT Security Awareness"],
    
    runbook: [
      {
        title: "Initial Assessment",
        description: "We'll analyze your current IT setup and user needs"
      },
      {
        title: "Support Platform Setup",
        description: "Configure and deploy your custom support platform"
      },
      {
        title: "User Onboarding",
        description: "Get your team set up with access credentials",
        hasAITrigger: true
      },
      {
        title: "Asset Inventory",
        description: "Catalog all devices to monitor and support"
      },
      {
        title: "Go-Live",
        description: "Full activation of helpdesk services"
      }
    ],
    
    features: [
      {
        title: "24/7 IT Help Desk",
        description: "Round-the-clock support for all your IT needs",
        included: true
      },
      {
        title: "Remote Troubleshooting",
        description: "Secure remote access to quickly resolve issues",
        included: true
      },
      {
        title: "Device Management",
        description: "Monitor and maintain all company devices",
        included: true
      },
      {
        title: "Software Support",
        description: "Installation and support for business applications",
        included: true
      },
      {
        title: "Security Monitoring",
        description: "Basic security monitoring and alerts",
        included: true
      },
      {
        title: "On-site Support",
        description: "In-person technical assistance when needed",
        included: false
      }
    ],
    
    billingTiers: [
      {
        id: "user-health-essential",
        name: "Essential",
        price: 39.99,
        billingCycle: "monthly",
        perUser: true,
        minUsers: 5,
        maxUsers: 50
      },
      {
        id: "user-health-professional",
        name: "Professional",
        price: 49.99,
        billingCycle: "monthly",
        perUser: true,
        minUsers: 10,
        mostPopular: true
      },
      {
        id: "user-health-enterprise",
        name: "Enterprise",
        price: 69.99,
        billingCycle: "monthly",
        perUser: true,
        minUsers: 20
      }
    ],
    
    addOns: [
      {
        id: "user-health-onsite",
        name: "On-site Support",
        description: "Priority in-person technical assistance",
        price: 499.99,
        billingCycle: "monthly",
        perUser: false
      },
      {
        id: "user-health-training",
        name: "User Training",
        description: "Regular IT security and best practices training",
        price: 9.99,
        billingCycle: "monthly",
        perUser: true
      }
    ],
    
    comparisonHighlights: [
      "Fastest response time in the industry",
      "Supports all major operating systems and devices",
      "Multiple support channels including chat, phone, and email",
      "Regular satisfaction surveys and continuous improvement"
    ],
    
    popularityScore: 92,
    testimonials: [
      {
        quote: "Our productivity improved dramatically after implementing User Health. IT issues that used to take days are now resolved in minutes.",
        author: "Sarah Johnson",
        company: "Landmark Legal Partners",
        role: "Operations Manager"
      }
    ]
  },
  {
    id: "office-health",
    name: "Office Health Plan",
    description: "Complete infrastructure management for your office environment with proactive monitoring and maintenance",
    tagline: "Your office's digital backbone",
    heroStatement: "Don't wait for infrastructure problems to cripple your business. Stay ahead with proactive monitoring and expert management.",
    thumbnail: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    
    category: "Operate",
    industries: ["Technology", "Legal", "Accounting", "Manufacturing", "Retail", "Financial"],
    roles: ["CTO", "IT", "Operations"],
    businessOutcomes: ["Reliability", "Risk Reduction", "Productivity"],
    skillsDelivered: ["Network Management", "Infrastructure Planning", "Disaster Recovery"],
    
    runbook: [
      {
        title: "Network Assessment",
        description: "Comprehensive evaluation of your current network"
      },
      {
        title: "Monitoring Setup",
        description: "Implement 24/7 monitoring systems",
        hasAITrigger: true
      },
      {
        title: "Server Configuration",
        description: "Optimize server setup and management"
      },
      {
        title: "Backup Implementation",
        description: "Deploy robust backup solutions"
      },
      {
        title: "Disaster Recovery Planning",
        description: "Create and test recovery procedures"
      },
      {
        title: "Handover & Training",
        description: "Complete knowledge transfer to your team"
      }
    ],
    
    features: [
      {
        title: "Network Monitoring",
        description: "24/7 monitoring of all network components",
        included: true
      },
      {
        title: "Server Management",
        description: "Proactive server maintenance and optimization",
        included: true
      },
      {
        title: "Backup Solutions",
        description: "Automated backup with verified recovery testing",
        included: true
      },
      {
        title: "Cloud Integrations",
        description: "Seamless connectivity with cloud services",
        included: true
      },
      {
        title: "Hardware Maintenance",
        description: "Regular maintenance of physical infrastructure",
        included: true
      },
      {
        title: "24/7 Emergency Support",
        description: "Immediate response to critical infrastructure issues",
        included: false
      }
    ],
    
    billingTiers: [
      {
        id: "office-health-standard",
        name: "Standard",
        price: 499.99,
        billingCycle: "monthly",
        perUser: false
      },
      {
        id: "office-health-advanced",
        name: "Advanced",
        price: 799.99,
        billingCycle: "monthly",
        perUser: false,
        mostPopular: true
      },
      {
        id: "office-health-premium",
        name: "Premium",
        price: 1299.99,
        billingCycle: "monthly",
        perUser: false
      }
    ],
    
    addOns: [
      {
        id: "office-health-emergency",
        name: "24/7 Emergency Support",
        description: "Immediate response to critical infrastructure issues",
        price: 299.99,
        billingCycle: "monthly",
        perUser: false
      },
      {
        id: "office-health-audit",
        name: "Quarterly Security Audit",
        description: "Comprehensive security assessment and recommendations",
        price: 499.99,
        billingCycle: "monthly",
        perUser: false
      }
    ],
    
    comparisonHighlights: [
      "99.9% uptime guarantee",
      "Proactive monitoring prevents 95% of common network issues",
      "Dedicated technical account manager",
      "Regular infrastructure optimization recommendations"
    ],
    
    popularityScore: 88,
    testimonials: [
      {
        quote: "Office Health has transformed our infrastructure from a constant headache to a reliable foundation for our business operations.",
        author: "Michael Chen",
        company: "Innovative Tech Solutions",
        role: "CTO"
      }
    ]
  },
  {
    id: "security-health",
    name: "Security Health Plan",
    description: "Comprehensive cyber security protection with advanced threat detection, prevention, and rapid response",
    tagline: "Your cyber defense system",
    heroStatement: "Don't be the next breach headline. Build an impenetrable defense with multi-layered security that evolves with emerging threats.",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    
    category: "Secure",
    industries: ["Financial", "Healthcare", "Legal", "Technology", "Government", "Retail"],
    roles: ["CEO", "CTO", "IT", "Security"],
    businessOutcomes: ["Risk Reduction", "Compliance", "Security"],
    skillsDelivered: ["Threat Prevention", "Security Best Practices", "Incident Response"],
    
    runbook: [
      {
        title: "Security Assessment",
        description: "Comprehensive evaluation of your security posture"
      },
      {
        title: "Vulnerability Scanning",
        description: "Identify and prioritize security weaknesses",
        hasAITrigger: true
      },
      {
        title: "Security Tools Deployment",
        description: "Implement advanced protection solutions"
      },
      {
        title: "Policy Development",
        description: "Create security policies and procedures"
      },
      {
        title: "Employee Training",
        description: "Security awareness training for all staff"
      },
      {
        title: "Continuous Monitoring",
        description: "Activate 24/7 security operations center"
      }
    ],
    
    features: [
      {
        title: "Advanced Threat Protection",
        description: "AI-powered detection of sophisticated attacks",
        included: true
      },
      {
        title: "Vulnerability Management",
        description: "Regular scanning and remediation of vulnerabilities",
        included: true
      },
      {
        title: "Security Training",
        description: "Comprehensive security awareness for employees",
        included: true
      },
      {
        title: "24/7 Monitoring",
        description: "Round-the-clock security operations center",
        included: true
      },
      {
        title: "Incident Response",
        description: "Rapid response to security incidents",
        included: true
      },
      {
        title: "Compliance Management",
        description: "Ensure adherence to industry regulations",
        included: false
      }
    ],
    
    billingTiers: [
      {
        id: "security-health-basic",
        name: "Basic",
        price: 999.99,
        billingCycle: "monthly",
        perUser: false
      },
      {
        id: "security-health-advanced",
        name: "Advanced",
        price: 1999.99,
        billingCycle: "monthly",
        perUser: false,
        mostPopular: true
      },
      {
        id: "security-health-complete",
        name: "Complete",
        price: 3999.99,
        billingCycle: "monthly",
        perUser: false
      }
    ],
    
    addOns: [
      {
        id: "security-health-compliance",
        name: "Compliance Management",
        description: "Regular audits and reporting for regulatory compliance",
        price: 799.99,
        billingCycle: "monthly",
        perUser: false
      },
      {
        id: "security-health-pentest",
        name: "Quarterly Penetration Testing",
        description: "Thorough security testing by certified ethical hackers",
        price: 2499.99,
        billingCycle: "quarterly",
        perUser: false
      }
    ],
    
    comparisonHighlights: [
      "Enterprise-grade security for organizations of all sizes",
      "Proactive threat hunting finds threats before they activate",
      "Compliance ready for GDPR, HIPAA, PCI DSS, and more",
      "Security talent that would cost over R300K to hire in-house"
    ],
    
    popularityScore: 94,
    testimonials: [
      {
        quote: "Security Health has given us peace of mind knowing our sensitive data is protected from increasingly sophisticated cyber threats.",
        author: "Jennifer Williams",
        company: "First National Bank",
        role: "CISO"
      }
    ]
  },
  {
    id: "data-health",
    name: "Data Health Plan",
    description: "Comprehensive data management and backup solutions to ensure business continuity and disaster recovery",
    tagline: "Your data's guardian",
    heroStatement: "Data loss shouldn't be a matter of 'if', but 'when' - and with our solution, you'll be ready when that day comes.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    
    category: "Secure",
    industries: ["Healthcare", "Financial", "Legal", "Technology", "Education", "Manufacturing"],
    roles: ["CTO", "IT", "Operations", "Data Management"],
    businessOutcomes: ["Risk Reduction", "Compliance", "Reliability"],
    skillsDelivered: ["Data Management", "Disaster Recovery", "Business Continuity"],
    
    runbook: [
      {
        title: "Data Assessment",
        description: "Evaluate your data infrastructure and needs"
      },
      {
        title: "Backup Configuration",
        description: "Implement automated backup solutions",
        hasAITrigger: true
      },
      {
        title: "Recovery Testing",
        description: "Validate recovery processes and timelines"
      },
      {
        title: "Data Policy Development",
        description: "Create comprehensive data management policies"
      },
      {
        title: "Monitoring Setup",
        description: "Implement backup monitoring and alerting"
      }
    ],
    
    features: [
      {
        title: "Automated Backups",
        description: "Scheduled backups with minimal intervention required",
        included: true
      },
      {
        title: "Off-site Data Storage",
        description: "Secure storage in multiple geographic locations",
        included: true
      },
      {
        title: "Rapid Recovery",
        description: "Quick restoration of critical systems and data",
        included: true
      },
      {
        title: "Data Encryption",
        description: "Enterprise-grade encryption for data at rest and in transit",
        included: true
      },
      {
        title: "Compliance Reporting",
        description: "Regular reports to demonstrate regulatory compliance",
        included: false
      }
    ],
    
    billingTiers: [
      {
        id: "data-health-essentials",
        name: "Essentials",
        price: 299.99,
        billingCycle: "monthly",
        perUser: false
      },
      {
        id: "data-health-business",
        name: "Business",
        price: 599.99,
        billingCycle: "monthly",
        perUser: false,
        mostPopular: true
      },
      {
        id: "data-health-enterprise",
        name: "Enterprise",
        price: 1499.99,
        billingCycle: "monthly",
        perUser: false
      }
    ],
    
    addOns: [
      {
        id: "data-health-compliance",
        name: "Compliance Reporting",
        description: "Detailed reporting for regulatory requirements",
        price: 199.99,
        billingCycle: "monthly",
        perUser: false
      },
      {
        id: "data-health-archive",
        name: "Long-term Archiving",
        description: "Durable, long-term data preservation solution",
        price: 0.05,
        billingCycle: "monthly",
        perUser: false
      }
    ],
    
    comparisonHighlights: [
      "Recovery time objectives (RTO) of less than 4 hours",
      "Sub-15-minute recovery point objective (RPO)",
      "Immutable backups resistant to ransomware",
      "Compliance with data retention regulations across industries"
    ],
    
    popularityScore: 86,
    testimonials: [
      {
        quote: "After a ransomware attack hit our industry, we were the only company that recovered in hours instead of weeks, thanks to Data Health.",
        author: "Robert Johnson",
        company: "Midwest Healthcare Group",
        role: "IT Director"
      }
    ]
  },
  {
    id: "cloud-health",
    name: "Cloud Health Plan",
    description: "Expert cloud infrastructure management and optimization services for maximum efficiency and performance",
    tagline: "Your cloud command center",
    heroStatement: "Stop overpaying for unused cloud resources. Optimize your infrastructure and achieve the performance you're actually paying for.",
    thumbnail: "https://images.unsplash.com/photo-1535191042502-e6a9a3d407e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    
    category: "Streamline",
    industries: ["Technology", "E-commerce", "Financial", "Manufacturing", "Healthcare"],
    roles: ["CTO", "IT", "DevOps", "Finance"],
    businessOutcomes: ["Cost Savings", "Productivity", "Reliability", "Innovation"],
    skillsDelivered: ["Cloud Architecture", "Cost Optimization", "Performance Tuning"],
    
    runbook: [
      {
        title: "Cloud Assessment",
        description: "Evaluate your current cloud environment and usage"
      },
      {
        title: "Cost Analysis",
        description: "Identify cost optimization opportunities",
        hasAITrigger: true
      },
      {
        title: "Architecture Optimization",
        description: "Redesign for efficiency and performance"
      },
      {
        title: "Monitoring Implementation",
        description: "Setup comprehensive cloud monitoring"
      },
      {
        title: "Automation Deployment",
        description: "Implement cost-saving automation processes"
      },
      {
        title: "Governance Framework",
        description: "Establish cloud governance and policies"
      }
    ],
    
    features: [
      {
        title: "Cloud Migrations",
        description: "Seamless transitions between cloud providers or from on-premise",
        included: true
      },
      {
        title: "Cost Optimization",
        description: "Continuous monitoring and reduction of cloud expenses",
        included: true
      },
      {
        title: "Performance Monitoring",
        description: "Real-time monitoring and alerts for cloud resources",
        included: true
      },
      {
        title: "Scaling Assistance",
        description: "Automatic scaling to match demand fluctuations",
        included: true
      },
      {
        title: "Multi-cloud Management",
        description: "Unified management across cloud providers",
        included: false
      }
    ],
    
    billingTiers: [
      {
        id: "cloud-health-starter",
        name: "Starter",
        price: 599.99,
        billingCycle: "monthly",
        perUser: false
      },
      {
        id: "cloud-health-business",
        name: "Business",
        price: 999.99,
        billingCycle: "monthly",
        perUser: false,
        mostPopular: true
      },
      {
        id: "cloud-health-enterprise",
        name: "Enterprise",
        price: 2499.99,
        billingCycle: "monthly",
        perUser: false
      }
    ],
    
    addOns: [
      {
        id: "cloud-health-multicloud",
        name: "Multi-cloud Management",
        description: "Unified management for AWS, Azure, GCP, and more",
        price: 399.99,
        billingCycle: "monthly",
        perUser: false
      },
      {
        id: "cloud-health-finops",
        name: "FinOps Dashboard",
        description: "Advanced financial operations tools for cloud spending",
        price: 299.99,
        billingCycle: "monthly",
        perUser: false
      }
    ],
    
    comparisonHighlights: [
      "Average 30% reduction in cloud spending",
      "Support for all major cloud providers",
      "Automated compliance and security scanning",
      "Performance improvements with advanced architecture patterns"
    ],
    
    popularityScore: 90,
    testimonials: [
      {
        quote: "Cloud Health reduced our AWS bill by 42% while improving application performance. It pays for itself many times over.",
        author: "David Garcia",
        company: "E-Commerce Solutions Inc.",
        role: "Cloud Architect"
      }
    ]
  }
];

export const mockPlanSetupProgress: PlanSetupProgress[] = [
  {
    planId: "user-health",
    completedSteps: ["Initial Assessment", "Support Platform Setup"],
    nextSteps: ["User Onboarding", "Asset Inventory", "Go-Live"],
    percentComplete: 40
  },
  {
    planId: "office-health",
    completedSteps: ["Network Assessment"],
    nextSteps: ["Monitoring Setup", "Server Configuration", "Backup Implementation", "Disaster Recovery Planning", "Handover & Training"],
    percentComplete: 16
  }
];

export const mockSubscriptionOptions: SubscriptionOptions = {
  planId: "user-health",
  tierId: "user-health-professional",
  userCount: 25,
  addOns: ["user-health-training"],
  billingCycle: "monthly"
};
