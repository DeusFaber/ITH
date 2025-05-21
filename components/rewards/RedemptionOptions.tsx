
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { RedemptionOption } from "../../lib/types";

interface RedemptionOptionsProps {
  options: RedemptionOption[];
  availableCredits: number;
}

export function RedemptionOptions({ options, availableCredits }: RedemptionOptionsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Redemption Options</CardTitle>
        <CardDescription>
          Use your Savings Credits for valuable IT services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-primary/10 p-4 text-center mb-6">
          <h3 className="text-2xl font-bold text-primary">R {availableCredits}</h3>
          <p className="text-sm text-muted-foreground">Available Credits</p>
        </div>

        <div className="space-y-4">
          {options.map((option) => (
            <Card key={option.id} className="border overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{option.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                  <Badge className="capitalize">{option.category}</Badge>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
                  <div className="flex gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Credit Cost</p>
                      <p className="font-medium">R {option.creditCost}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Value</p>
                      <p className="font-medium">R {option.estimatedValue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Savings</p>
                      <p className="font-medium text-green-600">
                        R {option.estimatedValue - option.creditCost}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    disabled={availableCredits < option.creditCost}
                    variant={availableCredits >= option.creditCost ? "default" : "outline"}
                  >
                    {availableCredits >= option.creditCost 
                      ? "Redeem Now" 
                      : `Need R ${option.creditCost - availableCredits} more credits`}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
