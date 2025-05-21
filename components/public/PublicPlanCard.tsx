
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Check, Info, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { cn } from '../ui/utils';
import { PlanFeature } from '../marketplace/PlanCard';

export interface PublicPlanProps {
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
  expandedView?: boolean;
}

const phaseColors = {
  operate: "bg-blue text-blue-foreground",
  secure: "bg-navy text-navy-foreground",
  streamline: "bg-primary text-primary-foreground",
  accelerate: "bg-gold text-gold-foreground"
};

// Phase icons
const phaseIcons = {
  operate: <Server className="h-5 w-5" />,
  secure: <ShieldCheck className="h-5 w-5" />,
  streamline: <Clock className="h-5 w-5" />,
  accelerate: <Rocket className="h-5 w-5" />
};

export function PublicPlanCard({
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
  comingSoon = false,
  expandedView = false
}: PublicPlanProps) {
  
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
    
    return null;
  };

  // Render phase badge if phase is provided
  const renderPhaseBadge = () => {
    if (!phase) return null;
    
    return (
      <div className="mb-4 flex items-center">
        <Badge className={`${phaseColors[phase]}`}>
          {phase.charAt(0).toUpperCase() + phase.slice(1)}
        </Badge>
      </div>
    );
  };

  return (
    <Card 
      className={cn(
        'relative overflow-hidden transition-all duration-200 h-full border border-border hover:shadow-md ithealth-card',
        comingSoon ? 'opacity-80' : '',
        phase === 'operate' ? 'hover:border-blue/30' : '',
        phase === 'secure' ? 'hover:border-navy/30' : '',
        phase === 'streamline' ? 'hover:border-primary/30' : '',
        phase === 'accelerate' ? 'hover:border-gold/30' : '',
        expandedView ? 'flex flex-col' : '',
        className
      )}
    >
      {renderBadge()}
      
      <div className={cn(
        "p-6", 
        expandedView ? "flex-grow" : ""
      )}>
        {/* Phase Badge */}
        {renderPhaseBadge()}
        
        {/* Plan Name */}
        <h3 className="text-xl font-extralight mb-1 text-navy text-left-override">{name}</h3>
        
        {/* Plan Description */}
        <p className="text-xs text-muted-foreground mb-6 text-left-override">{description}</p>
        
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
      </div>
      
      {/* CTAs */}
      <div className={cn(
        "p-6 pt-0",
        expandedView ? "mt-auto" : ""
      )}>
        <div className="space-y-3">
          <Button 
            className={cn(
              "w-full ithealth-button",
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

// I'm importing these icons here for the phaseIcons object
import { Server, Rocket } from 'lucide-react';
