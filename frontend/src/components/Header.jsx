import React, { useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 relative">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="./images/logo.png" alt="Logo" className="h-8 w-auto" />
          <div className="text-xl font-bold" >BiteBalance</div>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="http://localhost:5173/dashboard" className="hover:text-gray-700">Dashboard</a>
          <a href="http://localhost:5173/ReciepePage" className="hover:text-gray-700">Reciepe</a>
          <a href="http://localhost:5173/Inventory" className="hover:text-gray-700">Inventory</a>
          <a href="http://localhost:5173/Notification" className="hover:text-gray-700">Notification</a>
          <a href="#contact" className="hover:text-gray-700">Contact</a>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <a href="http://localhost:5173/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
          <a href="http://localhost:5173/ReciepePage" className="block px-4 py-2 hover:bg-gray-100">Reciepe</a>
          <a href="http://localhost:5173/Inventory" className="block px-4 py-2 hover:bg-gray-100">Inventory</a>
          <a href="http://localhost:5173/Notification" className="block px-4 py-2 hover:bg-gray-100">Notification</a>
          <a href="#contact" className="block px-4 py-2 hover:bg-gray-100">Contact</a>
        </div>
      )}
    </header>
  );
}

export default Header;