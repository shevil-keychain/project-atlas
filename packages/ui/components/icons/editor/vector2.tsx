import React from 'react';

export interface Vector2Props {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function Vector2({ 
  size = 24, 
  color = 'currentColor',
  className 
}: Vector2Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 4 10"
      fill="none"
      className={className}
      style={{ color }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.08046 8.86159C3.08046 9.03976 3.0195 9.19448 2.8976 9.32577C2.78507 9.44767 2.63972 9.50862 2.46155 9.50862H2.0677C1.88953 9.50862 1.73481 9.44767 1.60353 9.32577C1.48162 9.19448 1.42067 9.03976 1.42067 8.86159V2.46155C1.42067 2.42404 1.40191 2.4006 1.3644 2.39122C1.33627 2.37247 1.31283 2.37247 1.29407 2.39122L1.08308 2.60221C0.970555 2.73349 0.820517 2.79914 0.632971 2.79914C0.539197 2.79914 0.454801 2.78038 0.379782 2.74287C0.257877 2.69599 0.164104 2.61628 0.0984622 2.50375C0.0328208 2.39122 0 2.274 0 2.1521V1.60353C0 1.42536 0.0609529 1.27063 0.182858 1.13935L1.13935 0.196924C1.20499 0.14066 1.27532 0.0937733 1.35034 0.0562639C1.42536 0.0187544 1.50975 0 1.60353 0H2.46155C2.63972 0 2.78507 0.0609528 2.8976 0.182858C3.0195 0.304764 3.08046 0.45949 3.08046 0.647037V8.86159Z" fill="currentColor"/>
    </svg>
  );
}
