
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { toast } from "sonner@2.0.3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { 
  Copy, 
  RefreshCw, 
  Key, 
  Lock, 
  Link2, 
  ExternalLink, 
  Users, 
  Database, 
  FileText,
  CreditCard,
  BookOpen,
  ShieldCheck
} from "lucide-react";
import { Badge } from "../ui/badge";

export function ApiSettings() {
  const [apiKeys, setApiKeys] = useState([
    { 
      id: "key_1", 
      name: "Production API Key", 
      key: "sk_prod_••••••••••••••••••••", 
      created: "2025-04-21", 
      lastUsed: "2025-05-18",
      active: true
    },
    { 
      id: "key_2", 
      name: "Development API Key", 
      key: "sk_dev_•••••••••••••••••••••", 
      created: "2025-03-15", 
      lastUsed: "2025-05-17",
      active: true
    }
  ]);

  const [webhooks, setWebhooks] = useState([
    {
      id: "wh_1",
      url: "https://acme.com/webhooks/it-health",
      events: ["assessment.completed", "user.created"],
      active: true
    }
  ]);

  const [integrations, setIntegrations] = useState({
    lms: true,
    crm: false,
    sso: true,
    serviceDesk: false,
    hrms: false,
    mdm: false
  });

  const handleGenerateKey = () => {
    toast.success("New API key generated successfully");
    // In a real app, this would make an API call to generate a new key
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, active: false } : key
    ));
    toast.success("API key revoked successfully");
  };

  const handleCopyKey = () => {
    toast.success("API key copied to clipboard");
    // In a real app, this would copy the key to the clipboard
  };

  const handleSaveWebhook = () => {
    toast.success("Webhook saved successfully");
  };

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
    toast.success("Webhook deleted successfully");
  };

  const toggleIntegration = (key: keyof typeof integrations) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    const action = integrations[key] ? "disabled" : "enabled";
    toast.success(`${key.toUpperCase()} integration ${action} successfully`);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="keys" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="keys" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for accessing the IT Health Platform API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-light">Your API Keys</h3>
                  <p className="text-sm text-muted-foreground">
                    These keys allow access to the IT Health API
                  </p>
                </div>
                <Button onClick={handleGenerateKey} className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Generate New Key
                </Button>
              </div>
              
              <div className="space-y-4 mt-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-light">{apiKey.name}</h4>
                          {!apiKey.active && (
                            <Badge variant="outline" className="bg-muted text-muted-foreground">
                              Revoked
                            </Badge>
                          )}
                          {apiKey.active && apiKey.id === "key_1" && (
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              Production
                            </Badge>
                          )}
                          {apiKey.active && apiKey.id === "key_2" && (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              Development
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center mt-2">
                          <code className="bg-muted px-2 py-1 rounded text-sm mr-2">
                            {apiKey.key}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleCopyKey}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                        </div>
                      </div>
                      
                      {apiKey.active && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleRevokeKey(apiKey.id)}
                          className="text-destructive border-destructive hover:bg-destructive/10"
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 inline-block mr-1" />
                API keys provide full access to your IT Health data. Keep them secure!
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Resources for using the IT Health API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h4 className="font-light">API Reference</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete documentation of all API endpoints
                    </p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto mt-1 flex items-center gap-1 text-primary"
                    >
                      View Documentation
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-4">
                  <Database className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h4 className="font-light">Sample Code</h4>
                    <p className="text-sm text-muted-foreground">
                      Example code snippets in various languages
                    </p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto mt-1 flex items-center gap-1 text-primary"
                    >
                      Browse Examples
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="webhooks" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Set up URLs to receive events from the IT Health Platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-light mb-2">Active Webhook Endpoints</h3>
                
                {webhooks.length === 0 ? (
                  <div className="text-center p-6 border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">No webhooks configured</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {webhooks.map((webhook) => (
                      <div key={webhook.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Link2 className="h-4 w-4 text-primary" />
                              <code className="text-sm">{webhook.url}</code>
                              {webhook.active && (
                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <div className="mt-2">
                              <div className="text-sm text-muted-foreground mb-1">Events:</div>
                              <div className="flex flex-wrap gap-2">
                                {webhook.events.map((event) => (
                                  <Badge key={event} variant="outline">
                                    {event}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => console.log("Edit webhook")}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteWebhook(webhook.id)}
                              className="text-destructive border-destructive hover:bg-destructive/10"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="font-light mb-2">Add New Webhook</h3>
                <div className="space-y-4 border rounded-md p-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Endpoint URL</Label>
                    <Input 
                      id="webhook-url"
                      placeholder="https://example.com/webhook"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Events to Send</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="event-assessment" className="rounded" />
                        <label htmlFor="event-assessment" className="text-sm">Assessment Events</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="event-user" className="rounded" />
                        <label htmlFor="event-user" className="text-sm">User Events</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="event-reward" className="rounded" />
                        <label htmlFor="event-reward" className="text-sm">Reward Events</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="event-billing" className="rounded" />
                        <label htmlFor="event-billing" className="text-sm">Billing Events</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="webhook-active" defaultChecked />
                      <Label htmlFor="webhook-active" className="font-light">
                        Webhook Active
                      </Label>
                    </div>
                    <Button onClick={handleSaveWebhook}>
                      Save Webhook
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>Connect IT Health with your other systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 text-blue-800 rounded-md">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-light">Learning Management System</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect to your LMS for skills tracking and course enrollment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={integrations.lms ? "outline" : "secondary"} className={integrations.lms ? "bg-green-100 text-green-800" : ""}>
                      {integrations.lms ? "Connected" : "Disconnected"}
                    </Badge>
                    <Switch 
                      checked={integrations.lms} 
                      onCheckedChange={() => toggleIntegration("lms")}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 text-purple-800 rounded-md">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-light">CRM Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect to your CRM for customer data synchronization
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={integrations.crm ? "outline" : "secondary"} className={integrations.crm ? "bg-green-100 text-green-800" : ""}>
                      {integrations.crm ? "Connected" : "Disconnected"}
                    </Badge>
                    <Switch 
                      checked={integrations.crm} 
                      onCheckedChange={() => toggleIntegration("crm")}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 text-green-800 rounded-md">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-light">Single Sign-On (SSO)</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable SSO with your identity provider
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={integrations.sso ? "outline" : "secondary"} className={integrations.sso ? "bg-green-100 text-green-800" : ""}>
                      {integrations.sso ? "Connected" : "Disconnected"}
                    </Badge>
                    <Switch 
                      checked={integrations.sso} 
                      onCheckedChange={() => toggleIntegration("sso")}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-orange-100 text-orange-800 rounded-md">
                      <Database className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-light">Service Desk Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect to your service desk for ticket management
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={integrations.serviceDesk ? "outline" : "secondary"} className={integrations.serviceDesk ? "bg-green-100 text-green-800" : ""}>
                      {integrations.serviceDesk ? "Connected" : "Disconnected"}
                    </Badge>
                    <Switch 
                      checked={integrations.serviceDesk} 
                      onCheckedChange={() => toggleIntegration("serviceDesk")}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-100 text-red-800 rounded-md">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-light">HRMS Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect to your HR system for employee data
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={integrations.hrms ? "outline" : "secondary"} className={integrations.hrms ? "bg-green-100 text-green-800" : ""}>
                      {integrations.hrms ? "Connected" : "Disconnected"}
                    </Badge>
                    <Switch 
                      checked={integrations.hrms} 
                      onCheckedChange={() => toggleIntegration("hrms")}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-cyan-100 text-cyan-800 rounded-md">
                      <Database className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-light">MDM Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect to your Mobile Device Management system
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={integrations.mdm ? "outline" : "secondary"} className={integrations.mdm ? "bg-green-100 text-green-800" : ""}>
                      {integrations.mdm ? "Connected" : "Disconnected"}
                    </Badge>
                    <Switch 
                      checked={integrations.mdm} 
                      onCheckedChange={() => toggleIntegration("mdm")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Export & Import</CardTitle>
              <CardDescription>Transfer data between systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-md">
                  <div>
                    <h4 className="font-light">Export Assessment Data</h4>
                    <p className="text-sm text-muted-foreground">
                      Export your IT Health assessment data in CSV or JSON format
                    </p>
                  </div>
                  <Button className="mt-2 sm:mt-0">
                    Export Data
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-md">
                  <div>
                    <h4 className="font-light">Import User Data</h4>
                    <p className="text-sm text-muted-foreground">
                      Bulk import users from a CSV file
                    </p>
                  </div>
                  <Button className="mt-2 sm:mt-0">
                    Upload CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
