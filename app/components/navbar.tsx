'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white/60 backdrop-filter backdrop-blur-md top-0 shadow-md fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          </Link>
        </div>
        <div className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                About
              </Link>
            </li>
            <li>
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {menuOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 011.414 
                  1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 
                  13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 
                  12 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 6a1 1 0 011-1h16a1 1 0 110 2H4a1 
                  1 0 01-1-1zM3 12a1 1 0 011-1h16a1 1 0 
                  110 2H4a1 1 0 01-1-1zM4 17a1 1 0 100 
                  2h16a1 1 0 100-2H4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center justify-center z-10">
          <ul className="text-center items-center justify-center align-middle p-10">
            <li className='p-4'>
              <Link
                href="/"
                onClick={toggleMenu}
                className="text-2xl text-gray-700 hover:text-gray-900"
              >
                Home
              </Link>
            </li>
            <li className='p-4'>
              <Link
                href="/"
                onClick={toggleMenu}
                className="text-2xl text-gray-700 hover:text-gray-900"
              >
                About
              </Link>
            </li>
            <li className='p-4'>
              <Link
                href="/"
                onClick={toggleMenu}
                className="text-2xl text-gray-700 hover:text-gray-900"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;