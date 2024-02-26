'use client';
import React from "react";
import Link from "next/link";

const AngelsList = () => {

  return (
    <div className="flex flex-col justify-center gap-4 md:gap-8 p-4">
        <div>
            <h2 className="text-2xl font-bold mb-4">Jane Doras</h2>
            <Link className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 focus:outline-none" href="/Dashboard/Public_Profile">View Profile</Link>
            <Link className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 focus:outline-none" href="/Dashboard/Angels/Chat">Message</Link>
        </div>
        <div>
            <h2 className="text-2xl font-bold mb-4">John Doe</h2>
            <Link className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 focus:outline-none" href="/Dashboard/Public_Profile">View Profile</Link>
            <Link className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 focus:outline-none" href="/Dashboard/Angels/Chat">Message</Link>
        </div>
    </div>
  );
};

export default AngelsList;
