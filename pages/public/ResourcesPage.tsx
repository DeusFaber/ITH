
import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { HeroSection } from '../../components/ui/HeroSection';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { ArrowRight, Search, BookOpen, FileText, PlayCircle, Download, Calendar, ArrowUpRight } from 'lucide-react';

interface ResourcesPageProps {
  onLoginClick: () => void;
  onGetStartedClick: () => void;
}

// Resource type definition
interface Resource {
  title: string;
  description: string;
  category: 'blog' | 'whitepaper' | 'webinar' | 'case-study';
  image: string;
  date: string;
  readTime?: string;
  featured?: boolean;
  new?: boolean;
}

export function ResourcesPage({ onLoginClick, onGetStartedClick }: ResourcesPageProps) {
  // Sample resources data
  const resources: Resource[] = [
    {
      title: "Why South African Businesses Need Different IT Solutions",
      description: "Exploring the unique challenges of managing IT in South Africa, from load shedding to bandwidth limitations.",
      category: "blog",
      image: "https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
      date: "May 10, 2025",
      readTime: "8 min read",
      featured: true
    },
    {
      title: "POPIA Compliance: A Complete Guide for IT Departments",
      description: "Everything South African businesses need to know about ensuring IT compliance with the Protection of Personal Information Act.",
      category: "whitepaper",
      image: "https://images.unsplash.com/photo-1575467678930-c366b61449db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
      date: "April 25, 2025",
      new: true
    },
    {
      title: "Load Shedding-Proof IT: Strategies for Business Continuity",
      description: "Practical approaches to keeping your IT systems running during South Africa's ongoing power challenges.",
      category: "webinar",
      image: "https://images.unsplash.com/photo-1599134842279-fe807d23316e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
      date: "May 15, 2025",
    },
    {
      title: "How Davson Accountancy Transformed Their IT with IThealth",
      description: "Case study on how a leading accounting firm improved client service and staff productivity through IT transformation.",
      category: "case-study",
      image: "https://images.unsplash.com/photo-1664575196644-808978af9b1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
      date: "April 8, 2025",
    },
    {
      title: "The IT Skills Gap in South Africa: Challenges and Solutions",
      description: "Analysis of the current IT skills shortage and strategies to address it in your organization.",
      category: "blog",
      image: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
      date: "April 30, 2025",
      readTime: "10 min read"
    },
    {
      title: "Cloud Migration for SA Businesses: Overcoming Local Challenges",
      description: "Strategies for successful cloud adoption considering South Africa's unique infrastructure environment.",
      category: "webinar",
      image: "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
      date: "May 5, 2025",
      new: true
    },
  ];
  
  // Get category icon
  const getCategoryIcon = (category: 'blog' | 'whitepaper' | 'webinar' | 'case-study') => {
    switch (category) {
      case 'blog':
        return <BookOpen className="h-4 w-4" />;
      case 'whitepaper':
        return <FileText className="h-4 w-4" />;
      case 'webinar':
        return <PlayCircle className="h-4 w-4" />;
      case 'case-study':
        return <Download className="h-4 w-4" />;
    }
  };
  
  // Get category label
  const getCategoryLabel = (category: 'blog' | 'whitepaper' | 'webinar' | 'case-study') => {
    switch (category) {
      case 'blog':
        return 'Blog Post';
      case 'whitepaper':
        return 'Whitepaper';
      case 'webinar':
        return 'Webinar';
      case 'case-study':
        return 'Case Study';
    }
  };
  
  // Get category badge color
  const getCategoryColor = (category: 'blog' | 'whitepaper' | 'webinar' | 'case-study') => {
    switch (category) {
      case 'blog':
        return 'bg-blue text-white';
      case 'whitepaper':
        return 'bg-navy text-white';
      case 'webinar':
        return 'bg-primary text-white';
      case 'case-study':
        return 'bg-green-500 text-white';
    }
  };
  
  // Featured resource (first one marked as featured)
  const featuredResource = resources.find(resource => resource.featured);
  
  // Other resources (excluding the featured one)
  const otherResources = resources.filter(resource => !resource.featured);
  
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
              IT Resources for <span className="text-white">South African</span> Businesses
            </h1>
            <p className="text-white/80 mb-8 mx-auto max-w-2xl">
              Expert insights, guides, and case studies to help you navigate the unique IT challenges of operating in South Africa.
            </p>
            
            {/* Search bar */}
            <div className="max-w-md mx-auto relative">
              <Input
                placeholder="Search our resources library..."
                className="pl-10 rounded-[16px] rounded-tr-[0px] border-none bg-white/90 text-blue"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue opacity-70" />
            </div>
          </div>
        </HeroSection>
        
        {/* Featured Resource */}
        {featuredResource && (
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6 public-container">
              <h2 className="text-2xl md:text-3xl font-extralight mb-8">
                Featured <span className="text-blue">Resource</span>
              </h2>
              
              <Card className="rounded-[16px] rounded-tr-[0px] overflow-hidden border-none shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-64 lg:h-auto bg-muted relative overflow-hidden">
                    <img 
                      src={featuredResource.image} 
                      alt={featuredResource.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className={`${getCategoryColor(featuredResource.category)} flex items-center gap-1 rounded-full px-3`}>
                          {getCategoryIcon(featuredResource.category)}
                          <span>{getCategoryLabel(featuredResource.category)}</span>
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-extralight mb-3">{featuredResource.title}</h3>
                      <p className="text-muted-foreground mb-6">
                        {featuredResource.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{featuredResource.date}</span>
                        {featuredResource.readTime && (
                          <>
                            <span>•</span>
                            <span>{featuredResource.readTime}</span>
                          </>
                        )}
                      </div>
                      
                      <Button 
                        className="rounded-[16px] rounded-tr-[0px] transition-all bg-blue hover:bg-blue/90"
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}
        
        {/* Resource Categories */}
        <section className="py-8 md:py-12 bg-muted/10 border-y border-muted/20">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="rounded-[16px] rounded-tr-[0px] bg-blue/10 p-4 text-blue flex items-center justify-between flex-1 min-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue/20 p-2">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-light">Blog Posts</h3>
                    <p className="text-xs text-blue/70">Latest insights & tips</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </div>
              
              <div className="rounded-[16px] rounded-tr-[0px] bg-navy/10 p-4 text-navy flex items-center justify-between flex-1 min-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-navy/20 p-2">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-light">Whitepapers</h3>
                    <p className="text-xs text-navy/70">In-depth research</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </div>
              
              <div className="rounded-[16px] rounded-tr-[0px] bg-primary/10 p-4 text-primary flex items-center justify-between flex-1 min-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/20 p-2">
                    <PlayCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-light">Webinars</h3>
                    <p className="text-xs text-primary/70">Live & recorded sessions</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </div>
              
              <div className="rounded-[16px] rounded-tr-[0px] bg-green-500/10 p-4 text-green-600 flex items-center justify-between flex-1 min-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-500/20 p-2">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-light">Case Studies</h3>
                    <p className="text-xs text-green-600/70">Success stories</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Latest Resources */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl md:text-3xl font-extralight">
                Latest <span className="text-blue">Resources</span>
              </h2>
              
              <Button variant="ghost" className="text-blue hover:text-blue/80">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherResources.map((resource, index) => (
                <Card key={index} className="rounded-[16px] rounded-tr-[0px] overflow-hidden hover:shadow-md transition-all">
                  <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                    <img 
                      src={resource.image} 
                      alt={resource.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    
                    {resource.new && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-blue">New</Badge>
                      </div>
                    )}
                    
                    <div className="absolute bottom-3 left-3">
                      <Badge className={`${getCategoryColor(resource.category)} flex items-center gap-1`}>
                        {getCategoryIcon(resource.category)}
                        <span>{getCategoryLabel(resource.category)}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3" />
                      <span>{resource.date}</span>
                      {resource.readTime && (
                        <>
                          <span>•</span>
                          <span>{resource.readTime}</span>
                        </>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-extralight mb-2 line-clamp-2">{resource.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {resource.description}
                    </p>
                    
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-blue hover:text-blue/80 hover:bg-transparent"
                    >
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 md:py-24 bg-blue/5">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                  Stay Updated with Our <span className="text-blue">IT Newsletter</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Get the latest IT insights, tips, and updates delivered straight to your inbox. 
                  Our newsletter is specifically focused on the South African IT landscape.
                </p>
                
                <ul className="space-y-3 mb-6">
                  {[
                    'Monthly IT security updates and alerts',
                    'South African IT compliance news',
                    'Practical tips for IT efficiency',
                    'Exclusive access to webinars and events',
                    'Early access to new whitepapers and guides'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ArrowRight className="mt-1 h-4 w-4 text-blue flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-extralight mb-4">Subscribe to Our Newsletter</h3>
                  
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm text-muted-foreground">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        className="rounded-[16px] rounded-tr-[0px] border-muted-foreground/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm text-muted-foreground">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="rounded-[16px] rounded-tr-[0px] border-muted-foreground/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm text-muted-foreground">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        placeholder="Your company"
                        className="rounded-[16px] rounded-tr-[0px] border-muted-foreground/20"
                      />
                    </div>
                    
                    <div className="flex items-start gap-2 mt-4">
                      <input 
                        type="checkbox" 
                        id="privacy"
                        className="mt-1"
                        required
                      />
                      <label htmlFor="privacy" className="text-xs text-muted-foreground">
                        I agree to receive the IThealth newsletter and understand that I can unsubscribe at any time. 
                        View our <a href="#" className="text-blue hover:underline">Privacy Policy</a>.
                      </label>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full mt-2 rounded-[16px] rounded-tr-[0px] bg-blue hover:bg-blue/90"
                    >
                      Subscribe Now
                    </Button>
                  </form>
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
              Need expert IT guidance for your business?
            </h2>
            <p className="text-white/80 mb-8">
              Schedule a free consultation with one of our IT specialists to discuss your specific challenges and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-navy hover:bg-white/90 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                Book a Consultation
              </Button>
              <Button 
                variant="ghost" 
                className="text-white border border-white/20 hover:bg-white/10 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                Take IT Assessment
              </Button>
            </div>
          </div>
        </HeroSection>
      </main>
    </div>
  );
}
