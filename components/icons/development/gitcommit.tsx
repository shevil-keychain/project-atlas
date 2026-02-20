import React from 'react';

export interface GitCommitProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function GitCommit({ 
  size = 24, 
  color = 'currentColor',
  className 
}: GitCommitProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M12 9C10.3431 9 8.99999 10.3431 8.99999 12C8.99999 13.6569 10.3431 15 12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9ZM7.10001 11C7.56328 8.71776 9.58103 7 12 7C14.4189 7 16.4367 8.71776 16.9 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H16.9C16.4367 15.2822 14.4189 17 12 17C9.58103 17 7.56328 15.2822 7.10001 13H2.00018C1.4479 13 1.00018 12.5523 1.00018 12C1.00018 11.4477 1.4479 11 2.00018 11H7.10001Z" fill="currentColor"/>
    </svg>
  );
}
