
import React from 'react';

interface WhiteLogoWrapperProps {
  children: React.ReactNode;
}

export function WhiteLogoWrapper({ children }: WhiteLogoWrapperProps) {
  // Apply a style that ensures the --fill-0 variable is always white
  return (
    <div 
      className="white-logo-wrapper" 
      style={{ 
        "--fill-0": "white" 
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
