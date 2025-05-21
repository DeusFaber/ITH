
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { BarChart3, ChevronRight, Maximize } from "lucide-react";
import { EmbeddedAssessment } from "./EmbeddedAssessment";

interface CompactAssessmentContainerProps {
  title?: string;
  subtitle?: string;
  className?: string;
  onClose?: () => void;
}

export function CompactAssessmentContainer({
  title = "Quick IT Health Check",
  subtitle = "Take our 2-minute assessment to measure your IT maturity",
  className = "",
  onClose
}: CompactAssessmentContainerProps) {
  const [isStarted, setIsStarted] = useState(false);

  const handleStartAssessment = () => {
    setIsStarted(true);
  };

  const handleFullAssessment = () => {
    // Open the full assessment view
    window.location.href = window.location.pathname + '?assessment=true';
  };
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // If container is closed, reset to start screen
      setIsStarted(false);
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      {!isStarted ? (
        <>
          <CardHeader className="bg-blue text-white">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-gold" />
              <CardTitle className="text-base">{title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-6">{subtitle}</p>
            <div className="flex flex-col space-y-3">
              <Button 
                className="w-full bg-blue hover:bg-blue/90"
                onClick={handleStartAssessment}
              >
                Start Quick Assessment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-blue/20 text-blue hover:bg-blue/5"
                onClick={handleFullAssessment}
              >
                Full Assessment
                <Maximize className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </>
      ) : (
        <EmbeddedAssessment showTitle={true} onClose={handleClose} />
      )}
    </Card>
  );
}
