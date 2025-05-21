import { useState, useEffect } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { SplitLoginLayout } from "./components/auth/SplitLoginLayout";
import { Dashboard } from "./pages/Dashboard";
import { Rewards } from "./pages/Rewards";
import { Billing } from "./pages/Billing";
import { Resources } from "./pages/Resources";
import { Inbox } from "./pages/Inbox";
import { Feedback } from "./pages/Feedback";
import { Admin } from "./pages/Admin";
import { IThealthProgram } from "./pages/IThealthProgram";
import { People } from "./pages/People";
import { Profile } from "./pages/Profile";
import { Assessment } from "./pages/Assessment";
import { AssessmentHistory } from "./pages/AssessmentHistory";
import { ReminderSettings } from "./pages/ReminderSettings";
import { TeamSettings } from "./pages/TeamSettings";
import { Kit } from "./pages/Kit";
import { Plans } from "./pages/Plans";
import { MarketplacePlans } from "./pages/MarketplacePlans";
import { PlanDetail } from "./pages/PlanDetail";
import { EnhancedPlanDetail } from "./pages/EnhancedPlanDetail";
import { PlanComparison } from "./pages/PlanComparison";
import { ITHealthPlans } from "./pages/ITHealthPlans";
import { Settings } from "./pages/Settings";
import { DesignSystem } from "./pages/DesignSystem";
import { PublicWebsite } from "./pages/PublicWebsite";
import PlanErrorBoundary from "./components/plans/PlanErrorBoundary";

// Import plan pages
import UserHealthPlan from "./pages/plans/UserHealthPlan";
import OfficeHealthPlan from "./pages/plans/OfficeHealthPlan";
import CommunicationPlan from "./pages/plans/CommunicationPlan";
import ITsafeUserPlan from "./pages/plans/ITsafeUserPlan";
import ITsafeServerPlan from "./pages/plans/ITsafeServerPlan";
import MailPlan from "./pages/plans/MailPlan";
import BusinessBasicPlan from "./pages/plans/BusinessBasicPlan";
import BusinessStandardPlan from "./pages/plans/BusinessStandardPlan";
import SharePointPlan from "./pages/plans/SharePointPlan";
import ReportingPlan from "./pages/plans/ReportingPlan";
import WorkflowOptimizationPlan from "./pages/plans/WorkflowOptimizationPlan";
import DigitalCustomerPlan from "./pages/plans/DigitalCustomerPlan";
import AIConnectPlan from "./pages/plans/AIConnectPlan";
import { EmbeddedAssessment } from "./components/assessment/EmbeddedAssessment";
import { BusinessOnboarding } from "./components/onboarding/BusinessOnboarding";
import { AssessmentProvider } from "./contexts/AssessmentContext";
import { toast } from "sonner@2.0.3";

// Storage keys for assessment progress
const STORAGE_KEY_FULL_ASSESSMENT =
  "ithealth_full_assessment_progress";
const STORAGE_KEY_EMBEDDED_ASSESSMENT =
  "ithealth_embedded_assessment_progress";

// Mock user data that would normally come from an authentication system
const defaultUserData = {
  id: "u-123456",
  firstName: "John",
  lastName: "Smith",
  email: "john@acme.com",
  role: "IT Manager",
  company: "Acme Inc.",
  avatar:
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  isAdmin: false,
};

// Page descriptions for consistent UI
const PAGE_DESCRIPTIONS = {
  inbox:
    "Manage your communications, support tickets, and updates in one place",
  resources:
    "Develop and track skills across your organization",
  people: "",
  plans: "Browse and purchase IT plans for your organization",
  kit: "Manage your organization's hardware and software inventory",
  settings:
    "Manage your account, billing, feedback, and administrative options",
  profile: "Update your personal information and preferences",
  rewards: "",
  itprogram: "Follow your customized IT Health Program journey",
};

// Set up custom breadcrumb paths for special views
const customBreadcrumbPaths = {
  assessment: { label: "Assessment", parent: "dashboard" },
  assessment_history: {
    label: "Assessment History",
    parent: "assessment",
  },
  reminder_settings: {
    label: "Reminder Settings",
    parent: "assessment",
  },
  team_settings: {
    label: "Team Settings",
    parent: "assessment",
  },
  embedded_assessment: {
    label: "Quick Assessment",
    parent: "assessment",
  },
};

// Route mapping for path-based navigation
const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  ASSESSMENT: "/assessment",
  ASSESSMENT_HISTORY: "/assessment/history",
  REMINDER_SETTINGS: "/assessment/reminders",
  TEAM_SETTINGS: "/assessment/team",
  EMBEDDED_ASSESSMENT: "/assessment/quick",
  LOGIN: "/login",
  ONBOARDING: "/get-started",
  DESIGN_SYSTEM: "/design-system",
  RESOURCES: "/resources",
  PEOPLE: "/people",
  PLANS: "/plans",
  PLAN_DETAIL: "/plans/:id",
  PLAN_COMPARISON: "/plans/compare",

  // Specific plan routes
  USER_HEALTH_PLAN: "/plans/user-health-plan",
  OFFICE_HEALTH_PLAN: "/plans/office-health-plan",
  COMMUNICATION_PLAN: "/plans/communication-plan",
  ITSAFE_USER_PLAN: "/plans/itsafe-user-plan",
  ITSAFE_SERVER_PLAN: "/plans/itsafe-server-plan",
  MAIL_PLAN: "/plans/mail-plan",
  BUSINESS_BASIC_PLAN: "/plans/business-basic-plan",
  BUSINESS_STANDARD_PLAN: "/plans/business-standard-plan",
  SHAREPOINT_PLAN: "/plans/sharepoint-plan",
  REPORTING_PLAN: "/plans/reporting-plan",
  WORKFLOW_OPTIMIZATION_PLAN:
    "/plans/workflow-optimization-plan",
  DIGITAL_CUSTOMER_PLAN: "/plans/digital-customer-plan",
  AI_CONNECT_PLAN: "/plans/ai-connect-plan",

  KIT: "/kit",
  INBOX: "/inbox",
  SETTINGS: "/settings",
  BILLING: "/settings/billing",
  FEEDBACK: "/settings/feedback",
  ADMIN: "/settings/admin",
  PROFILE: "/profile",
  ITPROGRAM: "/program",
  REWARDS: "/rewards",
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [userData, setUserData] = useState(defaultUserData);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showAssessmentHistory, setShowAssessmentHistory] =
    useState(false);
  const [showReminderSettings, setShowReminderSettings] =
    useState(false);
  const [showTeamSettings, setShowTeamSettings] =
    useState(false);
  const [showEmbeddedAssessment, setShowEmbeddedAssessment] =
    useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [embeddedAssessmentData, setEmbeddedAssessmentData] =
    useState(null);
  const [currentSubPath, setCurrentSubPath] = useState<
    string | undefined
  >(undefined);
  const [showPublicPlanDetail, setShowPublicPlanDetail] =
    useState(false);

  // Parse the current route from URL
  const parseRoute = (url = window.location.pathname) => {
    console.log("Parsing route for URL:", url);

    // Create a mapping of plan URLs to their corresponding route constants
    const planRoutes = {
      [ROUTES.USER_HEALTH_PLAN]: ROUTES.USER_HEALTH_PLAN,
      [ROUTES.OFFICE_HEALTH_PLAN]: ROUTES.OFFICE_HEALTH_PLAN,
      [ROUTES.COMMUNICATION_PLAN]: ROUTES.COMMUNICATION_PLAN,
      [ROUTES.ITSAFE_USER_PLAN]: ROUTES.ITSAFE_USER_PLAN,
      [ROUTES.ITSAFE_SERVER_PLAN]: ROUTES.ITSAFE_SERVER_PLAN,
      [ROUTES.MAIL_PLAN]: ROUTES.MAIL_PLAN,
      [ROUTES.BUSINESS_BASIC_PLAN]: ROUTES.BUSINESS_BASIC_PLAN,
      [ROUTES.BUSINESS_STANDARD_PLAN]:
        ROUTES.BUSINESS_STANDARD_PLAN,
      [ROUTES.SHAREPOINT_PLAN]: ROUTES.SHAREPOINT_PLAN,
      [ROUTES.REPORTING_PLAN]: ROUTES.REPORTING_PLAN,
      [ROUTES.WORKFLOW_OPTIMIZATION_PLAN]:
        ROUTES.WORKFLOW_OPTIMIZATION_PLAN,
      [ROUTES.DIGITAL_CUSTOMER_PLAN]:
        ROUTES.DIGITAL_CUSTOMER_PLAN,
      [ROUTES.AI_CONNECT_PLAN]: ROUTES.AI_CONNECT_PLAN,
    };

    // Check if the URL matches any of the plan routes
    if (planRoutes[url]) {
      console.log("Matched specific plan route:", url);
      return { route: planRoutes[url], params: {} };
    }

    // Handle generic plan detail routes with IDs
    if (url.match(/^\/plans\/[^/]+$/)) {
      return {
        route: ROUTES.PLAN_DETAIL,
        params: { id: url.split("/")[2] },
      };
    }

    // Map routes to page states
    switch (url) {
      case ROUTES.HOME:
      case ROUTES.DASHBOARD:
        return { route: ROUTES.DASHBOARD, params: {} };
      case ROUTES.ASSESSMENT:
        return { route: ROUTES.ASSESSMENT, params: {} };
      case ROUTES.ASSESSMENT_HISTORY:
        return { route: ROUTES.ASSESSMENT_HISTORY, params: {} };
      case ROUTES.REMINDER_SETTINGS:
        return { route: ROUTES.REMINDER_SETTINGS, params: {} };
      case ROUTES.TEAM_SETTINGS:
        return { route: ROUTES.TEAM_SETTINGS, params: {} };
      case ROUTES.EMBEDDED_ASSESSMENT:
        return {
          route: ROUTES.EMBEDDED_ASSESSMENT,
          params: {},
        };
      case ROUTES.LOGIN:
        return { route: ROUTES.LOGIN, params: {} };
      case ROUTES.ONBOARDING:
        return { route: ROUTES.ONBOARDING, params: {} };
      case ROUTES.DESIGN_SYSTEM:
        return { route: ROUTES.DESIGN_SYSTEM, params: {} };
      case ROUTES.RESOURCES:
        return { route: ROUTES.RESOURCES, params: {} };
      case ROUTES.PEOPLE:
        return { route: ROUTES.PEOPLE, params: {} };
      case ROUTES.PLANS:
        return { route: ROUTES.PLANS, params: {} };
      case ROUTES.PLAN_COMPARISON:
        return { route: ROUTES.PLAN_COMPARISON, params: {} };
      case ROUTES.KIT:
        return { route: ROUTES.KIT, params: {} };
      case ROUTES.INBOX:
        return { route: ROUTES.INBOX, params: {} };
      case ROUTES.SETTINGS:
        return { route: ROUTES.SETTINGS, params: {} };
      case ROUTES.BILLING:
        return { route: ROUTES.BILLING, params: {} };
      case ROUTES.FEEDBACK:
        return { route: ROUTES.FEEDBACK, params: {} };
      case ROUTES.ADMIN:
        return { route: ROUTES.ADMIN, params: {} };
      case ROUTES.PROFILE:
        return { route: ROUTES.PROFILE, params: {} };
      case ROUTES.ITPROGRAM:
        return { route: ROUTES.ITPROGRAM, params: {} };
      case ROUTES.REWARDS:
        return { route: ROUTES.REWARDS, params: {} };
      default:
        return { route: ROUTES.DASHBOARD, params: {} };
    }
  };

  // Navigation function for clean URL paths
  const navigateTo = (path: string, params = {}) => {
    // Push the new URL to browser history
    window.history.pushState(params, "", path);

    // Update application state based on the new URL
    handleRouteChange();
  };

  // Handle route changes
  const handleRouteChange = () => {
    const { route, params } = parseRoute();
    console.log("Route change detected:", route);

    // Reset all special page states
    setShowAssessment(false);
    setShowAssessmentHistory(false);
    setShowReminderSettings(false);
    setShowTeamSettings(false);
    setShowEmbeddedAssessment(false);
    setShowLoginForm(false);
    setShowOnboarding(false);
    setCurrentSubPath(undefined);
    setShowPublicPlanDetail(false);

    // Set appropriate page states based on route
    switch (route) {
      case ROUTES.DASHBOARD:
        setCurrentPage("dashboard");
        break;
      case ROUTES.ASSESSMENT:
        setShowAssessment(true);
        break;
      case ROUTES.ASSESSMENT_HISTORY:
        setShowAssessmentHistory(true);
        break;
      case ROUTES.REMINDER_SETTINGS:
        setShowReminderSettings(true);
        break;
      case ROUTES.TEAM_SETTINGS:
        setShowTeamSettings(true);
        break;
      case ROUTES.EMBEDDED_ASSESSMENT:
        setShowEmbeddedAssessment(true);
        break;
      case ROUTES.LOGIN:
        setShowLoginForm(true);
        break;
      case ROUTES.ONBOARDING:
        setShowOnboarding(true);
        break;
      case ROUTES.DESIGN_SYSTEM:
        setCurrentPage("design_system");
        break;
      case ROUTES.RESOURCES:
        setCurrentPage("resources");
        break;
      case ROUTES.PEOPLE:
        setCurrentPage("people");
        break;
      case ROUTES.PLANS:
        setCurrentPage("plans");
        break;
      // Explicitly handle each plan page separately for better clarity
      case ROUTES.USER_HEALTH_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("user-health-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log("Setting up User Health Plan page");
        break;
      case ROUTES.OFFICE_HEALTH_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("office-health-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log("Setting up Office Health Plan page");
        break;
      case ROUTES.COMMUNICATION_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("communication-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log("Setting up Communication Plan page");
        break;
      case ROUTES.ITSAFE_USER_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("itsafe-user-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log("Setting up ITsafe User Plan page");
        break;
      case ROUTES.ITSAFE_SERVER_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("itsafe-server-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log("Setting up ITsafe Server Plan page");
        break;
      case ROUTES.MAIL_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("mail-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log("Setting up Mail Plan page");
        break;
      case ROUTES.BUSINESS_BASIC_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("business-basic-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log("Setting up Business Basic Plan page");
        break;
      case ROUTES.BUSINESS_STANDARD_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("business-standard-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log("Setting up Business Standard Plan page");
        break;
      case ROUTES.SHAREPOINT_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("sharepoint-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log("Setting up SharePoint Plan page");
        break;
      case ROUTES.REPORTING_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("reporting-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log("Setting up Reporting Plan page");
        break;
      case ROUTES.WORKFLOW_OPTIMIZATION_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("workflow-optimization-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log(
          "Setting up Workflow Optimization Plan page",
        );
        break;
      case ROUTES.DIGITAL_CUSTOMER_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("digital-customer-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log("Setting up Digital Customer Plan page");
        break;
      case ROUTES.AI_CONNECT_PLAN:
        setCurrentPage("plan_detail");
        setCurrentSubPath("ai-connect-plan");
        if (!isAuthenticated) {
          setShowPublicPlanDetail(true);
        }
        console.log("Setting up AI Connect Plan page");
        break;
      case ROUTES.PLAN_DETAIL:
        setCurrentPage("plan_detail");
        if (params.id) {
          setCurrentSubPath(params.id);
          if (!isAuthenticated) {
            setShowPublicPlanDetail(true);
          }
          console.log(
            "Setting up generic plan page with ID:",
            params.id,
          );
        }
        break;
      case ROUTES.PLAN_COMPARISON:
        setCurrentPage("plan_comparison");
        break;
      case ROUTES.KIT:
        setCurrentPage("kit");
        break;
      case ROUTES.INBOX:
        setCurrentPage("inbox");
        break;
      case ROUTES.SETTINGS:
        setCurrentPage("settings");
        break;
      case ROUTES.BILLING:
        setCurrentPage("billing");
        break;
      case ROUTES.FEEDBACK:
        setCurrentPage("feedback");
        break;
      case ROUTES.ADMIN:
        setCurrentPage("admin");
        break;
      case ROUTES.PROFILE:
        setCurrentPage("profile");
        break;
      case ROUTES.ITPROGRAM:
        setCurrentPage("itprogram");
        break;
      case ROUTES.REWARDS:
        setCurrentPage("rewards");
        break;
    }
  };

  useEffect(() => {
    // Check URL parameters for backward compatibility
    const urlParams = new URLSearchParams(
      window.location.search,
    );

    // Handle legacy query parameters
    if (urlParams.get("admin") === "true") {
      setUserData((prev) => ({ ...prev, isAdmin: true }));
    }

    if (urlParams.get("login") === "true") {
      navigateTo(ROUTES.LOGIN);
      return;
    }

    if (urlParams.get("onboarding") === "true") {
      navigateTo(ROUTES.ONBOARDING);
      return;
    }

    if (urlParams.get("assessment") === "true") {
      navigateTo(ROUTES.ASSESSMENT);

      // Check if we have embedded assessment in progress
      const savedEmbeddedProgress = localStorage.getItem(
        STORAGE_KEY_EMBEDDED_ASSESSMENT,
      );
      if (savedEmbeddedProgress) {
        try {
          const parsedData = JSON.parse(savedEmbeddedProgress);
          if (
            parsedData.answers &&
            Object.keys(parsedData.answers).length > 0
          ) {
            setEmbeddedAssessmentData(parsedData);
            // Clear embedded storage since we're transferring to full assessment
            localStorage.removeItem(
              STORAGE_KEY_EMBEDDED_ASSESSMENT,
            );
          }
        } catch (error) {
          console.error(
            "Failed to parse saved embedded assessment progress:",
            error,
          );
        }
      }
      return;
    }

    if (urlParams.get("history") === "true") {
      navigateTo(ROUTES.ASSESSMENT_HISTORY);
      return;
    }

    if (urlParams.get("reminders") === "true") {
      navigateTo(ROUTES.REMINDER_SETTINGS);
      return;
    }

    if (urlParams.get("teams") === "true") {
      navigateTo(ROUTES.TEAM_SETTINGS);
      return;
    }

    if (urlParams.get("embedded_assessment") === "true") {
      navigateTo(ROUTES.EMBEDDED_ASSESSMENT);
      return;
    }

    if (urlParams.get("design_system") === "true") {
      navigateTo(ROUTES.DESIGN_SYSTEM);
      return;
    }

    // Initialize route based on URL path if no query parameters
    if (urlParams.toString() === "") {
      handleRouteChange();
    }

    // Listen for popstate events (browser back/forward buttons)
    const handlePopState = () => {
      handleRouteChange();
    };

    window.addEventListener("popstate", handlePopState);

    // Handle data-page-id buttons without direct DOM manipulation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest("button");
      if (button) {
        const pageId = button.getAttribute("data-page-id");
        if (pageId) {
          // Map page IDs to routes
          switch (pageId) {
            case "dashboard":
              navigateTo(ROUTES.DASHBOARD);
              break;
            case "resources":
              navigateTo(ROUTES.RESOURCES);
              break;
            case "people":
              navigateTo(ROUTES.PEOPLE);
              break;
            case "plans":
              navigateTo(ROUTES.PLANS);
              break;
            case "kit":
              navigateTo(ROUTES.KIT);
              break;
            case "inbox":
              navigateTo(ROUTES.INBOX);
              break;
            case "settings":
              navigateTo(ROUTES.SETTINGS);
              break;
            case "profile":
              navigateTo(ROUTES.PROFILE);
              break;
            case "itprogram":
              navigateTo(ROUTES.ITPROGRAM);
              break;
            case "rewards":
              navigateTo(ROUTES.REWARDS);
              break;
            case "reminder-settings":
              navigateTo(ROUTES.REMINDER_SETTINGS);
              break;
            case "team-settings":
              navigateTo(ROUTES.TEAM_SETTINGS);
              break;
            default:
              navigateTo(`/${pageId}`);
          }
        }

        // Check for special attribute flags
        if (button.getAttribute("data-assessment") === "true") {
          navigateTo(ROUTES.ASSESSMENT);
        }

        if (
          button.getAttribute("data-assessment-history") ===
          "true"
        ) {
          navigateTo(ROUTES.ASSESSMENT_HISTORY);
        }

        if (
          button.getAttribute("data-reminder-settings") ===
          "true"
        ) {
          navigateTo(ROUTES.REMINDER_SETTINGS);
        }

        if (
          button.getAttribute("data-team-settings") === "true"
        ) {
          navigateTo(ROUTES.TEAM_SETTINGS);
        }

        if (
          button.getAttribute("data-embedded-assessment") ===
          "true"
        ) {
          navigateTo(ROUTES.EMBEDDED_ASSESSMENT);
        }

        if (
          button.getAttribute("data-design-system") === "true"
        ) {
          navigateTo(ROUTES.DESIGN_SYSTEM);
        }

        // Check for subpath data
        const subPath = button.getAttribute("data-subpath");
        if (subPath && currentPage === "plan_detail") {
          navigateTo(`/plans/${subPath}`);
        }
      }

      // Intercept anchor clicks for internal navigation
      const anchor = target.closest("a");
      if (
        anchor &&
        anchor.getAttribute("href")?.startsWith("/")
      ) {
        e.preventDefault();
        const href = anchor.getAttribute("href") || "/";

        // Check if this is a link to a specific plan
        if (href.startsWith("/plans/")) {
          // Log the navigation attempt to help with debugging
          console.log("Navigating to plan page:", href);

          // Special handling for plan pages
          const planPages = [
            "/plans/user-health-plan",
            "/plans/office-health-plan",
            "/plans/communication-plan",
            "/plans/itsafe-user-plan",
            "/plans/itsafe-server-plan",
            "/plans/mail-plan",
            "/plans/business-basic-plan",
            "/plans/business-standard-plan",
            "/plans/sharepoint-plan",
            "/plans/reporting-plan",
            "/plans/workflow-optimization-plan",
            "/plans/digital-customer-plan",
            "/plans/ai-connect-plan",
          ];

          if (planPages.includes(href)) {
            // Direct navigation to specific plan pages
            navigateTo(href);
          } else if (href === "/plans/compare") {
            // Handle plan comparison page
            navigateTo(ROUTES.PLAN_COMPARISON);
          } else if (href === "/plans") {
            // Handle main plans page
            navigateTo(ROUTES.PLANS);
          } else {
            // Handle generic plan detail pages
            navigateTo(href);
          }
        } else {
          // Handle all other internal links
          navigateTo(href);
        }
      }
    };

    // Add event listener
    document.addEventListener("click", handleClick);

    // Ensure Poppins font is loaded
    document.documentElement.style.setProperty(
      "--font-family",
      "'Poppins', sans-serif",
    );

    // Force font loading with classes
    document.body.classList.add("font-poppins");

    // Cleanup
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast.success("Successfully logged in!");
    navigateTo(ROUTES.DASHBOARD);
  };

  const handleLoginClick = () => {
    navigateTo(ROUTES.LOGIN);
  };

  const handleLogout = () => {
    // Clear any user session/data
    setIsAuthenticated(false);
    // Reset user data to defaults
    setUserData(defaultUserData);

    toast.success("Successfully logged out");

    // Navigate to home page
    navigateTo(ROUTES.HOME);
  };

  const handleCloseAssessment = () => {
    // Navigate to dashboard
    navigateTo(ROUTES.DASHBOARD);
  };

  // Determine what breadcrumb path should be used for special views
  const getSpecialViewPage = () => {
    if (showAssessment) return "assessment";
    if (showAssessmentHistory) return "assessment_history";
    if (showReminderSettings) return "reminder_settings";
    if (showTeamSettings) return "team_settings";
    if (showEmbeddedAssessment) return "embedded_assessment";
    return currentPage;
  };

  // Get the appropriate page description
  const getPageDescription = () => {
    const effectivePage = getSpecialViewPage();
    return (
      PAGE_DESCRIPTIONS[
        effectivePage as keyof typeof PAGE_DESCRIPTIONS
      ] || ""
    );
  };

  // Render the specific plan component needed for current path
  const renderPlanComponent = () => {
    // Map of subpath identifiers to components
    const planComponents: { [key: string]: React.ReactNode } = {
      "user-health-plan": <UserHealthPlan />,
      "office-health-plan": <OfficeHealthPlan />,
      "communication-plan": <CommunicationPlan />,
      "itsafe-user-plan": <ITsafeUserPlan />,
      "itsafe-server-plan": <ITsafeServerPlan />,
      "mail-plan": <MailPlan />,
      "business-basic-plan": <BusinessBasicPlan />,
      "business-standard-plan": <BusinessStandardPlan />,
      "sharepoint-plan": <SharePointPlan />,
      "reporting-plan": <ReportingPlan />,
      "workflow-optimization-plan": (
        <WorkflowOptimizationPlan />
      ),
      "digital-customer-plan": <DigitalCustomerPlan />,
      "ai-connect-plan": <AIConnectPlan />,
    };

    // Return the appropriate component based on currentSubPath
    if (currentSubPath && planComponents[currentSubPath]) {
      return planComponents[currentSubPath];
    }

    // Fallback: check URL directly as a secondary mechanism
    const path = window.location.pathname;
    console.log("Fallback check for URL path:", path);

    if (path === ROUTES.USER_HEALTH_PLAN) {
      return <UserHealthPlan />;
    } else if (path === ROUTES.OFFICE_HEALTH_PLAN) {
      return <OfficeHealthPlan />;
    } else if (path === ROUTES.COMMUNICATION_PLAN) {
      return <CommunicationPlan />;
    } else if (path === ROUTES.ITSAFE_USER_PLAN) {
      return <ITsafeUserPlan />;
    } else if (path === ROUTES.ITSAFE_SERVER_PLAN) {
      return <ITsafeServerPlan />;
    } else if (path === ROUTES.MAIL_PLAN) {
      return <MailPlan />;
    } else if (path === ROUTES.BUSINESS_BASIC_PLAN) {
      return <BusinessBasicPlan />;
    } else if (path === ROUTES.BUSINESS_STANDARD_PLAN) {
      return <BusinessStandardPlan />;
    } else if (path === ROUTES.SHAREPOINT_PLAN) {
      return <SharePointPlan />;
    } else if (path === ROUTES.REPORTING_PLAN) {
      return <ReportingPlan />;
    } else if (path === ROUTES.WORKFLOW_OPTIMIZATION_PLAN) {
      return <WorkflowOptimizationPlan />;
    } else if (path === ROUTES.DIGITAL_CUSTOMER_PLAN) {
      return <DigitalCustomerPlan />;
    } else if (path === ROUTES.AI_CONNECT_PLAN) {
      return <AIConnectPlan />;
    } else {
      // Fallback to generic plan detail page
      console.log("Falling back to generic plan detail page");
      return <EnhancedPlanDetail />;
    }
  };

  // Update page title based on current page and special views
  useEffect(() => {
    if (showAssessment) {
      document.title = "IThealth Assessment";
    } else if (showAssessmentHistory) {
      document.title = "Assessment History | IThealth";
    } else if (showReminderSettings) {
      document.title = "Assessment Reminders | IThealth";
    } else if (showTeamSettings) {
      document.title = "Team Assessment | IThealth";
    } else if (showEmbeddedAssessment) {
      document.title = "Quick Assessment | IThealth";
    } else if (showOnboarding) {
      document.title = "Get Started | IThealth";
    } else if (currentPage === "resources") {
      document.title = "Skills | IThealth";
    } else if (currentPage === "people") {
      document.title = "People Directory | IThealth";
    } else if (currentPage === "plans") {
      document.title = "Marketplace | IThealth";
    } else if (currentPage === "plan_detail") {
      // More specific titles for plan detail pages
      if (currentSubPath === "user-health-plan") {
        document.title = "User Health Plan | IThealth";
      } else if (currentSubPath === "office-health-plan") {
        document.title = "Office Health Plan | IThealth";
      } else if (currentSubPath === "communication-plan") {
        document.title = "Communication Plan | IThealth";
      } else if (currentSubPath === "itsafe-user-plan") {
        document.title = "ITsafe User Plan | IThealth";
      } else if (currentSubPath === "itsafe-server-plan") {
        document.title = "ITsafe Server Plan | IThealth";
      } else if (currentSubPath === "mail-plan") {
        document.title = "Mail Plan | IThealth";
      } else if (currentSubPath === "business-basic-plan") {
        document.title = "Business Basic Plan | IThealth";
      } else if (currentSubPath === "business-standard-plan") {
        document.title = "Business Standard Plan | IThealth";
      } else if (currentSubPath === "sharepoint-plan") {
        document.title = "SharePoint Plan | IThealth";
      } else if (currentSubPath === "reporting-plan") {
        document.title = "Reporting Plan | IThealth";
      } else if (
        currentSubPath === "workflow-optimization-plan"
      ) {
        document.title =
          "Workflow Optimization Plan | IThealth";
      } else if (currentSubPath === "digital-customer-plan") {
        document.title = "Digital Customer Plan | IThealth";
      } else if (currentSubPath === "ai-connect-plan") {
        document.title = "AI Connect Plan | IThealth";
      } else {
        document.title = "Plan Details | IThealth";
      }
    } else if (currentPage === "kit") {
      document.title = "IT Kit Management | IThealth";
    } else if (currentPage === "inbox") {
      document.title = "Inbox | IThealth";
    } else if (currentPage === "profile") {
      document.title = "User Profile | IThealth";
    } else if (currentPage === "design_system") {
      document.title = "Design System | IThealth";
    } else if (
      currentPage === "settings" ||
      currentPage === "billing" ||
      currentPage === "feedback" ||
      currentPage === "admin"
    ) {
      document.title = "Settings | IThealth";
    } else if (currentPage === "itprogram") {
      document.title = "IT Health Program | IThealth";
    } else if (!isAuthenticated && !showLoginForm) {
      document.title = "IThealth - IT Transformation Platform";
    } else {
      document.title = "IThealth Dashboard";
    }
  }, [
    currentPage,
    currentSubPath,
    showAssessment,
    showAssessmentHistory,
    showReminderSettings,
    showTeamSettings,
    showEmbeddedAssessment,
    showLoginForm,
    showOnboarding,
    isAuthenticated,
  ]);

  // Render content based on current page and special views
  const renderContent = () => {
    // Show special views if any are active
    if (showAssessment) {
      return (
        <Assessment
          initialData={embeddedAssessmentData}
          onClose={handleCloseAssessment}
        />
      );
    }

    if (showAssessmentHistory) {
      return <AssessmentHistory />;
    }

    if (showReminderSettings) {
      return <ReminderSettings />;
    }

    if (showTeamSettings) {
      return <TeamSettings />;
    }

    if (showEmbeddedAssessment) {
      return (
        <div className="container mx-auto max-w-3xl">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue text-white p-4">
                <p className="text-white/80 text-xs">
                  Answer 7 quick questions to get personalized
                  insights
                </p>
              </div>
              <div className="p-4">
                <EmbeddedAssessment
                  showTitle={false}
                  onClose={handleCloseAssessment}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Otherwise, show the current page
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "plans":
        return <ITHealthPlans />;
      case "plan_detail":
        console.log(
          "Rendering plan detail page, currentSubPath:",
          currentSubPath,
        );
        return (
          <PlanErrorBoundary>
            {renderPlanComponent()}
          </PlanErrorBoundary>
        );
      case "plan_comparison":
        return <PlanComparison />;
      case "kit":
        return <Kit />;
      case "itprogram":
        try {
          return <IThealthProgram />;
        } catch (error) {
          console.error(
            "Error rendering IThealthProgram:",
            error,
          );
          return (
            <div className="p-8 text-center">
              <h2 className="text-2xl text-red-500 mb-4">
                Error Loading IT Health Program
              </h2>
              <p>
                There was an error loading the IT Health Program
                page. Please try again later.
              </p>
              <p className="mt-4 text-sm text-gray-500">
                {error instanceof Error
                  ? error.message
                  : "Unknown error"}
              </p>
            </div>
          );
        }
      case "rewards":
        return <Rewards />;
      case "tickets":
        return <Inbox />;
      case "inbox":
        return <Inbox />;
      case "settings":
        return <Settings />;
      case "billing":
        return (
          <Settings
            key="billing-settings"
            defaultTab="billing"
          />
        );
      case "feedback":
        return (
          <Settings
            key="feedback-settings"
            defaultTab="feedback"
          />
        );
      case "admin":
        return userData.isAdmin ? (
          <Settings key="admin-settings" defaultTab="admin" />
        ) : (
          <Dashboard />
        );
      case "resources":
        return <Resources />;
      case "people":
        return <People />;
      case "profile":
        return <Profile />;
      case "design_system":
        return <DesignSystem />;
      default:
        return <Dashboard />;
    }
  };

  // Check for assessment progress on component mount
  useEffect(() => {
    const hasFullAssessmentProgress =
      localStorage.getItem(STORAGE_KEY_FULL_ASSESSMENT) !==
      null;
    const hasEmbeddedAssessmentProgress =
      localStorage.getItem(STORAGE_KEY_EMBEDDED_ASSESSMENT) !==
      null;

    if (
      hasFullAssessmentProgress ||
      hasEmbeddedAssessmentProgress
    ) {
      // You could show a notification about saved progress here if desired
      console.log("User has saved assessment progress");
    }

    // Add additional CSS reset directly to body element
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);

  // Wrap the entire app with the AssessmentProvider
  return (
    <AssessmentProvider>
      <div className="w-full h-full m-0 p-0">
        {(() => {
          // For unauthenticated users, show special views if requested
          if (!isAuthenticated) {
            if (showAssessment)
              return (
                <Assessment
                  initialData={embeddedAssessmentData}
                  onClose={handleCloseAssessment}
                />
              );
            if (showAssessmentHistory)
              return <AssessmentHistory />;
            if (showReminderSettings)
              return <ReminderSettings />;
            if (showTeamSettings) return <TeamSettings />;
            if (currentPage === "design_system")
              return <DesignSystem />;
            if (showEmbeddedAssessment)
              return (
                <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4 m-0">
                  <div className="max-w-md w-full">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="bg-blue text-white p-4">
                        <p className="text-white/80 text-xs">
                          Answer 7 quick questions to get
                          personalized insights
                        </p>
                      </div>
                      <div className="p-4">
                        <EmbeddedAssessment
                          showTitle={false}
                          onClose={handleCloseAssessment}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );

            // Show specific plan detail on public site when requested
            if (showPublicPlanDetail) {
              console.log(
                "Rendering specific plan for public website:",
                currentSubPath,
              );
              return (
                <PublicWebsite
                  onLoginClick={handleLoginClick}
                  showPlanDetail={true}
                  planDetailId={currentSubPath}
                />
              );
            }

            // Show onboarding, login form or public website
            if (showOnboarding) {
              return (
                <BusinessOnboarding
                  onComplete={() => {
                    handleLogin(); // Auto-login after completing onboarding
                    toast.success(
                      "Account created successfully!",
                    );
                  }}
                  onCancel={() => {
                    navigateTo(ROUTES.HOME);
                  }}
                />
              );
            } else if (showLoginForm) {
              return (
                <SplitLoginLayout
                  onLogin={handleLogin}
                  onClose={() => {
                    navigateTo(ROUTES.HOME);
                  }}
                />
              );
            } else {
              return (
                <PublicWebsite
                  onLoginClick={handleLoginClick}
                />
              );
            }
          }

          // For authenticated users, show main layout with appropriate content
          const effectivePage = getSpecialViewPage();

          // Check if we're viewing a plan detail page
          const isPlanDetail =
            window.location.pathname.startsWith("/plans/") &&
            window.location.pathname !== "/plans/" &&
            window.location.pathname !== "/plans/compare";

          return (
            <MainLayout
              currentPage={
                isPlanDetail ? "plan_detail" : effectivePage
              }
              setCurrentPage={(page) => {
                // Map page IDs to routes for navigation
                switch (page) {
                  case "dashboard":
                    navigateTo(ROUTES.DASHBOARD);
                    break;
                  case "resources":
                    navigateTo(ROUTES.RESOURCES);
                    break;
                  case "people":
                    navigateTo(ROUTES.PEOPLE);
                    break;
                  case "plans":
                    navigateTo(ROUTES.PLANS);
                    break;
                  case "kit":
                    navigateTo(ROUTES.KIT);
                    break;
                  case "inbox":
                    navigateTo(ROUTES.INBOX);
                    break;
                  case "settings":
                    navigateTo(ROUTES.SETTINGS);
                    break;
                  case "profile":
                    navigateTo(ROUTES.PROFILE);
                    break;
                  case "itprogram":
                    navigateTo(ROUTES.ITPROGRAM);
                    break;
                  case "rewards":
                    navigateTo(ROUTES.REWARDS);
                    break;
                  case "billing":
                    navigateTo(ROUTES.BILLING);
                    break;
                  case "feedback":
                    navigateTo(ROUTES.FEEDBACK);
                    break;
                  case "admin":
                    navigateTo(ROUTES.ADMIN);
                    break;
                  default:
                    // For any other pages
                    setCurrentPage(page);
                }
              }}
              userData={userData}
              onLogout={handleLogout}
              subPath={currentSubPath}
              customPaths={customBreadcrumbPaths}
              pageDescription={getPageDescription()}
            >
              {renderContent()}
            </MainLayout>
          );
        })()}
      </div>
    </AssessmentProvider>
  );
}