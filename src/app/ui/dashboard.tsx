'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

interface Profile {
  user_id: number;
  media_url: string;
  firstname: string;
  lastname: string;
}

const ProfileCard = ({ imageSrc, text, user_id }: { imageSrc: string; text: string, user_id: number }) => {
  return (
    <Link href={`/Dashboard/Public_Profile/${user_id}?user_id=${user_id}`}>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Image
          src={imageSrc}
          alt="Profile"
          className="object-cover rounded-lg mb-2"
          style={{ aspectRatio: '1 / 1' }}
          width={200}
          height={200}
        />
        <p>{text}</p>
      </div>
    </Link>
  );
};

const DashboardProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API endpoint
        const response = await axios.get('/api/getFirstUserImages');
        const profilesData: Profile[] = response.data;

        setProfiles(profilesData);

        console.log('Profiles:', profiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchData();
  }, []);

  if (!profiles) {
    return <div>No profiles found.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.user_id}
            user_id={profile.user_id}
            imageSrc={profile.media_url}
            text={`${profile.firstname} ${profile.lastname}`}
          />

        ))}
      </div>
    </div>
  );
};

export default DashboardProfiles;
