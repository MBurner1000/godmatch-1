'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setTimeout } from 'timers';

interface SettingInfoData {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  }

  const SettingsInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [settingsInfo, setSettingsInfo] = useState<SettingInfoData | null>(null);
    const [formData, setFormData] = useState<Partial<SettingInfoData>>({}); // Use Partial to allow empty initial state

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleInfoUpdate = () => {
        toggleModal();
    }

    const handleAccountRemoval = async () => {
        try {
            const userId = localStorage.getItem('userId');

            // Make a request to authenticate the admin
            const { data: { success } } = await axios.post('/api/deleteAccount', { userId });    
            // Handle the response accordingly
            if ( success ) {
              // Redirect to the dashboard
              router.push('/');
            }
          } catch (error) {
            setError('Invalid email or password. Please try again.');
          }  
    }

    const handleDeleteAngels = async () => {
        try {
            const userId = localStorage.getItem('userId');

            // Make a request to authenticate the admin
            const { data: { success } } = await axios.post('/api/deleteAllAngels', { userId });    
            // Handle the response accordingly
            if ( success ) {
              // Redirect to the dashboard
              router.push('/');
            }
          } catch (error) {
            setError('Invalid email or password. Please try again.');
          }  
    }

    const handleDeleteMedia = async () => {
        try {
            const userId = localStorage.getItem('userId');

            // Make a request to authenticate the admin
            const { data: { success } } = await axios.post('/api/deleteAllMedia', { userId });    
            // Handle the response accordingly
            if ( success ) {
              // Redirect to the dashboard
              router.push('/');
            }
          } catch (error) {
            setError('Invalid email or password. Please try again.');
          }  
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const userId = localStorage.getItem('userId');

          console.log(formData);
          // Make a request to authenticate the admin
          const { data: { success } } = await axios.post('/api/editUserInfo', { formData, userId });    
          // Handle the response accordingly
          if ( success ) {
            // Redirect to the dashboard
            router.push('/Dashboard/Settings');
          }
        } catch (error) {
          setError('Invalid email or password. Please try again.');
        }  
    }

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            // Get user_id from local storage
            const userId = localStorage.getItem('userId');
    
            // Fetch user info
            const userInfoResponse = await axios.get(`/api/getUserInfo?user_id=${userId}`);
            const userData = userInfoResponse.data[0];
            setSettingsInfo(userData || null);
            setFormData(userData || {}); // Set formData to match settingsInfo
          } catch (error) {
            console.error('Error fetching user info:', error);
          }
        };

        fetchUserData();
      }, []);

    return (
        <div>
            <div className="mt-4">
                {settingsInfo ? (
                    <>
                    {/* User's information */}
                    <div className="flex flex-col w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Information</h2>
                        <div className="flex flex-col gap-2">
                        <p>Email: {settingsInfo.email}</p>
                        <p>Name: {settingsInfo.firstname} {settingsInfo.lastname}</p>
                        </div>
                    </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
                <button onClick={handleInfoUpdate} className="block bg-black text-white hover:text-gray-400 focus:outline-none focus:text-gray-400 rounded mt-4 p-2">Update Information</button>
            </div>
            <div className="mt-4 border-t border-gray-300">
                <button onClick={handleAccountRemoval} className="block bg-red-500 text-black hover:text-gray-400 focus:outline-none focus:text-gray-400 rounded p-2 mt-4">Delete Account</button>
                <button onClick={handleDeleteAngels} className="mt-4 block bg-red-500 text-black hover:text-gray-400 focus:outline-none focus:text-gray-400 rounded p-2">Delete all Angels</button>
                <button onClick={handleDeleteMedia} className="mt-4 block bg-red-500 text-black hover:text-gray-400 focus:outline-none focus:text-gray-400 rounded p-2">Delete all Media</button>
            </div>

            {/* Modal for editing user information */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
                    <div className="flex items-center justify-center w-full h-full z-10">
                        <div className="bg-gray-200 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Edit Profile Information</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                {/* Form inputs for editing user information */}
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email || ''}
                                    name="email"
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 mb-4"
                                />
                                <label htmlFor="firstname">Firstname:</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    value={formData.firstname || ''}
                                    name="firstname"
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 mb-4"
                                />
                                <label htmlFor="lastname">Lastname:</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    value={formData.lastname || ''}
                                    name="lastname"
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 mb-4"
                                />
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Changes</button>
                                <button type="button" className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg" onClick={toggleModal}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default SettingsInfo;
