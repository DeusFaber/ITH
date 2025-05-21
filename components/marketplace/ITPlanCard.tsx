
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '../ui/utils';
import Vector from "../../imports/Vector";
import Vector29102 from "../../imports/Vector-29-102";
import Vector29159 from "../../imports/Vector-29-159";
import Vector29178 from "../../imports/Vector-29-178";

export interface PlanFeature {
  text: string;
  included: boolean;
  highlighted?: boolean;
}

export interface ITPlanProps {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'quarterly' | 'annually' | 'once-off';
  description: string;
  features: PlanFeature[];
  phase: 'operate' | 'secure' | 'streamline' | 'accelerate';
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  className?: string;
}

const phaseColors = {
  operate: "bg-blue text-white",
  secure: "bg-navy text-white",
  streamline: "bg-primary text-white",
  accelerate: "bg-gold text-white"
};

const phaseIcons = {
  operate: () => (
    <div className="h-5 w-5 mr-2 flex items-center justify-center">
      <Vector />
    </div>
  ),
  secure: () => (
    <div className="h-5 w-5 mr-2 flex items-center justify-center">
      <Vector29102 />
    </div>
  ),
  streamline: () => (
    <div className="h-5 w-5 mr-2 flex items-center justify-center">
      <Vector29178 />
    </div>
  ),
  accelerate: () => (
    <div className="h-5 w-5 mr-2 flex items-center justify-center">
      <Vector29159 />
    </div>
  )
};

export function ITPlanCard({
  id,
  name,
  price,
  interval,
  description,
  features,
  phase,
  onPrimaryAction,
  onSecondaryAction,
  className
}: ITPlanProps) {
  
  // Format interval text for display
  const formatInterval = (interval: string): string => {
    switch (interval) {
      case 'monthly': return '/month';
      case 'quarterly': return '/quarter';
      case 'annually': return '/year';
      case 'once-off': return '';
      default: return '';
    }
  };

  // Phase icon component
  const PhaseIcon = () => {
    const IconComponent = phaseIcons[phase];
    return <IconComponent />;
  };
  
  // Set the CSS variable for fill color based on phase
  React.useEffect(() => {
    document.documentElement.style.setProperty('--fill-0', 
      phase === 'operate' ? '#1175E4' : 
      phase === 'secure' ? '#133258' : 
      phase === 'streamline' ? '#FF246B' : 
      phase === 'accelerate' ? '#EDB600' : '#ffffff');
  }, [phase]);

  return (
    <Card 
      className={cn(
        'relative overflow-hidden transition-all duration-200 border border-border rounded-[16px] rounded-tr-[0px] hover:shadow-md',
        phase === 'operate' ? 'hover:border-blue/30' : '',
        phase === 'secure' ? 'hover:border-navy/30' : '',
        phase === 'streamline' ? 'hover:border-primary/30' : '',
        phase === 'accelerate' ? 'hover:border-gold/30' : '',
        className
      )}
    >
      <div className="p-6">
        {/* Phase Badge */}
        <Badge className={`mb-3 ${phaseColors[phase]}`}>
          <span className="flex items-center">
            <PhaseIcon />
            {phase.charAt(0).toUpperCase() + phase.slice(1)}
          </span>
        </Badge>
        
        {/* Plan Name */}
        <h3 className="text-xl font-extralight mb-1 text-navy">{name}</h3>
        
        {/* Plan Description */}
        <p className="text-xs text-muted-foreground mb-6">{description}</p>
        
        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-end">
            <span className="text-3xl font-light text-navy">R{price.toLocaleString()}</span>
            {interval !== 'once-off' && (
              <span className="text-sm text-muted-foreground ml-1 mb-1">{formatInterval(interval)}</span>
            )}
          </div>
        </div>
        
        {/* Features */}
        <div className="space-y-3 mb-6">
          {features.map((feature, idx) => (
            <div 
              key={`${id}-feature-${idx}`} 
              className={cn(
                "flex items-start gap-2", 
                !feature.included && "text-muted-foreground"
              )}
            >
              <div className="mt-0.5 flex-shrink-0">
                {feature.included ? (
                  <Check className={cn(
                    "h-4 w-4",
                    phase === 'operate' ? "text-blue" : "",
                    phase === 'secure' ? "text-navy" : "",
                    phase === 'streamline' ? "text-primary" : "",
                    phase === 'accelerate' ? "text-gold" : ""
                  )} />
                ) : (
                  <div className="h-4 w-4 border border-muted-foreground/30 rounded-full" />
                )}
              </div>
              <span className={cn(
                "text-xs", 
                feature.highlighted ? "font-medium" : ""
              )}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
        
        {/* CTAs */}
        <div className="space-y-3">
          <Button 
            className={cn(
              "w-full rounded-[16px] rounded-tr-[0px]",
              phase === 'operate' ? "bg-blue hover:bg-blue/90" : "",
              phase === 'secure' ? "bg-navy hover:bg-navy/90" : "",
              phase === 'streamline' ? "bg-primary hover:bg-primary/90" : "",
              phase === 'accelerate' ? "bg-gold hover:bg-gold/90" : "",
            )}
            onClick={onPrimaryAction}
          >
            Get Started
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-muted-foreground hover:text-foreground"
            onClick={onSecondaryAction}
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
