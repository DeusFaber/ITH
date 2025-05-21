
import React from "react";
import { Button } from "../ui/button";
import { BarChart3 } from "lucide-react";

interface AssessmentButtonProps {
  onClick: () => void;
  className?: string;
  variant?: "default" | "icon";
}

export function AssessmentButton({ onClick, className, variant = "default" }: AssessmentButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`bg-pink hover:bg-pink/90 text-white rounded-[16px] rounded-tr-[0px] rounded-bl-[16px] rounded-br-[16px] ${className}`}
      size={variant === "icon" ? "icon" : "sm"}
    >
      <BarChart3 className={variant === "default" ? "mr-2 h-4 w-4" : "h-5 w-5"} />
      {variant === "default" && "IT Assessment"}
    </Button>
  );
}
