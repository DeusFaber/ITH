
import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  ArrowDown, 
  ArrowRight, 
  Rocket, 
  Shield, 
  Workflow, 
  Sparkles, 
  Zap,
  Monitor
} from "lucide-react";

interface ProgramHeroProps {
  userProgress: {
    currentPhase: string;
    phaseProgress: number;
    overallProgress: number;
    nextMilestone: string;
  };
  getCurrentPhaseColor: () => string;
  phaseData: any;
}

export function ProgramHero({ userProgress, getCurrentPhaseColor, phaseData }: ProgramHeroProps) {
  return (
    <Card className="border border-border shadow-sm overflow-hidden relative hero-section rounded-[16px] rounded-tr-[0px]">
      <CardContent className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Content Section */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white py-1 px-3">
                <Zap className="h-3.5 w-3.5 mr-1" />
                IT Transformation Journey
              </Badge>
              
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-extralight leading-tight">
                Transform your business with <span className="text-white/90 font-light">strategic IT planning</span>
              </h2>
              
              <p className="text-white/80 text-sm max-w-xl">
                Your business doesn't need another IT provider. It needs an IT strategy that turns technology from a cost center into a competitive advantage.
              </p>
            </div>
            
            {/* User Progress Card */}
            <Card className="bg-white/10 text-white border-0 shadow-md overflow-hidden rounded-[16px] rounded-tr-[0px]">
              <CardContent className="p-5 relative">
                {/* Abstract shapes for visual interest */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-12 translate-y-12"></div>
                
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div 
                        className="size-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${getCurrentPhaseColor()}30` }}
                      >
                        {phaseData[userProgress.currentPhase as keyof typeof phaseData].icon}
                      </div>
                      <div>
                        <p className="text-white/70 text-xs">Current Phase</p>
                        <p className="font-light text-lg">{phaseData[userProgress.currentPhase as keyof typeof phaseData].title}</p>
                      </div>
                    </div>
                    <Badge 
                      className="text-white font-light border-none"
                      style={{ backgroundColor: getCurrentPhaseColor() }}
                    >
                      {userProgress.phaseProgress}% Complete
                    </Badge>
                  </div>
                  
                  <Progress 
                    value={userProgress.phaseProgress} 
                    className="h-2.5" 
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      "--progress-fill": getCurrentPhaseColor()
                    } as React.CSSProperties}
                  />
                  
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-white/70 text-xs">Program Progress: {userProgress.overallProgress}%</p>
                    <div className="flex items-center gap-1.5 text-xs">
                      <ArrowRight className="h-3.5 w-3.5 text-gold" />
                      <span className="text-gold">Next: {userProgress.nextMilestone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-sm p-4 rounded-[16px] rounded-tr-[0px]">
                <div className="flex items-start gap-4">
                  <div className="bg-blue/10 p-3 rounded-full">
                    <Shield className="h-5 w-5 text-blue" />
                  </div>
                  <div>
                    <h4 className="text-navy font-extralight">Strategy</h4>
                    <p className="text-muted-foreground text-xs">Develop a strategic roadmap for IT transformation</p>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-white border-0 shadow-sm p-4 rounded-[16px] rounded-tr-[0px]">
                <div className="flex items-start gap-4">
                  <div className="bg-pink/10 p-3 rounded-full">
                    <Rocket className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-navy font-extralight">Growth</h4>
                    <p className="text-muted-foreground text-xs">Leverage technology to drive business growth</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                className="bg-white hover:bg-white/90 text-hero-bg rounded-[16px] rounded-tr-[0px]"
                onClick={() => document.getElementById('phase-journey')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Rocket className="mr-2 h-4 w-4" />
                Explore the 4 Phases
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 rounded-[16px] rounded-tr-[0px]"
                onClick={() => window.location.href = window.location.pathname + '?assessment=true'}
              >
                Take Your IT Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Right section - IT Journey cards */}
          <div className="md:col-span-5">
            <Card className="bg-white/10 text-white border-0 shadow-md overflow-hidden rounded-[16px] rounded-tr-[0px] h-full">
              <CardContent className="p-6 relative">
                {/* Abstract shapes for visual interest */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-12 translate-y-12"></div>
                
                <div className="relative z-10">
                  <h3 className="text-white text-xl font-extralight mb-4">The 4-Phase Journey</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue/20 backdrop-blur-sm p-4 rounded-[16px] rounded-tr-[0px] flex items-center gap-3 border border-white/5">
                      <div className="bg-blue/20 p-2 rounded-full">
                        <Monitor className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-extralight">Operate</p>
                        <p className="text-white/70 text-xs">Fix & Stabilize</p>
                      </div>
                    </div>
                    <div className="bg-primary/20 backdrop-blur-sm p-4 rounded-[16px] rounded-tr-[0px] flex items-center gap-3 border border-white/5">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-extralight">Secure</p>
                        <p className="text-white/70 text-xs">Protect Data</p>
                      </div>
                    </div>
                    <div className="bg-navy/30 backdrop-blur-sm p-4 rounded-[16px] rounded-tr-[0px] flex items-center gap-3 border border-white/5">
                      <div className="bg-navy/30 p-2 rounded-full">
                        <Workflow className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-extralight">Streamline</p>
                        <p className="text-white/70 text-xs">Optimize Processes</p>
                      </div>
                    </div>
                    <div className="bg-gold/20 backdrop-blur-sm p-4 rounded-[16px] rounded-tr-[0px] flex items-center gap-3 border border-white/5">
                      <div className="bg-gold/20 p-2 rounded-full">
                        <Sparkles className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-white font-extralight">Accelerate</p>
                        <p className="text-white/70 text-xs">Strategic Growth</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-white hover:bg-white/90 text-hero-bg rounded-[16px] rounded-tr-[0px]">
                    Find your IT phase
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
