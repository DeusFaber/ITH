
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function SharePointPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Centralized Document Management",
      description: "Create a single source of truth for all your business documents with structured storage and access controls."
    },
    {
      title: "Enhanced Collaboration",
      description: "Improve team productivity with co-authoring, version control, and structured document workflows."
    },
    {
      title: "Custom Intranet",
      description: "Build an internal portal for company news, resources, and department-specific information."
    },
    {
      title: "Process Automation",
      description: "Streamline business processes with custom workflows, approvals, and notifications."
    },
    {
      title: "Information Security",
      description: "Protect sensitive data with granular permissions, conditional access, and compliance features."
    },
    {
      title: "Knowledge Management",
      description: "Capture and share organizational knowledge through structured content, metadata, and search capabilities."
    },
  ];

  const features: PlanFeature[] = [
    { title: "SharePoint Site Design & Setup", included: true },
    { title: "Document Library Configuration", included: true },
    { title: "Custom Metadata & Tagging", included: true },
    { title: "Permission Management", included: true },
    { title: "Basic Workflow Automation", included: true },
    { title: "Content Migration Support", included: true },
    { title: "Intranet Homepage Design", included: true },
    { title: "Department Subsites", included: true },
    { title: "Microsoft Teams Integration", included: true },
    { title: "Version Control Configuration", included: true },
    { title: "Search Optimization", included: true },
    { title: "User Training", included: true },
    { title: "Monthly Management & Support", included: true },
    { title: "Quarterly Review & Optimization", included: true },
    { title: "Custom SharePoint Development", included: false },
    { title: "Power Apps Integration", included: false },
    { title: "Business Intelligence Dashboards", included: false },
    { title: "Third-party Tool Integration", included: false },
  ];

  const faqs = [
    {
      question: "Is SharePoint included in Microsoft 365 subscriptions?",
      answer: "Yes, SharePoint Online is included in Microsoft 365 Business subscriptions. This plan provides implementation, customization, and management services for SharePoint, along with training and support. We help you maximize the value from the platform beyond just providing the license."
    },
    {
      question: "How long does SharePoint implementation take?",
      answer: "A basic SharePoint setup can be completed in 2-4 weeks. More complex implementations with custom workflows, extensive migrations, or specialized requirements may take 8-12 weeks. We provide a detailed timeline during the planning phase."
    },
    {
      question: "Can we migrate from an on-premises SharePoint server?",
      answer: "Yes, we provide migration services from SharePoint on-premises (2013, 2016, 2019) to SharePoint Online. The process includes content assessment, migration planning, and execution with minimal disruption to your operations."
    },
    {
      question: "How customizable is the SharePoint environment?",
      answer: "SharePoint offers extensive customization capabilities. The standard plan includes configuration using out-of-the-box features like custom metadata, views, and basic automation. Advanced customization using Power Platform or custom development is available as an add-on service."
    },
    {
      question: "What kind of training is provided?",
      answer: "We provide user training sessions for document management basics, site navigation, and collaboration features. Administrator training covers site management, permissions, and basic maintenance. Custom training modules can be developed for specific department needs."
    },
  ];

  const relatedPlans = [
    {
      title: "Business Standard Plan",
      slug: "business-standard-plan",
      phase: "streamline" as const
    },
    {
      title: "Business Basic Plan",
      slug: "business-basic-plan",
      phase: "streamline" as const
    },
    {
      title: "Workflow Optimization Plan",
      slug: "workflow-optimization-plan",
      phase: "accelerate" as const
    },
  ];

  return (
    <PlanPage
      title="SharePoint Plan"
      slug="sharepoint"
      phase="streamline"
      phaseColor="#FF246B" // Pink color for Streamline phase
      description="Comprehensive document management and collaboration platform for your business. Our SharePoint Plan provides implementation, customization, and ongoing support for Microsoft SharePoint Online."
      price="R8,500 setup + R2,500 / month"
      priceDescription="Supports up to 50 users"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
