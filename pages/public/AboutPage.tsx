
import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { WhiteLogoWrapper } from '../../components/public/WhiteLogoWrapper';
import { HeroSection } from '../../components/ui/HeroSection';
import { ArrowRight, Check, Users, Heart, Globe, Award, Zap, Coffee } from 'lucide-react';
import Group46 from '../../imports/Group46';

interface AboutPageProps {
  onLoginClick: () => void;
  onGetStartedClick: () => void;
}

export function AboutPage({ onLoginClick, onGetStartedClick }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection
          fullWidth={true}
          background="navy"
          alignment="left"
          className="py-16 md:py-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight mb-4">
                About <span className="text-white">IThealth</span>
              </h1>
              <p className="text-white/80 mb-8 max-w-md">
                A South African IT services company built for professionals who deserve better than the status quo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-white text-navy hover:bg-white/90 rounded-[16px] rounded-tr-[0px] transition-all"
                  onClick={onGetStartedClick}
                >
                  Get Started
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white border border-white/20 hover:bg-white/10 rounded-[16px] rounded-tr-[0px] transition-all"
                  onClick={onGetStartedClick}
                >
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center items-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="rounded-full bg-white/10 p-12 relative">
                <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse" style={{ animationDuration: '3s' }}></div>
                <div className="relative z-10 h-24 w-24 md:h-32 md:w-32">
                  <WhiteLogoWrapper>
                    <Group46 />
                  </WhiteLogoWrapper>
                </div>
              </div>
            </div>
          </div>
        </HeroSection>
        
        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                Our <span className="text-blue">Story</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <p className="text-muted-foreground mb-4">
                    IThealth was founded in 2020 by a group of IT professionals who had one thing in common: 
                    frustration with how traditional IT services were failing South African businesses.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    We saw too many professional service firms struggling with unreliable systems, 
                    security vulnerabilities, poor communication, and IT providers who seemed more 
                    interested in selling hardware than solving problems.
                  </p>
                  <p className="text-muted-foreground">
                    So we decided to build something different: an IT service model specifically designed 
                    for South African accounting firms, law practices, architectural studios, engineering 
                    consultancies, and other knowledge-based businesses.
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-4">
                    We developed the IThealth Program—a structured 4-phase approach to IT transformation that 
                    takes businesses from basic stability to strategic advantage. This methodology has now 
                    helped hundreds of professional firms across South Africa modernize their IT approach.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Today, IThealth has grown to a team of 45+ specialists across Cape Town, Johannesburg and 
                    Durban, but our mission remains the same: to deliver IT services that professional South 
                    African businesses actually deserve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                Our <span className="text-blue">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                These core principles guide everything we do at IThealth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Heart className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">South African at Heart</h3>
                  <p className="text-muted-foreground mb-0">
                    We build solutions for South African businesses that address local challenges like load shedding, 
                    connectivity issues, and the unique regulatory environment.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="text-blue h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">People First</h3>
                  <p className="text-muted-foreground mb-0">
                    We believe technology exists to serve people, not the other way around. Every solution we 
                    implement is designed with the human experience in mind.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-navy/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Globe className="text-navy h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Transparency</h3>
                  <p className="text-muted-foreground mb-0">
                    No jargon, no hidden costs, no misleading advice. We communicate clearly and honestly, even 
                    when the truth is complicated or difficult.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Award className="text-blue h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Excellence</h3>
                  <p className="text-muted-foreground mb-0">
                    We hold ourselves to the highest standards in everything from technical expertise to 
                    customer service. Good enough is never good enough.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Zap className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Innovation</h3>
                  <p className="text-muted-foreground mb-0">
                    We continuously explore new technologies and approaches, but only implement solutions that 
                    deliver real value, not just novelty.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-navy/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Coffee className="text-navy h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Community</h3>
                  <p className="text-muted-foreground mb-0">
                    We're committed to developing local IT talent and contributing to South Africa's technical 
                    ecosystem through education and mentorship.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Leadership Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                Our <span className="text-blue">Leadership Team</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Meet the experienced team guiding IThealth's mission to transform IT services in South Africa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="rounded-[16px] rounded-tr-[0px] overflow-hidden hover:shadow-md transition-all">
                <div className="aspect-[4/3] bg-muted">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                    alt="David Nkosi" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-xl font-extralight mb-1">David Nkosi</h3>
                  <p className="text-primary text-sm mb-2">CEO & Co-Founder</p>
                  <p className="text-muted-foreground text-sm">
                    Former CIO with 15+ years experience in enterprise IT management for financial services firms.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] overflow-hidden hover:shadow-md transition-all">
                <div className="aspect-[4/3] bg-muted">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                    alt="Sarah van der Merwe" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-xl font-extralight mb-1">Sarah van der Merwe</h3>
                  <p className="text-primary text-sm mb-2">COO & Co-Founder</p>
                  <p className="text-muted-foreground text-sm">
                    Operations specialist with background in scaling IT service businesses across Southern Africa.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] overflow-hidden hover:shadow-md transition-all">
                <div className="aspect-[4/3] bg-muted">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                    alt="Michael Patel" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-xl font-extralight mb-1">Michael Patel</h3>
                  <p className="text-primary text-sm mb-2">CTO</p>
                  <p className="text-muted-foreground text-sm">
                    Technology leader with expertise in cloud infrastructure and cybersecurity frameworks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Facts and Figures Section */}
        <section className="py-16 md:py-24 bg-blue text-white">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                IThealth <span className="text-white">by the Numbers</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-extralight mb-2">250+</div>
                <p className="text-white/80">South African businesses served</p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-extralight mb-2">45+</div>
                <p className="text-white/80">IT specialists on our team</p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-extralight mb-2">98%</div>
                <p className="text-white/80">Client retention rate</p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-extralight mb-2">24/7</div>
                <p className="text-white/80">Support availability</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                Why <span className="text-blue">Choose IThealth</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                What makes our approach to IT services different from traditional providers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="rounded-[16px] rounded-tr-[0px] border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <ul className="space-y-4">
                    {['South African focus with solutions built for local challenges', 
                      'Structured program methodology instead of reactive break-fix service', 
                      'Transparent, predictable monthly pricing with no surprise costs', 
                      'Business-focused IT that aligns with your organizational goals'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <ul className="space-y-4">
                    {['Communication in plain language, not technical jargon', 
                      'Proactive monitoring and maintenance to prevent issues', 
                      'Strategic IT planning aligned with your business growth', 
                      'Local support team that understands SA business context'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <HeroSection
          fullWidth={true}
          background="primary"
          alignment="center"
          className="py-16 md:py-24"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extralight mb-4">
              Ready to experience better IT?
            </h2>
            <p className="text-white/80 mb-8">
              Join the growing community of South African businesses who've 
              upgraded to IThealth's managed IT services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-primary hover:bg-white/90 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                Get Started
              </Button>
              <Button 
                variant="ghost" 
                className="text-white border border-white/20 hover:bg-white/10 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </HeroSection>
      </main>
    </div>
  );
}
