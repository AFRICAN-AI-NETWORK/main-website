import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.svg';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed z-50 inset-0 bottom-auto grid grid-cols-2 md:flex justify-between items-center px-7 py-5 text-white ${
        transparent
          ? 'bg-black bg-opacity-10 backdrop-blur-md mix-blend-hard-light'
          : 'bg-primary'
      }`}
    >
      <Link to="/">
        <p className="sr-only">Back to Home</p>
        <img src={Logo} alt="AAN logo" className="italic h-10 lg:h-14" />
      </Link>

      <button
        type="button"
        className="justify-self-end md:hidden text-white hover:text-slate-100 focus-visible:text-slate-100 focus-visible:outline-none"
        onClick={toggleMenu}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
        </svg>
      </button>

      <ul
        className={`flex flex-col mt-3 md:flex-row md:mt-0 gap-5 ${
          isOpen ? 'flex' : 'hidden md:flex'
        }`}
      >
        <li>
          <Link
            to="/about"
            className="hover:text-blue-300 focus-visible:text-blue-300 transition-all"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/ai-tools"
            className="hover:text-blue-300 focus-visible:text-blue-300 transition-all"
          >
            AI Tools
          </Link>
        </li>
        <li>
          <Link
            to="/#resources"
            className="hover:text-blue-300 focus-visible:text-blue-300 transition-all"
          >
            Resources
          </Link>
        </li>
        <li>
          <Link
            to="/countries"
            className="hover:text-blue-300 focus-visible:text-blue-300 transition-all"
          >
            Countries
          </Link>
        </li>
        <li>
          <Link
            to="/courses"
            className="hover:text-blue-300 focus-visible:text-blue-300 transition-all"
          >
            Courses
          </Link>
        </li>
        <li>
          <Link
            to="/events"
            className="hover:text-blue-300 focus-visible:text-blue-300 transition-all"
          >
            Events
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
