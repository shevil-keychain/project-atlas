import React from 'react';

export interface CurrencyRupeeProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function CurrencyRupee({ 
  size = 24, 
  color = 'currentColor',
  className 
}: CurrencyRupeeProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M4.99998 3C4.99998 2.44772 5.44769 2 5.99998 2H18C18.5523 2 19 2.44772 19 3C19 3.55228 18.5523 4 18 4H13.5859C14.3176 4.86428 14.7578 5.91694 14.924 7H18C18.5523 7 19 7.44772 19 8C19 8.55228 18.5523 9 18 9H14.924C14.7512 10.126 14.2823 11.2191 13.4976 12.1019C12.4651 13.2633 10.9381 14 8.99998 14H8.52155L15.1853 20.2718C15.5875 20.6503 15.6067 21.2832 15.2282 21.6854C14.8497 22.0875 14.2168 22.1067 13.8146 21.7282L5.31461 13.7282C5.01606 13.4472 4.91927 13.0125 5.07041 12.6314C5.22154 12.2502 5.58999 12 5.99998 12H8.99998C10.3954 12 11.3685 11.4867 12.0028 10.7731C12.4403 10.2809 12.7404 9.66559 12.8901 9H5.99998C5.44769 9 4.99998 8.55228 4.99998 8C4.99998 7.44772 5.44769 7 5.99998 7H12.8901C12.7404 6.33441 12.4403 5.71909 12.0028 5.22688C11.3685 4.51331 10.3954 4 8.99998 4H5.99998C5.44769 4 4.99998 3.55228 4.99998 3Z" fill="currentColor"/>
    </svg>
  );
}
