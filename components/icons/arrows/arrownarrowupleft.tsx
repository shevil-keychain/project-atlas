import React from 'react';

export interface ArrowNarrowUpLeftProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ArrowNarrowUpLeft({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ArrowNarrowUpLeftProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M5 6C5 5.44772 5.44772 5 6 5H14C14.5523 5 15 5.44772 15 6C15 6.55228 14.5523 7 14 7H8.41421L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L7 8.41421V14C7 14.5523 6.55228 15 6 15C5.44772 15 5 14.5523 5 14V6Z" fill="currentColor"/>
    </svg>
  );
}
