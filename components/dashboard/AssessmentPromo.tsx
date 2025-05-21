
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { BarChart3, CheckSquare, ArrowRight, History, Users, Maximize2, Timer } from "lucide-react";
import { useAssessment } from "../../contexts/AssessmentContext";

export function AssessmentPromo() {
  const { assessmentHistory } = useAssessment();
  const hasHistory = assessmentHistory.length > 0;

  // Helper function to ensure the assessment opens properly when clicked
  const handleStartAssessment = () => {
    // Using URL parameter approach to trigger assessment
    // This works with the useEffect in App.tsx that checks for URL parameters
    window.location.href = window.location.pathname + '?assessment=true';
  };
  
  // Helper function to open the embedded assessment
  const handleEmbeddedAssessment = () => {
    window.location.href = window.location.pathname + '?embedded_assessment=true';
  };

  return (
    <Card className="bg-pink text-white overflow-hidden border-none shadow-md">
      <CardContent className="p-6 rounded-[16px] rounded-tl-[16px] rounded-tr-[0px] rounded-bl-[16px] rounded-br-[16px]">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div className="flex-grow">
            <h3 className="text-xl font-medium mb-2">IT Health Assessment</h3>
            <p className="text-white/80 text-xs mb-3">
              Take our assessment to discover how your IT setup measures up and get personalized recommendations.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-white" />
                <span className="text-xs text-white/80">7 quick questions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-white" />
                <span className="text-xs text-white/80">Instant results</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-white" />
                <span className="text-xs text-white/80">Custom recommendations</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-white hover:bg-white/90 text-pink rounded-[16px] rounded-tl-[16px] rounded-tr-[0px] rounded-bl-[16px] rounded-br-[16px]"
                data-assessment="true"
                onClick={handleStartAssessment}
              >
                Full Assessment
                <Maximize2 className="ml-2 h-4 w-4" />
              </Button>
              
              <Button
                className="bg-white/20 hover:bg-white/30 text-white rounded-[16px] rounded-tl-[16px] rounded-tr-[0px] rounded-bl-[16px] rounded-br-[16px]"
                onClick={handleEmbeddedAssessment}
              >
                <Timer className="mr-2 h-4 w-4" />
                Quick Assessment
              </Button>
              
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                data-team-settings="true"
              >
                <Users className="mr-2 h-4 w-4" />
                Team Assessment
              </Button>
              
              {hasHistory && (
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  data-assessment-history="true"
                >
                  <History className="mr-2 h-4 w-4" />
                  View History
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
