import React from 'react';

export interface ArrowCircleBrokenDownLeftProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ArrowCircleBrokenDownLeft({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ArrowCircleBrokenDownLeftProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M14.3315 3.30551C11.3261 2.5029 7.99071 3.28135 5.63604 5.63603C2.12132 9.15075 2.12132 14.8492 5.63604 18.3639C9.15076 21.8787 14.8492 21.8787 18.364 18.3639C20.7186 16.0093 21.4971 12.6739 20.6945 9.66845C20.552 9.13486 20.869 8.58679 21.4026 8.44429C21.9362 8.3018 22.4843 8.61884 22.6268 9.15243C23.606 12.8193 22.6581 16.8983 19.7782 19.7782C15.4824 24.0739 8.51759 24.0739 4.22183 19.7782C-0.0739412 15.4824 -0.0739419 8.51758 4.22182 4.22181C7.10174 1.3419 11.1807 0.393986 14.8476 1.37323C15.3811 1.51572 15.6982 2.06379 15.5557 2.59738C15.4132 3.13096 14.8651 3.44801 14.3315 3.30551ZM19.7071 4.29282C20.0977 4.68334 20.0977 5.31651 19.7072 5.70704L11.4144 14H15.0002C15.5525 14 16.0002 14.4477 16.0002 15C16.0002 15.5523 15.5525 16 15.0002 16H9.00023C8.44795 16 8.00023 15.5523 8.00023 15V8.99999C8.00023 8.44771 8.44795 7.99999 9.00023 7.99999C9.55252 7.99999 10.0002 8.44771 10.0002 8.99999V12.5857L18.2929 4.29284C18.6835 3.90231 19.3166 3.9023 19.7071 4.29282Z" fill="currentColor"/>
    </svg>
  );
}
