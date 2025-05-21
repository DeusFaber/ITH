
import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { PageBreadcrumbs } from "./PageBreadcrumbs";
import { Toaster } from "sonner@2.0.3";

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

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userData: UserData;
  onLogout: () => void;
  subPath?: string;
  customPaths?: {
    [key: string]: {
      label: string;
      parent?: string;
    };
  };
  pageDescription?: string;
  pageTitle?: string;
}

export function MainLayout({ 
  children, 
  currentPage, 
  setCurrentPage, 
  userData, 
  onLogout,
  subPath,
  customPaths,
  pageDescription,
  pageTitle
}: MainLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Use effect to check if we're on a plan detail page and log the subPath for debugging
  useEffect(() => {
    if (currentPage === "plan_detail" && subPath) {
      console.log("MainLayout: Plan detail page with subPath:", subPath);
    }
  }, [currentPage, subPath]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    // Initial check
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Define page structure as in breadcrumbs to avoid duplication
  const PAGE_STRUCTURE = {
    dashboard: { label: "Dashboard" },
    inbox: { label: "Inbox" },
    itprogram: { label: "IT Health Program" },
    rewards: { label: "Rewards" },
    plans: { label: "Marketplace" },
    kit: { label: "Kit" },
    resources: { label: "Skills" },
    people: { label: "People" },
    profile: { label: "Profile", parent: "dashboard" },
    settings: { label: "Settings" },
  };

  return (
    <div className="flex flex-col bg-background font-light min-h-screen w-full m-0 p-0 overflow-hidden">
      <Toaster position="top-right" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          isMobile={isMobile}
          userData={userData}
          onLogout={onLogout}
          navigateToProfile={() => setCurrentPage("profile")}
          navigateToSettings={() => setCurrentPage("settings")}
          currentSubPath={subPath}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <PageBreadcrumbs 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
              subPath={subPath}
              customPaths={customPaths}
              pageDescription={pageDescription}
            />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
