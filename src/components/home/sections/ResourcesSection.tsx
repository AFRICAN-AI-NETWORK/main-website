import ResourceCard from '@/components/simple/ResourceCard';
import SkeletonLoader from '@/components/simple/SkeletonLoader';
import sanity from '@/lib/sanity';
import { Resource } from '@/types';
import { Notify } from 'notiflix';
import React, { useEffect, useState } from 'react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ResourcesSection: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setLoading(true);

    sanity
      .fetch(
        `*[_type == "resource"] | order(createdAt) {
        "id": _id,
        title,
        "category": category->title,
        body,
        "slug": slug.current,
        "authorName": author->name,
        "authorImageUrl": author->image.asset->url,
        "imageUrl": mainImage.asset->url,
        "imageAlt": mainImage.alt,
        "createdAt": _createdAt,
        "updatedAt": _updatedAt
      }`
      )
      .then((responseData: Resource[]) => {
        setResources(responseData);
      })
      .catch(() => {
        Notify.failure('Error fetching resources, please try again later');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const modules = [Navigation, Pagination, A11y];

  return (
    <section id="resources" className="p-16 lg:p-20">
      <h2 className="uppercase text-primary font-bold text-4xl">Resources:</h2>

      <div className="mt-10">
        {loading ? (
          <div className="flex flex-wrap gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonLoader key={i} variant="image" />
            ))}
          </div>
        ) : resources.length > 0 ? (
          <Swiper
            modules={modules}
            slidesPerView={screenWidth < 1024 ? 1 : 2.6}
            spaceBetween={50}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {resources.map((resource) => (
              <SwiperSlide key={resource.id}>
                <ResourceCard resource={resource} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-2xl text-secondary font-bold">
            No resources found, check again later.
          </p>
        )}
      </div>
    </section>
  );
};

export default ResourcesSection;
