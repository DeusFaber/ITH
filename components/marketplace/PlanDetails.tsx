
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Check, X, ChevronRight, MessageSquare, ArrowUpRight, AlertCircle, Sparkles } from "lucide-react";
import { MarketplacePlan } from "../../lib/marketplaceTypes";

interface PlanDetailsProps {
  plan: MarketplacePlan;
  onSubscribe: (planId: string) => void;
  onRequestDemo: (planId: string) => void;
  onTalkToAdvisor: (planId: string) => void;
  onBack: () => void;
}

export function PlanDetails({
  plan,
  onSubscribe,
  onRequestDemo,
  onTalkToAdvisor,
  onBack,
}: PlanDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="mb-4">
        &larr; Back to all plans
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="capitalize">{plan.category}</Badge>
              {plan.industries.slice(0, 3).map((industry) => (
                <Badge key={industry} variant="outline" className="bg-primary/5">
                  {industry}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl font-bold">{plan.name}</h1>
            <p className="text-muted-foreground">{plan.description}</p>
          </div>
          
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={plan.thumbnail} 
              alt={plan.name} 
              className="w-full object-cover h-64"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <h2 className="text-white text-xl font-bold">{plan.tagline}</h2>
              <p className="text-white/90 text-lg mt-2">{plan.heroStatement}</p>
            </div>
          </div>
          
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="process">How It Works</TabsTrigger>
              <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Ideal For</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium mb-2">Industries</p>
                        <div className="flex flex-wrap gap-2">
                          {plan.industries.map((industry) => (
                            <Badge key={industry} variant="outline">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-2">Roles</p>
                        <div className="flex flex-wrap gap-2">
                          {plan.roles.map((role) => (
                            <Badge key={role} variant="outline">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Key Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.businessOutcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2">
                          <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {plan.testimonials && plan.testimonials.length > 0 && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      <MessageSquare className="h-10 w-10 text-primary flex-shrink-0" />
                      <div>
                        <p className="italic text-lg mb-2">"{plan.testimonials[0].quote}"</p>
                        <p className="font-medium">{plan.testimonials[0].author}</p>
                        <p className="text-sm text-muted-foreground">
                          {plan.testimonials[0].role}, {plan.testimonials[0].company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose This Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.comparisonHighlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Features & Benefits</CardTitle>
                  <CardDescription>
                    Everything included in the {plan.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {plan.features.map((feature) => (
                      <div key={feature.title} className="flex gap-2">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">{feature.title}</p>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="process" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                  <CardDescription>
                    Our implementation process for the {plan.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plan.runbook.map((step, index) => (
                      <div key={index} className="relative pl-8 pb-8 border-l last:border-l-0 border-dashed border-primary/30">
                        <div className="absolute left-0 top-0 -translate-x-1/2 rounded-full bg-primary/10 border border-primary/30 h-6 w-6 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{index+1}</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">{step.title}</p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          {step.hasAITrigger && (
                            <Badge variant="outline" className="mt-2 bg-purple-100 text-purple-800 border-purple-200">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI-Powered
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="outcomes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Outcomes</CardTitle>
                  <CardDescription>
                    The value this plan delivers to your organization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {plan.businessOutcomes.map((outcome) => (
                      <Card key={outcome}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{outcome}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {getOutcomeDescription(outcome)}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {plan.skillsDelivered && plan.skillsDelivered.length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-medium mb-3">Skills Delivered</h3>
                      <div className="flex flex-wrap gap-2">
                        {plan.skillsDelivered.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pricing" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Plans</CardTitle>
                  <CardDescription>
                    Choose the tier that best fits your needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    {plan.billingTiers.map((tier) => (
                      <Card key={tier.id} className={tier.mostPopular ? "border-primary" : ""}>
                        {tier.mostPopular && (
                          <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                            Most Popular
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{tier.name}</CardTitle>
                          <div className="mt-2">
                            <span className="text-3xl font-bold">R{tier.price.toFixed(2)}</span>
                            <span className="text-sm text-muted-foreground">
                              {tier.perUser ? "/user" : ""}/mo
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {tier.minUsers && (
                            <p className="text-sm text-muted-foreground mb-4">
                              Minimum {tier.minUsers} users
                            </p>
                          )}
                          <Button 
                            className="w-full" 
                            variant={tier.mostPopular ? "default" : "outline"}
                            onClick={() => onSubscribe(plan.id)}
                          >
                            Choose {tier.name}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {plan.addOns.length > 0 && (
                    <div className="mt-8">
                      <h3 className="font-medium mb-4">Available Add-ons</h3>
                      <div className="space-y-4">
                        {plan.addOns.map((addon) => (
                          <div 
                            key={addon.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{addon.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {addon.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                R{addon.price.toFixed(2)}
                                <span className="text-sm text-muted-foreground">
                                  {addon.perUser ? "/user" : ""}/mo
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-muted/50 rounded-lg p-4 mt-6 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm">
                        All plans include basic onboarding, access to the IT Health customer platform, 
                        and our standard SLA. Enterprise customers receive priority support and 
                        dedicated account management.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Subscribe or learn more about this plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                onClick={() => onSubscribe(plan.id)}
              >
                Subscribe Now
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => onRequestDemo(plan.id)}
              >
                Request Demo
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full" 
                onClick={() => onTalkToAdvisor(plan.id)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Talk to an Advisor
              </Button>
              
              <div className="border-t pt-4 mt-4">
                <p className="text-sm font-medium">Key Information:</p>
                <ul className="space-y-2 mt-2">
                  <li className="text-sm flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-1" />
                    <span>Setup time: {estimateSetupTime(plan.runbook.length)}</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-1" />
                    <span>Flexible billing options</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-1" />
                    <span>Cancel anytime</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-1" />
                    <span>Earn rewards</span>
                  </li>
                </ul>
                
                <Button 
                  variant="link" 
                  className="px-0 h-auto mt-2 text-sm"
                  onClick={() => setActiveTab("pricing")}
                >
                  View pricing details
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="runbook">
              <AccordionTrigger>Runbook Summary</AccordionTrigger>
              <AccordionContent>
                <ol className="space-y-2 pl-5 list-decimal">
                  {plan.runbook.map((step, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium">{step.title}</span>
                      <p className="text-muted-foreground">{step.description}</p>
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faq">
              <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">How quickly can I get started?</p>
                    <p className="text-sm text-muted-foreground">
                      Most customers can begin implementation within 1-2 business days
                      of subscribing.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Can I customize this plan?</p>
                    <p className="text-sm text-muted-foreground">
                      Yes, talk to an advisor to discuss customizing this plan for
                      your specific business needs.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">What is the cancellation policy?</p>
                    <p className="text-sm text-muted-foreground">
                      You can cancel anytime with 30 days notice. No long-term contracts required.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

// Helper functions for content
function getOutcomeDescription(outcome: string): string {
  const descriptions: Record<string, string> = {
    "Workforce Optimization": "Increase employee productivity and satisfaction through streamlined IT processes and minimal disruption.",
    "Risk Reduction": "Minimize security vulnerabilities, compliance risks, and technology failures that could impact your business.",
    "Cost Savings": "Reduce IT expenditures through efficient resource utilization, preventative maintenance, and strategic planning.",
    "Productivity": "Enable your team to work more efficiently with reliable technology and rapid issue resolution.",
    "Customer Experience": "Deliver better service to your customers through improved technology reliability and performance.",
    "Innovation": "Leverage new technologies faster to gain competitive advantages in your market.",
    "Security": "Protect your business from cyber threats with comprehensive security measures and expert monitoring.",
    "Compliance": "Maintain adherence to industry regulations and standards with automated controls and documentation."
  };
  
  return descriptions[outcome] || "Delivers measurable business value aligned with your strategic objectives.";
}

function estimateSetupTime(runbookSteps: number): string {
  if (runbookSteps <= 3) return "1-3 days";
  if (runbookSteps <= 5) return "3-7 days";
  return "1-2 weeks";
}
