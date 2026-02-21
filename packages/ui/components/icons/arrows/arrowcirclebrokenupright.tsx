import React from 'react';

export interface ArrowCircleBrokenUpRightProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ArrowCircleBrokenUpRight({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ArrowCircleBrokenUpRightProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M18.3639 5.63604C14.8492 2.12132 9.15075 2.12132 5.63603 5.63604C3.28135 7.99071 2.5029 11.3261 3.30551 14.3315C3.44801 14.8651 3.13096 15.4132 2.59738 15.5557C2.06379 15.6982 1.51572 15.3811 1.37323 14.8476C0.393987 11.1807 1.3419 7.10174 4.22181 4.22183C8.51758 -0.0739417 15.4824 -0.0739419 19.7782 4.22183C24.0739 8.51759 24.0739 15.4824 19.7782 19.7782C16.8983 22.6581 12.8193 23.606 9.15243 22.6268C8.61884 22.4843 8.3018 21.9362 8.44429 21.4026C8.58679 20.869 9.13486 20.552 9.66845 20.6945C12.6739 21.4971 16.0093 20.7186 18.3639 18.364C21.8787 14.8492 21.8787 9.15076 18.3639 5.63604ZM8.00013 9.0001C8.00013 8.44782 8.44784 8.0001 9.00012 8.0001H15.0001C15.5524 8.0001 16.0001 8.44782 16.0001 9.0001V15.0001C16.0001 15.5524 15.5524 16.0001 15.0001 16.0001C14.4478 16.0001 14.0001 15.5524 14.0001 15.0001V11.4143L5.70704 19.7072C5.31651 20.0977 4.68334 20.0977 4.29282 19.7071C3.9023 19.3166 3.90231 18.6835 4.29284 18.2929L12.5859 10.0001H9.00012C8.44784 10.0001 8.00013 9.55239 8.00013 9.0001Z" fill="currentColor"/>
    </svg>
  );
}
