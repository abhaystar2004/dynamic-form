import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 opacity-80 left-0 right-0 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 md:py-6 shadow-lg z-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <div className="text-center md:text-left text-xs md:text-sm">
          <p className="flex items-center justify-center md:justify-start">
            <span className="mr-2">©</span> 
            {new Date().getFullYear()} 
            <span className="ml-2 font-semibold">Dynamic Form by Abhay</span>
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-end space-x-2 w-full md:w-auto">
          <Link 
            href="/" 
            className="px-2 py-1 text-xs md:text-sm transition-colors duration-300 hover:bg-gray-700 rounded-md"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="px-2 py-1 text-xs md:text-sm transition-colors duration-300 hover:bg-gray-700 rounded-md"
          >
            Contact
          </Link>
          <Link 
            href="/privacy" 
            className="px-2 py-1 text-xs md:text-sm transition-colors duration-300 hover:bg-gray-700 rounded-md"
          >
            Privacy
          </Link>
          <Link 
            href="/terms" 
            className="px-2 py-1 text-xs md:text-sm transition-colors duration-300 hover:bg-gray-700 rounded-md"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;