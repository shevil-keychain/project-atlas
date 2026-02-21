import React from 'react';

export interface ThumbsDownFilledProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ThumbsDownFilled({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ThumbsDownFilledProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M12.4659 23C13.1859 23 13.8384 22.576 14.1308 21.918L17 15.4622V1.00003H19V14H20C21.6569 14 23 12.6569 23 11V4.00001C23 2.34315 21.6569 1 20 1H6.57377C4.59948 1 2.92048 2.44045 2.62028 4.39178L1.54335 11.3918C1.17058 13.8148 3.0453 16 5.49684 16H9.00001V19.5342C9.00001 21.4483 10.5517 23 12.4659 23Z" fill="currentColor"/>
    </svg>
  );
}
