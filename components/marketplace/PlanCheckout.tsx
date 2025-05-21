
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { ArrowLeft, ArrowRight, CreditCard, Building, Check, FileText, ShieldCheck } from "lucide-react";
import {
  MarketplacePlan,
  CheckoutFormData,
  SubscriptionOptions,
  PlanBillingTier,
  PlanAddOn,
  Industry,
} from "../../lib/marketplaceTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface PlanCheckoutProps {
  plan: MarketplacePlan;
  onBack: () => void;
  onComplete: (formData: CheckoutFormData, subscriptionOptions: SubscriptionOptions) => void;
}

export function PlanCheckout({ plan, onBack, onComplete }: PlanCheckoutProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [subscriptionOptions, setSubscriptionOptions] = useState<SubscriptionOptions>({
    planId: plan.id,
    tierId: plan.billingTiers.find(tier => tier.mostPopular)?.id || plan.billingTiers[0].id,
    userCount: plan.billingTiers.find(tier => tier.mostPopular)?.minUsers || 10,
    addOns: [],
    billingCycle: "monthly",
  });
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    company: {
      name: "",
      size: "",
      industry: "Technology",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "US",
      },
    },
    billing: {
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      paymentMethod: "credit",
      cardDetails: {
        number: "",
        expiry: "",
        cvc: "",
        name: "",
      },
    },
    termsAccepted: false,
  });
  
  const steps = ["Plan Options", "Company Details", "Billing Info", "Review & Confirm"];
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      onBack();
    }
  };
  
  const handleComplete = () => {
    onComplete(formData, subscriptionOptions);
  };
  
  // Plan options handlers
  const handleTierChange = (tierId: string) => {
    const tier = plan.billingTiers.find(t => t.id === tierId);
    setSubscriptionOptions({
      ...subscriptionOptions,
      tierId,
      userCount: tier?.minUsers || subscriptionOptions.userCount,
    });
  };
  
  const handleUserCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setSubscriptionOptions({
        ...subscriptionOptions,
        userCount: value,
      });
    }
  };
  
  const handleAddOnToggle = (addonId: string) => {
    const currentAddons = [...subscriptionOptions.addOns];
    
    if (currentAddons.includes(addonId)) {
      setSubscriptionOptions({
        ...subscriptionOptions,
        addOns: currentAddons.filter(id => id !== addonId),
      });
    } else {
      setSubscriptionOptions({
        ...subscriptionOptions,
        addOns: [...currentAddons, addonId],
      });
    }
  };
  
  const handleBillingCycleChange = (cycle: "monthly" | "annually") => {
    setSubscriptionOptions({
      ...subscriptionOptions,
      billingCycle: cycle,
    });
  };
  
  // Form handlers
  const updateCompanyField = (field: string, value: string) => {
    setFormData({
      ...formData,
      company: {
        ...formData.company,
        [field]: value,
      },
    });
  };
  
  const updateCompanyAddress = (field: string, value: string) => {
    setFormData({
      ...formData,
      company: {
        ...formData.company,
        address: {
          ...formData.company.address,
          [field]: value,
        },
      },
    });
  };
  
  const updateBillingField = (field: string, value: string) => {
    setFormData({
      ...formData,
      billing: {
        ...formData.billing,
        [field]: value,
      },
    });
  };
  
  const updateCardDetails = (field: string, value: string) => {
    setFormData({
      ...formData,
      billing: {
        ...formData.billing,
        cardDetails: {
          ...formData.billing.cardDetails!,
          [field]: value,
        },
      },
    });
  };
  
  const handleTermsAcceptedChange = (checked: boolean) => {
    setFormData({
      ...formData,
      termsAccepted: checked,
    });
  };
  
  // Helper functions
  const getSelectedTier = (): PlanBillingTier => {
    return plan.billingTiers.find(tier => tier.id === subscriptionOptions.tierId)!;
  };
  
  const calculateSubtotal = (): number => {
    const selectedTier = getSelectedTier();
    const tierPrice = selectedTier.perUser
      ? selectedTier.price * (subscriptionOptions.userCount || 1)
      : selectedTier.price;
    
    const addonsTotal = subscriptionOptions.addOns.reduce((total, addonId) => {
      const addon = plan.addOns.find(a => a.id === addonId);
      if (!addon) return total;
      
      return total + (addon.perUser
        ? addon.price * (subscriptionOptions.userCount || 1)
        : addon.price);
    }, 0);
    
    return tierPrice + addonsTotal;
  };
  
  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 0: // Plan Options
        return true;
      case 1: // Company Details
        return !!(
          formData.company.name &&
          formData.company.size &&
          formData.company.address.street &&
          formData.company.address.city &&
          formData.company.address.state &&
          formData.company.address.zip
        );
      case 2: // Billing Info
        return !!(
          formData.billing.contactName &&
          formData.billing.contactEmail &&
          formData.billing.contactPhone &&
          ((formData.billing.paymentMethod === "credit" &&
            formData.billing.cardDetails?.number &&
            formData.billing.cardDetails?.expiry &&
            formData.billing.cardDetails?.cvc &&
            formData.billing.cardDetails?.name) ||
           formData.billing.paymentMethod !== "credit")
        );
      case 3: // Review & Confirm
        return formData.termsAccepted;
      default:
        return false;
    }
  };
  
  // Render steps
  const renderPlanOptions = () => {
    const selectedTier = getSelectedTier();
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Choose Plan Tier</CardTitle>
            <CardDescription>
              Select the service level that suits your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={subscriptionOptions.tierId}
              onValueChange={handleTierChange}
              className="grid gap-4 md:grid-cols-3"
            >
              {plan.billingTiers.map((tier) => (
                <div key={tier.id}>
                  <RadioGroupItem
                    value={tier.id}
                    id={tier.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={tier.id}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="mb-3">
                      {tier.mostPopular && (
                        <Badge className="mb-2">Most Popular</Badge>
                      )}
                      <p className="font-medium text-lg">{tier.name}</p>
                    </div>
                    <p className="text-2xl font-bold">
                      R{tier.price.toFixed(2)}
                      <span className="text-sm font-normal text-muted-foreground">
                        {tier.perUser ? "/user" : ""}/mo
                      </span>
                    </p>
                    {tier.minUsers && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Min {tier.minUsers} users
                      </p>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            {selectedTier.perUser && (
              <div className="mt-6">
                <Label htmlFor="user-count">Number of Users</Label>
                <div className="flex items-center gap-2 mt-1.5">
                  <Input
                    id="user-count"
                    type="number"
                    min={selectedTier.minUsers || 1}
                    max={selectedTier.maxUsers || 999}
                    value={subscriptionOptions.userCount}
                    onChange={handleUserCountChange}
                    className="w-24"
                  />
                  <p className="text-sm text-muted-foreground">
                    {selectedTier.minUsers && (
                      <span>Minimum: {selectedTier.minUsers}</span>
                    )}
                    {selectedTier.maxUsers && (
                      <span>Maximum: {selectedTier.maxUsers}</span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Billing Cycle</CardTitle>
            <CardDescription>
              Choose how often you'd like to be billed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue={subscriptionOptions.billingCycle}
              onValueChange={(value) => handleBillingCycleChange(value as "monthly" | "annually")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annually">
                  Annually (Save 10%)
                </TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="p-4 bg-muted/30 rounded-md mt-2">
                Pay monthly with no long-term commitment
              </TabsContent>
              <TabsContent value="annually" className="p-4 bg-primary/5 rounded-md mt-2">
                Pay annually and receive a 10% discount on your subscription
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {plan.addOns.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Optional Add-ons</CardTitle>
              <CardDescription>
                Enhance your plan with these additional services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {plan.addOns.map((addon) => (
                  <div
                    key={addon.id}
                    className="flex items-start space-x-3 p-4 border rounded-md"
                  >
                    <Checkbox
                      id={addon.id}
                      checked={subscriptionOptions.addOns.includes(addon.id)}
                      onCheckedChange={() => handleAddOnToggle(addon.id)}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={addon.id}
                        className="text-base font-medium cursor-pointer"
                      >
                        {addon.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {addon.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        R{addon.price.toFixed(2)}
                        <span className="text-sm text-muted-foreground">
                          {addon.perUser ? "/user" : ""}/mo
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{plan.name} - {getSelectedTier().name}</span>
                <span>
                  R{(selectedTier.perUser
                    ? selectedTier.price * (subscriptionOptions.userCount || 1)
                    : selectedTier.price
                  ).toFixed(2)}
                </span>
              </div>
              
              {subscriptionOptions.addOns.map((addonId) => {
                const addon = plan.addOns.find(a => a.id === addonId);
                if (!addon) return null;
                
                return (
                  <div key={addonId} className="flex justify-between">
                    <span>{addon.name}</span>
                    <span>
                      R{(addon.perUser
                        ? addon.price * (subscriptionOptions.userCount || 1)
                        : addon.price
                      ).toFixed(2)}
                    </span>
                  </div>
                );
              })}
              
              <Separator className="my-2" />
              
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>R{calculateSubtotal().toFixed(2)}</span>
              </div>
              
              {subscriptionOptions.billingCycle === "annually" && (
                <div className="flex justify-between text-green-600">
                  <span>Annual Discount (10%)</span>
                  <span>-R{(calculateSubtotal() * 0.1).toFixed(2)}</span>
                </div>
              )}
              
              <Separator className="my-2" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
                  R{subscriptionOptions.billingCycle === "annually"
                    ? (calculateSubtotal() * 0.9).toFixed(2)
                    : calculateSubtotal().toFixed(2)
                  }{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{subscriptionOptions.billingCycle === "annually" ? "yr" : "mo"}
                  </span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  const renderCompanyDetails = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Information
          </CardTitle>
          <CardDescription>
            Tell us about your company to help us better serve you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name *</Label>
              <Input
                id="company-name"
                value={formData.company.name}
                onChange={(e) => updateCompanyField("name", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company-size">Company Size *</Label>
              <Select
                value={formData.company.size}
                onValueChange={(value) => updateCompanyField("size", value)}
              >
                <SelectTrigger id="company-size">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="501-1000">501-1000 employees</SelectItem>
                  <SelectItem value="1000+">1000+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company-industry">Industry *</Label>
              <Select
                value={formData.company.industry}
                onValueChange={(value) => updateCompanyField("industry", value as Industry)}
              >
                <SelectTrigger id="company-industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Financial">Financial Services</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="Accounting">Accounting</SelectItem>
                  <SelectItem value="Nonprofit">Nonprofit</SelectItem>
                  <SelectItem value="Architecture">Architecture</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-base font-medium mb-3">Company Address</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  value={formData.company.address.street}
                  onChange={(e) => updateCompanyAddress("street", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.company.address.city}
                  onChange={(e) => updateCompanyAddress("city", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State/Province *</Label>
                <Input
                  id="state"
                  value={formData.company.address.state}
                  onChange={(e) => updateCompanyAddress("state", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP/Postal Code *</Label>
                <Input
                  id="zip"
                  value={formData.company.address.zip}
                  onChange={(e) => updateCompanyAddress("zip", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select
                  value={formData.company.address.country}
                  onValueChange={(value) => updateCompanyAddress("country", value)}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    {/* Add more countries as needed */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderBillingInfo = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Billing Information
          </CardTitle>
          <CardDescription>
            Provide contact and payment details for billing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-medium">Billing Contact</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Contact Name *</Label>
                <Input
                  id="contact-name"
                  value={formData.billing.contactName}
                  onChange={(e) => updateBillingField("contactName", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={formData.billing.contactEmail}
                  onChange={(e) => updateBillingField("contactEmail", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone *</Label>
                <Input
                  id="contact-phone"
                  value={formData.billing.contactPhone}
                  onChange={(e) => updateBillingField("contactPhone", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-base font-medium">Payment Method</h3>
            <RadioGroup
              value={formData.billing.paymentMethod}
              onValueChange={(value) => updateBillingField("paymentMethod", value as "credit" | "invoice" | "ach")}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" id="payment-credit" />
                <Label htmlFor="payment-credit" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Credit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="invoice" id="payment-invoice" />
                <Label htmlFor="payment-invoice" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Invoice (Net 30)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ach" id="payment-ach" />
                <Label htmlFor="payment-ach" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  ACH Bank Transfer
                </Label>
              </div>
            </RadioGroup>
            
            {formData.billing.paymentMethod === "credit" && (
              <div className="mt-4 p-4 border rounded-md bg-background space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="card-number">Card Number *</Label>
                    <Input
                      id="card-number"
                      placeholder="4242 4242 4242 4242"
                      value={formData.billing.cardDetails?.number || ""}
                      onChange={(e) => updateCardDetails("number", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="card-expiry">Expiration Date *</Label>
                    <Input
                      id="card-expiry"
                      placeholder="MM/YY"
                      value={formData.billing.cardDetails?.expiry || ""}
                      onChange={(e) => updateCardDetails("expiry", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="card-cvc">CVC *</Label>
                    <Input
                      id="card-cvc"
                      placeholder="123"
                      value={formData.billing.cardDetails?.cvc || ""}
                      onChange={(e) => updateCardDetails("cvc", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="card-name">Name on Card *</Label>
                    <Input
                      id="card-name"
                      value={formData.billing.cardDetails?.name || ""}
                      onChange={(e) => updateCardDetails("name", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>
            )}
            
            {formData.billing.paymentMethod === "invoice" && (
              <div className="mt-4 p-4 border rounded-md bg-muted/30 text-sm">
                You've selected to pay by invoice. We'll send an invoice to your billing email.
                Payment is due within 30 days of receipt.
              </div>
            )}
            
            {formData.billing.paymentMethod === "ach" && (
              <div className="mt-4 p-4 border rounded-md bg-muted/30 text-sm">
                You've selected to pay by ACH bank transfer. After submitting your order,
                you'll receive instructions for setting up ACH payments.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderReviewConfirm = () => {
    const selectedTier = getSelectedTier();
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>
              Review your subscription details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">Selected Plan</p>
              <div className="bg-muted/30 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">{plan.name} - {selectedTier.name}</p>
                  <p>
                    ${selectedTier.perUser
                      ? selectedTier.price * (subscriptionOptions.userCount || 1)
                      : selectedTier.price
                    }
                    <span className="text-muted-foreground">
                      /{subscriptionOptions.billingCycle === "annually" ? "yr" : "mo"}
                    </span>
                  </p>
                </div>
                {selectedTier.perUser && (
                  <p className="text-sm text-muted-foreground">
                    {subscriptionOptions.userCount} users
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Billed {subscriptionOptions.billingCycle}
                </p>
              </div>
            </div>
            
            {subscriptionOptions.addOns.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium">Add-ons</p>
                <div className="bg-muted/30 p-4 rounded-md space-y-2">
                  {subscriptionOptions.addOns.map((addonId) => {
                    const addon = plan.addOns.find(a => a.id === addonId);
                    if (!addon) return null;
                    
                    return (
                      <div key={addonId} className="flex justify-between">
                        <p>{addon.name}</p>
                        <p>
                          ${addon.perUser
                            ? addon.price * (subscriptionOptions.userCount || 1)
                            : addon.price
                          }
                          <span className="text-muted-foreground">
                            /{subscriptionOptions.billingCycle === "annually" ? "yr" : "mo"}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="bg-primary/5 p-4 rounded-md space-y-2 border-primary/20 border">
              <div className="flex justify-between font-medium">
                <p>Subtotal</p>
                <p>${calculateSubtotal().toFixed(2)}</p>
              </div>
              
              {subscriptionOptions.billingCycle === "annually" && (
                <div className="flex justify-between text-green-600">
                  <p>Annual Discount (10%)</p>
                  <p>-${(calculateSubtotal() * 0.1).toFixed(2)}</p>
                </div>
              )}
              
              <Separator className="my-2" />
              
              <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>
                  ${subscriptionOptions.billingCycle === "annually"
                    ? (calculateSubtotal() * 0.9).toFixed(2)
                    : calculateSubtotal().toFixed(2)
                  }
                  <span className="text-sm font-normal text-muted-foreground">
                    /{subscriptionOptions.billingCycle === "annually" ? "yr" : "mo"}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="font-medium mb-2">Company Details</p>
                <p>{formData.company.name}</p>
                <p>{formData.company.size} employees</p>
                <p>{formData.company.industry}</p>
              </div>
              
              <div>
                <p className="font-medium mb-2">Billing Address</p>
                <p>{formData.company.address.street}</p>
                <p>
                  {formData.company.address.city}, {formData.company.address.state}{" "}
                  {formData.company.address.zip}
                </p>
                <p>{formData.company.address.country}</p>
              </div>
              
              <div>
                <p className="font-medium mb-2">Billing Contact</p>
                <p>{formData.billing.contactName}</p>
                <p>{formData.billing.contactEmail}</p>
                <p>{formData.billing.contactPhone}</p>
              </div>
              
              <div>
                <p className="font-medium mb-2">Payment Method</p>
                {formData.billing.paymentMethod === "credit" && (
                  <p>
                    Credit Card ending in {" "}
                    {formData.billing.cardDetails?.number.slice(-4) || "****"}
                  </p>
                )}
                {formData.billing.paymentMethod === "invoice" && (
                  <p>Invoice (Net 30)</p>
                )}
                {formData.billing.paymentMethod === "ach" && (
                  <p>ACH Bank Transfer</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => 
                    handleTermsAcceptedChange(checked as boolean)
                  }
                />
                <div className="space-y-1 leading-none">
                  <Label
                    htmlFor="terms"
                    className="text-base font-medium cursor-pointer"
                  >
                    I accept the terms and conditions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    By checking this box, you agree to our{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Privacy Policy
                    </Button>
                    . You also acknowledge our{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Service Level Agreement (SLA)
                    </Button>
                    .
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderPlanOptions();
      case 1:
        return renderCompanyDetails();
      case 2:
        return renderBillingInfo();
      case 3:
        return renderReviewConfirm();
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" onClick={handlePreviousStep} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {currentStep === 0 ? "Back to Plan Details" : "Previous Step"}
        </Button>
        
        <div className="mb-6">
          <h1>{plan.name}</h1>
          <p className="text-muted-foreground">
            Subscribe to this plan in just a few steps
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index < steps.length - 1
                  ? "flex-1"
                  : ""
              }`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "border-2 border-primary text-primary"
                    : "border-2 border-muted text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              <div
                className={`hidden md:block ml-2 ${
                  index === currentStep
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    index < currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {renderCurrentStep()}
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handlePreviousStep}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {currentStep === 0 ? "Back to Plan Details" : "Previous"}
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNextStep} disabled={!isStepValid()}>
            Next Step
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleComplete} disabled={!isStepValid()}>
            Complete Purchase
            <Check className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
