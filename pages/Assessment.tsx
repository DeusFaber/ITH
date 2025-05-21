
import { useState, useEffect } from "react";
import { QuestionCard } from "../components/assessment/QuestionCard";
import { AssessmentLanding } from "./AssessmentLanding";
import { AssessmentResults } from "./AssessmentResults";
import { AssessmentPlans } from "./AssessmentPlans";
import { AssessmentHistory } from "./AssessmentHistory";
import { SignupPrompt } from "../components/assessment/SignupPrompt";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { 
  BookUser, 
  ShieldCheck, 
  Server, 
  FileWarning, 
  Layers, 
  BarChart, 
  HelpCircle 
} from "lucide-react";
import { AssessmentQuestion, AssessmentResult } from "../lib/assessmentTypes";
import { useAssessment } from "../contexts/AssessmentContext";

// Define the assessment questions
const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "general_performance",
    text: "Do you feel like your IT setup helps your business perform at its best?",
    icon: <BookUser className="h-10 w-10 text-gold" />,
    options: [
      {
        value: "strong_asset",
        label: "Yes – our IT is a strong asset",
        description: "Technology actively helps us grow and succeed",
      },
      {
        value: "could_be_better",
        label: "It works, but could be better",
        description: "Basic needs are met but we're missing opportunities",
      },
      {
        value: "firefighting",
        label: "No – we're always firefighting",
        description: "We spend more time fixing problems than working",
      },
      {
        value: "not_sure",
        label: "I'm not sure",
        description: "I don't have enough visibility into our IT performance",
      }
    ]
  },
  {
    id: "security_confidence",
    text: "How confident are you in your IT security?",
    icon: <ShieldCheck className="h-10 w-10 text-gold" />,
    options: [
      {
        value: "very_confident",
        label: "Very confident – we're well protected",
        description: "We have robust security measures in place",
      },
      {
        value: "somewhat_confident",
        label: "Somewhat confident – but there are gaps",
        description: "We have basic protection but could improve",
      },
      {
        value: "not_confident",
        label: "Not confident – we're vulnerable",
        description: "We have minimal or outdated security measures",
      },
      {
        value: "unsure",
        label: "I don't know where we stand",
        description: "We haven't properly assessed our security posture",
      }
    ]
  },
  {
    id: "infrastructure",
    text: "How would you describe your IT infrastructure?",
    icon: <Server className="h-10 w-10 text-gold" />,
    options: [
      {
        value: "modern_cloud",
        label: "Modern and cloud-based",
        description: "We use up-to-date equipment and cloud services",
      },
      {
        value: "hybrid_mix",
        label: "Hybrid mix of old and new",
        description: "Some systems are modern, others need updating",
      },
      {
        value: "mostly_legacy",
        label: "Mostly legacy systems",
        description: "We rely primarily on older hardware and software",
      },
      {
        value: "minimal",
        label: "Minimal infrastructure",
        description: "We have basic equipment with limited capabilities",
      }
    ]
  },
  {
    id: "biggest_challenge",
    text: "What's your biggest IT challenge right now?",
    icon: <FileWarning className="h-10 w-10 text-gold" />,
    options: [
      {
        value: "reliability",
        label: "Reliability and uptime",
        description: "Systems going down or working inconsistently",
      },
      {
        value: "security",
        label: "Security and compliance",
        description: "Protecting data and meeting regulations",
      },
      {
        value: "costs",
        label: "Managing costs",
        description: "IT expenses are too high or unpredictable",
      },
      {
        value: "innovation",
        label: "Keeping up with technology",
        description: "Implementing new tools and capabilities",
      }
    ]
  },
  {
    id: "data_management",
    text: "How do you handle data backup and recovery?",
    icon: <Layers className="h-10 w-10 text-gold" />,
    options: [
      {
        value: "automated",
        label: "Automated, regular backups with testing",
        description: "Comprehensive backup system with recovery tests",
      },
      {
        value: "regular",
        label: "Regular backups, but rarely tested",
        description: "We back up data but rarely verify recovery works",
      },
      {
        value: "inconsistent",
        label: "Inconsistent or manual backups",
        description: "Backup happens occasionally or requires manual steps",
      },
      {
        value: "minimal",
        label: "Minimal or no backup system",
        description: "We don't have a structured backup process",
      }
    ]
  },
  {
    id: "support_resources",
    text: "How do you handle IT support and resources?",
    icon: <HelpCircle className="h-10 w-10 text-gold" />,
    options: [
      {
        value: "dedicated_team",
        label: "Dedicated internal IT team",
        description: "We have staff whose primary role is IT management",
      },
      {
        value: "managed_service",
        label: "Managed service provider",
        description: "We outsource to an external IT partner",
      },
      {
        value: "part_time",
        label: "Part-time/shared responsibility",
        description: "IT is handled by staff with other primary roles",
      },
      {
        value: "as_needed",
        label: "As-needed support only",
        description: "We get help only when something breaks",
      }
    ]
  },
  {
    id: "business_alignment",
    text: "How well does your IT align with your business goals?",
    icon: <BarChart className="h-10 w-10 text-gold" />,
    options: [
      {
        value: "strategic",
        label: "Strategic enabler",
        description: "IT actively supports our growth and innovation",
      },
      {
        value: "supportive",
        label: "Supportive but reactive",
        description: "IT meets needs but doesn't drive business forward",
      },
      {
        value: "disconnect",
        label: "Disconnect between IT and business",
        description: "IT operates separately from business goals",
      },
      {
        value: "hindrance",
        label: "IT hinders business progress",
        description: "Technology is more of a roadblock than enabler",
      }
    ]
  }
];

type AssessmentStage = "landing" | "questions" | "results" | "signup" | "plans" | "history";

interface AssessmentProps {
  initialData?: {
    currentQuestionIndex?: number;
    answers?: Record<string, string>;
  } | null;
  onClose?: () => void;
}

// Storage keys
const STORAGE_KEY_FULL_ASSESSMENT = 'itHealth_full_assessment_progress';
const STORAGE_KEY_EMBEDDED_ASSESSMENT = 'itHealth_embedded_assessment_progress';

export function Assessment({ initialData = null, onClose }: AssessmentProps) {
  const { setCurrentResult } = useAssessment();
  const [stage, setStage] = useState<AssessmentStage>("landing");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [hasProgress, setHasProgress] = useState(false);
  
  // Initialize component when mounted
  useEffect(() => {
    console.log("Assessment component initialized", initialData);
    setIsInitialized(true);
    
    // Check if user is authenticated (this would normally connect to an auth system)
    // Mock authentication check for demo purposes
    const isLoggedIn = window.localStorage.getItem("itHealth_user") !== null;
    setIsAuthenticated(isLoggedIn);
    
    // If we have initial data from embedded assessment, use it
    if (initialData) {
      if (initialData.answers && Object.keys(initialData.answers).length > 0) {
        setAnswers(initialData.answers);
        setHasProgress(true);
      }
      
      if (typeof initialData.currentQuestionIndex === 'number') {
        setCurrentQuestionIndex(initialData.currentQuestionIndex);
      }
      
      // If we have initial data, go straight to questions
      setStage("questions");
      
      // Clean up the embedded progress now that we've imported it
      localStorage.removeItem(STORAGE_KEY_EMBEDDED_ASSESSMENT);
    } else {
      // Check for saved progress in full assessment
      const savedProgress = localStorage.getItem(STORAGE_KEY_FULL_ASSESSMENT);
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress);
          if (parsed.answers && Object.keys(parsed.answers).length > 0) {
            setAnswers(parsed.answers);
            setHasProgress(true);
            
            if (typeof parsed.currentQuestionIndex === 'number') {
              setCurrentQuestionIndex(parsed.currentQuestionIndex);
            }
            
            if (parsed.stage && parsed.stage !== "landing") {
              setStage(parsed.stage);
            } else {
              setStage("questions");
            }
            
            // Show toast notification
            setTimeout(() => {
              toast.info("Your previous assessment progress has been restored");
            }, 500);
          }
        } catch (error) {
          console.error("Failed to parse saved assessment progress:", error);
        }
      }
    }
  }, [initialData]);

  // Save progress automatically when answers or question index changes
  useEffect(() => {
    // Only save if we have answers and are in questions stage
    if (stage === "questions" && Object.keys(answers).length > 0) {
      saveProgress();
      setHasProgress(true);
    }
  }, [answers, currentQuestionIndex, stage]);

  // Function to save current progress
  const saveProgress = () => {
    const progressData = {
      stage,
      currentQuestionIndex,
      answers,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY_FULL_ASSESSMENT, JSON.stringify(progressData));
  };

  // Reset the assessment state when unmounted
  useEffect(() => {
    return () => {
      setCurrentResult(null);
    };
  }, [setCurrentResult]);

  // Handle starting the assessment
  const handleStart = () => {
    setStage("questions");
    
    // If we don't have saved progress, reset answers
    if (!hasProgress) {
      setAnswers({});
      setCurrentQuestionIndex(0);
    }
  };

  // Handle selecting an answer
  const handleSelectAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [assessmentQuestions[currentQuestionIndex].id]: answer,
    });
  };

  // Handle going to next question
  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate result
      calculateResult();
      setStage("results");
      
      // Clear saved progress since we've completed the assessment
      localStorage.removeItem(STORAGE_KEY_FULL_ASSESSMENT);
      setHasProgress(false);
    }
  };

  // Handle going back to previous question
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle skipping the current question
  const handleSkip = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate result even with skipped questions
      calculateResult();
      setStage("results");
      
      // Clear saved progress since we've completed the assessment
      localStorage.removeItem(STORAGE_KEY_FULL_ASSESSMENT);
      setHasProgress(false);
    }
  };

  // Handle closing the assessment and returning to the app
  const handleCloseAssessment = () => {
    // Save progress if we're in questions stage and have answers
    if (stage === "questions" && Object.keys(answers).length > 0) {
      saveProgress();
      toast.success("Your progress has been saved");
    }
    
    // Clear URL parameters
    const url = new URL(window.location.href);
    url.search = '';
    window.history.pushState({}, '', url);
    
    // Call onClose if provided
    if (onClose) {
      onClose();
    } else {
      // Default behavior: reload without parameters to return to dashboard
      window.location.href = window.location.pathname;
    }
  };

  // Clear saved progress
  const handleClearProgress = () => {
    localStorage.removeItem(STORAGE_KEY_FULL_ASSESSMENT);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStage("landing");
    setHasProgress(false);
    toast.success("Assessment progress cleared");
  };

  // Calculate the assessment result
  const calculateResult = () => {
    // Count the answers by category
    let scoreCount = {
      high: 0,
      medium: 0,
      low: 0,
      neutral: 0
    };

    // Score mapping
    const scoreMapping: Record<string, "high" | "medium" | "low" | "neutral"> = {
      // Question 1
      "strong_asset": "high",
      "could_be_better": "medium",
      "firefighting": "low",
      "not_sure": "neutral",
      
      // Question 2
      "very_confident": "high",
      "somewhat_confident": "medium",
      "not_confident": "low",
      "unsure": "neutral",
      
      // Question 3
      "modern_cloud": "high",
      "hybrid_mix": "medium",
      "mostly_legacy": "low",
      "minimal": "low",
      
      // Question 4 - all answers are valid concerns, so we'll treat them more as informational
      "reliability": "medium",
      "security": "medium",
      "costs": "medium",
      "innovation": "medium",
      
      // Question 5
      "automated": "high",
      "regular": "medium",
      "inconsistent": "low",
      "minimal": "low",
      
      // Question 6
      "dedicated_team": "high",
      "managed_service": "high",
      "part_time": "medium",
      "as_needed": "low",
      
      // Question 7
      "strategic": "high",
      "supportive": "medium",
      "disconnect": "low",
      "hindrance": "low"
    };

    // Count scores
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const scoreCategory = scoreMapping[answerValue] || "neutral";
      scoreCount[scoreCategory]++;
    });

    // Determine maturity level
    let maturityLevel: "basic" | "stable" | "smart";
    
    if (scoreCount.high >= 3) {
      maturityLevel = "smart";
    } else if (scoreCount.medium >= 3) {
      maturityLevel = "stable";
    } else {
      maturityLevel = "basic";
    }

    // Generate insights based on answers
    const insights: string[] = [];
    
    // General performance insight
    if (answers["general_performance"] === "firefighting") {
      insights.push("You're spending too much time fixing IT problems instead of focusing on your business.");
    }
    
    // Security insight
    if (answers["security_confidence"] === "not_confident" || answers["security_confidence"] === "unsure") {
      insights.push("Your team's data and systems may be vulnerable to security threats.");
    }
    
    // Infrastructure insight
    if (answers["infrastructure"] === "mostly_legacy" || answers["infrastructure"] === "minimal") {
      insights.push("Your legacy infrastructure is limiting your business potential.");
    }
    
    // Support insight
    if (answers["support_resources"] === "as_needed" || answers["support_resources"] === "part_time") {
      insights.push("You're not using automation or helpdesk tools yet, increasing downtime.");
    }

    // If we don't have at least 2 insights, add general ones based on maturity level
    if (insights.length < 2) {
      if (maturityLevel === "basic") {
        insights.push("Your IT setup needs fundamental improvements to support your business properly.");
      } else if (maturityLevel === "stable") {
        insights.push("With some strategic upgrades, your IT could become a competitive advantage.");
      }
    }

    // Limit to 3 insights maximum
    const limitedInsights = insights.slice(0, 3);

    const result = {
      maturityLevel,
      insights: limitedInsights,
      scoreBreakdown: scoreCount
    };

    setAssessmentResult(result);
    setCurrentResult(result);
  };

  // Set a default email for demo purposes
  useEffect(() => {
    setUserEmail("user@example.com");
  }, []);

  // Handle going to plans from results
  const handleShowPlans = () => {
    // If user is not authenticated, show signup first
    if (!isAuthenticated) {
      setStage("signup");
    } else {
      setStage("plans");
    }
  };

  // Handle signup completion
  const handleSignupComplete = () => {
    // Mock setting the authenticated state
    setIsAuthenticated(true);
    
    // Save a dummy user to localStorage for demo purposes
    window.localStorage.setItem("itHealth_user", JSON.stringify({
      email: userEmail,
      date: new Date().toISOString()
    }));
    
    // Proceed to plans
    setStage("plans");
  };

  // Handle skipping signup
  const handleSkipSignup = () => {
    setStage("plans");
  };

  // Handle going back to results from plans
  const handleBackToResults = () => {
    setStage("results");
  };

  // Handle going to history page
  const handleViewHistory = () => {
    setStage("history");
  };

  // Handle returning to main assessment or results
  const handleBackFromHistory = () => {
    if (assessmentResult) {
      setStage("results");
    } else {
      setStage("landing");
    }
  };

  // Render the close button
  const renderCloseButton = () => {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white shadow-md border border-border hover:bg-muted"
          onClick={handleCloseAssessment}
          aria-label="Close assessment and return to app"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    );
  };

  // Render the appropriate stage
  const renderStage = () => {
    switch (stage) {
      case "landing":
        return (
          <div>
            <AssessmentLanding onStart={handleStart} hasProgress={hasProgress} />
            {hasProgress && (
              <div className="container mx-auto max-w-md mt-4 flex flex-col items-center">
                <Button 
                  variant="outline" 
                  onClick={handleClearProgress}
                  className="text-muted-foreground"
                >
                  Clear Saved Progress
                </Button>
              </div>
            )}
          </div>
        );
      
      case "questions":
        return (
          <div className="container mx-auto max-w-3xl py-8 px-4 md:px-6">
            <QuestionCard
              question={assessmentQuestions[currentQuestionIndex]}
              currentStep={currentQuestionIndex + 1}
              totalSteps={assessmentQuestions.length}
              selectedAnswer={answers[assessmentQuestions[currentQuestionIndex].id] || null}
              onSelectAnswer={handleSelectAnswer}
              onNext={handleNext}
              onBack={handleBack}
              onSkip={handleSkip}
            />
          </div>
        );
      
      case "results":
        return assessmentResult ? (
          <AssessmentResults 
            result={assessmentResult}
            answers={answers}
            onShowPlans={handleShowPlans}
            isAuthenticated={isAuthenticated}
          />
        ) : null;
      
      case "signup":
        return assessmentResult ? (
          <SignupPrompt 
            result={assessmentResult}
            email={userEmail}
            onContinueWithoutSignup={handleSkipSignup}
            onSignupComplete={handleSignupComplete}
          />
        ) : null;
      
      case "plans":
        return assessmentResult ? (
          <AssessmentPlans 
            maturityLevel={assessmentResult.maturityLevel}
            onBack={handleBackToResults}
          />
        ) : null;
      
      case "history":
        return <AssessmentHistory />;
      
      default:
        return <AssessmentLanding onStart={handleStart} hasProgress={hasProgress} />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {renderCloseButton()}
      {isInitialized ? renderStage() : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
}
