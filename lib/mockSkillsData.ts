
// Skill levels
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

// Skill categories
export type SkillCategory = 
  | "infrastructure" 
  | "security" 
  | "networking" 
  | "cloud" 
  | "development" 
  | "data" 
  | "leadership" 
  | "project_management"
  | "support";

// Skill object
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  level: SkillLevel;
  progress: number; // 0-100
  lastAssessed?: string; // ISO date string
  endorsed: number;
  isVerified?: boolean;
}

// Learning path
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  skillsImproved: string[]; // Skill IDs
  duration: string; // e.g., "4 weeks"
  difficulty: "beginner" | "intermediate" | "advanced";
  popularity: number; // 0-100
  enrolledCount: number;
  completionRate: number; // 0-100
  courses: Course[];
}

// Course
export interface Course {
  id: string;
  title: string;
  provider: string;
  description: string;
  duration: string;
  format: "video" | "interactive" | "document" | "webinar" | "workshop";
  skillsImproved: string[]; // Skill IDs
  rating: number; // 0-5
  reviewCount: number;
  isPopular?: boolean;
  isRecommended?: boolean;
  image?: string;
  url?: string;
}

// Certification
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  description: string;
  skillsCovered: string[]; // Skill IDs
  earnedDate?: string; // ISO date string if earned, undefined if not
  expiryDate?: string; // ISO date string if applicable
  isActive?: boolean;
  image?: string;
  credentialId?: string;
}

// Team Member Skills
export interface TeamMemberSkill {
  userId: string;
  name: string;
  role: string;
  avatar: string;
  skills: {
    skillId: string;
    level: SkillLevel;
    endorsements: number;
  }[];
}

// Skills Assessment
export interface SkillAssessment {
  id: string;
  title: string;
  description: string;
  skillsAssessed: string[]; // Skill IDs
  duration: string;
  questionCount: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  completedDate?: string; // ISO date string if completed
  score?: number; // 0-100 if completed
}

// Skill Statistics
export interface SkillStatistics {
  totalSkills: number;
  expertSkills: number;
  advancedSkills: number;
  intermediateSkills: number;
  beginnerSkills: number;
  mostProficientCategory: SkillCategory;
  leastProficientCategory: SkillCategory;
  skillsInProgress: number;
  skillsImprovedLastMonth: number;
  recommendedCourses: number;
  certificationsPending: number;
  certificationsActive: number;
}

// Mock user skills data
export const mockUserSkills: Skill[] = [
  {
    id: "skill-1",
    name: "Network Security",
    category: "security",
    description: "Protecting networks from intrusion, unauthorized access, and ensuring data security",
    level: "advanced",
    progress: 85,
    lastAssessed: "2025-04-15T09:30:00Z",
    endorsed: 7,
    isVerified: true
  },
  {
    id: "skill-2",
    name: "Cloud Infrastructure",
    category: "cloud",
    description: "Designing, deploying, and managing cloud-based infrastructure",
    level: "intermediate",
    progress: 68,
    lastAssessed: "2025-04-02T14:45:00Z",
    endorsed: 5,
    isVerified: true
  },
  {
    id: "skill-3",
    name: "Windows Server Management",
    category: "infrastructure",
    description: "Managing and maintaining Windows Server environments",
    level: "expert",
    progress: 95,
    lastAssessed: "2025-03-21T11:20:00Z",
    endorsed: 12,
    isVerified: true
  },
  {
    id: "skill-4",
    name: "Linux Administration",
    category: "infrastructure",
    description: "Managing Linux systems and services",
    level: "intermediate",
    progress: 72,
    lastAssessed: "2025-03-18T10:15:00Z",
    endorsed: 4
  },
  {
    id: "skill-5",
    name: "Data Backup & Recovery",
    category: "data",
    description: "Implementing and managing data backup solutions and recovery procedures",
    level: "advanced",
    progress: 88,
    lastAssessed: "2025-04-05T16:30:00Z",
    endorsed: 9,
    isVerified: true
  },
  {
    id: "skill-6",
    name: "IT Project Management",
    category: "project_management",
    description: "Planning, executing, and closing IT projects",
    level: "intermediate",
    progress: 65,
    lastAssessed: "2025-02-28T13:00:00Z",
    endorsed: 6
  },
  {
    id: "skill-7",
    name: "Virtualization",
    category: "infrastructure",
    description: "Creating and managing virtual machines and environments",
    level: "advanced",
    progress: 82,
    lastAssessed: "2025-03-12T09:45:00Z",
    endorsed: 8,
    isVerified: true
  },
  {
    id: "skill-8",
    name: "Firewall Configuration",
    category: "security",
    description: "Setting up and managing firewalls to secure network boundaries",
    level: "intermediate",
    progress: 70,
    lastAssessed: "2025-04-08T11:30:00Z",
    endorsed: 3
  },
  {
    id: "skill-9",
    name: "AWS Cloud Services",
    category: "cloud",
    description: "Using Amazon Web Services for cloud computing",
    level: "beginner",
    progress: 40,
    lastAssessed: "2025-04-10T15:20:00Z",
    endorsed: 1
  },
  {
    id: "skill-10",
    name: "Microsoft Azure",
    category: "cloud",
    description: "Using Microsoft Azure cloud platform",
    level: "beginner",
    progress: 35,
    lastAssessed: "2025-04-09T10:00:00Z",
    endorsed: 2
  },
  {
    id: "skill-11",
    name: "Active Directory",
    category: "infrastructure",
    description: "Managing user accounts, permissions, and security",
    level: "expert",
    progress: 92,
    lastAssessed: "2025-03-15T13:45:00Z",
    endorsed: 10,
    isVerified: true
  },
  {
    id: "skill-12",
    name: "Helpdesk Support",
    category: "support",
    description: "Providing technical assistance and support to users",
    level: "expert",
    progress: 98,
    lastAssessed: "2025-02-20T09:30:00Z",
    endorsed: 15,
    isVerified: true
  },
  {
    id: "skill-13",
    name: "SQL Database Management",
    category: "data",
    description: "Managing and querying SQL databases",
    level: "intermediate",
    progress: 75,
    lastAssessed: "2025-03-25T14:15:00Z",
    endorsed: 4
  },
  {
    id: "skill-14",
    name: "Cybersecurity Analysis",
    category: "security",
    description: "Analyzing security threats and implementing counter-measures",
    level: "intermediate",
    progress: 68,
    lastAssessed: "2025-04-12T11:30:00Z",
    endorsed: 5
  },
  {
    id: "skill-15",
    name: "Team Leadership",
    category: "leadership",
    description: "Leading and managing IT teams effectively",
    level: "advanced",
    progress: 80,
    lastAssessed: "2025-03-10T16:00:00Z",
    endorsed: 7
  }
];

// Mock learning paths
export const mockLearningPaths: LearningPath[] = [
  {
    id: "path-1",
    title: "Cloud Computing Essentials",
    description: "Master the fundamentals of cloud computing with focus on major platforms",
    skillsImproved: ["skill-2", "skill-9", "skill-10"],
    duration: "6 weeks",
    difficulty: "intermediate",
    popularity: 92,
    enrolledCount: 348,
    completionRate: 78,
    courses: [
      {
        id: "course-1",
        title: "Introduction to Cloud Computing",
        provider: "CloudAcademy",
        description: "Learn the basics of cloud computing concepts and models",
        duration: "3 hours",
        format: "video",
        skillsImproved: ["skill-2"],
        rating: 4.7,
        reviewCount: 128,
        isPopular: true,
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "course-2",
        title: "AWS Fundamentals",
        provider: "Amazon Web Services",
        description: "Learn the core services and features of Amazon Web Services",
        duration: "8 hours",
        format: "interactive",
        skillsImproved: ["skill-9"],
        rating: 4.8,
        reviewCount: 256,
        isRecommended: true,
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "course-3",
        title: "Microsoft Azure Basics",
        provider: "Microsoft Learn",
        description: "Getting started with Microsoft Azure cloud services",
        duration: "6 hours",
        format: "interactive",
        skillsImproved: ["skill-10"],
        rating: 4.6,
        reviewCount: 198,
        image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=500&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "path-2",
    title: "Advanced Network Security",
    description: "Deepen your understanding of network security principles and practices",
    skillsImproved: ["skill-1", "skill-8", "skill-14"],
    duration: "8 weeks",
    difficulty: "advanced",
    popularity: 85,
    enrolledCount: 216,
    completionRate: 65,
    courses: [
      {
        id: "course-4",
        title: "Enterprise Firewall Management",
        provider: "CyberSecurity Institute",
        description: "Learn advanced techniques for firewall configuration and management",
        duration: "5 hours",
        format: "video",
        skillsImproved: ["skill-8"],
        rating: 4.5,
        reviewCount: 78,
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "course-5",
        title: "Threat Detection and Response",
        provider: "SecOps Training",
        description: "Identify security threats and implement effective response strategies",
        duration: "10 hours",
        format: "interactive",
        skillsImproved: ["skill-1", "skill-14"],
        rating: 4.9,
        reviewCount: 112,
        isRecommended: true,
        image: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "course-6",
        title: "Penetration Testing Workshop",
        provider: "Ethical Hacking Academy",
        description: "Hands-on course for identifying vulnerabilities in network security",
        duration: "12 hours",
        format: "workshop",
        skillsImproved: ["skill-14"],
        rating: 4.7,
        reviewCount: 95,
        isPopular: true,
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=500&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "path-3",
    title: "Infrastructure Management Mastery",
    description: "Comprehensive training on modern IT infrastructure management",
    skillsImproved: ["skill-3", "skill-4", "skill-7", "skill-11"],
    duration: "10 weeks",
    difficulty: "intermediate",
    popularity: 88,
    enrolledCount: 275,
    completionRate: 72,
    courses: [
      {
        id: "course-7",
        title: "Windows Server 2022 Administration",
        provider: "Microsoft Learning",
        description: "Deep dive into managing Windows Server environments",
        duration: "15 hours",
        format: "interactive",
        skillsImproved: ["skill-3"],
        rating: 4.6,
        reviewCount: 156,
        image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "course-8",
        title: "Linux System Administration",
        provider: "Linux Academy",
        description: "Master Linux administration for enterprise environments",
        duration: "12 hours",
        format: "video",
        skillsImproved: ["skill-4"],
        rating: 4.8,
        reviewCount: 187,
        isRecommended: true,
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "course-9",
        title: "VMware vSphere: Optimize and Scale",
        provider: "VMware Education",
        description: "Advanced virtualization techniques for enterprise environments",
        duration: "18 hours",
        format: "workshop",
        skillsImproved: ["skill-7"],
        rating: 4.7,
        reviewCount: 124,
        isPopular: true,
        image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=500&auto=format&fit=crop"
      }
    ]
  }
];

// Mock certifications
export const mockCertifications: Certification[] = [
  {
    id: "cert-1",
    name: "CompTIA Security+",
    issuer: "CompTIA",
    description: "Validates baseline skills needed to perform core security functions",
    skillsCovered: ["skill-1", "skill-8", "skill-14"],
    earnedDate: "2024-06-15T00:00:00Z",
    expiryDate: "2027-06-15T00:00:00Z",
    isActive: true,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=500&auto=format&fit=crop",
    credentialId: "COMP001-123456"
  },
  {
    id: "cert-2",
    name: "Microsoft Certified: Azure Administrator",
    issuer: "Microsoft",
    description: "Validates the skills and knowledge to implement, manage, and monitor an organization's Microsoft Azure environment",
    skillsCovered: ["skill-10"],
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "cert-3",
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    description: "Validates technical expertise in designing and deploying scalable systems on AWS",
    skillsCovered: ["skill-9"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "cert-4",
    name: "Certified Information Systems Security Professional (CISSP)",
    issuer: "ISC²",
    description: "Advanced certification for IT security professionals",
    skillsCovered: ["skill-1", "skill-14"],
    earnedDate: "2023-09-10T00:00:00Z",
    expiryDate: "2026-09-10T00:00:00Z",
    isActive: true,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=500&auto=format&fit=crop",
    credentialId: "ISC2-CISSP-987654"
  },
  {
    id: "cert-5",
    name: "Microsoft Certified: Windows Server",
    issuer: "Microsoft",
    description: "Validates skills in managing Windows Server environments",
    skillsCovered: ["skill-3", "skill-11"],
    earnedDate: "2024-02-20T00:00:00Z",
    expiryDate: "2027-02-20T00:00:00Z",
    isActive: true,
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=500&auto=format&fit=crop",
    credentialId: "MS-WS-345678"
  },
  {
    id: "cert-6",
    name: "VMware Certified Professional",
    issuer: "VMware",
    description: "Validates skills in virtualization using VMware products",
    skillsCovered: ["skill-7"],
    earnedDate: "2023-05-15T00:00:00Z",
    expiryDate: "2026-05-15T00:00:00Z",
    isActive: true,
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=500&auto=format&fit=crop",
    credentialId: "VMW-VCP-234567"
  },
  {
    id: "cert-7",
    name: "Certified Information Systems Auditor (CISA)",
    issuer: "ISACA",
    description: "Certification for IT audit, control, and security professionals",
    skillsCovered: ["skill-14"],
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=500&auto=format&fit=crop"
  }
];

// Mock team member skills
export const mockTeamSkills: TeamMemberSkill[] = [
  {
    userId: "u-123456",
    name: "John Smith",
    role: "IT Manager",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    skills: [
      { skillId: "skill-1", level: "advanced", endorsements: 7 },
      { skillId: "skill-2", level: "intermediate", endorsements: 5 },
      { skillId: "skill-3", level: "expert", endorsements: 12 },
      { skillId: "skill-6", level: "intermediate", endorsements: 6 },
      { skillId: "skill-15", level: "advanced", endorsements: 7 }
    ]
  },
  {
    userId: "u-234567",
    name: "Emily Johnson",
    role: "Network Administrator",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: [
      { skillId: "skill-1", level: "expert", endorsements: 15 },
      { skillId: "skill-8", level: "expert", endorsements: 12 },
      { skillId: "skill-14", level: "advanced", endorsements: 9 },
      { skillId: "skill-4", level: "intermediate", endorsements: 5 }
    ]
  },
  {
    userId: "u-345678",
    name: "Michael Lee",
    role: "Systems Administrator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: [
      { skillId: "skill-3", level: "expert", endorsements: 14 },
      { skillId: "skill-4", level: "advanced", endorsements: 10 },
      { skillId: "skill-7", level: "expert", endorsements: 12 },
      { skillId: "skill-11", level: "expert", endorsements: 11 }
    ]
  },
  {
    userId: "u-456789",
    name: "Sarah Williams",
    role: "Security Specialist",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: [
      { skillId: "skill-1", level: "expert", endorsements: 18 },
      { skillId: "skill-8", level: "expert", endorsements: 15 },
      { skillId: "skill-14", level: "expert", endorsements: 17 }
    ]
  },
  {
    userId: "u-567890",
    name: "David Chen",
    role: "Cloud Architect",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: [
      { skillId: "skill-2", level: "expert", endorsements: 16 },
      { skillId: "skill-9", level: "expert", endorsements: 14 },
      { skillId: "skill-10", level: "expert", endorsements: 15 }
    ]
  }
];

// Mock skill assessments
export const mockSkillAssessments: SkillAssessment[] = [
  {
    id: "assessment-1",
    title: "Network Security Fundamentals",
    description: "Assess your knowledge of core network security concepts",
    skillsAssessed: ["skill-1", "skill-8"],
    duration: "30 minutes",
    questionCount: 25,
    difficulty: "intermediate",
    completedDate: "2025-04-15T09:30:00Z",
    score: 85
  },
  {
    id: "assessment-2",
    title: "Cloud Computing Essentials",
    description: "Test your understanding of cloud computing fundamentals",
    skillsAssessed: ["skill-2", "skill-9", "skill-10"],
    duration: "45 minutes",
    questionCount: 30,
    difficulty: "intermediate",
    completedDate: "2025-04-02T14:45:00Z",
    score: 72
  },
  {
    id: "assessment-3",
    title: "Windows Server Administration",
    description: "Validate your Windows Server management skills",
    skillsAssessed: ["skill-3", "skill-11"],
    duration: "60 minutes",
    questionCount: 40,
    difficulty: "advanced",
    completedDate: "2025-03-21T11:20:00Z",
    score: 92
  },
  {
    id: "assessment-4",
    title: "Advanced Cybersecurity",
    description: "Comprehensive assessment of advanced security concepts",
    skillsAssessed: ["skill-1", "skill-8", "skill-14"],
    duration: "90 minutes",
    questionCount: 50,
    difficulty: "advanced"
  },
  {
    id: "assessment-5",
    title: "Linux System Administration",
    description: "Test your Linux administration skills",
    skillsAssessed: ["skill-4"],
    duration: "45 minutes",
    questionCount: 35,
    difficulty: "intermediate"
  }
];

// Mock user skill statistics
export const mockUserSkillStatistics: SkillStatistics = {
  totalSkills: 15,
  expertSkills: 3,
  advancedSkills: 4,
  intermediateSkills: 6,
  beginnerSkills: 2,
  mostProficientCategory: "infrastructure",
  leastProficientCategory: "cloud",
  skillsInProgress: 12,
  skillsImprovedLastMonth: 5,
  recommendedCourses: 8,
  certificationsPending: 3,
  certificationsActive: 4
};

// Skill progression history for charts
export interface SkillProgressionEntry {
  date: string; // ISO date string
  skillId: string;
  level: SkillLevel;
  progress: number;
}

export const mockSkillProgressionHistory: SkillProgressionEntry[] = [
  // Network Security progression
  { date: "2024-11-15T00:00:00Z", skillId: "skill-1", level: "beginner", progress: 30 },
  { date: "2025-01-15T00:00:00Z", skillId: "skill-1", level: "intermediate", progress: 55 },
  { date: "2025-03-15T00:00:00Z", skillId: "skill-1", level: "advanced", progress: 75 },
  { date: "2025-04-15T00:00:00Z", skillId: "skill-1", level: "advanced", progress: 85 },
  
  // Cloud Infrastructure progression
  { date: "2025-01-02T00:00:00Z", skillId: "skill-2", level: "beginner", progress: 25 },
  { date: "2025-02-02T00:00:00Z", skillId: "skill-2", level: "beginner", progress: 45 },
  { date: "2025-03-02T00:00:00Z", skillId: "skill-2", level: "intermediate", progress: 60 },
  { date: "2025-04-02T00:00:00Z", skillId: "skill-2", level: "intermediate", progress: 68 },
  
  // Windows Server Management progression
  { date: "2024-09-21T00:00:00Z", skillId: "skill-3", level: "intermediate", progress: 65 },
  { date: "2024-11-21T00:00:00Z", skillId: "skill-3", level: "advanced", progress: 80 },
  { date: "2025-01-21T00:00:00Z", skillId: "skill-3", level: "advanced", progress: 88 },
  { date: "2025-03-21T00:00:00Z", skillId: "skill-3", level: "expert", progress: 95 }
];

// Recommended courses based on skill gaps
export interface SkillRecommendation {
  skillId: string;
  currentLevel: SkillLevel;
  targetLevel: SkillLevel;
  gapSize: "small" | "medium" | "large";
  recommendedCourses: Course[];
}

export const mockSkillRecommendations: SkillRecommendation[] = [
  {
    skillId: "skill-9", // AWS Cloud Services
    currentLevel: "beginner",
    targetLevel: "intermediate",
    gapSize: "medium",
    recommendedCourses: [
      {
        id: "course-2",
        title: "AWS Fundamentals",
        provider: "Amazon Web Services",
        description: "Learn the core services and features of Amazon Web Services",
        duration: "8 hours",
        format: "interactive",
        skillsImproved: ["skill-9"],
        rating: 4.8,
        reviewCount: 256,
        isRecommended: true,
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "course-10",
        title: "AWS Services Deep Dive",
        provider: "CloudGuru",
        description: "In-depth exploration of key AWS services for IT professionals",
        duration: "12 hours",
        format: "video",
        skillsImproved: ["skill-9"],
        rating: 4.7,
        reviewCount: 183,
        image: "https://images.unsplash.com/photo-1643386572608-baa0a47363e2?q=80&w=500&auto=format&fit=crop"
      }
    ]
  },
  {
    skillId: "skill-10", // Microsoft Azure
    currentLevel: "beginner",
    targetLevel: "intermediate",
    gapSize: "medium",
    recommendedCourses: [
      {
        id: "course-3",
        title: "Microsoft Azure Basics",
        provider: "Microsoft Learn",
        description: "Getting started with Microsoft Azure cloud services",
        duration: "6 hours",
        format: "interactive",
        skillsImproved: ["skill-10"],
        rating: 4.6,
        reviewCount: 198,
        image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "course-11",
        title: "Azure Administration for IT Pros",
        provider: "Microsoft",
        description: "Essential Azure administration skills for IT professionals",
        duration: "15 hours",
        format: "interactive",
        skillsImproved: ["skill-10"],
        rating: 4.5,
        reviewCount: 156,
        isRecommended: true,
        image: "https://images.unsplash.com/photo-1604600132268-fb66e9e0389e?q=80&w=500&auto=format&fit=crop"
      }
    ]
  },
  {
    skillId: "skill-14", // Cybersecurity Analysis
    currentLevel: "intermediate",
    targetLevel: "advanced",
    gapSize: "small",
    recommendedCourses: [
      {
        id: "course-5",
        title: "Threat Detection and Response",
        provider: "SecOps Training",
        description: "Identify security threats and implement effective response strategies",
        duration: "10 hours",
        format: "interactive",
        skillsImproved: ["skill-1", "skill-14"],
        rating: 4.9,
        reviewCount: 112,
        isRecommended: true,
        image: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "course-12",
        title: "Advanced Security Analysis",
        provider: "Cybersecurity Institute",
        description: "Advanced techniques for analyzing and addressing security threats",
        duration: "18 hours",
        format: "workshop",
        skillsImproved: ["skill-14"],
        rating: 4.8,
        reviewCount: 94,
        image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=500&auto=format&fit=crop"
      }
    ]
  }
];

// Helper function to get category display name
export function getSkillCategoryName(category: SkillCategory): string {
  const categoryNames: Record<SkillCategory, string> = {
    infrastructure: "Infrastructure",
    security: "Security",
    networking: "Networking",
    cloud: "Cloud Computing",
    development: "Software Development",
    data: "Data Management",
    leadership: "Leadership",
    project_management: "Project Management",
    support: "Technical Support"
  };
  
  return categoryNames[category] || category;
}

// Helper function to get level display name
export function getSkillLevelName(level: SkillLevel): string {
  const levelNames: Record<SkillLevel, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert"
  };
  
  return levelNames[level] || level;
}

// Helper function to get level color
export function getSkillLevelColor(level: SkillLevel): string {
  const levelColors: Record<SkillLevel, string> = {
    beginner: "bg-blue-100 text-blue-800",
    intermediate: "bg-green-100 text-green-800",
    advanced: "bg-purple-100 text-purple-800",
    expert: "bg-gold/20 text-gold"
  };
  
  return levelColors[level] || "";
}

// Helper function to get category color
export function getSkillCategoryColor(category: SkillCategory): string {
  const categoryColors: Record<SkillCategory, string> = {
    infrastructure: "bg-blue-100 text-blue-800",
    security: "bg-red-100 text-red-800",
    networking: "bg-orange-100 text-orange-800",
    cloud: "bg-cyan-100 text-cyan-800",
    development: "bg-indigo-100 text-indigo-800",
    data: "bg-emerald-100 text-emerald-800",
    leadership: "bg-violet-100 text-violet-800",
    project_management: "bg-amber-100 text-amber-800",
    support: "bg-teal-100 text-teal-800"
  };
  
  return categoryColors[category] || "";
}

// Helper function to get skill name by ID
export function getSkillNameById(skillId: string): string {
  const skill = mockUserSkills.find(s => s.id === skillId);
  return skill ? skill.name : "Unknown Skill";
}
