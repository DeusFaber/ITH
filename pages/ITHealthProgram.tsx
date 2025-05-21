
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { 
  Check, 
  ArrowRight, 
  Server, 
  Shield, 
  Workflow, 
  Sparkles,
  Monitor, 
  LaptopIcon, 
  BuildingIcon, 
  Mail, 
  Phone, 
  Lock, 
  Database, 
  Package2, 
  FileBox, 
  BarChart, 
  Settings2, 
  FileStack, 
  ArrowUpRight, 
  Brain,
  ChevronRight,
  CalendarDays,
  Users,
  Zap,
  Lightbulb,
  LineChart,
  Rocket
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PhaseCard } from "../components/itprogram/PhaseCard";
import { PhaseDetails } from "../components/itprogram/PhaseDetails";
import { ProgramJourney } from "../components/itprogram/ProgramJourney";

// Import the logo components
import OperateLogo from "../imports/OperateLogo-5-190";
import SecureLogo from "../imports/SecureLogo-5-172";
import StreamlineLogo from "../imports/StreamlineLogo-5-228";
import AccelerateLogo from "../imports/AccelerateLogo-5-208";

// Simple Plan Card component
function PlanCard({ icon, title, description, color = "#FF246B" }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  color?: string 
}) {
  return (
    <Card className="border-border/50 hover:border-primary/50 transition-colors cursor-pointer group hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex flex-col space-y-3">
          <div 
            className="size-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}10`, color: color }}
          >
            {icon}
          </div>
          <h4 
            className="font-medium group-hover:text-primary transition-colors"
            style={{ color: "inherit" }}
          >
            {title}
          </h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          
          <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-auto"
              style={{ color }}
            >
              Learn more <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Testimonial Card component
function TestimonialCard({ quote, author, role, company }: {
  quote: string;
  author: string;
  role: string;
  company: string;
}) {
  return (
    <Card className="border-border/50 h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="text-3xl text-primary opacity-50 mb-4">"</div>
        <p className="text-muted-foreground flex-grow">{quote}</p>
        <div className="mt-6 pt-4 border-t">
          <div className="font-medium">{author}</div>
          <div className="text-sm text-muted-foreground">{role}, {company}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// Feature Card component
function FeatureCard({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-card border rounded-lg p-6 h-full">
      <div 
        className="size-12 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}10`, color: color }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function ITHealthProgram() {
  const [activePhase, setActivePhase] = useState<string>("operate");

  const handlePhaseChange = (phase: string) => {
    setActivePhase(phase);
    // Scroll to phase details section
    document.getElementById('phase-details')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getPhaseNumber = (phase: string): number => {
    switch (phase) {
      case "operate": return 1;
      case "secure": return 2;
      case "streamline": return 3;
      case "accelerate": return 4;
      default: return 1;
    }
  };

  const phaseData = {
    operate: {
      title: "OPERATE",
      subtitle: "Fix and stabilize your IT environment",
      phaseNumber: 1,
      color: "#1175E4",
      icon: <Monitor className="h-6 w-6 text-[#1175E4]" />,
      logoComponent: <OperateLogo isActive={true} />,
      description: "Get your day-to-day technology working reliably. This phase addresses reactive IT, fragmented systems, and support chaos. It's about creating a stable, supported environment that gives you peace of mind and reduces costly downtime.",
      keyOutcomes: [
        "Always-on device monitoring",
        "Fast AI-powered end-user support",
        "Stable network and office tech",
        "Reliable communication systems"
      ],
      phaseIndicators: [
        "Frequent IT outages and disruptions",
        "No clear IT support process",
        "End users frustrated with technology",
        "Reactive approach to IT issues"
      ],
      plans: [
        {
          icon: <LaptopIcon className="h-5 w-5" />,
          title: "User Health Plan",
          description: "IT support for your team members with responsive helpdesk and troubleshooting"
        },
        {
          icon: <BuildingIcon className="h-5 w-5" />,
          title: "Office Health Plan",
          description: "Infrastructure monitoring and management for your office environment"
        },
        {
          icon: <Mail className="h-5 w-5" />,
          title: "Mail Plan",
          description: "Email system management, security, and optimization"
        },
        {
          icon: <Phone className="h-5 w-5" />,
          title: "Communication Plan",
          description: "Integrated messaging, VoIP, and collaboration tools"
        }
      ]
    },
    secure: {
      title: "SECURE",
      subtitle: "Protect users, data, and infrastructure",
      phaseNumber: 2,
      color: "#FF246B",
      icon: <Shield className="h-6 w-6 text-[#FF246B]" />,
      logoComponent: <SecureLogo isActive={true} />,
      description: "Once your tech works, it needs to be secure. This phase introduces cybersecurity policies, patching, backups, and compliance tools that safeguard your business from threats — without slowing it down.",
      keyOutcomes: [
        "Enforced device and server security",
        "Backup and disaster recovery",
        "Access and compliance control",
        "Threat protection and monitoring"
      ],
      phaseIndicators: [
        "Basic IT is stable but security is lacking",
        "No formal backup or recovery system",
        "Concerns about regulatory compliance",
        "Increasing cybersecurity threats"
      ],
      plans: [
        {
          icon: <Lock className="h-5 w-5" />,
          title: "ITsafe User Plan",
          description: "Comprehensive endpoint security and user protection"
        },
        {
          icon: <Database className="h-5 w-5" />,
          title: "ITsafe Server Plan",
          description: "Advanced server security and monitoring"
        },
        {
          icon: <Package2 className="h-5 w-5" />,
          title: "Business Basic Plan",
          description: "Foundational business continuity and data protection"
        },
        {
          icon: <Shield className="h-5 w-5" />,
          title: "Compliance Manager",
          description: "Tools to maintain regulatory compliance"
        }
      ]
    },
    streamline: {
      title: "STREAMLINE",
      subtitle: "Simplify and modernize business systems",
      phaseNumber: 3,
      color: "#133258",
      icon: <Workflow className="h-6 w-6 text-[#133258]" />,
      logoComponent: <StreamlineLogo isActive={true} />,
      description: "This phase helps you replace chaos with clarity. We optimize file storage, reduce duplication, automate manual work, and introduce dashboards to help you run your business smarter.",
      keyOutcomes: [
        "Organized, searchable file systems",
        "Workflow automation",
        "Visibility into metrics and performance",
        "Reduced manual and duplicate processes"
      ],
      phaseIndicators: [
        "Stable and secure IT but inefficient processes",
        "Duplicated effort and information",
        "Limited visibility into business metrics",
        "Manual processes that could be automated"
      ],
      plans: [
        {
          icon: <FileBox className="h-5 w-5" />,
          title: "SharePoint Plan",
          description: "Document management and collaborative workspaces"
        },
        {
          icon: <BarChart className="h-5 w-5" />,
          title: "Reporting Plan",
          description: "Business intelligence and performance dashboards"
        },
        {
          icon: <Settings2 className="h-5 w-5" />,
          title: "Workflow Optimization",
          description: "Process automation and efficiency improvements"
        },
        {
          icon: <FileStack className="h-5 w-5" />,
          title: "Business Standard Plan",
          description: "Integrated business applications and workflows"
        }
      ]
    },
    accelerate: {
      title: "ACCELERATE",
      subtitle: "Leverage technology for strategic advantage",
      phaseNumber: 4,
      color: "#EDB600",
      icon: <Sparkles className="h-6 w-6 text-[#EDB600]" />,
      logoComponent: <AccelerateLogo isActive={true} />,
      description: "The final phase turns IT from a cost center into a strategic asset. Use AI, custom applications, and advanced analytics to differentiate your business and accelerate growth.",
      keyOutcomes: [
        "Technology as a competitive advantage",
        "Data-driven decision making",
        "Custom applications and integrations",
        "Advanced AI and automation"
      ],
      phaseIndicators: [
        "Strong IT foundation needing strategic focus",
        "Ready to build competitive advantage with tech",
        "Need for custom solutions and advanced analytics",
        "Looking to differentiate through digital innovation"
      ],
      plans: [
        {
          icon: <Lightbulb className="h-5 w-5" />,
          title: "Innovation Plan",
          description: "Custom solutions and specialized application development"
        },
        {
          icon: <LineChart className="h-5 w-5" />,
          title: "Business Premium Plan",
          description: "Advanced analytics and business intelligence"
        },
        {
          icon: <Server className="h-5 w-5" />,
          title: "Enterprise Integration",
          description: "Seamless connectivity between all business systems"
        },
        {
          icon: <Brain className="h-5 w-5" />,
          title: "AI Implementation",
          description: "Custom AI solutions for your specific business challenges"
        }
      ]
    }
  };

  // Data for the program journey visual component
  const programPhases = [
    {
      id: "operate",
      title: "Operate",
      description: "Fix and stabilize",
      icon: <Monitor className="h-5 w-5" />,
      color: "#1561BE",
      position: 1
    },
    {
      id: "secure",
      title: "Secure",
      description: "Protect and ensure",
      icon: <Shield className="h-5 w-5" />,
      color: "#FF246B",
      position: 2
    },
    {
      id: "streamline",
      title: "Streamline",
      description: "Optimize and automate",
      icon: <Workflow className="h-5 w-5" />,
      color: "#133258",
      position: 3
    },
    {
      id: "accelerate",
      title: "Accelerate",
      description: "Innovate and grow",
      icon: <Sparkles className="h-5 w-5" />,
      color: "#EDB600",
      position: 4
    }
  ];

  const currentPhaseData = phaseData[activePhase as keyof typeof phaseData];

  return (
    <div className="space-y-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight">The IT Health Program</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A structured approach to transform your technology from chaotic to strategic
          </p>
        </div>
        
        <Card className="overflow-hidden border-none gradient-card bg-blue">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 space-y-6 text-white">
                <Badge className="bg-white/20 text-white border-none hover:bg-white/30">
                  The Transformation Journey
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-light leading-tight">
                  Your business doesn't need another IT provider. 
                  <span className="text-gold"> It needs an IT strategy.</span>
                </h2>
                <p className="text-white/80">
                  Think of us as your outsourced IT wellness coach. We don't just treat IT issues — we build long-term resilience through a structured 4-phase program designed for growing businesses.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button 
                    className="bg-gold hover:bg-gold/90 text-gold-foreground"
                    onClick={() => document.getElementById('phase-journey')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Explore the 4 Phases
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => window.location.href = window.location.pathname + '?assessment=true'}
                  >
                    Take Your IT Assessment
                  </Button>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-blue/90 z-10"></div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                  alt="IT Health Program"
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Benefits Section */}
      <section className="text-center space-y-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-light mb-4">Why the IT Health Program?</h2>
          <p className="text-muted-foreground text-lg">
            Our structured approach helps you transform IT from a cost center into a strategic asset
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Zap className="h-6 w-6" />}
            title="Predictable Results"
            description="A proven roadmap with clear outcomes at each phase"
            color="#FF246B"
          />
          <FeatureCard 
            icon={<CalendarDays className="h-6 w-6" />}
            title="Long-term Planning"
            description="Strategic approach vs. reactive firefighting"
            color="#1561BE"
          />
          <FeatureCard 
            icon={<Users className="h-6 w-6" />}
            title="Business Alignment"
            description="Technology that supports your business goals"
            color="#133258"
          />
          <FeatureCard 
            icon={<Rocket className="h-6 w-6" />}
            title="Competitive Edge"
            description="Turn technology into a strategic advantage"
            color="#EDB600"
          />
        </div>
      </section>

      {/* Phase Journey Section */}
      <section id="phase-journey" className="space-y-8 pt-6 scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-light mb-4">The 4-Phase Journey</h2>
          <p className="text-muted-foreground">
            From reactive IT maintenance to strategic digital transformation
          </p>
        </div>

        <ProgramJourney 
          phases={programPhases}
          currentPhase={activePhase}
          onPhaseSelect={handlePhaseChange}
        />
        
        {/* Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <PhaseCard 
            phase="operate"
            title="Operate"
            icon={<Monitor className="h-6 w-6 text-[#1561BE]" />}
            logoComponent={<OperateLogo isActive={activePhase === "operate"} />}
            isActive={activePhase === "operate"}
            onClick={() => handlePhaseChange("operate")}
            description="Fix and stabilize your IT environment"
            position={1}
          />
          <PhaseCard
            phase="secure"
            title="Secure"
            icon={<Shield className="h-6 w-6 text-[#FF246B]" />}
            logoComponent={<SecureLogo isActive={activePhase === "secure"} />}
            isActive={activePhase === "secure"}
            onClick={() => handlePhaseChange("secure")}
            description="Protect users, data, and infrastructure"
            position={2}
          />
          <PhaseCard
            phase="streamline"
            title="Streamline"
            icon={<Workflow className="h-6 w-6 text-[#133258]" />}
            logoComponent={<StreamlineLogo isActive={activePhase === "streamline"} />}
            isActive={activePhase === "streamline"}
            onClick={() => handlePhaseChange("streamline")}
            description="Simplify and modernize business systems"
            position={3}
          />
          <PhaseCard
            phase="accelerate"
            title="Accelerate"
            icon={<Sparkles className="h-6 w-6 text-[#EDB600]" />}
            logoComponent={<AccelerateLogo isActive={activePhase === "accelerate"} />}
            isActive={activePhase === "accelerate"}
            onClick={() => handlePhaseChange("accelerate")}
            description="Leverage technology for strategic advantage"
            position={4}
          />
        </div>
      </section>

      {/* Phase Details Section */}
      <section id="phase-details" className="space-y-10 pt-4 scroll-mt-16">
        <Tabs value={activePhase} onValueChange={handlePhaseChange} className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-8 bg-transparent border rounded-md p-1">
            <TabsTrigger 
              value="operate" 
              className="data-[state=active]:bg-[#1561BE] data-[state=active]:text-white"
            >
              Operate
            </TabsTrigger>
            <TabsTrigger 
              value="secure" 
              className="data-[state=active]:bg-[#FF246B] data-[state=active]:text-white"
            >
              Secure
            </TabsTrigger>
            <TabsTrigger 
              value="streamline" 
              className="data-[state=active]:bg-[#133258] data-[state=active]:text-white"
            >
              Streamline
            </TabsTrigger>
            <TabsTrigger 
              value="accelerate" 
              className="data-[state=active]:bg-[#EDB600] data-[state=active]:text-white"
            >
              Accelerate
            </TabsTrigger>
          </TabsList>

          {Object.keys(phaseData).map((phase) => {
            const data = phaseData[phase as keyof typeof phaseData];
            
            return (
              <TabsContent key={phase} value={phase} className="space-y-8">
                <PhaseDetails
                  phase={phase as "operate" | "secure" | "streamline" | "accelerate"}
                  title={data.title}
                  subtitle={data.subtitle}
                  description={data.description}
                  icon={data.icon}
                  logoComponent={data.logoComponent}
                  phaseNumber={data.phaseNumber}
                  keyOutcomes={data.keyOutcomes}
                  phaseIndicators={data.phaseIndicators}
                />

                <div className="mt-10">
                  <h3 className="text-xl font-semibold mb-6">Available Plans</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.plans.map((plan, index) => (
                      <PlanCard 
                        key={index}
                        icon={plan.icon}
                        title={plan.title}
                        description={plan.description}
                        color={data.color}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button 
                    className="text-white"
                    style={{ backgroundColor: data.color, color: "white" }}
                    onClick={() => setActivePhase(phase)}
                  >
                    View {data.title} Phase Plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </section>

      {/* Testimonials Section */}
      <section className="space-y-8 pt-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-light mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Businesses that have transformed through the IT Health Program
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            quote="The 4-phase approach helped us understand exactly where we were in our IT journey. We've moved from chaotic, reactive IT to strategic planning that aligns with our business goals."
            author="Sarah Johnson"
            role="CTO"
            company="GreenTech Solutions"
          />
          <TestimonialCard
            quote="Before IT Health, we struggled with constant tech issues and security concerns. Now our systems run smoothly, our data is secure, and we can focus on growing our business."
            author="Michael Rodriguez"
            role="CEO"
            company="Visionary Media"
          />
          <TestimonialCard
            quote="The structured program gave us clarity and confidence. We know what phase we're in and what's next, which makes budgeting and planning for IT so much easier."
            author="Jennifer Wu"
            role="Operations Director"
            company="Nexus Financial"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <Card className="overflow-hidden border-none">
          <div className="absolute inset-0 bg-blue/5 z-0"></div>
          <CardContent className="p-8 md:p-12 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-light">Ready to transform your IT?</h2>
              <p className="text-muted-foreground text-lg">
                Take our assessment to find your current phase and get a personalized IT Health roadmap for your business.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button 
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-gold-foreground"
                  onClick={() => window.location.href = window.location.pathname + '?assessment=true'}
                >
                  Start Your IT Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('phase-journey')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Program Phases
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
