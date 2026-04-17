import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

/**
 * A reusable Button component matching the design system
 */
export function Button({
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-full transition-all active:scale-95";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-container shadow-cloud",
    secondary: "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
