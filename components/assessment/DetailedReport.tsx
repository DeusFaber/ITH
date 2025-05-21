
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BarChart, LineChart, PieChart, XAxis, YAxis, Bar, Cell, Pie, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DownloadCloud, ExternalLink, ChevronDown, Flag, Award, AlertTriangle, CheckCircle } from "lucide-react";
import { SavedAssessment, AssessmentScoreDetails, AssessmentRecommendation } from "../../lib/assessmentTypes";
import { formatDate } from "../../lib/utils";
import { useAssessment } from "../../contexts/AssessmentContext";
import { ScoreGauge } from "./ScoreGauge";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner@2.0.3";

interface DetailedReportProps {
  assessment: SavedAssessment;
  comparisonData?: {
    current: SavedAssessment;
    previous: SavedAssessment;
    improvement: number;
  };
}

export function DetailedReport({ assessment, comparisonData }: DetailedReportProps) {
  const { assessmentHistory } = useAssessment();
  const [activeTab, setActiveTab] = useState("overview");
  const [isExporting, setIsExporting] = useState(false);

  // Calculate detailed scores
  const scoreDetails: AssessmentScoreDetails = {
    overall: calculateOverallScore(assessment.result),
    categories: {
      security: calculateCategoryScore(assessment, 'security_confidence'),
      infrastructure: calculateCategoryScore(assessment, 'infrastructure'),
      support: calculateCategoryScore(assessment, 'support_resources'),
      dataManagement: calculateCategoryScore(assessment, 'data_management'),
      businessAlignment: calculateCategoryScore(assessment, 'business_alignment'),
    }
  };

  // Generate recommendations based on assessment
  const recommendations: AssessmentRecommendation[] = generateRecommendations(assessment);

  // Generate industry comparison data
  const industryComparisonData = [
    { name: "Security", yourScore: scoreDetails.categories.security, industryAvg: 65 },
    { name: "Infrastructure", yourScore: scoreDetails.categories.infrastructure, industryAvg: 58 },
    { name: "Support", yourScore: scoreDetails.categories.support, industryAvg: 62 },
    { name: "Data Management", yourScore: scoreDetails.categories.dataManagement, industryAvg: 54 },
    { name: "Business Alignment", yourScore: scoreDetails.categories.businessAlignment, industryAvg: 60 }
  ];

  // Generate score breakdown chart data
  const scoreBreakdownData = [
    { name: "High", value: assessment.result.scoreBreakdown.high, fill: "#4CAF50" },
    { name: "Medium", value: assessment.result.scoreBreakdown.medium, fill: "#FFC107" },
    { name: "Low", value: assessment.result.scoreBreakdown.low, fill: "#F44336" },
    { name: "Neutral", value: assessment.result.scoreBreakdown.neutral, fill: "#9E9E9E" }
  ];

  // Generate historical data if available
  const historicalData = assessmentHistory
    .slice(0, 5)
    .reverse()
    .map(a => ({ 
      date: formatDate(new Date(a.date), true), 
      score: calculateOverallScore(a.result)
    }));

  // Export the report as PDF
  const exportPDF = async () => {
    setIsExporting(true);
    const reportElement = document.getElementById('detailed-report');
    
    if (!reportElement) {
      toast.error("Could not find report element");
      setIsExporting(false);
      return;
    }

    try {
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`IT-Health-Assessment-Report-${formatDate(new Date(assessment.date))}.pdf`);
      
      toast.success("Report exported successfully");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export report");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div id="detailed-report" className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h2 className="text-3xl text-navy">Assessment <strong>Report</strong></h2>
          <p className="text-muted-foreground">
            Completed on {formatDate(new Date(assessment.date))}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={exportPDF}
            disabled={isExporting}
          >
            <DownloadCloud className="h-4 w-4" />
            {isExporting ? "Exporting..." : "Export PDF"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Maturity <strong>Overview</strong></CardTitle>
                <CardDescription>
                  Your overall IT health maturity level and score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <ScoreGauge score={scoreDetails.overall} maturityLevel={assessment.result.maturityLevel} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl">
                      <strong>{getMaurityLevelName(assessment.result.maturityLevel)}</strong> IT Maturity
                    </h3>
                    <p>
                      {getMaturityDescription(assessment.result.maturityLevel)}
                    </p>
                    {comparisonData && (
                      <div className={`flex items-center gap-2 text-sm ${comparisonData.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {comparisonData.improvement >= 0 ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                        <span>
                          {comparisonData.improvement >= 0 
                            ? `Improved by ${Math.abs(comparisonData.improvement).toFixed(1)}% since last assessment` 
                            : `Decreased by ${Math.abs(comparisonData.improvement).toFixed(1)}% since last assessment`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Score <strong>Breakdown</strong></CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={scoreBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {scoreBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-4">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-[#4CAF50] rounded-full"></div>
                    <span>High Quality</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-[#FFC107] rounded-full"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-[#F44336] rounded-full"></div>
                    <span>Low</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Industry <strong>Comparison</strong></CardTitle>
              <CardDescription>
                How your IT health compares to industry averages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={industryComparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="yourScore" name="Your Score" fill="var(--color-gold)" />
                    <Bar dataKey="industryAvg" name="Industry Average" fill="var(--color-navy)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategoryCard
              title="Security"
              score={scoreDetails.categories.security}
              description="Your cybersecurity posture and protection against threats"
              icon={<Shield className="h-5 w-5" />}
              strengths={["Basic security measures in place", "Password policies implemented"]}
              weaknesses={["Limited threat detection capability", "Outdated security software"]}
              answerData={assessment.answers}
              questionId="security_confidence"
            />
            <CategoryCard
              title="Infrastructure"
              score={scoreDetails.categories.infrastructure}
              description="Your IT infrastructure reliability and modernity"
              icon={<Server className="h-5 w-5" />}
              strengths={["Some cloud-based services utilized", "Regular hardware refresh cycles"]}
              weaknesses={["Network bottlenecks during peak times", "Limited disaster recovery capabilities"]}
              answerData={assessment.answers}
              questionId="infrastructure"
            />
            <CategoryCard
              title="Support Resources"
              score={scoreDetails.categories.support}
              description="Your IT support system and responsiveness"
              icon={<Users className="h-5 w-5" />}
              strengths={["Ticketing system implemented", "Basic self-service options available"]}
              weaknesses={["Limited after-hours support", "Manual resolution processes"]}
              answerData={assessment.answers}
              questionId="support_resources"
            />
            <CategoryCard
              title="Data Management"
              score={scoreDetails.categories.dataManagement}
              description="Your data backup, recovery and storage practices"
              icon={<Database className="h-5 w-5" />}
              strengths={["Regular backup schedule", "Basic data retention policies"]}
              weaknesses={["Untested recovery procedures", "Manual backup verification"]}
              answerData={assessment.answers}
              questionId="data_management"
            />
            <CategoryCard
              title="Business Alignment"
              score={scoreDetails.categories.businessAlignment}
              description="How well IT supports business objectives"
              icon={<BarChart className="h-5 w-5" />}
              strengths={["IT included in business planning", "Regular stakeholder meetings"]}
              weaknesses={["Reactive rather than strategic approaches", "Limited ROI measurement"]}
              answerData={assessment.answers}
              questionId="business_alignment"
            />
            <CategoryCard
              title="Overall Performance"
              score={calculateCategoryScore(assessment, 'general_performance')}
              description="How your IT ecosystem supports daily operations"
              icon={<Activity className="h-5 w-5" />}
              strengths={["Core business applications operational", "Basic user training provided"]}
              weaknesses={["Performance bottlenecks during peak times", "Limited automation capabilities"]}
              answerData={assessment.answers}
              questionId="general_performance"
            />
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {recommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical <strong>Progress</strong></CardTitle>
              <CardDescription>
                Your IT health score over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {historicalData.length > 1 ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={historicalData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" angle={-45} textAnchor="end" height={50} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="score"
                        name="Overall Score"
                        stroke="var(--color-gold)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="mb-4 h-20 w-20 rounded-full bg-muted/30 flex items-center justify-center">
                    <LineChart className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">No historical data yet</h3>
                  <p className="text-muted-foreground">
                    Complete another assessment in the future to see your progress over time.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {assessmentHistory.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Improvement <strong>Areas</strong></CardTitle>
                <CardDescription>
                  Categories with the most improvement potential
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getImprovementAreas(scoreDetails).map((area, index) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full bg-navy/10 flex items-center justify-center`}>
                          {getCategoryIcon(area.category)}
                        </div>
                        <div>
                          <p className="font-medium">{area.category}</p>
                          <p className="text-sm text-muted-foreground">Current score: {area.score}/100</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">Potential gain:</p>
                        <div className="rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-medium">
                          +{area.potential}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CategoryCard({ 
  title, 
  score, 
  description, 
  icon, 
  strengths, 
  weaknesses,
  answerData,
  questionId
}: { 
  title: string;
  score: number;
  description: string;
  icon: React.ReactNode;
  strengths: string[];
  weaknesses: string[];
  answerData: Record<string, string>;
  questionId: string;
}) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-navy/10 h-10 w-10 rounded-full flex items-center justify-center">
              {icon}
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-muted">
            <span className="text-lg font-medium">{score}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full ${getScoreColorClass(score)}`} 
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        <div className={`overflow-hidden transition-all ${expanded ? 'max-h-96' : 'max-h-0'}`}>
          <div className="pt-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2 text-green-600 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Strengths
              </h4>
              <ul className="text-sm space-y-1 pl-6 list-disc">
                {strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-amber-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Areas for Improvement
              </h4>
              <ul className="text-sm space-y-1 pl-6 list-disc">
                {weaknesses.map((weakness, i) => (
                  <li key={i}>{weakness}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Your Response</h4>
              <div className="p-3 bg-muted/30 rounded-md text-sm">
                <p>{getQuestionResponseLabel(answerData[questionId], questionId)}</p>
              </div>
            </div>
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)} 
          className="w-full mt-2 flex items-center justify-center"
        >
          {expanded ? "Show Less" : "Show Details"}
          <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </Button>
      </CardContent>
    </Card>
  );
}

function RecommendationCard({ recommendation }: { recommendation: AssessmentRecommendation }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              recommendation.priority === 'high' 
                ? 'bg-red-100 text-red-600' 
                : recommendation.priority === 'medium'
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-blue-100 text-blue-600'
            }`}>
              <Flag className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-medium">{recommendation.title}</h3>
              <div className={`text-xs px-2 py-0.5 rounded-full ${
                recommendation.priority === 'high' 
                  ? 'bg-red-100 text-red-600' 
                  : recommendation.priority === 'medium'
                    ? 'bg-amber-100 text-amber-600'
                    : 'bg-blue-100 text-blue-600'
              }`}>
                {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">{recommendation.description}</p>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <p className="font-medium mb-1">Benefit</p>
                <div className="flex items-center gap-1 text-green-600">
                  <Award className="h-4 w-4" />
                  <span>{recommendation.benefit}</span>
                </div>
              </div>
              
              {recommendation.timeEstimate && (
                <div>
                  <p className="font-medium mb-1">Time to Implement</p>
                  <div className="flex items-center gap-1 text-navy">
                    <Clock className="h-4 w-4" />
                    <span>{recommendation.timeEstimate}</span>
                  </div>
                </div>
              )}
              
              {recommendation.costEstimate && (
                <div>
                  <p className="font-medium mb-1">Estimated Investment</p>
                  <div className="flex items-center gap-1 text-navy">
                    <Coins className="h-4 w-4" />
                    <span>{recommendation.costEstimate}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-shrink-0 flex md:flex-col gap-2 mt-4 md:mt-0">
            <Button className="bg-gold hover:bg-gold/90">View Solutions</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper functions
function calculateOverallScore(result: AssessmentResult): number {
  // Convert maturity level to score (basic=30-50, stable=51-75, smart=76-100)
  const baseScores = {
    basic: 40,
    stable: 65,
    smart: 85
  };
  
  // Adjust score based on breakdown
  const totalResponses = 
    result.scoreBreakdown.high + 
    result.scoreBreakdown.medium + 
    result.scoreBreakdown.low + 
    result.scoreBreakdown.neutral;
  
  const baseScore = baseScores[result.maturityLevel];
  
  // Adjust score based on distribution of high/medium/low responses
  let adjustment = 0;
  if (totalResponses > 0) {
    const highPercentage = result.scoreBreakdown.high / totalResponses;
    const lowPercentage = result.scoreBreakdown.low / totalResponses;
    
    adjustment = (highPercentage * 10) - (lowPercentage * 10);
  }
  
  return Math.min(100, Math.max(1, Math.round(baseScore + adjustment)));
}

function calculateCategoryScore(assessment: SavedAssessment, categoryId: string): number {
  // Mapping of answer values to scores
  const scoreMap: Record<string, number> = {
    // Security confidence
    "very_confident": 90,
    "somewhat_confident": 70,
    "not_confident": 35,
    "unsure": 50,
    
    // Infrastructure
    "modern_cloud": 85,
    "hybrid_mix": 65,
    "mostly_legacy": 35,
    "minimal": 20,
    
    // Support resources
    "dedicated_team": 85,
    "managed_service": 75,
    "part_time": 50,
    "as_needed": 30,
    
    // Data management
    "automated": 90,
    "regular": 70,
    "inconsistent": 40,
    "minimal": 20,
    
    // Business alignment
    "strategic": 90,
    "supportive": 70,
    "disconnect": 40,
    "hindrance": 20,
    
    // General performance
    "strong_asset": 85,
    "could_be_better": 60,
    "firefighting": 30,
    "not_sure": 50,
    
    // Biggest challenge (less directly mappable, so more even scores)
    "reliability": 60,
    "security": 60,
    "costs": 60,
    "innovation": 65
  };
  
  const answer = assessment.answers[categoryId];
  
  if (answer && scoreMap[answer]) {
    return scoreMap[answer];
  }
  
  // Default score if answer is not found
  return 50;
}

function getScoreColorClass(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-green-400";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
}

function getMaurityLevelName(level: "basic" | "stable" | "smart"): string {
  switch (level) {
    case "basic": return "Basic";
    case "stable": return "Stable";
    case "smart": return "Smart";
    default: return "Unknown";
  }
}

function getMaturityDescription(level: "basic" | "stable" | "smart"): string {
  switch (level) {
    case "basic":
      return "Your IT environment meets fundamental needs but has significant room for improvement. Focus on addressing security gaps and establishing consistent processes.";
    case "stable":
      return "Your IT environment is reliable but not fully optimized. Look for opportunities to leverage technology for competitive advantage rather than just support.";
    case "smart":
      return "Your IT environment is a strategic asset that enables business growth. Continue to refine and expand your technology capabilities to stay ahead.";
    default:
      return "";
  }
}

function getImprovementAreas(scoreDetails: AssessmentScoreDetails) {
  const categories = [
    { category: "Security", score: scoreDetails.categories.security },
    { category: "Infrastructure", score: scoreDetails.categories.infrastructure },
    { category: "Support Resources", score: scoreDetails.categories.support },
    { category: "Data Management", score: scoreDetails.categories.dataManagement },
    { category: "Business Alignment", score: scoreDetails.categories.businessAlignment }
  ];
  
  // Sort by lowest score first
  const sortedCategories = [...categories].sort((a, b) => a.score - b.score);
  
  // Take the lowest 3 scores and calculate potential improvement
  return sortedCategories.slice(0, 3).map(category => ({
    ...category,
    potential: Math.round((100 - category.score) * 0.3) // Assume 30% of gap is achievable
  }));
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "Security":
      return <Shield className="h-4 w-4 text-navy" />;
    case "Infrastructure":
      return <Server className="h-4 w-4 text-navy" />;
    case "Support Resources":
      return <Users className="h-4 w-4 text-navy" />;
    case "Data Management":
      return <Database className="h-4 w-4 text-navy" />;
    case "Business Alignment":
      return <BarChart className="h-4 w-4 text-navy" />;
    default:
      return <Activity className="h-4 w-4 text-navy" />;
  }
}

function generateRecommendations(assessment: SavedAssessment): AssessmentRecommendation[] {
  const recommendations: AssessmentRecommendation[] = [];
  
  // Add recommendations based on specific answers
  if (assessment.answers.security_confidence === "not_confident" || assessment.answers.security_confidence === "unsure") {
    recommendations.push({
      id: "security-audit",
      title: "Conduct a security audit",
      description: "Perform a comprehensive security assessment to identify vulnerabilities and establish a baseline.",
      priority: "high",
      benefit: "Identify critical security gaps before they're exploited",
      timeEstimate: "2-3 weeks",
      costEstimate: "R15,000 - R30,000"
    });
  }
  
  if (assessment.answers.data_management === "inconsistent" || assessment.answers.data_management === "minimal") {
    recommendations.push({
      id: "backup-system",
      title: "Implement automated backup system",
      description: "Deploy a reliable automated backup solution with regular testing and verification.",
      priority: "high",
      benefit: "Protect against data loss and ensure business continuity",
      timeEstimate: "1-2 weeks",
      costEstimate: "R8,000 - R20,000 annually"
    });
  }
  
  if (assessment.answers.infrastructure === "mostly_legacy" || assessment.answers.infrastructure === "minimal") {
    recommendations.push({
      id: "infrastructure-modernization",
      title: "Infrastructure modernization plan",
      description: "Develop a phased approach to update critical infrastructure components.",
      priority: "medium",
      benefit: "Improved reliability and performance, reduced maintenance costs",
      timeEstimate: "3-6 months",
      costEstimate: "R50,000 - R150,000"
    });
  }
  
  if (assessment.answers.support_resources === "as_needed" || assessment.answers.support_resources === "part_time") {
    recommendations.push({
      id: "managed-services",
      title: "Engage managed service provider",
      description: "Partner with a reliable managed service provider for consistent IT support.",
      priority: "medium",
      benefit: "Proactive maintenance and faster issue resolution",
      timeEstimate: "1 month",
      costEstimate: "R15,000 - R25,000 monthly"
    });
  }
  
  if (assessment.answers.business_alignment === "disconnect" || assessment.answers.business_alignment === "hindrance") {
    recommendations.push({
      id: "it-strategy",
      title: "Develop IT strategy aligned with business goals",
      description: "Create a strategic IT roadmap that directly supports business objectives.",
      priority: "medium",
      benefit: "Improved ROI on technology investments",
      timeEstimate: "1-2 months",
      costEstimate: "R20,000 - R40,000"
    });
  }
  
  // Add some general recommendations that apply to most assessments
  recommendations.push({
    id: "security-training",
    title: "Security awareness training",
    description: "Conduct regular security awareness training for all employees.",
    priority: assessment.result.maturityLevel === "basic" ? "high" : "medium",
    benefit: "Reduced risk of social engineering attacks",
    timeEstimate: "Ongoing",
    costEstimate: "R5,000 - R10,000 annually"
  });
  
  recommendations.push({
    id: "documentation",
    title: "IT systems documentation",
    description: "Create comprehensive documentation for all IT systems and processes.",
    priority: "low",
    benefit: "Improved knowledge transfer and faster troubleshooting",
    timeEstimate: "2-4 weeks",
    costEstimate: "Internal resource time"
  });
  
  return recommendations;
}

function getQuestionResponseLabel(answerValue: string, questionId: string): string {
  // This is a simplified version - in a real application, you would have a more structured way
  // to get question and answer texts
  
  const answerMappings: Record<string, Record<string, string>> = {
    "general_performance": {
      "strong_asset": "You indicated your IT is a strong asset that actively helps your business grow and succeed.",
      "could_be_better": "You indicated that your IT works, but could be better - basic needs are met but you're missing opportunities.",
      "firefighting": "You indicated that you're always firefighting - spending more time fixing problems than working.",
      "not_sure": "You indicated you're not sure - you don't have enough visibility into your IT performance."
    },
    "security_confidence": {
      "very_confident": "You are very confident in your IT security with robust measures in place.",
      "somewhat_confident": "You are somewhat confident in your IT security, but recognize there are gaps.",
      "not_confident": "You are not confident in your IT security and feel vulnerable.",
      "unsure": "You are unsure where you stand regarding IT security."
    },
    "infrastructure": {
      "modern_cloud": "You have modern, cloud-based infrastructure with up-to-date equipment.",
      "hybrid_mix": "You have a hybrid mix of old and new infrastructure components.",
      "mostly_legacy": "You rely primarily on older hardware and software in your infrastructure.",
      "minimal": "You have minimal infrastructure with basic equipment and limited capabilities."
    },
    "support_resources": {
      "dedicated_team": "You have a dedicated internal IT team managing your technology.",
      "managed_service": "You outsource to an external IT partner for managed services.",
      "part_time": "IT is handled by staff with other primary roles in your organization.",
      "as_needed": "You get IT help only when something breaks."
    },
    "data_management": {
      "automated": "You have automated, regular backups with testing procedures.",
      "regular": "You have regular backups, but they are rarely tested.",
      "inconsistent": "Your backup processes are inconsistent or manual.",
      "minimal": "You have minimal or no structured backup system."
    },
    "business_alignment": {
      "strategic": "Your IT is a strategic enabler that actively supports growth and innovation.",
      "supportive": "Your IT is supportive but reactive - meeting needs but not driving business forward.",
      "disconnect": "There's a disconnect between IT and business objectives in your organization.",
      "hindrance": "Your IT hinders business progress and is more of a roadblock than enabler."
    }
  };
  
  if (answerMappings[questionId] && answerMappings[questionId][answerValue]) {
    return answerMappings[questionId][answerValue];
  }
  
  return "No response provided";
}

import { Users, Clock, Database, Shield, Activity, BarChart, Coins } from "lucide-react";
