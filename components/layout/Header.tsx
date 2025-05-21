
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Bell, 
  Search, 
  Menu, 
  Sun, 
  Moon, 
  Settings, 
  LogOut, 
  HelpCircle, 
  User,
  ChevronRight,
  BarChart3
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { Logo } from "../ui/Logo";
import { AssessmentButton } from "../assessment/AssessmentButton";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  company: string;
  avatar: string;
  isAdmin: boolean;
}

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
  isMobile: boolean;
  userData: UserData;
  onLogout: () => void;
  navigateToProfile: () => void;
  navigateToSettings: () => void;
}

export function Header({ 
  toggleSidebar, 
  sidebarCollapsed, 
  isMobile,
  userData,
  onLogout,
  navigateToProfile,
  navigateToSettings
}: HeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  useEffect(() => {
    // Initialize theme based on document class
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    onLogout();
  };

  const handleStartAssessment = () => {
    // Using URL parameter approach to trigger assessment
    window.location.href = window.location.pathname + '?assessment=true';
  };

  const userInitials = `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;

  return (
    <header className="border-b border-border h-16 px-0 flex items-center bg-blue/5 text-foreground shadow-sm w-full m-0 fixed top-0 left-0 right-0 z-50">
      {/* Left section */}
      <div className="flex-none w-10 pl-2">
        {/* This div is intentionally empty to balance the right section */}
      </div>
      
      {/* Center section with search */}
      <div className="flex-grow flex justify-center">
        <div className="hidden md:flex relative max-w-md w-full">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-4 rounded-md bg-input-background text-foreground border border-border focus:ring-1 focus:ring-primary/30 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right section with actions */}
      <div className="flex-none flex items-center gap-1 md:gap-2 pr-2">
        <AssessmentButton onClick={handleStartAssessment} />
        
        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-foreground hover:bg-muted hover:text-foreground">
          <Bell className="h-5 w-5" />
          <Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-[10px]">
            3
          </Badge>
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="h-9 w-9 text-foreground hover:bg-muted hover:text-foreground"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full h-9 w-9 p-0 hover:bg-muted">
              <Avatar className="h-9 w-9">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">{userInitials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={navigateToProfile}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={navigateToSettings}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
