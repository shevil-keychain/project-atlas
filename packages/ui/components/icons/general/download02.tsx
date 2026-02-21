import React from 'react';

export interface Download02Props {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function Download02({ 
  size = 24, 
  color = 'currentColor',
  className 
}: Download02Props) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V14.5858L17.2929 10.2929C17.6834 9.90237 18.3166 9.90237 18.7071 10.2929C19.0976 10.6834 19.0976 11.3166 18.7071 11.7071L12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071L5.29289 11.7071C4.90237 11.3166 4.90237 10.6834 5.29289 10.2929C5.68342 9.90237 6.31658 9.90237 6.70711 10.2929L11 14.5858V3C11 2.44772 11.4477 2 12 2ZM2 21C2 20.4477 2.44772 20 3 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21Z" fill="currentColor"/>
    </svg>
  );
}
