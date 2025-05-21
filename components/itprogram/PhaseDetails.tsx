
import { ReactNode } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Check } from "lucide-react";
import { cn } from "../ui/utils";

interface PhaseDetailsProps {
  phase: "operate" | "secure" | "streamline" | "accelerate";
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  logoComponent: ReactNode;
  phaseNumber: number;
  keyOutcomes: string[];
  phaseIndicators: string[];
}

export function PhaseDetails({
  phase,
  title,
  subtitle,
  description,
  icon,
  logoComponent,
  phaseNumber,
  keyOutcomes,
  phaseIndicators
}: PhaseDetailsProps) {
  // Define colors for each phase
  const phaseColorMap = {
    operate: {
      bg: "#1561BE",
      bgLight: "rgba(21, 97, 190, 0.1)",
      border: "border-[#1561BE]",
      text: "text-[#1561BE]"
    },
    secure: {
      bg: "#FF246B",
      bgLight: "rgba(255, 36, 107, 0.1)",
      border: "border-primary",
      text: "text-primary"
    },
    streamline: {
      bg: "#133258",
      bgLight: "rgba(19, 50, 88, 0.1)",
      border: "border-navy",
      text: "text-navy"
    },
    accelerate: {
      bg: "#EDB600",
      bgLight: "rgba(237, 182, 0, 0.1)",
      border: "border-gold",
      text: "text-gold"
    }
  };

  const phaseColor = phaseColorMap[phase];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex items-start gap-4">
          <div className="p-3 rounded-full" style={{ backgroundColor: phaseColor.bgLight }}>
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Badge 
                style={{ 
                  backgroundColor: phaseColor.bgLight,
                  color: phaseColor.bg,
                  borderColor: 'transparent'
                }}
              >
                Phase {phaseNumber}
              </Badge>
              <span className="text-muted-foreground">{subtitle}</span>
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: phaseColor.bg }}>{title}</h2>
            <p className="text-xl text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="w-full md:w-48 h-32 md:h-48">
          {logoComponent}
        </div>
      </div>
      
      <div className="p-6 rounded-xl" style={{ 
        backgroundColor: phaseColor.bgLight
      }}>
        <p className="text-lg">
          {description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Key Outcomes</h3>
          <ul className="space-y-4">
            {keyOutcomes.map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="p-1.5 rounded-full" style={{ backgroundColor: phaseColor.bgLight }}>
                  <Check className="h-4 w-4" style={{ color: phaseColor.bg }} />
                </div>
                <span className="text-lg">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Card className="border" style={{ borderColor: `${phaseColor.bg}20` }}>
          <CardHeader>
            <CardTitle className="text-lg" style={{ color: phaseColor.bg }}>
              Signs You're in This Phase
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {phaseIndicators.map((indicator, index) => (
              <p key={index} className="flex items-start gap-3">
                <span className="font-bold" style={{ color: phaseColor.bg }}>•</span>
                <span>{indicator}</span>
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
