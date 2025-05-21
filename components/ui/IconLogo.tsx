
import React from "react";

interface IconLogoProps {
  className?: string;
  variant?: "default" | "white";
}

export function IconLogo({ className = "", variant = "default" }: IconLogoProps) {
  const fillColor = variant === "white" ? "#FFFFFF" : "#1561BE"; // IT Health base blue color
  
  return (
    <svg
      className={className}
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Square background with rounded corners */}
      <rect 
        width="34" 
        height="34" 
        rx="6" 
        fill={fillColor}
      />
      
      {/* "IT" letters */}
      <path 
        d="M8 8H26V12H20V26H14V12H8V8Z" 
        fill="white"
      />
      
      {/* Small "HEALTH" text - simplified for small icon */}
      <path 
        d="M8 27H26V29H8V27Z" 
        fill="white" 
      />
    </svg>
  );
}
