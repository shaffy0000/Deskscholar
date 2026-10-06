import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  wide?: boolean;
}

export function Container({ children, className, narrow = false, wide = false }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-10',
        narrow ? 'max-w-3xl' : wide ? 'max-w-[1440px]' : 'max-w-[1200px]',
        className,
      )}
    >
      {children}
    </div>
  );
}
