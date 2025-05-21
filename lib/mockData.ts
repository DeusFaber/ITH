
import { 
  User, 
  Plan, 
  SavingsCredit,
  SavingsReward,
  RedemptionOption, 
  ActivityLog, 
  Ticket,
  Invoice,
  Resource,
  Notification
} from "./types";

export const mockUser: User = {
  id: "user-1",
  name: "John Smith",
  email: "john@acme.com",
  role: "customer"
};

export const mockPlans: Plan[] = [
  {
    id: "plan-1",
    name: "User Health",
    description: "IT support for your team members with responsive helpdesk and troubleshooting",
    price: 49.99,
    billingCycle: "monthly",
    status: "active",
    features: [
      "24/7 IT Help Desk",
      "Remote Support",
      "Device Management",
      "Security Monitoring"
    ],
    renewalDate: "2025-08-18"
  },
  {
    id: "plan-2",
    name: "Office Health",
    description: "Infrastructure monitoring and management for your office environment",
    price: 99.99,
    billingCycle: "monthly",
    status: "active",
    features: [
      "Network Monitoring",
      "Server Management",
      "Backup Solutions",
      "Cloud Integrations"
    ],
    renewalDate: "2025-08-18"
  }
];

// Keep this for backward compatibility
export const mockSavingsCredits: SavingsCredit[] = [
  {
    id: "credit-1",
    amount: 250,
    source: "Monthly User Health Subscription",
    date: "2025-05-01",
    status: "available"
  },
  {
    id: "credit-2",
    amount: 500,
    source: "Monthly Office Health Subscription",
    date: "2025-05-01",
    status: "available"
  },
  {
    id: "credit-3",
    amount: 750,
    source: "Quarterly Loyalty Bonus",
    date: "2025-04-15",
    status: "available"
  },
  {
    id: "credit-4",
    amount: 1000,
    source: "Annual Plan Renewal",
    date: "2025-01-10",
    status: "redeemed"
  }
];

// New array with "rewards" terminology
export const mockSavingsRewards: SavingsReward[] = [
  {
    id: "reward-1",
    amount: 250,
    source: "Monthly User Health Subscription",
    date: "2025-05-01",
    status: "available"
  },
  {
    id: "reward-2",
    amount: 500,
    source: "Monthly Office Health Subscription",
    date: "2025-05-01",
    status: "available"
  },
  {
    id: "reward-3",
    amount: 750,
    source: "Quarterly Loyalty Bonus",
    date: "2025-04-15",
    status: "available"
  },
  {
    id: "reward-4",
    amount: 1000,
    source: "Annual Plan Renewal",
    date: "2025-01-10",
    status: "redeemed"
  }
];

export const mockRedemptionOptions: RedemptionOption[] = [
  {
    id: "redemption-1",
    name: "Website Development",
    description: "Professional website design and development for your business",
    creditCost: 5000,
    estimatedValue: 8000,
    category: "development"
  },
  {
    id: "redemption-2",
    name: "CRM Implementation",
    description: "Setup and configuration of customer relationship management software",
    creditCost: 3500,
    estimatedValue: 5500,
    category: "implementation"
  },
  {
    id: "redemption-3",
    name: "Workflow Mapping",
    description: "Analysis and optimization of your business processes",
    creditCost: 2000,
    estimatedValue: 3200,
    category: "mapping"
  },
  {
    id: "redemption-4",
    name: "AI Integration",
    description: "Implement AI solutions to automate tasks and improve efficiency",
    creditCost: 4000,
    estimatedValue: 6500,
    category: "integration"
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "log-1",
    action: "Plan Update",
    description: "Added User Health plan to your subscription",
    date: "2025-05-15T14:30:00Z"
  },
  {
    id: "log-2",
    action: "Support Ticket",
    description: "Submitted new support ticket: Network connectivity issues",
    date: "2025-05-14T10:15:00Z"
  },
  {
    id: "log-3",
    action: "Reward Earned",
    description: "Earned 250 savings rewards from monthly subscription",
    date: "2025-05-01T00:00:00Z"
  },
  {
    id: "log-4",
    action: "Payment",
    description: "Processed monthly payment of R149.98",
    date: "2025-05-01T00:00:00Z"
  },
  {
    id: "log-5",
    action: "Redemption",
    description: "Redeemed 1000 rewards for Website Development",
    date: "2025-04-20T11:45:00Z"
  }
];

export const mockTickets: Ticket[] = [
  {
    id: "ticket-1",
    title: "Network connectivity issues",
    description: "Our office internet connection keeps dropping intermittently",
    status: "in-progress",
    priority: "high",
    createdAt: "2025-05-14T10:15:00Z",
    updatedAt: "2025-05-15T08:30:00Z",
    category: "Network"
  },
  {
    id: "ticket-2",
    title: "Email configuration for new employee",
    description: "Need to set up email account for Jane Doe who is starting next week",
    status: "open",
    priority: "medium",
    createdAt: "2025-05-16T09:20:00Z",
    updatedAt: "2025-05-16T09:20:00Z",
    category: "Email"
  },
  {
    id: "ticket-3",
    title: "Printer not working",
    description: "The main office printer is showing error code 5100",
    status: "resolved",
    priority: "low",
    createdAt: "2025-05-10T14:45:00Z",
    updatedAt: "2025-05-11T11:30:00Z",
    category: "Hardware"
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: "inv-20250501",
    amount: 149.98,
    status: "paid",
    dueDate: "2025-05-15",
    issuedDate: "2025-05-01",
    items: [
      {
        description: "User Health Plan - Monthly Subscription",
        quantity: 1,
        unitPrice: 49.99,
        total: 49.99
      },
      {
        description: "Office Health Plan - Monthly Subscription",
        quantity: 1,
        unitPrice: 99.99,
        total: 99.99
      }
    ]
  },
  {
    id: "inv-20250401",
    amount: 149.98,
    status: "paid",
    dueDate: "2025-04-15",
    issuedDate: "2025-04-01",
    items: [
      {
        description: "User Health Plan - Monthly Subscription",
        quantity: 1,
        unitPrice: 49.99,
        total: 49.99
      },
      {
        description: "Office Health Plan - Monthly Subscription",
        quantity: 1,
        unitPrice: 99.99,
        total: 99.99
      }
    ]
  },
  {
    id: "inv-20250301",
    amount: 149.98,
    status: "paid",
    dueDate: "2025-03-15",
    issuedDate: "2025-03-01",
    items: [
      {
        description: "User Health Plan - Monthly Subscription",
        quantity: 1,
        unitPrice: 49.99,
        total: 49.99
      },
      {
        description: "Office Health Plan - Monthly Subscription",
        quantity: 1,
        unitPrice: 99.99,
        total: 99.99
      }
    ]
  }
];

export const mockResources: Resource[] = [
  {
    id: "resource-1",
    title: "IT Security Best Practices",
    description: "Learn how to keep your business safe from cyber threats",
    type: "article",
    url: "/resources/security-best-practices",
    category: "Security"
  },
  {
    id: "resource-2",
    title: "Cloud Migration Guide",
    description: "Step-by-step process for moving your infrastructure to the cloud",
    type: "document",
    url: "/resources/cloud-migration-guide",
    category: "Cloud"
  },
  {
    id: "resource-3",
    title: "Employee Onboarding Template",
    description: "Checklist for IT setup when onboarding new team members",
    type: "template",
    url: "/resources/onboarding-template",
    category: "Templates"
  },
  {
    id: "resource-4",
    title: "Remote Work IT Setup",
    description: "Video guide for setting up secure remote workstations",
    type: "video",
    url: "/resources/remote-work-setup",
    category: "Remote Work"
  }
];

// Skill requirement notifications
export const mockSkillRequirements: Notification[] = [
  {
    id: "skill-req-1",
    title: "Cloud Infrastructure Skills Update Required",
    message: "Your Cloud Infrastructure skills need updating to maintain certification",
    date: "2025-05-18T09:15:00Z",
    read: false,
    type: "skill",
    priority: "high",
    action: "Take Assessment",
    actionUrl: "/resources?assessment=cloud"
  },
  {
    id: "skill-req-2",
    title: "Cybersecurity Training Needed",
    message: "New security protocols require updated training. Complete by June 1.",
    date: "2025-05-17T14:30:00Z",
    read: false,
    type: "skill",
    priority: "medium",
    action: "Start Training",
    actionUrl: "/resources?course=security-2023"
  },
  {
    id: "skill-req-3",
    title: "Windows Server Certification Expiring",
    message: "Your Windows Server certification will expire in 30 days",
    date: "2025-05-16T11:45:00Z",
    read: false,
    type: "skill",
    priority: "medium",
    action: "Renew Certification",
    actionUrl: "/resources?certification=windows-server"
  }
];

// System alerts notifications
export const mockAlerts: Notification[] = [
  {
    id: "alert-1",
    title: "Critical Security Alert",
    message: "Potential security breach detected in your network",
    date: "2025-05-19T07:30:00Z",
    read: false,
    type: "alert",
    priority: "critical",
    action: "Review Details",
    actionUrl: "/security/alerts/breach-05-19"
  },
  {
    id: "alert-2",
    title: "Server Performance Degradation",
    message: "Main application server showing signs of performance issues",
    date: "2025-05-18T16:45:00Z",
    read: false,
    type: "alert",
    priority: "high",
    action: "View Performance Metrics",
    actionUrl: "/server/metrics"
  },
  {
    id: "alert-3",
    title: "Backup Failure",
    message: "Last night's automated backup failed to complete",
    date: "2025-05-18T08:15:00Z",
    read: true,
    type: "alert",
    priority: "high",
    action: "Restart Backup",
    actionUrl: "/backup/manual"
  },
  {
    id: "alert-4",
    title: "SSL Certificate Expiring",
    message: "Your primary domain SSL certificate will expire in 14 days",
    date: "2025-05-17T10:20:00Z",
    read: false,
    type: "alert",
    priority: "medium",
    action: "Renew Certificate",
    actionUrl: "/ssl/renew"
  }
];

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "Payment Reminder",
    message: "Your invoice #inv-20250601 is due in 5 days",
    date: "2025-05-15T09:00:00Z",
    read: false,
    type: "payment"
  },
  {
    id: "notif-2",
    title: "Support Ticket Update",
    message: "Your ticket #ticket-1 has been updated with a new comment",
    date: "2025-05-15T08:45:00Z",
    read: false,
    type: "ticket"
  },
  {
    id: "notif-3",
    title: "System Maintenance",
    message: "Scheduled maintenance on May 20, 2025 from 2-4 AM",
    date: "2025-05-13T10:30:00Z",
    read: true,
    type: "system"
  },
  {
    id: "notif-4",
    title: "Rewards Available",
    message: "You have 1,500 savings rewards available to redeem",
    date: "2025-05-10T14:15:00Z",
    read: true,
    type: "reward"
  },
  {
    id: "notif-5",
    title: "Plan Recommendation",
    message: "Based on your usage, you might benefit from our Enterprise plan",
    date: "2025-05-05T11:20:00Z",
    read: true,
    type: "plan"
  },
  ...mockSkillRequirements,
  ...mockAlerts
];
