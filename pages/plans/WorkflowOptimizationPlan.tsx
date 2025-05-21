
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function WorkflowOptimizationPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Process Efficiency",
      description: "Streamline business processes to reduce manual effort and eliminate bottlenecks."
    },
    {
      title: "Error Reduction",
      description: "Minimize human error through automated workflows and standardized processes."
    },
    {
      title: "Time Savings",
      description: "Automate repetitive tasks to free up valuable staff time for higher-value activities."
    },
    {
      title: "Enhanced Visibility",
      description: "Gain insight into business processes with tracking, reporting, and analytics."
    },
    {
      title: "Improved Compliance",
      description: "Ensure consistent adherence to business rules and regulatory requirements."
    },
    {
      title: "Scalable Operations",
      description: "Support business growth without proportional increases in administrative overhead."
    },
  ];

  const features: PlanFeature[] = [
    { title: "Business Process Assessment", included: true },
    { title: "Workflow Mapping & Design", included: true },
    { title: "Microsoft Power Automate Implementation", included: true },
    { title: "Form Digitization", included: true },
    { title: "Approval Process Automation", included: true },
    { title: "Document Generation", included: true },
    { title: "Notification Systems", included: true },
    { title: "Integration with Office 365", included: true },
    { title: "Custom Process Apps", included: true },
    { title: "User Training", included: true },
    { title: "Process Documentation", included: true },
    { title: "Ongoing Support & Maintenance", included: true },
    { title: "Quarterly Process Review", included: true },
    { title: "Enhancement Recommendations", included: true },
    { title: "Robotic Process Automation (RPA)", included: false },
    { title: "Complex Enterprise Integrations", included: false },
    { title: "AI-Enhanced Workflows", included: false },
    { title: "Custom Connector Development", included: false },
  ];

  const faqs = [
    {
      question: "What types of processes can be automated?",
      answer: "We can automate a wide range of business processes including approval workflows, document generation, data collection and processing, customer onboarding, employee onboarding, expense management, leave requests, contract management, and many other repetitive business processes."
    },
    {
      question: "What technologies do you use for automation?",
      answer: "We primarily use Microsoft Power Platform (Power Automate, Power Apps) for workflow automation, integrated with Microsoft 365 applications. For more complex requirements, we may implement specialized workflow tools or custom development solutions."
    },
    {
      question: "How do you determine which processes to optimize first?",
      answer: "We conduct a thorough process assessment to identify high-impact opportunities based on factors like time spent, error rates, process frequency, business impact, and complexity. We then develop a prioritized roadmap focusing first on processes that offer the greatest ROI."
    },
    {
      question: "How long does implementation take?",
      answer: "Implementation timelines vary based on complexity. Simple workflow automations can be implemented in 2-4 weeks, while more complex processes involving multiple systems may take 6-12 weeks. We typically work in phases to deliver incremental value throughout the project."
    },
    {
      question: "Can you integrate with our existing systems?",
      answer: "Yes, we can integrate with a wide range of business systems including CRM platforms, accounting software, ERP systems, and custom databases. Microsoft Power Platform offers hundreds of pre-built connectors, and we can develop custom connectors for specialized systems."
    },
  ];

  const relatedPlans = [
    {
      title: "Reporting Plan",
      slug: "reporting-plan",
      phase: "accelerate" as const
    },
    {
      title: "AI Connect Plan",
      slug: "ai-connect-plan",
      phase: "accelerate" as const
    },
    {
      title: "SharePoint Plan",
      slug: "sharepoint-plan",
      phase: "streamline" as const
    },
  ];

  return (
    <PlanPage
      title="Workflow Optimization Plan"
      slug="workflow-optimization"
      phase="accelerate"
      phaseColor="#1175E4" // Blue color for Accelerate phase
      description="Streamline and automate your business processes to increase efficiency and reduce costs. Our Workflow Optimization Plan eliminates manual tasks and bottlenecks through custom automation solutions."
      price="R12,500 setup + R3,500 / month"
      priceDescription="Includes development of 3 core workflows"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
