
import { Card, CardContent } from "../ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "unchanged";
  trendValue?: string;
  className?: string;
  variant?: "primary" | "navy" | "blue";
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
  variant = "primary",
}: StatCardProps) {
  return (
    <Card className={`overflow-hidden border-border transition-all ${className} 
      ${variant === "primary" ? "hover:border-primary/30" : 
        variant === "navy" ? "hover:border-navy/30" : 
        variant === "blue" ? "hover:border-blue/30" : ""} hover:shadow-sm`}>
      <CardContent className="p-6 rounded-[16px] rounded-tl-[16px] rounded-tr-[0px] rounded-bl-[16px] rounded-br-[16px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-semibold">{value}</p>
              {trend && trendValue && (
                <div className={`flex items-center text-xs font-medium
                  ${trend === "up" 
                    ? "text-green-600" 
                    : trend === "down" 
                    ? "text-red-600" 
                    : "text-muted-foreground"
                  }`}
                >
                  {trend === "up" ? (
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                  ) : trend === "down" ? (
                    <ArrowDown className="h-3 w-3 mr-0.5" />
                  ) : (
                    <Minus className="h-3 w-3 mr-0.5" />
                  )}
                  {trendValue}
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <div className={`p-2 rounded-md ${
            variant === "primary" ? "bg-primary/10" : 
            variant === "navy" ? "bg-navy/10" : 
            variant === "blue" ? "bg-blue/10" : "bg-primary/10"
          }`}>
            <div className={`${
              variant === "primary" ? "text-primary" : 
              variant === "navy" ? "text-navy" : 
              variant === "blue" ? "text-blue" : "text-primary"
            }`}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
