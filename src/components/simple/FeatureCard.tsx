import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  stats?: string;
  description: string;
  secondary?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  stats,
  description,
  secondary = false,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col lg:flex-col gap-7 text-white p-5 rounded-xl content-center justify-center',
        secondary ? 'bg-secondary' : 'bg-primary'
      )}
    >
      {stats && <p className="text-3xl xl:text-5xl">{stats}</p>}
      <p className="text-lg xl:text-2xl">{description}</p>
    </div>
  );
};

export default FeatureCard;
