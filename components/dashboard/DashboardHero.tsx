
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { HeroSection } from "../ui/HeroSection";
import { 
  Rocket, 
  Users, 
  ChevronRight, 
  Sparkles, 
  X, 
  Shield, 
  Zap,
  ExternalLink,
  Coins
} from "lucide-react";

export function DashboardHero() {
  // Function to navigate to IT Program page
  const navigateToProgram = () => {
    const button = document.createElement('button');
    button.setAttribute('data-page-id', 'itprogram');
    document.body.appendChild(button);
    button.click();
    document.body.removeChild(button);
  };

  // Function to navigate to Resources (Skills) page
  const navigateToSkills = () => {
    const button = document.createElement('button');
    button.setAttribute('data-page-id', 'resources');
    document.body.appendChild(button);
    button.click();
    document.body.removeChild(button);
  };

  // Function to close/hide the hero component
  const handleClose = () => {
    // Get the hero element and hide it
    const heroElement = document.getElementById('dashboard-hero');
    if (heroElement) {
      heroElement.style.display = 'none';
    }
  };

  return (
    <div 
      id="dashboard-hero" 
      className="overflow-hidden relative"
    >
      <HeroSection
        background="hero-bg"
        className="relative"
      >
        {/* Close button in top right */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full p-1.5 text-navy transition-colors"
          aria-label="Close hero banner"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left content section - takes up more space */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-navy text-white py-1 px-3">
                  <Zap className="h-3.5 w-3.5 mr-1" />
                  Business Accelerator
                </Badge>
                <Badge className="bg-white/20 text-white py-1 px-3">
                  IT Management
                </Badge>
              </div>
              
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-extralight leading-tight text-left-override">
                Transform your IT into a <span className="text-white/90 font-light">business accelerator</span>
              </h2>
              
              <p className="text-white/80 text-xs">
                IThealth helps you leverage IT as a strategic advantage through comprehensive planning, 
                efficient operations, proactive security, and innovative business acceleration.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-sm p-4 ithealth-card transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-blue/10 p-3 rounded-full">
                    <Users className="h-5 w-5 text-blue" />
                  </div>
                  <div>
                    <h4 className="text-navy font-extralight text-left-override">Skilling</h4>
                    <p className="text-muted-foreground text-xs">Develop your team's capabilities with targeted learning paths</p>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-white border-0 shadow-sm p-4 ithealth-card transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-blue/10 p-3 rounded-full">
                    <Rocket className="h-5 w-5 text-blue" />
                  </div>
                  <div>
                    <h4 className="text-navy font-extralight text-left-override">Operations</h4>
                    <p className="text-muted-foreground text-xs">Align IT systems with your business objectives</p>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-white border-0 shadow-sm p-4 ithealth-card transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-pink/10 p-3 rounded-full">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-navy font-extralight text-left-override">Security</h4>
                    <p className="text-muted-foreground text-xs">Proactively protect your digital infrastructure</p>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-white border-0 shadow-sm p-4 ithealth-card transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-pink/10 p-3 rounded-full">
                    <Coins className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-navy font-extralight text-left-override">ROI</h4>
                    <p className="text-muted-foreground text-xs">Average savings of R24,500 per year with IThealth plans</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-white hover:bg-white/90 text-hero-bg ithealth-button transition-all"
                onClick={navigateToProgram}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Explore IT Health Plans
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white/10 ithealth-button transition-colors"
                onClick={navigateToSkills}
              >
                View Skills Development
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Right section - IT Acceleration card with no image */}
          <div className="lg:col-span-4">
            <Card className="bg-white/10 text-white border-0 shadow-md overflow-hidden ithealth-card h-full transition-all">
              <CardContent className="p-6 relative">
                {/* Light-styled message about IT as business accelerator */}
                <div className="relative z-10 space-y-6">
                  <div className="space-y-4">
                    <div className="bg-white/10 p-4 ithealth-card">
                      <h3 className="text-white text-xl font-extralight mb-2 text-left-override">IT as a Business Accelerator</h3>
                      <p className="text-white/80 text-xs">
                        Companies using IThealth see up to 32% reduction in IT-related disruptions and R15,000 monthly savings
                      </p>
                    </div>
                    
                    <div className="bg-white/5 p-4 ithealth-card">
                      <div className="flex justify-between mb-2">
                        <span className="text-white/80 text-xs">Average ROI</span>
                        <span className="text-white font-light text-xs">218%</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white/80 text-xs">Implementation Time</span>
                        <span className="text-white font-light text-xs">4-6 weeks</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white/80 text-xs">Annual Savings</span>
                        <span className="text-white font-light text-xs">R185,000+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center relative text-xs">
                      <span className="text-white/70">Operate</span>
                      <span className="text-white/70">Secure</span>
                      <span className="text-white/70">Streamline</span>
                      <span className="text-white/70">Accelerate</span>
                    </div>
                    
                    <div className="h-2 bg-white/10 rounded-full w-full relative">
                      <div className="absolute top-0 left-0 h-2 w-2/5 bg-primary rounded-full"></div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full bg-white text-hero-bg hover:bg-white/90 ithealth-button transition-all"
                        onClick={navigateToProgram}
                      >
                        Start Your Acceleration
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </HeroSection>
    </div>
  );
}
