'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

interface Media {
  media_url: string;
  media_type: string;
}

const PublicGalleryInfo = ({ user_id }: { user_id: number}) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchUserMedia = async () => {
      try {
        const mediaResponse = await axios.get(`/api/getMedia`, {
          headers: {
            'user_id': user_id
          }
        });
        setMedia(mediaResponse.data);
      } catch (error) {
        console.error('Error fetching user media:', error);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching data
        await fetchUserMedia();
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-stretch gap-4 md:gap-8 p-4">
      {loading ? ( // Render loading indicator if data is being fetched
        <div>Loading...</div>
      ) : media ? (
        <>
          {/* User's images and videos */}
          <div className="block md:hidden w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              {media.map((item, index) => (
                <div key={index}>
                  {item.media_type === 'png' || item.media_type === 'jpg' || item.media_type === 'jpeg' ? (
                    <Image src={item.media_url} alt={`Image ${index}`} width={200} height={200} />
                  ) : (
                    <video controls className="w-full">
                      <source src={item.media_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <p>{item.media_type === 'png' || item.media_type === 'jpg' || item.media_type === 'jpeg' ? `Image ${index + 1}` : `Video ${index + 1}`}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>No data found.</div>
      )}
    </div>
  );
};

export default PublicGalleryInfo;
