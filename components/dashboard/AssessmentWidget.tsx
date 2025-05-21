
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BarChart3, ChevronRight, History, Clock, ExternalLink, X } from "lucide-react";
import { CompactAssessmentContainer } from "../assessment/CompactAssessmentContainer";
import { EmbeddedAssessment } from "../assessment/EmbeddedAssessment";
import { useAssessment } from "../../contexts/AssessmentContext";

interface AssessmentWidgetProps {
  className?: string;
  onClose?: () => void;
}

export function AssessmentWidget({ className = "", onClose }: AssessmentWidgetProps) {
  const [activeTab, setActiveTab] = useState("assessment");
  const { assessmentHistory } = useAssessment();
  const hasHistory = assessmentHistory && assessmentHistory.length > 0;
  const latestAssessment = hasHistory ? assessmentHistory[0] : null;
  
  const handleViewFullHistory = () => {
    window.location.href = window.location.pathname + '?history=true';
  };
  
  const handleFullAssessment = () => {
    window.location.href = window.location.pathname + '?assessment=true';
  };
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="bg-blue text-white pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-gold" />
            <CardTitle className="text-white">IT Health Assessment</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 hover:bg-white/10 text-white"
              onClick={handleFullAssessment}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              <span className="text-xs">Full View</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 hover:bg-white/10 text-white rounded-full"
              onClick={handleClose}
              aria-label="Close assessment widget"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="assessment" value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="bg-blue/30">
            <TabsTrigger 
              value="assessment" 
              className="text-white data-[state=active]:bg-white data-[state=active]:text-blue"
            >
              Assessment
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="text-white data-[state=active]:bg-white data-[state=active]:text-blue"
              disabled={!hasHistory}
            >
              History
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      
      <TabsContent value="assessment" className="pt-0 mt-0">
        <EmbeddedAssessment showTitle={false} onClose={handleClose} />
      </TabsContent>
      
      <TabsContent value="history" className="pt-0 mt-0">
        <CardContent className="p-4">
          {hasHistory ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Latest Assessment</p>
                <div className="bg-muted rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">IT Maturity: 
                      <span className={`ml-1 ${
                        latestAssessment?.result?.maturityLevel === "smart" 
                          ? "text-blue" 
                          : latestAssessment?.result?.maturityLevel === "stable" 
                            ? "text-gold" 
                            : "text-primary"
                      }`}>
                        {latestAssessment?.result?.maturityLevel 
                          ? latestAssessment.result.maturityLevel.charAt(0).toUpperCase() + latestAssessment.result.maturityLevel.slice(1)
                          : "Unknown"}
                      </span>
                    </h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {latestAssessment?.date 
                        ? new Date(latestAssessment.date).toLocaleDateString() 
                        : "Unknown date"}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {latestAssessment?.result?.insights && latestAssessment.result.insights.length > 0
                      ? latestAssessment.result.insights.map((insight, index) => (
                          <p key={index} className="text-xs text-muted-foreground">• {insight}</p>
                        ))
                      : <p className="text-xs text-muted-foreground">No insights available</p>
                    }
                  </div>
                </div>
              </div>
              
              {assessmentHistory.length > 1 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Previous Assessments</p>
                  <div className="space-y-2">
                    {assessmentHistory.slice(1, 3).map((assessment) => (
                      <div key={assessment.id || `prev-${Math.random()}`} className="bg-muted/50 rounded-md p-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">
                            {assessment.result?.maturityLevel 
                              ? assessment.result.maturityLevel.charAt(0).toUpperCase() + assessment.result.maturityLevel.slice(1)
                              : "Unknown"} Level
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {assessment.date ? new Date(assessment.date).toLocaleDateString() : "Unknown date"}
                          </p>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 px-2">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={handleViewFullHistory}
              >
                <History className="h-4 w-4 mr-2" />
                View Complete History
              </Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">
                You haven't completed any assessments yet.
              </p>
              <Button 
                className="bg-blue hover:bg-blue/90"
                onClick={() => setActiveTab("assessment")}
              >
                Take Assessment Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </TabsContent>
    </Card>
  );
}
