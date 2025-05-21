
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check, 
  Download, 
  Share2, 
  ShieldCheck, 
  Server, 
  Clock, 
  Rocket,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { PlanGrid } from '../components/marketplace/PlanGrid';
import { Skeleton } from '../components/ui/skeleton';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { PlanCard } from '../components/marketplace/PlanCard';
import { planService, PlanDetailsAPIResponse } from '../services/planService';
import { PlanData } from '../lib/mockPlansData';
import { toast } from 'sonner@2.0.3';

export function PlanDetail() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [planDetails, setPlanDetails] = useState<PlanDetailsAPIResponse | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    async function fetchPlanDetails() {
      if (!planId) return;
      
      setLoading(true);
      try {
        const details = await planService.getPlanById(planId);
        setPlanDetails(details);
      } catch (error) {
        console.error('Error fetching plan details:', error);
        toast.error('Failed to load plan details');
      } finally {
        setLoading(false);
      }
    }
    
    fetchPlanDetails();
  }, [planId]);
  
  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };
  
  const handleDownloadPdf = () => {
    toast.success('Plan brochure download started');
    // In a real app, this would trigger a download
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog or copy link to clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard');
  };
  
  const handlePurchase = () => {
    toast.success(`Starting purchase process for ${planDetails?.plan.name}`);
    // In a real app, this would navigate to a checkout page
  };
  
  const handleContactSales = () => {
    toast.success('Sales contact request submitted');
    // In a real app, this would open a contact form or start a chat
  };
  
  const formatInterval = (interval?: string): string => {
    if (!interval) return '';
    
    switch (interval) {
      case 'monthly': return '/month';
      case 'quarterly': return '/quarter';
      case 'annually': return '/year';
      case 'once-off': return '';
      default: return '';
    }
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-60 w-full" />
          </div>
          
          <div>
            <Card className="p-6 sticky top-20">
              <Skeleton className="h-8 w-full mb-4" />
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full" />
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  // Render error state
  if (!planDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" onClick={handleGoBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Plans
          </Button>
        </div>
        
        <div className="text-center py-16">
          <div className="mb-4 text-muted-foreground">
            <HelpCircle className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-extralight mb-2">Plan Not Found</h2>
          <p className="text-xs text-muted-foreground mb-6">
            The plan you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/plans')}>
            Browse Available Plans
          </Button>
        </div>
      </div>
    );
  }
  
  const { plan, relatedPlans } = planDetails;
  
  // Phase icon component
  const PhaseIcon = () => {
    switch (plan.phase) {
      case 'operate':
        return <Server className="h-5 w-5" />;
      case 'secure':
        return <ShieldCheck className="h-5 w-5" />;
      case 'streamline':
        return <Clock className="h-5 w-5" />;
      case 'accelerate':
        return <Rocket className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  // Phase color classes
  const getPhaseColorClasses = () => {
    switch (plan.phase) {
      case 'operate':
        return {
          badge: 'bg-blue text-white',
          button: 'bg-blue hover:bg-blue/90',
          icon: 'text-blue',
          iconBg: 'bg-blue/10'
        };
      case 'secure':
        return {
          badge: 'bg-navy text-white',
          button: 'bg-navy hover:bg-navy/90',
          icon: 'text-navy',
          iconBg: 'bg-navy/10'
        };
      case 'streamline':
        return {
          badge: 'bg-primary text-white',
          button: 'bg-primary hover:bg-primary/90',
          icon: 'text-primary',
          iconBg: 'bg-primary/10'
        };
      case 'accelerate':
        return {
          badge: 'bg-gold text-white',
          button: 'bg-gold hover:bg-gold/90',
          icon: 'text-gold',
          iconBg: 'bg-gold/10'
        };
      default:
        return {
          badge: 'bg-blue text-white',
          button: 'bg-blue hover:bg-blue/90',
          icon: 'text-blue',
          iconBg: 'bg-blue/10'
        };
    }
  };
  
  const phaseColors = getPhaseColorClasses();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" onClick={handleGoBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Plans
        </Button>
        
        {plan.phase && (
          <Badge className={`${phaseColors.badge}`}>
            {plan.phase.charAt(0).toUpperCase() + plan.phase.slice(1)}
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-extralight text-navy mb-2">{plan.name}</h1>
            <p className="text-xs text-muted-foreground">{plan.description}</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="text-xl font-extralight text-navy mb-4">Plan Overview</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="p-6 rounded-[16px] rounded-tr-[0px]">
                    <div className={`h-10 w-10 rounded-full ${phaseColors.iconBg} flex items-center justify-center ${phaseColors.icon} mb-4`}>
                      <PhaseIcon />
                    </div>
                    <h4 className="text-lg font-extralight mb-2">What's Included</h4>
                    <ul className="space-y-2">
                      {plan.features.filter(f => f.included).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className={`h-4 w-4 mt-0.5 ${phaseColors.icon}`} />
                          <span className="text-xs">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                  
                  <Card className="p-6 rounded-[16px] rounded-tr-[0px]">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-extralight mb-2">Pricing Details</h4>
                        <div className="mb-2">
                          <div className="flex items-end">
                            <span className="text-3xl font-light text-navy">R{plan.price}</span>
                            <span className="text-sm text-muted-foreground ml-1 mb-1">
                              {formatInterval(plan.interval)}
                            </span>
                          </div>
                          
                          {plan.discountPercentage && plan.originalPrice && (
                            <div className="text-xs text-muted-foreground">
                              <span className="line-through mr-2">R{plan.originalPrice}</span>
                              <Badge className="bg-primary/10 text-primary text-xs">
                                Save {plan.discountPercentage}%
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-extralight mb-2">Plan Term</h4>
                        <p className="text-xs text-muted-foreground">
                          {plan.interval === 'monthly' && 'Monthly billing with no long-term commitment.'}
                          {plan.interval === 'quarterly' && 'Billed every 3 months.'}
                          {plan.interval === 'annually' && 'Annual billing for maximum savings.'}
                          {plan.interval === 'once-off' && 'One-time purchase with no recurring charges.'}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="rounded-[16px] rounded-tr-[0px] bg-muted/30 p-6">
                  <h4 className="text-lg font-extralight mb-4">About This Plan</h4>
                  <div className="space-y-4 text-xs">
                    <p>
                      The {plan.name} plan is designed to provide {plan.phase} services for businesses 
                      looking to enhance their IT infrastructure and capabilities. This comprehensive 
                      solution includes professional services, software tools, and expert guidance.
                    </p>
                    <p>
                      With {plan.name}, your business gets access to specialized IT resources that 
                      would otherwise require significant investment in talent and infrastructure. 
                      Our team of experts will work with you to implement solutions tailored to your 
                      specific business needs.
                    </p>
                    <p>
                      This plan is ideal for businesses that want to {plan.phase === 'operate' && 'maintain efficient IT operations'}
                      {plan.phase === 'secure' && 'enhance their security posture'}
                      {plan.phase === 'streamline' && 'optimize their IT processes'}
                      {plan.phase === 'accelerate' && 'leverage IT for business growth'}.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6">
              <div>
                <h3 className="text-xl font-extralight text-navy mb-4">Plan Features</h3>
                
                <Card className="p-6 rounded-[16px] rounded-tr-[0px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-extralight mb-4">Core Features</h4>
                      <ul className="space-y-3">
                        {plan.features.filter(f => f.included).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className={`h-4 w-4 mt-0.5 ${phaseColors.icon}`} />
                            <div>
                              <span className={`text-xs ${feature.highlighted ? 'font-medium' : ''}`}>
                                {feature.text}
                              </span>
                              <p className="text-xs text-muted-foreground mt-1">
                                Detailed explanation of how this feature benefits your business and what it includes.
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-extralight mb-4">Not Included</h4>
                      <ul className="space-y-3">
                        {plan.features.filter(f => !f.included).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <div className="h-4 w-4 mt-0.5 border border-muted-foreground/30 rounded-full" />
                            <div>
                              <span className="text-xs">{feature.text}</span>
                              <p className="text-xs text-muted-foreground mt-1">
                                Available in our {feature.highlighted ? 'premium' : 'higher tier'} plans.
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="p-6 rounded-[16px] rounded-tr-[0px]">
                    <h4 className="text-lg font-extralight mb-2">Support</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {plan.price < 3000
                        ? 'Email support with 24-hour response time.'
                        : plan.price < 5000
                        ? 'Email and phone support with 8-hour response time.'
                        : 'Priority support with dedicated account manager.'}
                    </p>
                  </Card>
                  
                  <Card className="p-6 rounded-[16px] rounded-tr-[0px]">
                    <h4 className="text-lg font-extralight mb-2">Service Level</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {plan.price < 3000
                        ? 'Standard service level agreement.'
                        : plan.price < 5000
                        ? 'Enhanced SLA with 99.5% uptime guarantee.'
                        : 'Premium SLA with 99.9% uptime guarantee.'}
                    </p>
                  </Card>
                  
                  <Card className="p-6 rounded-[16px] rounded-tr-[0px]">
                    <h4 className="text-lg font-extralight mb-2">Implementation</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {plan.price < 3000
                        ? 'Self-service implementation with documentation.'
                        : plan.price < 5000
                        ? 'Guided implementation with technician support.'
                        : 'Full-service implementation with dedicated team.'}
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-6">
              <div>
                <h3 className="text-xl font-extralight text-navy mb-4">Frequently Asked Questions</h3>
                
                <Card className="p-6 rounded-[16px] rounded-tr-[0px]">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-extralight mb-2">What is included in the {plan.name} plan?</h4>
                      <p className="text-xs text-muted-foreground">
                        The {plan.name} plan includes all core features listed on this page, such as 
                        {plan.features.filter(f => f.included).slice(0, 3).map(f => ` ${f.text.toLowerCase()}`).join(', ')}
                        {plan.features.filter(f => f.included).length > 3 ? ', and more.' : '.'}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-extralight mb-2">Can I upgrade or downgrade my plan later?</h4>
                      <p className="text-xs text-muted-foreground">
                        Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features will be available immediately, and you'll be charged the prorated difference. When downgrading, the changes will take effect at the start of your next billing cycle.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-extralight mb-2">Is there a contract or commitment?</h4>
                      <p className="text-xs text-muted-foreground">
                        {plan.interval === 'monthly' && 'There is no long-term contract with this plan. You can cancel at any time, and your service will continue until the end of the current billing period.'}
                        {plan.interval === 'quarterly' && 'This plan includes a quarterly commitment. You can cancel at any time, but your service will continue until the end of the current quarter.'}
                        {plan.interval === 'annually' && 'This plan includes an annual commitment. You can cancel at any time, but your service will continue until the end of the current year.'}
                        {plan.interval === 'once-off' && 'This is a one-time purchase with no recurring commitment.'}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-extralight mb-2">How do I get started?</h4>
                      <p className="text-xs text-muted-foreground">
                        Getting started is easy. Simply click the "Get Started" button, and you'll be guided through the setup process. Depending on the plan, you may need to schedule an onboarding call with our team.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-extralight mb-2">What payment methods do you accept?</h4>
                      <p className="text-xs text-muted-foreground">
                        We accept credit cards, debit cards, EFT, and direct debit. For annual plans or enterprise customers, we also offer invoice payment options.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Related Plans Section */}
          {relatedPlans.length > 0 && (
            <div className="pt-8 border-t">
              <h3 className="text-xl font-extralight text-navy mb-4">Related Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPlans.map(relatedPlan => (
                  <PlanCard
                    key={relatedPlan.id}
                    {...relatedPlan}
                    onPrimaryAction={() => navigate(`/plans/${relatedPlan.id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sticky Purchase Card */}
        <div>
          <Card className="p-6 rounded-[16px] rounded-tr-[0px] sticky top-20">
            <div className="space-y-6">
              <div>
                <div className="flex items-end">
                  <span className="text-3xl font-light text-navy">R{plan.price}</span>
                  <span className="text-sm text-muted-foreground ml-1 mb-1">
                    {formatInterval(plan.interval)}
                  </span>
                </div>
                
                {plan.discountPercentage && plan.originalPrice && (
                  <div className="text-xs text-muted-foreground mt-1">
                    <span className="line-through mr-2">R{plan.originalPrice}</span>
                    <Badge className="bg-primary/10 text-primary text-xs">
                      Save {plan.discountPercentage}%
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <Button 
                  className={`w-full rounded-[16px] rounded-tr-[0px] ${phaseColors.button}`}
                  onClick={handlePurchase}
                  disabled={plan.comingSoon}
                >
                  {plan.comingSoon ? 'Coming Soon' : (plan.ctaLabel || 'Get Started')}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full rounded-[16px] rounded-tr-[0px]"
                  onClick={handleContactSales}
                >
                  Contact Sales
                </Button>
              </div>
              
              <div className="pt-4 border-t flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleDownloadPdf}
                  className="text-xs"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download PDF
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleShare}
                  className="text-xs"
                >
                  <Share2 className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
