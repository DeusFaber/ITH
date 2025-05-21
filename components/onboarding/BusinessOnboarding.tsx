
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { CheckCircle, ArrowRight, Building2, Users, Server, Shield, FileStack, Rocket, ChevronLeft, Clock } from 'lucide-react';
import ItHealthIconTransparentWhite from '../../imports/ItHealthIconTransparentWhite-12-165';

interface FormData {
  // Step 1: Business Profile
  businessName: string;
  businessSize: string;
  industry: string;
  country: string;
  
  // Step 2: IT Assessment
  itTeamSize: string;
  securityConcerns: string[];
  currentChallenges: string;
  techPriority: string;
  
  // Step 3: Account Creation
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const defaultFormData: FormData = {
  businessName: '',
  businessSize: '',
  industry: '',
  country: 'South Africa',
  
  itTeamSize: '',
  securityConcerns: [],
  currentChallenges: '',
  techPriority: '',
  
  firstName: '',
  lastName: '',
  jobTitle: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
};

interface BusinessOnboardingProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function BusinessOnboarding({ onComplete, onCancel }: BusinessOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  
  const totalSteps = 3;
  const progress = Math.floor((currentStep / totalSteps) * 100);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSecurityConcernToggle = (concern: string) => {
    setFormData(prev => {
      if (prev.securityConcerns.includes(concern)) {
        return {
          ...prev,
          securityConcerns: prev.securityConcerns.filter(c => c !== concern)
        };
      } else {
        return {
          ...prev,
          securityConcerns: [...prev.securityConcerns, concern]
        };
      }
    });
  };
  
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      // Here we would normally send the data to an API
      // For now, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the onComplete callback to notify parent component
      onComplete();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  // Validate if the current step is complete
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && 
               formData.businessSize && 
               formData.industry && 
               formData.country;
      case 2:
        return formData.itTeamSize && 
               formData.techPriority;
      case 3:
        return formData.firstName && 
               formData.lastName && 
               formData.email && 
               formData.password && 
               formData.password === formData.confirmPassword && 
               formData.agreeToTerms;
      default:
        return false;
    }
  };
  
  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderBusinessProfileStep();
      case 2:
        return renderITAssessmentStep();
      case 3:
        return renderAccountCreationStep();
      default:
        return null;
    }
  };
  
  const renderBusinessProfileStep = () => {
    return (
      <>
        <CardHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-extralight">Let's get your business sorted</CardTitle>
          <CardDescription>
            First, help us understand what makes your business tick
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input 
              id="businessName" 
              name="businessName" 
              value={formData.businessName} 
              onChange={handleChange}
              placeholder="Your company name (no need for (Pty) Ltd)"
              className="rounded-[16px] rounded-tr-[0px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="businessSize">Team Size</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('businessSize', value)}
              value={formData.businessSize}
            >
              <SelectTrigger id="businessSize" className="rounded-[16px] rounded-tr-[0px]">
                <SelectValue placeholder="How many people in your organization?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">Just us few (1-10)</SelectItem>
                <SelectItem value="11-50">Small but mighty (11-50)</SelectItem>
                <SelectItem value="51-200">Medium-sized (51-200)</SelectItem>
                <SelectItem value="201-500">Sizeable outfit (201-500)</SelectItem>
                <SelectItem value="501+">Corporate-level (501+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('industry', value)}
              value={formData.industry}
            >
              <SelectTrigger id="industry" className="rounded-[16px] rounded-tr-[0px]">
                <SelectValue placeholder="What's your field of expertise?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="legal">Legal Practice</SelectItem>
                <SelectItem value="accounting">Accounting & Finance</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="architecture">Architecture & Design</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="healthcare">Medical Practice</SelectItem>
                <SelectItem value="estate">Estate Agency</SelectItem>
                <SelectItem value="recruitment">Recruitment</SelectItem>
                <SelectItem value="other">Other Professional Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('country', value)}
              value={formData.country}
              disabled
            >
              <SelectTrigger id="country" className="rounded-[16px] rounded-tr-[0px]">
                <SelectValue placeholder="Where are you based?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="South Africa">South Africa</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Currently only available in South Africa</p>
          </div>
        </CardContent>
      </>
    );
  };
  
  const renderITAssessmentStep = () => {
    return (
      <>
        <CardHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Server className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-extralight">Let's diagnose your IT health</CardTitle>
          <CardDescription>
            Even if your IT is more Eskom than Google, we've got your back
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-3">
            <Label htmlFor="itTeamSize">Your IT Support</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('itTeamSize', value)}
              value={formData.itTeamSize}
            >
              <SelectTrigger id="itTeamSize" className="rounded-[16px] rounded-tr-[0px]">
                <SelectValue placeholder="Who handles your IT currently?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">The office youngster or whoever's available</SelectItem>
                <SelectItem value="part-time">That one IT person we call when things break</SelectItem>
                <SelectItem value="1-2">We have 1-2 dedicated IT people</SelectItem>
                <SelectItem value="3-5">Small IT team (3-5 people)</SelectItem>
                <SelectItem value="6-10">Established IT department (6-10)</SelectItem>
                <SelectItem value="11+">Full IT division (11+ staff)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label>What keeps you up at night? (IT-wise)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Ransomware & hacking', 
                'Data loss & breaches', 
                'Load shedding disruptions', 
                'Staff clicking on phishing emails', 
                'Regulatory compliance', 
                'System downtime'
              ].map((concern) => (
                <div key={concern} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={concern}
                    checked={formData.securityConcerns.includes(concern)}
                    onChange={() => handleSecurityConcernToggle(concern)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor={concern} className="text-sm cursor-pointer">{concern}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="currentChallenges">Your biggest IT frustrations</Label>
            <Textarea
              id="currentChallenges"
              name="currentChallenges"
              value={formData.currentChallenges}
              onChange={handleChange}
              placeholder="What's your biggest tech headache right now? (Slow systems? Missing backups? Support that never answers?)"
              rows={3}
              className="rounded-[16px] rounded-tr-[0px]"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="techPriority">Your IT priority for 2025</Label>
            <RadioGroup 
              value={formData.techPriority} 
              onValueChange={(value) => handleSelectChange('techPriority', value)}
              className="space-y-3"
            >
              <div className="flex items-start space-x-3 p-3 rounded-[16px] rounded-tr-[0px] border border-border/50 hover:bg-accent/30 transition-colors cursor-pointer" onClick={() => handleSelectChange('techPriority', 'security')}>
                <RadioGroupItem value="security" id="security" className="mt-1" />
                <div>
                  <Label htmlFor="security" className="flex items-center text-sm font-medium mb-1 cursor-pointer">
                    <Shield className="inline-block h-4 w-4 mr-2 text-navy" /> 
                    Lock it down
                  </Label>
                  <p className="text-xs text-muted-foreground">Security and data protection are our biggest concerns</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 rounded-[16px] rounded-tr-[0px] border border-border/50 hover:bg-accent/30 transition-colors cursor-pointer" onClick={() => handleSelectChange('techPriority', 'efficiency')}>
                <RadioGroupItem value="efficiency" id="efficiency" className="mt-1" />
                <div>
                  <Label htmlFor="efficiency" className="flex items-center text-sm font-medium mb-1 cursor-pointer">
                    <Clock className="inline-block h-4 w-4 mr-2 text-primary" /> 
                    Speed it up
                  </Label>
                  <p className="text-xs text-muted-foreground">We need systems that work faster and more reliably</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 rounded-[16px] rounded-tr-[0px] border border-border/50 hover:bg-accent/30 transition-colors cursor-pointer" onClick={() => handleSelectChange('techPriority', 'growth')}>
                <RadioGroupItem value="growth" id="growth" className="mt-1" />
                <div>
                  <Label htmlFor="growth" className="flex items-center text-sm font-medium mb-1 cursor-pointer">
                    <Rocket className="inline-block h-4 w-4 mr-2 text-gold" /> 
                    Scale it up
                  </Label>
                  <p className="text-xs text-muted-foreground">We're growing and need IT that can keep up with us</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 rounded-[16px] rounded-tr-[0px] border border-border/50 hover:bg-accent/30 transition-colors cursor-pointer" onClick={() => handleSelectChange('techPriority', 'balanced')}>
                <RadioGroupItem value="balanced" id="balanced" className="mt-1" />
                <div>
                  <Label htmlFor="balanced" className="flex items-center text-sm font-medium mb-1 cursor-pointer">
                    <Users className="inline-block h-4 w-4 mr-2 text-blue" /> 
                    Fix it all
                  </Label>
                  <p className="text-xs text-muted-foreground">We need a balanced approach that addresses everything</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </>
    );
  };
  
  const renderAccountCreationStep = () => {
    return (
      <>
        <CardHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-extralight">Last step - almost there</CardTitle>
          <CardDescription>
            Create your account and get ready for IT that actually works
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange}
                placeholder="Your name"
                className="rounded-[16px] rounded-tr-[0px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange}
                placeholder="Your surname"
                className="rounded-[16px] rounded-tr-[0px]"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Your Role</Label>
            <Input 
              id="jobTitle" 
              name="jobTitle" 
              value={formData.jobTitle} 
              onChange={handleChange}
              placeholder="What do you do at the company?"
              className="rounded-[16px] rounded-tr-[0px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="name@yourcompany.co.za"
              className="rounded-[16px] rounded-tr-[0px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              value={formData.password} 
              onChange={handleChange}
              placeholder="Something stronger than 'password123'"
              className="rounded-[16px] rounded-tr-[0px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              value={formData.confirmPassword} 
              onChange={handleChange}
              placeholder="Same as above, just to be sure"
              className="rounded-[16px] rounded-tr-[0px]"
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-xs text-destructive">Passwords don't match, check again</p>
            )}
          </div>
          
          <div className="flex items-start space-x-3 pt-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleCheckboxChange}
              className="mt-1 h-4 w-4"
            />
            <Label htmlFor="agreeToTerms" className="text-xs">
              I agree to the <a href="#terms" className="text-primary hover:underline">Terms of Service</a> and <a href="#privacy" className="text-primary hover:underline">Privacy Policy</a>. No spam, we promise. We're not Telkom.
            </Label>
          </div>
        </CardContent>
      </>
    );
  };
  
  // South African-themed step descriptions
  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Your business details";
      case 2:
        return "Your IT challenges";
      case 3:
        return "Create your account";
      default:
        return "";
    }
  };
  
  return (
    <div className="min-h-screen bg-primary text-white">
      <div className="w-full max-w-4xl mx-auto py-8 px-4">
        {/* IThealth Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32">
            <ItHealthIconTransparentWhite />
          </div>
        </div>
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extralight text-white">Healthy IT. Happy Business.</h1>
          <p className="text-white/80">Break up with your old IT and join South Africa's most reliable IT service</p>
        </div>
        
        <div className="mb-6">
          <Progress value={progress} className="h-2 bg-white/20" />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-white/70">Step {currentStep}: {getStepDescription()}</span>
            <span className="text-xs text-white/70">{progress}% complete</span>
          </div>
        </div>
        
        <Card className="ithealth-card shadow-lg bg-white text-foreground">
          {renderStep()}
          <CardFooter className="flex justify-between pt-6">
            <Button
              variant="ghost"
              onClick={currentStep === 1 ? onCancel : goToPreviousStep}
              disabled={submitting}
              className="ithealth-button"
            >
              {currentStep === 1 ? (
                "Cancel"
              ) : (
                <>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </>
              )}
            </Button>
            <Button
              onClick={goToNextStep}
              disabled={!isStepComplete() || submitting}
              className="ithealth-button bg-primary text-white hover:bg-primary/90"
            >
              {submitting ? (
                "Processing..."
              ) : currentStep === totalSteps ? (
                <>
                  Complete <CheckCircle className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
