
import React from 'react';
import { PlanCard } from './PlanCard';
import { PlanData } from '../../lib/mockPlansData';
import { cn } from '../ui/utils';

interface PlanGridProps {
  plans: PlanData[];
  title?: string;
  description?: string;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function PlanGrid({
  plans,
  title,
  description,
  columns = 3,
  className
}: PlanGridProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {(title || description) && (
        <div className="text-center mb-8">
          {title && <h2 className="text-2xl font-light text-navy mb-2">{title}</h2>}
          {description && <p className="text-xs text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>
      )}
      
      <div className={cn(
        'grid gap-6',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      )}>
        {plans.map(plan => (
          <PlanCard 
            key={plan.id}
            {...plan}
            onPrimaryAction={() => {
              console.log(`Primary action for ${plan.name}`);
              // This would typically be a navigation action or open a checkout modal
            }}
            onSecondaryAction={() => {
              console.log(`Secondary action for ${plan.name}`);
              // This would typically navigate to a details page
            }}
          />
        ))}
      </div>
    </div>
  );
}
