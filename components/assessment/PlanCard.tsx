
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { CheckCircle } from "lucide-react";

interface PlanCardProps {
  plan: {
    id: string;
    title: string;
    description: string;
    price: number;
    benefits: string[];
    priority: "essential" | "recommended" | "optional";
    icon: React.ReactNode;
  };
}

export function PlanCard({ plan }: PlanCardProps) {
  const getPriorityBadge = () => {
    switch (plan.priority) {
      case "essential":
        return (
          <Badge className="bg-red-500 hover:bg-red-500/90">
            Essential
          </Badge>
        );
      case "recommended":
        return (
          <Badge className="bg-gold hover:bg-gold/90">
            Recommended
          </Badge>
        );
      case "optional":
        return (
          <Badge variant="outline">
            Optional
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden border-navy/10 transition-all hover:shadow-md">
      <CardHeader className="pb-4 pt-6">
        <div className="flex items-center justify-between mb-2">
          <div className="h-12 w-12 rounded-lg bg-navy/5 flex items-center justify-center">
            {plan.icon}
          </div>
          {getPriorityBadge()}
        </div>
        <h3 className="text-xl font-medium text-navy">{plan.title}</h3>
        <p className="text-muted-foreground">{plan.description}</p>
      </CardHeader>

      <CardContent className="flex-grow pb-0">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Starting from</p>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-navy">R{plan.price}</span>
            <span className="text-muted-foreground ml-1">/month</span>
          </div>
        </div>

        <div className="space-y-2">
          {plan.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-6 pb-6 flex flex-col gap-3">
        <Button className="w-full bg-navy hover:bg-navy/90">Add to Cart</Button>
        <Button variant="outline" className="w-full">Learn More</Button>
      </CardFooter>
    </Card>
  );
}
