
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LearningPath, Course, UserProgress } from "../../lib/lmsTypes";
import { ArrowRight, Award, BookOpen, Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LmsCourseCard } from "./LmsCourseCard";

interface LmsDashboardProps {
  learningPaths: LearningPath[];
  courses: Course[];
  userProgress: UserProgress;
  onViewCourse: (courseId: string) => void;
  onViewPath: (pathId: string) => void;
}

export function LmsDashboard({ 
  learningPaths, 
  courses, 
  userProgress, 
  onViewCourse,
  onViewPath 
}: LmsDashboardProps) {
  // Calculate current learning path progress
  const activePath = userProgress.learningPathsProgress[0];
  const activePathData = learningPaths.find(path => path.id === activePath?.pathId);

  // Get in progress courses
  const inProgressCourseIds = userProgress.courseProgress
    .filter(cp => cp.percentComplete > 0 && cp.percentComplete < 100)
    .map(cp => cp.courseId);
  
  const inProgressCourses = courses
    .filter(course => inProgressCourseIds.includes(course.id))
    .map(course => {
      const progress = userProgress.courseProgress.find(cp => cp.courseId === course.id);
      return {
        ...course,
        progress: progress?.percentComplete || 0
      };
    });

  // Get recommended courses (not started + matching the user's role/plan)
  const startedCourseIds = userProgress.courseProgress.map(cp => cp.courseId);
  const recommendedCourses = courses
    .filter(course => !startedCourseIds.includes(course.id))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome and Progress Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Welcome to Your Learning Dashboard</CardTitle>
          <CardDescription>
            Track your progress, continue learning, and discover new courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activePathData ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3>Current Learning Path: {activePathData.title}</h3>
                  <p className="text-muted-foreground">
                    {activePathData.description}
                  </p>
                </div>
                <Badge className="ml-2">
                  {activePath.percentComplete}% Complete
                </Badge>
              </div>
              <Progress value={activePath.percentComplete} className="h-2" />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Est. {activePathData.estimatedHours} hours to complete
                  </span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => onViewPath(activePathData.id)}
                >
                  Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">
              <p>You haven't started a learning path yet.</p>
              <Button 
                className="mt-2" 
                onClick={() => onViewPath(learningPaths[0].id)}
              >
                Start Learning
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs for In Progress and Recommended */}
      <Tabs defaultValue="in-progress" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        {/* In Progress Courses */}
        <TabsContent value="in-progress" className="mt-4">
          {inProgressCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressCourses.map(course => (
                <LmsCourseCard 
                  key={course.id}
                  course={course}
                  progress={userProgress.courseProgress.find(cp => cp.courseId === course.id)?.percentComplete || 0}
                  onViewCourse={() => onViewCourse(course.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4">No courses in progress</h3>
                <p className="text-muted-foreground">
                  Start a course to see it here
                </p>
                <Button 
                  className="mt-4" 
                  onClick={() => onViewCourse(courses[0].id)}
                >
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Recommended Courses */}
        <TabsContent value="recommended" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedCourses.map(course => (
              <Card key={course.id} className="overflow-hidden flex flex-col">
                {course.thumbnail && (
                  <div className="w-full h-40 overflow-hidden">
                    <ImageWithFallback
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{course.title}</CardTitle>
                    <Badge variant="outline">{course.skillLevel}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 mt-auto">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {course.estimatedHours} hours
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => onViewCourse(course.id)}
                    >
                      Start Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Learning Paths */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Paths</CardTitle>
          <CardDescription>
            Structured learning journeys for your role and skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningPaths.slice(0, 4).map(path => {
              const pathProgress = userProgress.learningPathsProgress.find(p => p.pathId === path.id);
              return (
                <Card key={path.id} className="overflow-hidden">
                  <div className="flex items-center space-x-4 p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {pathProgress?.percentComplete ? (
                        <div className="relative w-12 h-12">
                          <svg className="w-12 h-12" viewBox="0 0 36 36">
                            <path
                              className="stroke-primary/20"
                              fill="none"
                              strokeWidth="3"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="stroke-primary"
                              fill="none"
                              strokeWidth="3"
                              strokeDasharray={`${pathProgress.percentComplete}, 100`}
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text
                              x="18"
                              y="20.35"
                              className="fill-primary text-[9px]"
                              textAnchor="middle"
                            >
                              {pathProgress.percentComplete}%
                            </text>
                          </svg>
                        </div>
                      ) : (
                        <Award className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4>{path.title}</h4>
                      <p className="text-muted-foreground text-sm line-clamp-1">
                        {path.description}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewPath(path.id)}
                    >
                      {pathProgress ? "Continue" : "Start"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
