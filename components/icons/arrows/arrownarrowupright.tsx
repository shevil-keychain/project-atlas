import React from 'react';

export interface ArrowNarrowUpRightProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ArrowNarrowUpRight({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ArrowNarrowUpRightProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M9 6C9 5.44772 9.44772 5 10 5H18C18.5523 5 19 5.44772 19 6V14C19 14.5523 18.5523 15 18 15C17.4477 15 17 14.5523 17 14V8.41421L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L15.5858 7H10C9.44772 7 9 6.55228 9 6Z" fill="currentColor"/>
    </svg>
  );
}
