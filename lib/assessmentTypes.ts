
import { ReactNode } from "react";

export interface AssessmentQuestion {
  id: string;
  text: string;
  subText?: string;
  icon: ReactNode;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
}

export interface AssessmentResult {
  maturityLevel: "basic" | "stable" | "smart";
  insights: string[];
  scoreBreakdown: {
    high: number;
    medium: number;
    low: number;
    neutral: number;
  };
}

export interface SavedAssessment {
  id: string;
  date: string;
  result: AssessmentResult;
  answers: Record<string, string>;
  teamId?: string;
  contributors?: TeamMember[];
  comments?: AssessmentComment[];
}

export interface AssessmentPlan {
  id: string;
  title: string;
  description: string;
  price: number;
  benefits: string[];
  priority: "essential" | "recommended" | "optional";
  icon: ReactNode;
}

export interface AssessmentScoreDetails {
  overall: number;
  categories: {
    security: number;
    infrastructure: number;
    support: number;
    dataManagement: number;
    businessAlignment: number;
  };
}

export interface AssessmentRecommendation {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  benefit: string;
  timeEstimate?: string;
  costEstimate?: string;
}

export interface AssessmentReminder {
  id: string;
  userId: string;
  frequency: "weekly" | "monthly" | "quarterly" | "biannually" | "annually" | "custom";
  customDays?: number;
  nextDate: string;
  emailTemplateId: string;
  enabled: boolean;
  createdAt: string;
  lastSent?: string;
  recipients: string[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  createdAt: string;
  ownerId: string;
  description?: string;
  logo?: string;
  members: TeamMember[];
  assessments: string[]; // IDs of team assessments
}

export interface TeamMember {
  userId: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "contributor" | "viewer";
  avatarUrl?: string;
  joinedAt: string;
  lastActive?: string;
}

export interface TeamInvitation {
  id: string;
  teamId: string;
  email: string;
  role: "admin" | "contributor" | "viewer";
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: "pending" | "accepted" | "declined" | "expired";
}

export interface AssessmentComment {
  id: string;
  assessmentId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  parentId?: string;
  questionId?: string;
  replies?: AssessmentComment[];
}
