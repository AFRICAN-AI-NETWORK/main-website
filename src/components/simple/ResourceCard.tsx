import { Resource } from '@/types';
import React from 'react';
import { Link } from 'react-router-dom';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <Link to={`/resources/${encodeURI(resource.slug)}`}>
      <img
        src={resource.imageUrl}
        alt={resource.imageAlt}
        className="h-72 w-full italic object-cover rounded-3xl"
      />

      <h3 className="mt-8 text-2xl text-secondary font-bold">
        {resource.title}
      </h3>
    </Link>
  );
};

export default ResourceCard;
