
import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { HeroSection } from '../../components/ui/HeroSection';
import { ArrowRight, Server, ShieldCheck, Clock, Rocket, Check, MonitorSmartphone, HardDrive, Cloud, Wifi, Users, FileKey, Database } from 'lucide-react';

interface FeaturesPageProps {
  onLoginClick: () => void;
  onGetStartedClick: () => void;
}

export function FeaturesPage({ onLoginClick, onGetStartedClick }: FeaturesPageProps) {
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
              Comprehensive <span className="text-white">IT Solutions</span>
            </h1>
            <p className="text-white/80 mb-8 mx-auto max-w-2xl">
              Everything your South African business needs to operate efficiently, securely, and competitively in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-blue hover:bg-white/90 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                Explore Our Solutions
              </Button>
            </div>
          </div>
        </HeroSection>
        
        {/* 4-Phase Overview */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                The IThealth <span className="text-blue">4-Phase Approach</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our structured methodology transforms your IT from a cost center to a strategic business asset.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all border-blue/20">
                <div className="h-2 bg-blue rounded-tl-[16px]"></div>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Server className="h-6 w-6 text-blue" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Operate</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    We stabilize your IT environment and take over day-to-day management, ensuring reliable operations.
                  </p>
                  <ul className="space-y-2">
                    {['Managed IT Services', 'Help Desk Support', 'Infrastructure Management', 'Backup & Disaster Recovery'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all border-navy/20">
                <div className="h-2 bg-navy rounded-tl-[16px]"></div>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-navy/10 w-12 h-12 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-6 w-6 text-navy" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Secure</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    We protect your systems, data, and reputation with multi-layered security solutions.
                  </p>
                  <ul className="space-y-2">
                    {['Cybersecurity Services', 'Email Protection', 'Endpoint Security', 'POPIA Compliance'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-navy flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all border-primary/20">
                <div className="h-2 bg-primary rounded-tl-[16px]"></div>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Streamline</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    We optimize your business processes to maximize efficiency and productivity.
                  </p>
                  <ul className="space-y-2">
                    {['Cloud Services', 'Document Management', 'Collaboration Tools', 'Process Automation'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all border-blue/20">
                <div className="h-2 bg-blue rounded-tl-[16px]"></div>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Rocket className="h-6 w-6 text-blue" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Accelerate</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    We help you leverage technology to drive business growth and competitive advantage.
                  </p>
                  <ul className="space-y-2">
                    {['Digital Transformation', 'Business Intelligence', 'Customer Experience', 'AI & Automation'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Featured Services Section */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                Our <span className="text-blue">Featured Services</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Comprehensive solutions designed for South African businesses.
              </p>
            </div>
            
            <div className="space-y-12">
              {/* Managed IT Services */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-blue/10 p-4">
                      <MonitorSmartphone className="h-8 w-8 text-blue" />
                    </div>
                    <h3 className="text-2xl font-extralight">Managed IT Services</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Complete IT management with proactive monitoring, maintenance, and support. We handle the technology so you can focus on your business.
                  </p>
                  <Button 
                    className="rounded-[16px] rounded-tr-[0px] bg-blue hover:bg-blue/90"
                    onClick={onGetStartedClick}
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="lg:col-span-2">
                  <Card className="rounded-[16px] rounded-tr-[0px]">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="text-lg font-light">What's Included:</h4>
                          <ul className="space-y-3">
                            {[
                              '24/7 system monitoring & alerting',
                              'Help desk & technical support',
                              'Network management & optimization',
                              'Server administration',
                              'Vendor management',
                              'Regular maintenance & updates',
                              'Technology roadmap planning',
                              'Backup & disaster recovery'
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Check className="mt-0.5 h-4 w-4 text-blue flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-lg font-light">Key Benefits:</h4>
                          <ul className="space-y-3">
                            {[
                              'Predictable monthly IT costs',
                              'Reduced downtime & disruptions',
                              'Faster issue resolution',
                              'Proactive problem prevention',
                              'Enhanced system performance',
                              'Strategic IT planning & guidance',
                              'Dedicated account management',
                              'Regular QBR meetings'
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Check className="mt-0.5 h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Cybersecurity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1 order-1 lg:order-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-navy/10 p-4">
                      <ShieldCheck className="h-8 w-8 text-navy" />
                    </div>
                    <h3 className="text-2xl font-extralight">Cybersecurity</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Comprehensive security solutions to protect your business from threats while ensuring compliance with industry regulations.
                  </p>
                  <Button 
                    className="rounded-[16px] rounded-tr-[0px] bg-navy hover:bg-navy/90"
                    onClick={onGetStartedClick}
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <Card className="rounded-[16px] rounded-tr-[0px]">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="text-lg font-light">Protection Layers:</h4>
                          <ul className="space-y-3">
                            {[
                              'Next-gen endpoint protection',
                              'Email security & anti-phishing',
                              'Firewall & network security',
                              'Data encryption solutions',
                              'Security assessments & testing',
                              'Vulnerability management',
                              'POPIA compliance services',
                              'Security awareness training'
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Check className="mt-0.5 h-4 w-4 text-navy flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-lg font-light">Why It Matters:</h4>
                          <ul className="space-y-3">
                            {[
                              'Protection from ransomware & malware',
                              'Safeguarding of client data',
                              'Prevention of business disruption',
                              'Regulatory compliance',
                              'Reduced risk of data breaches',
                              'Protection of company reputation',
                              'Defense against emerging threats',
                              'Secure remote work enablement'
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Check className="mt-0.5 h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Cloud Services */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Cloud className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-extralight">Cloud Services</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Transform your business with secure, flexible cloud solutions optimized for South African connectivity environments.
                  </p>
                  <Button 
                    className="rounded-[16px] rounded-tr-[0px] bg-primary hover:bg-primary/90"
                    onClick={onGetStartedClick}
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="lg:col-span-2">
                  <Card className="rounded-[16px] rounded-tr-[0px]">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="text-lg font-light">Cloud Solutions:</h4>
                          <ul className="space-y-3">
                            {[
                              'Microsoft 365 implementation',
                              'Cloud migration strategy',
                              'Hybrid cloud environments',
                              'Microsoft Azure services',
                              'Data backup & recovery',
                              'Cloud security & governance',
                              'Private & public cloud options',
                              'Cloud cost optimization'
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Check className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-lg font-light">Business Benefits:</h4>
                          <ul className="space-y-3">
                            {[
                              'Enhanced flexibility & mobility',
                              'Improved business continuity',
                              'Reduced capital expenditure',
                              'Scalable resources as needed',
                              'Better collaboration capabilities',
                              'Load-shedding resilience',
                              'Automatic updates & maintenance',
                              'Enhanced security controls'
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Check className="mt-0.5 h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* IT Infrastructure */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                IT <span className="text-blue">Infrastructure</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Reliable, scalable, and resilient infrastructure solutions designed for South African business environments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <HardDrive className="h-6 w-6 text-blue" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Server Solutions</h3>
                  <p className="text-muted-foreground mb-4">
                    On-premises, cloud, or hybrid server solutions optimized for performance and reliability.
                  </p>
                  <ul className="space-y-2">
                    {['Server virtualization', 'Hardware procurement', 'Server maintenance', 'High-availability configurations'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Wifi className="h-6 w-6 text-blue" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Network Solutions</h3>
                  <p className="text-muted-foreground mb-4">
                    Secure, high-performance networks with redundancy for continuous operations.
                  </p>
                  <ul className="space-y-2">
                    {['Network design & implementation', 'Wireless optimization', 'ISP failover configurations', 'Load balancing & redundancy'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-blue" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">End-User Computing</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive desktop, laptop, and mobile device management and support.
                  </p>
                  <ul className="space-y-2">
                    {['Hardware procurement & setup', 'Device management', 'Software deployment', 'Remote support capabilities'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <FileKey className="h-6 w-6 text-blue" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Backup & Recovery</h3>
                  <p className="text-muted-foreground mb-4">
                    Multi-layered backup solutions to ensure business continuity in any situation.
                  </p>
                  <ul className="space-y-2">
                    {['Automated backup systems', 'On-site & off-site replication', 'Rapid recovery procedures', 'Regular testing & verification'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-blue" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Storage Solutions</h3>
                  <p className="text-muted-foreground mb-4">
                    Flexible, scalable storage designed for performance and data protection.
                  </p>
                  <ul className="space-y-2">
                    {['SAN/NAS technologies', 'Cloud storage integration', 'Data lifecycle management', 'Storage optimization'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <HardDrive className="h-6 w-6 text-blue" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Load-Shedding Solutions</h3>
                  <p className="text-muted-foreground mb-4">
                    Keep your business running during power outages with reliable backup power.
                  </p>
                  <ul className="space-y-2">
                    {['UPS systems', 'Generator integration', 'Power management', 'Cloud-first design for resilience'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Schedule Consultation CTA */}
        <HeroSection
          fullWidth={true}
          background="primary"
          alignment="center"
          className="py-16 md:py-24"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extralight mb-4">
              Ready to explore the right IT solution for your business?
            </h2>
            <p className="text-white/80 mb-8">
              Schedule a free consultation with one of our specialists to discuss your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-primary hover:bg-white/90 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                Book a Consultation
              </Button>
              <Button 
                variant="ghost" 
                className="text-white border border-white/20 hover:bg-white/10 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                View Our Plans
              </Button>
            </div>
          </div>
        </HeroSection>
      </main>
    </div>
  );
}
