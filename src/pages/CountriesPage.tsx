import NavBar from '@/components/layout/NavBar';
import CountryCard from '@/components/simple/CountryCard';
import sanity from '@/lib/sanity';
import { Country } from '@/types';
import { Loading, Notify } from 'notiflix';
import { useEffect, useState } from 'react';

const CountriesPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    Loading.hourglass();

    sanity
      .fetch(
        `*[_type == "country"] | order(name) {
        "id": _id,
        name,
        numMembers,
        socials,
        "imageUrl": image.asset->url,
      }`
      )
      .then((responseData: Country[]) => {
        setCountries(responseData);
      })
      .catch(() => {
        Notify.failure('Error fetching countries, please try again later');
      })
      .finally(() => {
        Loading.remove();
      });
  }, []);

  return (
    <div>
      <header>
        <NavBar />
      </header>

      <main className="min-h-dvh pt-[150px] xl:pt-[150px] px-10 pb-10">
        <h1
          className="mb-2 text-2xl lg:text-4xl xl:text-6xl font-bold"
          aria-describedby="about-us"
        >
          Countries
        </h1>
        <p className="w-min(10rem,_100%)">
          Explore the progress of the African AI Network's (AAN) initiatives in
          transforming individual countries through the power of artificial
          intelligence. From job creation to economic growth, witness firsthand
          the impact of AI on the African landscape.
        </p>

        <div className="mt-5 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-5">
          {countries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CountriesPage;
