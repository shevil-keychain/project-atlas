import React from 'react';

export interface ConversationProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function Conversation({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ConversationProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M7.08684 6.34511C8.46681 4.89514 10.371 4 12.4762 4C16.6841 4 20.0952 7.58172 20.0952 12C20.0952 16.4183 16.6841 20 12.4762 20C9.00406 20 6.0721 17.5605 5.15482 14.2227C5.00899 13.6921 4.4811 13.3861 3.97573 13.5392C3.47036 13.6923 3.1789 14.2466 3.32473 14.7773C4.47096 18.9481 8.1329 22 12.4762 22C17.736 22 22 17.5228 22 12C22 6.47715 17.736 2 12.4762 2C9.84534 2 7.46212 3.12139 5.73951 4.93138C5.13033 5.57146 4.47798 6.36248 3.90476 7.09444V4C3.90476 3.44772 3.47837 3 2.95238 3C2.4264 3 2 3.44772 2 4V10C2 10.5523 2.4264 11 2.95238 11H8.66667C9.19265 11 9.61905 10.5523 9.61905 10C9.61905 9.44772 9.19265 9 8.66667 9H4.88647C5.54573 8.13128 6.3652 7.10335 7.08684 6.34511ZM13.1689 8.46606C13.1689 7.91378 12.7212 7.46606 12.1689 7.46606C11.6166 7.46606 11.1689 7.91378 11.1689 8.46606V12.221C11.1689 12.8624 11.4993 13.4585 12.0432 13.7985L15.4004 15.8967C15.8688 16.1894 16.4857 16.0471 16.7784 15.5787C17.0711 15.1104 16.9288 14.4935 16.4604 14.2007L13.1689 12.1435V8.46606Z" fill="currentColor"/>
    </svg>
  );
}
