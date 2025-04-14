
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
          <image 
            href="/public/lovable-uploads/15723384-cd93-459f-a52e-147215084c99.png" 
            width="100" 
            height="100" 
          />
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
