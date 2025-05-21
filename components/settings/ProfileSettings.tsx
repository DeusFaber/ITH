
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar } from "../ui/avatar";
import { User, Upload, X } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john@acme.com",
    phone: "(555) 123-4567",
    jobTitle: "IT Manager",
    company: "Acme Inc.",
  });
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    // Reset form values to original user data (if needed)
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Manage your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <User className="h-10 w-10" />
            </Avatar>
            <div className="absolute -bottom-2 -right-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload avatar</span>
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">
              {userData.firstName} {userData.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
            <p className="text-sm text-muted-foreground">{userData.jobTitle} at {userData.company}</p>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              value={userData.firstName}
              onChange={(e) => setUserData({...userData, firstName: e.target.value})}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              value={userData.lastName}
              onChange={(e) => setUserData({...userData, lastName: e.target.value})}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              value={userData.phone}
              onChange={(e) => setUserData({...userData, phone: e.target.value})}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input 
              id="jobTitle" 
              value={userData.jobTitle}
              onChange={(e) => setUserData({...userData, jobTitle: e.target.value})}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input 
              id="company" 
              value={userData.company}
              onChange={(e) => setUserData({...userData, company: e.target.value})}
              disabled={!isEditing}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="ml-auto">
            Edit Profile
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
