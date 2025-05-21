
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Search, Users, Award, Filter, CheckCircle, MapPin, Building, UserPlus } from "lucide-react";
import { mockUsers } from "../lib/mockPeopleData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export function People() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  
  // Get unique departments, locations, and skills from user data
  const departments = ["all", ...new Set(mockUsers.map(user => user.department))];
  const locations = ["all", ...new Set(mockUsers.map(user => user.location))];
  const allSkills = mockUsers.flatMap(user => user.skills.map(skill => skill.name));
  const skills = ["all", ...new Set(allSkills)];
  
  // Filter users based on search term and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = departmentFilter === "all" || user.department === departmentFilter;
    const matchesLocation = locationFilter === "all" || user.location === locationFilter;
    const matchesSkill = skillFilter === "all" || user.skills.some(skill => skill.name === skillFilter);
    
    return matchesSearch && matchesDepartment && matchesLocation && matchesSkill;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite People
        </Button>
      </div>
      
      <Tabs defaultValue="directory" className="space-y-6">
        <TabsList>
          <TabsTrigger value="directory">Directory</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="leaderboard">Skill Leaderboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="directory" className="space-y-6">
          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search people by name, title, or skill..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <Building className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px]">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === "all" ? "All Locations" : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="w-[180px]">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Skill" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map(skill => (
                    <SelectItem key={skill} value={skill}>
                      {skill === "all" ? "All Skills" : skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* User Directory */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-muted-foreground">{user.title}</p>
                      
                      <div className="flex items-center mt-1 gap-2">
                        <Building className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{user.department}</span>
                      </div>
                      
                      <div className="flex items-center mt-1 gap-2">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{user.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Top Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.slice(0, 3).map(skill => (
                        <Badge key={skill.id} variant="outline" className="rounded-full">
                          {skill.name}
                        </Badge>
                      ))}
                      {user.skills.length > 3 && (
                        <Badge variant="outline" className="rounded-full">
                          +{user.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Recent Achievements</p>
                    <div className="flex gap-2">
                      {user.recentAchievements.slice(0, 3).map((achievement, idx) => (
                        <div key={idx} className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center" title={achievement.name}>
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">View Profile</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No people found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="teams" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Teams</CardTitle>
              <CardDescription>
                Browse teams and their members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "IT Support", members: 12, lead: "Sarah Johnson" },
                  { name: "Marketing", members: 8, lead: "Michael Chen" },
                  { name: "Finance", members: 6, lead: "Emily Rodriguez" },
                  { name: "Development", members: 15, lead: "David Kim" }
                ].map((team, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{team.name}</h3>
                        <p className="text-sm text-muted-foreground">Team Lead: {team.lead}</p>
                      </div>
                      <Badge>{team.members} members</Badge>
                    </div>
                    
                    <div className="flex -space-x-2">
                      {Array(Math.min(5, team.members)).fill(0).map((_, idx) => (
                        <Avatar key={idx} className="border-2 border-background">
                          <AvatarFallback>{idx + 1}</AvatarFallback>
                        </Avatar>
                      ))}
                      
                      {team.members > 5 && (
                        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                          <span className="text-xs">+{team.members - 5}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">View Team</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Leaderboard</CardTitle>
              <CardDescription>
                Top performers by skill area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cybersecurity" className="space-y-4">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="cybersecurity">Cybersecurity</TabsTrigger>
                  <TabsTrigger value="office365">Office 365</TabsTrigger>
                  <TabsTrigger value="support">IT Support</TabsTrigger>
                  <TabsTrigger value="automation">Automation</TabsTrigger>
                </TabsList>
                
                {["cybersecurity", "office365", "support", "automation"].map(skill => (
                  <TabsContent key={skill} value={skill} className="space-y-4">
                    {mockUsers
                      .filter(user => 
                        user.skills.some(s => 
                          s.name.toLowerCase().includes(skill.toLowerCase())
                        )
                      )
                      .sort((a, b) => {
                        const aSkill = a.skills.find(s => 
                          s.name.toLowerCase().includes(skill.toLowerCase())
                        );
                        const bSkill = b.skills.find(s => 
                          s.name.toLowerCase().includes(skill.toLowerCase())
                        );
                        return (bSkill?.level || 0) - (aSkill?.level || 0);
                      })
                      .slice(0, 5)
                      .map((user, index) => {
                        const userSkill = user.skills.find(s => 
                          s.name.toLowerCase().includes(skill.toLowerCase())
                        );
                        
                        return (
                          <div key={user.id} className="flex items-center p-3 rounded-md border">
                            <div className="w-8 h-8 flex items-center justify-center font-semibold mr-4">
                              #{index + 1}
                            </div>
                            <Avatar className="h-10 w-10 mr-4">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <h4 className="font-medium">{user.name}</h4>
                              <p className="text-sm text-muted-foreground">{user.title}</p>
                            </div>
                            <div className="flex items-center">
                              {userSkill && (
                                <Badge className="mr-4">
                                  Level {userSkill.level}
                                </Badge>
                              )}
                              <div className="flex">
                                {Array(userSkill?.level || 0).fill(0).map((_, i) => (
                                  <Award key={i} className="h-4 w-4 text-primary" />
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
