
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { PublicPlansHighlight } from '../components/public/PublicPlansHighlight';
import { MarketplacePublicPlans } from '../components/public/MarketplacePublicPlans';
import { NavLink, MegaMenu } from '../components/public/MegaMenu';
import { MobileNavigation } from '../components/public/MobileNavigation';
import { HeroSection } from '../components/ui/HeroSection';
import { WhiteLogoWrapper } from '../components/public/WhiteLogoWrapper';
import { DashboardScreenshot } from '../components/public/DashboardScreenshot';
import { ArrowRight, ChevronDown, Check, Menu } from 'lucide-react';
import Frame19 from '../imports/Frame19';
import Group46 from '../imports/Group46';
import Frame1 from '../imports/Frame1';
import PlanErrorBoundary from "../components/plans/PlanErrorBoundary";

// Import all public pages
import { AboutPage } from './public/AboutPage';
import { ContactPage } from './public/ContactPage';
import { FeaturesPage } from './public/FeaturesPage';
import { PricingPage } from './public/PricingPage';
import { ResourcesPage } from './public/ResourcesPage';
import { EnterprisePage } from './public/EnterprisePage';

// Import plan pages for displaying public plan details
import UserHealthPlan from "./plans/UserHealthPlan";
import OfficeHealthPlan from "./plans/OfficeHealthPlan";
import CommunicationPlan from "./plans/CommunicationPlan";
import ITsafeUserPlan from "./plans/ITsafeUserPlan";
import ITsafeServerPlan from "./plans/ITsafeServerPlan";
import MailPlan from "./plans/MailPlan";
import BusinessBasicPlan from "./plans/BusinessBasicPlan";
import BusinessStandardPlan from "./plans/BusinessStandardPlan";
import SharePointPlan from "./plans/SharePointPlan";
import ReportingPlan from "./plans/ReportingPlan";
import WorkflowOptimizationPlan from "./plans/WorkflowOptimizationPlan";
import DigitalCustomerPlan from "./plans/DigitalCustomerPlan";
import AIConnectPlan from "./plans/AIConnectPlan";

interface PublicWebsiteProps {
  onLoginClick: () => void;
  showPlanDetail?: boolean;
  planDetailId?: string;
}

export function PublicWebsite({ onLoginClick, showPlanDetail = false, planDetailId = '' }: PublicWebsiteProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('home');
  
  // Navigate to onboarding journey
  const navigateToOnboarding = () => {
    window.history.pushState({}, '', '/get-started');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  // Navigate to assessment
  const navigateToAssessment = () => {
    window.history.pushState({}, '', '/assessment');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  // For quick sections navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on resize if screen gets larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);
  
  // Handle navigation to pages
  const handlePageNavigation = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    
    // Update URL to help with navigation
    window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  // Check URL on load to set current page
  useEffect(() => {
    // Skip URL check if we're showing a plan detail directly
    if (showPlanDetail && planDetailId) {
      return;
    }

    const pathname = window.location.pathname;
    
    if (pathname === '/' || pathname === '') {
      setCurrentPage('home');
    } else {
      // Remove leading slash and use as page name
      const pageName = pathname.substring(1);
      if (['about', 'contact', 'features', 'pricing', 'resources', 'enterprise', 'plans'].includes(pageName)) {
        setCurrentPage(pageName);
      }
    }
    
    // Handle browser back/forward navigation
    const handlePopState = () => {
      const pathname = window.location.pathname;
      if (pathname === '/' || pathname === '') {
        setCurrentPage('home');
      } else {
        const pageName = pathname.substring(1);
        if (['about', 'contact', 'features', 'pricing', 'resources', 'enterprise', 'plans'].includes(pageName)) {
          setCurrentPage(pageName);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showPlanDetail, planDetailId]);
  
  // Render specific plan component
  const renderPlanComponent = () => {
    // Return the appropriate plan component based on planDetailId
    console.log("Rendering plan component for ID:", planDetailId);
    
    const planComponents: { [key: string]: JSX.Element } = {
      "user-health-plan": <UserHealthPlan />,
      "office-health-plan": <OfficeHealthPlan />,
      "communication-plan": <CommunicationPlan />,
      "itsafe-user-plan": <ITsafeUserPlan />,
      "itsafe-server-plan": <ITsafeServerPlan />,
      "mail-plan": <MailPlan />,
      "business-basic-plan": <BusinessBasicPlan />,
      "business-standard-plan": <BusinessStandardPlan />,
      "sharepoint-plan": <SharePointPlan />,
      "reporting-plan": <ReportingPlan />,
      "workflow-optimization-plan": <WorkflowOptimizationPlan />,
      "digital-customer-plan": <DigitalCustomerPlan />,
      "ai-connect-plan": <AIConnectPlan />
    };
    
    if (planDetailId && planComponents[planDetailId]) {
      return planComponents[planDetailId];
    }
    
    // If plan not found, show a friendly error message
    return (
      <div className="container mx-auto px-4 py-12 public-container">
        <div className="bg-red-50 p-6 rounded-[16px] rounded-tr-[0px] text-center">
          <h2 className="text-2xl font-extralight text-red-600 mb-4">Plan Not Found</h2>
          <p className="mb-6">We couldn't find the plan you're looking for. It may have been moved or removed.</p>
          <Button 
            onClick={() => {
              window.history.pushState({}, '', '/plans');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="bg-blue text-white hover:bg-blue/90"
          >
            View All Plans
          </Button>
        </div>
      </div>
    );
  };
  
  // Render appropriate page content based on currentPage
  const renderPageContent = () => {
    // If we're showing a specific plan detail page
    if (showPlanDetail) {
      return (
        <PlanErrorBoundary>
          {renderPlanComponent()}
        </PlanErrorBoundary>
      );
    }

    switch (currentPage) {
      case 'about':
        return <AboutPage onLoginClick={onLoginClick} onGetStartedClick={navigateToOnboarding} />;
      case 'contact':
        return <ContactPage onLoginClick={onLoginClick} onGetStartedClick={navigateToOnboarding} />;
      case 'features':
        return <FeaturesPage onLoginClick={onLoginClick} onGetStartedClick={navigateToOnboarding} />;
      case 'pricing':
        return <PricingPage onLoginClick={onLoginClick} onGetStartedClick={navigateToOnboarding} />;
      case 'resources':
        return <ResourcesPage onLoginClick={onLoginClick} onGetStartedClick={navigateToOnboarding} />;
      case 'enterprise':
        return <EnterprisePage onLoginClick={onLoginClick} onGetStartedClick={navigateToOnboarding} />;
      case 'plans':
        return (
          <div className="py-12">
            <MarketplacePublicPlans
              onPlanSelect={(planId) => {
                // Handle plan selection
                console.log("Selected plan from public website:", planId);
                window.history.pushState({}, '', `/plans/${planId}`);
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
            />
          </div>
        );
      default:
        return renderHomePage();
    }
  };
  
  // The home page content
  const renderHomePage = () => {
    return (
      <main>
        {/* Hero Section - Using base blue (#1175E4) color */}
        <HeroSection
          fullWidth={true}
          background="blue"
          alignment="left"
          className="py-16 md:py-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight mb-4">
                Healthy IT.<br /><span className="text-white">Happy Business.</span>
              </h1>
              <p className="text-white/80 mb-8 max-w-md">
                Break up with your underperforming IT provider. 
                IThealth delivers the reliable, proactive IT 
                service that South African professional firms deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-white text-blue hover:bg-white/90 rounded-[16px] rounded-tr-[0px] transition-all"
                  onClick={navigateToOnboarding}
                >
                  Get Started
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white border border-white/20 hover:bg-white/10 rounded-[16px] rounded-tr-[0px] transition-all"
                  onClick={() => {
                    // Give option to go directly to plan pages from hero
                    console.log("Navigating to plans page from hero");
                    
                    // Use history navigation for SPA-like experience
                    try {
                      window.history.pushState({}, '', '/plans');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    } catch (error) {
                      console.error("Error navigating to plans from hero:", error);
                      // Fallback to direct URL if history API fails
                      window.location.href = `${window.location.origin}/plans`;
                    }
                  }}
                >
                  View Plans <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center items-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="w-full h-full max-w-md mt-4 md:mt-0">
                <DashboardScreenshot className="aspect-[4/3] md:hover:-translate-y-2 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </HeroSection>
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                IT managed how it <span className="text-blue">should be</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                IThealth is a totally different approach to IT service — designed 
                specifically for professionals who value stability, clarity, and growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-primary text-xl font-light">1</span>
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Stability First</h3>
                  <p className="text-muted-foreground mb-0">
                    Reliable systems that just work, with proactive maintenance to prevent downtime before it happens.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-blue text-xl font-light">2</span>
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Clear Communication</h3>
                  <p className="text-muted-foreground mb-0">
                    No jargon, no runaround. Direct explanations and transparent pricing with no hidden costs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-blue text-xl font-light">3</span>
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Strategic Growth</h3>
                  <p className="text-muted-foreground mb-0">
                    IT that drives your business forward with productivity tools, automation, and data-driven insights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Plans Section */}
        <section id="plans" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                Plans designed for <span className="text-blue">South African</span> businesses
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Choose only what you need, scale as you grow, and always pay a predictable 
                monthly fee with no surprise costs.
              </p>
            </div>
            
            {/* Replacing the simplified plans section with the full marketplace plans */}
            <MarketplacePublicPlans 
              onPlanSelect={(planId) => {
                // Handle plan selection, navigate to the plan detail page
                console.log("Selected plan from public website:", planId);
                window.history.pushState({}, '', `/plans/${planId}`);
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
            />
            
            <div className="mt-8 text-center">
              <Button 
                className="rounded-[16px] rounded-tr-[0px] bg-blue hover:bg-blue/90"
                onClick={() => {
                  // Navigate to plans page directly
                  console.log("Navigating to plans page from button");
                  
                  // Use history API for SPA navigation
                  try {
                    window.history.pushState({}, '', '/plans');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  } catch (error) {
                    console.error("Error navigating to plans page from button:", error);
                    // Fallback to direct URL
                    window.location.href = `${window.location.origin}/plans`;
                  }
                }}
              >
                View All Plans <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                How <span className="text-blue">IThealth</span> works
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Our 4-phase approach transforms your IT from a cost center to a strategic asset.
              </p>
            </div>
            
            {/* Program Phases Visualization */}
            <div className="mb-16 overflow-hidden rounded-[16px] rounded-tr-[0px]">
              <div className="relative w-full h-[420px] mx-auto max-w-3xl">
                <Frame1 />
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <div className="p-4 bg-blue/5 rounded-[16px] rounded-tr-[0px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue rounded-full p-2 text-white">
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <h3 className="text-xl font-extralight">Operate</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      We stabilize your IT environment and take over the day-to-day management, 
                      ensuring everything just works without drama or downtime.
                    </p>
                    <ul className="space-y-2">
                      {['Helpdesk & end-user support', 'Network & infrastructure', 'Proactive monitoring', 'Backup & disaster recovery'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 text-blue flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-3 order-1 lg:order-2">
                  <div style={{ backgroundColor: '#1175E4' }} className="text-white p-6 rounded-[16px] rounded-tr-[0px]">
                    <h3 className="text-2xl font-extralight mb-3">The foundation</h3>
                    <p className="text-white/80 mb-0">
                      "If you're tired of IT that constantly breaks, doesn't respond when you need it, 
                      and keeps you in the dark, our Operate phase is your first step to IT sanity."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                <div className="lg:col-span-3 order-1">
                  <div className="bg-navy text-white p-6 rounded-[16px] rounded-tr-[0px]">
                    <h3 className="text-2xl font-extralight mb-3">The protection</h3>
                    <p className="text-white/80 mb-0">
                      "In a world where the average South African business faces 6-7 cyber attacks daily, 
                      our Secure phase creates a fortress around your business data and reputation."
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-2 order-2">
                  <div className="p-4 bg-navy/5 rounded-[16px] rounded-tr-[0px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-navy rounded-full p-2 text-white">
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <h3 className="text-xl font-extralight">Secure</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      We protect your systems, data, and reputation with multi-layered security that keeps 
                      threats out while allowing your business to operate freely.
                    </p>
                    <ul className="space-y-2">
                      {['Endpoint protection', 'Email security & anti-phishing', 'Data encryption', 'Security awareness training'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 text-navy flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <div className="p-4 bg-primary/5 rounded-[16px] rounded-tr-[0px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary rounded-full p-2 text-white">
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <h3 className="text-xl font-extralight">Streamline</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      We optimize your workflows and implement tools that reduce manual effort, 
                      eliminate bottlenecks, and make information accessible when and where you need it.
                    </p>
                    <ul className="space-y-2">
                      {['Process automation', 'Document management', 'Collaboration tools', 'Workflow optimization'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-3 order-1 lg:order-2">
                  <div className="bg-primary text-white p-6 rounded-[16px] rounded-tr-[0px]">
                    <h3 className="text-2xl font-extralight mb-3">The efficiency</h3>
                    <p className="text-white/80 mb-0">
                      "When your team spends hours on tasks that should take minutes, our Streamline phase 
                      removes the friction and gives your people back their time to focus on what matters."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                <div className="lg:col-span-3 order-1">
                  <div className="bg-blue text-white p-6 rounded-[16px] rounded-tr-[0px]">
                    <h3 className="text-2xl font-extralight mb-3">The transformation</h3>
                    <p className="text-white/80 mb-0">
                      "This is where IT becomes your strategic advantage. Our Accelerate phase creates 
                      digital solutions that give you an edge over competitors still doing things the old way."
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-2 order-2">
                  <div className="p-4 bg-blue/5 rounded-[16px] rounded-tr-[0px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue rounded-full p-2 text-white">
                        <span className="text-sm font-medium">4</span>
                      </div>
                      <h3 className="text-xl font-extralight">Accelerate</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      We help you leverage technology for true business growth with custom digital solutions 
                      that create competitive advantages and new opportunities.
                    </p>
                    <ul className="space-y-2">
                      {['Business intelligence', 'Customer experience platforms', 'Custom application development', 'AI & automation solutions'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 text-blue flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <Button 
                className="rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={() => handlePageNavigation('features')}
              >
                Learn More About Our Features <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                What our <span className="text-blue">clients say</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Don't just take our word for it. Here's what South African businesses think 
                about their switch to IThealth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="rounded-[16px] rounded-tr-[0px] transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="#1175E4" 
                        stroke="none"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic">
                    "After years of IT headaches with our previous provider, the switch to IThealth has 
                    been truly transformational. They understand our law practice and have implemented 
                    systems that make document management effortless."
                  </p>
                  <div>
                    <p className="text-sm font-medium">Thabo Molefe</p>
                    <p className="text-xs text-muted-foreground">Managing Partner, Molefe Legal Partners</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="#1175E4" 
                        stroke="none"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic">
                    "The security improvements alone were worth the switch. With POPIA compliance 
                    being so crucial for our accounting firm, IThealth's secure systems give us 
                    peace of mind that our clients' financial data is protected."
                  </p>
                  <div>
                    <p className="text-sm font-medium">Sarah van der Merwe</p>
                    <p className="text-xs text-muted-foreground">Director, SVP Accounting Solutions</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="#1175E4" 
                        stroke="none"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic">
                    "As an architectural firm, we work with large CAD files and 3D models. 
                    IThealth created a custom solution that handles our storage and collaboration 
                    needs perfectly, even during load shedding with their backup power solutions."
                  </p>
                  <div>
                    <p className="text-sm font-medium">Lerato Khumalo</p>
                    <p className="text-xs text-muted-foreground">Principal, Khumalo Architects</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section - Using base blue (#1175E4) color for consistency */}
        <HeroSection
          fullWidth={true}
          background="blue"
          alignment="left"
          className="py-16 md:py-24"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-extralight mb-4">
              Ready for IT that <span className="text-white">actually works</span>?
            </h2>
            <p className="text-white/80 max-w-2xl mb-8">
              Join the growing community of South African professional firms 
              who've upgraded to IThealth's managed IT services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-white text-blue hover:bg-white/90 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={navigateToOnboarding}
              >
                Get Started
              </Button>
              <Button 
                variant="ghost" 
                className="text-white border border-white/20 hover:bg-white/10 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={navigateToAssessment}
              >
                Take IT Assessment
              </Button>
            </div>
          </div>
        </HeroSection>
      </main>
    );
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header - Using exact hex color #1175E4 */}
      <header style={{ backgroundColor: '#1175E4' }} className="w-full px-4 py-4 m-0">
        <div className="container mx-auto px-0 public-container">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-end">
              <WhiteLogoWrapper>
                <Group46 />
              </WhiteLogoWrapper>
            </a>
            
            <div className="hidden md:flex items-center gap-6">
              <NavLink 
                href="/" 
                active={currentPage === 'home'}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageNavigation('home');
                }}
              >
                Home
              </NavLink>
              
              <MegaMenu />
              
              <NavLink 
                href="/features" 
                active={currentPage === 'features'}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageNavigation('features');
                }}
              >
                Features
              </NavLink>
              <NavLink 
                href="/enterprise" 
                active={currentPage === 'enterprise'}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageNavigation('enterprise');
                }}
              >
                Enterprise
              </NavLink>
              
              <Button 
                variant="link" 
                className="text-white font-light p-0 hover:text-white/90"
                onClick={onLoginClick}
              >
                Login
              </Button>
              
              <Button 
                className="bg-white text-blue hover:bg-white/90 rounded-[16px] rounded-tr-[0px]"
                onClick={navigateToOnboarding}
              >
                Get Started
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLoginClick={onLoginClick}
        onGetStartedClick={navigateToOnboarding}
        currentPage={currentPage}
        isShowingPlanDetail={showPlanDetail}
      />
      
      {renderPageContent()}
      
      {/* Footer */}
      <footer className="bg-navy text-white py-12">
        <div className="container mx-auto px-4 md:px-6 public-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <WhiteLogoWrapper className="mb-4">
                <Group46 />
              </WhiteLogoWrapper>
              <p className="text-white/70 text-sm">
                Modern IT services for South African businesses who demand more 
                from their technology partners.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-extralight mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-sm text-white/70 hover:text-white transition-colors">About</a></li>
                <li><a href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact</a></li>
                <li><a href="/careers" className="text-sm text-white/70 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/clients" className="text-sm text-white/70 hover:text-white transition-colors">Clients</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-extralight mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="/plans" className="text-sm text-white/70 hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="/features" className="text-sm text-white/70 hover:text-white transition-colors">Features</a></li>
                <li><a href="/enterprise" className="text-sm text-white/70 hover:text-white transition-colors">Enterprise IT</a></li>
                <li><a href="/pricing" className="text-sm text-white/70 hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-extralight mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/resources" className="text-sm text-white/70 hover:text-white transition-colors">Resource Center</a></li>
                <li><a href="/blog" className="text-sm text-white/70 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/guides" className="text-sm text-white/70 hover:text-white transition-colors">Guides</a></li>
                <li><a href="/help" className="text-sm text-white/70 hover:text-white transition-colors">Help & Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-white/50">
              &copy; {new Date().getFullYear()} IThealth. All rights reserved.
            </p>
            
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="/terms" className="text-xs text-white/50 hover:text-white transition-colors">Terms of Service</a>
              <a href="/privacy" className="text-xs text-white/50 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/cookies" className="text-xs text-white/50 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
