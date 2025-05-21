
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { SavingsCredit } from "../../lib/types";

interface RewardsOverviewProps {
  rewards: SavingsCredit[];
  expanded?: boolean;
}

export function RewardsOverview({ rewards, expanded = false }: RewardsOverviewProps) {
  // Calculate total available rewards
  const totalAvailableRewards = rewards
    .filter(reward => reward.status === "available")
    .reduce((sum, reward) => sum + reward.amount, 0);
  
  // Next redemption milestone
  const nextMilestone = 2000;
  const progress = (totalAvailableRewards / nextMilestone) * 100;
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Savings Rewards</CardTitle>
        <CardDescription>Your earned rewards that can be redeemed for IT services</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-primary/10 p-4 text-center">
          <h3 className="text-3xl font-bold text-primary">R{totalAvailableRewards}</h3>
          <p className="text-sm text-muted-foreground">Available Rewards</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress to next milestone</span>
            <span>R{totalAvailableRewards} / R{nextMilestone}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Earn R{nextMilestone - totalAvailableRewards} more rewards to unlock premium services
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium">Recent Rewards</h4>
          {rewards.slice(0, expanded ? undefined : 3).map(reward => (
            <div key={reward.id} className="flex items-center justify-between border-b border-border pb-2 text-sm">
              <div>
                <p>{reward.source}</p>
                <p className="text-xs text-muted-foreground">{new Date(reward.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">R{reward.amount}</p>
                <p className="text-xs text-muted-foreground capitalize">{reward.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Button className="flex-1">Redeem Rewards</Button>
          <Button variant="outline" className="flex-1">View History</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
