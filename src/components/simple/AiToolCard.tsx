import React from 'react';
import {
  BookmarkIcon,
  ExternalLinkIcon,
  Star,
  VerifiedIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { AiTool } from '@/types';

interface AiToolCardProps {
  tool: AiTool;
  featured?: boolean;
}

const AiToolCard: React.FC<AiToolCardProps> = ({ tool, featured = false }) => {
  // Generate star rating
  const renderStars = () => {
    const fullStars = tool.stars;
    const emptyStars = 5 - fullStars;

    return (
      <p className="flex gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="h-5 w-5 fill-yellow-400 text-yellow-400"
          />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className="h-5 w-5 fill-gray-400 text-gray-400"
          />
        ))}
      </p>
    );
  };

  return (
    <div
      className={`bg-primary text-white rounded-xl p-5 ${
        featured ? 'shadow-lg !bg-white !text-black' : ''
      }`}
    >
      <div className="flex gap-2">
        <img
          src={tool.imageUrl}
          className="self-center h-16 w-16 min-h-0 min-w-0 rounded-xl bg-black bg-opacity-70"
          alt={tool.imageAlt}
        />
        <div className="flex flex-col justify-center">
          <p className="text-lg font-bold">{tool.name}</p>

          {renderStars()}

          {featured && tool.verified && (
            <p className="mt-2 flex text-primary">
              <VerifiedIcon className="fill-primary stroke-white" />
              Verified
            </p>
          )}
        </div>
      </div>

      <p className="mt-2 font-semibold">
        {featured && <span className="font-semibold">Pricing Model: </span>}
        {tool.pricingModel}
      </p>

      <p className="mt-3 text-sm line-clamp-2 overflow-ellipsis">
        {tool.description}
      </p>

      {featured ? (
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            className="text-sm flex gap-1 items-center border-2 border-primary text-primary hover:bg-slate-200 focus-visible:bg-slate-200 bg-white"
          >
            <BookmarkIcon /> 0
          </Button>
          <a className="text-sm items-center gap-1 flex" href={tool.siteUrl}>
            Visit Site <ExternalLinkIcon />
          </a>
        </div>
      ) : (
        <Button
          asChild
          className="block w-fit ml-auto mt-3 p-2 rounded-lg border-2 border-white text-sm"
        >
          <Link to={`/ai-tools/${tool.slug}`}>See More</Link>
        </Button>
      )}
    </div>
  );
};

export default AiToolCard;
