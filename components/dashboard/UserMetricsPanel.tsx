
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  BarChart3, 
  PhoneCall, 
  TrendingUp, 
  Users, 
  Calendar, 
  ChevronUp, 
  Award, 
  ArrowRight, 
  BookOpen
} from "lucide-react";
import { Progress } from "../ui/progress";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
  iconColor: string;
}

const MetricCard = ({ title, value, change, icon, trend, iconColor }: MetricCardProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className={`p-2 bg-${iconColor}/10 rounded-full`}>
        {icon}
      </div>
      <div className="space-y-1 flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm text-muted-foreground text-left-override">{title}</h4>
          {trend === "up" && <ChevronUp className="h-4 w-4 text-green-500" />}
        </div>
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-extralight">{value}</p>
          <span className="text-xs text-muted-foreground">{change}</span>
        </div>
      </div>
    </div>
  );
};

interface SkillProgressProps {
  name: string;
  progress: number;
  level: string;
}

const SkillProgress = ({ name, progress, level }: SkillProgressProps) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-left-override">{name}</span>
        <span className="text-xs text-muted-foreground">{level}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export function UserMetricsPanel() {
  // Mock data (would be fetched from API in a real app)
  const [siteVisits, setSiteVisits] = useState({
    total: "738",
    change: "+12% this month",
  });
  
  const [callMetrics, setCallMetrics] = useState({
    total: "24",
    change: "Last 30 days",
  });
  
  const [nextEvent, setNextEvent] = useState({
    title: "Team Training Call",
    date: "May 22, 2025",
    time: "10:00 AM",
  });

  // Navigate to skills view
  const navigateToSkills = () => {
    const button = document.createElement('button');
    button.setAttribute('data-page-id', 'resources');
    document.body.appendChild(button);
    button.click();
    document.body.removeChild(button);
  };

  return (
    <Card className="h-full ithealth-card">
      <CardHeader>
        <CardTitle className="text-left-override">Your <strong>Activity</strong></CardTitle>
        <CardDescription>Site visits, calls, and skill advancement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <MetricCard
            title="Site Visits"
            value={siteVisits.total}
            change={siteVisits.change}
            icon={<BarChart3 className="h-5 w-5 text-blue" />}
            trend="up"
            iconColor="blue"
          />
          
          <MetricCard
            title="Support Calls"
            value={callMetrics.total}
            change={callMetrics.change}
            icon={<PhoneCall className="h-5 w-5 text-navy" />}
            trend="up"
            iconColor="navy"
          />
          
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="text-sm text-muted-foreground text-left-override">Next Scheduled Call</h4>
              <p className="text-base font-extralight">{nextEvent.title}</p>
              <p className="text-xs text-muted-foreground">{nextEvent.date} at {nextEvent.time}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-blue" />
            <h3 className="text-base font-medium text-left-override">Personal Skill Advancement</h3>
          </div>
          
          <div className="space-y-4">
            <SkillProgress 
              name="Cloud Infrastructure" 
              progress={78} 
              level="Advanced" 
            />
            <SkillProgress 
              name="Security Protocols" 
              progress={45} 
              level="Intermediate" 
            />
            <SkillProgress 
              name="Data Management" 
              progress={92} 
              level="Expert" 
            />
          </div>
        </div>
        
        <Button 
          className="w-full bg-blue hover:bg-blue/90 text-white ithealth-button" 
          onClick={navigateToSkills}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          View All Skills
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
