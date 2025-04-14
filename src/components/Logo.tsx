
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "white" | "dark";
  showText?: boolean;
  size?: "small" | "medium" | "large" | "xlarge";
  className?: string;
  href?: string;
  logoOnly?: boolean;
  onClick?: () => void;
  customLogoSrc?: string;
}

const Logo = ({
  variant = "default",
  showText = true,
  size = "medium",
  className,
  href = "/",
  logoOnly = false,
  onClick,
  customLogoSrc = "/lovable-uploads/0e9dc446-8851-4a6d-a827-08509a5dde5b.png"
}: LogoProps) => {
  // Calculate text color based on variant
  let textColorClass = "text-primary";
  if (variant === "white") {
    textColorClass = "text-white";
  } else if (variant === "dark") {
    textColorClass = "text-blue-900";
  }

  // Updated logoSizeMap with doubled dimensions
  const logoSizeMap = {
    small: {
      width: "96", // Doubled from 48
      height: "96", // Doubled from 48
      circleSize: "w-24 h-24" // Adjusted to match new size
    },
    medium: {
      width: "128", // Doubled from 64
      height: "128", // Doubled from 64
      circleSize: "w-32 h-32" // Adjusted to match new size
    },
    large: {
      width: "192", // Doubled from 96
      height: "192", // Doubled from 96
      circleSize: "w-48 h-48" // Adjusted to match new size
    },
    xlarge: {
      width: "256", // New extra large size
      height: "256", // New extra large size
      circleSize: "w-64 h-64" // Adjusted to match new size
    }
  };
  const {
    width,
    height,
    circleSize
  } = logoSizeMap[size];

  // Text size based on logo size
  const textSizeMap = {
    small: "text-base",
    medium: "text-xl",
    large: "text-2xl",
    xlarge: "text-3xl"
  };
  const logoContent = <>
      <div className={circleSize}>
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
          <image href={customLogoSrc} width="100" height="100" />
        </svg>
      </div>
      {showText && !logoOnly}
    </>;
  const containerClass = cn("flex items-center gap-2", className);

  // Render as clickable link or static div based on props
  if (logoOnly) {
    return <div className={containerClass} onClick={onClick}>{logoContent}</div>;
  }
  return <Link to={href} className={containerClass} onClick={onClick}>
      {logoContent}
    </Link>;
};

export default Logo;
