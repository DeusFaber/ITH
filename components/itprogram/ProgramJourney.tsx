
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "../ui/utils";

// Import the logo components
import OperateLogo from "../../imports/OperateLogo-5-190";
import SecureLogo from "../../imports/SecureLogo-5-172";
import StreamlineLogo from "../../imports/StreamlineLogo-5-228";
import AccelerateLogo from "../../imports/AccelerateLogo-5-208";

type ProgramPhase = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  position: number;
};

type ProgramJourneyProps = {
  phases: ProgramPhase[];
  currentPhase: string;
  onPhaseSelect: (phaseId: string) => void;
};

export function ProgramJourney({
  phases = [],
  currentPhase = "operate",
  onPhaseSelect
}: ProgramJourneyProps) {
  // Get index of current phase
  const currentPhaseIndex = phases.findIndex(p => p.id === currentPhase);
  
  const getLogoForPhase = (phaseId: string, isActive: boolean) => {
    switch(phaseId) {
      case "operate":
        return <OperateLogo isActive={isActive} />;
      case "secure":
        return <SecureLogo isActive={isActive} />;
      case "streamline":
        return <StreamlineLogo isActive={isActive} />;
      case "accelerate":
        return <AccelerateLogo isActive={isActive} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="relative">
      {/* Connector Line */}
      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -translate-y-1/2" aria-hidden="true"></div>
      
      <div className="relative grid grid-cols-4 gap-4 py-12">
        {phases.map((phase, index) => {
          const isActive = phase.id === currentPhase;
          const isCompleted = index < currentPhaseIndex;
          
          return (
            <div key={phase.id} className="flex flex-col items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onPhaseSelect(phase.id)}
                      className={cn(
                        "relative z-20 size-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300",
                        isActive 
                          ? `bg-[${phase.color}] text-white shadow-lg` 
                          : isCompleted 
                            ? "bg-blue/20 text-blue" 
                            : "bg-muted text-muted-foreground"
                      )}
                      style={{ 
                        backgroundColor: isActive ? phase.color : isCompleted ? "rgba(17, 117, 228, 0.2)" : undefined,
                        color: isActive ? "white" : isCompleted ? "#1175E4" : undefined
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-blue" />
                      ) : (
                        <div className="size-12 flex items-center justify-center">
                          {getLogoForPhase(phase.id, isActive)}
                        </div>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{phase.title} Phase</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <h3 
                className={cn(
                  "font-medium text-center transition-colors",
                  isActive && `text-[${phase.color}]`
                )}
                style={{ color: isActive ? phase.color : undefined }}
              >
                {phase.title}
              </h3>
              <p className="text-sm text-muted-foreground text-center px-4">{phase.description}</p>
              
              {isActive && (
                <div 
                  className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: `${phase.color}20`,
                    color: phase.color 
                  }}
                >
                  You are here
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
