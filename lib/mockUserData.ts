
import {
  UserProfile,
  Badge,
  Skill,
  Certificate,
  LearningActivity,
  LearningGoal
} from "./lmsTypes";
import { mockSkills } from "./mockLmsData";

// Mock badges
export const mockBadges: Badge[] = [
  {
    id: "badge-1",
    name: "Fast Learner",
    description: "Completed 3 courses in a single month",
    imageUrl: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=2787&auto=format&fit=crop",
    acquiredDate: "2025-04-10T00:00:00Z",
    category: "achievement"
  },
  {
    id: "badge-2",
    name: "Support Pro",
    description: "Mastered IT support fundamentals",
    imageUrl: "https://images.unsplash.com/photo-1619468129361-605ebea04b44?q=80&w=2787&auto=format&fit=crop",
    acquiredDate: "2025-03-15T00:00:00Z",
    category: "skill"
  },
  {
    id: "badge-3",
    name: "Cybersecurity Aware",
    description: "Completed security awareness training",
    imageUrl: "https://images.unsplash.com/photo-1633265486501-2d859258596a?q=80&w=2940&auto=format&fit=crop",
    acquiredDate: "2025-02-20T00:00:00Z",
    category: "skill"
  },
  {
    id: "badge-4",
    name: "5-Day Streak",
    description: "Learned for 5 consecutive days",
    imageUrl: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?q=80&w=2938&auto=format&fit=crop",
    acquiredDate: "2025-05-05T00:00:00Z",
    category: "milestone"
  }
];

// Mock learning activities
export const mockLearningActivities: LearningActivity[] = [
  {
    date: "2025-05-16T10:30:00Z",
    type: "lesson_completed",
    entityId: "lesson-1-2-3",
    entityTitle: "Writing Effective Ticket Descriptions",
    points: 8
  },
  {
    date: "2025-05-15T14:20:00Z",
    type: "lesson_completed",
    entityId: "lesson-1-2-2",
    entityTitle: "Creating a Support Ticket",
    points: 10
  },
  {
    date: "2025-05-15T13:45:00Z",
    type: "lesson_completed",
    entityId: "lesson-1-2-1",
    entityTitle: "Accessing the Support Portal",
    points: 5
  },
  {
    date: "2025-05-10T09:30:00Z",
    type: "course_started",
    entityId: "course-1",
    entityTitle: "Getting Started with IT Support",
    points: 0
  },
  {
    date: "2025-04-25T15:00:00Z",
    type: "quiz_passed",
    entityId: "quiz-3-2",
    entityTitle: "Cybersecurity Basics Quiz",
    points: 15
  },
  {
    date: "2025-04-20T11:15:00Z",
    type: "course_completed",
    entityId: "course-3",
    entityTitle: "Cybersecurity Essentials for Everyone",
    points: 0
  },
  {
    date: "2025-04-10T09:00:00Z",
    type: "badge_earned",
    entityId: "badge-1",
    entityTitle: "Fast Learner Badge",
    points: 0
  },
  {
    date: "2025-03-15T14:30:00Z",
    type: "certificate_earned",
    entityId: "cert-2",
    entityTitle: "Cybersecurity Fundamentals Certificate",
    points: 0
  }
];

// Mock learning goals
export const mockLearningGoals: LearningGoal[] = [
  {
    id: "goal-1",
    title: "Master IT Support Fundamentals",
    targetDate: "2025-06-30T00:00:00Z",
    relatedSkills: ["skill-1", "skill-2", "skill-3", "skill-4"],
    relatedCourses: ["course-1", "course-3", "course-5"],
    progress: 65,
    created: "2025-04-01T00:00:00Z",
    status: "active"
  },
  {
    id: "goal-2",
    title: "Learn Microsoft Teams Administration",
    targetDate: "2025-07-15T00:00:00Z",
    relatedSkills: [],
    relatedCourses: ["course-7"],
    progress: 25,
    created: "2025-04-15T00:00:00Z",
    status: "active"
  },
  {
    id: "goal-3",
    title: "Complete Cybersecurity Training",
    targetDate: "2025-03-31T00:00:00Z",
    relatedSkills: ["skill-3"],
    relatedCourses: ["course-3", "course-9"],
    progress: 100,
    created: "2025-02-01T00:00:00Z",
    status: "completed"
  }
];

// Mock user profile
export const mockUserProfile: UserProfile = {
  userId: "user-1",
  displayName: "John Smith",
  jobTitle: "Marketing Manager",
  department: "Marketing",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2970&auto=format&fit=crop",
  bio: "Passionate about improving our team's IT skills and building a more secure digital environment for our marketing campaigns.",
  location: "Cape Town",
  joinDate: "2025-01-15T00:00:00Z",
  lastActive: "2025-05-18T08:30:00Z",
  role: "learner",
  badges: mockBadges,
  topSkills: [
    mockSkills[0], // AI Support Tools
    mockSkills[2], // Cybersecurity Basics
    mockSkills[3], // Self-Service Portal Usage
    {
      id: "skill-microsoft-teams",
      name: "Microsoft Teams",
      description: "Basic understanding of Microsoft Teams administration and usage",
      level: "beginner"
    }
  ],
  certificates: [], // This will be populated from certificates
  learningActivity: mockLearningActivities,
  learningGoals: mockLearningGoals,
  preferredLearningTimes: ["Morning", "Weekend"],
  interests: ["Cybersecurity", "IT Support", "Microsoft 365", "Automation"]
};
