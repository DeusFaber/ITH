
import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { 
  Search, 
  Monitor, 
  Shield, 
  Workflow, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Tag, 
  Clock, 
  Zap
} from "lucide-react";
import { MarketplaceCategory } from "../../lib/marketplaceTypes";

interface MarketplaceHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: MarketplaceCategory | "all";
  setActiveCategory: (category: MarketplaceCategory | "all") => void;
}

export function MarketplaceHero({ 
  searchQuery, 
  onSearchChange, 
  activeCategory, 
  setActiveCategory 
}: MarketplaceHeroProps) {
  
  // Helper function to get category icon
  const getCategoryIcon = (category: MarketplaceCategory) => {
    switch (category) {
      case "Operate": return <Monitor className="h-5 w-5" />;
      case "Secure": return <Shield className="h-5 w-5" />;
      case "Streamline": return <Workflow className="h-5 w-5" />;
      case "Accelerate": return <Sparkles className="h-5 w-5" />;
    }
  };

  return (
    <Card className="border border-border shadow-sm overflow-hidden relative hero-section rounded-[16px] rounded-tr-[0px]">
      <CardContent className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white py-1 px-3">
                  <Zap className="h-3.5 w-3.5 mr-1" />
                  IThealth Marketplace
                </Badge>
                <Badge className="bg-white/10 text-white py-1 px-3">
                  IT Solutions
                </Badge>
              </div>
              
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-extralight leading-tight">
                Discover <span className="text-white/90 font-light">IT solutions</span> aligned with your business objectives
              </h2>
              
              <p className="text-white/80 text-sm max-w-xl">
                Browse our curated collection of IT solutions designed to enhance your technology infrastructure, security posture, and digital capabilities.
              </p>
            </div>
            
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search for IT solutions..."
                className="bg-white border border-border w-full pl-10 py-2 rounded-[16px] rounded-tr-[0px] focus:outline-none focus:ring-2 focus:ring-blue"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => onSearchChange("")}
                >
                  <span className="text-muted-foreground hover:text-foreground">✕</span>
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className={`border-white/30 text-white hover:bg-white/10 rounded-[16px] rounded-tr-[0px] ${activeCategory === "all" ? "bg-white/10" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                <span className="ml-1">All Solutions</span>
              </Button>
              
              {[[
                  "Operate", "blue"], 
                  ["Secure", "primary"], 
                  ["Streamline", "navy"], 
                  ["Accelerate", "gold"]
                ].map(([cat, color]) => (
                <Button
                  key={cat}
                  variant="outline"
                  className={`border-white/30 text-white hover:bg-white/10 rounded-[16px] rounded-tr-[0px] ${activeCategory === cat ? "bg-white/10" : ""}`}
                  onClick={() => setActiveCategory(cat as MarketplaceCategory)}
                >
                  <div className="text-white">
                    {getCategoryIcon(cat as MarketplaceCategory)}
                  </div>
                  <span className="ml-2">{cat}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <Card className="bg-white/10 text-white border-0 shadow-md overflow-hidden rounded-[16px] rounded-tr-[0px] h-full">
              <CardContent className="p-6 relative">
                {/* Abstract shapes for visual interest */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-12 translate-y-12"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="text-center">
                    <h3 className="text-white text-xl font-extralight mb-2">Your IT Journey</h3>
                    <p className="text-white/80 text-xs mb-4">
                      Find the right solutions for your current phase
                    </p>
                  </div>
                  
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
                  
                  <Button className="w-full bg-white text-hero-bg hover:bg-white/90 rounded-[16px] rounded-tr-[0px]">
                    Find your IT phase
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
      
      <div className="border-t border-white/10 bg-white/5 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-white" />
            <span className="text-white/80 text-sm">Expert Reviewed</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-white" />
            <span className="text-white/80 text-sm">Satisfaction Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-white" />
            <span className="text-white/80 text-sm">Flexible Pricing</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-white" />
            <span className="text-white/80 text-sm">Fast Implementation</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
