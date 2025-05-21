
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "../ui/tabs";
import {
  Search,
  BookOpen,
  FileText,
  Play,
  Award,
  CheckCircle,
  Clock
} from "lucide-react";
import { 
  LearningPath, 
  Course, 
  Module, 
  Lesson, 
  Skill 
} from "../../lib/lmsTypes";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "course" | "lesson" | "path" | "skill";
  parentTitle?: string;
  thumbnail?: string;
  relevance: number;
  tags?: string[];
  duration?: number;
  skillLevel?: string;
}

interface LmsSearchProps {
  learningPaths: LearningPath[];
  courses: Course[];
  skills: Skill[];
  onViewCourse: (courseId: string) => void;
  onViewPath: (pathId: string) => void;
  onViewLesson: (courseId: string, moduleId: string, lessonId: string) => void;
}

export function LmsSearch({
  learningPaths,
  courses,
  skills,
  onViewCourse,
  onViewPath,
  onViewLesson
}: LmsSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // When search term changes, update results
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulating search delay for better UX
    const searchTimeout = setTimeout(() => {
      const results = performSearch(searchTerm);
      setSearchResults(results);
      setIsSearching(false);
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchTerm) && searchTerm.trim().length > 0) {
        setRecentSearches(prev => [searchTerm, ...prev.slice(0, 4)]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  const performSearch = (term: string): SearchResult[] => {
    const normalizedTerm = term.toLowerCase();
    const results: SearchResult[] = [];

    // Search in courses
    courses.forEach(course => {
      // Check course title and description
      const titleMatch = course.title.toLowerCase().includes(normalizedTerm);
      const descMatch = course.description.toLowerCase().includes(normalizedTerm);
      const tagMatch = course.tags.some(tag => tag.toLowerCase().includes(normalizedTerm));
      
      if (titleMatch || descMatch || tagMatch) {
        results.push({
          id: course.id,
          title: course.title,
          description: course.description,
          type: "course",
          thumbnail: course.thumbnail,
          relevance: titleMatch ? 100 : (tagMatch ? 80 : 60),
          tags: course.tags,
          duration: course.estimatedHours * 60,
          skillLevel: course.skillLevel
        });
      }

      // Search in modules and lessons
      course.modules.forEach(module => {
        if (module.title.toLowerCase().includes(normalizedTerm) || 
            module.description.toLowerCase().includes(normalizedTerm)) {
          
          // For modules, we add the lessons as results
          module.lessons.forEach(lesson => {
            results.push({
              id: `${course.id}-${module.id}-${lesson.id}`,
              title: lesson.title,
              description: lesson.description,
              type: "lesson",
              parentTitle: `${course.title} > ${module.title}`,
              relevance: 70,
              duration: lesson.estimatedMinutes
            });
          });
        }
        
        // Search in lessons
        module.lessons.forEach(lesson => {
          if (lesson.title.toLowerCase().includes(normalizedTerm) || 
              lesson.description.toLowerCase().includes(normalizedTerm)) {
            results.push({
              id: `${course.id}-${module.id}-${lesson.id}`,
              title: lesson.title,
              description: lesson.description,
              type: "lesson",
              parentTitle: `${course.title} > ${module.title}`,
              relevance: lesson.title.toLowerCase().includes(normalizedTerm) ? 90 : 70,
              duration: lesson.estimatedMinutes
            });
          }
        });
      });
    });

    // Search in learning paths
    learningPaths.forEach(path => {
      if (path.title.toLowerCase().includes(normalizedTerm) || 
          path.description.toLowerCase().includes(normalizedTerm)) {
        results.push({
          id: path.id,
          title: path.title,
          description: path.description,
          type: "path",
          thumbnail: path.thumbnail,
          relevance: path.title.toLowerCase().includes(normalizedTerm) ? 95 : 75,
          duration: path.estimatedHours * 60
        });
      }
    });

    // Search in skills
    skills.forEach(skill => {
      if (skill.name.toLowerCase().includes(normalizedTerm) || 
          skill.description.toLowerCase().includes(normalizedTerm)) {
        results.push({
          id: skill.id,
          title: skill.name,
          description: skill.description,
          type: "skill",
          relevance: skill.name.toLowerCase().includes(normalizedTerm) ? 85 : 65
        });
      }
    });

    // Filter results based on selected filter
    const filteredResults = selectedFilter === "all" 
      ? results 
      : results.filter(result => result.type === selectedFilter);

    // Sort by relevance (highest first)
    return filteredResults.sort((a, b) => b.relevance - a.relevance);
  };

  const handleResultClick = (result: SearchResult) => {
    switch (result.type) {
      case "course":
        onViewCourse(result.id);
        break;
      case "path":
        onViewPath(result.id);
        break;
      case "lesson":
        // Parse the composite ID
        const [courseId, moduleId, lessonId] = result.id.split("-");
        onViewLesson(courseId, moduleId, lessonId);
        break;
      case "skill":
        // For skills, we could show courses that teach this skill
        // For now, just filter the search to only show this skill
        setSearchTerm(result.title);
        setSelectedFilter("skill");
        break;
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4" />;
      case "lesson":
        return <FileText className="h-4 w-4" />;
      case "path":
        return <Award className="h-4 w-4" />;
      case "skill":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "";
    
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins ? `${hours}h ${mins}m` : `${hours}h`;
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  // Handle recent search click
  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Search Learning Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, lessons, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-12"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-6 w-6 p-0"
              onClick={handleClearSearch}
            >
              &times;
            </Button>
          )}
        </div>

        {/* Recent searches */}
        {!searchTerm && recentSearches.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => handleRecentSearchClick(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Search tabs */}
        {searchResults.length > 0 && (
          <Tabs defaultValue="all" value={selectedFilter} onValueChange={setSelectedFilter}>
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="course">Courses</TabsTrigger>
              <TabsTrigger value="lesson">Lessons</TabsTrigger>
              <TabsTrigger value="path">Paths</TabsTrigger>
              <TabsTrigger value="skill">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="space-y-4">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-start space-x-3 p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleResultClick(result)}
                    >
                      {result.thumbnail && result.type !== "lesson" ? (
                        <div className="w-16 h-16 overflow-hidden rounded-md shrink-0">
                          <ImageWithFallback
                            src={result.thumbnail}
                            alt={result.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center shrink-0">
                          {result.type === "lesson" && result.parentTitle?.includes("video") ? (
                            <Play className="h-6 w-6 text-muted-foreground" />
                          ) : (
                            getIconForType(result.type)
                          )}
                        </div>
                      )}
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium truncate">{result.title}</h3>
                          <Badge className="ml-2 shrink-0 capitalize">
                            {result.type}
                          </Badge>
                        </div>
                        {result.parentTitle && (
                          <p className="text-sm text-muted-foreground mb-1">
                            {result.parentTitle}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.description}
                        </p>
                        <div className="flex items-center mt-1 gap-3">
                          {result.duration && (
                            <div className="flex items-center text-xs text-muted-foreground gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDuration(result.duration)}
                            </div>
                          )}
                          {result.skillLevel && (
                            <Badge variant="outline" className="text-xs">
                              {result.skillLevel}
                            </Badge>
                          )}
                          {result.tags && result.tags.length > 0 && (
                            <div className="flex items-center gap-1 overflow-hidden">
                              {result.tags.slice(0, 2).map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {result.tags.length > 2 && (
                                <span className="text-xs text-muted-foreground">+{result.tags.length - 2}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    {isSearching ? "Searching..." : "No results found"}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Filter-specific content */}
            {["course", "lesson", "path", "skill"].map((filter) => (
              <TabsContent key={filter} value={filter} className="mt-0">
                <div className="space-y-4">
                  {searchResults.filter(r => r.type === filter).length > 0 ? (
                    searchResults
                      .filter(r => r.type === filter)
                      .map((result) => (
                        <div
                          key={result.id}
                          className="flex items-start space-x-3 p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => handleResultClick(result)}
                        >
                          {result.thumbnail ? (
                            <div className="w-16 h-16 overflow-hidden rounded-md shrink-0">
                              <ImageWithFallback
                                src={result.thumbnail}
                                alt={result.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center shrink-0">
                              {getIconForType(result.type)}
                            </div>
                          )}
                          <div className="flex-grow min-w-0">
                            <h3 className="font-medium">{result.title}</h3>
                            {result.parentTitle && (
                              <p className="text-sm text-muted-foreground mb-1">
                                {result.parentTitle}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {result.description}
                            </p>
                            <div className="flex items-center mt-1 gap-3">
                              {result.duration && (
                                <div className="flex items-center text-xs text-muted-foreground gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatDuration(result.duration)}
                                </div>
                              )}
                              {result.skillLevel && (
                                <Badge variant="outline" className="text-xs">
                                  {result.skillLevel}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No {filter}s found
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Search in progress indicator */}
        {isSearching && (
          <div className="flex justify-center py-4">
            <div className="animate-pulse text-muted-foreground">Searching...</div>
          </div>
        )}

        {/* No results state */}
        {searchTerm.length > 1 && !isSearching && searchResults.length === 0 && (
          <div className="text-center py-8">
            <Search className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium mb-1">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse the catalog
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
