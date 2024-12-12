import React from 'react';
import TextIcon from '@/assets/text.svg';
import { Link } from 'react-router-dom';

import { Category } from '@/types';

interface AiToolCategoryProps {
  category: Category;
}

const AiToolCategory: React.FC<AiToolCategoryProps> = ({ category }) => {
  return (
    <Link
      to={`/ai-tool-categories/${encodeURI(category.title)}`}
      className="flex text-secondary rounded-xl p-5 gap-2 shadow-lg"
    >
      <img src={TextIcon} className="h-16 w-16" alt="" />

      <div className="flex flex-col justify-between">
        <p className="text-lg font-bold">{category.title}</p>
        <p>{category.numTools} Tools</p>
      </div>
    </Link>
  );
};

export default AiToolCategory;
