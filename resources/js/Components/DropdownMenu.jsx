import { Link } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
const DropdownMenu = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-right" ref={dropdownRef}>
      {/* زر الثلاث نقاط */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {/* القائمة المنسدلة */}
      {isOpen && (
        <div className="z-10 origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {options.map((option) => (
              <React.Fragment>
                {option.type === 'link' &&
                 <Link
                 href={option.href}
                   key={option.label}
                   className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                   role="menuitem"
                 >
                   {option.label}
                 </Link>
                }
                 {option.type === 'button' &&
              <button
                key={option.label}
                onClick={option.onClick}
                className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {option.label}
              </button>
               }
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;