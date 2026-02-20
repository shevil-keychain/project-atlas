import React from 'react';

export interface AlignTopArrow01Props {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function AlignTopArrow01({ 
  size = 24, 
  color = 'currentColor',
  className 
}: AlignTopArrow01Props) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3C22 3.55228 21.5523 4 21 4H3C2.44772 4 2 3.55228 2 3ZM11.2929 6.29289C11.6834 5.90237 12.3166 5.90237 12.7071 6.29289L19.7071 13.2929C20.0976 13.6834 20.0976 14.3166 19.7071 14.7071C19.3166 15.0976 18.6834 15.0976 18.2929 14.7071L13 9.41421V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V9.41421L5.70711 14.7071C5.31658 15.0976 4.68342 15.0976 4.29289 14.7071C3.90237 14.3166 3.90237 13.6834 4.29289 13.2929L11.2929 6.29289Z" fill="currentColor"/>
    </svg>
  );
}
