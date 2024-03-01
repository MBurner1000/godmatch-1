'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface AngelData {
  user_id: number;
  firstname: string;
  lastname: string;
}

const AngelsList = () => {
  const [angels, setAngels] = useState<AngelData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');

        const response = await axios.get(`/api/getAngels`, {
          headers: {
            'user_id': userId
          }
        });
        const userData = response.data;
        setAngels(userData || []);
      } catch (error) {
        console.error('Error fetching angels info:', error);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchUserData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {angels.map((angel) => (
        <div key={angel.user_id} className="flex flex-col justify-center gap-4 md:gap-8 p-4 border-b-2">
          <h2>{angel.firstname} {angel.lastname}</h2>
          <Link href={`/Dashboard/Public_Profile/${angel.user_id}?user_id=${angel.user_id}`} className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 gap-2 focus:outline-none">
            View Profile
          </Link>
          <Link href={`/Dashboard/Angels/Chat/${angel.user_id}?user_id=${angel.user_id}`} className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 gap-2 focus:outline-none">
            Message
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AngelsList;
