
import { useEffect, useState } from "react";
import svgPaths from "../../imports/svg-aevronu2hf";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
  compact?: boolean;
}

export function Logo({ className = "", variant, compact = false }: LogoProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Initialize with current state
    setIsDarkMode(document.documentElement.classList.contains("dark"));
    
    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Determine which logo to use based on variant or theme
  const logoVariant = variant || (isDarkMode ? "white" : "default");
  const fillColor = logoVariant === "white" ? "#FFFFFF" : "#1561BE"; // Updated to use pure white for better contrast
  
  if (compact) {
    // Return a compact version of the logo (just "IT" part) for small spaces
    return (
      <svg
        className={`${className}`}
        viewBox="0 0 34 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M33.927 0V34H0V0H33.927Z"
          fill={fillColor}
        />
      </svg>
    );
  }

  // Return the full logo SVG
  return (
    <svg
      className={`${className}`}
      viewBox="0 0 928 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g>
          <path d={svgPaths.p26a90800} fill={fillColor} />
          <path d={svgPaths.p6e4b1f0} fill={fillColor} />
          <path d={svgPaths.p19c19800} fill={fillColor} />
          <path d={svgPaths.p6567c00} fill={fillColor} />
          <path d={svgPaths.p25955540} fill={fillColor} />
          <path d={svgPaths.p380e4300} fill={fillColor} />
          <path d={svgPaths.p90c9700} fill={fillColor} />
          <path
            d="M33.927 0V108.2H0V0H33.927Z"
            fill={fillColor}
          />
        </g>
        <path
          d={svgPaths.p718ca80}
          fill={fillColor}
        />
      </g>
    </svg>
  );
}
