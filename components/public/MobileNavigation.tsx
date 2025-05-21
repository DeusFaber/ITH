
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Server,
  ShieldCheck,
  Clock,
  Rocket
} from 'lucide-react';
import { Badge } from '../ui/badge';
import Group46 from '../../imports/Group46';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onGetStartedClick: () => void;
  currentPage?: string;
  isShowingPlanDetail?: boolean;
}

export function MobileNavigation({ 
  isOpen, 
  onClose, 
  onLoginClick, 
  onGetStartedClick, 
  currentPage = 'home',
  isShowingPlanDetail = false
}: MobileNavigationProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle navigation to other pages
  const handleNavigation = (page: string) => {
    window.history.pushState({}, '', `/${page}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    onClose();
  };

  // Set active submenu based on current page when menu opens
  useEffect(() => {
    if (isOpen) {
      if (currentPage === 'features') {
        setActiveSubmenu(null);
      } else if (currentPage === 'plans' || isShowingPlanDetail) {
        setActiveSubmenu('plans');
      } else if (currentPage === 'resources') {
        setActiveSubmenu('resources');
      } else if (currentPage === 'about' || currentPage === 'contact') {
        setActiveSubmenu('resources');
      }
    }
  }, [isOpen, currentPage, isShowingPlanDetail]);

  // Handle animation states when menu opens or closes
  useEffect(() => {
    if (isOpen) {
      // Set body to prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
      // Add animation after small delay to ensure elements are in DOM
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      document.body.style.overflow = '';
      setIsAnimating(false);
    }
  }, [isOpen]);

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-blue z-50 overflow-y-auto transition-opacity duration-normal ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto px-0">
        <div className="flex justify-between items-center p-4">
          {/* Updated to use Group46 logo */}
          <div className="h-auto w-auto">
            <Group46 />
          </div>
          <button
            onClick={onClose}
            className="text-white"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-6 px-4">
          {/* Home link */}
          <div 
            className={`border-b border-white/10 pb-4 transition-all duration-normal ${
              isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '25ms' }}
          >
            <a 
              href="/" 
              className={`block text-white text-lg font-extralight py-2 transition-colors ${
                currentPage === 'home' ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('');
              }}
            >
              Home
            </a>
          </div>

          {/* How it works (formerly Program Phases) */}
          <div 
            className={`border-b border-white/10 pb-4 transition-all duration-normal ${
              isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '50ms' }}
          >
            <button
              onClick={() => toggleSubmenu('how-it-works')}
              className="flex items-center justify-between w-full text-white text-lg font-extralight py-2"
            >
              <span>How it works</span>
              {activeSubmenu === 'how-it-works' ? (
                <ChevronDown className="h-5 w-5 transition-transform duration-normal" />
              ) : (
                <ChevronRight className="h-5 w-5 transition-transform duration-normal" />
              )}
            </button>

            {activeSubmenu === 'how-it-works' && (
              <div className="mt-4 pl-4 space-y-4 animate-fade-in">
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <p className="text-white/90 text-sm mb-2">
                    The IThealth Program is a comprehensive approach to IT transformation through four strategic phases:
                  </p>
                </div>
                <a href="/#operate" className="flex items-center text-white/80 hover:text-white text-sm py-2 transition-colors"
                   onClick={(e) => {
                     e.preventDefault();
                     onClose();
                     window.history.pushState({}, '', '/#operate');
                     window.dispatchEvent(new PopStateEvent('popstate'));
                     setTimeout(() => {
                       const element = document.getElementById('operate');
                       if (element) element.scrollIntoView({ behavior: 'smooth' });
                     }, 100);
                   }}>
                  <Server className="h-4 w-4 text-blue mr-2" />
                  Operate
                </a>
                <a href="/#secure" className="flex items-center text-white/80 hover:text-white text-sm py-2 transition-colors"
                   onClick={(e) => {
                     e.preventDefault();
                     onClose();
                     window.history.pushState({}, '', '/#secure');
                     window.dispatchEvent(new PopStateEvent('popstate'));
                     setTimeout(() => {
                       const element = document.getElementById('secure');
                       if (element) element.scrollIntoView({ behavior: 'smooth' });
                     }, 100);
                   }}>
                  <ShieldCheck className="h-4 w-4 text-navy mr-2" />
                  Secure
                </a>
                <a href="/#streamline" className="flex items-center text-white/80 hover:text-white text-sm py-2 transition-colors"
                   onClick={(e) => {
                     e.preventDefault();
                     onClose();
                     window.history.pushState({}, '', '/#streamline');
                     window.dispatchEvent(new PopStateEvent('popstate'));
                     setTimeout(() => {
                       const element = document.getElementById('streamline');
                       if (element) element.scrollIntoView({ behavior: 'smooth' });
                     }, 100);
                   }}>
                  <Clock className="h-4 w-4 text-primary mr-2" />
                  Streamline
                </a>
                <a href="/#accelerate" className="flex items-center text-white/80 hover:text-white text-sm py-2 transition-colors"
                   onClick={(e) => {
                     e.preventDefault();
                     onClose();
                     window.history.pushState({}, '', '/#accelerate');
                     window.dispatchEvent(new PopStateEvent('popstate'));
                     setTimeout(() => {
                       const element = document.getElementById('accelerate');
                       if (element) element.scrollIntoView({ behavior: 'smooth' });
                     }, 100);
                   }}>
                  <Rocket className="h-4 w-4 text-blue mr-2" />
                  Accelerate
                </a>
                <div className="pt-2 border-t border-white/10">
                  <h4 className="text-white/60 text-xs mb-2">Resources</h4>
                  <a href="/features" className="block text-white/80 hover:text-white text-sm py-2 flex items-center transition-colors"
                     onClick={(e) => {
                       e.preventDefault();
                       handleNavigation('features');
                     }}>
                    IT Health Program Overview
                    <Badge className="ml-2 bg-primary text-[10px]">New</Badge>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Plans */}
          <div 
            className={`border-b border-white/10 pb-4 transition-all duration-normal ${
              isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <button
              onClick={() => toggleSubmenu('plans')}
              className={`flex items-center justify-between w-full text-lg font-extralight py-2 ${
                currentPage === 'plans' || isShowingPlanDetail ? 'text-white' : 'text-white hover:text-white'
              }`}
            >
              <span>Plans</span>
              {activeSubmenu === 'plans' ? (
                <ChevronDown className="h-5 w-5 transition-transform duration-normal" />
              ) : (
                <ChevronRight className="h-5 w-5 transition-transform duration-normal" />
              )}
            </button>

            {activeSubmenu === 'plans' && (
              <div className="mt-4 pl-4 space-y-4 animate-fade-in">
                <h4 className="text-white/60 text-xs mb-2">Popular Plans</h4>
                <a 
                  href="/plans/user-health-plan" 
                  className="block text-white/80 hover:text-white text-sm py-2 flex items-center transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // Close the menu and then navigate
                    onClose();
                    console.log("Mobile navigation to User Health Plan");
                    
                    // Use history navigation for SPA-like experience
                    try {
                      window.history.pushState({}, '', '/plans/user-health-plan');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    } catch (error) {
                      console.error("Error navigating to User Health Plan:", error);
                      // Fallback to direct location change if history API fails
                      window.location.href = '/plans/user-health-plan';
                    }
                  }}
                >
                  User Health Plan
                  <Badge className="ml-2 bg-blue text-[10px]">Popular</Badge>
                </a>
                <a 
                  href="/plans/itsafe-user-plan" 
                  className="block text-white/80 hover:text-white text-sm py-2 flex items-center transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    console.log("Mobile navigation to ITsafe User Plan");
                    
                    // Use history navigation 
                    try {
                      window.history.pushState({}, '', '/plans/itsafe-user-plan');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    } catch (error) {
                      console.error("Error navigating to ITsafe User Plan:", error);
                      window.location.href = '/plans/itsafe-user-plan';
                    }
                  }}
                >
                  ITsafe User Plan
                  <Badge className="ml-2 bg-blue text-[10px]">Recommended</Badge>
                </a>
                <a 
                  href="/plans/business-standard-plan" 
                  className="block text-white/80 hover:text-white text-sm py-2 flex items-center transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    console.log("Mobile navigation to Business Standard Plan");
                    
                    // Use history navigation 
                    try {
                      window.history.pushState({}, '', '/plans/business-standard-plan');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    } catch (error) {
                      console.error("Error navigating to Business Standard Plan:", error);
                      window.location.href = '/plans/business-standard-plan';
                    }
                  }}
                >
                  Business Standard Plan
                  <Badge className="ml-2 bg-primary text-[10px]">Best Value</Badge>
                </a>
                
                <div className="pt-2 border-t border-white/10">
                  <h4 className="text-white/60 text-xs mb-2">Plan Categories</h4>
                  <a 
                    href="/plans" 
                    className="block text-white/80 hover:text-white text-sm py-2 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      // Navigate to plans page
                      window.history.pushState({}, '', '/plans');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                  >
                    All Plans
                  </a>
                  <a 
                    href="/plans" 
                    className="block text-white/80 hover:text-white text-sm py-2 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      window.history.pushState({}, '', '/plans');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                  >
                    Operate Plans
                  </a>
                  <a 
                    href="/plans" 
                    className="block text-white/80 hover:text-white text-sm py-2 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      window.history.pushState({}, '', '/plans');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                  >
                    Secure Plans
                  </a>
                  <a 
                    href="/plans" 
                    className="block text-white/80 hover:text-white text-sm py-2 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      window.history.pushState({}, '', '/plans');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                  >
                    Streamline Plans
                  </a>
                  <a 
                    href="/plans" 
                    className="block text-white/80 hover:text-white text-sm py-2 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      window.history.pushState({}, '', '/plans');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                  >
                    Accelerate Plans
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Resources */}
          <div 
            className={`border-b border-white/10 pb-4 transition-all duration-normal ${
              isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <button
              onClick={() => toggleSubmenu('resources')}
              className={`flex items-center justify-between w-full text-lg font-extralight py-2 ${
                currentPage === 'resources' ? 'text-white' : 'text-white hover:text-white'
              }`}
            >
              <span>Resources</span>
              {activeSubmenu === 'resources' ? (
                <ChevronDown className="h-5 w-5 transition-transform duration-normal" />
              ) : (
                <ChevronRight className="h-5 w-5 transition-transform duration-normal" />
              )}
            </button>

            {activeSubmenu === 'resources' && (
              <div className="mt-4 pl-4 space-y-4 animate-fade-in">
                <a href="/resources" className="block text-white/80 hover:text-white text-sm py-2 transition-colors"
                   onClick={(e) => {
                     e.preventDefault();
                     handleNavigation('resources');
                   }}>
                  Resources Hub
                </a>
                <a href="/resources#blog" className="block text-white/80 hover:text-white text-sm py-2 transition-colors"
                   onClick={(e) => {
                     e.preventDefault();
                     handleNavigation('resources');
                   }}>
                  Blog
                </a>
                <a href="/resources#whitepapers" className="block text-white/80 hover:text-white text-sm py-2 flex items-center transition-colors"
                   onClick={(e) => {
                     e.preventDefault();
                     handleNavigation('resources');
                   }}>
                  Whitepapers
                  <Badge className="ml-2 bg-primary text-[10px]">New</Badge>
                </a>
                <a href="/resources#case-studies" className="block text-white/80 hover:text-white text-sm py-2 transition-colors"
                   onClick={(e) => {
                     e.preventDefault();
                     handleNavigation('resources');
                   }}>
                  Case Studies
                </a>
                <a href="/resources#webinars" className="block text-white/80 hover:text-white text-sm py-2 transition-colors"
                   onClick={(e) => {
                     e.preventDefault();
                     handleNavigation('resources');
                   }}>
                  Webinars
                </a>
                <a 
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('about');
                  }}
                  className={`block text-sm py-2 transition-colors ${
                    currentPage === 'about' ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  About Us
                </a>
                <a 
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('contact');
                  }}
                  className={`block text-sm py-2 transition-colors ${
                    currentPage === 'contact' ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  Contact Us
                </a>
                <a 
                  href="/assessment" 
                  className="block text-white/80 hover:text-white text-sm py-2 flex items-center transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    // Navigate to assessment
                    window.history.pushState({}, '', '/assessment');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                >
                  IT Health Assessment
                  <Badge className="ml-2 bg-blue text-[10px]">Free</Badge>
                </a>
              </div>
            )}
          </div>
          
          {/* Features */}
          <div 
            className={`border-b border-white/10 pb-4 transition-all duration-normal ${
              isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <a 
              href="/features" 
              className={`block text-lg font-extralight py-2 transition-colors ${
                currentPage === 'features' ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('features');
              }}
            >
              Features
            </a>
          </div>
          
          {/* Enterprise */}
          <div 
            className={`border-b border-white/10 pb-4 transition-all duration-normal ${
              isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            <a 
              href="/enterprise" 
              className={`block text-lg font-extralight py-2 transition-colors ${
                currentPage === 'enterprise' ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('enterprise');
              }}
            >
              Enterprise
            </a>
          </div>
        </nav>

        <div 
          className={`mt-8 space-y-4 transition-all duration-normal px-4 ${
            isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Using a simple text link for login */}
          <a 
            href="/login" 
            className="block text-white py-2 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              onLoginClick();
            }}
          >
            Log in
          </a>
          <Button 
            className="w-full bg-white text-blue hover:bg-white/90 rounded-[16px] rounded-tr-[0px] transition-all"
            onClick={() => {
              onClose();
              onGetStartedClick();
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
