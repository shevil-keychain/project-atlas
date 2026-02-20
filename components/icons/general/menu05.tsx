import React from 'react';

export interface Menu05Props {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function Menu05({ 
  size = 24, 
  color = 'currentColor',
  className 
}: Menu05Props) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M2 8.5C2 7.94772 2.44772 7.5 3 7.5H21C21.5523 7.5 22 7.94772 22 8.5C22 9.05228 21.5523 9.5 21 9.5H3C2.44772 9.5 2 9.05228 2 8.5ZM2 15.5C2 14.9477 2.44772 14.5 3 14.5H21C21.5523 14.5 22 14.9477 22 15.5C22 16.0523 21.5523 16.5 21 16.5H3C2.44772 16.5 2 16.0523 2 15.5Z" fill="currentColor"/>
    </svg>
  );
}
