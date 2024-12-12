import { Button } from '@/components/ui/button';
import { Country } from '@/types';
import React from 'react';
import { Link } from 'react-router-dom';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className="rounded-3xl p-4 shadow-[0px_0px_10px_5px_#00000024]">
      <div className="relative">
        <img
          src={country.imageUrl}
          className="rounded-xl w-full h-52"
          alt="Country Cover Image"
        />
        <Button
          asChild
          className="absolute left-1/2 -translate-x-1/2 -bottom-2"
        >
          <Link to={`/countries/${country.name}`}>Visit Country</Link>
        </Button>
      </div>
      <p className="mt-3 text-sm lg:text-2xl font-bold text-wrap text-center object-contain">
        {country.name.toUpperCase()}
      </p>
    </div>
  );
};

export default CountryCard;
