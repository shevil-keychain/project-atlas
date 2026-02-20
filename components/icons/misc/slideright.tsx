import React from 'react';

export interface SlideRightProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function SlideRight({ 
  size = 24, 
  color = 'currentColor',
  className 
}: SlideRightProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      style={{ color }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M14.5001 1.6665C14.9603 1.6665 15.3334 2.0396 15.3334 2.49984V17.4998C15.3334 17.9601 14.9603 18.3332 14.5001 18.3332C14.0398 18.3332 13.6667 17.9601 13.6667 17.4998V2.49984C13.6667 2.0396 14.0398 1.6665 14.5001 1.6665Z" fill="#282624"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 3.29289C4.68342 2.90237 5.31658 2.90237 5.70711 3.29289L11.7071 9.29289C12.0976 9.68342 12.0976 10.3166 11.7071 10.7071L5.70711 16.7071C5.31658 17.0976 4.68342 17.0976 4.29289 16.7071C3.90237 16.3166 3.90237 15.6834 4.29289 15.2929L9.58579 10L4.29289 4.70711C3.90237 4.31658 3.90237 3.68342 4.29289 3.29289Z" fill="#35312D"/>
    </svg>
  );
}
