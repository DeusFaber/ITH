
import { Skill } from "./lmsTypes";

export interface User {
  id: string;
  name: string;
  title: string;
  department: string;
  location: string;
  avatar: string;
  email: string;
  phone?: string;
  skills: UserSkill[];
  recentAchievements: Achievement[];
  teamId?: string;
  certificateIds: string[];
  joinDate: string;
  lastActive: string;
}

export interface UserSkill {
  id: string;
  name: string;
  level: number; // 1-5
  endorsements: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  dateEarned: string;
  iconUrl?: string;
  type: "certificate" | "badge" | "milestone";
}

export interface Team {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  memberIds: string[];
  departmentId: string;
}

// Mock Data
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Sarah Johnson",
    title: "IT Support Manager",
    department: "IT",
    location: "Cape Town",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
    email: "sarah.johnson@example.com",
    phone: "+27 82 555 1234",
    skills: [
      { id: "skill-1", name: "IT Support", level: 5, endorsements: 24 },
      { id: "skill-2", name: "Cybersecurity", level: 4, endorsements: 18 },
      { id: "skill-3", name: "Windows Server", level: 4, endorsements: 15 },
      { id: "skill-4", name: "Help Desk Management", level: 5, endorsements: 20 }
    ],
    recentAchievements: [
      {
        id: "ach-1",
        name: "IT Support Expert",
        description: "Completed the IT Support Expert certification",
        dateEarned: "2025-04-10",
        type: "certificate"
      },
      {
        id: "ach-2",
        name: "Team Leader",
        description: "Managed a team of 5+ support specialists",
        dateEarned: "2025-03-15",
        type: "badge"
      },
      {
        id: "ach-3",
        name: "Problem Solver",
        description: "Resolved 100+ critical support tickets",
        dateEarned: "2025-02-20",
        type: "badge"
      }
    ],
    teamId: "team-1",
    certificateIds: ["cert-1", "cert-2", "cert-5"],
    joinDate: "2024-01-15",
    lastActive: "2025-05-18"
  },
  {
    id: "user-2",
    name: "David Kim",
    title: "Senior Developer",
    department: "Development",
    location: "Johannesburg",
    avatar: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=2864&auto=format&fit=crop",
    email: "david.kim@example.com",
    phone: "+27 83 555 5678",
    skills: [
      { id: "skill-5", name: "React", level: 5, endorsements: 30 },
      { id: "skill-6", name: "TypeScript", level: 5, endorsements: 25 },
      { id: "skill-7", name: "Azure", level: 4, endorsements: 20 },
      { id: "skill-8", name: "DevOps", level: 3, endorsements: 15 },
      { id: "skill-9", name: "Automation", level: 4, endorsements: 22 }
    ],
    recentAchievements: [
      {
        id: "ach-4",
        name: "Code Wizard",
        description: "Developed 10+ high-performance applications",
        dateEarned: "2025-04-20",
        type: "badge"
      },
      {
        id: "ach-5",
        name: "Azure Solutions Architect",
        description: "Earned the Azure Solutions Architect certification",
        dateEarned: "2025-03-05",
        type: "certificate"
      }
    ],
    teamId: "team-4",
    certificateIds: ["cert-3", "cert-7"],
    joinDate: "2023-11-10",
    lastActive: "2025-05-17"
  },
  {
    id: "user-3",
    name: "Emily Rodriguez",
    title: "Financial Controller",
    department: "Finance",
    location: "Cape Town",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2861&auto=format&fit=crop",
    email: "emily.rodriguez@example.com",
    skills: [
      { id: "skill-10", name: "Financial Analysis", level: 5, endorsements: 28 },
      { id: "skill-11", name: "Office 365", level: 4, endorsements: 20 },
      { id: "skill-12", name: "Power BI", level: 5, endorsements: 25 },
      { id: "skill-13", name: "ERP Systems", level: 4, endorsements: 18 }
    ],
    recentAchievements: [
      {
        id: "ach-6",
        name: "Financial Reporting Expert",
        description: "Implemented advanced financial reporting systems",
        dateEarned: "2025-05-01",
        type: "badge"
      },
      {
        id: "ach-7",
        name: "Power BI Certified",
        description: "Earned Power BI certification",
        dateEarned: "2025-02-15",
        type: "certificate"
      }
    ],
    teamId: "team-3",
    certificateIds: ["cert-4", "cert-8"],
    joinDate: "2024-02-20",
    lastActive: "2025-05-16"
  },
  {
    id: "user-4",
    name: "Michael Chen",
    title: "Marketing Director",
    department: "Marketing",
    location: "Durban",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2940&auto=format&fit=crop",
    email: "michael.chen@example.com",
    phone: "+27 84 555 9012",
    skills: [
      { id: "skill-14", name: "Digital Marketing", level: 5, endorsements: 32 },
      { id: "skill-15", name: "Content Strategy", level: 5, endorsements: 30 },
      { id: "skill-16", name: "Office 365", level: 3, endorsements: 15 },
      { id: "skill-17", name: "Marketing Automation", level: 4, endorsements: 22 }
    ],
    recentAchievements: [
      {
        id: "ach-8",
        name: "Marketing Excellence",
        description: "Led campaign with 150% ROI",
        dateEarned: "2025-04-05",
        type: "badge"
      },
      {
        id: "ach-9",
        name: "Digital Transformation Leader",
        description: "Implemented digital marketing strategy",
        dateEarned: "2025-01-20",
        type: "milestone"
      }
    ],
    teamId: "team-2",
    certificateIds: ["cert-6"],
    joinDate: "2023-09-15",
    lastActive: "2025-05-18"
  },
  {
    id: "user-5",
    name: "Amanda Khumalo",
    title: "Cybersecurity Specialist",
    department: "IT",
    location: "Cape Town",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop",
    email: "amanda.khumalo@example.com",
    skills: [
      { id: "skill-18", name: "Cybersecurity", level: 5, endorsements: 35 },
      { id: "skill-19", name: "Penetration Testing", level: 4, endorsements: 28 },
      { id: "skill-20", name: "Security Compliance", level: 5, endorsements: 30 },
      { id: "skill-21", name: "Risk Assessment", level: 4, endorsements: 25 }
    ],
    recentAchievements: [
      {
        id: "ach-10",
        name: "Security Champion",
        description: "Prevented major security breach",
        dateEarned: "2025-05-10",
        type: "badge"
      },
      {
        id: "ach-11",
        name: "CISSP Certified",
        description: "Earned CISSP certification",
        dateEarned: "2025-03-22",
        type: "certificate"
      }
    ],
    teamId: "team-1",
    certificateIds: ["cert-2", "cert-9"],
    joinDate: "2024-01-05",
    lastActive: "2025-05-17"
  },
  {
    id: "user-6",
    name: "Robert Ndlovu",
    title: "Help Desk Specialist",
    department: "IT",
    location: "Johannesburg",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2787&auto=format&fit=crop",
    email: "robert.ndlovu@example.com",
    phone: "+27 82 555 3456",
    skills: [
      { id: "skill-22", name: "IT Support", level: 4, endorsements: 22 },
      { id: "skill-23", name: "Hardware Troubleshooting", level: 5, endorsements: 28 },
      { id: "skill-24", name: "Windows OS", level: 4, endorsements: 20 },
      { id: "skill-25", name: "Customer Service", level: 5, endorsements: 25 }
    ],
    recentAchievements: [
      {
        id: "ach-12",
        name: "Support Specialist",
        description: "Maintained 98% customer satisfaction",
        dateEarned: "2025-04-15",
        type: "badge"
      },
      {
        id: "ach-13",
        name: "First Response Expert",
        description: "Achieved fastest ticket response times",
        dateEarned: "2025-02-28",
        type: "milestone"
      }
    ],
    teamId: "team-1",
    certificateIds: ["cert-1"],
    joinDate: "2024-03-10",
    lastActive: "2025-05-18"
  },
  {
    id: "user-7",
    name: "Jessica Peters",
    title: "Business Analyst",
    department: "Operations",
    location: "Pretoria",
    avatar: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?q=80&w=2689&auto=format&fit=crop",
    email: "jessica.peters@example.com",
    skills: [
      { id: "skill-26", name: "Process Mapping", level: 5, endorsements: 30 },
      { id: "skill-27", name: "Office 365", level: 4, endorsements: 22 },
      { id: "skill-28", name: "Power Platform", level: 4, endorsements: 25 },
      { id: "skill-29", name: "Automation", level: 3, endorsements: 18 }
    ],
    recentAchievements: [
      {
        id: "ach-14",
        name: "Process Optimization",
        description: "Improved efficiency by 35%",
        dateEarned: "2025-03-30",
        type: "milestone"
      },
      {
        id: "ach-15",
        name: "Power Platform Champion",
        description: "Developed 10+ business automation solutions",
        dateEarned: "2025-01-25",
        type: "badge"
      }
    ],
    teamId: "team-5",
    certificateIds: ["cert-10"],
    joinDate: "2023-11-05",
    lastActive: "2025-05-16"
  },
  {
    id: "user-8",
    name: "Thabo Mbeki",
    title: "Office Administrator",
    department: "Administration",
    location: "Cape Town",
    avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=2787&auto=format&fit=crop",
    email: "thabo.mbeki@example.com",
    phone: "+27 83 555 7890",
    skills: [
      { id: "skill-30", name: "Office 365", level: 5, endorsements: 28 },
      { id: "skill-31", name: "Document Management", level: 4, endorsements: 20 },
      { id: "skill-32", name: "SharePoint", level: 3, endorsements: 15 },
      { id: "skill-33", name: "Administrative Support", level: 5, endorsements: 25 }
    ],
    recentAchievements: [
      {
        id: "ach-16",
        name: "Office 365 Expert",
        description: "Implemented advanced document workflows",
        dateEarned: "2025-05-05",
        type: "badge"
      },
      {
        id: "ach-17",
        name: "SharePoint Administrator",
        description: "Restructured company intranet",
        dateEarned: "2025-02-10",
        type: "certificate"
      }
    ],
    teamId: "team-6",
    certificateIds: ["cert-11"],
    joinDate: "2024-02-15",
    lastActive: "2025-05-17"
  }
];

export const mockTeams = [
  {
    id: "team-1",
    name: "IT Support Team",
    description: "Provides technical support and assistance for IT issues",
    leaderId: "user-1",
    memberIds: ["user-1", "user-5", "user-6"],
    departmentId: "dept-1"
  },
  {
    id: "team-2",
    name: "Marketing Team",
    description: "Develops and implements marketing strategies",
    leaderId: "user-4",
    memberIds: ["user-4"],
    departmentId: "dept-2"
  },
  {
    id: "team-3",
    name: "Finance Team",
    description: "Manages financial planning and reporting",
    leaderId: "user-3",
    memberIds: ["user-3"],
    departmentId: "dept-3"
  },
  {
    id: "team-4",
    name: "Development Team",
    description: "Designs and develops software applications",
    leaderId: "user-2",
    memberIds: ["user-2"],
    departmentId: "dept-4"
  },
  {
    id: "team-5",
    name: "Operations Team",
    description: "Oversees day-to-day business operations",
    leaderId: "user-7",
    memberIds: ["user-7"],
    departmentId: "dept-5"
  },
  {
    id: "team-6",
    name: "Administration Team",
    description: "Provides administrative support across departments",
    leaderId: "user-8",
    memberIds: ["user-8"],
    departmentId: "dept-6"
  }
];
