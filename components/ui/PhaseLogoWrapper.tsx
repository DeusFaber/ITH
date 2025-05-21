
import { ReactNode } from "react";

interface PhaseLogoWrapperProps {
  children: ReactNode;
  isActive?: boolean;
  phase: "operate" | "secure" | "streamline" | "accelerate";
}

export function PhaseLogoWrapper({ 
  children, 
  isActive = false,
  phase 
}: PhaseLogoWrapperProps) {
  // Define colors for each phase
  const phaseColors = {
    operate: "#1561BE",
    secure: "#FF246B",
    streamline: "#133258",
    accelerate: "#EDB600"
  };

  // Get the color for the current phase
  const phaseColor = phaseColors[phase];

  return (
    <div 
      className="relative w-full aspect-[4/1] overflow-hidden"
      style={{
        transform: isActive ? "scale(1.05)" : "scale(1)",
        transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: isActive ? 1 : 0.85,
          transition: "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        {children}
      </div>
    </div>
  );
}
