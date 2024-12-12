import React, { useEffect, useState } from 'react';
import AiToolCategory from '@/components/simple/AiToolCategory';
import SkeletonLoader from '@/components/simple/SkeletonLoader';
import sanity from '@/lib/sanity';
import { Notify } from 'notiflix';

interface Category {
  id: string;
  title: string;
  description: string;
  numTools: number;
  createdAt: string;
}

const AiToolCategoriesSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [numTools, setNumTools] = useState(0);

  useEffect(() => {
    setLoading(true);

    sanity
      .fetch(
        `*[_type == "aiToolCategory"] | order(createdAt) {
        "id": _id,
        title,
        description,
        "numTools": count(*[_type == 'aiTool' && references(^._id)]),
        "createdAt": _createdAt
      }`
      )
      .then((responseData: Category[]) => {
        setCategories(responseData);
      })
      .catch(() => {
        Notify.failure('Error fetching categories, please try again later');
      })
      .finally(() => {
        setLoading(false);
      });

    sanity.fetch('count(*[_type == "aiTool"])').then((responseData: number) => {
      setNumTools(responseData);
    });
  }, []);

  return (
    <section className="py-20 px-5 2xl:px-0">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-5xl 2xl:text-7xl font-extrabold text-secondary">
          AI Tool Categories
        </h1>
        <h2 className="text-lg 2xl:text-xl text-secondary">
          We've categorized {numTools} AI tool{numTools !== 1 ? 's' : ''} into{' '}
          {categories.length}{' '}
          {categories.length !== 1 ? 'categories' : 'category'}
        </h2>
      </div>

      <div className="mt-5 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5 lg:px-16">
        {loading || categories.length > 0 ? (
          loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonLoader key={i} variant="image" />
            ))
          ) : (
            categories.map((category) => (
              <AiToolCategory key={category.id} category={category} />
            ))
          )
        ) : (
          <p className="mt-5 lg:px-16 text-lg font-semibold">
            No category found
          </p>
        )}
      </div>
    </section>
  );
};

export default AiToolCategoriesSection;
