
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function BusinessStandardPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Complete Productivity Suite",
      description: "Comprehensive set of desktop and web applications for maximum productivity and collaboration."
    },
    {
      title: "Work Flexibility",
      description: "Seamlessly transition between office and remote work with synchronized desktop and mobile experiences."
    },
    {
      title: "Advanced Collaboration",
      description: "Enhanced team coordination with robust sharing, co-authoring, and communication tools."
    },
    {
      title: "Streamlined Processes",
      description: "Optimize business workflows with integrated applications and automation capabilities."
    },
    {
      title: "Professional Content Creation",
      description: "Create polished documents, presentations, and visual content with premium Office applications."
    },
    {
      title: "Simplified IT Management",
      description: "Centralized administration, security, and compliance features for your entire productivity environment."
    },
  ];

  const features: PlanFeature[] = [
    { title: "Microsoft 365 Business Standard Licenses", included: true },
    { title: "Desktop Office Applications", included: true },
    { title: "Mobile Office Applications", included: true },
    { title: "Email (50GB per user)", included: true },
    { title: "Microsoft Teams", included: true },
    { title: "1TB OneDrive Storage", included: true },
    { title: "SharePoint Online", included: true },
    { title: "Microsoft Bookings", included: true },
    { title: "Microsoft Forms & Lists", included: true },
    { title: "Webinar Hosting", included: true },
    { title: "License Management", included: true },
    { title: "Data Migration Support", included: true },
    { title: "User Training Resources", included: true },
    { title: "Premium Support", included: true },
    { title: "Advanced Security Features", included: false },
    { title: "Power Automate Premium", included: false },
    { title: "Power BI Pro", included: false },
    { title: "Microsoft 365 Copilot", included: false },
  ];

  const faqs = [
    {
      question: "What's the difference between Business Basic and Business Standard?",
      answer: "The primary difference is that Business Standard includes full desktop versions of Office applications (Word, Excel, PowerPoint, Outlook, etc.) while Business Basic only includes web versions. Business Standard also adds features like Bookings and webinar capabilities."
    },
    {
      question: "Can we install the Office apps on multiple devices?",
      answer: "Yes, each user can install Office applications on up to 5 PCs or Macs, 5 tablets, and 5 mobile devices. This flexibility allows users to work from multiple devices while maintaining a consistent experience."
    },
    {
      question: "Is Teams Phone included in this plan?",
      answer: "No, Teams Phone (PSTN calling capabilities) is not included in Microsoft 365 Business Standard. We offer this as an add-on service or as part of our Communication Plan if you need voice calling capabilities."
    },
    {
      question: "Do you provide training on using these applications?",
      answer: "Yes, we provide basic training resources and documentation. For more comprehensive training, we offer additional training packages tailored to your team's specific needs."
    },
    {
      question: "Can we migrate from Google Workspace or other platforms?",
      answer: "Yes, we provide migration services from Google Workspace, other Microsoft 365 tenants, and various productivity platforms. Our migration process ensures your emails, documents, and data are transferred smoothly."
    },
  ];

  const relatedPlans = [
    {
      title: "Business Basic Plan",
      slug: "business-basic-plan",
      phase: "streamline" as const
    },
    {
      title: "SharePoint Plan",
      slug: "sharepoint-plan",
      phase: "streamline" as const
    },
    {
      title: "AI Connect Plan",
      slug: "ai-connect-plan",
      phase: "accelerate" as const
    },
  ];

  return (
    <PlanPage
      title="Business Standard Plan"
      slug="business-standard"
      phase="streamline"
      phaseColor="#FF246B" // Pink color for Streamline phase
      description="Complete productivity and collaboration solution with premium Office applications. Our Business Standard Plan provides desktop and mobile Office apps, email, cloud storage, and team collaboration tools."
      price="R350 / user / month"
      priceDescription="Microsoft licensing + management"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
