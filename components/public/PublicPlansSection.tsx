
import React from 'react';
import { PublicPlanCard } from './PublicPlanCard';
import { PlanData } from '../../lib/mockPlansData';
import { Button } from '../ui/button';
import { ArrowRight, Server, ShieldCheck, Rocket, Clock } from 'lucide-react';
import { cn } from '../ui/utils';

interface PublicPlansSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  plans: PlanData[];
  phase?: 'operate' | 'secure' | 'streamline' | 'accelerate';
  className?: string;
  showViewAllButton?: boolean;
}

const phaseColors = {
  operate: "text-blue",
  secure: "text-navy",
  streamline: "text-primary",
  accelerate: "text-gold"
};

const phaseIconContainers = {
  operate: "bg-blue/10",
  secure: "bg-navy/10",
  streamline: "bg-primary/10",
  accelerate: "bg-gold/10" 
};

const PhaseIcon = ({ phase }: { phase?: 'operate' | 'secure' | 'streamline' | 'accelerate' }) => {
  if (!phase) return null;
  
  const icons = {
    operate: <Server className={`h-6 w-6 ${phaseColors[phase]}`} />,
    secure: <ShieldCheck className={`h-6 w-6 ${phaseColors[phase]}`} />,
    streamline: <Clock className={`h-6 w-6 ${phaseColors[phase]}`} />,
    accelerate: <Rocket className={`h-6 w-6 ${phaseColors[phase]}`} />
  };
  
  return (
    <div className={`p-3 rounded-full ${phaseIconContainers[phase]} mr-4`}>
      {icons[phase]}
    </div>
  );
};

export function PublicPlansSection({
  title,
  subtitle,
  description,
  plans,
  phase,
  className,
  showViewAllButton = false
}: PublicPlansSectionProps) {
  return (
    <div className={cn('py-16', className)} id={phase ? `${phase}-plans` : undefined}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center mb-2">
            {phase && <PhaseIcon phase={phase} />}
            
            <div>
              <h2 className="text-3xl font-extralight text-navy">{title}</h2>
              {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          
          {description && (
            <p className="text-xs text-muted-foreground max-w-2xl mt-4">{description}</p>
          )}
          
          {showViewAllButton && (
            <div className="mt-4">
              <Button 
                variant="ghost" 
                className={cn(
                  "text-sm p-0 h-auto",
                  phase ? phaseColors[phase] : "text-blue"
                )}
              >
                View all plans <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map(plan => (
            <PublicPlanCard
              key={plan.id}
              {...plan}
              onPrimaryAction={() => {
                console.log(`Primary action for ${plan.name}`);
              }}
              onSecondaryAction={() => {
                console.log(`Secondary action for ${plan.name}`);
              }}
              expandedView={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
