
import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { HeroSection } from '../../components/ui/HeroSection';
import { ArrowRight, Check, Server, ShieldCheck, Clock, Rocket, Building, Users, Headset, Award, BarChart, Briefcase } from 'lucide-react';

interface EnterprisePageProps {
  onLoginClick: () => void;
  onGetStartedClick: () => void;
}

export function EnterprisePage({ onLoginClick, onGetStartedClick }: EnterprisePageProps) {
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
                Enterprise <span className="text-white">IT Solutions</span>
              </h1>
              <p className="text-white/80 mb-8 max-w-md">
                Comprehensive IT management for large South African organizations with complex requirements and mission-critical systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-white text-navy hover:bg-white/90 rounded-[16px] rounded-tr-[0px] transition-all"
                  onClick={onGetStartedClick}
                >
                  Schedule Consultation
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white border border-white/20 hover:bg-white/10 rounded-[16px] rounded-tr-[0px] transition-all"
                  onClick={onGetStartedClick}
                >
                  Download Brochure <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center items-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-white/5 animate-pulse" style={{ animationDuration: '3s' }}></div>
                <div className="relative">
                  <Building className="h-24 w-24 md:h-32 md:w-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        </HeroSection>
        
        {/* Overview Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                Enterprise IT <span className="text-blue">Overview</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <p className="text-muted-foreground mb-4">
                    IThealth's Enterprise Solutions provide comprehensive IT management and strategic 
                    technology guidance for large South African organizations with complex requirements.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Our enterprise approach combines dedicated IT teams, customized service packages, 
                    and strategic technology planning to create a complete IT solution that aligns with 
                    your business goals and addresses the unique challenges of the South African operating environment.
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-4">
                    Unlike standard IT service providers, we focus on creating a true IT partnership that 
                    drives your business forward. Our CIO Advisory services provide executive-level IT 
                    guidance, while our technical teams ensure everyday operations run smoothly.
                  </p>
                  <p className="text-muted-foreground">
                    From multi-location support and custom SLAs to specialized infrastructure design 
                    and business intelligence solutions, we build enterprise packages that create true 
                    competitive advantage through technology.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Enterprise Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-blue" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Dedicated Account Team</h3>
                  <p className="text-muted-foreground mb-0">
                    A specialized team of IT professionals assigned exclusively to your organization, 
                    with deep knowledge of your business and technical environment.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Headset className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Enhanced Service Levels</h3>
                  <p className="text-muted-foreground mb-0">
                    Customized SLAs with guaranteed response and resolution times, priority escalation paths, 
                    and 24/7 support for mission-critical systems.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-blue" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Strategic IT Leadership</h3>
                  <p className="text-muted-foreground mb-0">
                    CIO Advisory services providing executive-level technology guidance, IT roadmapping, 
                    and alignment of technology initiatives with business objectives.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-navy/10 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-navy" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Business Intelligence</h3>
                  <p className="text-muted-foreground mb-0">
                    Custom analytics solutions that transform your organizational data into actionable 
                    insights, driving better decision-making and operational efficiency.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Compliance & Governance</h3>
                  <p className="text-muted-foreground mb-0">
                    Comprehensive regulatory compliance management for POPIA, financial services regulations, 
                    and international standards including ISO27001 and GDPR.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-navy/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-navy" />
                  </div>
                  <h3 className="text-xl font-extralight mb-2">Multi-Location Support</h3>
                  <p className="text-muted-foreground mb-0">
                    Coordinated IT services across all your South African offices and facilities, with 
                    standardized systems and seamless inter-office collaboration.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* The 4-Phase Approach for Enterprise */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                The IThealth <span className="text-blue">Enterprise Approach</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Our 4-phase methodology customized for enterprise organizations with complex IT environments.
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <div className="p-6 bg-blue/5 rounded-[16px] rounded-tr-[0px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue rounded-full p-2 text-white">
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <h3 className="text-xl font-extralight">Enterprise Operate</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Enterprise-grade infrastructure management with proactive monitoring, maintenance, and support 
                      scaled for complex multi-location environments and 24/7 operations.
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Multi-site network management',
                        'High-availability infrastructure',
                        'Enterprise helpdesk services',
                        'Advanced monitoring systems',
                        'Disaster recovery planning'
                      ].map((item, i) => (
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
                    <h3 className="text-2xl font-extralight mb-3">Enterprise foundation</h3>
                    <p className="text-white/80 mb-0">
                      "Our Enterprise Operate phase creates the stable, reliable IT foundation that large 
                      organizations require. We build redundant, load-balanced systems that minimize disruptions 
                      and maximize uptime across all your South African locations."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                <div className="lg:col-span-3 order-1">
                  <div className="bg-navy text-white p-6 rounded-[16px] rounded-tr-[0px]">
                    <h3 className="text-2xl font-extralight mb-3">Enterprise protection</h3>
                    <p className="text-white/80 mb-0">
                      "Enterprise organizations face sophisticated cyber threats daily. Our Enterprise Secure phase 
                      implements multi-layered security defenses with advanced threat intelligence and continuous 
                      monitoring to protect your business-critical data and systems."
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-2 order-2">
                  <div className="p-6 bg-navy/5 rounded-[16px] rounded-tr-[0px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-navy rounded-full p-2 text-white">
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <h3 className="text-xl font-extralight">Enterprise Secure</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive enterprise security with advanced threat detection, proactive vulnerability 
                      management, and continuous security monitoring scaled for large organizations.
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Enterprise-grade security operations',
                        'Advanced threat intelligence',
                        'Compliance & governance frameworks',
                        'Security awareness training program',
                        'Data loss prevention systems'
                      ].map((item, i) => (
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
                  <div className="p-6 bg-primary/5 rounded-[16px] rounded-tr-[0px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary rounded-full p-2 text-white">
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <h3 className="text-xl font-extralight">Enterprise Streamline</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Organization-wide process optimization and automation solutions that improve efficiency, 
                      reduce costs, and enhance collaboration across departments and locations.
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Enterprise-wide workflow automation',
                        'Business process reengineering',
                        'Document management systems',
                        'Cross-department collaboration tools',
                        'Enterprise resource planning integration'
                      ].map((item, i) => (
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
                    <h3 className="text-2xl font-extralight mb-3">Enterprise efficiency</h3>
                    <p className="text-white/80 mb-0">
                      "Large organizations often struggle with inefficient processes that slow decision-making 
                      and waste resources. Our Enterprise Streamline phase integrates systems and automates 
                      workflows to eliminate bottlenecks and drive operational excellence."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                <div className="lg:col-span-3 order-1">
                  <div className="bg-blue text-white p-6 rounded-[16px] rounded-tr-[0px]">
                    <h3 className="text-2xl font-extralight mb-3">Enterprise transformation</h3>
                    <p className="text-white/80 mb-0">
                      "Enterprise organizations need to innovate to stay competitive. Our Enterprise Accelerate 
                      phase helps you leverage cutting-edge technologies like AI, advanced analytics, and custom 
                      digital solutions to create sustainable competitive advantages."
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-2 order-2">
                  <div className="p-6 bg-blue/5 rounded-[16px] rounded-tr-[0px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue rounded-full p-2 text-white">
                        <span className="text-sm font-medium">4</span>
                      </div>
                      <h3 className="text-xl font-extralight">Enterprise Accelerate</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Strategic digital transformation initiatives that drive innovation, improve customer 
                      experiences, and create sustainable competitive advantages for enterprise organizations.
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Enterprise data analytics platform',
                        'AI & machine learning solutions',
                        'Digital transformation strategy',
                        'Custom application development',
                        'Innovation lab & emerging tech adoption'
                      ].map((item, i) => (
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
          </div>
        </section>
        
        {/* Industries We Serve */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                Industries We <span className="text-blue">Serve</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Specialized enterprise IT solutions for South Africa's key sectors.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-extralight mb-3">Financial Services</h3>
                  <p className="text-muted-foreground mb-4">
                    Secure, compliant IT solutions for banks, insurance companies, and financial institutions 
                    with specialized services for FSCA and POPIA compliance.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Regulatory compliance frameworks',
                      'Secure transaction processing',
                      'Financial data management',
                      'Risk management systems'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-extralight mb-3">Healthcare</h3>
                  <p className="text-muted-foreground mb-4">
                    Specialized IT solutions for hospitals, clinics, and healthcare providers with focus 
                    on patient data security and clinical system integration.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Electronic health record systems',
                      'Healthcare data security',
                      'Clinical system integration',
                      'Telemedicine infrastructure'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-extralight mb-3">Manufacturing</h3>
                  <p className="text-muted-foreground mb-4">
                    IT solutions optimized for production environments with industrial systems integration 
                    and supply chain optimization capabilities.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Industrial control systems',
                      'Supply chain optimization',
                      'Production management software',
                      'IoT & sensor integration'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-extralight mb-3">Retail & E-commerce</h3>
                  <p className="text-muted-foreground mb-4">
                    Customer-focused IT solutions for retail chains and e-commerce businesses with point-of-sale 
                    integration and omnichannel experiences.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'E-commerce platform optimization',
                      'POS & payment system integration',
                      'Inventory management systems',
                      'Customer data platforms'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-extralight mb-3">Professional Services</h3>
                  <p className="text-muted-foreground mb-4">
                    Tailored solutions for large law firms, accounting practices, and consulting companies 
                    with focus on knowledge management and client service.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Document management systems',
                      'Practice management software',
                      'Client relationship platforms',
                      'Knowledge management tools'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-extralight mb-3">Government</h3>
                  <p className="text-muted-foreground mb-4">
                    Specialized IT solutions for government departments and agencies with focus on security, 
                    compliance, and citizen service delivery.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Secure government systems',
                      'Citizen service platforms',
                      'Regulatory compliance solutions',
                      'Public sector digital transformation'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 text-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Enterprise Case Study */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                Enterprise <span className="text-blue">Success Story</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                See how IThealth transformed IT operations for a leading South African enterprise.
              </p>
            </div>
            
            <Card className="rounded-[16px] rounded-tr-[0px] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-blue">Case Study</Badge>
                  </div>
                  <h3 className="text-2xl font-extralight mb-4">National Retail Chain: IT Transformation</h3>
                  <p className="text-muted-foreground mb-6">
                    A leading South African retail chain with 120+ locations nationwide was struggling with 
                    fragmented IT systems, frequent outages affecting store operations, and growing cybersecurity 
                    concerns. IThealth implemented a comprehensive enterprise IT solution that transformed 
                    their operations.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-navy/10 p-2 mt-1">
                        <Server className="h-4 w-4 text-navy" />
                      </div>
                      <div>
                        <h4 className="font-light text-base mb-1">Centralized Infrastructure</h4>
                        <p className="text-sm text-muted-foreground">
                          Implemented a high-availability infrastructure with centralized management, 
                          reducing system downtime by 98%.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-blue/10 p-2 mt-1">
                        <ShieldCheck className="h-4 w-4 text-blue" />
                      </div>
                      <div>
                        <h4 className="font-light text-base mb-1">Enterprise Security</h4>
                        <p className="text-sm text-muted-foreground">
                          Deployed advanced security systems that prevented three major ransomware 
                          attempts within the first year.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2 mt-1">
                        <BarChart className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-light text-base mb-1">Business Intelligence</h4>
                        <p className="text-sm text-muted-foreground">
                          Implemented analytics platform that improved inventory forecasting accuracy by 34%, 
                          reducing stock-outs and overstock situations.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      "IThealth transformed our fragmented IT operations into a strategic business asset. Their 
                      enterprise-grade solutions have given us the stability, security, and insights we needed 
                      to grow our business in a challenging retail environment."
                    </p>
                    <div>
                      <p className="text-sm font-medium">Johan van der Merwe</p>
                      <p className="text-xs text-muted-foreground">CIO, National Retail Chain</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue/5 p-8 flex flex-col justify-center">
                  <h4 className="text-xl font-extralight mb-4">Key Results</h4>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">System Uptime</span>
                        <span className="text-blue font-medium">99.99%</span>
                      </div>
                      <div className="w-full bg-muted/40 rounded-full h-2">
                        <div className="bg-blue h-2 rounded-full" style={{ width: '99.99%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Up from 96.2% before IThealth</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">IT Support Response Time</span>
                        <span className="text-blue font-medium">5 min</span>
                      </div>
                      <div className="w-full bg-muted/40 rounded-full h-2">
                        <div className="bg-blue h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Improved from 4+ hours</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Security Incident Reduction</span>
                        <span className="text-blue font-medium">95%</span>
                      </div>
                      <div className="w-full bg-muted/40 rounded-full h-2">
                        <div className="bg-blue h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Year-over-year improvement</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Operational Cost Reduction</span>
                        <span className="text-blue font-medium">32%</span>
                      </div>
                      <div className="w-full bg-muted/40 rounded-full h-2">
                        <div className="bg-blue h-2 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Through automation and optimization</p>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full rounded-[16px] rounded-tr-[0px] transition-all bg-blue hover:bg-blue/90"
                        onClick={onGetStartedClick}
                      >
                        Download Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
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
              Ready to transform your enterprise IT?
            </h2>
            <p className="text-white/80 mb-8">
              Schedule a consultation with our enterprise solutions team to discuss your organization's 
              unique needs and challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-navy hover:bg-white/90 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                Schedule Executive Consultation
              </Button>
              <Button 
                variant="ghost" 
                className="text-white border border-white/20 hover:bg-white/10 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                Request Enterprise Brochure
              </Button>
            </div>
          </div>
        </HeroSection>
      </main>
    </div>
  );
}
