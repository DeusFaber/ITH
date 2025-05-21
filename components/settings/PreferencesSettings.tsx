
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner@2.0.3";

export function PreferencesSettings() {
  const handleThemeChange = (value: string) => {
    toast.info(`Theme set to ${value} (not implemented in demo)`);
  };
  
  const handleLanguageChange = (value: string) => {
    toast.info(`Language set to ${value} (not implemented in demo)`);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize your account experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Display Settings */}
        <div className="space-y-4">
          <h3 className="font-medium">Display Settings</h3>
          
          <div className="space-y-2">
            <Label>Theme</Label>
            <RadioGroup defaultValue="system" onValueChange={handleThemeChange}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Label htmlFor="theme-light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Label htmlFor="theme-dark">Dark</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="theme-system" />
                  <Label htmlFor="theme-system">System Default</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="en" onValueChange={handleLanguageChange}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Dashboard Settings */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">Dashboard Preferences</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-welcome">Show welcome message</Label>
              <p className="text-sm text-muted-foreground">
                Display personalized welcome message on dashboard
              </p>
            </div>
            <Switch id="show-welcome" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-tips">Show tips and suggestions</Label>
              <p className="text-sm text-muted-foreground">
                Display helpful tips based on your usage
              </p>
            </div>
            <Switch id="show-tips" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compact-view">Compact view</Label>
              <p className="text-sm text-muted-foreground">
                Use compact layout for dashboard widgets
              </p>
            </div>
            <Switch id="compact-view" />
          </div>
        </div>
        
        {/* Email Preferences */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">Email Preferences</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-newsletter">Newsletter</Label>
              <p className="text-sm text-muted-foreground">
                Receive monthly newsletter with tips and updates
              </p>
            </div>
            <Switch id="email-newsletter" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-product">Product updates</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new features and improvements
              </p>
            </div>
            <Switch id="email-product" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-marketing">Marketing emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about special offers and promotions
              </p>
            </div>
            <Switch id="email-marketing" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
