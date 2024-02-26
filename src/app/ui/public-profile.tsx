'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

const PublicProfileInfo = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-stretch gap-4 md:gap-8 p-4">
      {/* User's information */}
      <div className="flex flex-col w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Information</h2>
        <div className="flex flex-col gap-2">
          <p>Name: John Doe</p>
          <p>Email: user@example.com</p>
          <p>Birthday: January 1, 1990</p>
          <p>Gender: Male</p>
          <p>Location: City, Country</p>
          <p>Age: 30</p>
          <p>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      
      {/* User's images and videos */}
      <div className="hidden md:block w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Sample images */}
          <div>
            <Image src="/gm-pic-3.png" alt="Sample Image 1" width={200} height={200} />
            <p>Sample Image 1</p>
          </div>
          <div>
            <Image src="/gm-pic-3.png" alt="Sample Image 2" width={200} height={200} />
            <p>Sample Image 2</p>
          </div>
          {/* Sample videos */}
          <div>
            <video controls className="w-full">
              <source src="/sample-video-1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>Sample Video 1</p>
          </div>
          <div>
            <video controls className="w-full">
              <source src="/sample-video-1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>Sample Video 2</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PublicProfileInfo;
