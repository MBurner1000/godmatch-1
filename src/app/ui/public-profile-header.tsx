'use client';

import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

const PublicProfileHeader = ( { user_id }: { user_id: number}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLove =  async () => {
        try {
            //Get user_id from Localstorage
            const userId = localStorage.getItem('userId');
            // Make a request to authenticate the admin
            const { data: { success } } = await axios.post('/api/saveAngel', { userId, user_id });    
            // Handle the response accordingly
            if ( success ) {
              // Alert on Success
              alert('You could see this person on your Angel page.');
            }
          } catch (error) {
            setError('Invalid email or password. Please try again.');
          }    
    }

    return (
        <div>
            <header>
                <nav className="flex justify-between items-center bg-gray-800 text-white py-4 px-6">
                    <div className="flex items-center gap-4">
                        <button className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 focus:outline-none" onClick={handleLove}>Love</button>
                        <Link className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 focus:outline-none gap-2" href={`/Dashboard/Angels/Chat/${user_id}?user_id=${user_id}`}>Message</Link>
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
                                <div className='p-2'>
                                    <button className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 focus:outline-none md:hidden" onClick={handleLove}>Love</button>
                                    <Link className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 focus:outline-none md:hidden gap-2" href="/Dashboard/Angels/Chat">Message</Link>
                                    <Link className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 focus:outline-none md:hidden gap-2" href={`/Dashboard/Public_Profile/Public_Gallery/${user_id}?user_id=${user_id}`}>Gallery</Link>
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

export default PublicProfileHeader;