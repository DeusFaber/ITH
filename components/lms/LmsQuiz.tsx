
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Quiz, Question } from "../../lib/lmsTypes";
import { 
  CheckCircle, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  AlertCircle,
  AlertTriangle
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface LmsQuizProps {
  quiz: Quiz;
  onComplete: (score: number, passed: boolean) => void;
  onBack: () => void;
}

export function LmsQuiz({ quiz, onComplete, onBack }: LmsQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [matchingAnswers, setMatchingAnswers] = useState<Record<string, Record<string, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    quiz.timeLimit ? quiz.timeLimit * 60 : null
  );
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];

  // Setup timer if there's a time limit
  useEffect(() => {
    if (timeRemaining !== null && !quizCompleted) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null) return null;
          
          // Show warning when 20% of time remains
          if (prev === Math.floor(quiz.timeLimit! * 60 * 0.2)) {
            setShowTimeWarning(true);
          }
          
          // Time's up
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            const result = calculateScore();
            setQuizCompleted(true);
            onComplete(result.score, result.passed);
            return 0;
          }
          
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizCompleted]);

  // Reset warning visibility after 5 seconds
  useEffect(() => {
    if (showTimeWarning) {
      const warningTimeout = setTimeout(() => {
        setShowTimeWarning(false);
      }, 5000);
      
      return () => clearTimeout(warningTimeout);
    }
  }, [showTimeWarning]);
  
  // Calculate score
  const calculateScore = () => {
    let correctAnswers = 0; // Changed from const to let
    let totalPoints = 0;
    
    quiz.questions.forEach(question => {
      totalPoints += question.points;
      
      if (answers[question.id]) {
        if (question.type === "multiple-choice" || question.type === "true-false") {
          // Simple string comparison for multiple choice and true/false
          if (answers[question.id] === question.correctAnswer) {
            correctAnswers += question.points;
          }
        } else if (question.type === "multiple-select") {
          // For multiple select, all correct options must be selected
          const selectedAnswers = answers[question.id] as string[];
          const correctAnswersList = question.correctAnswer as string[];
          
          // Check if arrays have the same values
          const isCorrect = 
            selectedAnswers.length === correctAnswersList.length &&
            selectedAnswers.every(value => correctAnswersList.includes(value)) &&
            correctAnswersList.every(value => selectedAnswers.includes(value));
            
          if (isCorrect) {
            correctAnswers += question.points;
          }
        } else if (question.type === "matching") {
          // For matching questions, check each matched pair
          const userMatches = matchingAnswers[question.id] || {};
          const correctMatches = question.correctAnswer as Record<string, string>;
          
          // Check if all matches are correct
          const allCorrect = Object.keys(correctMatches).every(
            key => userMatches[key] === correctMatches[key]
          );
          
          if (allCorrect) {
            correctAnswers += question.points;
          }
        } else if (question.type === "short-answer") {
          // For short answer, check if answer includes required keywords
          const userAnswer = (answers[question.id] as string).toLowerCase();
          const requiredKeywords = (question.correctAnswer as string).toLowerCase().split(",");
          
          // Check if all required keywords are in the answer
          const hasAllKeywords = requiredKeywords.every(
            keyword => userAnswer.includes(keyword.trim())
          );
          
          if (hasAllKeywords) {
            correctAnswers += question.points;
          }
        }
      }
    });
    
    const percentageScore = Math.round((correctAnswers / totalPoints) * 100);
    return {
      score: percentageScore,
      passed: percentageScore >= quiz.passingScore
    };
  };

  // Handle different answer types
  const handleSingleAnswer = (questionId: string, value: string) => {
    if (submitted) return;
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleMultipleAnswer = (questionId: string, value: string, checked: boolean) => {
    if (submitted) return;
    
    setAnswers(prev => {
      const currentAnswers = (prev[questionId] as string[]) || [];
      
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentAnswers, value]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter(item => item !== value)
        };
      }
    });
  };
  
  const handleMatchingAnswer = (questionId: string, key: string, value: string) => {
    if (submitted) return;
    
    setMatchingAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [key]: value
      }
    }));
    
    // Also update the main answers object so we can track if the question has been answered
    setAnswers(prev => ({
      ...prev,
      [questionId]: "answered" // Just a placeholder to indicate it's been answered
    }));
  };
  
  const handleShortAnswer = (questionId: string, value: string) => {
    if (submitted) return;
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSubmitted(false);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      const result = calculateScore();
      setQuizCompleted(true);
      onComplete(result.score, result.passed);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSubmitted(false);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    if (!currentQuestion) return false;
    
    if (currentQuestion.type === "matching") {
      const matchedItems = matchingAnswers[currentQuestion.id] || {};
      // Check if all items are matched
      return Object.keys(matchedItems).length === Object.keys(currentQuestion.options || {}).length;
    }
    
    if (currentQuestion.type === "short-answer") {
      return !!answers[currentQuestion.id] && (answers[currentQuestion.id] as string).trim().length > 0;
    }
    
    if (currentQuestion.type === "multiple-select") {
      return !!answers[currentQuestion.id] && (answers[currentQuestion.id] as string[]).length > 0;
    }
    
    return !!answers[currentQuestion.id];
  };

  // Rendering different question types
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    switch (currentQuestion.type) {
      case "multiple-choice":
        return renderMultipleChoice();
      case "true-false":
        return renderTrueFalse();
      case "multiple-select":
        return renderMultipleSelect();
      case "matching":
        return renderMatching();
      case "short-answer":
        return renderShortAnswer();
      default:
        return <div>Unsupported question type</div>;
    }
  };
  
  const renderMultipleChoice = () => {
    if (!currentQuestion.options) return null;
    
    return (
      <RadioGroup
        value={answers[currentQuestion.id] as string || ""}
        onValueChange={(value) => handleSingleAnswer(currentQuestion.id, value)}
      >
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <div
              key={option}
              className={`flex items-center space-x-2 border rounded-md p-3 ${
                submitted && answers[currentQuestion.id] === option
                  ? option === currentQuestion.correctAnswer
                    ? "border-primary bg-primary/10"
                    : "border-destructive bg-destructive/10"
                  : "border-border"
              }`}
            >
              <RadioGroupItem 
                value={option} 
                id={`${currentQuestion.id}-${option}`} 
                disabled={submitted}
              />
              <label 
                htmlFor={`${currentQuestion.id}-${option}`}
                className="w-full cursor-pointer flex-grow"
              >
                {option}
              </label>
              
              {submitted && answers[currentQuestion.id] === option && (
                option === currentQuestion.correctAnswer ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive" />
                )
              )}
              
              {submitted && option === currentQuestion.correctAnswer && answers[currentQuestion.id] !== option && (
                <CheckCircle className="h-5 w-5 text-primary" />
              )}
            </div>
          ))}
        </div>
      </RadioGroup>
    );
  };
  
  const renderTrueFalse = () => {
    return (
      <RadioGroup
        value={answers[currentQuestion.id] as string || ""}
        onValueChange={(value) => handleSingleAnswer(currentQuestion.id, value)}
      >
        <div className="space-y-3">
          {["True", "False"].map((option) => (
            <div
              key={option}
              className={`flex items-center space-x-2 border rounded-md p-3 ${
                submitted && answers[currentQuestion.id] === option
                  ? option === currentQuestion.correctAnswer
                    ? "border-primary bg-primary/10"
                    : "border-destructive bg-destructive/10"
                  : "border-border"
              }`}
            >
              <RadioGroupItem 
                value={option} 
                id={`${currentQuestion.id}-${option}`} 
                disabled={submitted}
              />
              <label 
                htmlFor={`${currentQuestion.id}-${option}`}
                className="w-full cursor-pointer flex-grow"
              >
                {option}
              </label>
              
              {submitted && answers[currentQuestion.id] === option && (
                option === currentQuestion.correctAnswer ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive" />
                )
              )}
              
              {submitted && option === currentQuestion.correctAnswer && answers[currentQuestion.id] !== option && (
                <CheckCircle className="h-5 w-5 text-primary" />
              )}
            </div>
          ))}
        </div>
      </RadioGroup>
    );
  };
  
  const renderMultipleSelect = () => {
    if (!currentQuestion.options) return null;
    
    const selectedOptions = (answers[currentQuestion.id] as string[]) || [];
    
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground mb-2">
          Select all that apply
        </p>
        {currentQuestion.options.map((option) => (
          <div
            key={option}
            className={`flex items-center space-x-2 border rounded-md p-3 ${
              submitted && selectedOptions.includes(option)
                ? (currentQuestion.correctAnswer as string[]).includes(option)
                  ? "border-primary bg-primary/10"
                  : "border-destructive bg-destructive/10"
                : "border-border"
            }`}
          >
            <Checkbox
              id={`${currentQuestion.id}-${option}`}
              checked={selectedOptions.includes(option)}
              onCheckedChange={(checked) => 
                handleMultipleAnswer(currentQuestion.id, option, checked === true)
              }
              disabled={submitted}
            />
            <label
              htmlFor={`${currentQuestion.id}-${option}`}
              className="w-full cursor-pointer flex-grow"
            >
              {option}
            </label>
            
            {submitted && (
              selectedOptions.includes(option) ? (
                (currentQuestion.correctAnswer as string[]).includes(option) ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive" />
                )
              ) : (currentQuestion.correctAnswer as string[]).includes(option) && (
                <CheckCircle className="h-5 w-5 text-primary" />
              )
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderMatching = () => {
    if (!currentQuestion.options) return null;
    
    // For matching questions, options is an object with left/right columns
    const leftOptions = Object.keys(currentQuestion.options);
    const rightOptions = Object.values(currentQuestion.options);
    // Shuffle right options for presentation
    const shuffledRightOptions = [...rightOptions].sort(() => Math.random() - 0.5);
    
    const currentMatches = matchingAnswers[currentQuestion.id] || {};
    
    return (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground mb-2">
          Match each item on the left with its corresponding item on the right
        </p>
        
        {leftOptions.map((leftOption, index) => (
          <div key={leftOption} className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-2 items-center">
            <div className="p-3 border rounded-md">{leftOption}</div>
            <div className="text-center">➝</div>
            <select
              value={currentMatches[leftOption] || ""}
              onChange={(e) => handleMatchingAnswer(currentQuestion.id, leftOption, e.target.value)}
              disabled={submitted}
              className="p-3 border rounded-md w-full bg-background"
            >
              <option value="">Select a match</option>
              {shuffledRightOptions.map((rightOption) => (
                <option key={rightOption} value={rightOption}>{rightOption}</option>
              ))}
            </select>
            
            {submitted && (
              currentMatches[leftOption] === (currentQuestion.correctAnswer as Record<string, string>)[leftOption] ? (
                <CheckCircle className="h-5 w-5 text-primary ml-2" />
              ) : (
                <div className="flex flex-col space-y-1 ml-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <span className="text-xs text-muted-foreground">
                    Correct: {(currentQuestion.correctAnswer as Record<string, string>)[leftOption]}
                  </span>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderShortAnswer = () => {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground mb-2">
          Enter your answer in the field below
        </p>
        <Textarea
          placeholder="Type your answer here..."
          value={(answers[currentQuestion.id] as string) || ""}
          onChange={(e) => handleShortAnswer(currentQuestion.id, e.target.value)}
          disabled={submitted}
          className="min-h-24"
        />
        
        {submitted && (
          <div className="p-4 border rounded-md bg-muted">
            <h4 className="font-medium mb-1">Expected Answer:</h4>
            <p>{(currentQuestion.correctAnswer as string).split(",").join(", ")}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your answer was evaluated based on whether it contained the key elements listed above.
            </p>
          </div>
        )}
      </div>
    );
  };

  // Quiz results
  if (quizCompleted) {
    const result = calculateScore();
    
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>{result.passed ? "Congratulations!" : "Quiz Completed"}</CardTitle>
          <CardDescription>
            {result.passed 
              ? "You've successfully passed the quiz." 
              : "You didn't reach the passing score this time."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pb-6">
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            {result.passed ? (
              <CheckCircle className="h-16 w-16 text-primary" />
            ) : (
              <AlertCircle className="h-16 w-16 text-destructive" />
            )}
            
            <div className="text-center">
              <h3 className="text-xl font-semibold">Your Score: {result.score}%</h3>
              <p className="text-muted-foreground">
                Passing score: {quiz.passingScore}%
              </p>
            </div>
          </div>
          
          <Progress value={result.score} className="h-2" />
          
          <div className="space-y-4">
            <h3 className="font-semibold">Question Summary</h3>
            {quiz.questions.map((question, index) => {
              let isCorrect = false;
              
              // Check if answer is correct based on question type
              if (question.type === "multiple-choice" || question.type === "true-false") {
                isCorrect = answers[question.id] === question.correctAnswer;
              } else if (question.type === "multiple-select") {
                const selectedAnswers = answers[question.id] as string[] || [];
                const correctAnswers = question.correctAnswer as string[];
                
                isCorrect = 
                  selectedAnswers.length === correctAnswers.length &&
                  selectedAnswers.every(value => correctAnswers.includes(value)) &&
                  correctAnswers.every(value => selectedAnswers.includes(value));
              } else if (question.type === "matching") {
                const userMatches = matchingAnswers[question.id] || {};
                const correctMatches = question.correctAnswer as Record<string, string>;
                
                isCorrect = Object.keys(correctMatches).every(
                  key => userMatches[key] === correctMatches[key]
                );
              } else if (question.type === "short-answer") {
                const userAnswer = answers[question.id] as string || "";
                const requiredKeywords = (question.correctAnswer as string).split(",");
                
                isCorrect = requiredKeywords.every(
                  keyword => userAnswer.toLowerCase().includes(keyword.trim().toLowerCase())
                );
              }
              
              return (
                <div 
                  key={question.id} 
                  className={`p-3 rounded-md flex items-start gap-3 ${
                    isCorrect ? "bg-primary/10" : "bg-destructive/10"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  )}
                  <div className="flex-grow">
                    <p className="font-medium">Question {index + 1} ({question.type})</p>
                    <p className="text-sm">{question.text}</p>
                    
                    {question.type === "short-answer" ? (
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Your answer: </span>
                          {answers[question.id] as string || "(No answer provided)"}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Expected keywords: </span>
                          {(question.correctAnswer as string).split(",").join(", ")}
                        </p>
                      </div>
                    ) : !isCorrect && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Correct answer: </span>
                        {question.type === "multiple-select" ? (
                          (question.correctAnswer as string[]).join(", ")
                        ) : question.type === "matching" ? (
                          "See detailed feedback"
                        ) : (
                          question.correctAnswer as string
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onBack}>
            Return to Course
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{quiz.title}</CardTitle>
          {timeRemaining !== null && (
            <Badge 
              variant={showTimeWarning ? "destructive" : "outline"} 
              className={`gap-1 ${showTimeWarning ? "animate-pulse" : ""}`}
            >
              {showTimeWarning && <AlertTriangle className="h-3 w-3" />}
              <Clock className="h-4 w-4" />
              {formatTimeRemaining(timeRemaining)}
            </Badge>
          )}
        </div>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%</span>
            </div>
            <Progress 
              value={((currentQuestionIndex + 1) / quiz.questions.length) * 100} 
              className="h-2" 
            />
          </div>

          {/* Question */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{currentQuestion?.text}</h3>
              <Badge variant="secondary" className="capitalize">
                {currentQuestion?.type.replace("-", " ")}
              </Badge>
            </div>
            {renderQuestion()}
          </div>

          {/* Explanation (when submitted) */}
          {submitted && currentQuestion?.explanation && (
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-medium mb-1">Explanation:</h4>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex gap-3">
          {!submitted ? (
            <Button 
              onClick={handleSubmit} 
              disabled={!isCurrentQuestionAnswered()}
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <>
                  Next 
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                "Finish Quiz"
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
