import React from 'react';

export interface ArrowCircleBrokenLeftProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ArrowCircleBrokenLeft({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ArrowCircleBrokenLeftProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 3C7.02931 3 2.99988 7.02944 2.99988 12C2.99988 16.9706 7.02931 21 11.9999 21C15.3299 21 18.2388 19.192 19.7964 16.4993C20.073 16.0212 20.6847 15.8579 21.1628 16.1344C21.6408 16.4109 21.8042 17.0227 21.5277 17.5007C19.6272 20.786 16.0727 23 11.9999 23C5.92475 23 0.999878 18.0751 0.999878 12C0.999878 5.92487 5.92474 1 11.9999 1C16.0727 1 19.6272 3.21398 21.5277 6.49927C21.8042 6.97734 21.6408 7.58906 21.1628 7.86561C20.6847 8.14215 20.073 7.97879 19.7964 7.50073C18.2388 4.80801 15.3299 3 11.9999 3ZM12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L10.4142 11H21.9999C22.5522 11 22.9999 11.4477 22.9999 12C22.9999 12.5523 22.5522 13 21.9999 13H10.4142L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3165 17.0976 11.6834 17.0976 11.2928 16.7071L7.29284 12.7071C6.90232 12.3166 6.90232 11.6834 7.29284 11.2929L11.2928 7.29289C11.6834 6.90237 12.3165 6.90237 12.7071 7.29289Z" fill="currentColor"/>
    </svg>
  );
}
