import React from 'react';

export interface FilledSquareProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function FilledSquare({ 
  size = 24, 
  color = 'currentColor',
  className 
}: FilledSquareProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ color }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" rx="6" fill="#46A680"/>
    </svg>
  );
}
