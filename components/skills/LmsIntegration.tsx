
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  BookOpen, 
  Clock, 
  Star, 
  Play, 
  Check,
  Calendar,
  BarChart,
  Filter,
  Search,
  Bookmark,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  ChevronRight,
  Plus,
  User,
  Users
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { mockUserSkills, getSkillNameById } from "../../lib/mockSkillsData";
import { 
  Course, 
  CourseStatus, 
  CourseModule, 
  LmsUserProgress,
  mockCourses,
  mockUserProgress,
  mockCertifications
} from "../../lib/mockLmsData";

interface LmsIntegrationProps {
  enrolledCourses?: Course[];
  courseProgress?: LmsUserProgress;
}

export function LmsIntegration({
  enrolledCourses = mockCourses.filter(course => mockUserProgress.enrolledCourses.includes(course.id)),
  courseProgress = mockUserProgress
}: LmsIntegrationProps) {
  const [activeTab, setActiveTab] = useState("enrolled");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);

  // All courses for discovery tab
  const allCourses = mockCourses;

  // Filter courses based on search and category
  const filterCourses = (courses: Course[]) => {
    return courses.filter(course => {
      const matchesSearch = 
        searchQuery === "" || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skillsImproved.some(skillId => {
          const skillName = getSkillNameById(skillId);
          return skillName.toLowerCase().includes(searchQuery.toLowerCase());
        });
      
      const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  };

  const filteredEnrolledCourses = filterCourses(enrolledCourses);
  const filteredAllCourses = filterCourses(allCourses);

  // Get course progress
  const getCourseProgress = (courseId: string): number => {
    const course = courseProgress.courseDetails.find(c => c.courseId === courseId);
    if (!course) return 0;
    
    const completedModules = course.moduleProgress.filter(m => m.completed).length;
    const totalModules = course.moduleProgress.length;
    
    return totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  };

  // Get course status
  const getCourseStatus = (courseId: string): CourseStatus => {
    const course = courseProgress.courseDetails.find(c => c.courseId === courseId);
    if (!course) return "not_started";
    
    return course.status;
  };

  // Format the duration in a nice way
  const formatDuration = (duration: string) => {
    return duration;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get status badge for course
  const getStatusBadge = (status: CourseStatus) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>;
      case "not_started":
        return <Badge variant="outline">Not Started</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
    }
  };

  // Show course details
  const viewCourseDetails = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  // Render course card
  const renderCourseCard = (course: Course) => {
    const progress = getCourseProgress(course.id);
    const status = getCourseStatus(course.id);
    const isEnrolled = courseProgress.enrolledCourses.includes(course.id);
    
    return (
      <Card key={course.id} className="overflow-hidden flex flex-col h-full">
        {course.image && (
          <div className="relative h-48 overflow-hidden">
            <ImageWithFallback 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              {isEnrolled && getStatusBadge(status)}
            </div>
            {course.isPopular && !isEnrolled && (
              <Badge className="absolute top-2 left-2 bg-gold text-white">
                Popular
              </Badge>
            )}
            {course.isRecommended && !isEnrolled && (
              <Badge className="absolute top-2 left-2 bg-navy text-white">
                Recommended
              </Badge>
            )}
          </div>
        )}
        <CardContent className={`flex-grow flex flex-col gap-3 ${course.image ? 'pt-4' : 'pt-6'} pb-2`}>
          <div>
            <h3 className="font-medium line-clamp-2">{course.title}</h3>
            <p className="text-sm text-muted-foreground">{course.provider}</p>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
          
          {isEnrolled && progress > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          <div className="flex flex-wrap gap-1 mt-auto">
            {course.skillsImproved.slice(0, 3).map(skillId => (
              <Badge key={skillId} variant="outline" className="text-xs">
                {getSkillNameById(skillId)}
              </Badge>
            ))}
            {course.skillsImproved.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.skillsImproved.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
        <div className="px-6 py-2 border-t bg-muted/20">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{formatDuration(course.duration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-gold" />
              <span>{course.rating.toFixed(1)} ({course.reviewCount})</span>
            </div>
          </div>
        </div>
        <CardFooter className="p-4 pt-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => viewCourseDetails(course)}
            >
              <FileText className="h-4 w-4 mr-2" />
              Details
            </Button>
            
            {isEnrolled ? (
              <Button size="sm" className="bg-navy hover:bg-navy/90">
                <Play className="h-4 w-4 mr-2" />
                {progress > 0 ? "Continue" : "Start"}
              </Button>
            ) : (
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Enroll
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  };

  // Calculate course statistics
  const totalEnrolled = courseProgress.enrolledCourses.length;
  const completedCourses = courseProgress.courseDetails.filter(c => c.status === "completed").length;
  const inProgressCourses = courseProgress.courseDetails.filter(c => c.status === "in_progress").length;
  const overdueCourses = courseProgress.courseDetails.filter(c => c.status === "overdue").length;
  
  // Average progress across all enrolled courses
  const averageProgress = courseProgress.courseDetails.length > 0 
    ? courseProgress.courseDetails.reduce((sum, course) => {
        return sum + getCourseProgress(course.courseId);
      }, 0) / courseProgress.courseDetails.length
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1>Learning <strong>Management</strong></h1>
          <p className="text-muted-foreground">
            Develop your IT skills with structured online courses
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Learning Schedule
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Transcript
          </Button>
          <Button className="bg-gold hover:bg-gold/90 gap-2">
            <BookOpen className="h-4 w-4" />
            My Learning Path
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Enrolled Courses</p>
                <h2 className="text-3xl font-light">{totalEnrolled}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{Math.round(averageProgress)}%</span>
              </div>
              <Progress value={averageProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Completed</p>
                <h2 className="text-3xl font-light">{completedCourses}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completion Rate</span>
                <span className="font-medium">
                  {totalEnrolled > 0 ? Math.round((completedCourses / totalEnrolled) * 100) : 0}%
                </span>
              </div>
              <Progress 
                value={totalEnrolled > 0 ? (completedCourses / totalEnrolled) * 100 : 0} 
                className="h-2 bg-muted/50"
              >
                <div 
                  className="h-full bg-green-500" 
                  style={{ 
                    width: `${totalEnrolled > 0 ? (completedCourses / totalEnrolled) * 100 : 0}%` 
                  }} 
                />
              </Progress>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">In Progress</p>
                <h2 className="text-3xl font-light">{inProgressCourses}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Play className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Learning</span>
                <span className="font-medium">
                  {courseProgress.lastActiveDate ? formatDate(courseProgress.lastActiveDate) : "Not active"}
                </span>
              </div>
              <Progress 
                value={totalEnrolled > 0 ? (inProgressCourses / totalEnrolled) * 100 : 0} 
                className="h-2 bg-muted/50"
              >
                <div 
                  className="h-full bg-blue-500" 
                  style={{ 
                    width: `${totalEnrolled > 0 ? (inProgressCourses / totalEnrolled) * 100 : 0}%` 
                  }} 
                />
              </Progress>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Overdue</p>
                <h2 className="text-3xl font-light">{overdueCourses}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Attention Required</span>
                <span className="font-medium">
                  {overdueCourses > 0 ? "Action needed" : "All on track"}
                </span>
              </div>
              <Progress 
                value={totalEnrolled > 0 ? (overdueCourses / totalEnrolled) * 100 : 0} 
                className="h-2 bg-muted/50"
              >
                <div 
                  className="h-full bg-red-500" 
                  style={{ 
                    width: `${totalEnrolled > 0 ? (overdueCourses / totalEnrolled) * 100 : 0}%` 
                  }} 
                />
              </Progress>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="enrolled" className="gap-2">
              <BookOpen className="h-4 w-4" />
              My Courses
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2">
              <BarChart className="h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="discover" className="gap-2">
              <Search className="h-4 w-4" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Users className="h-4 w-4" />
              Team Learning
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 h-10 rounded-md border border-input bg-input-background w-full sm:w-auto min-w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="enrolled" className="space-y-6">
          {/* Course progress bar for whole portfolio */}
          <Card className="bg-gradient-to-r from-navy to-navy/90 text-white">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-grow space-y-4 w-full">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-medium">Course Portfolio Progress</h3>
                    <span className="text-xl">{Math.round(averageProgress)}%</span>
                  </div>
                  <Progress value={averageProgress} className="h-3 bg-white/20">
                    <div className="h-full bg-gold" style={{ width: `${averageProgress}%` }} />
                  </Progress>
                  <div className="flex justify-between text-sm text-white/80">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filter section */}
          <div className="flex flex-wrap gap-2 border-b pb-4">
            <Badge 
              variant={categoryFilter === "all" ? "default" : "outline"}
              className="cursor-pointer hover:bg-muted"
              onClick={() => setCategoryFilter("all")}
            >
              All Categories
            </Badge>
            {["cybersecurity", "cloud", "infrastructure", "data", "devops", "leadership"].map(category => (
              <Badge 
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-muted"
                onClick={() => setCategoryFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>

          {/* Enrolled Courses */}
          {filteredEnrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEnrolledCourses.map(course => renderCourseCard(course))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg">
              <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium">No courses found</h3>
              <p className="text-muted-foreground max-w-md mt-2 mb-6">
                {enrolledCourses.length > 0 
                  ? "Try adjusting your search filters to find your enrolled courses."
                  : "You haven't enrolled in any courses yet."}
              </p>
              <div className="flex gap-3">
                {enrolledCourses.length > 0 && (
                  <Button variant="outline" onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}>
                    Clear filters
                  </Button>
                )}
                <Button onClick={() => setActiveTab("discover")}>Browse Courses</Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress Overview</CardTitle>
              <CardDescription>Track your progress across all enrolled courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {enrolledCourses.length > 0 ? (
                  enrolledCourses.map(course => {
                    const progress = getCourseProgress(course.id);
                    const status = getCourseStatus(course.id);
                    const courseDetail = courseProgress.courseDetails.find(c => c.courseId === course.id);
                    
                    return (
                      <div key={course.id} className="flex flex-col md:flex-row gap-4 pb-4 border-b">
                        {course.image && (
                          <div className="w-full md:w-32 h-24 flex-shrink-0">
                            <ImageWithFallback 
                              src={course.image} 
                              alt={course.title} 
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                        )}
                        <div className="flex-grow space-y-3">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{course.title}</h3>
                              <p className="text-sm text-muted-foreground">{course.provider}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {getStatusBadge(status)}
                              <Badge variant="outline" className="bg-muted/30">
                                {course.duration}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                            <div className="flex flex-wrap gap-2">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {courseDetail?.lastAccessDate 
                                  ? `Last accessed: ${formatDate(courseDetail.lastAccessDate)}`
                                  : "Not started yet"}
                              </span>
                              
                              {courseDetail?.completedModules && (
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  {courseDetail.completedModules} of {courseDetail.totalModules} modules
                                </span>
                              )}
                            </div>
                            
                            <Button size="sm" variant="outline" className="sm:self-end">
                              Continue <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No courses enrolled</h3>
                    <p className="text-muted-foreground mt-1 mb-4">
                      Start your learning journey by enrolling in a course
                    </p>
                    <Button onClick={() => setActiveTab("discover")}>Browse Courses</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Course Certifications</CardTitle>
              <CardDescription>Certifications you've earned through completed courses</CardDescription>
            </CardHeader>
            <CardContent>
              {mockCertifications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockCertifications.map(certification => (
                    <Card key={certification.id} className="overflow-hidden bg-muted/10">
                      <div className="p-4 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <Check className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-medium mb-1">{certification.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{certification.issuer}</p>
                        <p className="text-xs text-muted-foreground">
                          Issued on {formatDate(certification.issueDate)}
                        </p>
                        <Button size="sm" variant="outline" className="mt-3">
                          <Download className="h-4 w-4 mr-1" /> Certificate
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Check className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No certifications yet</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Complete courses to earn certifications and badges
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discover" className="space-y-6">
          {/* Course Recommendations */}
          <Card className="bg-gradient-to-r from-navy to-navy/90 text-white">
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription className="text-white/80">
                Based on your skills profile and learning history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockCourses
                  .filter(course => course.isRecommended)
                  .slice(0, 3)
                  .map(course => (
                    <Card key={course.id} className="bg-white/10 backdrop-blur-sm text-white border-white/20">
                      <CardContent className="p-4 space-y-3">
                        <div>
                          <h3 className="font-medium line-clamp-1">{course.title}</h3>
                          <p className="text-sm text-white/80">{course.provider}</p>
                        </div>
                        <p className="text-sm text-white/80 line-clamp-2">{course.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {course.skillsImproved.slice(0, 2).map(skillId => (
                            <Badge key={skillId} className="bg-white/20 text-white text-xs">
                              {getSkillNameById(skillId)}
                            </Badge>
                          ))}
                        </div>
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 w-full">
                            View Course
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Filter section */}
          <div className="flex flex-wrap gap-2 border-b pb-4">
            <Badge 
              variant={categoryFilter === "all" ? "default" : "outline"}
              className="cursor-pointer hover:bg-muted"
              onClick={() => setCategoryFilter("all")}
            >
              All Categories
            </Badge>
            {["cybersecurity", "cloud", "infrastructure", "data", "devops", "leadership"].map(category => (
              <Badge 
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-muted"
                onClick={() => setCategoryFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>

          {/* All Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAllCourses.map(course => renderCourseCard(course))}
          </div>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Learning</CardTitle>
              <CardDescription>Collaborative learning and shared skill development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-12 flex flex-col items-center justify-center border rounded-lg">
                <Users className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">Team Learning Coming Soon</h3>
                <p className="text-muted-foreground max-w-md text-center mt-2 mb-6">
                  Track team progress, share learning resources, and coordinate skill development across your organization
                </p>
                <Button>Learn More</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Course Details Dialog */}
      <Dialog open={showCourseDetails} onOpenChange={setShowCourseDetails}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedCourse && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCourse.title}</DialogTitle>
                <DialogDescription>
                  Provided by {selectedCourse.provider}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {selectedCourse.image && (
                  <div className="h-48 overflow-hidden rounded-lg">
                    <ImageWithFallback 
                      src={selectedCourse.image} 
                      alt={selectedCourse.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {selectedCourse.duration}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-gold" /> {selectedCourse.rating.toFixed(1)} ({selectedCourse.reviewCount} reviews)
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {selectedCourse.enrollmentCount} enrolled
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Skills You'll Improve</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.skillsImproved.map(skillId => (
                      <Badge key={skillId} variant="outline">
                        {getSkillNameById(skillId)}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Course Modules</h4>
                  <div className="space-y-2">
                    {selectedCourse.modules?.map((module, index) => {
                      const courseDetail = courseProgress.courseDetails.find(c => c.courseId === selectedCourse.id);
                      const moduleProgress = courseDetail?.moduleProgress.find(m => m.moduleId === module.id);
                      
                      return (
                        <div key={module.id} className="p-3 rounded-lg border flex justify-between items-center bg-muted/10">
                          <div className="space-y-1">
                            <div className="font-medium text-sm">{index + 1}. {module.title}</div>
                            <div className="text-xs text-muted-foreground">{module.duration}</div>
                          </div>
                          
                          {moduleProgress?.completed ? (
                            <Badge className="bg-green-100 text-green-700">Completed</Badge>
                          ) : (
                            courseDetail ? (
                              <Badge variant="outline">Not Completed</Badge>
                            ) : null
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  className="sm:flex-1"
                  onClick={() => setShowCourseDetails(false)}
                >
                  Close
                </Button>
                
                {courseProgress.enrolledCourses.includes(selectedCourse.id) ? (
                  <Button 
                    className="sm:flex-1 bg-navy hover:bg-navy/90"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Continue Course
                  </Button>
                ) : (
                  <Button 
                    className="sm:flex-1"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Enroll Now
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
