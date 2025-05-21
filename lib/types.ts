
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "customer" | "admin" | "technician";
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: "monthly" | "annually";
  status: "active" | "paused" | "cancelled";
  features: string[];
  renewalDate: string;
}

export interface SavingsCredit {
  id: string;
  amount: number;
  source: string;
  date: string;
  status: "available" | "pending" | "redeemed";
}

// New interface with "rewards" terminology
export interface SavingsReward {
  id: string;
  amount: number;
  source: string;
  date: string;
  status: "available" | "pending" | "redeemed";
}

export interface RedemptionOption {
  id: string;
  name: string;
  description: string;
  creditCost: number;
  estimatedValue: number;
  category: "development" | "implementation" | "mapping" | "integration";
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  date: string;
  icon?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  createdAt: string;
  updatedAt: string;
  category: string;
}

export interface Invoice {
  id: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  issuedDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "template" | "document";
  url: string;
  category: string;
  thumbnail?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "payment" | "system" | "ticket" | "plan" | "reward" | "alert" | "skill";
  priority?: "low" | "medium" | "high" | "critical";
  action?: string;
  actionUrl?: string;
}
