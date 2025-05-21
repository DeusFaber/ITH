
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { HeroSection } from '../../components/ui/HeroSection';
import { ArrowRight, Check, X, HelpCircle, Server, ShieldCheck, Clock, Rocket } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Tooltip } from '../../components/ui/tooltip';

interface PricingPageProps {
  onLoginClick: () => void;
  onGetStartedClick: () => void;
}

// Plan type
interface Plan {
  name: string;
  description: string;
  price: string;
  priceDetail: string;
  phase: 'operate' | 'secure' | 'streamline' | 'accelerate';
  features: Array<{
    name: string;
    included: boolean;
    highlight?: boolean;
    tooltip?: string;
  }>;
  popular?: boolean;
}

export function PricingPage({ onLoginClick, onGetStartedClick }: PricingPageProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPhase, setSelectedPhase] = useState<'operate' | 'secure' | 'streamline' | 'accelerate' | 'all'>('all');
  
  // Sample plans data
  const plans: Plan[] = [
    {
      name: "User Health",
      description: "Essential workstation management for staff productivity",
      price: "R450",
      priceDetail: "per user / month",
      phase: "operate",
      features: [
        { name: "Workstation monitoring", included: true },
        { name: "End-user support", included: true, highlight: true },
        { name: "Software updates & patching", included: true },
        { name: "Antivirus protection", included: true },
        { name: "Performance optimization", included: true },
        { name: "Asset management", included: true },
        { name: "Remote support", included: true },
        { name: "After-hours support", included: false },
        { name: "Hardware procurement", included: false },
        { name: "Microsoft 365 integration", included: false },
      ]
    },
    {
      name: "Office Health",
      description: "Complete office infrastructure management solution",
      price: "R3,500",
      priceDetail: "per month (up to 20 users)",
      phase: "operate",
      features: [
        { name: "Network monitoring", included: true },
        { name: "Server management", included: true, highlight: true },
        { name: "Internet connectivity oversight", included: true },
        { name: "Backup management", included: true },
        { name: "Printer & peripheral support", included: true },
        { name: "Network security", included: true },
        { name: "Quarterly IT reviews", included: true },
        { name: "Hardware procurement", included: true },
        { name: "Load-shedding solutions", included: false, tooltip: "Available as an add-on" },
        { name: "Wi-Fi optimization", included: false },
      ]
    },
    {
      name: "ITsafe User",
      description: "Enhanced security for individual user devices",
      price: "R250",
      priceDetail: "per user / month",
      phase: "secure",
      features: [
        { name: "Advanced endpoint protection", included: true, highlight: true },
        { name: "Phishing protection", included: true },
        { name: "Email security filtering", included: true },
        { name: "Data encryption", included: true },
        { name: "Security awareness training", included: true },
        { name: "Multi-factor authentication", included: true },
        { name: "Password management", included: true },
        { name: "Mobile device protection", included: false },
        { name: "Web filtering", included: false },
        { name: "Vulnerability scanning", included: false },
      ],
      popular: true
    },
    {
      name: "ITsafe Server",
      description: "Comprehensive server & network security",
      price: "R2,750",
      priceDetail: "per month (up to 5 servers)",
      phase: "secure",
      features: [
        { name: "Firewall management", included: true },
        { name: "Intrusion detection", included: true, highlight: true },
        { name: "Server hardening", included: true },
        { name: "Security patching", included: true },
        { name: "Network security monitoring", included: true },
        { name: "Vulnerability management", included: true },
        { name: "Access control", included: true },
        { name: "Security incident response", included: true },
        { name: "Dark web monitoring", included: false },
        { name: "Security assessments", included: false },
      ]
    },
    {
      name: "Business Basic",
      description: "Core productivity & collaboration tools",
      price: "R550",
      priceDetail: "per user / month",
      phase: "streamline",
      features: [
        { name: "Microsoft 365 Business Basic", included: true },
        { name: "Email & calendar", included: true },
        { name: "Teams messaging", included: true },
        { name: "Web Office apps", included: true },
        { name: "1TB OneDrive storage", included: true },
        { name: "SharePoint intranet", included: true, highlight: true },
        { name: "Mobile app access", included: true },
        { name: "Desktop Office apps", included: false },
        { name: "Advanced security features", included: false },
        { name: "Workflow automation", included: false },
      ]
    },
    {
      name: "Reporting Plan",
      description: "Business intelligence & analytics solution",
      price: "R8,500",
      priceDetail: "setup + R2,500/month",
      phase: "accelerate",
      features: [
        { name: "Custom KPI dashboards", included: true, highlight: true },
        { name: "Data connectivity", included: true },
        { name: "Report automation", included: true },
        { name: "Data visualization", included: true },
        { name: "Mobile reporting", included: true },
        { name: "Export capabilities", included: true },
        { name: "Scheduled reporting", included: true },
        { name: "Advanced analytics", included: false },
        { name: "AI-driven insights", included: false },
        { name: "Custom data modeling", included: false },
      ]
    },
  ];
  
  // Filter plans based on selected phase
  const filteredPlans = selectedPhase === 'all' 
    ? plans 
    : plans.filter(plan => plan.phase === selectedPhase);
  
  // Get phase icon
  const getPhaseIcon = (phase: 'operate' | 'secure' | 'streamline' | 'accelerate') => {
    switch (phase) {
      case 'operate':
        return <Server className="h-5 w-5" />;
      case 'secure':
        return <ShieldCheck className="h-5 w-5" />;
      case 'streamline':
        return <Clock className="h-5 w-5" />;
      case 'accelerate':
        return <Rocket className="h-5 w-5" />;
    }
  };
  
  // Get phase color
  const getPhaseColor = (phase: 'operate' | 'secure' | 'streamline' | 'accelerate') => {
    switch (phase) {
      case 'operate':
        return 'bg-blue text-white';
      case 'secure':
        return 'bg-navy text-white';
      case 'streamline':
        return 'bg-primary text-white';
      case 'accelerate':
        return 'bg-blue text-white';
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection
          fullWidth={true}
          background="blue"
          alignment="center"
          className="py-16 md:py-24"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight mb-4">
              Simple, Transparent <span className="text-white">Pricing</span>
            </h1>
            <p className="text-white/80 mb-8 mx-auto max-w-2xl">
              All plans include our signature South African support and no hidden costs. Choose the IT services that fit your business needs.
            </p>
            
            {/* Billing toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 rounded-[16px] rounded-tr-[0px] transition-all ${
                  billingPeriod === 'monthly' 
                    ? 'bg-white text-blue' 
                    : 'bg-transparent text-white border border-white/20'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-4 py-2 rounded-[16px] rounded-tr-[0px] transition-all ${
                  billingPeriod === 'annual' 
                    ? 'bg-white text-blue' 
                    : 'bg-transparent text-white border border-white/20'
                }`}
              >
                Annual (Save 10%)
              </button>
            </div>
          </div>
        </HeroSection>
        
        {/* Phase Filter */}
        <section className="py-8 bg-muted/10 border-y border-muted/20">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-xl font-extralight mb-4 md:mb-0">
                Filter by <span className="text-blue">Phase</span>
              </h2>
              
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedPhase('all')}
                  className={`px-4 py-2 text-sm rounded-[16px] rounded-tr-[0px] transition-all ${
                    selectedPhase === 'all' 
                      ? 'bg-blue text-white' 
                      : 'bg-blue/10 text-blue hover:bg-blue/20'
                  }`}
                >
                  All Phases
                </button>
                <button
                  onClick={() => setSelectedPhase('operate')}
                  className={`px-4 py-2 text-sm rounded-[16px] rounded-tr-[0px] transition-all flex items-center gap-2 ${
                    selectedPhase === 'operate' 
                      ? 'bg-blue text-white' 
                      : 'bg-blue/10 text-blue hover:bg-blue/20'
                  }`}
                >
                  <Server className="h-4 w-4" /> Operate
                </button>
                <button
                  onClick={() => setSelectedPhase('secure')}
                  className={`px-4 py-2 text-sm rounded-[16px] rounded-tr-[0px] transition-all flex items-center gap-2 ${
                    selectedPhase === 'secure' 
                      ? 'bg-navy text-white' 
                      : 'bg-navy/10 text-navy hover:bg-navy/20'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" /> Secure
                </button>
                <button
                  onClick={() => setSelectedPhase('streamline')}
                  className={`px-4 py-2 text-sm rounded-[16px] rounded-tr-[0px] transition-all flex items-center gap-2 ${
                    selectedPhase === 'streamline' 
                      ? 'bg-primary text-white' 
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  <Clock className="h-4 w-4" /> Streamline
                </button>
                <button
                  onClick={() => setSelectedPhase('accelerate')}
                  className={`px-4 py-2 text-sm rounded-[16px] rounded-tr-[0px] transition-all flex items-center gap-2 ${
                    selectedPhase === 'accelerate' 
                      ? 'bg-blue text-white' 
                      : 'bg-blue/10 text-blue hover:bg-blue/20'
                  }`}
                >
                  <Rocket className="h-4 w-4" /> Accelerate
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Plans Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            {/* Display message if no plans match filter */}
            {filteredPlans.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-extralight mb-2">No plans match your current filter</h3>
                <p className="text-muted-foreground mb-4">Try selecting a different phase or view all phases</p>
                <Button 
                  onClick={() => setSelectedPhase('all')}
                  className="bg-blue hover:bg-blue/90 rounded-[16px] rounded-tr-[0px]"
                >
                  View All Plans
                </Button>
              </div>
            )}
            
            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all overflow-hidden relative ${
                    plan.popular ? 'border-blue' : 'border-border'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <Badge className="rounded-bl-lg rounded-tr-none bg-blue text-white">
                        Popular
                      </Badge>
                    </div>
                  )}
                  
                  <div className={`h-2 ${getPhaseColor(plan.phase)}`}></div>
                  
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`p-1.5 rounded-full ${
                            plan.phase === 'operate' ? 'bg-blue/10 text-blue' :
                            plan.phase === 'secure' ? 'bg-navy/10 text-navy' :
                            plan.phase === 'streamline' ? 'bg-primary/10 text-primary' :
                            'bg-blue/10 text-blue'
                          }`}>
                            {getPhaseIcon(plan.phase)}
                          </span>
                          <span className="text-xs text-muted-foreground capitalize">
                            {plan.phase} Phase
                          </span>
                        </div>
                        <h3 className="text-xl font-extralight mt-2">{plan.name}</h3>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-light">
                          {billingPeriod === 'annual' 
                            ? plan.price.includes('setup') 
                              ? plan.price // If it has setup cost, don't apply discount
                              : `R${Math.round(parseInt(plan.price.replace(/[^\d]/g, '')) * 0.9)}` 
                            : plan.price
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {plan.priceDetail}
                          {billingPeriod === 'annual' && !plan.price.includes('setup') && ' (10% off)'}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-6">
                      {plan.description}
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          {feature.included ? (
                            <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                              feature.highlight 
                                ? plan.phase === 'operate' ? 'text-blue' :
                                  plan.phase === 'secure' ? 'text-navy' :
                                  plan.phase === 'streamline' ? 'text-primary' :
                                  'text-blue'
                                : 'text-green-500'
                            }`} />
                          ) : (
                            <X className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className="text-sm">
                            {feature.name}
                            {feature.tooltip && (
                              <Tooltip>
                                <HelpCircle className="h-3 w-3 inline-block ml-1 text-muted-foreground" />
                                <Tooltip.Content>
                                  {feature.tooltip}
                                </Tooltip.Content>
                              </Tooltip>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full rounded-[16px] rounded-tr-[0px] ${
                        plan.phase === 'operate' ? 'bg-blue hover:bg-blue/90' :
                        plan.phase === 'secure' ? 'bg-navy hover:bg-navy/90' :
                        plan.phase === 'streamline' ? 'bg-primary hover:bg-primary/90' :
                        'bg-blue hover:bg-blue/90'
                      }`}
                      onClick={onGetStartedClick}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Enterprise Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                  Enterprise <span className="text-blue">Solutions</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  For larger organizations with complex requirements, we offer customized enterprise solutions tailored to your specific needs.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 text-blue flex-shrink-0" />
                    <div>
                      <h4 className="font-light">Customized Service Packages</h4>
                      <p className="text-sm text-muted-foreground">
                        Tailored combinations of our services designed specifically for your organization.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 text-blue flex-shrink-0" />
                    <div>
                      <h4 className="font-light">Dedicated Account Team</h4>
                      <p className="text-sm text-muted-foreground">
                        A team of specialists dedicated to managing your IT environment.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 text-blue flex-shrink-0" />
                    <div>
                      <h4 className="font-light">Volume Discounts</h4>
                      <p className="text-sm text-muted-foreground">
                        Special pricing for larger user counts and multi-year agreements.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="rounded-[16px] rounded-tr-[0px] bg-blue hover:bg-blue/90"
                  onClick={onGetStartedClick}
                >
                  Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-extralight mb-4">Enterprise Features</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-muted/20 p-4 rounded-[16px] rounded-tr-[0px]">
                      <h4 className="font-light mb-2">Multi-Location Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Coordinated IT support across all your South African offices.
                      </p>
                    </div>
                    
                    <div className="bg-muted/20 p-4 rounded-[16px] rounded-tr-[0px]">
                      <h4 className="font-light mb-2">Extended SLA Options</h4>
                      <p className="text-sm text-muted-foreground">
                        Guaranteed response times with customized service level agreements.
                      </p>
                    </div>
                    
                    <div className="bg-muted/20 p-4 rounded-[16px] rounded-tr-[0px]">
                      <h4 className="font-light mb-2">CIO Advisory Services</h4>
                      <p className="text-sm text-muted-foreground">
                        Strategic IT leadership and planning from experienced professionals.
                      </p>
                    </div>
                    
                    <div className="bg-muted/20 p-4 rounded-[16px] rounded-tr-[0px]">
                      <h4 className="font-light mb-2">Custom Development</h4>
                      <p className="text-sm text-muted-foreground">
                        Tailored software solutions and integrations for your business needs.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-light mb-3">Perfect For:</h4>
                    <ul className="space-y-2">
                      {[
                        'Organizations with 100+ employees',
                        'Businesses with multiple locations',
                        'Companies with complex regulatory requirements',
                        'Enterprises requiring 24/7 mission-critical support'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                Frequently Asked <span className="text-blue">Questions</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-light mb-2">Can I combine multiple plans?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes, our plans are designed to work together. Many clients combine plans from different phases to create a comprehensive IT solution that meets their specific needs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-light mb-2">Are there any hidden costs?</h3>
                  <p className="text-muted-foreground text-sm">
                    No, we believe in transparent pricing. The monthly fee covers everything described in the plan. For projects beyond the scope of your plan, we'll provide clear quotes in advance.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-light mb-2">What if my needs change?</h3>
                  <p className="text-muted-foreground text-sm">
                    You can upgrade, downgrade, or add plans at any time. Our flexible approach allows you to scale your IT services as your business grows or changes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-light mb-2">Do you require long-term contracts?</h3>
                  <p className="text-muted-foreground text-sm">
                    No. While we offer discounts for annual commitments, we also provide month-to-month options. We're confident in our service quality and don't need to lock you into long contracts.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-light mb-2">What's included in after-hours support?</h3>
                  <p className="text-muted-foreground text-sm">
                    Our after-hours support covers emergency IT issues outside standard business hours (8am-5pm, Mon-Fri). Emergencies include system outages, security incidents, and issues preventing critical business operations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-light mb-2">How quickly can you implement these services?</h3>
                  <p className="text-muted-foreground text-sm">
                    Most services can be implemented within 1-2 weeks. More complex setups or migrations may take 3-4 weeks. We'll provide a detailed timeline during your initial consultation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <HeroSection
          fullWidth={true}
          background="navy"
          alignment="center"
          className="py-16 md:py-24"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extralight mb-4">
              Not sure which plan is right for you?
            </h2>
            <p className="text-white/80 mb-8">
              Our consultants can help you determine the perfect IT solution for your business needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-navy hover:bg-white/90 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                Schedule a Consultation
              </Button>
              <Button 
                variant="ghost" 
                className="text-white border border-white/20 hover:bg-white/10 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                Compare All Plans
              </Button>
            </div>
          </div>
        </HeroSection>
      </main>
    </div>
  );
}
