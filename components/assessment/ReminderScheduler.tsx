
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { toast } from "sonner@2.0.3";
import { AlertCircle, Calendar, Clock, Mail, Plus, Trash2, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { AssessmentReminder, EmailTemplate } from "../../lib/assessmentTypes";
import { Badge } from "../ui/badge";
import { formatDate } from "../../lib/utils";

// Mock email templates
const emailTemplates: EmailTemplate[] = [
  {
    id: "template-1",
    name: "Standard Assessment Reminder",
    subject: "Time for your IT Health Assessment",
    body: "Hello {{name}},\n\nIt's time to complete your regular IT Health Assessment to track your progress.\n\nYour last assessment was completed on {{lastAssessmentDate}} with a score of {{lastScore}}.\n\nClick the button below to start your assessment now.\n\nRegards,\nIT Health Team",
    variables: ["name", "lastAssessmentDate", "lastScore"],
    createdBy: "system",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "template-2",
    name: "Quarterly Business Review",
    subject: "Quarterly IT Health Review Due",
    body: "Hello {{name}},\n\nIt's time for your quarterly IT health review.\n\nRegular assessments help keep your IT infrastructure healthy and identify areas for improvement.\n\nYour team's last assessment score was {{lastScore}}.\n\nClick below to schedule your assessment.\n\nRegards,\nIT Health Team",
    variables: ["name", "lastScore"],
    createdBy: "system",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "template-3",
    name: "Team Assessment Reminder",
    subject: "Team IT Health Assessment Due",
    body: "Hello {{name}},\n\nYour team {{teamName}} is due for an IT health assessment.\n\nCollaborative assessments help ensure accurate results and shared understanding of your IT environment.\n\nLast assessment: {{lastAssessmentDate}}\nTeam score: {{lastScore}}\n\nClick below to start your team assessment.\n\nRegards,\nIT Health Team",
    variables: ["name", "teamName", "lastAssessmentDate", "lastScore"],
    createdBy: "system",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  }
];

interface ReminderSchedulerProps {
  userId: string;
  userEmail: string;
  userName: string;
  existingReminders?: AssessmentReminder[];
  onSaveReminder: (reminder: AssessmentReminder) => void;
  onDeleteReminder: (reminderId: string) => void;
}

export function ReminderScheduler({
  userId,
  userEmail,
  userName,
  existingReminders = [],
  onSaveReminder,
  onDeleteReminder
}: ReminderSchedulerProps) {
  const [reminders, setReminders] = useState<AssessmentReminder[]>(existingReminders);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [showPreviewEmail, setShowPreviewEmail] = useState(false);
  const [currentReminder, setCurrentReminder] = useState<AssessmentReminder | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const [newRecipientEmail, setNewRecipientEmail] = useState("");
  const [newReminderData, setNewReminderData] = useState<Partial<AssessmentReminder>>({
    frequency: "monthly",
    emailTemplateId: "template-1",
    enabled: true,
    recipients: [userEmail]
  });

  // Calculate next assessment date based on frequency
  const calculateNextDate = (frequency: string, customDays?: number): string => {
    const now = new Date();
    let nextDate = new Date(now);

    switch (frequency) {
      case "weekly":
        nextDate.setDate(now.getDate() + 7);
        break;
      case "monthly":
        nextDate.setMonth(now.getMonth() + 1);
        break;
      case "quarterly":
        nextDate.setMonth(now.getMonth() + 3);
        break;
      case "biannually":
        nextDate.setMonth(now.getMonth() + 6);
        break;
      case "annually":
        nextDate.setFullYear(now.getFullYear() + 1);
        break;
      case "custom":
        if (customDays) {
          nextDate.setDate(now.getDate() + customDays);
        } else {
          nextDate.setMonth(now.getMonth() + 1); // Default to monthly
        }
        break;
      default:
        nextDate.setMonth(now.getMonth() + 1); // Default to monthly
    }

    return nextDate.toISOString();
  };

  const handleAddReminder = () => {
    if (!newReminderData.frequency) {
      toast.error("Please select a frequency");
      return;
    }

    if (!newReminderData.emailTemplateId) {
      toast.error("Please select an email template");
      return;
    }

    if (!newReminderData.recipients || newReminderData.recipients.length === 0) {
      toast.error("Please add at least one recipient");
      return;
    }

    const newReminder: AssessmentReminder = {
      id: `reminder-${Date.now()}`,
      userId,
      frequency: newReminderData.frequency as any,
      customDays: newReminderData.customDays,
      nextDate: calculateNextDate(newReminderData.frequency, newReminderData.customDays),
      emailTemplateId: newReminderData.emailTemplateId,
      enabled: newReminderData.enabled ?? true,
      createdAt: new Date().toISOString(),
      recipients: newReminderData.recipients ?? [userEmail]
    };

    setReminders([...reminders, newReminder]);
    onSaveReminder(newReminder);
    setNewReminderData({
      frequency: "monthly",
      emailTemplateId: "template-1",
      enabled: true,
      recipients: [userEmail]
    });
    setShowAddReminder(false);
    toast.success("Reminder scheduled successfully");
  };

  const handleDeleteReminder = (reminderId: string) => {
    const updatedReminders = reminders.filter(r => r.id !== reminderId);
    setReminders(updatedReminders);
    onDeleteReminder(reminderId);
    toast.success("Reminder deleted");
  };

  const handleToggleReminder = (reminderId: string, enabled: boolean) => {
    const updatedReminders = reminders.map(r => {
      if (r.id === reminderId) {
        const updated = { ...r, enabled };
        onSaveReminder(updated);
        return updated;
      }
      return r;
    });
    setReminders(updatedReminders);
    toast.success(`Reminder ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleAddRecipient = () => {
    if (!newRecipientEmail || !/^\S+@\S+\.\S+$/.test(newRecipientEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (newReminderData.recipients?.includes(newRecipientEmail)) {
      toast.error("This email is already added");
      return;
    }

    setNewReminderData({
      ...newReminderData,
      recipients: [...(newReminderData.recipients || []), newRecipientEmail]
    });
    setNewRecipientEmail("");
  };

  const handleRemoveRecipient = (email: string) => {
    setNewReminderData({
      ...newReminderData,
      recipients: newReminderData.recipients?.filter(r => r !== email)
    });
  };

  const previewEmail = (reminder: AssessmentReminder) => {
    const template = emailTemplates.find(t => t.id === reminder.emailTemplateId);
    if (!template) {
      toast.error("Email template not found");
      return;
    }

    setPreviewTemplate(template);
    setCurrentReminder(reminder);
    setShowPreviewEmail(true);
  };

  const getFrequencyLabel = (frequency: string, customDays?: number): string => {
    switch (frequency) {
      case "weekly": return "Weekly";
      case "monthly": return "Monthly";
      case "quarterly": return "Quarterly";
      case "biannually": return "Every 6 months";
      case "annually": return "Yearly";
      case "custom": return customDays ? `Every ${customDays} days` : "Custom";
      default: return "Unknown";
    }
  };

  const renderEmailPreview = () => {
    if (!previewTemplate || !currentReminder) return null;

    // Replace variables with mock values for preview
    let subject = previewTemplate.subject;
    let body = previewTemplate.body;

    // Replace variables with sample data
    subject = subject.replace("{{name}}", userName);
    body = body.replace("{{name}}", userName);
    body = body.replace("{{lastAssessmentDate}}", formatDate(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)));
    body = body.replace("{{lastScore}}", "76");
    body = body.replace("{{teamName}}", "IT Department");

    return (
      <div className="space-y-4">
        <div className="border rounded-md p-4 bg-muted/30">
          <div className="mb-4 pb-2 border-b">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-navy/10 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-navy" />
                </div>
                <span className="font-medium">IT Health</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDate(new Date(), true)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">To:</span>
              <span>{currentReminder.recipients.join(", ")}</span>
            </div>
            <h3 className="text-lg font-medium mt-2">{subject}</h3>
          </div>

          <div className="whitespace-pre-wrap text-sm">
            {body}
          </div>

          <div className="mt-6 flex justify-center">
            <Button className="bg-gold hover:bg-gold/90">Take Assessment Now</Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          This is a preview of the email that will be sent according to your reminder schedule.
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-navy">Assessment <strong>Reminders</strong></h2>
          <p className="text-muted-foreground">
            Schedule regular assessment reminders to keep track of your IT health
          </p>
        </div>

        <Button 
          onClick={() => setShowAddReminder(true)} 
          className="gap-2 bg-gold hover:bg-gold/90"
        >
          <Plus className="h-4 w-4" />
          New Reminder
        </Button>
      </div>

      {reminders.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
            <div className="rounded-full bg-muted p-6">
              <Calendar className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No reminders scheduled</h3>
            <p className="text-muted-foreground max-w-md">
              Set up regular assessment reminders to help your team stay on top of IT health monitoring
            </p>
            <Button 
              onClick={() => setShowAddReminder(true)} 
              className="gap-2 mt-2 bg-gold hover:bg-gold/90"
            >
              <Plus className="h-4 w-4" />
              Schedule Reminder
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reminders.map(reminder => (
            <Card key={reminder.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      {getFrequencyLabel(reminder.frequency, reminder.customDays)} Reminder
                    </CardTitle>
                    <CardDescription>
                      Next reminder: {formatDate(new Date(reminder.nextDate))}
                    </CardDescription>
                  </div>
                  <Switch 
                    checked={reminder.enabled} 
                    onCheckedChange={(checked) => handleToggleReminder(reminder.id, checked)}
                  />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      <span>Template:</span>
                    </div>
                    <div className="text-sm">
                      {emailTemplates.find(t => t.id === reminder.emailTemplateId)?.name || "Unknown template"}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      <span>Recipients:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {reminder.recipients.map(email => (
                        <Badge key={email} variant="outline" className="text-xs">
                          {email}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteReminder(reminder.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => previewEmail(reminder)}
                >
                  Preview Email
                </Button>
              </CardFooter>
              
              {!reminder.enabled && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center rounded-md">
                  <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-medium">Reminder Disabled</span>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Add Reminder Dialog */}
      <Dialog open={showAddReminder} onOpenChange={setShowAddReminder}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Assessment Reminder</DialogTitle>
            <DialogDescription>
              Create a reminder to keep your IT health assessments on track
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Reminder Frequency</Label>
              <Select 
                value={newReminderData.frequency} 
                onValueChange={(value) => 
                  setNewReminderData({...newReminderData, frequency: value})
                }
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="biannually">Every 6 months</SelectItem>
                  <SelectItem value="annually">Yearly</SelectItem>
                  <SelectItem value="custom">Custom interval</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {newReminderData.frequency === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="custom-days">Days between reminders</Label>
                <Input
                  id="custom-days"
                  type="number"
                  min={1}
                  max={365}
                  value={newReminderData.customDays ?? 30}
                  onChange={(e) => 
                    setNewReminderData({
                      ...newReminderData, 
                      customDays: parseInt(e.target.value)
                    })
                  }
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="template">Email Template</Label>
              <Select 
                value={newReminderData.emailTemplateId} 
                onValueChange={(value) => 
                  setNewReminderData({...newReminderData, emailTemplateId: value})
                }
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select email template" />
                </SelectTrigger>
                <SelectContent>
                  {emailTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  id="new-recipient"
                  placeholder="Email address"
                  value={newRecipientEmail}
                  onChange={(e) => setNewRecipientEmail(e.target.value)}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddRecipient}
                  className="shrink-0"
                >
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-1 min-h-10 p-2 border rounded-md">
                {newReminderData.recipients?.map(email => (
                  <Badge 
                    key={email} 
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {email}
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground rounded-full"
                      onClick={() => handleRemoveRecipient(email)}
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </Badge>
                ))}
                {(!newReminderData.recipients || newReminderData.recipients.length === 0) && (
                  <span className="text-sm text-muted-foreground">
                    No recipients added
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="enabled"
                checked={newReminderData.enabled ?? true}
                onCheckedChange={(checked) => 
                  setNewReminderData({...newReminderData, enabled: checked})
                }
              />
              <Label htmlFor="enabled">Enable reminder</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddReminder(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReminder} className="bg-gold hover:bg-gold/90">
              Schedule Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Preview Dialog */}
      <Dialog open={showPreviewEmail} onOpenChange={setShowPreviewEmail}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
            <DialogDescription>
              This is how your reminder email will look
            </DialogDescription>
          </DialogHeader>
          
          {renderEmailPreview()}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreviewEmail(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
