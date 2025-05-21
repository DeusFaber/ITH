
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Search, 
  CheckCircle, 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  BarChart, 
  TrendingUp,
  Award,
  Play,
  ArrowRight,
  ListFilter,
  Laptop,
  UserPlus,
  Bookmark,
  ChevronRight
} from "lucide-react";
import { 
  LearningPath, 
  Course, 
  SkillRecommendation,
  mockLearningPaths,
  mockSkillRecommendations,
  getSkillLevelName
} from "../../lib/mockSkillsData";
import { mockUserSkills } from "../../lib/mockSkillsData";

interface SkillPathsExplorerProps {
  learningPaths?: LearningPath[];
  recommendations?: SkillRecommendation[];
}

export function SkillPathsExplorer({
  learningPaths = mockLearningPaths,
  recommendations = mockSkillRecommendations
}: SkillPathsExplorerProps) {
  const [activeTab, setActiveTab] = useState("paths");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultFilter, setDifficultFilter] = useState<string>("all");
  const [formatFilter, setFormatFilter] = useState<string>("all");
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  // Filter learning paths
  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = 
      searchQuery === "" || 
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = difficultFilter === "all" || path.difficulty === difficultFilter;
    
    return matchesSearch && matchesDifficulty;
  });

  // Get all courses from all paths
  const allCourses = learningPaths.flatMap(path => path.courses);
  
  // Filter courses
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = 
      searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFormat = formatFilter === "all" || course.format === formatFilter;
    
    return matchesSearch && matchesFormat;
  });

  // Format the duration in a nice way
  const formatDuration = (duration: string) => {
    return duration;
  };

  // Function to find skill name by ID
  const getSkillNameById = (skillId: string) => {
    const skill = mockUserSkills.find(s => s.id === skillId);
    return skill ? skill.name : "Unknown Skill";
  };

  // Render course card
  const renderCourseCard = (course: Course) => (
    <Card key={course.id} className="overflow-hidden flex flex-col h-full">
      {course.image && (
        <div className="relative h-40 overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          {course.isPopular && (
            <Badge className="absolute top-2 left-2 bg-gold text-white">
              Popular
            </Badge>
          )}
          {course.isRecommended && (
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
        <div className="flex flex-wrap gap-1 mt-auto">
          {course.skillsImproved.map(skillId => (
            <Badge key={skillId} variant="outline" className="text-xs">
              {getSkillNameById(skillId)}
            </Badge>
          ))}
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
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="sm" className="bg-navy hover:bg-navy/90">
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  // Render learning path card
  const renderLearningPathCard = (path: LearningPath) => (
    <Card 
      key={path.id}
      className={`cursor-pointer transition-all duration-300 ${hoveredPath === path.id ? 'shadow-md border-primary/20' : ''}`}
      onMouseEnter={() => setHoveredPath(path.id)}
      onMouseLeave={() => setHoveredPath(null)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{path.title}</CardTitle>
          <Badge variant={path.difficulty === "beginner" ? "outline" : path.difficulty === "intermediate" ? "secondary" : "default"}>
            {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
          </Badge>
        </div>
        <CardDescription>{path.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 space-y-4">
        <div className="flex flex-wrap gap-1">
          {path.skillsImproved.map(skillId => (
            <Badge key={skillId} variant="outline" className="text-xs">
              {getSkillNameById(skillId)}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col items-center p-2 bg-muted/20 rounded-md">
            <Clock className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="font-medium">{path.duration}</span>
            <span className="text-xs text-muted-foreground">Duration</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-muted/20 rounded-md">
            <Users className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="font-medium">{path.enrolledCount}</span>
            <span className="text-xs text-muted-foreground">Enrolled</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-muted/20 rounded-md">
            <BarChart className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="font-medium">{path.completionRate}%</span>
            <span className="text-xs text-muted-foreground">Completion</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Popularity</span>
            <span>{path.popularity}%</span>
          </div>
          <Progress value={path.popularity} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-navy hover:bg-navy/90">
          View Learning Path
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1>Learning <strong>Paths</strong></h1>
          <p className="text-muted-foreground">
            Discover and follow structured learning paths to improve your skills
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Saved Courses
          </Button>
          <Button variant="outline" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Team Learning
          </Button>
          <Button className="bg-gold hover:bg-gold/90 gap-2">
            <Laptop className="h-4 w-4" />
            My Learning
          </Button>
        </div>
      </div>

      {/* Recommended Skills Section */}
      <Card className="bg-gradient-to-r from-navy/95 to-navy text-white">
        <CardHeader>
          <CardTitle>Improve Your Skill Gaps</CardTitle>
          <CardDescription className="text-white/80">
            Focused recommendations based on your skill assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map(recommendation => (
              <Card key={recommendation.skillId} className="bg-white/10 backdrop-blur-sm text-white border-white/20">
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h3 className="font-medium">{getSkillNameById(recommendation.skillId)}</h3>
                    <div className="flex gap-2 items-center mt-1">
                      <Badge className="bg-white/20 text-white hover:bg-white/30">
                        Current: {getSkillLevelName(recommendation.currentLevel)}
                      </Badge>
                      <ArrowRight className="h-3 w-3" />
                      <Badge className="bg-gold/90 text-white hover:bg-gold">
                        Target: {getSkillLevelName(recommendation.targetLevel)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-white/80">Top recommended course:</div>
                    {recommendation.recommendedCourses.length > 0 && (
                      <div className="p-2 rounded bg-white/10 border border-white/20 flex gap-2 items-center">
                        <div className="flex-grow">
                          <div className="font-medium text-sm">{recommendation.recommendedCourses[0].title}</div>
                          <div className="text-xs text-white/70">{recommendation.recommendedCourses[0].provider}</div>
                        </div>
                        <Button size="sm" variant="outline" className="border-white/50 text-white hover:bg-white/20">
                          View
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="paths" className="gap-2">
              <Award className="h-4 w-4" />
              Learning Paths
            </TabsTrigger>
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Individual Courses
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              My Progress
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 h-10 rounded-md border border-input bg-input-background w-full sm:w-auto min-w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <ListFilter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="paths" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.length > 0 ? (
              filteredPaths.map(path => renderLearningPathCard(path))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center border rounded-lg">
                <Search className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No learning paths found</h3>
                <p className="text-muted-foreground mt-1 mb-4">Try adjusting your search filters</p>
                <Button onClick={() => {
                  setSearchQuery("");
                  setDifficultFilter("all");
                }}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex flex-wrap gap-2 border-b pb-4">
            <Badge 
              variant={formatFilter === "all" ? "default" : "outline"}
              className="cursor-pointer hover:bg-muted"
              onClick={() => setFormatFilter("all")}
            >
              All Formats
            </Badge>
            {(["video", "interactive", "document", "webinar", "workshop"] as string[]).map(format => (
              <Badge 
                key={format}
                variant={formatFilter === format ? "default" : "outline"}
                className="cursor-pointer hover:bg-muted"
                onClick={() => setFormatFilter(format)}
              >
                {format.charAt(0).toUpperCase() + format.slice(1)}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => renderCourseCard(course))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center border rounded-lg">
                <Search className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No courses found</h3>
                <p className="text-muted-foreground mt-1 mb-4">Try adjusting your search filters</p>
                <Button onClick={() => {
                  setSearchQuery("");
                  setFormatFilter("all");
                }}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Progress</CardTitle>
              <CardDescription>Track all your courses and learning paths</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-12 flex flex-col items-center justify-center border rounded-lg">
                <TrendingUp className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">Progress Tracking Coming Soon</h3>
                <p className="text-muted-foreground max-w-md text-center mt-2 mb-6">
                  Track your learning progress, completed courses, and achievement badges all in one place
                </p>
                <Button>Enroll in a Course</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
