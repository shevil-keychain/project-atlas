import React from 'react';

export interface ArrowCircleBrokenDownRightProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ArrowCircleBrokenDownRight({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ArrowCircleBrokenDownRightProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M18.3639 5.63603C16.0093 3.28135 12.6739 2.5029 9.66845 3.30551C9.13486 3.44801 8.58679 3.13096 8.44429 2.59738C8.3018 2.06379 8.61884 1.51572 9.15243 1.37323C12.8193 0.393987 16.8983 1.3419 19.7782 4.22181C24.0739 8.51758 24.0739 15.4824 19.7782 19.7782C15.4824 24.0739 8.51758 24.0739 4.22181 19.7782C1.3419 16.8983 0.393986 12.8193 1.37323 9.15243C1.51572 8.61884 2.06379 8.3018 2.59738 8.44429C3.13096 8.58679 3.44801 9.13486 3.30551 9.66845C2.5029 12.6739 3.28135 16.0093 5.63603 18.3639C9.15075 21.8787 14.8492 21.8787 18.3639 18.3639C21.8787 14.8492 21.8787 9.15075 18.3639 5.63603ZM4.29283 4.29284C4.68335 3.90231 5.31651 3.90231 5.70704 4.29283L14.0001 12.5858V8.99999C14.0001 8.44771 14.4478 7.99999 15.0001 7.99999C15.5524 7.99999 16.0001 8.44771 16.0001 8.99999V15C16.0001 15.5523 15.5524 16 15.0001 16H9.00013C8.44784 16 8.00013 15.5523 8.00013 15C8.00013 14.4477 8.44784 14 9.00013 14H12.5859L4.29284 5.70705C3.90231 5.31653 3.90231 4.68336 4.29283 4.29284Z" fill="currentColor"/>
    </svg>
  );
}
