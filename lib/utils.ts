
// General utility functions for the application

// Format price to display with correct currency symbol and decimals
export function formatPrice(price: number, currency: string = "ZAR"): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Format date to display in a consistent way
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Truncate text to a specific length with ellipsis
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate a random ID (useful for temporary keys)
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Convert a string to kebab case (for URLs, etc.)
export function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

// Calculate days remaining until a date
export function daysRemaining(targetDate: Date | string): number {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const today = new Date();
  const difference = target.getTime() - today.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
}

// Calculate percentage (with optional decimal places)
export function calculatePercentage(value: number, total: number, decimalPlaces: number = 0): number {
  if (total === 0) return 0;
  const percentage = (value / total) * 100;
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(percentage * factor) / factor;
}

// Format number with commas for thousands
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Check if a string is a valid email address
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Extract initials from a name (e.g., "John Smith" -> "JS")
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}

// Convert hex color to rgba
export function hexToRgba(hex: string, alpha: number = 1): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Get readable text color (black or white) based on background color brightness
export function getReadableTextColor(bgColor: string): string {
  // Convert hex to RGB
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  
  // Calculate brightness using YIQ formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Return black for bright backgrounds, white for dark
  return brightness > 128 ? '#000000' : '#FFFFFF';
}

// Sleep function for async operations
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Check if a device is in portrait mode
export function isPortraitMode(): boolean {
  return window.matchMedia("(orientation: portrait)").matches;
}

// Check if a device is mobile (based on screen width)
export function isMobileDevice(): boolean {
  return window.innerWidth <= 768;
}

// Debounce function to limit the rate at which a function is executed
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Plan page utilities

// Comprehensive mapping of all plan slugs to their canonical paths
export const PLAN_ROUTES = {
  // Operate Phase
  "user-health-plan": "/plans/user-health-plan",
  "office-health-plan": "/plans/office-health-plan",
  "communication-plan": "/plans/communication-plan",
  
  // Secure Phase
  "itsafe-user-plan": "/plans/itsafe-user-plan",
  "itsafe-server-plan": "/plans/itsafe-server-plan",
  
  // Streamline Phase
  "mail-plan": "/plans/mail-plan",
  "business-basic-plan": "/plans/business-basic-plan",
  "business-standard-plan": "/plans/business-standard-plan",
  "sharepoint-plan": "/plans/sharepoint-plan",
  
  // Accelerate Phase
  "reporting-plan": "/plans/reporting-plan",
  "workflow-optimization-plan": "/plans/workflow-optimization-plan",
  "digital-customer-plan": "/plans/digital-customer-plan",
  "ai-connect-plan": "/plans/ai-connect-plan",
};

// Plan phases mapping
export const PLAN_PHASES = {
  "operate": ["user-health-plan", "office-health-plan", "communication-plan"],
  "secure": ["itsafe-user-plan", "itsafe-server-plan"],
  "streamline": ["mail-plan", "business-basic-plan", "business-standard-plan", "sharepoint-plan"],
  "accelerate": ["reporting-plan", "workflow-optimization-plan", "digital-customer-plan", "ai-connect-plan"]
};

// Get canonical plan URL by slug
export function getPlanUrl(planSlug: string): string {
  // Make sure we have plan slugs in a standardized format
  const normalized = planSlug.toLowerCase().replace(/\s+/g, '-');
  
  // First, check our canonical routes
  if (PLAN_ROUTES[normalized]) {
    return PLAN_ROUTES[normalized];
  }
  
  // As a fallback, construct a URL path from the slug if it's not in our predefined list
  return `/plans/${normalized}`;
}

// Calculate how many days ago a date was (for displaying relative time)
export function calculateDaysAgo(date: Date | string): string {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - targetDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}

// Navigate to a plan page with consistent error handling
export function navigateToPlan(planSlug: string, options: { replaceHistory?: boolean } = {}): void {
  const url = getPlanUrl(planSlug);
  
  console.log(`Navigating to plan: ${planSlug} via ${url}`);
  
  try {
    // Use the appropriate history method
    if (options.replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
    
    // Manually trigger a popstate event to ensure the app reacts to this change
    const popStateEvent = new PopStateEvent('popstate', {});
    window.dispatchEvent(popStateEvent);
    
    // Alternative approach if needed: force a reload
    // window.location.href = url;
  } catch (error) {
    console.error(`Error navigating to plan ${planSlug}:`, error);
    // Fallback: direct location change
    window.location.href = url;
  }
}

// Helper to get all plans in a phase
export function getPlansInPhase(phase: 'operate' | 'secure' | 'streamline' | 'accelerate'): string[] {
  return PLAN_PHASES[phase] || [];
}

// Generate human-readable plan name from slug
export function getPlanDisplayName(planSlug: string): string {
  // Convert from kebab-case to readable title
  return planSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/Itsafe/g, 'ITsafe') // Special case for ITsafe naming
    .replace(/Ai/g, 'AI');        // Special case for AI naming
}
