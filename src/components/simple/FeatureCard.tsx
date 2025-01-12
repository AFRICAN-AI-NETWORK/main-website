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
        'flex flex-col gap-4 text-white p-6 md:p-8 rounded-xl',
        'w-full h-full shadow-lg transition-transform hover:scale-105',
        'items-start justify-center',
        secondary ? 'bg-secondary' : 'bg-primary'
      )}
    >
      {stats && (
        <h3 className="text-xl font-bold md:text-xl lg:text-4xl">{stats}</h3>
      )}
      <p className="text-xs md:text-base lg:text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
