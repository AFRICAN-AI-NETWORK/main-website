import NavBar from '@/components/layout/NavBar';
import AiToolCard from '@/components/simple/AiToolCard';
import sanity from '@/lib/sanity';
import { AiTool, Category } from '@/types';
import { Loading, Notify } from 'notiflix';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AiToolCategoryPage = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [tools, setTools] = useState<AiTool[]>([]);
  const [showing, setShowing] = useState(6);

  const increaseShowing = () => {
    setShowing((prev) => (prev + 6 > tools.length ? tools.length : prev + 6));
  };

  const fetchData = (categoryTitle: string) => {
    setLoading(true);
    Loading.hourglass();

    // Fetch category and tools from Sanity
    sanity
      .fetch(
        `*[_type == "aiToolCategory" && title == '${categoryTitle}'][0] {
        "id": _id,
        title,
        description,
        "tools": *[_type == "aiTool" && references(^._id)] {
          "id": _id,
          name,
          title,
          categories[]->,
          pricingModel,
          description,
          stars,
          body,
          siteUrl,
          verified,
          featured,
          "slug": slug.current,
          "authorName": author->name,
          "authorBio": author->bio,
          "authorImageUrl": author->image.asset->url,
          ytVideoUrl,
          "imageUrl": mainImage.asset->url,
          "imageAlt": mainImage.alt,
          "createdAt": _createdAt,
          "updatedAt": _updatedAt
        },
        "createdAt": _createdAt
      }`
      )
      .then((responseData: Category & { tools: AiTool[] }) => {
        setCategory(responseData);
        setTools(responseData.tools);
      })
      .catch(() => {
        Notify.failure('Error fetching category, please try again later');
      })
      .finally(() => {
        Loading.remove();
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!title || Array.isArray(title)) {
      navigate('/'); // Redirect to home page if title is invalid
      return;
    }
    fetchData(decodeURI(title));
  }, [title, navigate]);

  if (loading) return null; // You can show a loading spinner here

  return (
    <div>
      <NavBar />

      <main className="min-h-dvh pt-[150px] xl:pt-[150px] px-10 pb-10">
        {category ? (
          <>
            <div className="flex flex-col gap-4 items-center">
              <h1 className="text-5xl 2xl:text-7xl font-extrabold text-secondary">
                {category.title}
              </h1>
              <h2 className="text-lg 2xl:text-xl text-secondary">
                {category.description}
              </h2>
            </div>

            <div className="grid mt-16">
              {tools.length > 0 ? (
                <>
                  <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5">
                    {tools.slice(0, showing).map((tool) => (
                      <AiToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>

                  {showing < tools.length && (
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
          </>
        ) : (
          <p className="text-3xl text-center">Category Not Found</p>
        )}
      </main>
    </div>
  );
};

export default AiToolCategoryPage;
