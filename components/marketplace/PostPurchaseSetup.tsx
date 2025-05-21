
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Check, ChevronRight, Download, ExternalLink, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import { PlanSetupProgress } from "../../lib/marketplaceTypes";
import { MarketplacePlan } from "../../lib/marketplaceTypes";

interface PostPurchaseSetupProps {
  plan: MarketplacePlan;
  setupProgress: PlanSetupProgress;
}

export function PostPurchaseSetup({ plan, setupProgress }: PostPurchaseSetupProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  
  const handleExpandStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{plan.name} Setup</CardTitle>
            <CardDescription>
              Track your implementation progress
            </CardDescription>
          </div>
          <div>
            <Badge
              className={`${
                setupProgress.percentComplete < 100
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {setupProgress.percentComplete < 100 ? "In Progress" : "Complete"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Setup progress</span>
            <span>{setupProgress.percentComplete}% complete</span>
          </div>
          <Progress value={setupProgress.percentComplete} className="h-2" />
        </div>
        
        {setupProgress.percentComplete < 100 && (
          <Alert className="bg-primary/5 border-primary/20">
            <Clock className="h-4 w-4" />
            <AlertTitle>Setup in progress</AlertTitle>
            <AlertDescription>
              Your plan is being set up. Complete the remaining steps to get started.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4 mt-4">
          {plan.runbook.map((step, index) => {
            const isCompleted = setupProgress.completedSteps.includes(step.title);
            const isNextStep = setupProgress.nextSteps.includes(step.title);
            
            return (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden ${
                  isCompleted
                    ? "bg-green-50 border-green-200"
                    : isNextStep
                    ? "border-primary/50 bg-primary/5"
                    : "bg-muted/20"
                }`}
              >
                <div 
                  className={`p-4 flex items-start justify-between cursor-pointer`}
                  onClick={() => handleExpandStep(index)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isNextStep
                          ? "border-2 border-primary text-primary"
                          : "border-2 border-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    {isCompleted ? (
                      <Badge className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    ) : isNextStep ? (
                      <Button size="sm">
                        Start
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
                      <Badge variant="outline">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
                
                {expandedStep === index && (
                  <div className="px-4 pb-4 pt-0 ml-11 border-t">
                    <p className="mb-3">{step.description}</p>
                    
                    {isCompleted ? (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Check className="h-4 w-4" />
                        <span>Completed on {getFakeCompletionDate(index)}</span>
                      </div>
                    ) : isNextStep ? (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Estimated time: {index % 2 === 0 ? "30 minutes" : "1 hour"}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm">
                            Start Now
                          </Button>
                          <Button size="sm" variant="outline">
                            Schedule for Later
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        This step will be available after completing previous steps.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="resources">
            <AccordionTrigger>Setup Resources</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-primary" />
                    <span>Welcome Package</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-primary" />
                    <span>Setup Guide</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-primary" />
                    <span>Service Level Agreement</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/20">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-primary" />
                    <span>Implementation Knowledge Base</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Visit
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="support">
            <AccordionTrigger>Setup Support</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <p className="text-sm">
                  Need help with your setup? Our implementation specialists are here to help.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    Schedule Onboarding Call
                  </Button>
                  <Button variant="outline" size="sm">
                    Chat with Support
                  </Button>
                  <Button variant="outline" size="sm">
                    Email Support
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

// Helper function to generate fake completion dates
function getFakeCompletionDate(index: number): string {
  const today = new Date();
  const daysAgo = 10 - index * 2;
  const date = new Date(today);
  date.setDate(today.getDate() - daysAgo);
  return date.toLocaleDateString();
}
