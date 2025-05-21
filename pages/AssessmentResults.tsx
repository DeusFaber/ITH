
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { CheckCircle, AlertCircle, XCircle, ChevronRight, BarChart2, UserPlus } from "lucide-react";
import { AssessmentResult } from "../lib/assessmentTypes";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { useAssessment } from "../contexts/AssessmentContext";

interface AssessmentResultsProps {
  result: AssessmentResult;
  answers: Record<string, string>;
  onShowPlans: () => void;
  isAuthenticated?: boolean;
}

export function AssessmentResults({ 
  result, 
  answers, 
  onShowPlans,
  isAuthenticated = false
}: AssessmentResultsProps) {
  const { saveAssessment } = useAssessment();
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveResults = () => {
    // Save assessment to history
    saveAssessment(result, answers);
    setIsSaved(true);
    toast.success("Assessment saved to your history");
  };

  const getScoreBadge = () => {
    switch (result.maturityLevel) {
      case "basic":
        return {
          icon: <XCircle className="h-12 w-12 text-red-500" />,
          color: "text-red-500",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          label: "Basic",
          emoji: "🔴"
        };
      case "stable":
        return {
          icon: <AlertCircle className="h-12 w-12 text-amber-500" />,
          color: "text-amber-500",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          label: "Stable",
          emoji: "🟡"
        };
      case "smart":
        return {
          icon: <CheckCircle className="h-12 w-12 text-green-500" />,
          color: "text-green-500",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          label: "Smart",
          emoji: "🟢"
        };
      default:
        return {
          icon: <AlertCircle className="h-12 w-12 text-amber-500" />,
          color: "text-amber-500",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          label: "Stable",
          emoji: "🟡"
        };
    }
  };

  const scoreBadge = getScoreBadge();

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4 md:px-6 lg:py-16">
      <Card className="overflow-hidden shadow-lg border-navy/10">
        <CardHeader className="pb-0 pt-6 text-center">
          <h1 className="text-3xl font-light mb-4 text-navy">Here's Your IT Health Score</h1>
        </CardHeader>

        <CardContent className="px-6 py-8">
          <div className="flex flex-col items-center mb-8">
            <div className={`flex items-center justify-center h-24 w-24 rounded-full ${scoreBadge.bgColor} ${scoreBadge.borderColor} border-2 mb-4`}>
              <span className="text-4xl" aria-hidden="true">
                {scoreBadge.emoji}
              </span>
              <span className="sr-only">{scoreBadge.label}</span>
            </div>
            <h2 className={`text-2xl font-medium ${scoreBadge.color}`}>
              {scoreBadge.label}
            </h2>
            <p className="text-lg text-center mt-2 text-muted-foreground">
              You're on your way — let's show you what to improve.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4 text-navy">Your Highlights</h3>
            <ul className="space-y-3">
              {result.insights.map((insight, index) => (
                <li key={index} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-gold flex items-center justify-center">
                      <ChevronRight className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <p>{insight}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={onShowPlans} 
              className="w-full py-6 text-lg bg-gold hover:bg-gold/90"
            >
              See My Recommended Plans
            </Button>
            
            {!isAuthenticated && (
              <Button
                variant="outline"
                className="w-full gap-2 border-navy/30 text-navy"
                onClick={onShowPlans}
              >
                <UserPlus className="h-4 w-4" />
                Create Free Account to Save Results
              </Button>
            )}
            
            <div className="flex flex-col gap-4 pt-2">

              
              {isAuthenticated && (
                <Button
                  variant="outline"
                  className="gap-2 border-navy/30 text-navy"
                  onClick={handleSaveResults}
                  disabled={isSaved}
                >
                  <BarChart2 className="h-4 w-4" />
                  {isSaved ? "Saved to Your History" : "Save to My Assessment History"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/20 border-t px-6 py-4">
          <p className="text-xs text-center w-full text-muted-foreground">
            Your assessment data is kept private and is used only to provide you with relevant recommendations.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
