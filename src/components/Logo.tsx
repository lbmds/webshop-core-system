
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "white" | "dark";
  showText?: boolean;
}

const Logo = ({ variant = "default", showText = true }: LogoProps) => {
  let textColorClass = "text-primary";
  
  if (variant === "white") {
    textColorClass = "text-white";
  } else if (variant === "dark") {
    textColorClass = "text-blue-900";
  }

  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="logo-circle">
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Simplified family icon from the logo */}
          <g fill={variant === "white" ? "#FFFFFF" : "#B91C1C"}>
            <circle cx="30" cy="20" r="10" />
            <circle cx="70" cy="20" r="10" />
            <path d="M20 30C20 30 15 60 15 80C15 80 25 85 30 80C35 60 35 40 35 30" />
            <path d="M80 30C80 30 85 60 85 80C85 80 75 85 70 80C65 60 65 40 65 30" />
            <circle cx="20" cy="70" r="8" />
            <circle cx="80" cy="70" r="8" />
            <path d="M15 80C15 80 10 90 15 95C20 95 25 90 25 85" />
            <path d="M85 80C85 80 90 90 85 95C80 95 75 90 75 85" />
          </g>
        </svg>
      </div>
      {showText && (
        <div className={`font-bold ${textColorClass}`}>
          <span className="text-xl">NOVA</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
