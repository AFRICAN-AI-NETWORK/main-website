import React, { useEffect, useState } from 'react';
import AiToolCard from '@/components/simple/AiToolCard';
import SkeletonLoader from '@/components/simple/SkeletonLoader';
import sanity from '@/lib/sanity';
import { Notify } from 'notiflix';
import { AiTool } from '@/types';

type Classification = 'all' | 'featured' | 'popular' | 'new';

const HeroSection: React.FC = () => {
  const [tools, setTools] = useState<AiTool[]>([]);
  const [showing, setShowing] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState<AiTool[]>([]);
  const [classifiedTools, setClassifiedTools] = useState<AiTool[]>([]);
  const [classification, setClassification] = useState<Classification>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    sanity
      .fetch(
        `*[_type == "aiTool"] | order(createdAt) {
        "id": _id,
        name,
        categories[]->,
        pricingModel,
        description,
        body,
        featured,
        stars,
        "slug": slug.current,
        "authorName": author->name,
        "authorImageUrl": author->image.asset->url,
        ytVideoUrl,
        "imageUrl": mainImage.asset->url,
        "imageAlt": mainImage.alt,
        "createdAt": _createdAt,
        "updatedAt": _updatedAt
      }`
      )
      .then((responseData: AiTool[]) => {
        setTools(responseData);
        setShowing(responseData.length > 5 ? 5 : responseData.length);
      })
      .catch(() => {
        Notify.failure('Error fetching tools, please try again later');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTools(
        classification === 'all'
          ? tools.filter((tool) =>
              tool.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : classifiedTools.filter((tool) =>
              tool.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
      );
    }
  }, [searchQuery, tools, classifiedTools, classification]);

  const classifyTools = (newClassification: Classification) => {
    setClassification(newClassification);

    if (newClassification === 'featured') {
      setClassifiedTools(tools.filter((tool) => tool.featured));
    } else if (newClassification === 'popular') {
      setClassifiedTools(tools.filter((tool) => tool.stars && tool.stars > 0));
    } else if (newClassification === 'new') {
      setClassifiedTools(
        tools
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5)
      );
    }

    setShowing(
      newClassification !== 'all'
        ? classifiedTools.length > 5
          ? 5
          : classifiedTools.length
        : tools.length > 5
        ? 5
        : tools.length
    );
  };

  const increaseShowing = () => {
    setShowing((prev) => (prev + 5 > tools.length ? tools.length : prev + 5));
  };

  return (
    <section className="min-h-screen grid pt-10 px-5 pb-5 lg:place-items-center">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-5xl 2xl:text-7xl font-extrabold">
          Discover what AI can do for you
        </h1>
        <h2 className="text-xl 2xl:text-2xl font-bold">
          We've helped professionals leverage AI by helping them find the best
          AI tools.
        </h2>

        <div className="flex self-start lg:self-auto w-fit max-w-[90%] p-1 lg:p-2 my-5 border-4 border-primary rounded-full text-xs md:text-sm lg:text-base">
          <input
            type="search"
            placeholder="Enter name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent min-w-0 m-0 outline-none px-4 py-2 placeholder:text-secondary placeholder:opacity-70"
            aria-label="Search for AI Tool"
          />
          <button
            type="button"
            className="bg-primary rounded-full font-semibold p-3 text-white"
          >
            Search AI Tools
          </button>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-white">
          <p className="py-3 px-8 rounded-full bg-primary">Marketing</p>
          <p className="py-3 px-8 rounded-full bg-primary">Productivity</p>
          <p className="py-3 px-8 rounded-full bg-primary">Design</p>
          <p className="py-3 px-8 rounded-full bg-primary">Research</p>
          <p className="py-3 px-8 rounded-full bg-primary">More</p>
        </div>
      </div>

      <div className="mt-20 xl:mt-32 flex flex-col lg:px-16 w-full">
        <div className="flex flex-wrap gap-2 text-sm text-white">
          {['all', 'featured', 'popular', 'new'].map((type) => (
            <label
              key={type}
              className={`py-3 px-8 rounded-full bg-secondary cursor-pointer ${
                classification === type
                  ? 'bg-primary outline outline-1 outline-secondary'
                  : ''
              }`}
            >
              <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
              <input
                type="radio"
                name="classification"
                value={type}
                checked={classification === type}
                onChange={() => classifyTools(type as Classification)}
                hidden
              />
            </label>
          ))}
        </div>

        {loading ? (
          <div className="mt-5 flex flex-wrap gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonLoader key={i} variant="image" />
            ))}
          </div>
        ) : searchQuery ? (
          filteredTools.length > 0 ? (
            <div className="mt-5 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5">
              {filteredTools.map((tool) => (
                <AiToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <p className="font-semibold text-lg mt-5">No search result</p>
          )
        ) : classification !== 'all' ? (
          classifiedTools.length > 0 ? (
            <>
              <div className="mt-5 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5">
                {classifiedTools.slice(0, showing).map((tool) => (
                  <AiToolCard key={tool.id} tool={tool} />
                ))}
              </div>
              {showing !== classifiedTools.length && (
                <button
                  onClick={increaseShowing}
                  className="mt-5 bg-primary text-white rounded-full px-8 py-2 w-fit mx-auto"
                >
                  See More
                </button>
              )}
            </>
          ) : (
            <p className="font-semibold text-lg mt-5">
              No tool fits the filter
            </p>
          )
        ) : tools.length > 0 ? (
          <>
            <div className="mt-5 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5">
              {tools.slice(0, showing).map((tool) => (
                <AiToolCard key={tool.id} tool={tool} />
              ))}
            </div>
            {showing !== tools.length && (
              <button
                onClick={increaseShowing}
                className="mt-5 bg-primary text-white rounded-full px-8 py-2 w-fit mx-auto"
              >
                See More
              </button>
            )}
          </>
        ) : (
          <p className="font-semibold text-lg mt-5">No tool found</p>
        )}
      </div>
    </section>
  );
};

export default HeroSection;