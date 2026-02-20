import React from 'react';

export interface ChatProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function Chat({ 
  size = 24, 
  color = 'currentColor',
  className 
}: ChatProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      style={{ color }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect rx="8" fill="#AD79EF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30C18.6717 30 17.4015 29.7405 16.2392 29.2684C16.1342 29.2258 16.0736 29.2013 16.0289 29.1845C16.0236 29.1825 16.019 29.1808 16.015 29.1794L16.0103 29.18C15.9734 29.185 15.9231 29.1933 15.827 29.2093L12.2692 29.8023C12.2597 29.8039 12.2501 29.8055 12.2404 29.8071C12.0798 29.8339 11.9001 29.8639 11.744 29.8757C11.5739 29.8885 11.3031 29.893 11.017 29.7703C10.6633 29.6186 10.3814 29.3367 10.2297 28.983C10.107 28.6969 10.1115 28.4261 10.1243 28.256C10.1361 28.0999 10.1661 27.9202 10.1929 27.7596C10.1946 27.7499 10.1962 27.7403 10.1977 27.7308L10.7907 24.173C10.8067 24.0769 10.815 24.0266 10.82 23.9897L10.8206 23.9849C10.8192 23.981 10.8175 23.9764 10.8155 23.9711C10.7987 23.9264 10.7742 23.8658 10.7316 23.7608C10.2595 22.5985 10 21.3283 10 20Z" fill="currentColor"/>
    </svg>
  );
}
