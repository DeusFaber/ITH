
import React from "react";
import { HeadingExample } from "../components/ui/HeadingExample";
import { SpacingExample } from "../components/ui/SpacingExample";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function DesignSystem() {
  return (
    <div className="page-container">
      <div className="mb-8">
        <h1>IThealth Design System</h1>
        <p className="text-lg text-muted-foreground">
          Unified typography and spacing for consistent user experience across the platform
        </p>
      </div>

      <Tabs defaultValue="typography" className="mb-8">
        <TabsList>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>
        
        <TabsContent value="typography">
          <div className="mb-6">
            <h2>Typography System</h2>
            <p>
              The IThealth platform uses Poppins for all text elements. Font weights have been standardized across the application
              to provide consistent visual hierarchy with ExtraLight (200) for H1 headings, Light (300) for body text, and Medium (500) for emphasis.
            </p>
          </div>
          <HeadingExample />
        </TabsContent>
        
        <TabsContent value="spacing">
          <div className="mb-6">
            <h2>Spacing System</h2>
            <p>
              A consistent spacing scale is used throughout the application to ensure visual harmony and predictable
              layouts. Spacing variables (--space-1 through --space-32) are used for margins, paddings, and gaps.
            </p>
          </div>
          <SpacingExample />
        </TabsContent>
        
        <TabsContent value="colors">
          <div className="mb-6">
            <h2>Color System</h2>
            <p>
              The IThealth brand colors have been standardized across the application.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>Primary colors used throughout the application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="h-24 bg-blue rounded-md"></div>
                  <p><strong>Base Blue</strong></p>
                  <p className="text-sm text-muted-foreground">#1175E4</p>
                </div>
                <div className="space-y-2">
                  <div className="h-24 bg-navy rounded-md"></div>
                  <p><strong>Navy Blue</strong></p>
                  <p className="text-sm text-muted-foreground">#133258</p>
                </div>
                <div className="space-y-2">
                  <div className="h-24 bg-primary rounded-md"></div>
                  <p><strong>Pink</strong></p>
                  <p className="text-sm text-muted-foreground">#FF246B</p>
                </div>
                <div className="space-y-2">
                  <div className="h-24 bg-gold rounded-md"></div>
                  <p><strong>Gold</strong></p>
                  <p className="text-sm text-muted-foreground">#EDB600</p>
                </div>
                <div className="space-y-2">
                  <div className="h-24 bg-muted rounded-md"></div>
                  <p><strong>Muted</strong></p>
                  <p className="text-sm text-muted-foreground">#F6F8FB</p>
                </div>
                <div className="space-y-2">
                  <div className="h-24 bg-background border rounded-md"></div>
                  <p><strong>Background</strong></p>
                  <p className="text-sm text-muted-foreground">#FFFFFF</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="components">
          <div className="mb-6">
            <h2>Component Examples</h2>
            <p>
              Components use consistent spacing and typography throughout the application.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Example</CardTitle>
                <CardDescription>Standard card component with consistent spacing</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card demonstrates the standard spacing and typography used in card components throughout the application.</p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="h-10 w-10 rounded-full bg-blue flex items-center justify-center text-white">JD</div>
                  <div>
                    <p className="text-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">IT Manager</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Form Example</CardTitle>
                <CardDescription>Standard form component with consistent spacing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1">Name</label>
                    <input type="text" className="w-full p-2 border rounded-md" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block mb-1">Email</label>
                    <input type="email" className="w-full p-2 border rounded-md" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block mb-1">Message</label>
                    <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="Type your message here..."></textarea>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Submit</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Button Variations</CardTitle>
              <CardDescription>Standard button components with consistent styling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive Button</Button>
                <Button disabled>Disabled Button</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2">Using Typography Variables</h3>
              <p>
                Use CSS variables for font sizes, weights, and line heights to ensure consistency:
              </p>
              <pre className="bg-muted p-4 rounded-md overflow-auto">
                {`/* Font size */
font-size: var(--text-base);

/* Font weight */
font-weight: var(--font-weight-light);

/* Line height */
line-height: var(--leading-normal);`}
              </pre>
            </div>

            <div>
              <h3 className="mb-2">Using Spacing Variables</h3>
              <p>
                Use CSS variables for margins, paddings, and gaps:
              </p>
              <pre className="bg-muted p-4 rounded-md overflow-auto">
                {`/* Margins */
margin-bottom: var(--space-4);

/* Paddings */
padding: var(--space-4);

/* Gaps */
gap: var(--space-2);`}
              </pre>
            </div>

            <div>
              <h3 className="mb-2">Responsive Considerations</h3>
              <p>
                The base font size adjusts for mobile screens, and spacing should be adjusted accordingly.
                Use the provided utility classes for consistent responsive behavior.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
