import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaBell, FaComment } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import logo from '../assets/react.svg';

export default function EmployeeNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Searching for:', searchQuery);
    };

    return (
        <nav className="w-full bg-blue-600 shadow-md px-4 md:px-8 py-3 fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left: Logo and Website Name */}
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="h-9 w-9 drop-shadow" />
                        <span className="text-2xl font-extrabold text-white tracking-tight hidden sm:inline">Labor-Fixer</span>
                    </Link>
                </div>

                {/* Middle: Search Bar - Hidden on mobile by default */}
                <div className={`${searchOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full md:top-auto left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none px-4 md:px-0 py-3 md:py-0 z-40`}>
                    <form onSubmit={handleSearch} className="flex max-w-md mx-auto md:mx-0">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search jobs, services or freelancers..."
                                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700 focus:outline-none"
                            >
                                <FaSearch color='white'/>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right: Icons and Profile */}
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Mobile Search Button - Hidden on desktop */}
                    <button
                        className="md:hidden flex items-center text-xl text-white focus:outline-none"
                        onClick={() => setSearchOpen(!searchOpen)}
                        aria-label="Search"
                    >
                        <FaSearch />
                    </button>

                    {/* Messages Icon - Hidden on mobile if space is tight */}
                    <Link to="/messages" className="hidden sm:flex relative text-xl text-white hover:text-blue-100 transition-colors">
                        <FaComment />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                    </Link>

                    {/* Notifications Bell */}
                    <button className="relative text-xl text-white hover:text-blue-100 transition-colors focus:outline-none">
                        <FaBell />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">5</span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center gap-1 focus:outline-none"
                            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                        >
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                                JD
                            </div>
                            <IoIosArrowDown className={`text-white transition-transform ${profileMenuOpen ? 'transform rotate-180' : ''}`} />
                        </button>

                        {profileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                                    onClick={() => setProfileMenuOpen(false)}
                                >
                                    View Profile
                                </Link>
                                <Link
                                    to="/profile/edit"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                                    onClick={() => setProfileMenuOpen(false)}
                                >
                                    Edit Profile
                                </Link>
                                <Link
                                    to="/settings"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                                    onClick={() => setProfileMenuOpen(false)}
                                >
                                    Settings
                                </Link>
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:outline-none"
                                    onClick={() => {
                                        // Handle logout logic
                                        setProfileMenuOpen(false);
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger - Only visible if you need additional menu items */}
                    <button
                        className="md:hidden flex items-center text-xl text-white focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Only needed if you have additional navigation items */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-fade-in z-40">
                    <div className="flex flex-col items-center gap-2 py-4">
                        <Link
                            to="/messages"
                            className="w-11/12 text-center px-3 py-3 rounded-lg text-gray-700 font-semibold transition-all duration-200 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center gap-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FaComment /> Messages
                        </Link>
                        <Link
                            to="/notifications"
                            className="w-11/12 text-center px-3 py-3 rounded-lg text-gray-700 font-semibold transition-all duration-200 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center gap-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FaBell /> Notifications
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}