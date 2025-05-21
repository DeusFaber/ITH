
import { ReactNode } from "react";

interface AnimationWrapperProps {
  children: ReactNode;
  isActive?: boolean;
  timing?: "accelerate" | "decelerate" | "standard";
  duration?: number;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * A consistent animation wrapper component for the application
 * Uses accelerate easing for consistent feel
 */
export function AnimationWrapper({ 
  children, 
  isActive = true,
  timing = "accelerate",
  duration = 300,
  delay = 0,
  style = {},
  className = ""
}: AnimationWrapperProps) {
  // Define easing curves
  const easingCurves = {
    accelerate: "cubic-bezier(0.4, 0.0, 1, 1)",      // Fast start, slow end
    decelerate: "cubic-bezier(0.0, 0.0, 0.2, 1)",    // Slow start, fast end
    standard: "cubic-bezier(0.4, 0.0, 0.2, 1)"       // Standard symmetric curve
  };

  // Selected timing function
  const timingFunction = easingCurves[timing];

  return (
    <div 
      className={className}
      style={{
        transition: `all ${duration}ms ${timingFunction} ${delay}ms`,
        opacity: isActive ? 1 : 0.7,
        transform: isActive ? 'scale(1)' : 'scale(0.98)',
        ...style
      }}
    >
      {children}
    </div>
  );
}

/**
 * Animation specifically for phase logos
 */
export function PhaseLogo({ 
  children, 
  isActive = false,
  phase = "operate"
}: { 
  children: ReactNode, 
  isActive?: boolean,
  phase?: "operate" | "secure" | "streamline" | "accelerate"
}) {
  return (
    <AnimationWrapper
      isActive={isActive}
      timing="accelerate"
      duration={400}
      className="w-full h-full"
      style={{
        transform: isActive ? 'scale(1.05)' : 'scale(1)'
      }}
    >
      {children}
    </AnimationWrapper>
  );
}
