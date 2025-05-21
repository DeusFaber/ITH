
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function CommunicationPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Unified Communication",
      description: "Integrate phone, messaging, and video conferencing into a single platform for simplified communication."
    },
    {
      title: "Remote Collaboration",
      description: "Enable productive remote and hybrid work with robust virtual meeting and collaboration tools."
    },
    {
      title: "Professional Presence",
      description: "Present a professional image to clients with reliable phone systems and virtual reception options."
    },
    {
      title: "Cost Reduction",
      description: "Lower communication costs by transitioning from traditional phone systems to modern VoIP solutions."
    },
    {
      title: "Enhanced Mobility",
      description: "Stay connected on any device with mobile apps for business communication and collaboration."
    },
    {
      title: "Scalability",
      description: "Easily add or remove users as your business grows without hardware limitations."
    },
  ];

  const features: PlanFeature[] = [
    { title: "Business VoIP Phone System", included: true },
    { title: "Video Conferencing Platform", included: true },
    { title: "Team Messaging & Collaboration", included: true },
    { title: "Mobile App Integration", included: true },
    { title: "Voicemail to Email", included: true },
    { title: "Auto-Attendant / IVR", included: true },
    { title: "Call Routing & Forwarding", included: true },
    { title: "Conference Calling", included: true },
    { title: "Screen Sharing", included: true },
    { title: "Business SMS", included: true },
    { title: "Phone System Support", included: true },
    { title: "Call Analytics", included: true },
    { title: "User Training", included: true },
    { title: "Number Porting Assistance", included: true },
    { title: "Advanced Call Center Features", included: false },
    { title: "Custom Integration Development", included: false },
    { title: "Call Recording & Storage", included: false },
    { title: "Hardware Phone Devices", included: false },
  ];

  const faqs = [
    {
      question: "Can we keep our existing phone numbers?",
      answer: "Yes, we provide number porting services to transfer your existing business phone numbers to the new system. The process typically takes 7-14 business days depending on your current provider."
    },
    {
      question: "What equipment do we need?",
      answer: "The system works with standard computers and mobile devices. Optional desk phones can be purchased separately if desired, but many businesses operate effectively using softphones (computer/mobile apps) only."
    },
    {
      question: "Does this replace Microsoft Teams?",
      answer: "This plan can either integrate with Microsoft Teams (if you already use it) or provide an alternative communication solution. We'll recommend the best approach based on your existing technology and requirements."
    },
    {
      question: "How reliable is VoIP compared to traditional phones?",
      answer: "Modern VoIP systems are highly reliable when implemented correctly. We ensure proper bandwidth, QoS configuration, and failover options to maintain call quality and uptime. Most issues with VoIP stem from improper implementation, which our expertise prevents."
    },
    {
      question: "Can we still use fax machines?",
      answer: "We provide digital faxing capabilities through email integration, eliminating the need for physical fax machines while preserving the ability to send and receive faxes."
    },
  ];

  const relatedPlans = [
    {
      title: "User Health Plan",
      slug: "user-health-plan",
      phase: "operate" as const
    },
    {
      title: "Office Health Plan",
      slug: "office-health-plan",
      phase: "operate" as const
    },
    {
      title: "Business Basic Plan",
      slug: "business-basic-plan",
      phase: "streamline" as const
    },
  ];

  return (
    <PlanPage
      title="Communication Plan"
      slug="communication"
      phase="operate"
      phaseColor="#1175E4" // Blue color for Operate phase
      description="Comprehensive business communication solution with VoIP phone system, video conferencing, and team collaboration tools. Streamline your communication channels while reducing costs."
      price="R295 / user / month"
      priceDescription="Includes phone system & support"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
