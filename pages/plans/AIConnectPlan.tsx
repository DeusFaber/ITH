
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function AIConnectPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Productivity Amplification",
      description: "Boost individual and team productivity with AI-powered tools and workflows."
    },
    {
      title: "Competitive Advantage",
      description: "Gain a significant edge over competitors by leveraging cutting-edge AI technologies."
    },
    {
      title: "Process Automation",
      description: "Automate repetitive tasks and processes to free up valuable human resources."
    },
    {
      title: "Data-Driven Insights",
      description: "Extract valuable intelligence from your business data to inform decision-making."
    },
    {
      title: "Enhanced Customer Experiences",
      description: "Improve client interactions through personalization and predictive service."
    },
    {
      title: "Innovation Acceleration",
      description: "Rapidly test and implement new ideas with AI-powered development tools."
    },
  ];

  const features: PlanFeature[] = [
    { title: "Microsoft 365 Copilot Licenses", included: true },
    { title: "AI Integration Assessment", included: true },
    { title: "Implementation Support", included: true },
    { title: "Custom AI Prompt Development", included: true },
    { title: "User Training & Best Practices", included: true },
    { title: "AI Ethics & Governance Guidance", included: true },
    { title: "Monthly AI Innovation Sessions", included: true },
    { title: "Enterprise AI License Management", included: true },
    { title: "AI Use Case Development", included: true },
    { title: "Workflow Automation Consulting", included: true },
    { title: "ROI Measurement & Reporting", included: true },
    { title: "Basic AI Integration Services", included: true },
    { title: "Regular Feature Updates", included: true },
    { title: "AI Optimization Support", included: true },
    { title: "Custom AI Solution Development", included: false },
    { title: "Advanced API Integrations", included: false },
    { title: "AI Data Pipeline Development", included: false },
    { title: "Dedicated AI Consultant", included: false },
  ];

  const faqs = [
    {
      question: "What is Microsoft 365 Copilot?",
      answer: "Microsoft 365 Copilot is an AI assistant that works across Microsoft applications like Word, Excel, PowerPoint, Outlook, and Teams. It helps users draft content, analyze data, summarize meetings, and automate tasks using natural language prompts."
    },
    {
      question: "Do we need special hardware for AI tools?",
      answer: "No, the AI services in this plan are cloud-based and run on Microsoft's infrastructure. Your existing computers will work fine as long as they meet the basic requirements for running Microsoft 365 applications."
    },
    {
      question: "How secure is AI processing of our data?",
      answer: "Microsoft 365 Copilot processes data within your Microsoft 365 tenant's security boundary. It adheres to the same compliance and security standards as Microsoft 365. We also provide guidance on AI governance and best practices to ensure responsible use."
    },
    {
      question: "What kind of training is provided?",
      answer: "We provide comprehensive training including basics of AI interaction, creating effective prompts, understanding AI limitations, and using AI ethically and responsibly. We also offer role-specific training for different departments."
    },
    {
      question: "How can we measure ROI from AI investments?",
      answer: "We help establish baseline productivity metrics before implementation and track improvements after adoption. Our quarterly reports highlight time savings, quality improvements, and other business impacts of your AI investments."
    },
  ];

  const relatedPlans = [
    {
      title: "Workflow Optimization Plan",
      slug: "workflow-optimization-plan",
      phase: "accelerate" as const
    },
    {
      title: "Reporting Plan",
      slug: "reporting-plan",
      phase: "accelerate" as const
    },
    {
      title: "Business Standard Plan",
      slug: "business-standard-plan",
      phase: "streamline" as const
    },
  ];

  return (
    <PlanPage
      title="AI Connect Plan"
      slug="ai-connect"
      phase="accelerate"
      phaseColor="#1175E4" // Blue color for Accelerate phase
      description="Harness the power of artificial intelligence to transform your business operations. Our AI Connect Plan integrates cutting-edge AI tools like Microsoft Copilot to boost productivity and innovation."
      price="R600 / user / month"
      priceDescription="Includes Microsoft licensing & support"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
