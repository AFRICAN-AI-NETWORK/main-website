import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullScreen = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        fullScreen && 'fixed inset-0 bg-background/80 backdrop-blur-sm',
        className
      )}
    >
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
