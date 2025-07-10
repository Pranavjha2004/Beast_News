import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${isScrolled ? 'bg-zinc-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      
      <div className="flex justify-between items-center px-4 sm:px-12 py-4 sm:py-6 text-zinc-400">
        {/* Logo */}
        <h1 className="text-3xl sm:text-5xl font-bold cursor-pointer"><Link to="/" smooth={true} duration={500} offset={-80}>News Beast</Link></h1>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex gap-8 text-lg sm:text-xl">
          <li className="hover:text-zinc-200 cursor-pointer">
            <Link to="headlines" smooth={true} duration={500} offset={-120}>Headlines</Link>
          </li>
          <li className="hover:text-zinc-200 cursor-pointer">
            <Link to="general" smooth={true} duration={500} offset={-120}>General</Link>
          </li>
        </ul>

        {/* Hamburger */}
        <div className="sm:hidden z-50" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="sm:hidden flex flex-col items-center bg-zinc-500/90 backdrop-blur-md py-4 space-y-4 text-lg slide-down">
          <Link onClick={toggleMenu} to="headlines" smooth={true} duration={500} offset={-80} className="hover:text-zinc-300">
            Headlines
          </Link>
          <Link onClick={toggleMenu} to="general" smooth={true} duration={500} offset={-80} className="hover:text-zinc-300">
            General
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
