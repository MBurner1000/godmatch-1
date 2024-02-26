'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

const PublicGalleryInfo = () => {
  return (
    <div className="flex flex-col justify-center gap-4 md:gap-8 p-4">
      <div>
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

export default PublicGalleryInfo;
