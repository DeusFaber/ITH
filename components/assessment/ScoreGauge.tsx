
import React from 'react';

interface ScoreGaugeProps {
  score: number;
  maturityLevel: "basic" | "stable" | "smart";
  size?: number;
}

export function ScoreGauge({ score, maturityLevel, size = 180 }: ScoreGaugeProps) {
  // Calculate the angle for the gauge needle
  const minAngle = -90;
  const maxAngle = 90;
  const totalAngleRange = maxAngle - minAngle;
  const scorePercentage = score / 100;
  const needleAngle = minAngle + (totalAngleRange * scorePercentage);
  
  // Get color based on maturity level
  const getColor = () => {
    switch (maturityLevel) {
      case "basic": return "#F44336"; // Red
      case "stable": return "#FFC107"; // Amber
      case "smart": return "#4CAF50"; // Green
      default: return "#FFC107"; // Default to amber
    }
  };

  // SVG dimensions
  const width = size;
  const height = size / 2;
  const centerX = width / 2;
  const centerY = height;
  const radius = height - 10;
  
  // Calculate needle position
  const needleLength = radius - 20;
  const needleX = centerX + needleLength * Math.cos((needleAngle * Math.PI) / 180);
  const needleY = centerY + needleLength * Math.sin((needleAngle * Math.PI) / 180);

  return (
    <div className="relative" style={{ width: size, height: height + 30 }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Background arc */}
        <path
          d={`
            M ${centerX - radius}, ${centerY}
            A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}
          `}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="10"
          strokeLinecap="round"
        />
        
        {/* Red segment (0-40) */}
        <path
          d={`
            M ${centerX - radius}, ${centerY}
            A ${radius} ${radius} 0 0 1 ${centerX - radius * 0.2} ${centerY - radius * 0.98}
          `}
          fill="none"
          stroke="#F44336"
          strokeWidth="10"
          strokeLinecap="round"
        />
        
        {/* Yellow segment (40-70) */}
        <path
          d={`
            M ${centerX - radius * 0.2}, ${centerY - radius * 0.98}
            A ${radius} ${radius} 0 0 1 ${centerX + radius * 0.7} ${centerY - radius * 0.7}
          `}
          fill="none"
          stroke="#FFC107"
          strokeWidth="10"
          strokeLinecap="round"
        />
        
        {/* Green segment (70-100) */}
        <path
          d={`
            M ${centerX + radius * 0.7}, ${centerY - radius * 0.7}
            A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}
          `}
          fill="none"
          stroke="#4CAF50"
          strokeWidth="10"
          strokeLinecap="round"
        />
        
        {/* Needle */}
        <line
          x1={centerX}
          y1={centerY}
          x2={needleX}
          y2={needleY}
          stroke={getColor()}
          strokeWidth="3"
        />
        
        {/* Center circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r="8"
          fill={getColor()}
        />
      </svg>
      
      {/* Score display */}
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <div className="text-3xl font-medium" style={{ color: getColor() }}>{score}</div>
        <div className="text-sm text-muted-foreground">Score</div>
      </div>
      
      {/* Scale labels */}
      <div className="absolute top-4 left-0 text-xs text-muted-foreground">0</div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">50</div>
      <div className="absolute top-4 right-0 text-xs text-muted-foreground">100</div>
    </div>
  );
}
