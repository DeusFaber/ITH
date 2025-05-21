
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export function SpacingExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spacing System</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="mb-4">Margin Examples</h3>
            <div className="bg-muted p-4 rounded-md">
              <div className="bg-blue text-white p-2 mb-1">margin-bottom: var(--space-1)</div>
              <div className="bg-blue text-white p-2 mb-2">margin-bottom: var(--space-2)</div>
              <div className="bg-blue text-white p-2 mb-3">margin-bottom: var(--space-3)</div>
              <div className="bg-blue text-white p-2 mb-4">margin-bottom: var(--space-4)</div>
              <div className="bg-blue text-white p-2 mb-6">margin-bottom: var(--space-6)</div>
              <div className="bg-blue text-white p-2">Last item (no margin)</div>
            </div>
          </div>

          <div>
            <h3 className="mb-4">Padding Examples</h3>
            <div className="bg-muted rounded-md">
              <div className="bg-blue/10 p-1 border border-blue mb-2">padding: var(--space-1)</div>
              <div className="bg-blue/10 p-2 border border-blue mb-2">padding: var(--space-2)</div>
              <div className="bg-blue/10 p-3 border border-blue mb-2">padding: var(--space-3)</div>
              <div className="bg-blue/10 p-4 border border-blue mb-2">padding: var(--space-4)</div>
              <div className="bg-blue/10 p-6 border border-blue">padding: var(--space-6)</div>
            </div>
          </div>

          <div>
            <h3 className="mb-4">Gap Examples</h3>
            <div className="bg-muted p-4 rounded-md">
              <div className="flex gap-1 mb-4">
                <div className="bg-blue text-white p-2">Item</div>
                <div className="bg-blue text-white p-2">Item</div>
                <div className="bg-blue text-white p-2">gap: var(--space-1)</div>
              </div>
              <div className="flex gap-2 mb-4">
                <div className="bg-blue text-white p-2">Item</div>
                <div className="bg-blue text-white p-2">Item</div>
                <div className="bg-blue text-white p-2">gap: var(--space-2)</div>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="bg-blue text-white p-2">Item</div>
                <div className="bg-blue text-white p-2">Item</div>
                <div className="bg-blue text-white p-2">gap: var(--space-4)</div>
              </div>
              <div className="flex gap-6">
                <div className="bg-blue text-white p-2">Item</div>
                <div className="bg-blue text-white p-2">Item</div>
                <div className="bg-blue text-white p-2">gap: var(--space-6)</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4">Common Layout Patterns</h3>
            <div className="bg-muted p-4 rounded-md">
              <div className="mb-6">
                <h4 className="mb-2">Card Layout</h4>
                <div className="bg-background p-4 rounded-md border">
                  <div className="mb-4">
                    <h5 className="text-medium mb-2">Card Title</h5>
                    <p className="text-sm text-muted-foreground">Card description goes here, using standard spacing.</p>
                  </div>
                  <div className="bg-blue/10 p-4 rounded-md mb-4">Content area with var(--space-4) padding</div>
                  <div className="flex justify-end">
                    <button className="bg-blue text-white px-4 py-2 rounded-md">Action</button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2">Form Layout</h4>
                <div className="bg-background p-4 rounded-md border">
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1">Input Label</label>
                      <input type="text" className="w-full p-2 border rounded-md" placeholder="Standard input with consistent spacing" />
                    </div>
                    <div>
                      <label className="block mb-1">Another Field</label>
                      <input type="text" className="w-full p-2 border rounded-md" placeholder="Fields use var(--space-4) gap" />
                    </div>
                    <div className="flex justify-end pt-2">
                      <button className="bg-blue text-white px-4 py-2 rounded-md">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
