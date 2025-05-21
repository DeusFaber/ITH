
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function OfficeHealthPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Infrastructure Stability",
      description: "Ensure your network, hardware, and infrastructure operate reliably with proactive maintenance and monitoring."
    },
    {
      title: "Reduced Downtime",
      description: "Minimize business interruptions with rapid response to infrastructure issues and preventative maintenance."
    },
    {
      title: "Simplified Management",
      description: "One point of contact for all office IT needs, from printers to network equipment."
    },
    {
      title: "Future-Proof Planning",
      description: "Regular technology assessments and roadmapping to keep your infrastructure aligned with business needs."
    },
    {
      title: "Cost Optimization",
      description: "Identify opportunities to optimize licensing, consolidate hardware, and reduce unnecessary IT expenditure."
    },
    {
      title: "Scalable Infrastructure",
      description: "Design and maintain systems that can grow with your business without major overhauls."
    },
  ];

  const features: PlanFeature[] = [
    { title: "Network Monitoring & Management", included: true },
    { title: "Internet Connectivity Management", included: true },
    { title: "Wi-Fi Setup & Optimization", included: true },
    { title: "Printer & Peripherals Support", included: true },
    { title: "Hardware Inventory Management", included: true },
    { title: "Office Equipment Troubleshooting", included: true },
    { title: "Network Security Management", included: true },
    { title: "License & Asset Management", included: true },
    { title: "Regular Infrastructure Reviews", included: true },
    { title: "Technology Roadmapping", included: true },
    { title: "Onsite Support (8 hours monthly)", included: true },
    { title: "Power Management Solutions", included: true },
    { title: "Vendor Management", included: true },
    { title: "IT Procurement Assistance", included: true },
    { title: "Cloud Infrastructure Management", included: false },
    { title: "Advanced Server Administration", included: false },
    { title: "Enterprise Cybersecurity", included: false },
    { title: "Business Continuity Planning", included: false },
  ];

  const faqs = [
    {
      question: "What's the difference between User Health and Office Health plans?",
      answer: "While the User Health Plan focuses on supporting individual users and their devices, the Office Health Plan manages your shared office infrastructure including networks, printers, office hardware, and physical IT assets."
    },
    {
      question: "Does this plan include physical hardware?",
      answer: "No, the Office Health Plan covers the management, maintenance, and support of your infrastructure but does not include the cost of physical hardware. We do offer hardware leasing options as an add-on service."
    },
    {
      question: "How often will you perform onsite visits?",
      answer: "The standard plan includes 8 hours of onsite support per month, which can be scheduled as needed. Additional onsite hours can be purchased as required."
    },
    {
      question: "Can you help with office relocations?",
      answer: "Yes, while major office relocations might incur additional project fees, we help plan and execute IT aspects of office moves including network setup, equipment relocation, and ensuring business continuity."
    },
    {
      question: "How do you handle internet outages?",
      answer: "We work directly with your internet service providers to resolve issues quickly. For critical business needs, we recommend implementing redundant internet connections which we can help configure and manage."
    },
  ];

  const relatedPlans = [
    {
      title: "User Health Plan",
      slug: "user-health-plan",
      phase: "operate" as const
    },
    {
      title: "Communication Plan",
      slug: "communication-plan",
      phase: "operate" as const
    },
    {
      title: "ITsafe Server Plan",
      slug: "itsafe-server-plan",
      phase: "secure" as const
    },
  ];

  return (
    <PlanPage
      title="Office Health Plan"
      slug="office-health"
      phase="operate"
      phaseColor="#1175E4" // Blue color for Operate phase
      description="Comprehensive management of your office IT infrastructure, ensuring reliable network connectivity, equipment maintenance, and strategic technology planning for your physical work environment."
      price="R5,500 / month"
      priceDescription="Base plan for offices up to 30 users"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
