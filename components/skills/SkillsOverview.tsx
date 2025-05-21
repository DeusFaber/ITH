
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  BarChart, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Search, 
  Filter, 
  BarChart3, 
  Lightbulb, 
  CheckCircle, 
  AlertCircle, 
  LineChart, 
  PieChart,
  User,
  Users,
  Calendar,
  BookOpenCheck
} from "lucide-react";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  Legend
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Skill, 
  SkillLevel, 
  SkillCategory, 
  SkillStatistics, 
  mockUserSkills, 
  mockUserSkillStatistics,
  getSkillCategoryName,
  getSkillLevelName,
  getSkillLevelColor,
  getSkillCategoryColor
} from "../../lib/mockSkillsData";

// Define the props interface
interface SkillsOverviewProps {
  skills?: Skill[];
  statistics?: SkillStatistics;
}

export function SkillsOverview({ 
  skills = mockUserSkills,
  statistics = mockUserSkillStatistics 
}: SkillsOverviewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<SkillCategory | "all">("all");
  const [levelFilter, setLevelFilter] = useState<SkillLevel | "all">("all");

  // Filter skills based on search query and filters
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = 
      searchQuery === "" || 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getSkillCategoryName(skill.category).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || skill.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || skill.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Data for skills by category chart
  const skillsByCategoryData = () => {
    const categories: Record<SkillCategory, number> = {
      infrastructure: 0,
      security: 0,
      networking: 0,
      cloud: 0,
      development: 0,
      data: 0,
      leadership: 0,
      project_management: 0,
      support: 0
    };
    
    skills.forEach(skill => {
      categories[skill.category]++;
    });
    
    return Object.entries(categories)
      .filter(([_, count]) => count > 0)
      .map(([category, count]) => ({
        name: getSkillCategoryName(category as SkillCategory),
        value: count
      }));
  };

  // Data for skills by level chart
  const skillsByLevelData = [
    { name: "Expert", value: statistics.expertSkills, color: "#EDB600" },
    { name: "Advanced", value: statistics.advancedSkills, color: "#9333EA" },
    { name: "Intermediate", value: statistics.intermediateSkills, color: "#22C55E" },
    { name: "Beginner", value: statistics.beginnerSkills, color: "#3B82F6" }
  ];

  // Colors for pie chart
  const CATEGORY_COLORS = [
    "#FF246B", // Primary (pink)
    "#133258", // Navy
    "#EDB600", // Gold
    "#22C55E", // Green
    "#3B82F6", // Blue
    "#F59E0B", // Amber
    "#8B5CF6", // Violet
    "#EC4899", // Pink
    "#06B6D4", // Cyan
  ];

  // Helper function to format numbers with suffixes
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  // Mock progress data for top skills
  const topSkills = skills
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1>Skills <strong>Dashboard</strong></h1>
          <p className="text-muted-foreground">
            Track, develop, and manage your IT skills portfolio
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Learning Center
          </Button>
          <Button variant="outline" className="gap-2">
            <Award className="h-4 w-4" />
            Certifications
          </Button>
          <Button className="bg-gold hover:bg-gold/90 gap-2">
            <TrendingUp className="h-4 w-4" />
            Skill Assessment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Skills</p>
                <h2 className="text-3xl font-light">{statistics.totalSkills}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpenCheck className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progression</span>
                <span className="font-medium">{statistics.skillsImprovedLastMonth} improved this month</span>
              </div>
              <Progress value={statistics.skillsImprovedLastMonth / statistics.totalSkills * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Expert Skills</p>
                <h2 className="text-3xl font-light">{statistics.expertSkills}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-gold" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Distribution</span>
                <span className="font-medium">{Math.round(statistics.expertSkills / statistics.totalSkills * 100)}% of skills</span>
              </div>
              <Progress value={statistics.expertSkills / statistics.totalSkills * 100} className="h-2 bg-muted/50">
                <div className="h-full bg-gold" style={{ width: `${statistics.expertSkills / statistics.totalSkills * 100}%` }} />
              </Progress>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Certifications</p>
                <h2 className="text-3xl font-light">{statistics.certificationsActive}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-navy/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-navy" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-medium">{statistics.certificationsPending} in progress</span>
              </div>
              <Progress value={statistics.certificationsActive / (statistics.certificationsActive + statistics.certificationsPending) * 100} className="h-2 bg-muted/50">
                <div className="h-full bg-navy" style={{ width: `${statistics.certificationsActive / (statistics.certificationsActive + statistics.certificationsPending) * 100}%` }} />
              </Progress>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Recommended Courses</p>
                <h2 className="text-3xl font-light">{statistics.recommendedCourses}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Priority</span>
                <span className="font-medium">3 high priority</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Users className="h-4 w-4" />
              Team Skills
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Calendar className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          {activeTab === "skills" && (
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  className="pl-10 h-10 rounded-md border border-input bg-input-background w-full sm:w-auto min-w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Top Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Top Skills</CardTitle>
              <CardDescription>Your most developed and endorsed skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topSkills.map(skill => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.name}</span>
                          <Badge className={getSkillLevelColor(skill.level)}>
                            {getSkillLevelName(skill.level)}
                          </Badge>
                        </div>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline">{getSkillCategoryName(skill.category)}</Badge>
                          {skill.isVerified && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" /> Verified
                            </Badge>
                          )}
                          {skill.endorsed > 0 && (
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" /> {skill.endorsed} endorsements
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-2xl font-light">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Skills by Category</CardTitle>
                <CardDescription>Distribution of your skills across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={skillsByCategoryData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillsByCategoryData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} skills`, 'Count']} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Skills by Level */}
            <Card>
              <CardHeader>
                <CardTitle>Skills by Proficiency Level</CardTitle>
                <CardDescription>Distribution of your skills by expertise level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={skillsByLevelData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} skills`, 'Count']}
                        labelStyle={{ color: '#1a1a2e' }}
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: '1px solid #e5e5e5',
                          borderRadius: '6px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' 
                        }}
                      />
                      <Bar dataKey="value" name="Count">
                        {skillsByLevelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
              <CardDescription>Suggested next steps to improve your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-start gap-3">
                    <div className="p-2 rounded-full bg-amber-100">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                    </div>
                    <h4 className="font-medium">Improve Cloud Skills</h4>
                    <p className="text-sm text-muted-foreground">Your cloud computing skills are below industry average</p>
                    <Button size="sm" className="mt-auto">View Courses</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-start gap-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <h4 className="font-medium">AWS Certification</h4>
                    <p className="text-sm text-muted-foreground">You're ready to pursue AWS Certified Solutions Architect</p>
                    <Button size="sm" className="mt-auto">Start Prep</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-start gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <h4 className="font-medium">Update Assessment</h4>
                    <p className="text-sm text-muted-foreground">Reassess your cybersecurity skills to track progress</p>
                    <Button size="sm" className="mt-auto">Take Assessment</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          {/* Filter section */}
          <div className="flex flex-wrap gap-2 border-b pb-4">
            <Badge 
              variant={categoryFilter === "all" ? "default" : "outline"}
              className="cursor-pointer hover:bg-muted"
              onClick={() => setCategoryFilter("all")}
            >
              All Categories
            </Badge>
            {(["infrastructure", "security", "cloud", "networking", "data", "leadership"] as SkillCategory[]).map(category => (
              <Badge 
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                className={`cursor-pointer hover:bg-muted ${categoryFilter === category ? "" : getSkillCategoryColor(category)}`}
                onClick={() => setCategoryFilter(category)}
              >
                {getSkillCategoryName(category)}
              </Badge>
            ))}

            <div className="ml-auto flex gap-2">
              {(["all", "beginner", "intermediate", "advanced", "expert"] as (SkillLevel | "all")[]).map(level => (
                <Badge 
                  key={level}
                  variant={levelFilter === level ? "default" : "outline"}
                  className={`cursor-pointer hover:bg-muted ${levelFilter === level ? "" : level !== "all" ? getSkillLevelColor(level) : ""}`}
                  onClick={() => setLevelFilter(level)}
                >
                  {level === "all" ? "All Levels" : getSkillLevelName(level)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.length > 0 ? (
              filteredSkills.map(skill => (
                <Card key={skill.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-muted/30 p-4 border-b">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{skill.name}</h3>
                        <Badge className={getSkillLevelColor(skill.level)}>
                          {getSkillLevelName(skill.level)}
                        </Badge>
                      </div>
                      <Badge variant="outline">{getSkillCategoryName(skill.category)}</Badge>
                      
                      <div className="mt-4 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Proficiency</span>
                          <span className="font-medium">{skill.progress}%</span>
                        </div>
                        <Progress value={skill.progress} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{skill.endorsed} endorsements</span>
                        </div>
                        
                        {skill.lastAssessed && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Last assessed: {new Date(skill.lastAssessed).toLocaleDateString()}</span>
                          </div>
                        )}
                        
                        {skill.isVerified && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" /> Verified
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm">Improve</Button>
                        <Button size="sm">Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center border rounded-lg">
                <Search className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No skills found</h3>
                <p className="text-muted-foreground mt-1 mb-4">Try adjusting your search or filters</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                    setLevelFilter("all");
                  }}>
                    Clear filters
                  </Button>
                  <Button>Add new skill</Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Skills Comparison</CardTitle>
              <CardDescription>Compare your skills with your team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-12 flex flex-col items-center justify-center border rounded-lg">
                <Users className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">Team Comparison Coming Soon</h3>
                <p className="text-muted-foreground max-w-md text-center mt-2 mb-6">
                  See how your skills compare to your team and identify collaboration opportunities
                </p>
                <Button>Learn More</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Development History</CardTitle>
              <CardDescription>Track your skill growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-12 flex flex-col items-center justify-center border rounded-lg">
                <LineChart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">Skill History Coming Soon</h3>
                <p className="text-muted-foreground max-w-md text-center mt-2 mb-6">
                  Track your skill development journey with detailed progress metrics and milestones
                </p>
                <Button>Learn More</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
