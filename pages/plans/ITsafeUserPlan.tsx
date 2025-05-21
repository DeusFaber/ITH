
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function ITsafeUserPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Comprehensive Protection",
      description: "Multi-layered security approach to protect user devices from the latest threats and vulnerabilities."
    },
    {
      title: "Regulatory Compliance",
      description: "Help meet POPIA, GDPR, and industry-specific compliance requirements for data protection."
    },
    {
      title: "Reduced Risk",
      description: "Minimize the risk of breaches, data loss, and ransomware through proactive security measures."
    },
    {
      title: "Security Awareness",
      description: "Ongoing user education and phishing simulations to strengthen your human firewall."
    },
    {
      title: "Rapid Response",
      description: "Quick identification and remediation of security incidents to minimize impact."
    },
    {
      title: "Expert Guidance",
      description: "Access to cybersecurity specialists for advice on evolving threats and best practices."
    },
  ];

  const features: PlanFeature[] = [
    { title: "Advanced Endpoint Protection", included: true },
    { title: "Email Security & Anti-phishing", included: true },
    { title: "Multi-factor Authentication", included: true },
    { title: "Password Management Solution", included: true },
    { title: "Security Awareness Training", included: true },
    { title: "Phishing Simulations", included: true },
    { title: "Device Encryption", included: true },
    { title: "Secure Remote Access", included: true },
    { title: "Mobile Device Security", included: true },
    { title: "Regular Security Assessments", included: true },
    { title: "Security Policies Development", included: true },
    { title: "Dark Web Monitoring", included: true },
    { title: "Security Incident Response", included: true },
    { title: "Monthly Security Reports", included: true },
    { title: "Advanced Threat Hunting", included: false },
    { title: "Security Operations Center", included: false },
    { title: "Penetration Testing", included: false },
    { title: "Custom Security Solutions", included: false },
  ];

  const faqs = [
    {
      question: "Is antivirus included in this plan?",
      answer: "Yes, we provide enterprise-grade endpoint protection that goes beyond traditional antivirus to include behavioral analysis, application control, and ransomware protection."
    },
    {
      question: "How does the security awareness training work?",
      answer: "We provide monthly interactive training modules (15-20 minutes each) for all users, supplemented with regular phishing simulations to test and reinforce good security habits."
    },
    {
      question: "Can this plan be added to existing plans?",
      answer: "Yes, the ITsafe User Plan works as an excellent security add-on to the User Health Plan, providing comprehensive protection for your users and devices."
    },
    {
      question: "Do you provide compliance documentation?",
      answer: "Yes, we provide regular security reports and documentation to help demonstrate compliance with regulations like POPIA. We can also assist with security aspects of industry-specific compliance requirements."
    },
    {
      question: "What happens if we experience a security incident?",
      answer: "Our team will respond rapidly to contain the threat, investigate the cause, remediate any issues, and provide guidance on preventing similar incidents in the future. Our goal is to minimize impact and recovery time."
    },
  ];

  const relatedPlans = [
    {
      title: "User Health Plan",
      slug: "user-health-plan",
      phase: "operate" as const
    },
    {
      title: "ITsafe Server Plan",
      slug: "itsafe-server-plan",
      phase: "secure" as const
    },
    {
      title: "Business Basic Plan",
      slug: "business-basic-plan",
      phase: "streamline" as const
    },
  ];

  return (
    <PlanPage
      title="ITsafe User Plan"
      slug="itsafe-user"
      phase="secure"
      phaseColor="#133258" // Navy color for Secure phase
      description="Comprehensive cybersecurity protection for end-users, devices, and data. Our ITsafe User Plan defends against modern threats with advanced security technologies and user education."
      price="R250 / user / month"
      priceDescription="Minimum 5 users, billed monthly"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
