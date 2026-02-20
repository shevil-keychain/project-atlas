import React from 'react';

export interface EqualProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function Equal({ 
  size = 24, 
  color = 'currentColor',
  className 
}: EqualProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M4 9C4 8.44772 4.44772 8 5 8H19C19.5523 8 20 8.44772 20 9C20 9.55228 19.5523 10 19 10H5C4.44772 10 4 9.55228 4 9ZM4 15C4 14.4477 4.44772 14 5 14H19C19.5523 14 20 14.4477 20 15C20 15.5523 19.5523 16 19 16H5C4.44772 16 4 15.5523 4 15Z" fill="currentColor"/>
    </svg>
  );
}
