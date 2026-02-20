import React from 'react';

export interface ArrowNarrowDownRightProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ArrowNarrowDownRight({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ArrowNarrowDownRightProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L17 15.5858V10C17 9.44772 17.4477 9 18 9C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H10C9.44772 19 9 18.5523 9 18C9 17.4477 9.44772 17 10 17H15.5858L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="currentColor"/>
    </svg>
  );
}
