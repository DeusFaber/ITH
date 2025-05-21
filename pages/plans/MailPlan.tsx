
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function MailPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Professional Email",
      description: "Present a professional image with branded email using your business domain."
    },
    {
      title: "Enhanced Security",
      description: "Protect your communication with advanced email security and anti-phishing capabilities."
    },
    {
      title: "Anywhere Access",
      description: "Access your email securely from any device or location with web and mobile apps."
    },
    {
      title: "Simplified Management",
      description: "Centralized administration and user management for your entire email system."
    },
    {
      title: "Reliability",
      description: "99.9% uptime guarantee ensures your business communication remains operational."
    },
    {
      title: "Compliance Support",
      description: "Data retention, legal hold, and compliance features to meet regulatory requirements."
    },
  ];

  const features: PlanFeature[] = [
    { title: "50GB Email Storage Per User", included: true },
    { title: "Custom Domain Email (@yourcompany.com)", included: true },
    { title: "Email Security Filtering", included: true },
    { title: "Anti-spam Protection", included: true },
    { title: "Anti-phishing Protection", included: true },
    { title: "Web Access (Outlook Web App)", included: true },
    { title: "Mobile App Support", included: true },
    { title: "Calendar & Scheduling", included: true },
    { title: "Email Signature Management", included: true },
    { title: "Shared Mailboxes", included: true },
    { title: "Distribution Groups", included: true },
    { title: "Basic Data Loss Prevention", included: true },
    { title: "Email Migration Support", included: true },
    { title: "Email Support & Troubleshooting", included: true },
    { title: "Advanced eDiscovery", included: false },
    { title: "Email Encryption (Message-level)", included: false },
    { title: "Advanced Threat Protection", included: false },
    { title: "Custom Mail Flow Rules", included: false },
  ];

  const faqs = [
    {
      question: "Can we migrate from Gmail/Google Workspace?",
      answer: "Yes, we provide migration services from Gmail, Google Workspace, and other email platforms. We'll help transfer your emails, contacts, and calendars to ensure a smooth transition with minimal disruption."
    },
    {
      question: "Do we need to purchase a domain name?",
      answer: "If you already own a domain name, we'll use that for your email. If you don't have one yet, we can help you purchase and configure an appropriate domain for your business as an additional service."
    },
    {
      question: "Can we keep our existing email addresses?",
      answer: "Yes, we'll maintain your existing email addresses during migration. You'll keep the same email address, but your email will be hosted on our more secure and feature-rich platform."
    },
    {
      question: "How does the anti-phishing protection work?",
      answer: "Our solution uses advanced algorithms to detect phishing attempts, spoofed sender addresses, and malicious links. Suspicious emails are quarantined for review or marked with warning banners to alert users of potential threats."
    },
    {
      question: "What happens if we need more storage?",
      answer: "Additional storage can be purchased as needed. We also provide archiving solutions for organizations with large email retention requirements or compliance needs."
    },
  ];

  const relatedPlans = [
    {
      title: "Business Basic Plan",
      slug: "business-basic-plan",
      phase: "streamline" as const
    },
    {
      title: "Business Standard Plan",
      slug: "business-standard-plan",
      phase: "streamline" as const
    },
    {
      title: "ITsafe User Plan",
      slug: "itsafe-user-plan",
      phase: "secure" as const
    },
  ];

  return (
    <PlanPage
      title="Mail Plan"
      slug="mail"
      phase="streamline"
      phaseColor="#FF246B" // Pink color for Streamline phase
      description="Professional business email with advanced security and management features. Our Mail Plan provides reliable, secure email communication with full support and simplified administration."
      price="R115 / user / month"
      priceDescription="Includes Microsoft Exchange Online"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
