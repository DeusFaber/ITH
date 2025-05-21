
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ChevronRight, ChevronDown, BookOpen, Clock, Shield, Rocket } from 'lucide-react';
import { PublicPlanCard } from './PublicPlanCard';
import { cn } from '../ui/utils';

// Import the plans data
import { 
  basicPlans, 
  securityPlans, 
  acceleratePlans 
} from '../../lib/mockPlansData';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  features: Array<{text: string, included: boolean, highlighted?: boolean}>;
  phase?: 'operate' | 'secure' | 'streamline' | 'accelerate';
  popular?: boolean;
  recommended?: boolean;
  ctaLabel?: string;
  currency?: string;
  discountPercentage?: number;
  originalPrice?: number;
  comingSoon?: boolean;
}

interface PlanCategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  plans: Plan[];
  onPlanSelect: (planId: string) => void;
}

const PlanCategory: React.FC<PlanCategoryProps> = ({
  title,
  description,
  icon,
  color,
  bgColor,
  plans,
  onPlanSelect
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <div className={`p-3 rounded-full mr-4 ${bgColor}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-extralight text-navy">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <PublicPlanCard
            key={plan.id}
            {...plan}
            expandedView={true}
            onPrimaryAction={() => onPlanSelect(plan.id)}
            onSecondaryAction={() => onPlanSelect(plan.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface EnhancedPublicPlansSectionProps {
  className?: string;
}

export function EnhancedPublicPlansSection({ className }: EnhancedPublicPlansSectionProps) {
  const [view, setView] = useState<'grid' | 'categories'>('grid');
  
  const handlePlanSelect = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
    // In a real implementation, this would navigate to the plan detail page
  };
  
  return (
    <div className={cn('py-20', className)} id="plans">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="ithealth-section-header">
          <h2 className="text-4xl font-extralight text-navy mb-4">IT Health Plans</h2>
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl">
            Choose the right plan for your business needs
          </p>
          <p className="text-xs text-muted-foreground max-w-2xl">
            All plans include access to our platform, 24/7 support, and regular health assessments to ensure your IT systems are operating at peak efficiency.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <Card className="rounded-full p-1">
            <div className="flex space-x-2">
              <Button 
                variant={view === 'grid' ? 'default' : 'ghost'} 
                onClick={() => setView('grid')} 
                className="rounded-full text-xs"
              >
                Featured Plans
              </Button>
              <Button 
                variant={view === 'categories' ? 'default' : 'ghost'} 
                onClick={() => setView('categories')} 
                className="rounded-full text-xs"
              >
                By Category
              </Button>
            </div>
          </Card>
        </div>
        
        {view === 'grid' ? (
          <Tabs defaultValue="featured" className="w-full">
            <div className="flex justify-center mb-8">
              <Card className="rounded-full p-1">
                <TabsList className="bg-transparent">
                  <TabsTrigger value="featured" className="rounded-full text-xs">Featured Plans</TabsTrigger>
                  <TabsTrigger value="operate" className="rounded-full text-xs">Operate</TabsTrigger>
                  <TabsTrigger value="secure" className="rounded-full text-xs">Secure</TabsTrigger>
                  <TabsTrigger value="accelerate" className="rounded-full text-xs">Accelerate</TabsTrigger>
                </TabsList>
              </Card>
            </div>
            
            <TabsContent value="featured">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Featured plans - one from each category */}
                <PublicPlanCard 
                  {...basicPlans[1]} 
                  expandedView={true}
                  onPrimaryAction={() => handlePlanSelect(basicPlans[1].id)}
                  onSecondaryAction={() => handlePlanSelect(basicPlans[1].id)}
                />
                <PublicPlanCard 
                  {...securityPlans[1]} 
                  expandedView={true}
                  onPrimaryAction={() => handlePlanSelect(securityPlans[1].id)}
                  onSecondaryAction={() => handlePlanSelect(securityPlans[1].id)}
                />
                <PublicPlanCard 
                  {...acceleratePlans[1]} 
                  expandedView={true}
                  onPrimaryAction={() => handlePlanSelect(acceleratePlans[1].id)}
                  onSecondaryAction={() => handlePlanSelect(acceleratePlans[1].id)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="operate">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {basicPlans.map(plan => (
                  <PublicPlanCard 
                    key={plan.id} 
                    {...plan} 
                    expandedView={true}
                    onPrimaryAction={() => handlePlanSelect(plan.id)}
                    onSecondaryAction={() => handlePlanSelect(plan.id)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="secure">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {securityPlans.map(plan => (
                  <PublicPlanCard 
                    key={plan.id} 
                    {...plan} 
                    expandedView={true}
                    onPrimaryAction={() => handlePlanSelect(plan.id)}
                    onSecondaryAction={() => handlePlanSelect(plan.id)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="accelerate">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {acceleratePlans.map(plan => (
                  <PublicPlanCard 
                    key={plan.id} 
                    {...plan} 
                    expandedView={true}
                    onPrimaryAction={() => handlePlanSelect(plan.id)}
                    onSecondaryAction={() => handlePlanSelect(plan.id)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-16">
            <PlanCategory
              title="Operate Plans"
              description="Basic IT infrastructure and management solutions to keep your business running smoothly."
              icon={<Clock className="h-5 w-5 text-blue" />}
              color="text-blue"
              bgColor="bg-blue/10"
              plans={basicPlans}
              onPlanSelect={handlePlanSelect}
            />
            
            <PlanCategory
              title="Secure Plans"
              description="Comprehensive security solutions to protect your business from threats."
              icon={<Shield className="h-5 w-5 text-navy" />}
              color="text-navy"
              bgColor="bg-navy/10"
              plans={securityPlans}
              onPlanSelect={handlePlanSelect}
            />
            
            <PlanCategory
              title="Accelerate Plans"
              description="Advanced solutions to drive business growth and innovation."
              icon={<Rocket className="h-5 w-5 text-gold" />}
              color="text-gold"
              bgColor="bg-gold/10"
              plans={acceleratePlans}
              onPlanSelect={handlePlanSelect}
            />
          </div>
        )}
        
        <div className="mt-12">
          <Button 
            className="bg-blue hover:bg-blue/90 text-white ithealth-button"
            onClick={() => handlePlanSelect('custom')}
          >
            Need a Custom Plan? Contact Us <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
