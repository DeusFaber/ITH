
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function DigitalCustomerPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Enhanced Client Experience",
      description: "Deliver exceptional digital experiences that set your business apart from competitors."
    },
    {
      title: "Operational Efficiency",
      description: "Streamline client interactions and reduce manual administrative work through digital channels."
    },
    {
      title: "Improved Client Retention",
      description: "Strengthen client relationships with responsive, personalized digital engagement."
    },
    {
      title: "Expanded Reach",
      description: "Attract new clients through professional digital presence and streamlined onboarding."
    },
    {
      title: "Data-Driven Insights",
      description: "Gain valuable insights into client behavior and preferences to inform business decisions."
    },
    {
      title: "Competitive Differentiation",
      description: "Stand out in your market with modern digital capabilities that enhance your professional services."
    },
  ];

  const features: PlanFeature[] = [
    { title: "Client Portal Development", included: true },
    { title: "Secure Document Sharing", included: true },
    { title: "Digital Onboarding Process", included: true },
    { title: "Appointment Scheduling System", included: true },
    { title: "Electronic Signature Integration", included: true },
    { title: "Client Communication Tools", included: true },
    { title: "Service Request Management", included: true },
    { title: "Automated Client Updates", included: true },
    { title: "Client Feedback Collection", included: true },
    { title: "Basic CRM Integration", included: true },
    { title: "Mobile-Friendly Experience", included: true },
    { title: "User Training & Support", included: true },
    { title: "Monthly Maintenance & Updates", included: true },
    { title: "Quarterly Strategy Review", included: true },
    { title: "Custom App Development", included: false },
    { title: "Advanced Analytics Dashboard", included: false },
    { title: "AI-Powered Client Insights", included: false },
    { title: "Complex System Integrations", included: false },
  ];

  const faqs = [
    {
      question: "How is the client portal implemented?",
      answer: "We typically build the client portal using Microsoft SharePoint, Power Apps, or similar platforms integrated with your existing systems. This approach balances security, customization, and cost-effectiveness. For complex requirements, we can develop custom web applications."
    },
    {
      question: "Can the portal integrate with our existing systems?",
      answer: "Yes, we can integrate with a wide range of business systems including practice management software, accounting systems, CRM platforms, and document management systems. This ensures a seamless flow of information between client-facing tools and your internal operations."
    },
    {
      question: "How secure is the client portal?",
      answer: "Security is paramount for client-facing solutions. We implement multiple layers of protection including secure authentication, data encryption, regular security audits, and role-based access controls. All solutions are designed to comply with relevant regulations like POPIA."
    },
    {
      question: "How long does implementation take?",
      answer: "A standard implementation takes 8-12 weeks from initial requirements to launch. The process includes discovery, design, development, testing, and training phases. We often use a phased approach, launching core functionality first and adding features over time."
    },
    {
      question: "Do you provide branding and design services?",
      answer: "Yes, we ensure all client-facing components reflect your brand identity with professional design. While we're not a marketing agency, we create cohesive, branded digital experiences that reinforce your professional image and complement your existing brand assets."
    },
  ];

  const relatedPlans = [
    {
      title: "AI Connect Plan",
      slug: "ai-connect-plan",
      phase: "accelerate" as const
    },
    {
      title: "Workflow Optimization Plan",
      slug: "workflow-optimization-plan",
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
      title="Digital Customer Plan"
      slug="digital-customer"
      phase="accelerate"
      phaseColor="#1175E4" // Blue color for Accelerate phase
      description="Transform your client experience with digital engagement solutions. Our Digital Customer Plan implements client portals, secure document sharing, and streamlined communication channels."
      price="R15,000 setup + R4,500 / month"
      priceDescription="Enterprise solution with ongoing support"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
