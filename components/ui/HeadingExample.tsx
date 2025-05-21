
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export function HeadingExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Typography and Spacing Examples</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h1>Heading Level 1 (H1)</h1>
          <h1>
            Heading with <strong>emphasis</strong>
          </h1>
          <p>
            The H1 uses Poppins ExtraLight (200) at 2.25rem (36px) with tight line height and letter spacing.
            All H1 headings maintain consistent styling across the application.
          </p>
        </div>

        <div>
          <h2>Heading Level 2 (H2)</h2>
          <h2>
            Heading with <strong>emphasis</strong>
          </h2>
          <p>
            The H2 uses Poppins Light (300) at 1.5rem (24px) with snug line height.
            Used for section headers throughout the application.
          </p>
        </div>

        <div>
          <h3>Heading Level 3 (H3)</h3>
          <h3>
            Heading with <strong>emphasis</strong>
          </h3>
          <p>
            The H3 uses Poppins Light (300) at 1.25rem (20px).
            Used for subsection headers and card titles.
          </p>
        </div>

        <div>
          <h4>Heading Level 4 (H4)</h4>
          <h4>
            Heading with <strong>emphasis</strong>
          </h4>
          <p>
            The H4 uses Poppins Light (300) at 1.125rem (18px).
            Used for minor headings and UI component headers.
          </p>
        </div>

        <div className="border-t pt-6">
          <h3>Standard Spacing Scale</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <div className="h-4 w-full bg-blue"></div>
              <p className="text-sm mt-2">space-1 (4px)</p>
            </div>
            <div>
              <div className="h-8 w-full bg-blue"></div>
              <p className="text-sm mt-2">space-2 (8px)</p>
            </div>
            <div>
              <div className="h-12 w-full bg-blue"></div>
              <p className="text-sm mt-2">space-3 (12px)</p>
            </div>
            <div>
              <div className="h-16 w-full bg-blue"></div>
              <p className="text-sm mt-2">space-4 (16px)</p>
            </div>
            <div>
              <div className="h-20 w-full bg-blue"></div>
              <p className="text-sm mt-2">space-5 (20px)</p>
            </div>
            <div>
              <div className="h-24 w-full bg-blue"></div>
              <p className="text-sm mt-2">space-6 (24px)</p>
            </div>
            <div>
              <div className="h-32 w-full bg-blue"></div>
              <p className="text-sm mt-2">space-8 (32px)</p>
            </div>
            <div>
              <div className="h-40 w-full bg-blue"></div>
              <p className="text-sm mt-2">space-10 (40px)</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3>Text Styles</h3>
          <div className="space-y-4 mt-4">
            <p className="text-extralight">
              This text uses the extralight weight (200)
            </p>
            <p className="text-light">
              This text uses the light weight (300) - default body text
            </p>
            <p className="text-medium">
              This text uses the medium weight (500)
            </p>
            <p className="text-semibold">
              This text uses the semibold weight (600)
            </p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3>Line Heights</h3>
          <div className="space-y-4 mt-4">
            <p className="leading-tight bg-muted/30 p-2">
              This paragraph uses tight line height (1.25) which is more compact and good for headings.
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="leading-normal bg-muted/30 p-2">
              This paragraph uses normal line height (1.5) which is the default for body text.
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="leading-relaxed bg-muted/30 p-2">
              This paragraph uses relaxed line height (1.625) which provides more space between lines.
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
