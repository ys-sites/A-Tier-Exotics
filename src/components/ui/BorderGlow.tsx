import React, { useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  edgeSensitivity?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = "",
  glowColor = "rgba(224, 205, 173, 0.4)", // Brand accent with opacity
  backgroundColor = "var(--color-brand-dark)", // from CSS variables
  borderRadius = 40,
  glowRadius = 400,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden group", className)}
      style={{
        borderRadius: `${borderRadius}px`,
        backgroundColor,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${glowRadius}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-[1px] z-10"
        style={{
          borderRadius: `${borderRadius - 1}px`,
          backgroundColor: backgroundColor,
        }}
      />
      
      {/* Background glow for inner content to softly light up the inside */}
      <div
        className="pointer-events-none absolute inset-[1px] z-20 transition-opacity duration-300"
        style={{
          opacity: opacity * 0.15,
          background: `radial-gradient(${glowRadius}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 100%)`,
          borderRadius: `${borderRadius - 1}px`,
        }}
      />

      <div className="relative z-30 h-full w-full">{children}</div>
    </div>
  );
};

export default BorderGlow;

