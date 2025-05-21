
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, CheckCircle, ChevronRight } from "lucide-react";
import { Progress } from "../ui/progress";

export interface Survey {
  id: string;
  title: string;
  description: string;
  status: "open" | "completed" | "expired";
  dueDate: string;
  estimatedTime: string;
  questionsCount: number;
  progress?: number;
  category: string;
}

interface SurveyCardProps {
  survey: Survey;
  onStart: (id: string) => void;
  onContinue: (id: string) => void;
  onView: (id: string) => void;
}

export function SurveyCard({ survey, onStart, onContinue, onView }: SurveyCardProps) {
  const getStatusBadge = () => {
    switch (survey.status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800">Open</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>;
      default:
        return null;
    }
  };

  const getDaysRemaining = () => {
    const today = new Date();
    const dueDate = new Date(survey.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{survey.title}</CardTitle>
            <CardDescription>{survey.description}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Est. {survey.estimatedTime} · {survey.questionsCount} questions
            </span>
          </div>

          {survey.status === "open" && survey.progress !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{survey.progress}% complete</span>
                {getDaysRemaining() > 0 ? (
                  <span className="text-muted-foreground">
                    {getDaysRemaining()} days left
                  </span>
                ) : (
                  <span className="text-red-500">Due today</span>
                )}
              </div>
              <Progress value={survey.progress} className="h-2" />
            </div>
          )}

          {survey.status === "open" && survey.progress === undefined && (
            <div className="text-sm text-muted-foreground">
              {getDaysRemaining() > 0 ? (
                <span>Available for {getDaysRemaining()} more days</span>
              ) : (
                <span className="text-red-500">Due today</span>
              )}
            </div>
          )}

          {survey.status === "completed" && (
            <div className="flex items-center text-green-600 gap-1 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>Completed on {new Date(survey.dueDate).toLocaleDateString()}</span>
            </div>
          )}

          <div className="flex items-center">
            <Badge variant="outline" className="capitalize">
              {survey.category}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {survey.status === "open" && survey.progress === undefined && (
          <Button 
            className="w-full" 
            onClick={() => onStart(survey.id)}
          >
            Start Survey
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}

        {survey.status === "open" && survey.progress !== undefined && (
          <Button 
            className="w-full" 
            onClick={() => onContinue(survey.id)}
          >
            Continue Survey
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}

        {survey.status !== "open" && (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => onView(survey.id)}
          >
            View Results
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
