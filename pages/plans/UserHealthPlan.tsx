
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function UserHealthPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Personalized Support",
      description: "On-demand access to IT specialists who understand your business needs and user requirements."
    },
    {
      title: "Enhanced Productivity",
      description: "Minimize downtime with rapid issue resolution and proactive monitoring of user systems."
    },
    {
      title: "Cost Control",
      description: "Predictable monthly costs with no surprise fees for user-level support and maintenance."
    },
    {
      title: "Security Compliance",
      description: "Ensure user devices meet security standards with regular updates and vulnerability management."
    },
    {
      title: "User Satisfaction",
      description: "Improve employee satisfaction by quickly addressing IT issues that impact their work."
    },
    {
      title: "Strategic Planning",
      description: "Guidance on user technology investments and lifecycle management to maximize ROI."
    },
  ];

  const features: PlanFeature[] = [
    { title: "24/7 Helpdesk Support", included: true },
    { title: "Device Management", included: true },
    { title: "Software Updates & Patching", included: true },
    { title: "User Account Management", included: true },
    { title: "Hardware Troubleshooting", included: true },
    { title: "Application Support", included: true },
    { title: "Email Configuration", included: true },
    { title: "Remote Support", included: true },
    { title: "Network Connectivity Support", included: true },
    { title: "Basic Security Monitoring", included: true },
    { title: "Password Reset Assistance", included: true },
    { title: "Mobile Device Support", included: true },
    { title: "Regular Health Checks", included: true },
    { title: "User Training Resources", included: true },
    { title: "Advanced Cybersecurity", included: false },
    { title: "Server Management", included: false },
    { title: "Data Backup & Recovery", included: false },
    { title: "Network Infrastructure", included: false },
  ];

  const faqs = [
    {
      question: "What is covered under the User Health Plan?",
      answer: "The User Health Plan covers all user-level IT support including helpdesk services, device management, software updates, user account management, and basic security monitoring. It focuses on keeping your end users productive with minimal IT disruptions."
    },
    {
      question: "How many users does this plan support?",
      answer: "The base User Health Plan covers up to 10 users. Additional users can be added for R350 per user per month. We offer volume discounts for organizations with more than 25 users."
    },
    {
      question: "Is there a limit to helpdesk support requests?",
      answer: "No, we offer unlimited helpdesk support requests for all covered users. Our goal is to ensure your team can always get help when they need it, without worry about extra costs."
    },
    {
      question: "What's the typical response time for support requests?",
      answer: "Our standard response time is within 30 minutes for critical issues and within 2 hours for non-critical issues during business hours. After-hours support is available for critical issues."
    },
    {
      question: "Can I combine this with other IThealth plans?",
      answer: "Yes, the User Health Plan works great as a foundation and can be combined with other plans like Office Health, ITsafe User, and various Streamline phase plans for a comprehensive IT solution."
    },
  ];

  const relatedPlans = [
    {
      title: "Office Health Plan",
      slug: "office-health-plan",
      phase: "operate" as const
    },
    {
      title: "Communication Plan",
      slug: "communication-plan",
      phase: "operate" as const
    },
    {
      title: "ITsafe User Plan",
      slug: "itsafe-user-plan",
      phase: "secure" as const
    },
  ];

  return (
    <PlanPage
      title="User Health Plan"
      slug="user-health"
      phase="operate"
      phaseColor="#1175E4" // Blue color for Operate phase
      description="Comprehensive end-user IT support to keep your team productive with minimal disruptions. Our User Health Plan provides day-to-day IT assistance, device management, and technical support for all your users."
      price="R3,500 / month"
      priceDescription="Per 10 users, billed monthly"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
