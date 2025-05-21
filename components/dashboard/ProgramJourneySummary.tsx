
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Check, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

// Import the logo components
import OperateLogo from "../../imports/OperateLogo-5-190";
import SecureLogo from "../../imports/SecureLogo-5-172";
import StreamlineLogo from "../../imports/StreamlineLogo-5-228";
import AccelerateLogo from "../../imports/AccelerateLogo-5-208";

export function ProgramJourneySummary({ 
  currentPhase = "operate",
  onClick
}: { 
  currentPhase?: string; 
  onClick?: () => void;
}) {
  const getPhaseData = (phase: string) => {
    switch (phase) {
      case "operate":
        return {
          title: "Operate",
          color: "#1175E4",
          description: "Fix and stabilize your IT environment",
          logo: <OperateLogo isActive={true} />,
          nextPhase: "secure",
          progress: 25
        };
      case "secure":
        return {
          title: "Secure",
          color: "#FF246B",
          description: "Protect users, data, and infrastructure",
          logo: <SecureLogo isActive={true} />,
          nextPhase: "streamline",
          progress: 50
        };
      case "streamline":
        return {
          title: "Streamline",
          color: "#133258",
          description: "Simplify and modernize business systems",
          logo: <StreamlineLogo isActive={true} />,
          nextPhase: "accelerate",
          progress: 75
        };
      case "accelerate":
        return {
          title: "Accelerate",
          color: "#EDB600",
          description: "Leverage technology for strategic advantage",
          logo: <AccelerateLogo isActive={true} />,
          progress: 100
        };
      default:
        return {
          title: "Operate",
          color: "#1175E4",
          description: "Fix and stabilize your IT environment",
          logo: <OperateLogo isActive={true} />,
          nextPhase: "secure",
          progress: 25
        };
    }
  };

  const phaseData = getPhaseData(currentPhase);
  const nextPhaseData = phaseData.nextPhase ? getPhaseData(phaseData.nextPhase) : null;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>IThealth <strong>Program</strong></CardTitle>
        <CardDescription>Your digital transformation journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center">
          {/* Progress bar */}
          <div className="w-full h-2 bg-muted rounded-full mb-6">
            <div 
              className="h-2 rounded-full" 
              style={{ 
                width: `${phaseData.progress}%`, 
                backgroundColor: phaseData.color 
              }}
            ></div>
          </div>

          {/* Current phase logo */}
          <div 
            className="size-16 flex items-center justify-center rounded-full mb-3"
            style={{ backgroundColor: `${phaseData.color}10` }}
          >
            <div className="size-12">
              {phaseData.logo}
            </div>
          </div>

          {/* Current phase info */}
          <h3 
            className="text-lg font-medium mb-1"
            style={{ color: phaseData.color }}
          >
            {phaseData.title} Phase
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            {phaseData.description}
          </p>

          {/* Completed tasks */}
          <div className="w-full space-y-2 mb-4">
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue mt-0.5" />
              <p className="text-sm">IT assessment completed</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue mt-0.5" />
              <p className="text-sm">Phase roadmap created</p>
            </div>
            {phaseData.nextPhase ? (
              <div className="flex items-start gap-2 text-muted-foreground">
                <div className="h-4 w-4 border rounded-full mt-0.5"></div>
                <p className="text-sm">Complete {phaseData.title} phase</p>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-blue mt-0.5" />
                <p className="text-sm">All phases implemented</p>
              </div>
            )}
          </div>
        </div>

        {/* Next phase preview */}
        {nextPhaseData && (
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="size-6 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: `${nextPhaseData.color}10` }}
                >
                  <div className="size-4">
                    {nextPhaseData.logo}
                  </div>
                </div>
                <span className="text-sm font-medium">
                  Next: {nextPhaseData.title} Phase
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={onClick} className="h-8 px-2">
                View <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Action button */}
        <Button 
          className="w-full" 
          onClick={onClick}
          data-page-id="itprogram"
        >
          View Your Program Journey
        </Button>
      </CardContent>
    </Card>
  );
}
