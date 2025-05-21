
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  forRoles: string[];
  forPlans: string[];
  courses: string[]; // Course IDs
  estimatedHours: number;
  thumbnail?: string;
  skills: Skill[];
  requiredForCertification: boolean;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  level?: "beginner" | "intermediate" | "advanced";
  relatedSkills?: string[]; // Skill IDs
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  modules: Module[];
  skillLevel: "beginner" | "intermediate" | "advanced";
  forRoles: string[];
  forPlans: string[];
  estimatedHours: number;
  authorName: string;
  authorTitle?: string;
  authorAvatar?: string;
  tags: string[];
  relatedCourses?: string[]; // Course IDs
  publishedDate?: string;
  updatedDate?: string;
  featured?: boolean;
  popularity?: number; // Higher number means more popular
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  estimatedMinutes: number;
  quiz?: Quiz;
  skillsGained?: Skill[];
  prerequisiteModules?: string[]; // Module IDs
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: "video" | "text" | "interactive";
  content: string; // URL for videos, HTML for text
  estimatedMinutes: number;
  resources?: Resource[]; // Supplementary resources
  attachments?: Attachment[];
  transcript?: string; // For video lessons
  skillsGained?: Skill[];
}

export interface Attachment {
  id: string;
  name: string;
  type: "pdf" | "docx" | "xlsx" | "image" | "code";
  url: string;
  sizeKB: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number; // Percentage needed to pass
  timeLimit?: number; // In minutes, optional
  maxAttempts?: number; // Maximum number of attempts allowed
  shuffleQuestions?: boolean; // Whether questions should be randomized
  showFeedback?: "after_each_question" | "after_submission" | "none";
  certificateOnPass?: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false" | "multiple-select" | "matching" | "short-answer";
  options?: string[] | Record<string, string>; // Array for choices, Object for matching pairs
  correctAnswer: string | string[] | Record<string, string>; // String for single answer, array for multiple, object for matching
  points: number;
  explanation?: string; // Shown after answering
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
  image?: string; // URL to an image to display with the question
  code?: string; // Code snippet for programming questions
}

export interface Certificate {
  id: string;
  title: string;
  issuedTo: string; // User ID
  issuedDate: string;
  expiryDate?: string;
  courseId: string;
  learningPathId?: string;
  skills: Skill[];
  imageUrl: string;
  verificationCode?: string;
  issuer?: string; // Organization that issued the certificate
  authorizedBy?: string; // Person who authorized the certificate
}

export interface UserProgress {
  userId: string;
  courseProgress: CourseProgress[];
  certificates: string[]; // Certificate IDs
  learningPathsProgress: LearningPathProgress[];
  skillsAcquired?: SkillProgress[];
  lastActiveDate?: string;
  totalLearningMinutes?: number;
  badges?: Badge[];
  streak?: number; // Number of consecutive days of learning
}

export interface CourseProgress {
  courseId: string;
  startedDate: string;
  completedDate?: string;
  percentComplete: number;
  moduleProgress: ModuleProgress[];
  favorited?: boolean;
  notes?: string[];
}

export interface ModuleProgress {
  moduleId: string;
  complete: boolean;
  lessonProgress: LessonProgress[];
  quizAttempts?: QuizAttempt[];
}

export interface LessonProgress {
  lessonId: string;
  complete: boolean;
  lastAccessedDate: string;
  watchTimePercent?: number; // For videos, percentage watched
  notes?: string[];
}

export interface QuizAttempt {
  attemptDate: string;
  score: number;
  passed: boolean;
  answers?: Record<string, string | string[]>;
  timeSpentSeconds?: number;
}

export interface LearningPathProgress {
  pathId: string;
  startedDate: string;
  completedDate?: string;
  percentComplete: number;
  currentCourseId?: string;
}

export interface SkillProgress {
  skillId: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  acquiredDate: string;
  lastDemonstrated?: string;
  confidence?: number; // 1-5 rating
  endorsements?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  acquiredDate: string;
  category: "achievement" | "milestone" | "skill" | "special";
  criteria?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "template" | "document";
  url: string;
  category: string;
  thumbnail?: string;
  author?: string;
  publishedDate?: string;
  tags?: string[];
  favoriteCount?: number;
  viewCount?: number;
  relatedResourceIds?: string[];
}

export interface UserProfile {
  userId: string;
  displayName: string;
  jobTitle?: string;
  department?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinDate: string;
  lastActive?: string;
  role: "learner" | "instructor" | "admin";
  badges: Badge[];
  topSkills: Skill[];
  certificates: Certificate[];
  learningActivity: LearningActivity[];
  learningGoals?: LearningGoal[];
  preferredLearningTimes?: string[];
  interests?: string[];
}

export interface LearningActivity {
  date: string;
  type: "course_started" | "course_completed" | "lesson_completed" | "quiz_passed" | "certificate_earned" | "badge_earned";
  entityId: string; // ID of the related entity
  entityTitle: string;
  points?: number;
}

export interface LearningGoal {
  id: string;
  title: string;
  targetDate: string;
  relatedSkills?: string[]; // Skill IDs
  relatedCourses?: string[]; // Course IDs
  progress: number; // 0-100
  created: string;
  status: "active" | "completed" | "abandoned";
}
