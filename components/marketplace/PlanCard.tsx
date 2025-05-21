
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Check, Info, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { cn } from '../ui/utils';

export interface PlanFeature {
  text: string;
  included: boolean;
  highlighted?: boolean;
}

export interface PlanProps {
  id: string;
  name: string;
  price: number;
  currency?: string;
  interval: 'monthly' | 'quarterly' | 'annually' | 'once-off';
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  recommended?: boolean;
  phase?: 'operate' | 'secure' | 'streamline' | 'accelerate';
  ctaLabel?: string;
  secondaryCtaLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  className?: string;
  discountPercentage?: number; 
  originalPrice?: number;
  comingSoon?: boolean;
}

const phaseColors = {
  operate: "bg-blue text-white",
  secure: "bg-navy text-white",
  streamline: "bg-primary text-white",
  accelerate: "bg-gold text-white"
};

export function PlanCard({
  id,
  name,
  price,
  currency = 'R',
  interval,
  description,
  features,
  popular = false,
  recommended = false,
  phase,
  ctaLabel = 'Get Started',
  secondaryCtaLabel = 'Learn More',
  onPrimaryAction,
  onSecondaryAction,
  className,
  discountPercentage,
  originalPrice,
  comingSoon = false
}: PlanProps) {
  
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

  // Generate badge based on plan properties
  const renderBadge = () => {
    if (comingSoon) {
      return (
        <Badge className="absolute top-4 right-4 bg-blue/10 text-blue">
          Coming Soon
        </Badge>
      );
    }
    
    if (recommended) {
      return (
        <Badge className="absolute top-4 right-4 bg-gold text-white">
          Recommended
        </Badge>
      );
    }
    
    if (popular) {
      return (
        <Badge className="absolute top-4 right-4 bg-primary text-white">
          Popular
        </Badge>
      );
    }
    
    if (phase) {
      return (
        <Badge className={`absolute top-4 right-4 ${phaseColors[phase]}`}>
          {phase.charAt(0).toUpperCase() + phase.slice(1)}
        </Badge>
      );
    }
    
    return null;
  };

  return (
    <Card 
      className={cn(
        'relative overflow-hidden transition-all duration-200 border border-border hover:border-blue/20 rounded-[16px] rounded-tr-[0px]',
        comingSoon ? 'opacity-80 grayscale' : '',
        phase === 'operate' ? 'hover:border-blue/30' : '',
        phase === 'secure' ? 'hover:border-navy/30' : '',
        phase === 'streamline' ? 'hover:border-primary/30' : '',
        phase === 'accelerate' ? 'hover:border-gold/30' : '',
        className
      )}
    >
      {renderBadge()}
      
      <div className="p-6">
        {/* Plan Name */}
        <h3 className="text-xl font-extralight mb-1 text-navy">{name}</h3>
        
        {/* Plan Description */}
        <p className="text-xs text-muted-foreground mb-6">{description}</p>
        
        {/* Pricing */}
        <div className="mb-6">
          {discountPercentage && originalPrice && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs line-through text-muted-foreground">{currency}{originalPrice}{formatInterval(interval)}</span>
              <Badge className="bg-primary/10 text-primary text-xs py-0.5 px-1.5">Save {discountPercentage}%</Badge>
            </div>
          )}
          
          <div className="flex items-end">
            <span className="text-3xl font-light text-navy">{currency}{price}</span>
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
                  <Check className="h-4 w-4 text-blue" />
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
              !phase ? "bg-blue hover:bg-blue/90" : "",
            )}
            onClick={onPrimaryAction}
            disabled={comingSoon}
          >
            {ctaLabel}
          </Button>
          
          {secondaryCtaLabel && (
            <Button 
              variant="ghost" 
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={onSecondaryAction}
            >
              {secondaryCtaLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
