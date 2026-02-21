import React from 'react';

export interface ArrowNarrowDownProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ArrowNarrowDown({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ArrowNarrowDownProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L17.2929 13.2929C17.6834 12.9024 18.3166 12.9024 18.7071 13.2929C19.0976 13.6834 19.0976 14.3166 18.7071 14.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L5.29289 14.7071C4.90237 14.3166 4.90237 13.6834 5.29289 13.2929C5.68342 12.9024 6.31658 12.9024 6.70711 13.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z" fill="currentColor"/>
    </svg>
  );
}
