import React from 'react';

export interface ConditionProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function Condition({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ConditionProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M14.1355 5.17442C13.6474 4.67233 12.8559 4.67233 12.3677 5.17442L6.70397 11H3.2069C2.54035 11 2 11.4477 2 12C2 12.5523 2.54035 13 3.2069 13H6.70209L12.3677 18.8276C12.8559 19.3297 13.6474 19.3297 14.1355 18.8276L19.8886 12.9101C20.3767 12.408 20.3767 11.5939 19.8886 11.0918L14.1355 5.17442ZM9 12L13.2516 16.5L17.5 12L13.2516 7.5L9 12C9 12 9 12 9 12C9 12 9 12 9 12Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.7071 9.65681C15.3166 9.26628 15.3821 8.56762 15.8534 8.0963L20.0963 3.85336C20.5677 3.38204 21.2663 3.31653 21.6569 3.70707C22.0474 4.0976 21.9819 4.79625 21.5106 5.26758L17.2676 9.51052C16.7963 9.98183 16.0976 10.0473 15.7071 9.65681Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.7071 14.7071C16.0976 14.3166 16.7963 14.3821 17.2676 14.8534L21.5105 19.0963C21.9819 19.5677 22.0474 20.2663 21.6568 20.6569C21.2663 21.0474 20.5676 20.9819 20.0963 20.5106L15.8534 16.2676C15.3821 15.7963 15.3165 15.0976 15.7071 14.7071Z" fill="currentColor"/>
    </svg>
  );
}
