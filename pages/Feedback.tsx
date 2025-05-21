
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { FeedbackForm } from "../components/feedback/FeedbackForm";
import { SurveyCard, Survey } from "../components/feedback/SurveyCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { toast } from "sonner@2.0.3";

export function Feedback() {
  const [activeTab, setActiveTab] = useState("surveys");
  const [activeSurvey, setActiveSurvey] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Mock surveys data
  const surveys: Survey[] = [
    {
      id: "survey1",
      title: "IT Support Satisfaction Survey",
      description: "Help us understand your experience with our support team",
      status: "open",
      dueDate: "2025-06-01",
      estimatedTime: "5 min",
      questionsCount: 10,
      progress: 30,
      category: "Support"
    },
    {
      id: "survey2",
      title: "Product Feature Feedback",
      description: "Share your thoughts on our recent dashboard updates",
      status: "open",
      dueDate: "2025-05-25",
      estimatedTime: "3 min",
      questionsCount: 5,
      category: "Product"
    },
    {
      id: "survey3",
      title: "Annual Customer Satisfaction",
      description: "Review your overall experience with IT Health services",
      status: "completed",
      dueDate: "2025-04-15",
      estimatedTime: "10 min",
      questionsCount: 20,
      category: "General"
    },
    {
      id: "survey4",
      title: "Service Upgrade Interest Survey",
      description: "Help us understand your needs for upcoming service offerings",
      status: "open",
      dueDate: "2025-06-10",
      estimatedTime: "4 min",
      questionsCount: 8,
      category: "Services"
    }
  ];

  const handleStartSurvey = (id: string) => {
    setActiveSurvey(id);
    setDialogOpen(true);
  };

  const handleContinueSurvey = (id: string) => {
    setActiveSurvey(id);
    setDialogOpen(true);
  };

  const handleViewSurvey = (id: string) => {
    toast.info("Survey results view is not available in this demo");
  };

  // Get active survey details
  const getActiveSurvey = () => {
    return surveys.find(survey => survey.id === activeSurvey);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Feedback & Surveys</h1>
        <p className="text-muted-foreground">
          Share your experience and help us improve our services
        </p>
      </div>
      
      <Tabs defaultValue="surveys" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="surveys">Surveys</TabsTrigger>
          <TabsTrigger value="feedback">Quick Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="surveys" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {surveys.map(survey => (
              <SurveyCard
                key={survey.id}
                survey={survey}
                onStart={handleStartSurvey}
                onContinue={handleContinueSurvey}
                onView={handleViewSurvey}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FeedbackForm />
            
            <div className="space-y-6">
              <div className="bg-primary/5 rounded-lg p-6">
                <h3 className="font-medium mb-2">Why Your Feedback Matters</h3>
                <p className="text-sm text-muted-foreground">
                  Your feedback helps us continuously improve our services and tailor them to your needs. 
                  We use this information to:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                  <li>Enhance our support processes</li>
                  <li>Develop new features based on customer needs</li>
                  <li>Train our team to better serve you</li>
                  <li>Measure our performance and set improvement goals</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-6">
                <h3 className="font-medium mb-2">Our Service Commitment</h3>
                <p className="text-sm text-muted-foreground">
                  At IT Health, we're committed to providing excellent service and support. 
                  If your feedback includes issues that need immediate attention, please 
                  also submit a support ticket so we can address your concerns right away.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => toast.info("This would navigate to the Support Tickets page")}
                >
                  Create Support Ticket
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Survey Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{getActiveSurvey()?.title || "Survey"}</DialogTitle>
            <DialogDescription>
              {getActiveSurvey()?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <p className="text-center text-muted-foreground">
              This is a placeholder for the actual survey content.
              <br />
              In a real application, the survey questions would appear here.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Save & Continue Later
            </Button>
            <Button onClick={() => {
              setDialogOpen(false);
              toast.success("Survey response submitted. Thank you!");
            }}>
              Submit Survey
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
