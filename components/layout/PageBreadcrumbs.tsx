
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface PageBreadcrumbsProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  subPath?: string;
  customPaths?: {
    [key: string]: {
      label: string;
      parent?: string;
    };
  };
  pageDescription?: string;
}

// Define the page structure (for breadcrumb hierarchy)
const PAGE_STRUCTURE: {
  [key: string]: {
    label: string;
    parent?: string;
  };
} = {
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
  billing: { label: "Billing", parent: "settings" },
  feedback: { label: "Give Feedback", parent: "settings" },
  admin: { label: "Admin Panel", parent: "settings" },
  design_system: { label: "Design System" },
  assessment: { label: "Assessment", parent: "dashboard" },
  assessment_history: { label: "Assessment History", parent: "assessment" },
  reminder_settings: { label: "Reminder Settings", parent: "assessment" },
  team_settings: { label: "Team Settings", parent: "assessment" },
  embedded_assessment: { label: "Quick Assessment", parent: "assessment" },
};

export function PageBreadcrumbs({ 
  currentPage, 
  setCurrentPage, 
  subPath,
  customPaths,
  pageDescription
}: PageBreadcrumbsProps) {
  // Combine default structure with any custom paths
  const pageStructure = { ...PAGE_STRUCTURE, ...customPaths };
  
  // If we're on the dashboard, don't show breadcrumbs
  if (currentPage === "dashboard") {
    return (
      <div className="mb-6">
        {pageDescription && <p className="text-muted-foreground">{pageDescription}</p>}
      </div>
    );
  }
  
  // Build breadcrumb path array (without the current page)
  const buildBreadcrumbPath = () => {
    const path = [];
    let current = currentPage;
    
    // If the current page isn't in our structure, return empty path
    if (!pageStructure[current]) {
      return [];
    }
    
    // Add parent pages recursively (but not the current page)
    while (pageStructure[current]?.parent) {
      current = pageStructure[current].parent!;
      path.unshift(current);
    }
    
    return path;
  };
  
  const breadcrumbPath = buildBreadcrumbPath();
  
  return (
    <div className="mb-6">
      {pageDescription && (
        <p className="text-muted-foreground mb-3">{pageDescription}</p>
      )}
      
      {breadcrumbPath.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbPath.map((page, index) => (
              <React.Fragment key={page}>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    onClick={() => setCurrentPage(page)} 
                    className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                  >
                    {pageStructure[page]?.label || page}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumbPath.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  );
}
