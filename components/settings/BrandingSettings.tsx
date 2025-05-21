
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Upload, RefreshCw, Image as ImageIcon, Check, Paintbrush } from "lucide-react";
import { ColorPicker } from "./ColorPicker";

export function BrandingSettings() {
  const [brandingSettings, setBrandingSettings] = useState({
    companyName: "Acme Inc.",
    customDomain: "acmeit.health-platform.com",
    logoUrl: "https://images.unsplash.com/photo-1659844081941-0db38c0ddeab?q=80&w=200&h=200&auto=format&fit=crop",
    accentColor: "#ff246b",
    secondaryColor: "#133258",
    customCSS: false,
    faviconUrl: "https://images.unsplash.com/photo-1659844081941-0db38c0ddeab?q=80&w=32&h=32&auto=format&fit=crop",
    customLoginImage: true,
    loginImageUrl: "https://images.unsplash.com/photo-1501484041906-dce79265c08a?q=80&w=800&auto=format&fit=crop",
    emailCustomization: true,
  });

  const handleInputChange = (key: keyof typeof brandingSettings, value: string | boolean) => {
    setBrandingSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    toast.success("Brand settings saved successfully");
  };

  const handleUpload = (type: 'logo' | 'favicon' | 'loginImage') => {
    toast.info(`File upload dialog would open here for ${type}`);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="colors">Colors & Themes</TabsTrigger>
          <TabsTrigger value="assets">Brand Assets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Basic information about your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName"
                    value={brandingSettings.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    This will be displayed throughout the platform
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customDomain">Custom Domain</Label>
                  <Input 
                    id="customDomain"
                    value={brandingSettings.customDomain}
                    onChange={(e) => handleInputChange("customDomain", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    The domain where your IT Health Platform can be accessed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Customization</CardTitle>
              <CardDescription>Customize how emails from the platform appear</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-light">Use Custom Branding in Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Apply your logo and colors to all outgoing emails
                  </p>
                </div>
                <Switch 
                  checked={brandingSettings.emailCustomization}
                  onCheckedChange={(checked) => handleInputChange("emailCustomization", checked)}
                />
              </div>
              
              {brandingSettings.emailCustomization && (
                <div className="mt-4 p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">Email Preview</p>
                  <div className="border rounded-md p-4 bg-card">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-md overflow-hidden mr-2">
                        <ImageWithFallback
                          src={brandingSettings.logoUrl}
                          alt="Company Logo"
                          width={32}
                          height={32}
                        />
                      </div>
                      <span className="font-light">{brandingSettings.companyName} IT Health</span>
                    </div>
                    <p className="text-sm">Hello Team Member,</p>
                    <p className="text-sm mt-2">Your IT Health Assessment is due in 3 days.</p>
                    <div className="mt-4">
                      <Button size="sm" style={{ backgroundColor: brandingSettings.accentColor }}>
                        Take Assessment
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="colors" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Colors</CardTitle>
              <CardDescription>Customize the colors used throughout the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="font-light">Primary Accent Color</Label>
                      <p className="text-sm text-muted-foreground">
                        Used for buttons, links, and highlights
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-md" style={{ backgroundColor: brandingSettings.accentColor }}></div>
                      <ColorPicker 
                        color={brandingSettings.accentColor} 
                        onChange={(color) => handleInputChange("accentColor", color)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="font-light">Secondary Color</Label>
                      <p className="text-sm text-muted-foreground">
                        Used for headers and secondary elements
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-md" style={{ backgroundColor: brandingSettings.secondaryColor }}></div>
                      <ColorPicker 
                        color={brandingSettings.secondaryColor} 
                        onChange={(color) => handleInputChange("secondaryColor", color)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Label className="mb-2 block font-light">Preview</Label>
                  <div className="border rounded-md overflow-hidden">
                    <div className="w-full h-12 flex items-center px-4" style={{ backgroundColor: brandingSettings.secondaryColor, color: "white" }}>
                      <div className="w-8 h-8 rounded-md overflow-hidden mr-2">
                        <ImageWithFallback
                          src={brandingSettings.logoUrl}
                          alt="Company Logo"
                          width={32}
                          height={32}
                        />
                      </div>
                      <span>{brandingSettings.companyName} IT Health</span>
                    </div>
                    <div className="p-4">
                      <p className="mb-3">Sample content with <a href="#" style={{ color: brandingSettings.accentColor }}>links</a> and buttons.</p>
                      <Button size="sm" style={{ backgroundColor: brandingSettings.accentColor }}>
                        Primary Button
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Advanced Styling</CardTitle>
              <CardDescription>Additional styling options for your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-light">Use Custom CSS</Label>
                  <p className="text-sm text-muted-foreground">
                    Apply custom CSS to your IT Health Platform
                  </p>
                </div>
                <Switch 
                  checked={brandingSettings.customCSS}
                  onCheckedChange={(checked) => handleInputChange("customCSS", checked)}
                />
              </div>
              
              {brandingSettings.customCSS && (
                <div className="mt-4 border rounded-md p-4">
                  <Label htmlFor="customCSS" className="font-light">Custom CSS</Label>
                  <textarea
                    id="customCSS"
                    rows={5}
                    className="w-full mt-2 p-2 border rounded-md font-mono text-xs"
                    placeholder=".custom-class { color: #ff246b; }"
                  ></textarea>
                  <p className="text-sm text-muted-foreground mt-2">
                    Note: Custom CSS requires approval from IT Health support.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assets" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo</CardTitle>
              <CardDescription>Your company logo used throughout the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center space-x-4">
                  <div className="border rounded-md p-4 flex items-center justify-center bg-card" style={{ width: "120px", height: "120px" }}>
                    <ImageWithFallback
                      src={brandingSettings.logoUrl}
                      alt="Company Logo"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Button onClick={() => handleUpload('logo')} className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload New Logo
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Recommended size: 200x200px, PNG or SVG with transparent background
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Favicon</CardTitle>
              <CardDescription>The icon shown in browser tabs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center space-x-4">
                  <div className="border rounded-md p-4 flex items-center justify-center bg-card" style={{ width: "80px", height: "80px" }}>
                    <ImageWithFallback
                      src={brandingSettings.faviconUrl}
                      alt="Favicon"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="space-y-2">
                    <Button onClick={() => handleUpload('favicon')} className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Favicon
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Recommended size: 32x32px, PNG or ICO format
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Login Screen Image</CardTitle>
              <CardDescription>The image displayed on the login page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-light">Use Custom Login Image</Label>
                    <p className="text-sm text-muted-foreground">
                      Replace the default login page image
                    </p>
                  </div>
                  <Switch 
                    checked={brandingSettings.customLoginImage}
                    onCheckedChange={(checked) => handleInputChange("customLoginImage", checked)}
                  />
                </div>
                
                {brandingSettings.customLoginImage && (
                  <div className="mt-4">
                    <div className="border rounded-md p-1 bg-card mb-4">
                      <ImageWithFallback
                        src={brandingSettings.loginImageUrl}
                        alt="Login Image"
                        width={800}
                        height={400}
                        className="rounded-md w-full h-auto"
                      />
                    </div>
                    <Button onClick={() => handleUpload('loginImage')} className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload New Image
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Recommended size: 1200x800px, JPG or PNG format
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          Save Brand Settings
        </Button>
      </div>
    </div>
  );
}
