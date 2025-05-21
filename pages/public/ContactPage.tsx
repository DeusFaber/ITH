
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { HeroSection } from '../../components/ui/HeroSection';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { ArrowRight, MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ContactPageProps {
  onLoginClick: () => void;
  onGetStartedClick: () => void;
}

export function ContactPage({ onLoginClick, onGetStartedClick }: ContactPageProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    department: 'Sales',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Your message has been sent. We'll be in touch soon!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection
          fullWidth={true}
          background="blue"
          alignment="center"
          className="py-16 md:py-24"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight mb-4">
              Get in <span className="text-white">Touch</span>
            </h1>
            <p className="text-white/80 mb-4 max-w-md mx-auto">
              Have questions about IThealth? We're here to help you find the right IT solutions for your business.
            </p>
          </div>
        </HeroSection>

        {/* Contact Form & Information Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl md:text-3xl font-extralight mb-8">
                  Contact <span className="text-blue">Information</span>
                </h2>

                <div className="space-y-8">
                  <Card className="rounded-[16px] rounded-tr-[0px] hover:shadow-md transition-all overflow-hidden">
                    <div className="h-48 bg-muted">
                      {/* We'd normally embed a Google Map here */}
                      <div className="w-full h-full bg-blue/10 flex items-center justify-center">
                        <MapPin className="h-12 w-12 text-blue opacity-40" />
                      </div>
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-extralight mb-2">Cape Town Headquarters</h3>
                      <p className="text-muted-foreground mb-0">
                        12 Bree Street, Cape Town City Centre<br />
                        Cape Town, 8001<br />
                        South Africa
                      </p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-blue/10 p-3 mt-1">
                        <Phone className="h-5 w-5 text-blue" />
                      </div>
                      <div>
                        <h4 className="font-extralight text-lg mb-1">Phone</h4>
                        <p className="text-muted-foreground">+27 21 555 0150</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-blue/10 p-3 mt-1">
                        <Mail className="h-5 w-5 text-blue" />
                      </div>
                      <div>
                        <h4 className="font-extralight text-lg mb-1">Email</h4>
                        <p className="text-muted-foreground">hello@ithealth.co.za</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-blue/10 p-3 mt-1">
                        <Clock className="h-5 w-5 text-blue" />
                      </div>
                      <div>
                        <h4 className="font-extralight text-lg mb-1">Hours</h4>
                        <p className="text-muted-foreground">Mon-Fri: 8am - 5pm <br />Support: 24/7</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-extralight mb-4">Additional Offices</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-light text-base mb-1">Johannesburg</h4>
                        <p className="text-muted-foreground text-sm">
                          25 Fredman Drive, Sandton<br />
                          Johannesburg, 2196
                        </p>
                      </div>
                      <div>
                        <h4 className="font-light text-base mb-1">Durban</h4>
                        <p className="text-muted-foreground text-sm">
                          45 Umhlanga Rocks Drive<br />
                          Durban, 4320
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl md:text-3xl font-extralight mb-8">
                  Send us a <span className="text-blue">Message</span>
                </h2>

                {isSubmitted ? (
                  <Card className="rounded-[16px] rounded-tr-[0px] border border-green-200 bg-green-50">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center p-4">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-xl font-extralight mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground mb-6">
                          Thank you for contacting IThealth. One of our team members will get back to you within 24 hours.
                        </p>
                        <Button 
                          onClick={() => setIsSubmitted(false)}
                          className="bg-blue hover:bg-blue/90 rounded-[16px] rounded-tr-[0px]"
                        >
                          Send Another Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="rounded-[16px] rounded-tr-[0px]">
                    <CardContent className="pt-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm text-muted-foreground">
                              Full Name *
                            </label>
                            <Input
                              id="name"
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              placeholder="John Smith"
                              required
                              className="rounded-[16px] rounded-tr-[0px] border-muted-foreground/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm text-muted-foreground">
                              Email Address *
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formState.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                              required
                              className="rounded-[16px] rounded-tr-[0px] border-muted-foreground/20"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="company" className="text-sm text-muted-foreground">
                              Company Name
                            </label>
                            <Input
                              id="company"
                              name="company"
                              value={formState.company}
                              onChange={handleChange}
                              placeholder="Your Company Ltd."
                              className="rounded-[16px] rounded-tr-[0px] border-muted-foreground/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm text-muted-foreground">
                              Phone Number
                            </label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formState.phone}
                              onChange={handleChange}
                              placeholder="+27 XX XXX XXXX"
                              className="rounded-[16px] rounded-tr-[0px] border-muted-foreground/20"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="department" className="text-sm text-muted-foreground">
                            Department
                          </label>
                          <select
                            id="department"
                            name="department"
                            value={formState.department}
                            onChange={handleChange}
                            className="w-full rounded-[16px] rounded-tr-[0px] border-muted-foreground/20 bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="Sales">Sales Enquiry</option>
                            <option value="Support">Technical Support</option>
                            <option value="Billing">Billing & Accounts</option>
                            <option value="Careers">Careers</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm text-muted-foreground">
                            Your Message *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            placeholder="How can we help you?"
                            rows={5}
                            required
                            className="rounded-[16px] rounded-tr-[0px] border-muted-foreground/20"
                          />
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-blue hover:bg-blue/90 rounded-[16px] rounded-tr-[0px]"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                          {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 public-container">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extralight mb-4">
                Frequently Asked <span className="text-blue">Questions</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Quick answers to common questions about working with IThealth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-light mb-2">How quickly can you respond to IT issues?</h3>
                  <p className="text-muted-foreground text-sm">
                    Our standard response time is within 15 minutes during business hours, and within 1 hour after hours for critical issues. Most clients see resolution times 65% faster than with their previous IT providers.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-light mb-2">Do you require long-term contracts?</h3>
                  <p className="text-muted-foreground text-sm">
                    We offer both month-to-month options and annual agreements with preferred pricing. We're confident in our service quality, so we don't need to lock clients into long contracts.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-light mb-2">How do you handle after-hours support?</h3>
                  <p className="text-muted-foreground text-sm">
                    Our technical support team is available 24/7/365 for emergency issues. After-hours support is included in most of our plans, with clear protocols for what constitutes an emergency.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-light mb-2">What size businesses do you work with?</h3>
                  <p className="text-muted-foreground text-sm">
                    We specialize in serving South African professional service firms with 10-200 employees. Our solutions are particularly designed for knowledge workers who depend on reliable technology.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-light mb-2">How do you handle the transition from our current IT provider?</h3>
                  <p className="text-muted-foreground text-sm">
                    We have a structured 30-day onboarding process that ensures a smooth transition with minimal disruption. This includes documentation, knowledge transfer, and establishing new support protocols.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-[16px] rounded-tr-[0px]">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-light mb-2">What makes IThealth different from other IT providers?</h3>
                  <p className="text-muted-foreground text-sm">
                    Our structured 4-phase approach focuses on progressive improvement rather than just fixing problems. We also specialize in South African professional services firms and understand their unique challenges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <HeroSection
          fullWidth={true}
          background="navy"
          alignment="center"
          className="py-16 md:py-24"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extralight mb-4">
              Ready to discuss your IT needs?
            </h2>
            <p className="text-white/80 mb-8">
              Schedule a free consultation with one of our IT specialists to explore how we can help your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-navy hover:bg-white/90 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                Book a Consultation
              </Button>
              <Button 
                variant="ghost" 
                className="text-white border border-white/20 hover:bg-white/10 rounded-[16px] rounded-tr-[0px] transition-all"
                onClick={onGetStartedClick}
              >
                View Our Plans
              </Button>
            </div>
          </div>
        </HeroSection>
      </main>
    </div>
  );
}
