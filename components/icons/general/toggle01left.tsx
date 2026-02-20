import React from 'react';

export interface Toggle01LeftProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function Toggle01Left({ 
  size = 24, 
  color = 'currentColor',
  className 
}: Toggle01LeftProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 8.68629 3.68629 6 7 6H17C20.3137 6 23 8.68629 23 12C23 15.3137 20.3137 18 17 18H7C3.68629 18 1 15.3137 1 12ZM11.4722 16H17C19.2091 16 21 14.2091 21 12C21 9.79086 19.2091 8 17 8H11.4722C12.4223 9.06151 13 10.4633 13 12C13 13.5367 12.4223 14.9385 11.4722 16ZM7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8Z" fill="currentColor"/>
    </svg>
  );
}
