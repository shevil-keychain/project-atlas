import React from 'react';

export interface ArrowCircleBrokenUpProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function ArrowCircleBrokenUp({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ArrowCircleBrokenUpProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2.99988C7.02944 2.99988 3 7.02931 3 11.9999C3 15.3299 4.80801 18.2388 7.50073 19.7964C7.97879 20.073 8.14215 20.6847 7.8656 21.1628C7.58906 21.6408 6.97733 21.8042 6.49927 21.5277C3.21398 19.6272 1 16.0727 1 11.9999C1 5.92474 5.92487 0.999878 12 0.999878C18.0751 0.999878 23 5.92475 23 11.9999C23 16.0727 20.786 19.6272 17.5007 21.5277C17.0227 21.8042 16.4109 21.6408 16.1344 21.1628C15.8579 20.6847 16.0212 20.073 16.4993 19.7964C19.192 18.2388 21 15.3299 21 11.9999C21 7.02932 16.9706 2.99988 12 2.99988ZM7.29289 11.2928L11.2929 7.29284C11.6834 6.90232 12.3166 6.90232 12.7071 7.29284L16.7071 11.2928C17.0976 11.6834 17.0976 12.3165 16.7071 12.7071C16.3166 13.0976 15.6834 13.0976 15.2929 12.7071L13 10.4142V21.9999C13 22.5522 12.5523 22.9999 12 22.9999C11.4477 22.9999 11 22.5522 11 21.9999V10.4142L8.70711 12.7071C8.31658 13.0976 7.68342 13.0976 7.29289 12.7071C6.90237 12.3165 6.90237 11.6834 7.29289 11.2928Z" fill="currentColor"/>
    </svg>
  );
}
