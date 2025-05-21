
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { ActivityLog } from "../components/dashboard/ActivityLog";
import { PlanOverview } from "../components/dashboard/PlanOverview";
import { RewardsOverview } from "../components/dashboard/RewardsOverview";
import { StatCard } from "../components/dashboard/StatCard";
import { AssessmentPromo } from "../components/dashboard/AssessmentPromo";
import { AssessmentTile } from "../components/dashboard/AssessmentTile";
import { AssessmentWidget } from "../components/dashboard/AssessmentWidget";
import { TeamSkillsChart } from "../components/dashboard/TeamSkillsChart";
import { UserMetricsPanel } from "../components/dashboard/UserMetricsPanel";
import { DashboardHero } from "../components/dashboard/DashboardHero";
import { Shield, Server, CheckCircle, Clock, Bell, Users, LineChart } from "lucide-react";
import { mockSavingsRewards, mockPlans, mockActivityLogs } from "../lib/mockData";
import { useAssessment } from "../contexts/AssessmentContext";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { assessmentHistory = [] } = useAssessment() || {};
  const hasHistory = Array.isArray(assessmentHistory) && assessmentHistory.length > 0;
  
  // Log assessment data to help with debugging
  useEffect(() => {
    console.log("Dashboard loaded, assessment history:", assessmentHistory || []);
  }, [assessmentHistory]);

  // Function to navigate to IT Program page
  const navigateToProgram = () => {
    const button = document.createElement('button');
    button.setAttribute('data-page-id', 'itprogram');
    document.body.appendChild(button);
    button.click();
    document.body.removeChild(button);
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">IT Plans</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* New Hero Message */}
          <DashboardHero />
          
          {/* Team Skills Chart and User Metrics Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="h-full ithealth-card">
              <CardHeader>
                <CardTitle className="text-left-override">Team Skills</CardTitle>
                <CardDescription>Skill level distribution across your IT team</CardDescription>
              </CardHeader>
              <CardContent>
                <TeamSkillsChart />
              </CardContent>
            </Card>
            
            {/* Replaced ProgramJourneySummary with the new UserMetricsPanel */}
            <UserMetricsPanel />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <StatCard 
              title="Active Plans" 
              value="4" 
              description="Across 3 categories"
              trend="up"
              trendValue="1"
              icon={<Shield className="h-5 w-5" />}
              variant="primary"
            />
            <StatCard 
              title="Protected Devices" 
              value="17" 
              description="9 workstations, 8 mobile"
              trend="up"
              trendValue="2"
              icon={<Server className="h-5 w-5" />}
              variant="navy"
            />
            <StatCard 
              title="Secure Score" 
              value="86%" 
              description="Up from 74% last month"
              trend="up"
              trendValue="12%"
              icon={<CheckCircle className="h-5 w-5" />}
              variant="blue"
            />
            <StatCard 
              title="Tickets" 
              value="2" 
              description="1 high priority"
              trend="down"
              trendValue="3"
              icon={<Bell className="h-5 w-5" />}
              variant="primary"
            />
            <AssessmentTile />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            <Card className="lg:col-span-4 ithealth-card">
              <CardHeader>
                <CardTitle className="text-left-override">IThealth <strong>Score</strong></CardTitle>
                <CardDescription>Your organization's overall IT health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted rounded-md">
                  [IThealth Score Dashboard Charts]
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2 ithealth-card">
              <CardHeader>
                <CardTitle className="text-left-override">Critical <strong>Alerts</strong></CardTitle>
                <CardDescription>Issues requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-full mt-0.5">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-left-override">Security Updates Pending</h4>
                      <p className="text-sm text-muted-foreground">3 devices need critical updates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-navy/10 rounded-full mt-0.5">
                      <Bell className="h-4 w-4 text-navy" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-left-override">Backup Status</h4>
                      <p className="text-sm text-muted-foreground">1 server has outdated backups</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlanOverview plans={mockPlans} />
            <RewardsOverview rewards={mockSavingsRewards} />
          </div>
        </TabsContent>
        
        <TabsContent value="plans">
          <PlanOverview plans={mockPlans} expanded={true} />
        </TabsContent>
        
        <TabsContent value="rewards">
          <RewardsOverview rewards={mockSavingsRewards} expanded={true} />
        </TabsContent>
        
        <TabsContent value="activity">
          <ActivityLog logs={mockActivityLogs} />
        </TabsContent>
        
        <TabsContent value="assessment">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AssessmentWidget className="h-full" />
            </div>
            <div className="space-y-6">
              <Card className="ithealth-card">
                <CardHeader>
                  <CardTitle className="text-left-override">Assessment <strong>Benefits</strong></CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">1</span>
                      </div>
                      <p className="text-sm">Identify critical IT gaps and vulnerabilities</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">2</span>
                      </div>
                      <p className="text-sm">Benchmark against industry standards</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">3</span>
                      </div>
                      <p className="text-sm">Receive personalized improvement recommendations</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">4</span>
                      </div>
                      <p className="text-sm">Track progress over time with regular reassessments</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {hasHistory && (
                <Card className="ithealth-card">
                  <CardHeader>
                    <CardTitle className="text-left-override">Assessment <strong>Trends</strong></CardTitle>
                  </CardHeader>
                  <CardContent className="h-40 flex items-center justify-center bg-muted rounded-md">
                    [Assessment Score Trends Chart]
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
