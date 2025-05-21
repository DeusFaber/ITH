
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Course } from "../../lib/lmsTypes";
import { BookOpen, Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface LmsCourseCardProps {
  course: Course;
  progress?: number;
  onViewCourse: () => void;
}

export function LmsCourseCard({ course, progress = 0, onViewCourse }: LmsCourseCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
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
          <Badge variant="outline" className="capitalize">
            {course.skillLevel}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex-grow">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">
            {course.modules.length} modules
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">
            {course.estimatedHours} hours
          </span>
        </div>

        {progress > 0 && (
          <div className="space-y-1 pt-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full" onClick={onViewCourse}>
          {progress > 0 ? "Continue Course" : "Start Course"}
        </Button>
      </CardFooter>
    </Card>
  );
}
