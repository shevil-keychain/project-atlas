import React from 'react';

export interface ThumbsUpFilledProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ThumbsUpFilled({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ThumbsUpFilledProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M11.5342 1C10.8142 1 10.1617 1.42403 9.86926 2.08199L7 8.53782V23H5V10H4C2.34315 10 1 11.3432 1 13V20C1 21.6569 2.34315 23 4 23H17.4263C19.4006 23 21.0796 21.5596 21.3798 19.6083L22.4567 12.6082C22.8295 10.1852 20.9547 8.00001 18.5032 8.00001H15V4.46584C15 2.55171 13.4483 1 11.5342 1Z" fill="currentColor"/>
    </svg>
  );
}
