
import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

interface PhaseCardProps {
  phase: "operate" | "secure" | "streamline" | "accelerate";
  title: string;
  icon: ReactNode;
  logoComponent: ReactNode;
  isActive: boolean;
  onClick: () => void;
  description: string;
  position: number;
}

export function PhaseCard({
  phase,
  title,
  icon,
  logoComponent,
  isActive,
  onClick,
  description,
  position
}: PhaseCardProps) {
  // Define colors for each phase
  const phaseColorMap = {
    operate: {
      bg: "#1561BE",
      bgLight: "rgba(21, 97, 190, 0.1)",
      border: "border-[#1561BE]",
      shadow: "shadow-[#1561BE]/20",
      text: "text-[#1561BE]"
    },
    secure: {
      bg: "#FF246B",
      bgLight: "rgba(255, 36, 107, 0.1)",
      border: "border-primary",
      shadow: "shadow-primary/20",
      text: "text-primary"
    },
    streamline: {
      bg: "#133258",
      bgLight: "rgba(19, 50, 88, 0.1)",
      border: "border-navy",
      shadow: "shadow-navy/20",
      text: "text-navy"
    },
    accelerate: {
      bg: "#EDB600",
      bgLight: "rgba(237, 182, 0, 0.1)",
      border: "border-gold",
      shadow: "shadow-gold/20",
      text: "text-gold"
    }
  };

  const phaseColor = phaseColorMap[phase];

  return (
    <Card 
      className={cn(
        "relative overflow-hidden border-2 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-md",
        isActive ? `${phaseColor.border} ${phaseColor.shadow} shadow-lg` : "border-transparent"
      )}
      onClick={onClick}
    >
      {/* Top colored bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 ease-in-out origin-left"
        style={{
          backgroundColor: phaseColorMap[phase].bg,
          transform: isActive ? 'scaleX(1)' : 'scaleX(0)'
        }}
      />
      
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div 
              className="p-2 rounded-full"
              style={{ backgroundColor: phaseColor.bgLight }}
            >
              {icon}
            </div>
            <div>
              <Badge 
                className="mb-1"
                style={{ 
                  backgroundColor: phaseColor.bgLight,
                  color: phaseColorMap[phase].bg,
                  borderColor: 'transparent'
                }}
              >
                Phase {position}
              </Badge>
              <h3 className={cn("font-medium transition-colors", isActive && phaseColor.text)}>
                {title}
              </h3>
            </div>
          </div>
          {isActive && (
            <div 
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: phaseColorMap[phase].bg }}
            />
          )}
        </div>
        
        <div className="text-muted-foreground text-sm">{description}</div>
        
        <div className="h-16 mt-2 overflow-hidden">
          {logoComponent}
        </div>
      </CardContent>
    </Card>
  );
}
