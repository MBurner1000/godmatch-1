'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <header>
            <nav className="flex justify-between items-center bg-gray-800 text-white py-4 px-6">
                <div>
                    <Link href="/Dashboard">People</Link>
                </div>
                {/* Dropdown menu for mobile */}
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
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute bg-gray-800 z-10 right-0 top-12 p-2 rounded-md shadow-lg">
                            <ul className="flex flex-col gap-2">
                                <li>
                                    <Link href="/Dashboard/Profile">Profile</Link>
                                </li>
                                <li>
                                    <Link href="/Dashboard/Advice">★ Get Advice</Link>
                                </li>
                                <li>
                                    <Link href="/Dashboard/Settings">Settings</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                {/* End of dropdown menu for mobile */}
                <ul className="hidden md:flex flex-row gap-4">
                    <li>
                        <Link href="/Dashboard/Profile">Profile</Link>
                    </li>
                    <li>
                        <Link href="/Dashboard/Advice">★ Get Advice</Link>
                    </li>
                    <li>
                        <Link href="/Dashboard/Settings">Settings</Link>
                    </li>
                </ul>
                <form onSubmit={handleSubmit}>
                    <button type="submit">Logout</button>
                </form>
            </nav>
        </header>
    );
}
