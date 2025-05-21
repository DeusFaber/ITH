
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { 
  Award, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  FileText, 
  ExternalLink,
  Download,
  Search,
  Plus,
  Users,
  BarChart,
  Filter,
  Trash2
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { 
  Certification,
  mockCertifications,
  mockUserSkills
} from "../../lib/mockSkillsData";

interface CertificationsManagerProps {
  certifications?: Certification[];
}

export function CertificationsManager({
  certifications = mockCertifications
}: CertificationsManagerProps) {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [issuerFilter, setIssuerFilter] = useState<string>("all");
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Filter certifications based on active tab, search query, and issuer filter
  const filteredCertifications = certifications.filter(certification => {
    // Filter by tab (active/earned vs pending)
    if (activeTab === "active" && !certification.earnedDate) return false;
    if (activeTab === "pending" && certification.earnedDate) return false;
    
    // Filter by search query
    const matchesSearch = 
      searchQuery === "" || 
      certification.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certification.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certification.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by issuer
    const matchesIssuer = issuerFilter === "all" || certification.issuer === issuerFilter;
    
    return matchesSearch && matchesIssuer;
  });

  // Get all unique issuers for filter dropdown
  const uniqueIssuers = Array.from(new Set(certifications.map(cert => cert.issuer)));

  // Group active certifications by issuer
  const certificationsByIssuer = filteredCertifications.reduce((groups, certification) => {
    const issuer = certification.issuer;
    if (!groups[issuer]) {
      groups[issuer] = [];
    }
    groups[issuer].push(certification);
    return groups;
  }, {} as Record<string, Certification[]>);

  // Calculate certification stats
  const activeCertifications = certifications.filter(cert => cert.earnedDate && (!cert.expiryDate || new Date(cert.expiryDate) > new Date())).length;
  const expiringCertifications = certifications.filter(cert => cert.expiryDate && new Date(cert.expiryDate) > new Date() && new Date(cert.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)).length;
  const expiredCertifications = certifications.filter(cert => cert.expiryDate && new Date(cert.expiryDate) < new Date()).length;
  const pendingCertifications = certifications.filter(cert => !cert.earnedDate).length;

  // Function to find skill name by ID
  const getSkillNameById = (skillId: string) => {
    const skill = mockUserSkills.find(s => s.id === skillId);
    return skill ? skill.name : "Unknown Skill";
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate?: string) => {
    if (!expiryDate) return Infinity;
    const expiryTime = new Date(expiryDate).getTime();
    const now = Date.now();
    return Math.ceil((expiryTime - now) / (1000 * 60 * 60 * 24));
  };

  // Get status badge for certification
  const getCertificationStatusBadge = (certification: Certification) => {
    if (!certification.earnedDate) {
      return <Badge variant="outline">Not Started</Badge>;
    }

    if (!certification.expiryDate) {
      return <Badge className="bg-green-100 text-green-800">Active (No Expiry)</Badge>;
    }

    const daysUntilExpiry = getDaysUntilExpiry(certification.expiryDate);
    
    if (daysUntilExpiry < 0) {
      return <Badge variant="destructive">Expired</Badge>;
    }
    
    if (daysUntilExpiry <= 90) {
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
        Expires in {daysUntilExpiry} days
      </Badge>;
    }
    
    return <Badge className="bg-green-100 text-green-800">
      Active
    </Badge>;
  };

  // Open certification details dialog
  const openCertificationDetails = (certification: Certification) => {
    setSelectedCertification(certification);
    setShowDetailsDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1>Professional <strong>Certifications</strong></h1>
          <p className="text-muted-foreground">
            Manage your IT certifications and credentials
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Renewal Calendar
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Export List
          </Button>
          <Button className="bg-gold hover:bg-gold/90 gap-2">
            <Plus className="h-4 w-4" />
            Add Certification
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active</p>
                <h2 className="text-3xl font-light">{activeCertifications}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Expiring Soon</p>
                <h2 className="text-3xl font-light">{expiringCertifications}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Expired</p>
                <h2 className="text-3xl font-light">{expiredCertifications}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pending</p>
                <h2 className="text-3xl font-light">{pendingCertifications}</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Active & Earned
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              <Award className="h-4 w-4" />
              Pending & Goals
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <BarChart className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search certifications..."
                className="pl-10 h-10 rounded-md border border-input bg-input-background w-full sm:w-auto min-w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="active" className="space-y-6">
          {Object.keys(certificationsByIssuer).length > 0 ? (
            Object.entries(certificationsByIssuer).map(([issuer, certs]) => (
              <Card key={issuer}>
                <CardHeader>
                  <CardTitle className="text-xl">{issuer}</CardTitle>
                  <CardDescription>{certs.length} certification{certs.length !== 1 ? 's' : ''}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certs.map(certification => (
                      <Card key={certification.id} className="overflow-hidden border-muted">
                        <div className="relative h-40 overflow-hidden bg-gradient-to-r from-slate-50 to-gray-100">
                          {certification.image ? (
                            <img 
                              src={certification.image} 
                              alt={certification.name} 
                              className="w-full h-full object-contain p-4"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Award className="h-20 w-20 text-muted-foreground opacity-20" />
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            {getCertificationStatusBadge(certification)}
                          </div>
                        </div>
                        <CardContent className="pt-4">
                          <h3 className="font-medium line-clamp-2">{certification.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1 mb-3 line-clamp-2">{certification.description}</p>
                          
                          <div className="space-y-2 text-sm">
                            {certification.credentialId && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Credential ID:</span>
                                <span className="font-medium">{certification.credentialId}</span>
                              </div>
                            )}
                            {certification.earnedDate && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Earned:</span>
                                <span>{formatDate(certification.earnedDate)}</span>
                              </div>
                            )}
                            {certification.expiryDate && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Expires:</span>
                                <span>{formatDate(certification.expiryDate)}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-3">
                            {certification.skillsCovered.slice(0, 2).map(skillId => (
                              <Badge key={skillId} variant="outline" className="text-xs">
                                {getSkillNameById(skillId)}
                              </Badge>
                            ))}
                            {certification.skillsCovered.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{certification.skillsCovered.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4 bg-muted/10">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1" 
                            onClick={() => openCertificationDetails(certification)}
                          >
                            Details
                          </Button>
                          
                          {certification.earnedDate && (
                            <Button 
                              size="sm" 
                              className="gap-1 bg-navy hover:bg-navy/90"
                            >
                              <Download className="h-4 w-4" />
                              Certificate
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg">
              <Award className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium">No certifications found</h3>
              <p className="text-muted-foreground max-w-md mt-2 mb-6">
                {activeTab === "active" 
                  ? "You don't have any active certifications matching your search criteria."
                  : "You don't have any pending certification goals."}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setIssuerFilter("all");
                }}>
                  Clear filters
                </Button>
                <Button>Add Certification</Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          {Object.keys(certificationsByIssuer).length > 0 ? (
            Object.entries(certificationsByIssuer).map(([issuer, certs]) => (
              <Card key={issuer}>
                <CardHeader>
                  <CardTitle className="text-xl">{issuer}</CardTitle>
                  <CardDescription>{certs.length} certification{certs.length !== 1 ? 's' : ''} planned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certs.map(certification => (
                      <Card key={certification.id} className="overflow-hidden border-muted">
                        <div className="relative h-40 overflow-hidden bg-gradient-to-r from-slate-50 to-gray-100">
                          {certification.image ? (
                            <img 
                              src={certification.image} 
                              alt={certification.name} 
                              className="w-full h-full object-contain p-4 opacity-70"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Award className="h-20 w-20 text-muted-foreground opacity-20" />
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            <Badge variant="outline">Planned</Badge>
                          </div>
                        </div>
                        <CardContent className="pt-4">
                          <h3 className="font-medium line-clamp-2">{certification.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1 mb-3 line-clamp-2">{certification.description}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {certification.skillsCovered.map(skillId => (
                              <Badge key={skillId} variant="outline" className="text-xs">
                                {getSkillNameById(skillId)}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Readiness</span>
                              <span>40%</span>
                            </div>
                            <Progress value={40} className="h-2" />
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4 bg-muted/10">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1 text-destructive hover:text-destructive" 
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                          
                          <Button 
                            size="sm" 
                            className="gap-1 bg-navy hover:bg-navy/90"
                          >
                            Start Preparation
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg">
              <Award className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium">No certification goals found</h3>
              <p className="text-muted-foreground max-w-md mt-2 mb-6">
                You haven't set any certification goals yet. Add certifications you want to pursue.
              </p>
              <Button>Add Certification Goal</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Certification Insights</CardTitle>
              <CardDescription>Analysis of your certification portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-12 flex flex-col items-center justify-center border rounded-lg">
                <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">Insights Coming Soon</h3>
                <p className="text-muted-foreground max-w-md text-center mt-2 mb-6">
                  We're working on analyzing your certification data to provide valuable insights and recommendations
                </p>
                <Button>View Active Certifications</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Certification Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-lg">
          {selectedCertification && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCertification.name}</DialogTitle>
                <DialogDescription>
                  Issued by {selectedCertification.issuer}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex justify-center py-4">
                  {selectedCertification.image ? (
                    <img 
                      src={selectedCertification.image} 
                      alt={selectedCertification.name} 
                      className="h-48 object-contain"
                    />
                  ) : (
                    <div className="h-48 w-48 rounded-full bg-muted flex items-center justify-center">
                      <Award className="h-32 w-32 text-muted-foreground opacity-20" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedCertification.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {selectedCertification.earnedDate && (
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Date Earned</h4>
                      <p className="text-sm">{formatDate(selectedCertification.earnedDate)}</p>
                    </div>
                  )}
                  
                  {selectedCertification.expiryDate && (
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Expiry Date</h4>
                      <p className="text-sm">{formatDate(selectedCertification.expiryDate)}</p>
                    </div>
                  )}
                  
                  {selectedCertification.credentialId && (
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Credential ID</h4>
                      <p className="text-sm">{selectedCertification.credentialId}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Skills Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCertification.skillsCovered.map(skillId => (
                      <Badge key={skillId} variant="outline">
                        {getSkillNameById(skillId)}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Status</h4>
                  <div>{getCertificationStatusBadge(selectedCertification)}</div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  className="sm:flex-1"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Verify Online
                </Button>
                
                {selectedCertification.earnedDate && (
                  <Button 
                    className="sm:flex-1 bg-navy hover:bg-navy/90"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
