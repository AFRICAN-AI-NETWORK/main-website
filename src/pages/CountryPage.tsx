import NavBar from '@/components/layout/NavBar';
import EventCard from '@/components/simple/EventCard';
import { Button } from '@/components/ui/button';
import sanity from '@/lib/sanity';
import { Country } from '@/types';
import { PortableText } from '@portabletext/react'; // Adjusted for React
import { Loading, Notify } from 'notiflix';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CountryPage = () => {
  const [country, setCountry] = useState<Country | undefined>(undefined);
  const { name } = useParams();
  const navigate = useNavigate();

  const fetchData = (name: string) => {
    Loading.hourglass();

    sanity
      .fetch(
        `*[_type == "country" && name == '${name}'][0] {
      "id": _id,
      name,
      numMembers,
      socials,
      "events": *[_type == 'event' && references(^._id)] {
        title,
        description,
        linkToEvent,
        slug,
        "imageUrl": image.asset->url,
        location,
        date
      },
      "projects": *[_type == 'project' && references(^._id)] {
        name,
        description,
        linkToProject
      },
      "imageUrl": image.asset->url,
    }`
      )
      .then((responseData: Country) => {
        setCountry(responseData);
      })
      .catch(() => {
        Notify.failure(
          'Error fetching country information, please try again later'
        );
      })
      .finally(() => {
        Loading.remove();
      });
  };

  useEffect(() => {
    if (!name || Array.isArray(name)) {
      navigate('/'); // Redirect to home page if name is invalid
      return;
    }
    fetchData(name);
  }, [name, navigate]);

  return (
    <div>
      <header>
        <NavBar />
      </header>

      <main className="min-h-dvh pt-[150px] xl:pt-[150px] px-10 pb-10">
        {country ? (
          <div className="grid gap-5 xl:grid-cols-2">
            <div className="flex flex-col justify-between gap-5 xl:gap-2 xl:py-14">
              <div className="flex gap-4">
                <img
                  src={country.imageUrl}
                  className="h-24 w-24 min-h-0 min-w-0 bg-black bg-opacity-70"
                  alt=""
                />
                <div className="flex flex-col justify-center">
                  <h1 className="text-xl lg:text-3xl xl:text-4xl font-bold">
                    {country.name}
                  </h1>
                </div>
              </div>

              <div className="text-lg">
                <p>
                  <span className="font-bold">Members:</span>{' '}
                  {country.numMembers}
                </p>
                <p>
                  <span className="font-bold">Projects:</span>{' '}
                  {country.projects?.length || 0}
                </p>
                <p>
                  <span className="font-bold">Events:</span>{' '}
                  {country.events?.length || 0}
                </p>
              </div>

              <div className="flex gap-5">
                {country.socials.find(
                  (social) => social.platform.toLowerCase() === 'telegram'
                ) && (
                  <Button asChild>
                    <a
                      href={
                        country.socials.find(
                          (social) =>
                            social.platform.toLowerCase() === 'telegram'
                        )?.handle
                      }
                      className="flex gap-1 items-center border-2 border-primary text-primary hover:bg-slate-200 focus-visible:bg-slate-200 bg-white"
                    >
                      Telegram Group
                    </a>
                  </Button>
                )}
                {country.socials.find(
                  (social) => social.platform.toLowerCase() === 'whatsapp'
                ) && (
                  <Button asChild>
                    <a
                      href={
                        country.socials.find(
                          (social) =>
                            social.platform.toLowerCase() === 'whatsapp'
                        )?.handle
                      }
                      className="flex gap-1 items-center"
                    >
                      Whatsapp Group
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div className="hidden xl:block">
              <img
                src={country.imageUrl}
                className="h-96 w-full object-cover"
                alt="Country flag"
              />
            </div>
          </div>
        ) : (
          <div className="min-h-[inherit] grid content-center text-center">
            <h2 className="text-6xl font-bold pb-5">Country not found</h2>
            <Button
              className="text-xl w-fit mx-auto"
              onClick={() => navigate('/')}
            >
              Go back to home
            </Button>
          </div>
        )}

        {country?.events && country.events.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-2 text-xl lg:text-3xl font-bold">Events</h2>
            <div className="mt-5 grid gap-5">
              {country.events.map((event) => (
                <EventCard key={event.title} event={event} />
              ))}
            </div>
          </div>
        )}

        {country?.projects && country.projects.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-8 text-xl lg:text-3xl font-bold">Projects</h2>
            {country.projects.map((project, i) => (
              <div key={project.name} className="mb-5">
                <h3 className="font-bold lg:text-xl">
                  {i + 1}. {project.name}
                </h3>
                <div className="unreset">
                  <PortableText value={project.description} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CountryPage;
