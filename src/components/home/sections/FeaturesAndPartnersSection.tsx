import FeatureCard from '@/components/simple/FeatureCard';
import PartnerChip from '@/components/simple/PartnerChip';
import SkeletonLoader from '@/components/simple/SkeletonLoader';
import sanity from '@/lib/sanity';
import { Feature, Partner } from '@/types';
import { Notify } from 'notiflix';
import React, { useEffect, useState } from 'react';

const FeaturesAndPartnersSection: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [fetchedFeatures, fetchedPartners] = await Promise.all([
        sanity.fetch(`*[_type == "feature"] {
          "id": _id,
          stats,
          description
        }`),
        sanity.fetch(`*[_type == "partner"] {
          "id": _id,
          name,
          "logo": logo.asset->url
        }`),
      ]);

      setFeatures(fetchedFeatures);
      setPartners(fetchedPartners);
    } catch {
      Notify.failure('Error loading data, please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Render loading state
  if (loading || (!loading && (features.length > 0 || partners.length > 0))) {
    return (
      <section id="features-and-partners" className="p-16 lg:p-20">
        {loading ? (
          <div className="flex flex-wrap justify-center gap-5 lg:px-32">
            {[...Array(4)].map((_, i) => (
              <SkeletonLoader key={i} variant="image-and-text" />
            ))}
          </div>
        ) : (
          <>
            {partners && partners.length > 0 && (
              <div className="flex flex-wrap justify-center gap-10 lg:px-32 mb-16">
                {partners.map((partner) => (
                  <PartnerChip
                    key={partner.id}
                    name={partner.name}
                    logo={partner.logo}
                  />
                ))}
              </div>
            )}

            {features && features.length > 0 && (
              <div className="grid md:grid-cols-2 gap-y-8 gap-x-16 lg:px-20">
                {features.map((feature, i) => (
                  <FeatureCard
                    key={feature.id}
                    secondary={i % 2 === 0}
                    stats={feature.stats}
                    description={feature.description}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    );
  }

  // If no content and not loading, return null or an empty fragment
  return null;
};

export default FeaturesAndPartnersSection;
