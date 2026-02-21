import React from 'react';

export interface IconProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function Icon({ 
  size = 24, 
  color = 'currentColor',
  className 
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 14"
      fill="none"
      className={className}
      style={{ color }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H19C19.5523 0 20 0.447715 20 1C20 1.55228 19.5523 2 19 2H1C0.447715 2 0 1.55228 0 1ZM3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6H4C3.44772 6 3 5.55228 3 5ZM0 9C0 8.44772 0.447715 8 1 8H19C19.5523 8 20 8.44772 20 9C20 9.55229 19.5523 10 19 10H1C0.447715 10 0 9.55229 0 9ZM3 13C3 12.4477 3.44772 12 4 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H4C3.44772 14 3 13.5523 3 13Z" fill="currentColor"/>
    </svg>
  );
}
