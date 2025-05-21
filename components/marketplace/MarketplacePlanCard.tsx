
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Check, ChevronRight, Star } from "lucide-react";
import { MarketplacePlan } from "../../lib/marketplaceTypes";

interface MarketplacePlanCardProps {
  plan: MarketplacePlan;
  onViewDetails: (planId: string) => void;
  compact?: boolean;
}

export function MarketplacePlanCard({ plan, onViewDetails, compact = false }: MarketplacePlanCardProps) {
  // Find the most popular tier or the first one
  const featuredTier = plan.billingTiers.find(tier => tier.mostPopular) || plan.billingTiers[0];
  
  // Get the starting price (lowest tier)
  const startingPrice = Math.min(...plan.billingTiers.map(tier => tier.price));
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="relative pb-2">
        {plan.popularityScore && plan.popularityScore > 90 && (
          <div className="absolute -top-1 -right-1">
            <Badge className="bg-yellow-500 text-white flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              Popular
            </Badge>
          </div>
        )}
        
        <div className="relative rounded-md overflow-hidden aspect-video mb-2">
          <img 
            src={plan.thumbnail} 
            alt={plan.name} 
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-3 text-white">
              <Badge className="bg-primary mb-1">{plan.category}</Badge>
              <h4 className="font-semibold line-clamp-1">{plan.name}</h4>
            </div>
          </div>
        </div>
        
        <p className="text-sm font-medium">{plan.tagline}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {compact ? plan.description.substring(0, 80) + "..." : plan.description}
        </p>
      </CardHeader>
      
      <CardContent className="flex-grow pb-2">
        {!compact && (
          <>
            <div className="flex flex-wrap gap-1 mb-3">
              {plan.businessOutcomes.slice(0, 3).map((outcome) => (
                <Badge key={outcome} variant="outline" className="bg-primary/5">
                  {outcome}
                </Badge>
              ))}
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Key Features:</p>
              <ul className="space-y-1">
                {plan.features
                  .filter(feature => feature.included)
                  .slice(0, 4)
                  .map((feature) => (
                    <li key={feature.title} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature.title}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </>
        )}
        
        <div className="mt-3 pt-3 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-lg font-medium">
                R{startingPrice.toFixed(2)}
                <span className="text-sm text-muted-foreground">
                  {featuredTier.perUser ? "/user/mo" : "/mo"}
                </span>
              </p>
            </div>
            
            {featuredTier.mostPopular && (
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Most Popular
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          className="w-full" 
          onClick={() => onViewDetails(plan.id)}
        >
          View Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
