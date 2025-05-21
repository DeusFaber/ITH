
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useAssessment } from "../contexts/AssessmentContext";
import { DetailedReport } from "../components/assessment/DetailedReport";
import { ChevronLeft, Calendar, BarChart, FileText, ArrowUpRight, Trash2, Download, ExternalLink } from "lucide-react";
import { formatDate } from "../lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "../components/ui/dialog";
import { toast } from "sonner@2.0.3";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function AssessmentHistory() {
  const { assessmentHistory, deleteAssessment, compareWithPrevious } = useAssessment();
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assessmentToDelete, setAssessmentToDelete] = useState<string | null>(null);
  
  const selectedAssessment = selectedAssessmentId 
    ? assessmentHistory.find(a => a.id === selectedAssessmentId) 
    : null;

  useEffect(() => {
    // If we have assessments but none selected, select the most recent
    if (assessmentHistory.length > 0 && !selectedAssessmentId) {
      setSelectedAssessmentId(assessmentHistory[0].id);
    }
  }, [assessmentHistory, selectedAssessmentId]);

  useEffect(() => {
    // Update comparison data when selected assessment changes
    if (selectedAssessmentId) {
      const comparison = compareWithPrevious(selectedAssessmentId);
      setComparisonData(comparison);
    }
  }, [selectedAssessmentId, compareWithPrevious]);

  const handleDeleteAssessment = () => {
    if (assessmentToDelete) {
      deleteAssessment(assessmentToDelete);
      
      // If the deleted assessment was selected, select the next one
      if (assessmentToDelete === selectedAssessmentId) {
        const nextAssessment = assessmentHistory.find(a => a.id !== assessmentToDelete);
        setSelectedAssessmentId(nextAssessment?.id || null);
      }
      
      setAssessmentToDelete(null);
      setShowDeleteDialog(false);
      toast.success("Assessment deleted successfully");
    }
  };

  const confirmDelete = (id: string) => {
    setAssessmentToDelete(id);
    setShowDeleteDialog(true);
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with assessment history */}
        <div className="w-full md:w-80 space-y-4">
          <div>
            <h2 className="text-2xl mb-2">Assessment <strong>History</strong></h2>
            <p className="text-muted-foreground">
              View and compare your past IT health assessments
            </p>
          </div>

          <div className="space-y-3">
            {assessmentHistory.length > 0 ? (
              assessmentHistory.map((assessment) => (
                <Card 
                  key={assessment.id} 
                  className={`cursor-pointer transition-all ${
                    selectedAssessmentId === assessment.id 
                      ? 'border-gold ring-1 ring-gold' 
                      : 'hover:border-muted-foreground/20'
                  }`}
                  onClick={() => setSelectedAssessmentId(assessment.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{formatDate(new Date(assessment.date))}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {assessment.result.maturityLevel.charAt(0).toUpperCase() + assessment.result.maturityLevel.slice(1)} Maturity
                          </span>
                        </div>
                      </div>
                      <Badge variant={
                        assessment.result.maturityLevel === "smart" 
                          ? "success" 
                          : assessment.result.maturityLevel === "stable" 
                            ? "warning" 
                            : "destructive"
                      }>
                        {assessment.result.maturityLevel === "smart" && "Smart"}
                        {assessment.result.maturityLevel === "stable" && "Stable"}
                        {assessment.result.maturityLevel === "basic" && "Basic"}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between mt-4 pt-3 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-muted-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDelete(assessment.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 gap-1 text-muted-foreground"
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Alert>
                <AlertDescription>
                  No assessment history found. Complete an IT Health assessment to see your results here.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Main content with detailed report */}
        <div className="flex-1">
          {selectedAssessment ? (
            <DetailedReport 
              assessment={selectedAssessment}
              comparisonData={comparisonData}
            />
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <CardContent className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No Assessment Selected</h3>
                <p className="text-muted-foreground mb-6">
                  Select an assessment from the sidebar to view detailed results.
                </p>
                <Button className="gap-2 bg-gold hover:bg-gold/90" data-assessment="true">
                  Take New Assessment
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Assessment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this assessment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAssessment}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
