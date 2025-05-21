
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  UserProfile, 
  Badge as BadgeType, 
  LearningPathProgress, 
  CourseProgress,
  Certificate 
} from "../../lib/lmsTypes";
import { 
  Award, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Download, 
  GraduationCap, 
  BarChart,
  Flame,
  FileText,
  Award as AwardIcon,
  CheckSquare2 as CheckSquare,
  Shield,
  BookOpen
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface LmsUserProfileProps {
  userProfile: UserProfile;
  learningPathsProgress: LearningPathProgress[];
  courseProgress: CourseProgress[];
  certificates: Certificate[];
  onViewCourse: (courseId: string) => void;
  onViewPath: (pathId: string) => void;
  onViewCertificate: (certificateId: string) => void;
}

export function LmsUserProfile({
  userProfile,
  learningPathsProgress,
  courseProgress,
  certificates,
  onViewCourse,
  onViewPath,
  onViewCertificate
}: LmsUserProfileProps) {
  // Total learning time (in minutes)
  const totalLearningMinutes = userProfile.learningActivity.reduce((total, activity) => {
    return total + (activity.points || 0);
  }, 0);
  
  // Format learning time
  const formatLearningTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    if (hours < 1) {
      return `${minutes} minutes`;
    } else if (minutes % 60 === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours, ${minutes % 60} minutes`;
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // Calculate learning streak
  const streak = userProfile.streak || 0;
  
  return (
    <div className="space-y-6">
      {/* Profile header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userProfile.avatar} alt={userProfile.displayName} />
              <AvatarFallback>{userProfile.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-2 text-center md:text-left flex-grow">
              <h2 className="text-2xl font-bold">{userProfile.displayName}</h2>
              {userProfile.jobTitle && (
                <p className="text-muted-foreground">{userProfile.jobTitle}</p>
              )}
              {userProfile.department && (
                <p className="text-muted-foreground">{userProfile.department}</p>
              )}
              {userProfile.bio && (
                <p className="mt-2">{userProfile.bio}</p>
              )}
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined {formatDate(userProfile.joinDate)}</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex flex-col items-center">
                  <Badge className="mb-1">{userProfile.topSkills.length}</Badge>
                  <span className="text-xs text-muted-foreground">Skills</span>
                </div>
                <div className="flex flex-col items-center">
                  <Badge className="mb-1">{certificates.length}</Badge>
                  <span className="text-xs text-muted-foreground">Certificates</span>
                </div>
                <div className="flex flex-col items-center">
                  <Badge className="mb-1">{userProfile.badges.length}</Badge>
                  <span className="text-xs text-muted-foreground">Badges</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Flame className="h-5 w-5 text-primary" />
                <span className="font-bold">{streak} day streak</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Learning stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Learning Time</h3>
              <p className="text-2xl font-bold">{formatLearningTime(totalLearningMinutes)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Courses Completed</h3>
              <p className="text-2xl font-bold">
                {courseProgress.filter(cp => cp.completedDate).length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Certificates Earned</h3>
              <p className="text-2xl font-bold">{certificates.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content tabs */}
      <Tabs defaultValue="learning" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="learning">Learning Progress</TabsTrigger>
          <TabsTrigger value="skills">Skills & Badges</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        {/* Learning progress tab */}
        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Paths</CardTitle>
              <CardDescription>
                Your progress in structured learning journeys
              </CardDescription>
            </CardHeader>
            <CardContent>
              {learningPathsProgress.length > 0 ? (
                <div className="space-y-4">
                  {learningPathsProgress.map((pathProgress) => (
                    <div key={pathProgress.pathId} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{pathProgress.pathId}</h3>
                        <Badge variant={pathProgress.percentComplete === 100 ? "default" : "outline"}>
                          {pathProgress.percentComplete === 100 ? "Completed" : `${pathProgress.percentComplete}%`}
                        </Badge>
                      </div>
                      <Progress value={pathProgress.percentComplete} className="h-2 mb-4" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Started {formatDate(pathProgress.startedDate)}
                        </span>
                        <Button size="sm" onClick={() => onViewPath(pathProgress.pathId)}>
                          {pathProgress.percentComplete === 100 ? "Review" : "Continue"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">You haven't started any learning paths yet</p>
                  <Button onClick={() => onViewPath("")}>Browse Learning Paths</Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>
                Individual courses you're working on
              </CardDescription>
            </CardHeader>
            <CardContent>
              {courseProgress.length > 0 ? (
                <div className="space-y-4">
                  {courseProgress.map((course) => (
                    <div key={course.courseId} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{course.courseId}</h3>
                        <Badge variant={course.percentComplete === 100 ? "default" : "outline"}>
                          {course.percentComplete === 100 ? "Completed" : `${course.percentComplete}%`}
                        </Badge>
                      </div>
                      <Progress value={course.percentComplete} className="h-2 mb-4" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {course.percentComplete === 100 && course.completedDate 
                            ? `Completed ${formatDate(course.completedDate)}` 
                            : `Started ${formatDate(course.startedDate)}`}
                        </span>
                        <Button size="sm" onClick={() => onViewCourse(course.courseId)}>
                          {course.percentComplete === 100 ? "Review" : "Continue"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">You haven't started any courses yet</p>
                  <Button onClick={() => onViewCourse("")}>Browse Courses</Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {userProfile.learningGoals && userProfile.learningGoals.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Learning Goals</CardTitle>
                <CardDescription>
                  Your personalized learning objectives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfile.learningGoals.map((goal) => (
                    <div key={goal.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{goal.title}</h3>
                        <Badge variant={goal.status === "completed" ? "default" : "outline"}>
                          {goal.status === "completed" ? "Completed" : `${goal.progress}%`}
                        </Badge>
                      </div>
                      <Progress value={goal.progress} className="h-2 mb-4" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Target date: {formatDate(goal.targetDate)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Skills and badges tab */}
        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Skills</CardTitle>
              <CardDescription>
                Skills you've developed through your learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProfile.topSkills.map((skill) => (
                  <Card key={skill.id} className="overflow-hidden">
                    <div className="p-4 flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{skill.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {skill.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {skill.level || "beginner"}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>My Badges</CardTitle>
              <CardDescription>
                Recognition for your achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userProfile.badges.map((badge) => (
                  <Card key={badge.id} className="overflow-hidden">
                    <div className="aspect-square flex flex-col items-center justify-center p-4">
                      {badge.imageUrl ? (
                        <div className="w-16 h-16 mb-3">
                          <ImageWithFallback
                            src={badge.imageUrl}
                            alt={badge.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                          <AwardIcon className="h-8 w-8 text-primary" />
                        </div>
                      )}
                      <h3 className="font-medium text-center">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        {formatDate(badge.acquiredDate)}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Certificates tab */}
        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Certificates</CardTitle>
              <CardDescription>
                Official recognition of your completed learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              {certificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((certificate) => (
                    <Card key={certificate.id} className="overflow-hidden">
                      <div className="aspect-[4/3] bg-muted flex items-center justify-center relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Award className="h-12 w-12 text-primary" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                          {certificate.imageUrl && (
                            <ImageWithFallback
                              src={certificate.imageUrl}
                              alt={certificate.title}
                              className="object-cover"
                            />
                          )}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-1">{certificate.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Issued on: {formatDate(certificate.issuedDate)}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {certificate.skills.map((skill) => (
                            <Badge key={skill.id} variant="outline">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 gap-2" 
                            variant="outline"
                            onClick={() => onViewCertificate(certificate.id)}
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                          <Button 
                            className="flex-1" 
                            onClick={() => onViewCertificate(certificate.id)}
                          >
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Certificates Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete courses and learning paths to earn certificates
                  </p>
                  <Button onClick={() => onViewCourse("")}>
                    Browse Courses
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Activity tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Activity</CardTitle>
              <CardDescription>
                Your recent learning milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userProfile.learningActivity.length > 0 ? (
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-6 border-l-2 border-dashed border-muted-foreground/30"></div>
                  
                  <div className="space-y-4">
                    {userProfile.learningActivity.map((activity, index) => (
                      <div key={index} className="flex gap-4 relative">
                        <div className="z-10 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          {activity.type === "course_started" && <BookOpen className="h-5 w-5 text-primary" />}
                          {activity.type === "course_completed" && <CheckCircle className="h-5 w-5 text-primary" />}
                          {activity.type === "lesson_completed" && <FileText className="h-5 w-5 text-primary" />}
                          {activity.type === "quiz_passed" && <CheckSquare className="h-5 w-5 text-primary" />}
                          {activity.type === "certificate_earned" && <Award className="h-5 w-5 text-primary" />}
                          {activity.type === "badge_earned" && <Shield className="h-5 w-5 text-primary" />}
                        </div>
                        
                        <div className="flex-grow pb-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">
                              {activity.type.split("_").map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(" ")}
                            </h3>
                            <Badge variant="outline">
                              {formatDate(activity.date)}
                            </Badge>
                          </div>
                          <p className="mt-1">{activity.entityTitle}</p>
                          {activity.points && (
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {activity.points} minutes
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <BarChart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Activity Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start a course to track your learning activity
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


