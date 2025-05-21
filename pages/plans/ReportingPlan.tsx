
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function ReportingPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Data-Driven Decisions",
      description: "Transform raw business data into actionable insights to guide strategic decision-making."
    },
    {
      title: "Operational Visibility",
      description: "Gain clear visibility into business operations with custom dashboards and reports."
    },
    {
      title: "Performance Monitoring",
      description: "Track key performance indicators in real-time and identify trends over time."
    },
    {
      title: "Automated Reporting",
      description: "Save time with automated data collection, processing, and report distribution."
    },
    {
      title: "Self-Service Analytics",
      description: "Empower users to create their own reports and analyze data without technical expertise."
    },
    {
      title: "Competitive Advantage",
      description: "Identify market opportunities and competitive insights to stay ahead of the curve."
    },
  ];

  const features: PlanFeature[] = [
    { title: "Business Intelligence Assessment", included: true },
    { title: "Data Source Integration", included: true },
    { title: "Custom Dashboard Development", included: true },
    { title: "KPI Definition & Implementation", included: true },
    { title: "Power BI Implementation", included: true },
    { title: "Automated Report Distribution", included: true },
    { title: "Data Visualization Design", included: true },
    { title: "Basic Data Modeling", included: true },
    { title: "Self-Service Report Creation", included: true },
    { title: "User Training", included: true },
    { title: "Monthly Report Maintenance", included: true },
    { title: "Quarterly Strategy Sessions", included: true },
    { title: "Cloud Report Hosting", included: true },
    { title: "Mobile Report Access", included: true },
    { title: "Advanced Data Modeling", included: false },
    { title: "AI-Powered Analytics", included: false },
    { title: "Predictive Analytics", included: false },
    { title: "Custom ETL Development", included: false },
  ];

  const faqs = [
    {
      question: "What data sources can you integrate with?",
      answer: "We can connect to a wide range of data sources including Microsoft 365, CRM systems (like Salesforce), ERP platforms, accounting software, SQL databases, Excel files, CSV exports, web services, and many other data sources through standard connectors or custom integrations."
    },
    {
      question: "Do we need special licenses for Power BI?",
      answer: "Yes, Power BI Pro licenses are required for users who will be creating or sharing content. Viewer-only users can often use the free license. We'll help determine the optimal licensing strategy based on your needs and include necessary licenses in the implementation."
    },
    {
      question: "How long does implementation take?",
      answer: "Initial dashboard implementation typically takes 4-6 weeks, starting with requirements gathering, followed by data source integration, dashboard development, testing, and user training. More complex implementations with multiple data sources may take 8-12 weeks."
    },
    {
      question: "Can reports be shared outside our organization?",
      answer: "Yes, reports can be shared with external stakeholders through various methods. We can implement secure external sharing options including embedded reports, exported documents, or dedicated external user access depending on your requirements."
    },
    {
      question: "How much training is provided?",
      answer: "We provide comprehensive training for both dashboard consumers and creators. This includes how to navigate dashboards, perform data analysis, create custom visualizations, and develop reports. Training is tailored to different user roles within your organization."
    },
  ];

  const relatedPlans = [
    {
      title: "Workflow Optimization Plan",
      slug: "workflow-optimization-plan",
      phase: "accelerate" as const
    },
    {
      title: "Digital Customer Plan",
      slug: "digital-customer-plan",
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
      title="Reporting Plan"
      slug="reporting"
      phase="accelerate"
      phaseColor="#1175E4" // Blue color for Accelerate phase
      description="Transform your business data into actionable insights. Our Reporting Plan implements custom dashboards and analytics solutions to drive informed decision-making across your organization."
      price="R10,500 setup + R3,500 / month"
      priceDescription="Includes up to 5 dashboard modules"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
