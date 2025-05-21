
import React from 'react';
import { PlanPage, PlanBenefit, PlanFeature } from '../../components/plans/PlanPage';

export default function ITsafeServerPlan() {
  const benefits: PlanBenefit[] = [
    {
      title: "Infrastructure Security",
      description: "Comprehensive protection for your servers, network devices, and data storage systems."
    },
    {
      title: "Data Protection",
      description: "Robust backup, disaster recovery, and data integrity measures to safeguard critical information."
    },
    {
      title: "Compliance Assurance",
      description: "Maintain compliance with regulations through strict security controls and documentation."
    },
    {
      title: "Threat Prevention",
      description: "Proactive monitoring and advanced threat detection to prevent security breaches."
    },
    {
      title: "Business Continuity",
      description: "Minimize downtime and data loss with rapid incident response and recovery procedures."
    },
    {
      title: "Expert Support",
      description: "Access to specialized security engineers for complex infrastructure security needs."
    },
  ];

  const features: PlanFeature[] = [
    { title: "Server Security Monitoring", included: true },
    { title: "Firewall Management", included: true },
    { title: "Server Vulnerability Assessments", included: true },
    { title: "Server Patch Management", included: true },
    { title: "Network Security Monitoring", included: true },
    { title: "Data Backup Management", included: true },
    { title: "Anti-malware Protection", included: true },
    { title: "Data Encryption Implementation", included: true },
    { title: "Access Control Management", included: true },
    { title: "Server Hardening", included: true },
    { title: "Security Log Analysis", included: true },
    { title: "Remote Access Security", included: true },
    { title: "Monthly Security Reports", included: true },
    { title: "Disaster Recovery Planning", included: true },
    { title: "SIEM Implementation", included: false },
    { title: "Advanced Threat Hunting", included: false },
    { title: "Penetration Testing", included: false },
    { title: "24/7 SOC Monitoring", included: false },
  ];

  const faqs = [
    {
      question: "Does this cover cloud servers?",
      answer: "Yes, the ITsafe Server Plan covers both on-premises servers and cloud-based infrastructure such as Azure, AWS, or other cloud providers. We secure your server environment regardless of where it's hosted."
    },
    {
      question: "How often are backups performed?",
      answer: "Our standard configuration includes daily backups with weekly verification and monthly test restores. Custom backup schedules can be implemented based on your specific recovery point objectives (RPO)."
    },
    {
      question: "What is the server patching schedule?",
      answer: "We implement a structured patching schedule with critical security updates applied within 72 hours of release. Regular maintenance patches are applied monthly during scheduled maintenance windows to minimize disruption."
    },
    {
      question: "How is encryption handled?",
      answer: "We implement encryption at rest for sensitive data storage and encryption in transit for data communications. This includes disk encryption, database encryption, and secure communication protocols depending on your infrastructure."
    },
    {
      question: "Can this integrate with our existing security tools?",
      answer: "Yes, we can integrate with your existing security infrastructure and tools. During onboarding, we'll assess your current security stack and recommend the best integration approach to enhance rather than duplicate your security capabilities."
    },
  ];

  const relatedPlans = [
    {
      title: "ITsafe User Plan",
      slug: "itsafe-user-plan",
      phase: "secure" as const
    },
    {
      title: "Office Health Plan",
      slug: "office-health-plan",
      phase: "operate" as const
    },
    {
      title: "Business Standard Plan",
      slug: "business-standard-plan",
      phase: "streamline" as const
    },
  ];

  return (
    <PlanPage
      title="ITsafe Server Plan"
      slug="itsafe-server"
      phase="secure"
      phaseColor="#133258" // Navy color for Secure phase
      description="Comprehensive security for your server infrastructure and data. Our ITsafe Server Plan protects your critical business systems with advanced security measures, monitoring, and backup solutions."
      price="R4,500 / month"
      priceDescription="Base plan for up to 5 servers"
      benefits={benefits}
      features={features}
      faqs={faqs}
      relatedPlans={relatedPlans}
    />
  );
}
