@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

@custom-variant dark (&:is(.dark *));

:root {
  --font-family: "Poppins", sans-serif;
  --font-size: 14px;
  --background: #ffffff;
  --foreground: #1a1a2e;
  --card: #ffffff;
  --card-foreground: #1a1a2e;
  --popover: #ffffff;
  --popover-foreground: #1a1a2e;
  --primary: #ff246b;
  --primary-foreground: #ffffff;
  --secondary: #fff0f5;
  --secondary-foreground: #ff246b;
  --muted: #f6f8fb;
  --muted-foreground: #6c7281;
  --accent: #ffe6ef;
  --accent-foreground: #cc1d56;
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;
  --border: rgba(0, 0, 0, 0.08);
  --input: transparent;
  --input-background: #f8f9fb;
  --switch-background: #cbced4;
  --font-weight-light: 300;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --font-weight-bold: 700;
  --ring: #ff246b40;
  --chart-1: #ff246b;
  --chart-2: #ff5688;
  --chart-3: #ff80a4;
  --chart-4: #cc1d56;
  --chart-5: #ff99b8;
  --radius: 0.5rem;
  --sidebar: #1561be; /* Changed to IT Health base blue */
  --sidebar-foreground: #ffffff;
  --sidebar-primary: #ffffff;
  --sidebar-primary-foreground: #1561be; /* Changed to match sidebar */
  --sidebar-accent: rgba(255, 255, 255, 0.15);
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: rgba(255, 255, 255, 0.1);
  --sidebar-ring: #1561be40; /* Changed to match sidebar with opacity */
  --header: #133258; /* Left header as deep navy blue */
  --header-foreground: #ffffff;
  --fill-0: #ff246b; /* Logo color */

  /* Text size variables */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
}

.dark {
  --font-family: "Poppins", sans-serif;
  --background: #121828;
  --foreground: #f8f9fb;
  --card: #1a2236;
  --card-foreground: #f8f9fb;
  --popover: #1a2236;
  --popover-foreground: #f8f9fb;
  --primary: #ff246b;
  --primary-foreground: #ffffff;
  --secondary: #4c0d24;
  --secondary-foreground: #f8f9fb;
  --muted: #1f2a43;
  --muted-foreground: #8792a8;
  --accent: #4c0d24;
  --accent-foreground: #f8f9fb;
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;
  --border: rgba(255, 255, 255, 0.1);
  --input: #1f2a43;
  --input-background: #1f2a43;
  --switch-background: #2a3655;
  --ring: #ff246b40;
  --chart-1: #ff246b;
  --chart-2: #ff5688;
  --chart-3: #ff80a4;
  --chart-4: #ff99b8;
  --chart-5: #ffccd9;
  --sidebar: #1561be; /* Changed to IT Health base blue */
  --sidebar-foreground: #ffffff;
  --sidebar-primary: #ffffff;
  --sidebar-primary-foreground: #1561be; /* Changed to match sidebar */
  --sidebar-accent: rgba(255, 255, 255, 0.15);
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: rgba(255, 255, 255, 0.1);
  --sidebar-ring: #1561be40; /* Changed to match sidebar with opacity */
  --header: #133258; /* Left header as deep navy blue */
  --header-foreground: #ffffff;
  --fill-0: #e5e5e5; /* Logo color for dark mode */

  /* Same text size variables for dark mode */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-header: var(--header);
  --color-header-foreground: var(--header-foreground);
  --radius-sm: calc(var(--radius) - 2px);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) + 2px);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(
    --sidebar-primary-foreground
  );
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(
    --sidebar-accent-foreground
  );
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-family);
  }
}

@layer base {
  h1 {
    font-size: var(--text-4xl);
    font-weight: var(--font-weight-light);
    line-height: 1.3;
    font-family: var(--font-family);
    letter-spacing: -0.025em;
  }

  h1 strong,
  h1 b {
    font-weight: var(--font-weight-light);
  }

  h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-weight-light);
    line-height: 1.4;
    font-family: var(--font-family);
    letter-spacing: -0.025em;
  }

  h2 strong,
  h2 b {
    font-weight: var(--font-weight-bold);
  }

  h3 {
    font-size: var(--text-xl);
    font-weight: var(--font-weight-light);
    line-height: 1.4;
    font-family: var(--font-family);
    letter-spacing: -0.015em;
  }

  h3 strong,
  h3 b {
    font-weight: var(--font-weight-bold);
  }

  h4 {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
    font-family: var(--font-family);
    letter-spacing: -0.015em;
  }

  p {
    font-size: var(--text-base);
    font-weight: var(--font-weight-normal);
    line-height: 1.5;
    font-family: var(--font-family);
  }

  label {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
    font-family: var(--font-family);
  }

  button {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
    font-family: var(--font-family);
  }

  input {
    font-size: var(--text-base);
    font-weight: var(--font-weight-normal);
    line-height: 1.5;
    font-family: var(--font-family);
  }
}

html {
  font-size: var(--font-size);
  font-family: var(--font-family);
}