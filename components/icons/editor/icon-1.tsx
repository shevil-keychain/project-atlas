import React from 'react';

export interface Icon1Props {
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function Icon1({ 
  size = 24, 
  color = 'currentColor',
  className 
}: Icon1Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 3 10"
      fill="none"
      className={className}
      style={{ color }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.97319 8.55301C2.97319 8.72497 2.91436 8.87431 2.7967 9.00102C2.68809 9.11868 2.5478 9.17751 2.37583 9.17751H1.9957C1.82374 9.17751 1.6744 9.11868 1.54769 9.00102C1.43003 8.87431 1.3712 8.72497 1.3712 8.55301V2.37584C1.3712 2.33963 1.35309 2.31701 1.31689 2.30795C1.28974 2.28985 1.26711 2.28985 1.24901 2.30795L1.04537 2.5116C0.936758 2.63831 0.791945 2.70166 0.610929 2.70166C0.520421 2.70166 0.438964 2.68356 0.366557 2.64736C0.248897 2.60211 0.158389 2.52517 0.0950333 2.41656C0.0316777 2.30795 0 2.19482 0 2.07716V1.54769C0 1.37572 0.0588301 1.22638 0.17649 1.09967L1.09967 0.190067C1.16303 0.135762 1.23091 0.0905087 1.30332 0.0543054C1.37572 0.0181021 1.45718 0 1.54769 0H2.37583C2.5478 0 2.68809 0.0588303 2.7967 0.176491C2.91436 0.294151 2.97319 0.443489 2.97319 0.624505V8.55301Z" fill="currentColor"/>
    </svg>
  );
}
