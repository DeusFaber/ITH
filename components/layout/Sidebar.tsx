
import { useState, useEffect, useRef } from "react";
import {
  HomeIcon,
  LayoutIcon,
  AwardIcon,
  FileQuestionIcon,
  InboxIcon,
  CreditCardIcon,
  BookIcon,
  BadgeCheckIcon,
  SettingsIcon,
  ShieldIcon,
  LockIcon,
  MenuIcon,
  XIcon,
  UsersIcon,
  MonitorIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ShoppingBag,
  Bell,
  Sun,
  Moon,
  User,
  LogOut,
  HelpCircle,
  BarChart2 as BarChartIcon
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import ITHealthIconTransparentWhite from "../../imports/ItHealthIconTransparentWhite-12-165";
import { Logo } from "../ui/Logo";
import { AssessmentButton } from "../assessment/AssessmentButton";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  isMobile?: boolean;
  userData?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    company: string;
    avatar: string;
    isAdmin: boolean;
  };
  onLogout?: () => void;
  navigateToProfile?: () => void;
  navigateToSettings?: () => void;
  currentSubPath?: string;
}

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: MenuItem[];
};

export function Sidebar({ 
  currentPage, 
  setCurrentPage, 
  collapsed, 
  setCollapsed, 
  isMobile,
  userData,
  onLogout,
  navigateToProfile,
  navigateToSettings,
  currentSubPath
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed || false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const subHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [currentPage]);

  // Close sidebar on mobile when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      // Clear any remaining timeouts
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (subHoverTimeoutRef.current) {
        clearTimeout(subHoverTimeoutRef.current);
      }
    };
  }, []);

  // Initialize theme based on document class
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  // Update local state when collapsed prop changes
  useEffect(() => {
    if (collapsed !== undefined) {
      setIsCollapsed(collapsed);
    }
  }, [collapsed]);

  // Update parent state when local state changes
  useEffect(() => {
    if (setCollapsed) {
      setCollapsed(isCollapsed);
    }
  }, [isCollapsed, setCollapsed]);

  const handleMouseEnter = (id: string) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set a small delay to prevent menu flashing when moving between items
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(id);
    }, 50);
  };

  const handleMouseLeave = () => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set a small delay before closing, to make it easier to move to submenu
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 100);
  };

  const handleSubMenuMouseEnter = (id: string) => {
    if (subHoverTimeoutRef.current) {
      clearTimeout(subHoverTimeoutRef.current);
    }
    subHoverTimeoutRef.current = setTimeout(() => {
      setHoveredSubMenu(id);
    }, 50);
  };

  const handleSubMenuMouseLeave = () => {
    if (subHoverTimeoutRef.current) {
      clearTimeout(subHoverTimeoutRef.current);
    }
    subHoverTimeoutRef.current = setTimeout(() => {
      setHoveredSubMenu(null);
    }, 100);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onLogout) onLogout();
  };

  const handleStartAssessment = () => {
    // Using URL parameter approach to trigger assessment
    window.location.href = window.location.pathname + '?assessment=true';
  };

  // Function to navigate to a plan using the window.history API
  const navigateToPlan = (planUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Sidebar: Navigating to ${planUrl}`);
    
    // Close mobile menu if open
    setIsMobileOpen(false);
    
    try {
      // Push new state to history
      window.history.pushState({}, '', planUrl);
      // Dispatch popstate event to trigger route change in App.tsx
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error(`Error navigating to ${planUrl}:`, error);
      // Fallback to direct navigation
      window.location.href = planUrl;
    }
  };

  // Define specific items for the Plans submenu
  const planSubItems: MenuItem[] = [
    { id: "user-health-plan", label: "User Health Plan", icon: <UsersIcon className="h-5 w-5" /> },
    { id: "office-health-plan", label: "Office Health Plan", icon: <LayoutIcon className="h-5 w-5" /> },
    { id: "communication-plan", label: "Communication Plan", icon: <InboxIcon className="h-5 w-5" /> },
    { id: "itsafe-user-plan", label: "ITsafe User Plan", icon: <ShieldIcon className="h-5 w-5" /> },
    { id: "itsafe-server-plan", label: "ITsafe Server Plan", icon: <ShieldIcon className="h-5 w-5" /> },
    { id: "mail-plan", label: "Mail Plan", icon: <InboxIcon className="h-5 w-5" /> },
    { id: "business-basic-plan", label: "Business Basic Plan", icon: <FileQuestionIcon className="h-5 w-5" /> },
    { id: "business-standard-plan", label: "Business Standard Plan", icon: <FileQuestionIcon className="h-5 w-5" /> },
    { id: "sharepoint-plan", label: "SharePoint Plan", icon: <FileQuestionIcon className="h-5 w-5" /> },
    { id: "reporting-plan", label: "Reporting Plan", icon: <BarChartIcon className="h-5 w-5" /> },
    { id: "workflow-optimization-plan", label: "Workflow Optimization Plan", icon: <FileQuestionIcon className="h-5 w-5" /> },
    { id: "digital-customer-plan", label: "Digital Customer Plan", icon: <UsersIcon className="h-5 w-5" /> },
    { id: "ai-connect-plan", label: "AI Connect Plan", icon: <FileQuestionIcon className="h-5 w-5" /> },
  ];

  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <HomeIcon className="h-5 w-5" /> },
    { id: "inbox", label: "Inbox", icon: <InboxIcon className="h-5 w-5" /> },
    { id: "itprogram", label: "IT Health Program", icon: <ShieldIcon className="h-5 w-5" /> },
    { id: "rewards", label: "Rewards", icon: <AwardIcon className="h-5 w-5" /> },
    { 
      id: "plans", 
      label: "Marketplace", 
      icon: <ShoppingBag className="h-5 w-5" />,
      subItems: planSubItems
    },
    { id: "kit", label: "Kit", icon: <MonitorIcon className="h-5 w-5" /> },
    { id: "resources", label: "Skills", icon: <BookIcon className="h-5 w-5" /> },
    { id: "people", label: "People", icon: <UsersIcon className="h-5 w-5" /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon className="h-5 w-5" />, subItems: [
      { id: "billing", label: "Billing", icon: <CreditCardIcon className="h-5 w-5" /> },
      { id: "feedback", label: "Give Feedback", icon: <BadgeCheckIcon className="h-5 w-5" /> },
      { id: "admin", label: "Admin Panel", icon: <LockIcon className="h-5 w-5" /> }
    ]}
  ];

  const renderMenuItem = (item: MenuItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isPlanPage = currentPage === "plan_detail" && item.id === "plans";
    const isActive = currentPage === item.id || isPlanPage;
    const isHovered = hoveredMenu === item.id;
    
    return (
      <div 
        key={item.id} 
        className="flex flex-col relative group"
        onMouseEnter={() => hasSubItems && handleMouseEnter(item.id)}
        onMouseLeave={handleMouseLeave}
      >
        {item.id === "plans" ? (
          // For the Plans menu item, use an anchor tag to go to the plans page
          <a
            href="/plans"
            className={`flex items-center px-3 py-2 rounded-md text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent ${
              isActive ? "bg-sidebar-accent" : ""
            } ${isCollapsed ? "px-2 justify-center" : ""}`}
            onClick={(e) => navigateToPlan("/plans", e)}
          >
            {item.icon}
            {!isCollapsed && (
              <>
                <span className="ml-2 flex-grow font-light text-left text-xs">{item.label}</span>
                {hasSubItems && (
                  isHovered || isActive ? 
                  <ChevronDownIcon className="h-4 w-4" /> : 
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </>
            )}
          </a>
        ) : (
          // For other menu items, use Button as before
          <Button
            variant={isActive ? "sidebar" : "ghost"}
            className={`justify-start text-left ${
              isCollapsed ? "px-2" : ""
            } text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent`}
            onClick={() => {
              setCurrentPage(item.id);
            }}
          >
            {item.icon}
            {!isCollapsed && (
              <>
                <span className="ml-2 flex-grow font-light text-left text-xs">{item.label}</span>
                {hasSubItems && (
                  isHovered || isActive ? 
                  <ChevronDownIcon className="h-4 w-4" /> : 
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </>
            )}
          </Button>
        )}
        
        {/* Tooltip and submenu for collapsed state */}
        {isCollapsed && (
          <div 
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block z-50"
            onMouseEnter={() => handleSubMenuMouseEnter(item.id)}
            onMouseLeave={handleSubMenuMouseLeave}
          >
            {/* Tooltip */}
            <div className="bg-sidebar text-sidebar-foreground py-1 px-3 rounded shadow-md whitespace-nowrap text-xs relative">
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-sidebar"></div>
              {item.label}
            </div>
            
            {/* Submenu for plans in collapsed state */}
            {hasSubItems && item.id === "plans" && (hoveredSubMenu === item.id || hoveredMenu === item.id) && (
              <div className="absolute left-full top-0 mt-8 ml-2 bg-sidebar border border-sidebar-border rounded-md shadow-lg z-50 py-2 min-w-48">
                {item.subItems.map(subItem => {
                  const isCurrentPlan = currentPage === "plan_detail" && 
                                      subItem.id === currentSubPath;
                  
                  return (
                    <a
                      key={subItem.id}
                      href={`/plans/${subItem.id}`}
                      className={`flex items-center px-4 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent ${
                        isCurrentPlan ? "bg-sidebar-accent/70" : ""
                      }`}
                      onClick={(e) => navigateToPlan(`/plans/${subItem.id}`, e)}
                    >
                      {subItem.icon}
                      <span className="ml-2 text-xs">{subItem.label}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}
        
        {/* Submenu for expanded sidebar */}
        {hasSubItems && (isHovered || (currentPage === "plan_detail" && item.id === "plans")) && !isCollapsed && (
          <div 
            className="ml-7 border-l border-sidebar-border pl-2 mt-1 mb-1"
            onMouseEnter={() => handleMouseEnter(item.id)}
          >
            {item.subItems.map(subItem => {
              // For plan pages, check if this submenu item matches the current subPath
              const isCurrentPlan = currentPage === "plan_detail" && 
                                  subItem.id === currentSubPath;
              
              return (
                item.id === "plans" ? (
                  // For plan items, use anchor tag with custom click handler
                  <a
                    key={subItem.id}
                    href={`/plans/${subItem.id}`}
                    className={`flex items-center px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent mt-1 ${
                      isCurrentPlan ? "bg-sidebar-accent/70" : ""
                    }`}
                    onClick={(e) => navigateToPlan(`/plans/${subItem.id}`, e)}
                  >
                    {subItem.icon}
                    <span className="ml-2 text-left text-xs">{subItem.label}</span>
                  </a>
                ) : (
                  // For non-plan items, use Button as before
                  <Button
                    key={subItem.id}
                    variant={currentPage === subItem.id ? "sidebar" : "ghost"}
                    className="justify-start text-left text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent mt-1"
                    onClick={() => setCurrentPage(subItem.id)}
                  >
                    {subItem.icon}
                    <span className="ml-2 text-left text-xs">{subItem.label}</span>
                  </Button>
                )
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const userInitials = userData ? `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}` : 'U';

  return (
    <>
      {/* Mobile menu toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <XIcon /> : <MenuIcon />}
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ${
          isCollapsed ? "w-[70px]" : "w-[250px]"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo and collapse toggle */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border">
          <div className="flex items-center">
            {isCollapsed ? (
              <div className="app-logo-icon-sm flex-shrink-0">
                <ITHealthIconTransparentWhite />
              </div>
            ) : (
              <Logo className="app-logo-sm" variant="white" />
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex text-white hover:bg-white/10"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Menu items */}
        <nav className="flex flex-col gap-1 p-2 flex-grow overflow-auto">
          {/* Start Assessment Button */}
          <div className="mb-3">
            <AssessmentButton 
              onClick={handleStartAssessment} 
              variant={isCollapsed ? "icon" : "default"}
              className="w-full justify-center"
            />
          </div>
          
          {menuItems.map(renderMenuItem)}
        </nav>

        {/* Bottom user controls section */}
        <div className="mt-auto p-2 border-t border-sidebar-border">
          {/* Action buttons for notifications and theme toggle */}
          <div className={`flex ${isCollapsed ? 'flex-col' : 'justify-between'} items-center mb-3 gap-2`}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-9 w-9 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-[10px]">
                3
              </Badge>
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="h-9 w-9 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>

          {/* User profile */}
          {userData && (
            isCollapsed ? (
              <Button 
                variant="ghost" 
                className="w-full rounded-full p-0 hover:bg-sidebar-accent"
                onClick={navigateToProfile}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full flex items-center justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userData.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-xs">
                      <span className="font-medium">{userData.firstName} {userData.lastName}</span>
                      <span className="text-sidebar-foreground/70 text-[10px]">{userData.role}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56" side="right">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={navigateToProfile}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={navigateToSettings}>
                    <SettingsIcon className="mr-2 h-4 w-4" />
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
            )
          )}
        </div>
      </aside>

      {/* Content margin to account for sidebar */}
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "lg:ml-[70px]" : "lg:ml-[250px]"
        }`}
      />
    </>
  );
}
