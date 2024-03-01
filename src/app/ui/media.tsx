'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Media {
  media_id: number;
  media_url: string;
  media_type: string;
  user_id: number;
}

const GalleryInfo = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const router = useRouter();

  const deleteMedia = async (mediaId: number) => {
    try {
      const userId = localStorage.getItem('userId');

      console.log('Media ID:', mediaId);
      console.log('User ID:', userId);

       const { data: { success } } = await axios.delete(`/api/deleteMedia`, {
        headers: {
          user_id: userId,
          media_id: mediaId
        }
      });

      if (success) {
        router.push('/Dashboard/Profile');
      }

    } catch (error) {
      console.error('Error deleting media:', error);
    }
  }

  useEffect(() => {

    const fetchUserMedia = async () => {
      try {
        // Get user_id from local storage
        const userId = localStorage.getItem('userId');

        // Fetch user's media
        const mediaResponse = await axios.get(`/api/getMedia`, {
          headers: {
            'user_id': userId
          }
        }
        );
        setMedia(mediaResponse.data);
      } catch (error) {
        console.error('Error fetching user media:', error);
      }
    };

    fetchUserMedia();
  }, []);

  return (
    <div className="flex flex-col justify-center gap-4 md:gap-8 p-4">
      <div>
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
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteMedia(item.media_id)}>Delete</button>
                </div>
              ))}
            </div>
      </div>

    </div>
  );
};

export default GalleryInfo;
