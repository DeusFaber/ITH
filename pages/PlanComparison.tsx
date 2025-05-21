
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnhancedPlanComparison } from '../components/marketplace/EnhancedPlanComparison';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { PlanData } from '../lib/mockPlansData';
import { allPlans } from '../lib/mockPlansData';
import { toast } from 'sonner@2.0.3';

export function PlanComparison() {
  const navigate = useNavigate();
  const [selectedPlans, setSelectedPlans] = useState<PlanData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Flatten all plans into a single array for selection
  const availablePlans = React.useMemo(() => {
    return [
      ...allPlans.basic,
      ...allPlans.security,
      ...allPlans.accelerate
    ];
  }, []);
  
  // Initial loading of plans
  useEffect(() => {
    // Simulate loading from an API
    const loadPlans = async () => {
      setIsLoading(true);
      try {
        // Add some demo plans to start with
        setSelectedPlans([
          allPlans.basic[1], // Essential IT
          allPlans.security[1] // Security Advanced
        ]);
      } catch (error) {
        console.error('Error loading plans:', error);
        toast.error('Failed to load plans');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPlans();
  }, []);
  
  // Handle adding plan to comparison
  const handleAddPlan = useCallback((planId: string) => {
    const planToAdd = availablePlans.find(p => p.id === planId);
    if (planToAdd) {
      setSelectedPlans(prev => [...prev, planToAdd]);
      toast.success(`Added ${planToAdd.name} to comparison`);
    }
  }, [availablePlans]);
  
  // Handle removing plan from comparison
  const handleRemovePlan = useCallback((planId: string) => {
    setSelectedPlans(prev => prev.filter(p => p.id !== planId));
    const planName = availablePlans.find(p => p.id === planId)?.name;
    if (planName) {
      toast.info(`Removed ${planName} from comparison`);
    }
  }, [availablePlans]);
  
  // Handle selecting a plan to view details
  const handleSelectPlan = useCallback((planId: string) => {
    // Navigate to the plan detail page
    navigate(`/plans/${planId}`);
  }, [navigate]);
  
  // Navigate back to plans page
  const handleBack = useCallback(() => {
    navigate('/plans');
  }, [navigate]);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Button variant="outline" onClick={handleBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Plans
        </Button>
        
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-extralight text-navy">Compare Plans</h1>
            <p className="text-xs text-muted-foreground">Loading plan comparison...</p>
          </div>
          
          <Card className="h-[400px] rounded-[16px] rounded-tr-[0px] flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center space-y-4">
              <div className="h-12 w-12 bg-blue/20 rounded-full"></div>
              <div className="h-4 w-48 bg-muted rounded"></div>
              <div className="h-3 w-64 bg-muted rounded"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <EnhancedPlanComparison
        plans={selectedPlans}
        availablePlans={availablePlans}
        onAddPlan={handleAddPlan}
        onRemovePlan={handleRemovePlan}
        onSelectPlan={handleSelectPlan}
        onBack={handleBack}
        maxComparisons={4}
      />
      
      <div className="mt-12 pt-8 border-t">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extralight text-navy">Still not sure which plan is right for you?</h2>
          <Button 
            onClick={() => navigate('/assessment')}
            className="rounded-[16px] rounded-tr-[0px] bg-blue hover:bg-blue/90 text-white"
          >
            Take Our Assessment
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <Card className="p-6 rounded-[16px] rounded-tr-[0px]">
            <h3 className="text-xl font-extralight text-navy mb-2">Talk to an Expert</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Get personalized advice from our IT specialists who can help you choose the right plan for your business needs.
            </p>
            <Button variant="outline" className="w-full rounded-[16px] rounded-tr-[0px]">
              Schedule Consultation
            </Button>
          </Card>
          
          <Card className="p-6 rounded-[16px] rounded-tr-[0px]">
            <h3 className="text-xl font-extralight text-navy mb-2">Custom Plan Builder</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Create a customized plan that perfectly fits your organization's specific requirements and budget constraints.
            </p>
            <Button variant="outline" className="w-full rounded-[16px] rounded-tr-[0px]">
              Build Custom Plan
            </Button>
          </Card>
          
          <Card className="p-6 rounded-[16px] rounded-tr-[0px] lg:col-span-1 md:col-span-2">
            <h3 className="text-xl font-extralight text-navy mb-2">Case Studies</h3>
            <p className="text-xs text-muted-foreground mb-4">
              See how other businesses similar to yours have successfully implemented our plans and achieved measurable results.
            </p>
            <Button variant="outline" className="w-full rounded-[16px] rounded-tr-[0px]">
              View Case Studies
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
