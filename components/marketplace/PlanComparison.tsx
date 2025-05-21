
import { Check, X, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { MarketplacePlan } from "../../lib/marketplaceTypes";

interface PlanComparisonProps {
  plans: MarketplacePlan[];
  onSubscribe: (planId: string) => void;
  onViewDetails: (planId: string) => void;
  onBack: () => void;
}

export function PlanComparison({ plans, onSubscribe, onViewDetails, onBack }: PlanComparisonProps) {
  // Get all unique features across all plans
  const allFeatures = plans.reduce((features, plan) => {
    plan.features.forEach(feature => {
      if (!features.some(f => f.title === feature.title)) {
        features.push(feature);
      }
    });
    return features;
  }, [] as { title: string; description: string; included: boolean }[]);
  
  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Plans
      </Button>
      
      <h1>Compare Plans</h1>
      <p className="text-muted-foreground">
        See how our plans stack up against each other
      </p>
      
      <Card>
        <ScrollArea className="w-full overflow-x-auto" type="always">
          <div className="min-w-max">
            <div className="grid grid-cols-[250px_repeat(auto-fill,minmax(200px,1fr))]">
              {/* Header */}
              <CardHeader className="border-r">
                <CardTitle>Features</CardTitle>
              </CardHeader>
              
              {plans.map((plan) => (
                <CardHeader key={plan.id} className="border-r last:border-r-0 text-center">
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                  <div className="mt-2">
                    <Badge className="capitalize">{plan.category}</Badge>
                  </div>
                </CardHeader>
              ))}
              
              {/* Pricing section */}
              <div className="p-4 border-r border-t bg-muted/10">
                <p className="font-medium">Pricing</p>
              </div>
              
              {plans.map((plan) => {
                const mostPopularTier = plan.billingTiers.find(tier => tier.mostPopular) || plan.billingTiers[0];
                
                return (
                  <div key={`${plan.id}-pricing`} className="p-4 border-r last:border-r-0 border-t text-center bg-muted/10">
                    <p className="font-bold text-lg">
                      R{mostPopularTier.price.toFixed(2)}
                      <span className="text-sm font-normal text-muted-foreground">
                        {mostPopularTier.perUser ? "/user" : ""}/mo
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {mostPopularTier.name} tier
                      {mostPopularTier.minUsers && ` (min ${mostPopularTier.minUsers} users)`}
                    </p>
                  </div>
                );
              })}
              
              {/* Features */}
              <div className="col-span-full border-t">
                <p className="font-medium p-4">Core Features</p>
              </div>
              
              {allFeatures.map((feature, index) => (
                <div key={feature.title} className="contents">
                  <div className={`p-4 border-r ${index === allFeatures.length - 1 ? "" : "border-b"}`}>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                  
                  {plans.map((plan) => {
                    const planFeature = plan.features.find(f => f.title === feature.title);
                    const included = planFeature ? planFeature.included : false;
                    
                    return (
                      <div 
                        key={`${plan.id}-${feature.title}`} 
                        className={`p-4 border-r last:border-r-0 text-center ${
                          index === allFeatures.length - 1 ? "" : "border-b"
                        }`}
                      >
                        {included ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
              
              {/* Business Outcomes */}
              <div className="col-span-full border-t">
                <p className="font-medium p-4">Business Outcomes</p>
              </div>
              
              <div className="p-4 border-r">
                <p className="font-medium">Primary Outcomes</p>
                <p className="text-sm text-muted-foreground">Key business results you can expect</p>
              </div>
              
              {plans.map((plan) => (
                <div key={`${plan.id}-outcomes`} className="p-4 border-r last:border-r-0">
                  <div className="space-y-1">
                    {plan.businessOutcomes.map((outcome) => (
                      <Badge key={outcome} variant="outline" className="mr-1 mb-1">
                        {outcome}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Actions */}
              <CardFooter className="border-r border-t pt-6">
                <div></div>
              </CardFooter>
              
              {plans.map((plan) => (
                <CardFooter key={`${plan.id}-actions`} className="border-r last:border-r-0 border-t pt-6 flex-col items-stretch gap-2">
                  <Button onClick={() => onSubscribe(plan.id)}>
                    Subscribe
                  </Button>
                  <Button variant="outline" onClick={() => onViewDetails(plan.id)}>
                    View Details
                  </Button>
                </CardFooter>
              ))}
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
