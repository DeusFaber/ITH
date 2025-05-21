
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { PlanCard } from "../components/assessment/PlanCard";
import { ArrowLeft, Users, Shield, Workflow, Zap, Clock, Server, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface AssessmentPlansProps {
  maturityLevel: "basic" | "stable" | "smart";
  onBack: () => void;
}

interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  benefits: string[];
  priority: "essential" | "recommended" | "optional";
  icon: React.ReactNode;
}

export function AssessmentPlans({ maturityLevel, onBack }: AssessmentPlansProps) {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    // Generate different plan recommendations based on maturity level
    const allPlans: Plan[] = [
      {
        id: "user-health",
        title: "User Health Plan",
        description: "Quick AI-powered support for you and your team",
        price: 49.99,
        benefits: [
          "24/7 helpdesk support",
          "Remote troubleshooting",
          "User account management",
          "Device monitoring"
        ],
        priority: maturityLevel === "basic" ? "essential" : "recommended",
        icon: <Users className="h-8 w-8 text-navy" />
      },
      {
        id: "itsafe-user",
        title: "ITsafe User Plan",
        description: "Proactive patching + antivirus protection",
        price: 29.99,
        benefits: [
          "Advanced endpoint security",
          "Automated security patching",
          "Threat detection & response",
          "Monthly security reports"
        ],
        priority: maturityLevel === "basic" ? "essential" : "recommended",
        icon: <Shield className="h-8 w-8 text-navy" />
      },
      {
        id: "workflow-optimization",
        title: "Workflow Optimisation",
        description: "Connect your tools and automate processes",
        price: 149.99,
        benefits: [
          "Business process assessment",
          "Tool integration services",
          "Automation setup",
          "Workflow documentation"
        ],
        priority: maturityLevel === "smart" ? "recommended" : "optional",
        icon: <Workflow className="h-8 w-8 text-navy" />
      },
      {
        id: "quick-response",
        title: "Quick Response",
        description: "Emergency IT support with guaranteed response times",
        price: 79.99,
        benefits: [
          "1-hour response guarantee",
          "Priority incident handling",
          "Weekend coverage",
          "On-call technician"
        ],
        priority: maturityLevel === "basic" ? "recommended" : "optional",
        icon: <Zap className="h-8 w-8 text-navy" />
      },
      {
        id: "cloud-migration",
        title: "Cloud Migration",
        description: "Move your infrastructure to secure cloud services",
        price: 399.99,
        benefits: [
          "Cloud readiness assessment",
          "Migration planning & execution",
          "Data transfer & verification",
          "Post-migration support"
        ],
        priority: maturityLevel === "stable" ? "recommended" : "optional",
        icon: <Server className="h-8 w-8 text-navy" />
      },
      {
        id: "managed-backup",
        title: "Managed Backup",
        description: "Automated data backup with verified recovery",
        price: 59.99,
        benefits: [
          "Automated daily backups",
          "Secure offsite storage",
          "Monthly recovery testing",
          "Rapid restore capability"
        ],
        priority: maturityLevel === "basic" ? "essential" : "recommended",
        icon: <Clock className="h-8 w-8 text-navy" />
      }
    ];

    // Filter and sort plans based on maturity level
    let filteredPlans: Plan[] = [];
    
    if (maturityLevel === "basic") {
      // For basic, focus on essential foundations
      filteredPlans = allPlans.filter(p => 
        p.priority === "essential" || 
        p.id === "quick-response" || 
        p.id === "managed-backup"
      );
    } else if (maturityLevel === "stable") {
      // For stable, focus on improvements
      filteredPlans = allPlans.filter(p => 
        p.id === "cloud-migration" || 
        p.id === "workflow-optimization" ||
        p.id === "managed-backup"
      );
    } else {
      // For smart, focus on optimization
      filteredPlans = allPlans.filter(p => 
        p.id === "workflow-optimization" || 
        p.priority === "recommended"
      ).slice(0, 3);
    }
    
    // Sort by priority
    filteredPlans.sort((a, b) => {
      const priorityOrder = { essential: 0, recommended: 1, optional: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    setPlans(filteredPlans);
  }, [maturityLevel]);

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 md:px-6 lg:py-16">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Results
      </Button>
      
      <div className="mb-10">
        <h1 className="text-3xl font-light mb-3 text-navy">Plans That Fit You</h1>
        <p className="text-lg text-muted-foreground">
          Based on your assessment, we've selected these plans to help improve your IT health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <Card className="mt-10 border-gold/30 bg-gold/5">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-gold" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-navy mb-2">Need a Custom Solution?</h3>
              <p className="text-muted-foreground mb-4">
                Book a free consultation with our IT specialists to discuss your unique requirements.
              </p>
              <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
                Book a Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
