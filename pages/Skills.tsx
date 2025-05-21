
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { SkillsOverview } from "../components/skills/SkillsOverview";
import { SkillPathsExplorer } from "../components/skills/SkillPathsExplorer";
import { CertificationsManager } from "../components/skills/CertificationsManager";
import { LmsIntegration } from "../components/skills/LmsIntegration";
import { 
  BarChart3, 
  BookOpen, 
  Award, 
  Search, 
  Settings, 
  Users, 
  Laptop,
  Download,
  TrendingUp,
  GraduationCap,
  FileText
} from "lucide-react";
import { 
  mockUserSkills, 
  mockUserSkillStatistics, 
  mockLearningPaths,
  mockCertifications,
  mockSkillRecommendations
} from "../lib/mockSkillsData";
import { 
  mockCourses, 
  mockUserProgress,
  mockCertifications as mockLmsCertifications
} from "../lib/mockLmsData";

export function Skills() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card className="bg-gradient-to-br from-navy to-navy/90 text-white overflow-hidden border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-gold" />
              </div>
            </div>
            
            <div className="flex-grow">
              <h3 className="text-xl font-medium mb-2">IT Skills Assessment</h3>
              <p className="text-white/80 mb-3">
                Take our comprehensive assessment to evaluate your IT skills and get personalized learning recommendations.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gold"></div>
                  <span className="text-sm text-white/80">45 minute assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gold"></div>
                  <span className="text-sm text-white/80">Detailed results</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gold"></div>
                  <span className="text-sm text-white/80">Personalized learning path</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  className="bg-gold hover:bg-gold/90 text-white"
                >
                  Start Assessment
                </Button>
                
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Skills Overview
            </TabsTrigger>
            <TabsTrigger value="learning" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Learning Paths
            </TabsTrigger>
            <TabsTrigger value="lms" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              LMS
            </TabsTrigger>
            <TabsTrigger value="certifications" className="gap-2">
              <Award className="h-4 w-4" />
              Certifications
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Users className="h-4 w-4" />
              Team Skills
            </TabsTrigger>
          </TabsList>
          
          <div className="relative hidden md:flex">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search skills, courses, certifications..."
              className="pl-10 h-10 rounded-md border border-input bg-input-background w-72"
            />
          </div>
        </div>

        <TabsContent value="overview">
          <SkillsOverview 
            skills={mockUserSkills} 
            statistics={mockUserSkillStatistics} 
          />
        </TabsContent>
        
        <TabsContent value="learning">
          <SkillPathsExplorer 
            learningPaths={mockLearningPaths}
            recommendations={mockSkillRecommendations}
          />
        </TabsContent>
        
        <TabsContent value="lms">
          <LmsIntegration 
            enrolledCourses={mockCourses.filter(course => mockUserProgress.enrolledCourses.includes(course.id))}
            courseProgress={mockUserProgress}
          />
        </TabsContent>
        
        <TabsContent value="certifications">
          <CertificationsManager
            certifications={mockCertifications}
          />
        </TabsContent>
        
        <TabsContent value="team">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  Manage Team
                </Button>
                <Button className="bg-gold hover:bg-gold/90 gap-2">
                  <Laptop className="h-4 w-4" />
                  Team Assessment
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Team Skills Visualization</CardTitle>
                <CardDescription>Comprehensive view of your team's skills matrix</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-12 flex flex-col items-center justify-center border rounded-lg">
                  <Users className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium">Team Skills Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md text-center mt-2 mb-6">
                    We're building tools to help you visualize, manage, and develop your team's skills
                  </p>
                  <Button>Learn More</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
