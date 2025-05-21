
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { 
  Users, 
  User, 
  Mail, 
  Plus, 
  UserPlus, 
  Clock, 
  MessageSquare, 
  Link2, 
  Lock, 
  MoreHorizontal,
  X, 
  Check, 
  Trash2, 
  Edit3,
  BarChart3
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner@2.0.3";
import { Team, TeamMember, TeamInvitation, AssessmentComment } from "../../lib/assessmentTypes";
import { formatDate, calculateDaysAgo } from "../../lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Mock user data
const currentUser = {
  id: "u-123456",
  firstName: "John",
  lastName: "Smith",
  email: "john@acme.com",
  role: "IT Manager",
  company: "Acme Inc.",
  avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
};

// Mock team data for this example
const mockTeams: Team[] = [
  {
    id: "team-1",
    name: "IT Department",
    createdAt: new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString(),
    ownerId: currentUser.id,
    description: "Main IT team responsible for infrastructure and support",
    members: [
      {
        userId: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email,
        role: "owner",
        avatarUrl: currentUser.avatar,
        joinedAt: new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString(),
        lastActive: new Date().toISOString()
      },
      {
        userId: "u-789012",
        name: "Sarah Johnson",
        email: "sarah@acme.com",
        role: "admin",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        joinedAt: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
        lastActive: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString()
      },
      {
        userId: "u-345678",
        name: "Michael Lee",
        email: "michael@acme.com",
        role: "contributor",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        joinedAt: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
        lastActive: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString()
      }
    ],
    assessments: ["assessment-1", "assessment-2"]
  },
  {
    id: "team-2",
    name: "Executive Team",
    createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
    ownerId: "u-987654",
    description: "Senior leadership team",
    members: [
      {
        userId: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email,
        role: "contributor",
        avatarUrl: currentUser.avatar,
        joinedAt: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
        lastActive: new Date().toISOString()
      },
      {
        userId: "u-987654",
        name: "David Chen",
        email: "david@acme.com",
        role: "owner",
        joinedAt: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
        lastActive: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString()
      }
    ],
    assessments: []
  }
];

// Mock invitations
const mockInvitations: TeamInvitation[] = [
  {
    id: "invitation-1",
    teamId: "team-1",
    email: "alex@acme.com",
    role: "contributor",
    invitedBy: currentUser.id,
    invitedAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    status: "pending"
  },
  {
    id: "invitation-2",
    teamId: "team-2",
    email: "jennifer@acme.com",
    role: "viewer",
    invitedBy: "u-987654",
    invitedAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 9)).toISOString(),
    status: "pending"
  }
];

// Mock comments
const mockComments: AssessmentComment[] = [
  {
    id: "comment-1",
    assessmentId: "assessment-1",
    userId: "u-789012",
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "I think our security score is lower than it should be. We've implemented MFA and regular security training in the last quarter.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    questionId: "security_confidence"
  },
  {
    id: "comment-2",
    assessmentId: "assessment-1",
    userId: currentUser.id,
    userName: `${currentUser.firstName} ${currentUser.lastName}`,
    userAvatar: currentUser.avatar,
    content: "Good point, but we still need to address the outdated firewall and implement endpoint protection.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    parentId: "comment-1"
  },
  {
    id: "comment-3",
    assessmentId: "assessment-1",
    userId: "u-345678",
    userName: "Michael Lee",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "I've identified some redundant applications we could consolidate to improve our infrastructure score.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    questionId: "infrastructure"
  }
];

interface TeamAssessmentProps {
  currentUserId: string;
  onCreateAssessment?: (teamId: string) => void;
  onViewAssessment?: (assessmentId: string) => void;
}

export function TeamAssessment({ 
  currentUserId, 
  onCreateAssessment,
  onViewAssessment
}: TeamAssessmentProps) {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [invitations, setInvitations] = useState<TeamInvitation[]>(mockInvitations);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showInviteMembers, setShowInviteMembers] = useState(false);
  const [newTeamData, setNewTeamData] = useState({
    name: "",
    description: ""
  });
  const [newInviteData, setNewInviteData] = useState({
    email: "",
    role: "contributor" as "admin" | "contributor" | "viewer"
  });
  const [activeTab, setActiveTab] = useState("my-teams");

  // Select a team to view details
  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
    setActiveTab("team-details");
  };

  // Create a new team
  const handleCreateTeam = () => {
    if (!newTeamData.name.trim()) {
      toast.error("Team name is required");
      return;
    }

    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: newTeamData.name,
      description: newTeamData.description,
      createdAt: new Date().toISOString(),
      ownerId: currentUserId,
      members: [
        {
          userId: currentUserId,
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          email: currentUser.email,
          role: "owner",
          avatarUrl: currentUser.avatar,
          joinedAt: new Date().toISOString(),
          lastActive: new Date().toISOString()
        }
      ],
      assessments: []
    };

    setTeams([...teams, newTeam]);
    setNewTeamData({ name: "", description: "" });
    setShowCreateTeam(false);
    toast.success("Team created successfully");
    
    // Select the new team
    setSelectedTeam(newTeam);
    setActiveTab("team-details");
  };

  // Invite a member to the team
  const handleInviteMember = () => {
    if (!selectedTeam) return;
    
    if (!newInviteData.email.trim() || !/^\S+@\S+\.\S+$/.test(newInviteData.email)) {
      toast.error("Valid email address is required");
      return;
    }

    // Check if user is already a member
    if (selectedTeam.members.some(m => m.email === newInviteData.email)) {
      toast.error("This user is already a team member");
      return;
    }

    // Check if invitation already exists
    if (invitations.some(i => i.email === newInviteData.email && i.teamId === selectedTeam.id && i.status === "pending")) {
      toast.error("An invitation is already pending for this email");
      return;
    }

    const newInvitation: TeamInvitation = {
      id: `invitation-${Date.now()}`,
      teamId: selectedTeam.id,
      email: newInviteData.email,
      role: newInviteData.role,
      invitedBy: currentUserId,
      invitedAt: new Date().toISOString(),
      expiresAt: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
      status: "pending"
    };

    setInvitations([...invitations, newInvitation]);
    setNewInviteData({ email: "", role: "contributor" });
    setShowInviteMembers(false);
    toast.success("Invitation sent successfully");
  };

  // Leave a team
  const handleLeaveTeam = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return;

    // Can't leave if you're the owner
    if (team.ownerId === currentUserId) {
      toast.error("You are the owner of this team. Transfer ownership before leaving.");
      return;
    }

    // Remove user from team members
    const updatedTeams = teams.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          members: t.members.filter(m => m.userId !== currentUserId)
        };
      }
      return t;
    });

    setTeams(updatedTeams);
    toast.success(`You have left the ${team.name} team`);
    
    // If currently viewing this team, go back to teams list
    if (selectedTeam?.id === teamId) {
      setSelectedTeam(null);
      setActiveTab("my-teams");
    }
  };

  // Accept an invitation
  const handleAcceptInvitation = (invitationId: string) => {
    const invitation = invitations.find(i => i.id === invitationId);
    if (!invitation) return;

    const team = teams.find(t => t.id === invitation.teamId);
    if (!team) {
      toast.error("Team not found");
      return;
    }

    // Add user to team
    const updatedTeams = teams.map(t => {
      if (t.id === invitation.teamId) {
        return {
          ...t,
          members: [
            ...t.members,
            {
              userId: currentUserId,
              name: `${currentUser.firstName} ${currentUser.lastName}`,
              email: currentUser.email,
              role: invitation.role,
              avatarUrl: currentUser.avatar,
              joinedAt: new Date().toISOString(),
              lastActive: new Date().toISOString()
            }
          ]
        };
      }
      return t;
    });

    // Update invitation status
    const updatedInvitations = invitations.map(i => {
      if (i.id === invitationId) {
        return { ...i, status: "accepted" };
      }
      return i;
    });

    setTeams(updatedTeams);
    setInvitations(updatedInvitations);
    toast.success(`You've joined the ${team.name} team`);
  };

  // Decline an invitation
  const handleDeclineInvitation = (invitationId: string) => {
    const updatedInvitations = invitations.map(i => {
      if (i.id === invitationId) {
        return { ...i, status: "declined" };
      }
      return i;
    });

    setInvitations(updatedInvitations);
    toast.success("Invitation declined");
  };

  // Cancel an invitation (only for team admins/owners)
  const handleCancelInvitation = (invitationId: string) => {
    const invitation = invitations.find(i => i.id === invitationId);
    if (!invitation || !selectedTeam) return;

    // Check if user has permission to cancel
    const currentUserInTeam = selectedTeam.members.find(m => m.userId === currentUserId);
    if (!currentUserInTeam || (currentUserInTeam.role !== "owner" && currentUserInTeam.role !== "admin")) {
      toast.error("You don't have permission to cancel invitations");
      return;
    }

    setInvitations(invitations.filter(i => i.id !== invitationId));
    toast.success("Invitation canceled");
  };

  // Remove a member from the team
  const handleRemoveMember = (teamId: string, userId: string) => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return;

    // Check if user has permission to remove
    const currentUserInTeam = team.members.find(m => m.userId === currentUserId);
    if (!currentUserInTeam || (currentUserInTeam.role !== "owner" && currentUserInTeam.role !== "admin")) {
      toast.error("You don't have permission to remove members");
      return;
    }

    // Can't remove the owner
    if (userId === team.ownerId) {
      toast.error("You can't remove the team owner");
      return;
    }

    // Remove user from team members
    const updatedTeams = teams.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          members: t.members.filter(m => m.userId !== userId)
        };
      }
      return t;
    });

    setTeams(updatedTeams);
    
    // Update selected team
    if (selectedTeam?.id === teamId) {
      const updatedTeam = updatedTeams.find(t => t.id === teamId);
      setSelectedTeam(updatedTeam || null);
    }
    
    toast.success("Member removed from team");
  };

  // Start a team assessment
  const handleStartAssessment = (teamId: string) => {
    if (onCreateAssessment) {
      onCreateAssessment(teamId);
    } else {
      toast.info("Creating new team assessment...");
    }
  };
  
  // View assessment details
  const handleViewAssessment = (assessmentId: string) => {
    if (onViewAssessment) {
      onViewAssessment(assessmentId);
    } else {
      toast.info("Viewing assessment...");
    }
  };

  // Check if user can manage the team
  const canManageTeam = (team: Team) => {
    const member = team.members.find(m => m.userId === currentUserId);
    return member && (member.role === "owner" || member.role === "admin");
  };

  // Get list of teams user is a member of
  const myTeams = teams.filter(team => 
    team.members.some(member => member.userId === currentUserId)
  );

  // Get list of pending invitations for the current user
  const myInvitations = invitations.filter(
    invite => invite.email === currentUser.email && invite.status === "pending"
  );

  // Get team pending invitations
  const getTeamInvitations = (teamId: string) => {
    return invitations.filter(
      invite => invite.teamId === teamId && invite.status === "pending"
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-navy">Team <strong>Assessments</strong></h2>
          <p className="text-muted-foreground">
            Collaborate with your team to evaluate your IT health
          </p>
        </div>
        
        {activeTab === "my-teams" && (
          <Button 
            onClick={() => setShowCreateTeam(true)} 
            className="gap-2 bg-gold hover:bg-gold/90"
          >
            <Plus className="h-4 w-4" />
            Create Team
          </Button>
        )}
        
        {activeTab === "team-details" && selectedTeam && canManageTeam(selectedTeam) && (
          <Button 
            onClick={() => setShowInviteMembers(true)} 
            className="gap-2 bg-gold hover:bg-gold/90"
          >
            <UserPlus className="h-4 w-4" />
            Invite Members
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="my-teams" className="gap-2">
            <Users className="h-4 w-4" />
            My Teams
          </TabsTrigger>
          {selectedTeam && (
            <TabsTrigger value="team-details" className="gap-2">
              <User className="h-4 w-4" />
              {selectedTeam.name}
            </TabsTrigger>
          )}
          <TabsTrigger value="invitations" className="gap-2">
            <Mail className="h-4 w-4" />
            Invitations
            {myInvitations.length > 0 && (
              <Badge 
                variant="destructive" 
                className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full"
              >
                {myInvitations.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-teams">
          {myTeams.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                <div className="rounded-full bg-muted p-6">
                  <Users className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No teams yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Create a team to collaborate on IT health assessments with your colleagues
                </p>
                <Button 
                  onClick={() => setShowCreateTeam(true)} 
                  className="gap-2 mt-2 bg-gold hover:bg-gold/90"
                >
                  <Plus className="h-4 w-4" />
                  Create Team
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTeams.map(team => (
                <Card key={team.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span>{team.name}</span>
                      {team.ownerId === currentUserId && (
                        <Badge className="bg-navy hover:bg-navy/90 text-xs">Owner</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {team.description || `Team created on ${formatDate(new Date(team.createdAt))}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {team.members.length} member{team.members.length !== 1 ? 's' : ''}
                      </span>
                      <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {team.assessments.length} assessment{team.assessments.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <div className="flex -space-x-2 mb-4">
                      {team.members.slice(0, 5).map(member => (
                        <Avatar key={member.userId} className="border-2 border-background h-8 w-8">
                          <AvatarImage src={member.avatarUrl} alt={member.name} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {team.members.length > 5 && (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs">
                          +{team.members.length - 5}
                        </div>
                      )}
                    </div>
                    
                    {team.assessments.length > 0 && (
                      <div className="mb-2">
                        <h4 className="text-sm font-medium mb-2">Recent Assessments</h4>
                        <div className="space-y-2">
                          {team.assessments.slice(0, 2).map(assessmentId => (
                            <Button 
                              key={assessmentId}
                              variant="outline" 
                              size="sm" 
                              className="w-full justify-start gap-2 h-auto py-2"
                              onClick={() => handleViewAssessment(assessmentId)}
                            >
                              <BarChart3 className="h-4 w-4 text-navy" />
                              <div className="flex flex-col items-start">
                                <span className="text-xs">Assessment {assessmentId.split('-')[1]}</span>
                                <span className="text-xs text-muted-foreground">
                                  {calculateDaysAgo(new Date(new Date().setDate(new Date().getDate() - (parseInt(assessmentId.split('-')[1]) * 7))))}
                                </span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 gap-2 pt-2">
                    <Button 
                      onClick={() => handleSelectTeam(team)} 
                      variant="outline"
                    >
                      View Details
                    </Button>
                    <Button 
                      onClick={() => handleStartAssessment(team.id)}
                      className="bg-gold hover:bg-gold/90"
                    >
                      Start Assessment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="team-details">
          {selectedTeam && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{selectedTeam.name}</CardTitle>
                      <CardDescription>
                        {selectedTeam.description || `Created on ${formatDate(new Date(selectedTeam.createdAt))}`}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Team Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleStartAssessment(selectedTeam.id)}>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          New Assessment
                        </DropdownMenuItem>
                        {canManageTeam(selectedTeam) && (
                          <DropdownMenuItem onClick={() => setShowInviteMembers(true)}>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Invite Members
                          </DropdownMenuItem>
                        )}
                        {selectedTeam.ownerId !== currentUserId && (
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleLeaveTeam(selectedTeam.id)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Leave Team
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="members">
                    <TabsList className="mb-4">
                      <TabsTrigger value="members" className="gap-1">
                        <Users className="h-3.5 w-3.5" />
                        Members
                      </TabsTrigger>
                      <TabsTrigger value="assessments" className="gap-1">
                        <BarChart3 className="h-3.5 w-3.5" />
                        Assessments
                      </TabsTrigger>
                      <TabsTrigger value="activity" className="gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Activity
                      </TabsTrigger>
                      <TabsTrigger value="discussions" className="gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Discussions
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="members">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">Team Members ({selectedTeam.members.length})</h3>
                          {canManageTeam(selectedTeam) && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1" 
                              onClick={() => setShowInviteMembers(true)}
                            >
                              <UserPlus className="h-3.5 w-3.5" />
                              Invite
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          {selectedTeam.members.map(member => (
                            <div 
                              key={member.userId} 
                              className="flex items-center justify-between p-3 rounded-md border"
                            >
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                                  <AvatarFallback>
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{member.name}</p>
                                    {member.userId === currentUserId && (
                                      <Badge variant="outline" className="text-xs">You</Badge>
                                    )}
                                    {member.userId === selectedTeam.ownerId && (
                                      <Badge className="bg-navy hover:bg-navy/90 text-xs">Owner</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">{member.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={
                                    member.role === "owner" ? "default" :
                                    member.role === "admin" ? "secondary" : "outline"
                                  }
                                  className={member.role === "owner" ? "bg-navy hover:bg-navy/90" : ""}
                                >
                                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                                </Badge>
                                
                                {canManageTeam(selectedTeam) && 
                                 member.userId !== currentUserId && 
                                 member.userId !== selectedTeam.ownerId && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    onClick={() => handleRemoveMember(selectedTeam.id, member.userId)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Remove</span>
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {canManageTeam(selectedTeam) && getTeamInvitations(selectedTeam.id).length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-sm font-medium mb-3">Pending Invitations</h3>
                            <div className="space-y-2">
                              {getTeamInvitations(selectedTeam.id).map(invitation => (
                                <div 
                                  key={invitation.id} 
                                  className="flex items-center justify-between p-3 rounded-md border border-dashed"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{invitation.email}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Invited {calculateDaysAgo(new Date(invitation.invitedAt))}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline">
                                      {invitation.role.charAt(0).toUpperCase() + invitation.role.slice(1)}
                                    </Badge>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8 text-destructive hover:text-destructive"
                                      onClick={() => handleCancelInvitation(invitation.id)}
                                    >
                                      <X className="h-4 w-4" />
                                      <span className="sr-only">Cancel</span>
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="assessments">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">Team Assessments ({selectedTeam.assessments.length})</h3>
                          <Button 
                            size="sm" 
                            className="gap-1 bg-gold hover:bg-gold/90" 
                            onClick={() => handleStartAssessment(selectedTeam.id)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                            New Assessment
                          </Button>
                        </div>
                        
                        {selectedTeam.assessments.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-8 space-y-3 text-center bg-muted/30 rounded-md">
                            <BarChart3 className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <h4 className="font-medium">No assessments yet</h4>
                              <p className="text-sm text-muted-foreground">
                                Start your first team assessment to track your IT health
                              </p>
                            </div>
                            <Button 
                              className="mt-2 bg-gold hover:bg-gold/90" 
                              onClick={() => handleStartAssessment(selectedTeam.id)}
                            >
                              Start First Assessment
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {selectedTeam.assessments.map(assessmentId => (
                              <Card key={assessmentId} className="overflow-hidden">
                                <CardContent className="p-0">
                                  <div className="p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                                        <BarChart3 className="h-5 w-5 text-gold" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium">Assessment {assessmentId.split('-')[1]}</h4>
                                        <p className="text-xs text-muted-foreground">
                                          Completed {calculateDaysAgo(new Date(new Date().setDate(new Date().getDate() - (parseInt(assessmentId.split('-')[1]) * 7))))}
                                        </p>
                                      </div>
                                    </div>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="gap-1"
                                      onClick={() => handleViewAssessment(assessmentId)}
                                    >
                                      View Results
                                    </Button>
                                  </div>
                                  <div className="px-4 pb-4 pt-0">
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Score:</span>
                                      <span className="font-medium">76/100</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-gold" 
                                        style={{ width: '76%' }}
                                      ></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                      <span>Basic</span>
                                      <span>Stable</span>
                                      <span>Smart</span>
                                    </div>
                                  </div>
                                  
                                  <div className="border-t px-4 py-3 bg-muted/30 flex justify-between items-center">
                                    <div className="flex -space-x-2">
                                      {selectedTeam.members.slice(0, 3).map(member => (
                                        <Avatar key={member.userId} className="border-2 border-muted h-6 w-6">
                                          <AvatarImage src={member.avatarUrl} alt={member.name} />
                                          <AvatarFallback className="text-xs">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        </Avatar>
                                      ))}
                                      {selectedTeam.members.length > 3 && (
                                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted border-2 border-muted text-xs">
                                          +{selectedTeam.members.length - 3}
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex gap-3 text-sm text-muted-foreground">
                                      <div className="flex items-center gap-1">
                                        <MessageSquare className="h-3.5 w-3.5" />
                                        <span>3</span>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="activity">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Recent Activity</h3>
                        
                        <div className="border-l-2 border-muted pl-4 space-y-6">
                          <div className="relative">
                            <div className="absolute -left-[21px] rounded-full h-4 w-4 bg-gold"></div>
                            <div className="space-y-1">
                              <p className="text-sm"><span className="font-medium">Sarah Johnson</span> completed an assessment</p>
                              <p className="text-xs text-muted-foreground">2 days ago</p>
                            </div>
                          </div>
                          
                          <div className="relative">
                            <div className="absolute -left-[21px] rounded-full h-4 w-4 bg-muted"></div>
                            <div className="space-y-1">
                              <p className="text-sm"><span className="font-medium">You</span> invited Alex Brown to the team</p>
                              <p className="text-xs text-muted-foreground">3 days ago</p>
                            </div>
                          </div>
                          
                          <div className="relative">
                            <div className="absolute -left-[21px] rounded-full h-4 w-4 bg-muted"></div>
                            <div className="space-y-1">
                              <p className="text-sm"><span className="font-medium">Michael Lee</span> commented on an assessment</p>
                              <p className="text-xs text-muted-foreground">5 days ago</p>
                            </div>
                          </div>
                          
                          <div className="relative">
                            <div className="absolute -left-[21px] rounded-full h-4 w-4 bg-navy"></div>
                            <div className="space-y-1">
                              <p className="text-sm"><span className="font-medium">You</span> created the team</p>
                              <p className="text-xs text-muted-foreground">{calculateDaysAgo(new Date(selectedTeam.createdAt))}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="discussions">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Assessment Comments</h3>
                        
                        {mockComments.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-8 space-y-3 text-center bg-muted/30 rounded-md">
                            <MessageSquare className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <h4 className="font-medium">No comments yet</h4>
                              <p className="text-sm text-muted-foreground">
                                Comments on assessments will appear here
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {mockComments.filter(c => !c.parentId).map(comment => (
                              <div key={comment.id} className="space-y-3">
                                <div className="p-4 rounded-md border">
                                  <div className="flex items-start gap-3 mb-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                                      <AvatarFallback>
                                        {comment.userName.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-medium">{comment.userName}</h4>
                                        <span className="text-xs text-muted-foreground">
                                          {calculateDaysAgo(new Date(comment.createdAt))}
                                        </span>
                                      </div>
                                      {comment.questionId && (
                                        <Badge variant="outline" className="text-xs">
                                          Question: {comment.questionId.replace('_', ' ')}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-sm">{comment.content}</p>
                                </div>
                                
                                {/* Show replies */}
                                <div className="pl-8 space-y-3">
                                  {mockComments
                                    .filter(c => c.parentId === comment.id)
                                    .map(reply => (
                                      <div key={reply.id} className="p-3 rounded-md border bg-muted/30">
                                        <div className="flex items-start gap-3 mb-2">
                                          <Avatar className="h-6 w-6">
                                            <AvatarImage src={reply.userAvatar} alt={reply.userName} />
                                            <AvatarFallback className="text-xs">
                                              {reply.userName.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <div className="flex items-center gap-2">
                                              <h4 className="text-sm font-medium">{reply.userName}</h4>
                                              <span className="text-xs text-muted-foreground">
                                                {calculateDaysAgo(new Date(reply.createdAt))}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <p className="text-sm">{reply.content}</p>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="invitations">
          {myInvitations.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                <div className="rounded-full bg-muted p-6">
                  <Mail className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No pending invitations</h3>
                <p className="text-muted-foreground max-w-md">
                  When someone invites you to join their team, the invitation will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pending Team Invitations</h3>
              <div className="space-y-4">
                {myInvitations.map(invitation => {
                  const team = teams.find(t => t.id === invitation.teamId);
                  const inviter = team?.members.find(m => m.userId === invitation.invitedBy);
                  
                  return (
                    <Card key={invitation.id}>
                      <CardContent className="p-0">
                        <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center">
                              <Users className="h-6 w-6 text-gold" />
                            </div>
                            <div>
                              <h4 className="font-medium">{team?.name || "Unknown Team"}</h4>
                              <p className="text-sm text-muted-foreground">
                                Invited by {inviter?.name || "Unknown"} {calculateDaysAgo(new Date(invitation.invitedAt))}
                              </p>
                              <Badge variant="outline" className="mt-1">
                                {invitation.role.charAt(0).toUpperCase() + invitation.role.slice(1)} Access
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 md:flex-shrink-0">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleDeclineInvitation(invitation.id)}
                            >
                              <X className="h-4 w-4" />
                              Decline
                            </Button>
                            <Button 
                              size="sm" 
                              className="gap-1 bg-gold hover:bg-gold/90"
                              onClick={() => handleAcceptInvitation(invitation.id)}
                            >
                              <Check className="h-4 w-4" />
                              Accept
                            </Button>
                          </div>
                        </div>
                        
                        {team?.description && (
                          <div className="px-4 pb-4 border-t pt-3 bg-muted/20">
                            <p className="text-sm">{team.description}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create Team Dialog */}
      <Dialog open={showCreateTeam} onOpenChange={setShowCreateTeam}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a New Team</DialogTitle>
            <DialogDescription>
              Create a team to collaborate on IT health assessments
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                placeholder="e.g. IT Department"
                value={newTeamData.name}
                onChange={(e) => setNewTeamData({...newTeamData, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team-description">Description (optional)</Label>
              <Textarea
                id="team-description"
                placeholder="Describe the purpose of this team"
                rows={3}
                value={newTeamData.description}
                onChange={(e) => setNewTeamData({...newTeamData, description: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateTeam(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTeam} className="bg-gold hover:bg-gold/90">
              Create Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Members Dialog */}
      <Dialog open={showInviteMembers} onOpenChange={setShowInviteMembers}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
            <DialogDescription>
              Invite your colleagues to join your team
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email Address</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="colleague@example.com"
                value={newInviteData.email}
                onChange={(e) => setNewInviteData({...newInviteData, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="invite-role">Role</Label>
              <Select 
                value={newInviteData.role} 
                onValueChange={(value: any) => 
                  setNewInviteData({...newInviteData, role: value})
                }
              >
                <SelectTrigger id="invite-role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span>Admin</span>
                        <span className="text-xs text-muted-foreground">Can manage team and assessments</span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="contributor">
                    <div className="flex items-center gap-2">
                      <Edit3 className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span>Contributor</span>
                        <span className="text-xs text-muted-foreground">Can create and edit assessments</span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="viewer">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span>Viewer</span>
                        <span className="text-xs text-muted-foreground">Can only view assessments</span>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-md">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                You can also share an invitation link after adding the team member
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteMembers(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteMember} className="bg-gold hover:bg-gold/90">
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
