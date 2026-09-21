import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Narrower container for forms and legal copy. */
  narrow?: boolean;
}

export function Container({ children, className = '', narrow = false }: ContainerProps) {
  return (
    <div className={`mx-auto w-full ${narrow ? 'max-w-3xl' : 'max-w-7xl'} px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
