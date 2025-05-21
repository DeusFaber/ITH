
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error boundary specifically for plan pages.
 * Catches errors that occur when rendering plan components 
 * and displays a friendly error message with recovery options.
 */
export class PlanErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true, 
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to the console
    console.error('Plan page error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleBackToPlans = (): void => {
    try {
      // Navigate back to plans page
      window.history.pushState({}, '', '/plans');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error("Failed to navigate back to plans:", error);
      window.location.href = '/plans';
    }
  };

  private handleRetry = (): void => {
    // Reset error state and try again
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    // Force a refresh of the current page
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      // Check if a custom fallback was provided
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Extract plan slug from URL if available
      const path = window.location.pathname;
      let planSlug = '';
      if (path.startsWith('/plans/') && path !== '/plans/' && path !== '/plans/compare') {
        planSlug = path.replace('/plans/', '');
      }
      
      // Check if the plan exists in our known plans array
      const knownPlans = [
        'user-health-plan', 'office-health-plan', 'communication-plan',
        'itsafe-user-plan', 'itsafe-server-plan', 
        'mail-plan', 'business-basic-plan', 'business-standard-plan', 'sharepoint-plan',
        'reporting-plan', 'workflow-optimization-plan', 'digital-customer-plan', 'ai-connect-plan'
      ];
      
      const isPlanKnown = knownPlans.includes(planSlug);
      
      // Default error UI
      return (
        <div className="w-full max-w-4xl mx-auto p-6 mt-8">
          <div className="bg-white rounded-[16px] rounded-tr-[0px] border border-muted shadow-md overflow-hidden">
            <div className="bg-red-50 p-4">
              <h2 className="text-xl font-light text-red-600 mb-2">
                We couldn't load this plan
              </h2>
              <p className="text-muted-foreground">
                We're having trouble loading the requested plan information. This might be because:
              </p>
            </div>
            
            <div className="p-6">
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>The plan you're looking for doesn't exist or has been moved</li>
                <li>There was a temporary connection issue</li>
                <li>The plan page is currently being updated</li>
              </ul>
              
              {planSlug && (
                <div className="bg-muted/20 p-3 rounded mb-6">
                  <p className="text-sm">
                    <strong>Diagnostic info:</strong> {isPlanKnown ? 
                      `The plan "${planSlug}" exists in our system but couldn't be loaded.` :
                      `The plan "${planSlug}" was not found in our catalog.`
                    }
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={this.handleBackToPlans}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to All Plans
                </Button>
                
                <Button 
                  className="bg-blue text-white"
                  onClick={this.handleRetry}
                >
                  Try Again
                </Button>
              </div>
              
              {this.state.error && (
                <div className="mt-6 p-4 bg-muted/20 rounded text-xs overflow-auto max-h-32">
                  <p className="font-semibold">Error details (for technical support):</p>
                  <pre className="mt-2 text-muted-foreground overflow-x-auto">
                    {this.state.error.toString()}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PlanErrorBoundary;
