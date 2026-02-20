import React from 'react';

export interface CurrencyYenProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function CurrencyYen({ 
  size = 24, 
  color = 'currentColor',
  className 
}: CurrencyYenProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M4.86957 2.72391C5.29821 2.37565 5.92801 2.44081 6.27627 2.86945L12 9.91422L17.724 2.86943C18.0723 2.4408 18.7021 2.37565 19.1308 2.72392C19.5594 3.0722 19.6245 3.702 19.2763 4.13063L14.101 10.5H18C18.5523 10.5 19 10.9477 19 11.5C19 12.0523 18.5523 12.5 18 12.5H13V14.5H17C17.5523 14.5 18 14.9477 18 15.5C18 16.0523 17.5523 16.5 17 16.5H13V20.5C13 21.0523 12.5523 21.5 12 21.5C11.4477 21.5 11 21.0523 11 20.5V16.5H7.00001C6.44773 16.5 6.00001 16.0523 6.00001 15.5C6.00001 14.9477 6.44773 14.5 7.00001 14.5H11V12.5H6.00001C5.44773 12.5 5.00001 12.0523 5.00001 11.5C5.00001 10.9477 5.44773 10.5 6.00001 10.5H9.89907L4.72403 4.13062C4.37577 3.70198 4.44093 3.07217 4.86957 2.72391Z" fill="currentColor"/>
    </svg>
  );
}
