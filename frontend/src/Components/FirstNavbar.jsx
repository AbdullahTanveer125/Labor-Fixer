import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/react.svg';

export default function FirstNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav className="w-full bg-white shadow-md px-4 md:px-8 py-3 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo and Website Name */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Labor-Fixer Logo" className="h-9 w-9 drop-shadow" />
          <span className="text-2xl font-extrabold text-blue-700 tracking-tight">Labor-Fixer</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-2 lg:gap-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-2 rounded-lg text-gray-700 font-semibold transition-all duration-200 hover:bg-blue-100 hover:text-blue-700 focus:bg-blue-200 focus:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Link to="/login_as_a">
            <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300">Login</button>
          </Link>
          <Link to="/employee-signup">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300">Sign-up</button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center text-3xl text-blue-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-fade-in z-40">
          <div className="flex flex-col items-center gap-2 py-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="w-11/12 text-center px-3 py-3 rounded-lg text-gray-700 font-semibold transition-all duration-200 hover:bg-blue-100 hover:text-blue-700 focus:bg-blue-200 focus:outline-none"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-2">
              <Link to="/login_as_a" onClick={() => setMenuOpen(false)}>
                <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300">Login</button>
              </Link>
              <Link to="/employee-signup" onClick={() => setMenuOpen(false)}>
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300">Sign-up</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
