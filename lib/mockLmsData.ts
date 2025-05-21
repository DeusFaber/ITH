
import { Skill, SkillLevel } from "./mockSkillsData";

// Course status types
export type CourseStatus = "not_started" | "in_progress" | "completed" | "overdue";

// Course format types
export type CourseFormat = "video" | "interactive" | "document" | "webinar" | "workshop" | "mixed";

// Course category types
export type CourseCategory = "cybersecurity" | "cloud" | "infrastructure" | "data" | "devops" | "leadership";

// Course difficulty types
export type CourseDifficulty = "beginner" | "intermediate" | "advanced";

// Course module
export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: {
    id: string;
    title: string;
    type: "video" | "text" | "quiz" | "assignment";
    duration: string;
  }[];
}

// Course interface
export interface Course {
  id: string;
  title: string;
  provider: string;
  description: string;
  category: CourseCategory;
  duration: string;
  format: CourseFormat;
  difficulty: CourseDifficulty;
  skillsImproved: string[]; // Skill IDs
  rating: number; // 0-5
  reviewCount: number;
  enrollmentCount: number;
  isPopular?: boolean;
  isRecommended?: boolean;
  image?: string;
  modules?: CourseModule[];
}

// Module progress interface
export interface ModuleProgress {
  moduleId: string;
  lessonProgress: {
    lessonId: string;
    completed: boolean;
    timeSpent: number; // seconds
    lastAccessDate?: string; // ISO date string
  }[];
  completed: boolean;
  quizScore?: number; // 0-100
  completedDate?: string; // ISO date string
}

// Course detail with progress
export interface CourseDetail {
  courseId: string;
  status: CourseStatus;
  enrollmentDate: string; // ISO date string
  lastAccessDate?: string; // ISO date string
  timeSpent: number; // seconds
  completedDate?: string; // ISO date string
  moduleProgress: ModuleProgress[];
  totalModules: number;
  completedModules: number;
  quizAverage?: number; // 0-100
}

// User progress in the LMS
export interface LmsUserProgress {
  userId: string;
  enrolledCourses: string[]; // Course IDs
  completedCourses: string[]; // Course IDs
  courseDetails: CourseDetail[];
  favoriteProviders: string[];
  lastActiveDate?: string; // ISO date string
  totalLearningTime: number; // seconds
}

// Certification interface
export interface LmsCertification {
  id: string;
  name: string;
  issuer: string;
  courseId: string;
  description: string;
  issueDate: string; // ISO date string
  expiryDate?: string; // ISO date string
  credentialId: string;
  verificationUrl?: string;
  image?: string;
}

// Learning path interface
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[]; // Course IDs
  duration: string;
  skillsImproved: string[]; // Skill IDs
  category: CourseCategory;
  difficulty: CourseDifficulty;
  enrolledCount: number;
  completionRate: number; // 0-100
}

// Mock courses data
export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Network Security Fundamentals",
    provider: "CyberSecurity Academy",
    description: "Learn the core principles of network security and protect your organization from threats",
    category: "cybersecurity",
    duration: "10 hours",
    format: "mixed",
    difficulty: "intermediate",
    skillsImproved: ["skill-1", "skill-8", "skill-14"],
    rating: 4.7,
    reviewCount: 568,
    enrollmentCount: 2459,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=500&auto=format&fit=crop",
    modules: [
      {
        id: "module-1-1",
        title: "Introduction to Network Security",
        description: "Overview of network security concepts and fundamental principles",
        duration: "1 hour",
        lessons: [
          {
            id: "lesson-1-1-1",
            title: "Security Principles Overview",
            type: "video",
            duration: "20 minutes"
          },
          {
            id: "lesson-1-1-2",
            title: "Threat Landscape",
            type: "video",
            duration: "25 minutes"
          },
          {
            id: "lesson-1-1-3",
            title: "Network Security Basics Quiz",
            type: "quiz",
            duration: "15 minutes"
          }
        ]
      },
      {
        id: "module-1-2",
        title: "Firewalls and Perimeter Security",
        description: "Understanding how to configure and manage firewalls",
        duration: "2 hours",
        lessons: [
          {
            id: "lesson-1-2-1",
            title: "Firewall Types and Technologies",
            type: "video",
            duration: "30 minutes"
          },
          {
            id: "lesson-1-2-2",
            title: "Configuring Firewall Rules",
            type: "video",
            duration: "45 minutes"
          },
          {
            id: "lesson-1-2-3",
            title: "Practical Firewall Setup",
            type: "assignment",
            duration: "45 minutes"
          }
        ]
      },
      {
        id: "module-1-3",
        title: "Intrusion Detection and Prevention",
        description: "Learn how to detect and prevent network intrusions",
        duration: "2.5 hours",
        lessons: [
          {
            id: "lesson-1-3-1",
            title: "IDS vs IPS Systems",
            type: "video",
            duration: "35 minutes"
          },
          {
            id: "lesson-1-3-2",
            title: "Configuring Monitoring Systems",
            type: "text",
            duration: "30 minutes"
          },
          {
            id: "lesson-1-3-3",
            title: "Alert Tuning and Management",
            type: "video",
            duration: "40 minutes"
          },
          {
            id: "lesson-1-3-4",
            title: "IDS/IPS Practical Lab",
            type: "assignment",
            duration: "45 minutes"
          }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: "Cloud Computing with AWS",
    provider: "Cloud Mastery",
    description: "Master Amazon Web Services for enterprise cloud computing",
    category: "cloud",
    duration: "15 hours",
    format: "interactive",
    difficulty: "intermediate",
    skillsImproved: ["skill-2", "skill-9"],
    rating: 4.8,
    reviewCount: 742,
    enrollmentCount: 3521,
    isPopular: true,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=500&auto=format&fit=crop",
    modules: [
      {
        id: "module-2-1",
        title: "AWS Fundamentals",
        description: "Introduction to AWS services and concepts",
        duration: "3 hours",
        lessons: [
          {
            id: "lesson-2-1-1",
            title: "AWS Global Infrastructure",
            type: "video",
            duration: "30 minutes"
          },
          {
            id: "lesson-2-1-2",
            title: "AWS Identity and Access Management",
            type: "video",
            duration: "45 minutes"
          },
          {
            id: "lesson-2-1-3",
            title: "AWS Console Walkthrough",
            type: "video",
            duration: "40 minutes"
          },
          {
            id: "lesson-2-1-4",
            title: "AWS Fundamentals Quiz",
            type: "quiz",
            duration: "30 minutes"
          }
        ]
      },
      {
        id: "module-2-2",
        title: "AWS Compute Services",
        description: "Learn about EC2, Lambda, and other compute services",
        duration: "4 hours",
        lessons: [
          {
            id: "lesson-2-2-1",
            title: "EC2 Instances",
            type: "video",
            duration: "50 minutes"
          },
          {
            id: "lesson-2-2-2",
            title: "AWS Lambda Functions",
            type: "video",
            duration: "45 minutes"
          },
          {
            id: "lesson-2-2-3",
            title: "Elastic Beanstalk",
            type: "video",
            duration: "40 minutes"
          },
          {
            id: "lesson-2-2-4",
            title: "AWS Compute Practical Lab",
            type: "assignment",
            duration: "60 minutes"
          }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: "Microsoft Azure Administration",
    provider: "Microsoft Learning",
    description: "Comprehensive guide to administering Microsoft Azure environments",
    category: "cloud",
    duration: "20 hours",
    format: "mixed",
    difficulty: "intermediate",
    skillsImproved: ["skill-10"],
    rating: 4.6,
    reviewCount: 523,
    enrollmentCount: 2153,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=500&auto=format&fit=crop",
    modules: [
      {
        id: "module-3-1",
        title: "Azure Administration Fundamentals",
        description: "Introduction to Azure administration concepts",
        duration: "4 hours",
        lessons: [
          {
            id: "lesson-3-1-1",
            title: "Azure Portal Navigation",
            type: "video",
            duration: "30 minutes"
          },
          {
            id: "lesson-3-1-2",
            title: "Azure Resource Manager",
            type: "video",
            duration: "45 minutes"
          },
          {
            id: "lesson-3-1-3",
            title: "Azure CLI and PowerShell",
            type: "video",
            duration: "50 minutes"
          }
        ]
      }
    ]
  },
  {
    id: "course-4",
    title: "Windows Server Administration",
    provider: "Microsoft Learning",
    description: "Master Windows Server management and configuration in enterprise environments",
    category: "infrastructure",
    duration: "25 hours",
    format: "mixed",
    difficulty: "advanced",
    skillsImproved: ["skill-3", "skill-11"],
    rating: 4.7,
    reviewCount: 412,
    enrollmentCount: 1876,
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "course-5",
    title: "Linux System Administration",
    provider: "Linux Academy",
    description: "Comprehensive guide to managing Linux servers in production environments",
    category: "infrastructure",
    duration: "18 hours",
    format: "interactive",
    difficulty: "intermediate",
    skillsImproved: ["skill-4"],
    rating: 4.9,
    reviewCount: 603,
    enrollmentCount: 2431,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "course-6",
    title: "VMware vSphere: Install, Configure, Manage",
    provider: "VMware Education",
    description: "Learn to install, configure and manage VMware vSphere environments",
    category: "infrastructure",
    duration: "30 hours",
    format: "mixed",
    difficulty: "advanced",
    skillsImproved: ["skill-7"],
    rating: 4.8,
    reviewCount: 379,
    enrollmentCount: 1569,
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "course-7",
    title: "Data Backup & Recovery Strategies",
    provider: "Data Management Institute",
    description: "Master essential techniques for data backup and disaster recovery planning",
    category: "data",
    duration: "12 hours",
    format: "mixed",
    difficulty: "intermediate",
    skillsImproved: ["skill-5"],
    rating: 4.6,
    reviewCount: 318,
    enrollmentCount: 1432,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "course-8",
    title: "SQL Database Management",
    provider: "Database Academy",
    description: "Comprehensive course on SQL database management and optimization",
    category: "data",
    duration: "15 hours",
    format: "interactive",
    difficulty: "intermediate",
    skillsImproved: ["skill-13"],
    rating: 4.7,
    reviewCount: 452,
    enrollmentCount: 2104,
    image: "https://images.unsplash.com/photo-1489389944381-3471b5b30f04?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "course-9",
    title: "IT Leadership and Management",
    provider: "Leadership Academy",
    description: "Develop leadership skills for IT professionals and managers",
    category: "leadership",
    duration: "16 hours",
    format: "webinar",
    difficulty: "intermediate",
    skillsImproved: ["skill-6", "skill-15"],
    rating: 4.5,
    reviewCount: 289,
    enrollmentCount: 1253,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "course-10",
    title: "Introduction to DevOps",
    provider: "DevOps Institute",
    description: "Learn the fundamentals of DevOps practices and culture",
    category: "devops",
    duration: "10 hours",
    format: "mixed",
    difficulty: "beginner",
    skillsImproved: ["skill-6"],
    rating: 4.6,
    reviewCount: 376,
    enrollmentCount: 1847,
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=500&auto=format&fit=crop"
  }
];

// Mock user progress data
export const mockUserProgress: LmsUserProgress = {
  userId: "u-123456",
  enrolledCourses: ["course-1", "course-2", "course-4", "course-7", "course-9"],
  completedCourses: ["course-4"],
  courseDetails: [
    {
      courseId: "course-1",
      status: "in_progress",
      enrollmentDate: "2025-04-01T00:00:00Z",
      lastAccessDate: "2025-05-15T14:30:00Z",
      timeSpent: 14400, // 4 hours
      moduleProgress: [
        {
          moduleId: "module-1-1",
          lessonProgress: [
            {
              lessonId: "lesson-1-1-1",
              completed: true,
              timeSpent: 1250,
              lastAccessDate: "2025-04-02T10:15:00Z"
            },
            {
              lessonId: "lesson-1-1-2",
              completed: true,
              timeSpent: 1500,
              lastAccessDate: "2025-04-03T11:30:00Z"
            },
            {
              lessonId: "lesson-1-1-3",
              completed: true,
              timeSpent: 950,
              lastAccessDate: "2025-04-03T12:00:00Z"
            }
          ],
          completed: true,
          quizScore: 85,
          completedDate: "2025-04-03T12:00:00Z"
        },
        {
          moduleId: "module-1-2",
          lessonProgress: [
            {
              lessonId: "lesson-1-2-1",
              completed: true,
              timeSpent: 1850,
              lastAccessDate: "2025-04-10T09:45:00Z"
            },
            {
              lessonId: "lesson-1-2-2",
              completed: true,
              timeSpent: 2700,
              lastAccessDate: "2025-04-12T14:20:00Z"
            },
            {
              lessonId: "lesson-1-2-3",
              completed: false,
              timeSpent: 1200,
              lastAccessDate: "2025-05-15T14:30:00Z"
            }
          ],
          completed: false
        },
        {
          moduleId: "module-1-3",
          lessonProgress: [
            {
              lessonId: "lesson-1-3-1",
              completed: false,
              timeSpent: 0
            },
            {
              lessonId: "lesson-1-3-2",
              completed: false,
              timeSpent: 0
            },
            {
              lessonId: "lesson-1-3-3",
              completed: false,
              timeSpent: 0
            },
            {
              lessonId: "lesson-1-3-4",
              completed: false,
              timeSpent: 0
            }
          ],
          completed: false
        }
      ],
      totalModules: 3,
      completedModules: 1
    },
    {
      courseId: "course-2",
      status: "in_progress",
      enrollmentDate: "2025-03-15T00:00:00Z",
      lastAccessDate: "2025-05-10T11:20:00Z",
      timeSpent: 18000, // 5 hours
      moduleProgress: [
        {
          moduleId: "module-2-1",
          lessonProgress: [
            {
              lessonId: "lesson-2-1-1",
              completed: true,
              timeSpent: 1800,
              lastAccessDate: "2025-03-16T10:30:00Z"
            },
            {
              lessonId: "lesson-2-1-2",
              completed: true,
              timeSpent: 2700,
              lastAccessDate: "2025-03-18T14:15:00Z"
            },
            {
              lessonId: "lesson-2-1-3",
              completed: true,
              timeSpent: 2500,
              lastAccessDate: "2025-03-20T11:45:00Z"
            },
            {
              lessonId: "lesson-2-1-4",
              completed: true,
              timeSpent: 1800,
              lastAccessDate: "2025-03-20T12:30:00Z"
            }
          ],
          completed: true,
          quizScore: 92,
          completedDate: "2025-03-20T12:30:00Z"
        },
        {
          moduleId: "module-2-2",
          lessonProgress: [
            {
              lessonId: "lesson-2-2-1",
              completed: true,
              timeSpent: 3100,
              lastAccessDate: "2025-04-05T09:30:00Z"
            },
            {
              lessonId: "lesson-2-2-2",
              completed: true,
              timeSpent: 2700,
              lastAccessDate: "2025-04-08T15:40:00Z"
            },
            {
              lessonId: "lesson-2-2-3",
              completed: false,
              timeSpent: 1500,
              lastAccessDate: "2025-05-10T11:20:00Z"
            },
            {
              lessonId: "lesson-2-2-4",
              completed: false,
              timeSpent: 0
            }
          ],
          completed: false
        }
      ],
      totalModules: 2,
      completedModules: 1
    },
    {
      courseId: "course-4",
      status: "completed",
      enrollmentDate: "2025-01-10T00:00:00Z",
      lastAccessDate: "2025-03-05T16:45:00Z",
      timeSpent: 90000, // 25 hours
      completedDate: "2025-03-05T16:45:00Z",
      moduleProgress: [],
      totalModules: 5,
      completedModules: 5,
      quizAverage: 88
    },
    {
      courseId: "course-7",
      status: "not_started",
      enrollmentDate: "2025-05-01T00:00:00Z",
      timeSpent: 0,
      moduleProgress: [],
      totalModules: 4,
      completedModules: 0
    },
    {
      courseId: "course-9",
      status: "overdue",
      enrollmentDate: "2025-02-15T00:00:00Z",
      lastAccessDate: "2025-02-16T10:30:00Z",
      timeSpent: 3600, // 1 hour
      moduleProgress: [],
      totalModules: 5,
      completedModules: 0
    }
  ],
  favoriteProviders: ["Microsoft Learning", "CyberSecurity Academy"],
  lastActiveDate: "2025-05-15T14:30:00Z",
  totalLearningTime: 126000 // 35 hours
};

// Mock certifications
export const mockCertifications: LmsCertification[] = [
  {
    id: "cert-lms-1",
    name: "Windows Server Administration Certificate",
    issuer: "Microsoft Learning",
    courseId: "course-4",
    description: "Certifies proficiency in Windows Server administration and management",
    issueDate: "2025-03-05T16:45:00Z",
    credentialId: "MS-WS-345678-C",
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=500&auto=format&fit=crop"
  }
];

// Mock learning paths
export const mockLearningPaths: LearningPath[] = [
  {
    id: "path-1",
    title: "Network Security Specialist",
    description: "Become a network security specialist with this comprehensive learning path",
    courses: ["course-1", "course-4", "course-5"],
    duration: "53 hours",
    skillsImproved: ["skill-1", "skill-3", "skill-4", "skill-8", "skill-11", "skill-14"],
    category: "cybersecurity",
    difficulty: "intermediate",
    enrolledCount: 1243,
    completionRate: 68
  },
  {
    id: "path-2",
    title: "Cloud Solutions Architect",
    description: "Master cloud architecture across major platforms",
    courses: ["course-2", "course-3", "course-7"],
    duration: "47 hours",
    skillsImproved: ["skill-2", "skill-5", "skill-9", "skill-10"],
    category: "cloud",
    difficulty: "advanced",
    enrolledCount: 1876,
    completionRate: 62
  },
  {
    id: "path-3",
    title: "IT Leadership",
    description: "Develop IT leadership and management skills",
    courses: ["course-9", "course-10"],
    duration: "26 hours",
    skillsImproved: ["skill-6", "skill-15"],
    category: "leadership",
    difficulty: "intermediate",
    enrolledCount: 953,
    completionRate: 75
  }
];
