
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function BusinessBasicPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Productivity Enhancement",
      description: "Streamline operations with modern business tools and collaborative workflows."
    },
    {
      title: "Anywhere Access",
      description: "Work securely from any location with cloud-based business applications and storage."
    },
    {
      title: "Communication Efficiency",
      description: "Improve team communication with integrated messaging, calling, and meeting tools."
    },
    {
      title: "Document Management",
      description: "Structured document storage with version control and secure sharing capabilities."
    },
    {
      title: "Cost Efficiency",
      description: "Reduce costs with bundled software licensing and optimized consumption models."
    },
    {
      title: "Business Continuity",
      description: "Ensure business operations can continue regardless of location or device."
    },
  ];

  const features: PlanFeature[] = [
    { title: "Microsoft 365 Business Basic Licenses", included: true },
    { title: "Email (50GB per user)", included: true },
    { title: "Microsoft Teams", included: true },
    { title: "1TB OneDrive Storage", included: true },
    { title: "Web Versions of Office Apps", included: true },
    { title: "SharePoint Online", included: true },
    { title: "Microsoft Forms", included: true },
    { title: "Microsoft Lists", included: true },
    { title: "Mobile App Access", included: true },
    { title: "License Management", included: true },
    { title: "Basic Data Backup", included: true },
    { title: "Migration Assistance", included: true },
    { title: "Security Best Practices", included: true },
    { title: "Standard Support", included: true },
    { title: "Desktop Office Applications", included: false },
    { title: "Advanced Security Features", included: false },
    { title: "Advanced Analytics", included: false },
    { title: "Custom App Development", included: false },
  ];

  const faqs = [
    {
      question: "What's included in Microsoft 365 Business Basic?",
      answer: "Business Basic includes web versions of Office applications (Word, Excel, PowerPoint), email with 50GB mailbox, 1TB of OneDrive storage, Microsoft Teams, SharePoint Online, and other collaboration tools. It does not include the desktop versions of Office applications."
    },
    {
      question: "Can we migrate from our current email provider?",
      answer: "Yes, we provide migration assistance from common email platforms like Gmail, other Microsoft 365 tenants, and IMAP-based email systems. More complex migrations may incur additional one-time fees."
    },
    {
      question: "What kind of support is included?",
      answer: "Standard support includes help with account setup, basic troubleshooting, and general guidance on using Microsoft 365 services. Advanced configuration and specialized training are available as add-on services."
    },
    {
      question: "Can we upgrade to other plans later?",
      answer: "Yes, you can easily upgrade to Business Standard or other plans as your needs grow. We'll help manage the transition to ensure a smooth experience for your users."
    },
    {
      question: "Is data backup included?",
      answer: "Basic data backup is included, which leverages Microsoft's native retention policies. For more comprehensive backup solutions with longer retention periods and point-in-time recovery, consider adding our advanced backup services."
    },
  ];

  const relatedPlans = [
    {
      title: "Business Standard Plan",
      slug: "business-standard-plan",
      phase: "streamline" as const
    },
    {
      title: "Mail Plan",
      slug: "mail-plan",
      phase: "streamline" as const
    },
    {
      title: "SharePoint Plan",
      slug: "sharepoint-plan",
      phase: "streamline" as const
    },
  ];

  return (
    <PlanPage
      title="Business Basic Plan"
      slug="business-basic"
      phase="streamline"
      phaseColor="#FF246B" // Pink color for Streamline phase
      description="Essential cloud productivity tools for small to medium businesses. Our Business Basic Plan provides web-based Microsoft 365 applications, email, and collaboration tools to streamline your operations."
      price="R175 / user / month"
      priceDescription="Microsoft licensing + management"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
