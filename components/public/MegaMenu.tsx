
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Server, ShieldCheck, Clock, Rocket, LucideIcon, Star, BookOpen, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// Navigation link component now exported for use in public website
export function NavLink({ href, active, children, className, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`text-white/90 hover:text-white font-light relative text-sm transition-all ${
        active ? 'text-white' : ''
      } ${className || ''}`}
      onClick={onClick}
    >
      {children}
      {active && (
        <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white/90 rounded-full" />
      )}
    </a>
  );
}

// Full megamenu component
export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Toggle menu state
  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // Helper function to handle plan navigation
  const handlePlanNavigation = (planPath: string) => {
    // Close the menu first
    setActiveMenu(null);
    
    // Extract the plan slug from the path
    if (planPath.startsWith('/plans/') && planPath !== '/plans/' && planPath !== '/plans/compare') {
      const planSlug = planPath.replace('/plans/', '');
      console.log(`Navigating to plan: ${planSlug} via ${planPath}`);
      
      try {
        // Use history API for navigation and trigger a popstate event
        window.history.pushState({}, '', planPath);
        // Manual dispatch of popstate to trigger route handling
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch (error) {
        console.error(`Error navigating to plan ${planSlug}:`, error);
        // Fallback to direct location change if needed
        window.location.href = planPath;
      }
    } else {
      // For non-plan pages, use normal location change
      window.history.pushState({}, '', planPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Navigation items and menu triggers */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <button
            onClick={() => toggleMenu('how-it-works')}
            className="text-white/90 hover:text-white font-light flex items-center gap-1 text-sm transition-all"
          >
            How it works
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeMenu === 'how-it-works' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => toggleMenu('plans')}
            className="text-white/90 hover:text-white font-light flex items-center gap-1 text-sm transition-all"
          >
            Plans
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeMenu === 'plans' ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <div className="relative">
          <button
            onClick={() => toggleMenu('resources')}
            className="text-white/90 hover:text-white font-light flex items-center gap-1 text-sm transition-all"
          >
            Resources
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeMenu === 'resources' ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mega menu overlay */}
      {activeMenu && (
        <div className="fixed inset-0 bg-black/20 z-40 mega-menu-overlay" onClick={() => setActiveMenu(null)} />
      )}

      {/* Mega menu content */}
      {activeMenu && (
        <div
          className="fixed left-0 right-0 bg-white shadow-lg z-50 mega-menu-enter mega-menu"
          style={{
            top: document.querySelector('header')?.getBoundingClientRect().bottom + 'px' || '64px',
          }}
        >
          <div className="w-full mx-auto">
            <div className="container max-w-7xl mx-auto p-6 public-container">
              {activeMenu === 'how-it-works' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* About IThealth Program Section */}
                  <div className="md:col-span-3 mb-6 animate-fade-in" style={{ animationDelay: '50ms' }}>
                    <Card className="p-6 border border-muted/80 ithealth-card bg-muted/5">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-2/3">
                          <h3 className="text-navy font-extralight text-2xl mb-4">About The IThealth Program</h3>
                          <p className="text-muted-foreground mb-4">
                            The IThealth Program is a comprehensive approach to IT transformation that helps businesses evolve 
                            through four strategic phases: Operate, Secure, Streamline, and Accelerate. Each phase builds upon the 
                            previous one, creating a structured path to IT excellence and business growth.
                          </p>
                          <p className="text-muted-foreground">
                            Our methodology begins with an assessment to understand your current IT maturity, followed by a 
                            tailored plan that aligns with your business objectives and budget. As you progress through 
                            each phase, you'll see measurable improvements in efficiency, security, and business outcomes.
                          </p>
                        </div>
                        <div className="lg:w-1/3 flex flex-col justify-center">
                          <Button 
                            className="bg-blue hover:bg-blue/90 text-white ithealth-button self-start transition-all"
                            onClick={() => {
                              setActiveMenu(null);
                              window.history.pushState({}, '', '/assessment');
                              window.dispatchEvent(new PopStateEvent('popstate'));
                            }}
                          >
                            Take the Free Assessment <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-navy font-extralight text-xl mb-4">The IThealth Program</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Operate",
                          description: "Basic IT infrastructure and management solutions",
                          href: "#operate",
                          icon: <Server className="h-5 w-5 text-blue" />
                        },
                        {
                          title: "Secure",
                          description: "Comprehensive security and protection solutions",
                          href: "#secure",
                          icon: <ShieldCheck className="h-5 w-5 text-navy" />
                        },
                        {
                          title: "Streamline",
                          description: "Process optimization and efficiency improvements",
                          href: "#streamline",
                          icon: <Clock className="h-5 w-5 text-primary" />
                        },
                        {
                          title: "Accelerate",
                          description: "Digital transformation and business acceleration",
                          href: "#accelerate",
                          icon: <Rocket className="h-5 w-5 text-blue" />
                        }
                      ].map((item, itemIdx) => (
                        <a 
                          key={itemIdx}
                          href={item.href} 
                          className="flex flex-col p-4 rounded-[16px] rounded-tr-[0px] border border-muted hover:border-blue/30 transition-colors mega-menu-item"
                          style={{ '--item-index': itemIdx } as React.CSSProperties}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveMenu(null);
                            const element = document.getElementById(item.href.replace('#', ''));
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              window.location.href = '/' + item.href;
                            }
                          }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            {item.icon}
                            <h4 className="font-light text-lg">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-navy font-extralight text-xl mb-4">Resources</h3>
                    <ul className="space-y-4">
                      {[
                        {
                          title: "IT Health Program Overview",
                          description: "Understand the complete program journey",
                          href: "/features",
                          badge: "New",
                          badgeColor: "bg-primary"
                        },
                        {
                          title: "Assessment Tool",
                          description: "Determine your current phase",
                          href: "/assessment"
                        },
                        {
                          title: "Success Stories",
                          description: "Real success stories from our clients",
                          href: "/resources#case-studies"
                        }
                      ].map((item, itemIdx) => (
                        <li 
                          key={itemIdx}
                          className="mega-menu-item"
                          style={{ '--item-index': itemIdx + 4 } as React.CSSProperties}
                        >
                          <a 
                            href={item.href} 
                            className="flex items-start gap-3 p-2 rounded-md hover:bg-muted transition-colors group"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveMenu(null);
                              handlePlanNavigation(item.href);
                            }}
                          >
                            <div>
                              <div className="flex items-center">
                                <span className="font-light text-sm group-hover:text-blue transition-colors">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <Badge className={`ml-2 ${item.badgeColor || "bg-muted"} text-[10px]`}>
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t animate-fade-in" style={{ animationDelay: '250ms' }}>
                      <Button 
                        className="w-full justify-between bg-blue text-white hover:bg-blue/90 rounded-[16px] rounded-tr-[0px] transition-all"
                        size="sm"
                        onClick={() => {
                          setActiveMenu(null);
                          window.history.pushState({}, '', '/get-started');
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        }}
                      >
                        <span>Learn More About IThealth</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeMenu === 'plans' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-navy font-extralight text-xl mb-4">Popular Plans</h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: "User Health Plan",
                          description: "Essential workstation management for staff productivity",
                          href: "/plans/user-health-plan",
                          badge: "Popular",
                          badgeColor: "bg-blue"
                        },
                        {
                          title: "ITsafe User Plan",
                          description: "Enhanced security for individual user devices",
                          href: "/plans/itsafe-user-plan",
                          badge: "Recommended",
                          badgeColor: "bg-blue"
                        },
                        {
                          title: "Business Standard Plan",
                          description: "Complete productivity and collaboration solution",
                          href: "/plans/business-standard-plan",
                          badge: "Best Value",
                          badgeColor: "bg-primary"
                        }
                      ].map((item, itemIdx) => (
                        <a 
                          key={itemIdx}
                          href={item.href} 
                          className="block p-4 rounded-[16px] rounded-tr-[0px] border border-muted hover:border-blue/30 transition-colors mega-menu-item"
                          style={{ '--item-index': itemIdx } as React.CSSProperties}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveMenu(null);
                            handlePlanNavigation(item.href);
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-light text-base">
                                {item.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.description}
                              </p>
                            </div>
                            {item.badge && (
                              <Badge className={`${item.badgeColor || "bg-muted"}`}>
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="mt-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                      <Button 
                        variant="ghost" 
                        className="text-blue hover:text-blue/80 transition-colors"
                        size="sm"
                        onClick={() => {
                          setActiveMenu(null);
                          handlePlanNavigation('/pricing');
                        }}
                      >
                        View Pricing <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-navy font-extralight text-xl mb-4">Plan Categories</h3>
                    <ul className="space-y-4">
                      {[
                        {
                          title: "Operate Plans",
                          description: "Basic IT infrastructure and management",
                          href: "/plans#operate-plans",
                          icon: <Server className="h-4 w-4 text-blue" />
                        },
                        {
                          title: "Secure Plans",
                          description: "Security and protection solutions",
                          href: "/plans#secure-plans",
                          icon: <ShieldCheck className="h-4 w-4 text-navy" />
                        },
                        {
                          title: "Streamline Plans",
                          description: "Process optimization and efficiency",
                          href: "/plans#streamline-plans",
                          icon: <Clock className="h-4 w-4 text-primary" />
                        },
                        {
                          title: "Accelerate Plans",
                          description: "Digital transformation and acceleration",
                          href: "/plans#accelerate-plans",
                          icon: <Rocket className="h-4 w-4 text-blue" />
                        }
                      ].map((item, itemIdx) => (
                        <li 
                          key={itemIdx}
                          className="mega-menu-item"
                          style={{ '--item-index': itemIdx + 3 } as React.CSSProperties}
                        >
                          <a 
                            href={item.href} 
                            className="flex items-start gap-3 p-2 rounded-md hover:bg-muted transition-colors group"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveMenu(null);
                              handlePlanNavigation(item.href);
                            }}
                          >
                            {item.icon && (
                              <div className="mt-0.5">{item.icon}</div>
                            )}
                            <div>
                              <div className="flex items-center">
                                <span className="font-light text-sm group-hover:text-blue transition-colors">
                                  {item.title}
                                </span>
                              </div>
                              {item.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t animate-fade-in" style={{ animationDelay: '250ms' }}>
                      <a 
                        href="/plans/compare" 
                        className="text-xs text-blue flex items-center font-light hover:underline transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveMenu(null);
                          handlePlanNavigation('/plans/compare');
                        }}
                      >
                        <Star className="h-3 w-3 mr-1" />
                        Compare all plans features
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-navy font-extralight text-xl mb-4">All Plans</h3>
                    <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2">
                      {[
                        { title: "User Health Plan", href: "/plans/user-health-plan" },
                        { title: "Office Health Plan", href: "/plans/office-health-plan" },
                        { title: "Communication Plan", href: "/plans/communication-plan" },
                        { title: "ITsafe User Plan", href: "/plans/itsafe-user-plan" },
                        { title: "ITsafe Server Plan", href: "/plans/itsafe-server-plan" },
                        { title: "Mail Plan", href: "/plans/mail-plan" },
                        { title: "Business Basic Plan", href: "/plans/business-basic-plan" },
                        { title: "Business Standard Plan", href: "/plans/business-standard-plan" },
                        { title: "SharePoint Plan", href: "/plans/sharepoint-plan" },
                        { title: "Reporting Plan", href: "/plans/reporting-plan" },
                        { title: "Workflow Optimization Plan", href: "/plans/workflow-optimization-plan" },
                        { title: "Digital Customer Plan", href: "/plans/digital-customer-plan" },
                        { title: "AI Connect Plan", href: "/plans/ai-connect-plan" }
                      ].map((item, itemIdx) => (
                        <li 
                          key={itemIdx}
                          className="mega-menu-item"
                          style={{ '--item-index': itemIdx + 7 } as React.CSSProperties}
                        >
                          <a 
                            href={item.href} 
                            className="flex items-center p-1 rounded-md hover:bg-muted transition-colors group"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveMenu(null);
                              handlePlanNavigation(item.href);
                            }}
                          >
                            <span className="font-light text-xs group-hover:text-blue transition-colors">
                              {item.title}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t animate-fade-in" style={{ animationDelay: '300ms' }}>
                      <Button 
                        className="w-full justify-between bg-blue text-white hover:bg-blue/90 rounded-[16px] rounded-tr-[0px] transition-all"
                        size="sm"
                        onClick={() => {
                          setActiveMenu(null);
                          handlePlanNavigation('/plans');
                        }}
                      >
                        <span>Browse All Plans</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeMenu === 'resources' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-navy font-extralight text-xl mb-4">Learning Resources</h3>
                    <ul className="space-y-4">
                      {[
                        {
                          title: "Blog",
                          description: "Articles, guides and industry insights",
                          href: "/resources#blog",
                          icon: <BookOpen className="h-4 w-4" />
                        },
                        {
                          title: "Whitepapers",
                          description: "In-depth research and technical guides",
                          href: "/resources#whitepapers",
                          badge: "New",
                          badgeColor: "bg-primary"
                        },
                        {
                          title: "Case Studies",
                          description: "Real-world client success stories",
                          href: "/resources#case-studies"
                        },
                        {
                          title: "Webinars",
                          description: "Live and recorded training sessions",
                          href: "/resources#webinars"
                        }
                      ].map((item, itemIdx) => (
                        <li 
                          key={itemIdx}
                          className="mega-menu-item"
                          style={{ '--item-index': itemIdx } as React.CSSProperties}
                        >
                          <a 
                            href={item.href} 
                            className="flex items-start gap-3 p-2 rounded-md hover:bg-muted transition-colors group"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveMenu(null);
                              handlePlanNavigation(item.href);
                            }}
                          >
                            {item.icon && (
                              <div className="mt-0.5 text-blue">{item.icon}</div>
                            )}
                            <div>
                              <div className="flex items-center">
                                <span className="font-light text-sm group-hover:text-blue transition-colors">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <Badge className={`ml-2 ${item.badgeColor || "bg-muted"} text-[10px]`}>
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-navy font-extralight text-xl mb-4">Company</h3>
                    <ul className="space-y-4">
                      {[
                        {
                          title: "About Us",
                          description: "Learn more about our company and mission",
                          href: "/about"
                        },
                        {
                          title: "Contact Us",
                          description: "Get in touch with our team",
                          href: "/contact"
                        },
                        {
                          title: "IT Health Assessment",
                          description: "Free assessment to evaluate your IT systems",
                          href: "/assessment",
                          badge: "Free",
                          badgeColor: "bg-blue"
                        },
                        {
                          title: "Help Center",
                          description: "Support documentation and guides",
                          href: "/resources#help-center"
                        }
                      ].map((item, itemIdx) => (
                        <li 
                          key={itemIdx}
                          className="mega-menu-item"
                          style={{ '--item-index': itemIdx + 4 } as React.CSSProperties}
                        >
                          <a 
                            href={item.href} 
                            className="flex items-start gap-3 p-2 rounded-md hover:bg-muted transition-colors group"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveMenu(null);
                              handlePlanNavigation(item.href);
                            }}
                          >
                            <div>
                              <div className="flex items-center">
                                <span className="font-light text-sm group-hover:text-blue transition-colors">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <Badge className={`ml-2 ${item.badgeColor || "bg-muted"} text-[10px]`}>
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
