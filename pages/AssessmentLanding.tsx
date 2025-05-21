
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Clock, AlertTriangle, BarChart3, CheckCircle } from "lucide-react";

interface AssessmentLandingProps {
  onStart: () => void;
  hasProgress?: boolean;
}

export function AssessmentLanding({ onStart, hasProgress = false }: AssessmentLandingProps) {
  return (
    <div className="container max-w-3xl mx-auto py-16 px-4 md:px-6">
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-blue rounded-full flex items-center justify-center mb-6">
          <BarChart3 className="h-8 w-8 text-white" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {hasProgress 
            ? "Welcome back! We've saved your progress. Continue where you left off or start fresh." 
            : "Discover how your IT setup measures against industry standards and get personalized recommendations to improve your business technology."}
        </p>
      </div>

      <Card className="mb-8 overflow-hidden">
        <CardHeader>
          <CardTitle>
            {hasProgress 
              ? "Continue Your Assessment" 
              : "Start Your Assessment"}
          </CardTitle>
          <CardDescription>
            {hasProgress
              ? "Your previous progress has been saved. Continue where you left off."
              : "Answer 7 quick questions to get your custom IT health scorecard."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-blue/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-blue" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Quick Assessment</h3>
                <p className="text-muted-foreground text-sm">
                  Takes about 2 minutes to complete
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-blue/10 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-5 w-5 text-blue" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Instant Insights</h3>
                <p className="text-muted-foreground text-sm">
                  Get immediate results and actionable recommendations
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-blue/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-blue" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Tailored Solutions</h3>
                <p className="text-muted-foreground text-sm">
                  View IT solutions matched to your specific needs
                </p>
              </div>
            </div>
            
            <div className="mt-2">
              <Button 
                size="lg" 
                className="w-full bg-blue hover:bg-blue/90"
                onClick={onStart}
              >
                {hasProgress ? "Continue Assessment" : "Start Assessment"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100 text-amber-700">
        <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium mb-1">This is not a comprehensive security audit</p>
          <p className="text-sm">
            This assessment provides general guidance based on your responses. 
            For a complete evaluation, please contact our IT specialists.
          </p>
        </div>
      </div>
    </div>
  );
}
