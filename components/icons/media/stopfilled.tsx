import React from 'react';

export interface StopFilledProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function StopFilled({ 
  size = 24, 
  color = 'currentColor',
  className 
}: StopFilledProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10 8C8.89543 8 8 8.89543 8 10V14C8 15.1046 8.89543 16 10 16H14C15.1046 16 16 15.1046 16 14V10C16 8.89543 15.1046 8 14 8H10Z" fill="currentColor"/>
    </svg>
  );
}
