import React from 'react';

export interface BarChart01Props {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function BarChart01({ 
  size = 24, 
  color = 'currentColor',
  className 
}: BarChart01Props) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M12 3C12.5523 3 13 3.44772 13 4V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V4C11 3.44772 11.4477 3 12 3ZM18 9C18.5523 9 19 9.44772 19 10V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V10C17 9.44772 17.4477 9 18 9ZM6 13C6.55228 13 7 13.4477 7 14V20C7 20.5523 6.55228 21 6 21C5.44772 21 5 20.5523 5 20V14C5 13.4477 5.44772 13 6 13Z" fill="currentColor"/>
    </svg>
  );
}
