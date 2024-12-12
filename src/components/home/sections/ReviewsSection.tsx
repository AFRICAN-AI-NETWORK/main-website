import WhiteRobot from '@/assets/white-robot.svg';
import React from 'react';

const ReviewsSection: React.FC = () => {
  return (
    <section
      id="reviews"
      className="flex flex-col-reverse xl:flex-row justify-between gap-x-5 gap-y-10 pt-20 px-16 pb-0 lg:px-20 bg-secondary text-white xl:min-h-screen"
    >
      <img
        src={WhiteRobot}
        className="mt-auto w-[clamp(30vw,_800px,_65vw)] self-center"
        alt=""
      />

      <div className="w-full h-full flex flex-col self-center gap-6 lg:gap-8 pb-10 text-center xl:text-right 2xl:place-items-end 2xl:gap-12 xl:w-full">
        <h1 className="text-[min(4rem,_10vw)] xl:text-8xl tracking-tighter font-bold">
          Why Africa?
        </h1>
        <p className="text-[min(2rem,_4vw)] xl:text-2xl 2xl:text-4xl">
          Africa is a rapidly evolving continent with immense potential for
          AI-driven transformation but it faces various challenges, such as
          limited access to resources, funding, and collaborative opportunities.
          The AFRICAN AI NETWORK was created to address these challenges and
          empower the African AI ecosystem to thrive.
        </p>
      </div>
    </section>
  );
};

export default ReviewsSection;
