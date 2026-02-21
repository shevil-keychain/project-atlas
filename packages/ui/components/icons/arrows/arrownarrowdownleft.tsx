import React from 'react';

export interface ArrowNarrowDownLeftProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ArrowNarrowDownLeft({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ArrowNarrowDownLeftProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L8.41421 17H14C14.5523 17 15 17.4477 15 18C15 18.5523 14.5523 19 14 19H6C5.44772 19 5 18.5523 5 18V10C5 9.44772 5.44772 9 6 9C6.55228 9 7 9.44772 7 10V15.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z" fill="currentColor"/>
    </svg>
  );
}
