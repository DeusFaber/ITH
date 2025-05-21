
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { BarChart3, ArrowRight } from "lucide-react";
import { useAssessment } from "../../contexts/AssessmentContext";

export function AssessmentTile() {
  const { assessmentHistory } = useAssessment();
  const hasHistory = assessmentHistory.length > 0;
  
  // Helper function to ensure the assessment opens properly when clicked
  const handleStartAssessment = () => {
    window.location.href = window.location.pathname + '?assessment=true';
  };
  
  // Helper function to open the embedded assessment
  const handleEmbeddedAssessment = () => {
    window.location.href = window.location.pathname + '?embedded_assessment=true';
  };

  return (
    <Card className="overflow-hidden border-border hover:border-pink/30 hover:shadow-sm">
      <CardContent className="p-6 rounded-[16px] rounded-tl-[16px] rounded-tr-[0px] rounded-bl-[16px] rounded-br-[16px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Health Assessment</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-semibold">
                {hasHistory ? "86%" : "Start"}
              </p>
              {hasHistory && (
                <div className="flex items-center text-xs font-medium text-green-600">
                  <ArrowRight className="h-3 w-3 mr-0.5" />
                  View
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Quick 7-question assessment</p>
          </div>
          <div className="p-2 rounded-md bg-pink/10">
            <div className="text-pink">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button 
            size="sm" 
            className="w-full bg-pink hover:bg-pink/90 text-white rounded-[16px] rounded-tr-[0px]"
            onClick={hasHistory ? handleStartAssessment : handleEmbeddedAssessment}
          >
            {hasHistory ? "View Results" : "Start Assessment"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
