
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { AssessmentQuestion } from "../../lib/assessmentTypes";

interface QuestionCardProps {
  question: AssessmentQuestion;
  currentStep: number;
  totalSteps: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function QuestionCard({
  question,
  currentStep,
  totalSteps,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onBack,
  onSkip,
}: QuestionCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg border-navy/10">
      <div className="px-6 py-4 bg-navy text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 flex-shrink-0">
            {/* Logo here - simplified for example */}
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-xs font-medium">IT</span>
            </div>
          </div>
          <span className="text-sm font-light">IT Health Assessment</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm mr-2">Progress: Step {currentStep} of {totalSteps}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 hover:bg-white/10 text-white"
            onClick={onSkip}
          >
            Skip
          </Button>
        </div>
      </div>

      <CardHeader className="pt-8 pb-4">
        <div className="mb-2 flex justify-center">
          {question.icon}
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-light text-navy mb-2">{question.text}</h2>
          {question.subText && (
            <p className="text-muted-foreground">{question.subText}</p>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="space-y-3 max-w-md mx-auto">
          {question.options.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              size="lg"
              className={`w-full justify-start text-left h-auto py-4 px-4 ${
                selectedAnswer === option.value
                  ? "border-gold ring-1 ring-gold bg-gold/5"
                  : "border-border"
              }`}
              onClick={() => onSelectAnswer(option.value)}
            >
              <div className="flex items-start gap-3">
                <div 
                  className={`mt-0.5 h-5 w-5 rounded-full border flex-shrink-0 ${
                    selectedAnswer === option.value
                      ? "border-gold bg-gold"
                      : "border-muted-foreground"
                  }`}
                >
                  {selectedAnswer === option.value && (
                    <div className="h-full w-full rounded-full flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{option.label}</p>
                  {option.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-6 bg-muted/30">
        <Button
          variant="outline"
          className="gap-1"
          onClick={onBack}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          className="gap-1 bg-gold hover:bg-gold/90"
          onClick={onNext}
          disabled={!selectedAnswer}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>

      {!selectedAnswer && (
        <div className="px-6 py-3 bg-amber-50 border-t border-amber-100 flex items-center gap-2 text-amber-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">Please select an option to continue</p>
        </div>
      )}
    </Card>
  );
}
