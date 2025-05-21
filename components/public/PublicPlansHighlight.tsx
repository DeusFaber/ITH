
import React from 'react';
import { PublicPlansSection } from './PublicPlansSection';
import { basicPlans, securityPlans, acceleratePlans } from '../../lib/mockPlansData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card } from '../ui/card';
import { cn } from '../ui/utils';

interface PublicPlansHighlightProps {
  className?: string;
}

export function PublicPlansHighlight({ className }: PublicPlansHighlightProps) {
  return (
    <div className={cn('bg-muted/30 py-20', className)} id="plans">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extralight text-navy mb-4">IT Health Plans</h2>
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Choose the right plan for your business needs
          </p>
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            All plans include access to our platform, 24/7 support, and regular health assessments to ensure your IT systems are operating at peak efficiency.
          </p>
        </div>
        
        <Tabs defaultValue="featured" className="w-full">
          <div className="flex justify-center mb-8">
            <Card className="rounded-full p-1">
              <TabsList className="bg-transparent">
                <TabsTrigger value="featured" className="rounded-full">Featured Plans</TabsTrigger>
                <TabsTrigger value="operate" className="rounded-full">Operate</TabsTrigger>
                <TabsTrigger value="secure" className="rounded-full">Secure</TabsTrigger>
                <TabsTrigger value="accelerate" className="rounded-full">Accelerate</TabsTrigger>
              </TabsList>
            </Card>
          </div>
          
          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Featured plans - one from each category */}
              <PublicPlanCard 
                {...basicPlans[1]} 
                expandedView={true}
                onPrimaryAction={() => console.log(`Primary action for ${basicPlans[1].name}`)}
                onSecondaryAction={() => console.log(`Secondary action for ${basicPlans[1].name}`)}
              />
              <PublicPlanCard 
                {...securityPlans[1]} 
                expandedView={true}
                onPrimaryAction={() => console.log(`Primary action for ${securityPlans[1].name}`)}
                onSecondaryAction={() => console.log(`Secondary action for ${securityPlans[1].name}`)}
              />
              <PublicPlanCard 
                {...acceleratePlans[1]} 
                expandedView={true}
                onPrimaryAction={() => console.log(`Primary action for ${acceleratePlans[1].name}`)}
                onSecondaryAction={() => console.log(`Secondary action for ${acceleratePlans[1].name}`)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="operate">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {basicPlans.map(plan => (
                <PublicPlanCard 
                  key={plan.id} 
                  {...plan} 
                  expandedView={true}
                  onPrimaryAction={() => console.log(`Primary action for ${plan.name}`)}
                  onSecondaryAction={() => console.log(`Secondary action for ${plan.name}`)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="secure">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityPlans.map(plan => (
                <PublicPlanCard 
                  key={plan.id} 
                  {...plan} 
                  expandedView={true}
                  onPrimaryAction={() => console.log(`Primary action for ${plan.name}`)}
                  onSecondaryAction={() => console.log(`Secondary action for ${plan.name}`)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="accelerate">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {acceleratePlans.map(plan => (
                <PublicPlanCard 
                  key={plan.id} 
                  {...plan} 
                  expandedView={true}
                  onPrimaryAction={() => console.log(`Primary action for ${plan.name}`)}
                  onSecondaryAction={() => console.log(`Secondary action for ${plan.name}`)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Import the PublicPlanCard component
import { PublicPlanCard } from './PublicPlanCard';
