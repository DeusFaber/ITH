
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, CheckCircle, Shield, Zap, FileText, Users, Server, Mail, LayoutGrid, Share2, BarChart2, Workflow, Users as UsersIcon, Sparkles } from 'lucide-react';

// Define plan phase types and icons
const phaseIcons = {
  operate: <Zap className="h-5 w-5 text-blue" />,
  secure: <Shield className="h-5 w-5 text-navy" />,
  streamline: <Workflow className="h-5 w-5 text-primary" />,
  accelerate: <Sparkles className="h-5 w-5 text-blue" />
};

const planTypeIcons = {
  "user-health": <Users className="h-5 w-5" />,
  "office-health": <LayoutGrid className="h-5 w-5" />,
  "communication": <Mail className="h-5 w-5" />,
  "itsafe-user": <Shield className="h-5 w-5" />,
  "itsafe-server": <Server className="h-5 w-5" />,
  "mail": <Mail className="h-5 w-5" />,
  "business-basic": <FileText className="h-5 w-5" />,
  "business-standard": <FileText className="h-5 w-5" />,
  "sharepoint": <Share2 className="h-5 w-5" />,
  "reporting": <BarChart2 className="h-5 w-5" />,
  "workflow-optimization": <Workflow className="h-5 w-5" />,
  "digital-customer": <UsersIcon className="h-5 w-5" />,
  "ai-connect": <Sparkles className="h-5 w-5" />
};

export interface PlanBenefit {
  title: string;
  description: string;
}

export interface PlanFeature {
  title: string;
  included: boolean;
}

export interface PlanPageProps {
  title: string;
  slug: string;
  phase: 'operate' | 'secure' | 'streamline' | 'accelerate';
  phaseColor: string;
  description: string;
  price: string;
  priceDescription: string;
  benefits: PlanBenefit[];
  features: PlanFeature[];
  faqs?: Array<{ question: string; answer: string }>;
  relatedPlans: Array<{
    title: string;
    slug: string;
    phase: 'operate' | 'secure' | 'streamline' | 'accelerate';
  }>;
}

export function PlanPage({
  title,
  slug,
  phase,
  phaseColor,
  description,
  price,
  priceDescription,
  benefits,
  features,
  faqs = [],
  relatedPlans
}: PlanPageProps) {
  // Find the correct icon for this plan
  const planIcon = planTypeIcons[slug as keyof typeof planTypeIcons] || <FileText className="h-5 w-5" />;
  
  // Generate phase specific background color
  const getBgColor = () => {
    switch (phase) {
      case 'operate': return 'bg-blue';
      case 'secure': return 'bg-navy';
      case 'streamline': return 'bg-primary';
      case 'accelerate': return 'bg-blue';
      default: return 'bg-blue';
    }
  };
  
  const getBgLightColor = () => {
    switch (phase) {
      case 'operate': return 'bg-blue/5';
      case 'secure': return 'bg-navy/5';
      case 'streamline': return 'bg-primary/5';
      case 'accelerate': return 'bg-blue/5';
      default: return 'bg-blue/5';
    }
  };
  
  const getTextColor = () => {
    switch (phase) {
      case 'operate': return 'text-blue';
      case 'secure': return 'text-navy';
      case 'streamline': return 'text-primary';
      case 'accelerate': return 'text-blue';
      default: return 'text-blue';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-lg">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-foreground transition-colors">Home</a>
        <span>/</span>
        <a href="/plans" className="hover:text-foreground transition-colors">Plans</a>
        <span>/</span>
        <span className="text-foreground">{title}</span>
      </div>
      
      {/* Plan Header */}
      <div className={`${getBgColor()} text-white p-8 rounded-[16px] rounded-tr-[0px] mb-8`}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-white border-white/20 bg-white/10">
                {phase.charAt(0).toUpperCase() + phase.slice(1)} Phase
              </Badge>
              {phaseIcons[phase]}
            </div>
            <h1 className="text-3xl md:text-4xl font-extralight mb-3">{title}</h1>
            <p className="text-white/80 max-w-2xl mb-4">{description}</p>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-white text-blue hover:bg-white/90 rounded-[16px] rounded-tr-[0px]"
              >
                Get Started
              </Button>
              <Button 
                variant="ghost" 
                className="text-white border border-white/20 hover:bg-white/10 rounded-[16px] rounded-tr-[0px]"
              >
                Compare Plans <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="bg-white/10 text-white p-6 rounded-[16px] rounded-tr-[0px] min-w-[200px]">
            <div className="text-3xl font-extralight mb-1">{price}</div>
            <div className="text-white/80 text-sm mb-4">{priceDescription}</div>
            <Button 
              className="w-full bg-white text-blue hover:bg-white/90 rounded-[16px] rounded-tr-[0px]"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      
      {/* Key Benefits */}
      <div className="mb-12">
        <h2 className="text-2xl font-extralight mb-6">Key Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-extralight mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-extralight mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-md flex items-start gap-3 ${feature.included ? getBgLightColor() : 'bg-muted'}`}
            >
              <CheckCircle className={`mt-0.5 h-5 w-5 flex-shrink-0 ${feature.included ? getTextColor() : 'text-muted-foreground'}`} />
              <div>
                <h3 className={`text-base ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* FAQs */}
      {faqs.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-extralight mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Related Plans */}
      <div className="mb-12">
        <h2 className="text-2xl font-extralight mb-6">Related Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPlans.map((plan, index) => (
            <Card key={index} className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge 
                    variant="outline" 
                    className={`
                      ${plan.phase === 'operate' ? 'border-blue/20 text-blue' : ''}
                      ${plan.phase === 'secure' ? 'border-navy/20 text-navy' : ''}
                      ${plan.phase === 'streamline' ? 'border-primary/20 text-primary' : ''}
                      ${plan.phase === 'accelerate' ? 'border-blue/20 text-blue' : ''}
                    `}
                  >
                    {plan.phase.charAt(0).toUpperCase() + plan.phase.slice(1)}
                  </Badge>
                  {phaseIcons[plan.phase]}
                </div>
                <h3 className="text-xl font-extralight mb-4">{plan.title}</h3>
                <a 
                  href={`/plans/${plan.slug}`}
                  className={`
                    inline-flex items-center gap-1 text-sm font-medium
                    ${plan.phase === 'operate' ? 'text-blue' : ''}
                    ${plan.phase === 'secure' ? 'text-navy' : ''}
                    ${plan.phase === 'streamline' ? 'text-primary' : ''}
                    ${plan.phase === 'accelerate' ? 'text-blue' : ''}
                    hover:underline
                  `}
                >
                  View Plan <ArrowRight className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
