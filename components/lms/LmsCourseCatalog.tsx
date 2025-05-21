
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LearningPath, Course } from "../../lib/lmsTypes";
import { LmsCourseCard } from "./LmsCourseCard";
import { CheckIcon, SearchIcon } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface LmsCourseCatalogProps {
  learningPaths: LearningPath[];
  courses: Course[];
  onViewCourse: (courseId: string) => void;
  onViewPath: (pathId: string) => void;
}

export function LmsCourseCatalog({
  learningPaths,
  courses,
  onViewCourse,
  onViewPath,
}: LmsCourseCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState("all");

  // Extract unique plans from courses
  const uniquePlans = Array.from(
    new Set(courses.flatMap((course) => course.forPlans))
  );

  // Filter courses based on search and filters
  const filteredCourses = courses.filter((course) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Skill level filter
    const matchesSkillLevel =
      selectedSkillLevel === "all" || course.skillLevel === selectedSkillLevel;

    // Plan filter
    const matchesPlan =
      selectedPlan === "all" ||
      course.forPlans.includes(selectedPlan);

    return matchesSearch && matchesSkillLevel && matchesPlan;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Course Catalog</CardTitle>
          <CardDescription>
            Browse all courses and learning paths
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={selectedSkillLevel}
              onValueChange={setSelectedSkillLevel}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Skill Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedPlan}
              onValueChange={setSelectedPlan}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Health Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                {uniquePlans.map((plan) => (
                  <SelectItem key={plan} value={plan}>
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="mt-4">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <LmsCourseCard
                  key={course.id}
                  course={course}
                  onViewCourse={() => onViewCourse(course.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <div className="space-y-2">
                  <h3>No courses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Learning Paths Tab */}
        <TabsContent value="paths" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="overflow-hidden flex flex-col h-full">
                {path.thumbnail && (
                  <div className="h-48 w-full overflow-hidden">
                    <ImageWithFallback
                      src={path.thumbnail}
                      alt={path.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{path.title}</CardTitle>
                    <Badge className="capitalize">
                      {path.estimatedHours} hours
                    </Badge>
                  </div>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div>
                    <h4 className="mb-2">Skills you'll gain:</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill) => (
                        <Badge key={skill.id} variant="outline" className="flex items-center gap-1">
                          <CheckIcon className="h-3 w-3" />
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="mb-2">Ideal for:</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.forRoles.map((role) => (
                        <Badge key={role} variant="secondary">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="mb-2">Includes:</h4>
                    <p className="text-muted-foreground">
                      {path.courses.length} courses • {path.estimatedHours} hours • {
                        path.requiredForCertification ? "Includes certification" : "No certification"
                      }
                    </p>
                  </div>
                </CardContent>
                <div className="p-4 pt-0">
                  <Button 
                    className="w-full" 
                    onClick={() => onViewPath(path.id)}
                  >
                    View Learning Path
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
