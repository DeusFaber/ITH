
import { useState } from "react";
import { SignupForm } from "../auth/SignupForm";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Check, ChevronRight, Lock } from "lucide-react";
import { AssessmentResult } from "../../lib/assessmentTypes";

interface SignupPromptProps {
  result: AssessmentResult;
  email?: string;
  onContinueWithoutSignup: () => void;
  onSignupComplete: () => void;
}

export function SignupPrompt({ 
  result, 
  email = "", 
  onContinueWithoutSignup, 
  onSignupComplete 
}: SignupPromptProps) {
  return (
    <div className="container mx-auto max-w-3xl py-8 px-4 md:px-6 lg:py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light mb-3 text-navy">Save Your IT Health Assessment</h1>
        <p className="text-muted-foreground">
          Create an account to save your results and get personalized IT improvement recommendations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SignupForm 
            prefilledEmail={email}
            onSignup={onSignupComplete}
            onSkip={onContinueWithoutSignup}
          />
        </div>
        
        <div className="flex flex-col gap-4">
          <Card className="bg-muted/30 border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-navy text-lg">Why Sign Up?</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3">
                {[
                  "Save your assessment history and track progress",
                  "Get personalized improvement recommendations",
                  "Unlock premium assessment features",
                  "Access to IT Health educational resources"
                ].map((benefit, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-navy/5 border-navy/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-navy/10 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-navy" />
                </div>
                <h3 className="text-sm font-medium">Privacy Guaranteed</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Your assessment data is private and only used to provide you with relevant recommendations. We never share your information with third parties.
              </p>
            </CardContent>
          </Card>
          
          <Button 
            variant="ghost" 
            className="text-muted-foreground gap-1"
            onClick={onContinueWithoutSignup}
          >
            Continue without an account
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
