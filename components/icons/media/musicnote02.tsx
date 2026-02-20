import React from 'react';

export interface MusicNote02Props {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function MusicNote02({ 
  size = 24, 
  color = 'currentColor',
  className 
}: MusicNote02Props) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M14.726 3.24492L18.4472 5.10555C18.9412 5.35254 19.1414 5.95322 18.8944 6.4472C18.6474 6.94117 18.0468 7.1414 17.5528 6.89441L13.8683 5.05218C13.4675 4.85178 13.2281 4.73319 13.0502 4.66369C13.04 4.6597 13.0304 4.65606 13.0215 4.65274C13.0204 4.66221 13.0194 4.6724 13.0184 4.68335C13.001 4.87355 13 5.14072 13 5.58884V18C13 20.2091 11.2091 22 9 22C6.79086 22 5 20.2091 5 18C5 15.7908 6.79086 14 9 14C9.72857 14 10.4117 14.1948 11 14.5351V5.58884C11 5.57508 11 5.56136 11 5.54768C11 5.15455 10.9999 4.79381 11.0267 4.50105C11.0543 4.19955 11.1199 3.81652 11.3611 3.47174C11.6764 3.02093 12.1635 2.7199 12.7077 2.63949C13.1239 2.578 13.4958 2.69061 13.7779 2.80076C14.0517 2.90772 14.3743 3.06908 14.726 3.24492ZM11 18C11 16.8954 10.1046 16 9 16C7.89543 16 7 16.8954 7 18C7 19.1046 7.89543 20 9 20C10.1046 20 11 19.1046 11 18Z" fill="currentColor"/>
    </svg>
  );
}
