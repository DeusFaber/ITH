
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { BarChart3, ChevronLeft, ChevronRight, AlertCircle, ExternalLink, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { AssessmentQuestion } from "../../lib/assessmentTypes";
import { useAssessment } from "../../contexts/AssessmentContext";
import { 
  BookUser, 
  ShieldCheck, 
  Server, 
  FileWarning, 
  Layers, 
  HelpCircle,
  BarChart 
} from "lucide-react";

// Define the assessment questions (same as in Assessment.tsx)
const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "general_performance",
    text: "Do you feel like your IT setup helps your business perform at its best?",
    icon: <BookUser className="h-8 w-8 text-gold" />,
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
    icon: <ShieldCheck className="h-8 w-8 text-gold" />,
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
    icon: <Server className="h-8 w-8 text-gold" />,
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
    icon: <FileWarning className="h-8 w-8 text-gold" />,
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
    icon: <Layers className="h-8 w-8 text-gold" />,
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
    icon: <HelpCircle className="h-8 w-8 text-gold" />,
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
    icon: <BarChart className="h-8 w-8 text-gold" />,
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

interface EmbeddedAssessmentProps {
  onComplete?: () => void;
  onExpand?: () => void;
  onClose?: () => void;
  className?: string;
  showTitle?: boolean;
}

// Storage keys - matching the ones in Assessment.tsx
const STORAGE_KEY_FULL_ASSESSMENT = 'itHealth_full_assessment_progress';
const STORAGE_KEY_EMBEDDED_ASSESSMENT = 'itHealth_embedded_assessment_progress';

export function EmbeddedAssessment({ 
  onComplete, 
  onExpand, 
  onClose,
  className = "", 
  showTitle = true 
}: EmbeddedAssessmentProps) {
  const { setCurrentResult } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [initialized, setInitialized] = useState(false);
  const [progressIndicator, setProgressIndicator] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInitialized(true);
    
    // Check for saved progress
    const savedProgress = localStorage.getItem(STORAGE_KEY_EMBEDDED_ASSESSMENT);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        if (parsed.answers && Object.keys(parsed.answers).length > 0) {
          setAnswers(parsed.answers);
          
          if (typeof parsed.currentQuestionIndex === 'number') {
            setCurrentQuestionIndex(parsed.currentQuestionIndex);
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
    
    return () => {
      // Clear any timeouts
      if (progressIndicator) {
        clearTimeout(progressIndicator);
      }
    };
  }, []);

  // Save progress automatically when answers or question index changes
  useEffect(() => {
    // Only save if we have answers
    if (Object.keys(answers).length > 0) {
      saveProgress();
      
      // Show saving indicator with debounce
      if (progressIndicator) {
        clearTimeout(progressIndicator);
      }
      
      // Only show the indicator if more than one answer has been given (avoid showing on first answer)
      if (Object.keys(answers).length > 1) {
        const timer = setTimeout(() => {
          // We could add a visual indicator here if needed
        }, 500);
        
        setProgressIndicator(timer);
      }
    }
  }, [answers, currentQuestionIndex]);

  // Function to save current progress
  const saveProgress = () => {
    const progressData = {
      currentQuestionIndex,
      answers,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY_EMBEDDED_ASSESSMENT, JSON.stringify(progressData));
  };

  const handleSelectAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [assessmentQuestions[currentQuestionIndex].id]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate and submit result
      calculateResult();
      
      // Clear saved progress since we've completed
      localStorage.removeItem(STORAGE_KEY_EMBEDDED_ASSESSMENT);
      
      if (onComplete) {
        onComplete();
      }
      
      // Open full assessment view with results
      window.location.href = window.location.pathname + '?assessment=true';
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleExpand = () => {
    // Progress is already being saved automatically
    
    if (onExpand) {
      onExpand();
    } else {
      // Default expand behavior: open full assessment view
      window.location.href = window.location.pathname + '?assessment=true';
    }
  };
  
  const handleClose = () => {
    // Save progress if we have answers before closing
    if (Object.keys(answers).length > 0) {
      saveProgress();
      toast.success("Your progress has been saved");
    }
    
    // Clear URL parameters
    const url = new URL(window.location.href);
    url.search = '';
    window.history.pushState({}, '', url);
    
    if (onClose) {
      onClose();
    } else {
      // Default close behavior: return to main app
      window.location.href = window.location.pathname;
    }
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

    setCurrentResult(result);
  };

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id] || null;
  const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;

  // Calculate how many questions have been answered
  const answeredQuestions = Object.keys(answers).length;
  const progressText = answeredQuestions > 0 
    ? `${answeredQuestions}/${assessmentQuestions.length} questions answered` 
    : `Question ${currentQuestionIndex + 1} of ${assessmentQuestions.length}`;

  return (
    <Card className={`border border-blue/10 shadow-sm overflow-hidden ${className}`}>
      {showTitle && (
        <CardHeader className="bg-blue text-white py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-gold" />
              <CardTitle className="text-base font-medium">IT Health Assessment</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 hover:bg-white/10 text-white"
                onClick={handleExpand}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                <span className="text-xs">Expand</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 hover:bg-white/10 text-white"
                onClick={handleClose}
                aria-label="Close assessment"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      )}
      
      <div className="bg-muted h-1.5">
        <div
          className="h-full bg-blue transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <CardContent className="p-4">
        <div className="text-center mb-4">
          <div className="mb-3 flex justify-center">
            {currentQuestion.icon}
          </div>
          <h3 className="text-navy font-light mb-2">{currentQuestion.text}</h3>
          <p className="text-sm text-muted-foreground">
            {progressText}
          </p>
        </div>
        
        <div className="space-y-2">
          {currentQuestion.options.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              className={`w-full justify-start text-left h-auto py-3 px-3 ${
                selectedAnswer === option.value
                  ? "border-blue ring-1 ring-blue bg-blue/5"
                  : "border-border"
              }`}
              onClick={() => handleSelectAnswer(option.value)}
            >
              <div className="flex items-start gap-2">
                <div 
                  className={`mt-0.5 h-4 w-4 rounded-full border flex-shrink-0 ${
                    selectedAnswer === option.value
                      ? "border-blue bg-blue"
                      : "border-muted-foreground"
                  }`}
                >
                  {selectedAnswer === option.value && (
                    <div className="h-full w-full rounded-full flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{option.label}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 border-t">
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          size="sm"
          className="gap-1 bg-blue hover:bg-blue/90"
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          {currentQuestionIndex === assessmentQuestions.length - 1 ? "Finish" : "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
      
      {!selectedAnswer && (
        <div className="px-4 py-2 bg-amber-50 border-t border-amber-100 flex items-center gap-2 text-amber-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="text-xs">Please select an option to continue</p>
        </div>
      )}
    </Card>
  );
}
