'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
  media_id: number;
  media_url: string;
  media_type: string;
  user_id: number;
}

const ProfileInfo = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfoData | null>(null);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
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
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');

        const userInfoResponse = await axios.get(`/api/getUserInfo`, {
          headers: {
            'user_id': userId
          }
        });
        const userData = userInfoResponse.data;
        console.log('Response Data', userInfoResponse.data);
        setProfileInfo(userData || null);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const fetchUserMedia = async () => {
      try {
        const userId = localStorage.getItem('userId');

        const mediaResponse = await axios.get(`/api/getMedia`, {
          headers: {
            'user_id': userId
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
        await fetchUserData();
        await fetchUserMedia();
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Profile information:', profileInfo?.firstname, profileInfo?.lastname);
    console.log("Profile Information", profileInfo);
  }, [profileInfo]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-stretch gap-4 md:gap-8 p-4">
      {loading ? ( // Render loading indicator if data is being fetched
        <div>Loading...</div>
      ) : profileInfo ? (
        <>
          {/* User's information */}
          <div className="flex flex-col w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Information</h2>
            <div className="flex flex-col gap-2">
              <p>Name: {profileInfo.firstname} {profileInfo.lastname}</p>
              <p>Email: {profileInfo.email}</p>
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
                  <div>
                    <Image src={item.media_url} alt={`Image ${index}`} width={200} height={200} />
                    <p>{`Image ${index + 1}`}</p>
                  </div>
                ) : (
                  <div>
                    <video controls className="w-full">
                      <source src={item.media_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <p>{`Video ${index + 1}`}</p>
                  </div>
                )}
                {/* Render delete button for both images and videos */}
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteMedia(item.media_id)}>Delete</button>
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

export default ProfileInfo;
