import React from 'react';

export interface ListItemProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ListItem({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ListItemProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 10.8954 2.89543 10 4 10C5.10457 10 6 10.8954 6 12C6 13.1046 5.10457 14 4 14C2.89543 14 2 13.1046 2 12ZM8 12C8 11.4477 8.44772 11 9 11L21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13L9 13C8.44772 13 8 12.5523 8 12Z" fill="currentColor"/>
    </svg>
  );
}
