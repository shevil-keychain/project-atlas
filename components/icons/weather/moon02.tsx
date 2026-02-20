import React from 'react';

export interface Moon02Props {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function Moon02({ 
  size = 24, 
  color = 'currentColor',
  className 
}: Moon02Props) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9977 1.74343C12.1398 2.19279 11.9489 2.68037 11.5395 2.91375C9.4232 4.11995 8 6.39446 8 9.00012C8 12.8661 11.134 16.0001 15 16.0001C17.6055 16.0001 19.8798 14.5771 21.0861 12.4612C21.3195 12.0517 21.8071 11.8608 22.2564 12.003C22.7058 12.1451 22.9949 12.5817 22.9504 13.0509C22.4206 18.6335 17.7208 22.9999 12 22.9999C5.92487 22.9999 1 18.075 1 11.9999C1 6.27878 5.36684 1.57878 10.9499 1.04942C11.4191 1.00494 11.8556 1.29408 11.9977 1.74343ZM7.3151 4.31368C4.72743 5.89448 3 8.74573 3 11.9999C3 16.9704 7.02944 20.9999 12 20.9999C15.2539 20.9999 18.105 19.2727 19.6858 16.6854C18.3212 17.5192 16.7169 18.0001 15 18.0001C10.0294 18.0001 6 13.9707 6 9.00012C6 7.28292 6.48105 5.6784 7.3151 4.31368Z" fill="currentColor"/>
    </svg>
  );
}
