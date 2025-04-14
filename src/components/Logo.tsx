
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "white" | "dark";
  showText?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  href?: string;
  logoOnly?: boolean;
  onClick?: () => void;
}

const Logo = ({ 
  variant = "default", 
  showText = true, 
  size = "medium", 
  className,
  href = "/",
  logoOnly = false,
  onClick
}: LogoProps) => {
  // Calculate text color based on variant
  let textColorClass = "text-primary";
  
  if (variant === "white") {
    textColorClass = "text-white";
  } else if (variant === "dark") {
    textColorClass = "text-blue-900";
  }

  // Calculate logo size based on size prop
  const logoSizeMap = {
    small: { width: "24", height: "24", circleSize: "w-8 h-8" },
    medium: { width: "32", height: "32", circleSize: "w-10 h-10" },
    large: { width: "48", height: "48", circleSize: "w-14 h-14" }
  };

  const { width, height, circleSize } = logoSizeMap[size];

  // Text size based on logo size
  const textSizeMap = {
    small: "text-base",
    medium: "text-xl",
    large: "text-2xl"
  };

  const logoContent = (
    <>
      <div className={cn("logo-circle relative", circleSize)}>
        <svg
          width={width}
          height={height}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <image 
            href="/lovable-uploads/38ab295d-b8b5-46e1-8261-f552ca0cfb02.png" 
            width="100" 
            height="100" 
          />
        </svg>
      </div>
      {showText && !logoOnly && (
        <div className={cn(`font-bold ${textColorClass}`)}>
          <span className={textSizeMap[size]}>NOVA</span>
        </div>
      )}
    </>
  );

  const containerClass = cn(
    "flex items-center gap-2",
    className
  );

  // Render as clickable link or static div based on props
  if (logoOnly) {
    return <div className={containerClass} onClick={onClick}>{logoContent}</div>;
  }

  return (
    <Link to={href} className={containerClass} onClick={onClick}>
      {logoContent}
    </Link>
  );
};

export default Logo;
