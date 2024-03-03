'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MainHeader() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <header>
            <nav className="flex justify-between items-center bg-black text-white py-4 px-6 hidden md:block">
            <ul className="flex flex-row gap-4">
                <div>
                    <Link href="/">Home</Link>
                </div>
                <li>
                    <Link href="/Events">Events</Link>
                </li>
                <li>
                    <Link href="/Contact">Contact</Link>
                </li>
                <li>
                    <Link href="/Login">Login</Link>
                </li>
            </ul>
            </nav>
            <nav className="flex justify-between items-center md:hidden bg-black text-white py-4 px-6">
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
                        <div className="absolute bg-gray-800 z-10 right-0 left-5 w-40 top-12 p-2 rounded-md shadow-lg">
                            <ul className="flex flex-col gap-2">
                                <div>
                                    <Link href="/">Home</Link>
                                </div>
                                <li>
                                    <Link href="/Events">Events</Link>
                                </li>
                                <li>
                                    <Link href="/Contact">Contact</Link>
                                </li>
                                <li>
                                    <Link href="/Login">Login</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
