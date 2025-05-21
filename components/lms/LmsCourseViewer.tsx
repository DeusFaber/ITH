
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Course, Module, Lesson, UserProgress } from "../../lib/lmsTypes";
import { BookOpen, CheckCircle, Circle, Clock, FileText, Play, ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface LmsCourseViewerProps {
  course: Course;
  userProgress?: UserProgress;
  onGoBack: () => void;
  onMarkComplete: (lessonId: string, moduleId: string) => void;
  onStartQuiz: (moduleId: string) => void;
}

export function LmsCourseViewer({ 
  course, 
  userProgress, 
  onGoBack, 
  onMarkComplete,
  onStartQuiz
}: LmsCourseViewerProps) {
  const [activeModule, setActiveModule] = useState<string>(
    course.modules[0]?.id || ""
  );
  const [activeLesson, setActiveLesson] = useState<string>(
    course.modules[0]?.lessons[0]?.id || ""
  );

  // Get the current lesson
  const currentModule = course.modules.find(m => m.id === activeModule);
  const currentLesson = currentModule?.lessons.find(l => l.id === activeLesson);

  // Get lesson completion status from user progress
  const getCourseProgress = () => {
    if (!userProgress) return { percentComplete: 0, moduleProgress: [] };
    
    const progress = userProgress.courseProgress.find(cp => cp.courseId === course.id);
    if (!progress) return { percentComplete: 0, moduleProgress: [] };
    
    return progress;
  };

  const courseProgress = getCourseProgress();

  const isLessonComplete = (moduleId: string, lessonId: string) => {
    const moduleProgress = courseProgress.moduleProgress.find(mp => mp.moduleId === moduleId);
    if (!moduleProgress) return false;
    
    const lessonProgress = moduleProgress.lessonProgress.find(lp => lp.lessonId === lessonId);
    return lessonProgress?.complete || false;
  };

  const isModuleComplete = (moduleId: string) => {
    const moduleProgress = courseProgress.moduleProgress.find(mp => mp.moduleId === moduleId);
    if (!moduleProgress) return false;
    
    return moduleProgress.complete;
  };

  const hasPassedQuiz = (moduleId: string) => {
    const moduleProgress = courseProgress.moduleProgress.find(mp => mp.moduleId === moduleId);
    if (!moduleProgress || !moduleProgress.quizAttempts?.length) return false;
    
    return moduleProgress.quizAttempts.some(attempt => attempt.passed);
  };

  // Calculate the next lesson
  const getNextLesson = () => {
    const currentModuleIndex = course.modules.findIndex(m => m.id === activeModule);
    const currentLessonIndex = currentModule?.lessons.findIndex(l => l.id === activeLesson) || 0;
    
    // Check if there's another lesson in the current module
    if (currentModule && currentLessonIndex < currentModule.lessons.length - 1) {
      return {
        moduleId: activeModule,
        lessonId: currentModule.lessons[currentLessonIndex + 1].id
      };
    }
    
    // Check if there's another module
    if (currentModuleIndex < course.modules.length - 1) {
      const nextModule = course.modules[currentModuleIndex + 1];
      if (nextModule.lessons.length > 0) {
        return {
          moduleId: nextModule.id,
          lessonId: nextModule.lessons[0].id
        };
      }
    }
    
    // No next lesson
    return null;
  };

  const handleCompleteAndNext = () => {
    if (currentLesson && currentModule) {
      onMarkComplete(currentLesson.id, currentModule.id);
      
      const next = getNextLesson();
      if (next) {
        setActiveModule(next.moduleId);
        setActiveLesson(next.lessonId);
      }
    }
  };

  // Render lesson content based on type
  const renderLessonContent = () => {
    if (!currentLesson) return <div className="p-12 text-center">Select a lesson to begin</div>;

    switch (currentLesson.type) {
      case "video":
        return (
          <div className="space-y-4">
            <div className="relative pt-[56.25%] bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="h-12 w-12 text-muted-foreground" />
                <span className="sr-only">Video not available in preview</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3">
                {currentLesson.title}
              </div>
            </div>
            <div className="prose max-w-none">
              <h2>{currentLesson.title}</h2>
              <p>{currentLesson.description}</p>
            </div>
          </div>
        );
        
      case "text":
        return (
          <div className="space-y-4">
            <h2>{currentLesson.title}</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
          </div>
        );
        
      case "interactive":
        return (
          <div className="space-y-4">
            <h2>{currentLesson.title}</h2>
            <p>{currentLesson.description}</p>
            <div className="bg-muted p-8 rounded-lg text-center">
              <p className="text-muted-foreground">Interactive content not available in preview</p>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-4">
            <h2>{currentLesson.title}</h2>
            <p>{currentLesson.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        className="gap-2" 
        onClick={onGoBack}
      >
        <ChevronLeft className="h-4 w-4" /> Back to Courses
      </Button>

      {/* Course Header */}
      <Card className="overflow-hidden">
        {course.thumbnail && (
          <div className="w-full h-48 relative overflow-hidden">
            <ImageWithFallback
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="capitalize">{course.skillLevel}</Badge>
                {course.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="capitalize">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        )}
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={course.authorAvatar} />
                <AvatarFallback>{course.authorName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{course.authorName}</p>
                <p className="text-sm text-muted-foreground">{course.authorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {course.modules.length} modules
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {course.estimatedHours} hours
                </span>
              </div>
            </div>
          </div>

          {courseProgress.percentComplete > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Your progress</span>
                <span>{courseProgress.percentComplete}% complete</span>
              </div>
              <Progress value={courseProgress.percentComplete} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>
              {course.modules.length} modules • {
                course.modules.reduce((total, module) => total + module.lessons.length, 0)
              } lessons
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Accordion type="single" collapsible defaultValue={activeModule} className="w-full">
              {course.modules.map((module: Module, moduleIndex: number) => (
                <AccordionItem value={module.id} key={module.id}>
                  <AccordionTrigger className="px-4">
                    <div className="flex items-center gap-2 text-left">
                      <span className="flex-grow truncate">{moduleIndex + 1}. {module.title}</span>
                      {isModuleComplete(module.id) && (
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-0">
                    <div className="space-y-1 pt-1 pb-2">
                      {module.lessons.map((lesson: Lesson, lessonIndex: number) => (
                        <Button 
                          key={lesson.id}
                          variant={lesson.id === activeLesson ? "secondary" : "ghost"}
                          className="w-full justify-start text-left px-8 gap-2"
                          onClick={() => {
                            setActiveModule(module.id);
                            setActiveLesson(lesson.id);
                          }}
                        >
                          <span className="w-5 flex justify-center">
                            {isLessonComplete(module.id, lesson.id) ? (
                              <CheckCircle className="h-4 w-4 text-primary" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                          </span>
                          <span className="truncate">{lessonIndex + 1}. {lesson.title}</span>
                          {lesson.type === "video" && <Play className="h-3 w-3 ml-auto text-muted-foreground" />}
                          {lesson.type === "text" && <FileText className="h-3 w-3 ml-auto text-muted-foreground" />}
                        </Button>
                      ))}
                      
                      {module.quiz && (
                        <Button 
                          variant="ghost"
                          className="w-full justify-start text-left px-8 gap-2 font-medium"
                          onClick={() => onStartQuiz(module.id)}
                          disabled={hasPassedQuiz(module.id)}
                        >
                          <span className="w-5 flex justify-center">
                            {hasPassedQuiz(module.id) ? (
                              <CheckCircle className="h-4 w-4 text-primary" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                          </span>
                          <span>Module Quiz</span>
                          <Badge variant="outline" className="ml-auto">
                            {hasPassedQuiz(module.id) ? "Passed" : "Required"}
                          </Badge>
                        </Button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Content Viewer */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            {renderLessonContent()}
          </CardContent>
          <div className="flex justify-between items-center p-4 border-t">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {currentLesson?.estimatedMinutes || 0} minutes
              </span>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleCompleteAndNext}
                disabled={!currentLesson || isLessonComplete(activeModule, activeLesson)}
              >
                {isLessonComplete(activeModule, activeLesson) ? "Completed" : "Mark Complete & Continue"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
