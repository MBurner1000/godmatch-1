'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';


interface ProfileInfoData {
  firstname: string;
  lastname: string;
  email: string;
  location: string | null;
  gender: string | null;
  birthday: string | null;
  age: number | null;
  bio: string | null;
}

interface Media {
  media_url: string;
  media_type: string;
}

const PublicProfileInfo = ( { user_id }: { user_id: number} ) => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfoData | null>(null);
  const [media, setMedia] = useState<Media[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('User Id:', user_id);
        // Fetch user info
        const userInfoResponse = await axios.get(`/api/getUserInfo`, {
          headers: {
            'user_id': user_id
          }
        });
        const userData = userInfoResponse.data;
        setProfileInfo(userData || null);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const fetchUserMedia = async () => {
      try {

        // Fetch user's media
        const mediaResponse = await axios.get(`/api/getMedia`, {
          headers: {
            'user_id': user_id
          }
        }
        );
        setMedia(mediaResponse.data);
      } catch (error) {
        console.error('Error fetching user media:', error);
      }
    };

    fetchUserData();
    fetchUserMedia();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-stretch gap-4 md:gap-8 p-4">
      {profileInfo ? (
        <>
          {/* User's information */}
          <div className="flex flex-col w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Information</h2>
            <div className="flex flex-col gap-2">
              <p>Name: {profileInfo.firstname} {profileInfo.lastname}</p>
              <p>Birthday: {profileInfo.birthday}</p>
              <p>Gender: {profileInfo.gender}</p>
              <p>Location: {profileInfo.location}</p>
              <p>Age: {profileInfo.age}</p>
              <p>Bio: {profileInfo.bio}</p>
            </div>
          </div>

          {/* User's images and videos */}
          <div className="hidden md:block w-full md:w-1/2">
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
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PublicProfileInfo;
