import Navbar from '@/components/layout/NavBar';

const AboutPage = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="min-h-dvh pt-[150px] xl:pt-[150px] px-10 pb-10">
        <h1
          className="text-2xl lg:text-4xl xl:text-6xl font-bold"
          aria-describedby="about-us"
        >
          About Us
        </h1>

        <div className="grid gap-2 text-lg font-semibold mt-10" id="about-us">
          <p>
            In this rapidly evolving digital age, Artificial Intelligence (AI)
            has emerged as a transformative force with the potential to reshape
            our world. In Africa, a continent brimming with talent, innovation,
            and untapped potential, AI represents a beacon of hope, a catalyst
            for economic growth, and a tool for solving some of our most
            pressing challenges.
          </p>

          <p>
            At AAN (African AI Network), we recognize the immense power of AI to
            drive positive change across the continent. Our vision is to foster
            a thriving AI ecosystem in Africa, where innovation flourishes,
            talent is nurtured, and AI is harnessed for the greater good of all
            Africans.
          </p>

          <p>
            We believe that AI is not just a technological advancement; it is a
            tool for empowerment. By democratizing access to AI education and
            resources, we are empowering individuals and communities to create
            their own futures, to build innovative solutions to local problems,
            and to contribute to a more prosperous and equitable Africa.
          </p>
        </div>

        <h2
          className="mt-10 text-xl lg:text-3xl xl:text-5xl font-bold"
          aria-describedby="mission"
        >
          Mission
        </h2>
        <ol className="mt-5 ml-7 list-decimal" id="mission">
          <li>
            <span className="font-bold">Empowerment:</span> To empower
            individuals and communities across Africa with the knowledge,
            skills, and resources to harness the transformative power of AI.
          </li>
          <li>
            <span className="font-bold">Innovation:</span> To foster a culture
            of innovation and entrepreneurship in the African AI ecosystem,
            encouraging the development of cutting-edge AI solutions that
            address local needs and global challenges.
          </li>
          <li>
            <span className="font-bold">Collaboration:</span> To build a
            collaborative and inclusive network of AI stakeholders across
            Africa, including researchers, entrepreneurs, policymakers,
            educators, and civil society organizations.
          </li>
          <li>
            <span className="font-bold">Advocacy:</span> To advocate for
            responsible and ethical AI development and deployment in Africa,
            ensuring that AI is used for the benefit of all Africans and not to
            exacerbate existing inequalities.
          </li>
          <li>
            <span className="font-bold">Impact:</span> To measure and
            demonstrate the tangible impact of AI on African societies,
            economies, and environments, showcasing the positive transformation
            that AI can bring to the continent.
          </li>
        </ol>

        <h2
          className="mt-10 text-xl lg:text-3xl xl:text-5xl font-bold"
          aria-describedby="vision"
        >
          Vision
        </h2>
        <p className="mt-5" id="vision">
          A vibrant and inclusive Africa where artificial intelligence (AI) is
          harnessed to drive sustainable development, economic prosperity, and
          social progress for all. We envision a future where AI-powered
          solutions address Africa's unique challenges, empower individuals and
          communities, and create opportunities for a brighter future.
        </p>
      </main>
    </>
  );
};

export default AboutPage;
