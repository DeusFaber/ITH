
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { toast } from "sonner@2.0.3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { 
  UserCog, 
  UserPlus, 
  Users, 
  Shield, 
  ChevronRight, 
  ChevronDown, 
  Edit, 
  Trash2, 
  Plus,
  Search
} from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: {
    [key: string]: {
      [action: string]: boolean;
    };
  };
}

export function RolePermissions() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "Administrator",
      description: "Full access to all features and settings",
      userCount: 3,
      permissions: {
        assessments: { view: true, create: true, edit: true, delete: true },
        users: { view: true, create: true, edit: true, delete: true },
        billing: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, create: true, edit: true, delete: true }
      }
    },
    {
      id: "manager",
      name: "IT Manager",
      description: "Manage team assessments and reports",
      userCount: 12,
      permissions: {
        assessments: { view: true, create: true, edit: true, delete: false },
        users: { view: true, create: false, edit: false, delete: false },
        billing: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: true, edit: true, delete: false },
        settings: { view: false, create: false, edit: false, delete: false }
      }
    },
    {
      id: "user",
      name: "Standard User",
      description: "Basic access to personal assessments and reports",
      userCount: 47,
      permissions: {
        assessments: { view: true, create: true, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
        billing: { view: false, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false }
      }
    }
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewRoleDialogOpen, setIsNewRoleDialogOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("admin");

  const permissionCategories = [
    { id: "assessments", name: "Assessments", description: "Manage IT Health assessments" },
    { id: "users", name: "Users", description: "Manage user accounts and teams" },
    { id: "billing", name: "Billing", description: "Manage billing and payments" },
    { id: "reports", name: "Reports", description: "Access to reports and analytics" },
    { id: "settings", name: "Settings", description: "Access to platform settings" }
  ];

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditDialogOpen(true);
  };

  const handleSaveRole = () => {
    if (selectedRole) {
      setRoles(roles.map(role => 
        role.id === selectedRole.id ? selectedRole : role
      ));
      toast.success(`Role "${selectedRole.name}" updated successfully`);
      setIsEditDialogOpen(false);
    }
  };

  const handleCreateRole = () => {
    // In a real app, this would create a new role
    toast.success("New role created successfully");
    setIsNewRoleDialogOpen(false);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
    toast.success("Role deleted successfully");
  };

  const togglePermission = (category: string, action: string) => {
    if (selectedRole) {
      setSelectedRole({
        ...selectedRole,
        permissions: {
          ...selectedRole.permissions,
          [category]: {
            ...selectedRole.permissions[category],
            [action]: !selectedRole.permissions[category][action]
          }
        }
      });
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>Manage access roles and permissions</CardDescription>
          </div>
          <Button onClick={() => setIsNewRoleDialogOpen(true)} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            New Role
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            {roles.map((role) => (
              <div key={role.id} className="border-b last:border-b-0">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleSection(role.id)}
                >
                  <div className="flex items-center gap-3">
                    {expandedSection === role.id ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <h3 className="font-light text-base flex items-center gap-2">
                        {role.name}
                        <Badge variant="outline" className="ml-2 text-xs">
                          {role.userCount} users
                        </Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditRole(role);
                      }}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    {role.id !== "admin" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRole(role.id);
                        }}
                        className="flex items-center gap-1 border-destructive text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
                
                {expandedSection === role.id && (
                  <div className="p-4 bg-muted/20 border-t">
                    <h4 className="text-sm font-medium mb-3">Permissions</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead>View</TableHead>
                          <TableHead>Create</TableHead>
                          <TableHead>Edit</TableHead>
                          <TableHead>Delete</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permissionCategories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell>
                              <div>
                                <div className="font-light">{category.name}</div>
                                <div className="text-xs text-muted-foreground">{category.description}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {role.permissions[category.id]?.view ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                  Yes
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-100 text-red-800">
                                  No
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {role.permissions[category.id]?.create ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                  Yes
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-100 text-red-800">
                                  No
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {role.permissions[category.id]?.edit ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                  Yes
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-100 text-red-800">
                                  No
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {role.permissions[category.id]?.delete ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                  Yes
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-100 text-red-800">
                                  No
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>User Role Assignment</CardTitle>
          <CardDescription>Assign roles to users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] ml-2">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="manager">IT Manager</SelectItem>
                <SelectItem value="user">Standard User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Current Role</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        JS
                      </div>
                      <div>John Smith</div>
                    </div>
                  </TableCell>
                  <TableCell>john@acme.com</TableCell>
                  <TableCell>
                    <Badge>Administrator</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Change Role</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        SD
                      </div>
                      <div>Sarah Davis</div>
                    </div>
                  </TableCell>
                  <TableCell>sarah@acme.com</TableCell>
                  <TableCell>
                    <Badge variant="outline">IT Manager</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Change Role</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        MJ
                      </div>
                      <div>Michael Johnson</div>
                    </div>
                  </TableCell>
                  <TableCell>michael@acme.com</TableCell>
                  <TableCell>
                    <Badge variant="outline">IT Manager</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Change Role</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Role: {selectedRole?.name}</DialogTitle>
            <DialogDescription>
              Modify role details and permissions
            </DialogDescription>
          </DialogHeader>
          
          {selectedRole && (
            <div className="space-y-6 py-4">
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Role Name</Label>
                  <Input
                    id="name"
                    value={selectedRole.name}
                    onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
                    disabled={selectedRole.id === "admin"}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={selectedRole.description}
                    onChange={(e) => setSelectedRole({ ...selectedRole, description: e.target.value })}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-light mb-4">Role Permissions</h3>
                <div className="space-y-4">
                  {permissionCategories.map((category) => (
                    <div key={category.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="font-light">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`${category.id}-view`} 
                            checked={selectedRole.permissions[category.id]?.view || false}
                            onCheckedChange={() => togglePermission(category.id, "view")}
                            disabled={selectedRole.id === "admin"}
                          />
                          <label 
                            htmlFor={`${category.id}-view`}
                            className="text-sm cursor-pointer"
                          >
                            View
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`${category.id}-create`} 
                            checked={selectedRole.permissions[category.id]?.create || false}
                            onCheckedChange={() => togglePermission(category.id, "create")}
                            disabled={selectedRole.id === "admin"}
                          />
                          <label 
                            htmlFor={`${category.id}-create`}
                            className="text-sm cursor-pointer"
                          >
                            Create
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`${category.id}-edit`} 
                            checked={selectedRole.permissions[category.id]?.edit || false}
                            onCheckedChange={() => togglePermission(category.id, "edit")}
                            disabled={selectedRole.id === "admin"}
                          />
                          <label 
                            htmlFor={`${category.id}-edit`}
                            className="text-sm cursor-pointer"
                          >
                            Edit
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`${category.id}-delete`} 
                            checked={selectedRole.permissions[category.id]?.delete || false}
                            onCheckedChange={() => togglePermission(category.id, "delete")}
                            disabled={selectedRole.id === "admin"}
                          />
                          <label 
                            htmlFor={`${category.id}-delete`}
                            className="text-sm cursor-pointer"
                          >
                            Delete
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRole}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New Role Dialog */}
      <Dialog open={isNewRoleDialogOpen} onOpenChange={setIsNewRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Add a new role with custom permissions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="new-name">Role Name</Label>
              <Input id="new-name" placeholder="e.g., Support Agent" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-description">Description</Label>
              <Input id="new-description" placeholder="Describe the role's purpose" />
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="font-light mb-2">Copy Permissions From</h3>
              <Select defaultValue="none">
                <SelectTrigger>
                  <SelectValue placeholder="Select a role template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No template - start fresh</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="manager">IT Manager</SelectItem>
                  <SelectItem value="user">Standard User</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-2">
                You can start with a template and customize permissions after creation
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRole}>
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
