import React from 'react';

export interface Hash02Props {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function Hash02({ 
  size = 24, 
  color = 'currentColor',
  className 
}: Hash02Props) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M9.66438 2.01364C10.2092 2.10444 10.5772 2.61966 10.4864 3.16443L9.84711 7.00003H15.8195L16.5136 2.83564C16.6044 2.29086 17.1196 1.92285 17.6644 2.01364C18.2091 2.10444 18.5772 2.61966 18.4864 3.16443L17.8471 7.00003H20.5C21.0523 7.00003 21.5 7.44775 21.5 8.00003C21.5 8.55232 21.0523 9.00003 20.5 9.00003H17.5138L16.5138 15H19.5C20.0523 15 20.5 15.4477 20.5 16C20.5 16.5523 20.0523 17 19.5 17H16.1804L15.4864 21.1644C15.3956 21.7092 14.8803 22.0772 14.3356 21.9864C13.7908 21.8956 13.4228 21.3804 13.5136 20.8356L14.1528 17H8.18045L7.48638 21.1644C7.39558 21.7092 6.88036 22.0772 6.33559 21.9864C5.79082 21.8956 5.4228 21.3804 5.51359 20.8356L6.15286 17H2.5C1.94772 17 1.5 16.5523 1.5 16C1.5 15.4477 1.94772 15 2.5 15H6.48619L7.48619 9.00003H3.5C2.94772 9.00003 2.5 8.55232 2.5 8.00003C2.5 7.44775 2.94772 7.00003 3.5 7.00003H7.81953L8.51359 2.83564C8.60439 2.29086 9.11961 1.92285 9.66438 2.01364ZM9.51378 9.00003L8.51378 15H14.4862L15.4862 9.00003H9.51378Z" fill="currentColor"/>
    </svg>
  );
}
