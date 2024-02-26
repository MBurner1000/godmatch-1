'use client';

import Link from 'next/link';
import { useState } from 'react';

const ProfileHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleEdit = () => {
        // Handle edit button click
    }

    const addImages = () => {
        // Handle add images button click
    }

    const addVideos = () => {
        // Handle add videos button click
    }

    return (
        <div>
            <header>
                <nav className="flex justify-between items-center bg-gray-800 text-white py-4 px-6 hidden md:block">
                    <div className="flex items-center gap-4">
                        <button className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none" onClick={handleEdit}>Edit</button>
                        <button className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none" onClick={addImages}>Add Images</button>
                        <button className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none" onClick={addVideos}>Add Videos</button>
                        <Link className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none" href="/Dashboard/Your-Angels">Angels</Link>
                        <Link className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none md:hidden" href="/Dashboard/Gallery">Gallery</Link>
                    </div>
                </nav>
                <nav className="flex justify-between items-center bg-gray-800 text-white py-4 px-6">
                <div className="md:hidden relative">
                    <button
                        className="text-white hover:text-gray-400 focus:outline-none"
                        onClick={toggleDropdown}
                    >
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute bg-gray-800 z-10 w-40 right-0 left-0 top-12 p-2 rounded-md shadow-lg">
                            <ul className="flex flex-col gap-2">
                                <div>
                                    <button className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none gap-2" onClick={handleEdit}>Edit</button>
                                </div>
                                <div>
                                    <button className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none gap-2" onClick={addImages}>Add Images</button>
                                </div>
                                <div>
                                    <button className="text-white bg-black rounded-lg p-2  hover:text-gray-400 focus:outline-none gap-2" onClick={addVideos}>Add Videos</button>
                                </div>
                                <div className='p-2'>
                                    <Link className="text-white bg-black rounded-lg p-2  hover:text-gray-400 focus:outline-none gap-2" href="/Your-Angels">Angels</Link>
                                </div>
                                <div className='p-2'>
                                    <Link className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 focus:outline-none md:hidden gap-2" href="/Gallery">Gallery</Link>
                                </div>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            </header>

        </div>
    );
};

export default ProfileHeader;