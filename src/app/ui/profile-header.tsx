'use client';

import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

const ProfileHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
    const [formData, setFormData] = useState({
        birthday: '',
        gender: '',
        location: '',
        age: '',
        bio: ''
    });
    const [error, setError] = useState('');

    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const filesArray = Array.from(files) as File[];
            setSelectedImages(filesArray);
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const filesArray = Array.from(files) as File[];
            setSelectedVideos(filesArray);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files) {
            const filesArray = Array.from(files) as File[];
            setSelectedImages(filesArray);
        }
    };
    const handleVideoDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files) {
            const filesArray = Array.from(files) as File[];
            setSelectedVideos(filesArray);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const toggleImageModal = () => {
        setIsImageModalOpen(!isImageModalOpen);
    };
    const toggleVideoModal = () => {
        setIsVideoModalOpen(!isVideoModalOpen);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const userId = localStorage.getItem('userId');
          // Make a request to authenticate the admin
          const { data: { success } } = await axios.post('/api/saveUserInfo', { formData, userId });    
          // Handle the response accordingly
          if ( success ) {
            // Redirect to the dashboard
            router.push('/Dashboard/Profile');
          }
        } catch (error) {
          setError('Invalid email or password. Please try again.');
        }
    };

    const handleEdit = () => {
        // Handle edit button click
        toggleModal(); // Open the modal
    };

    const handleImages = () => {
        toggleImageModal();
    };

    const handleVideos = () => {
        toggleVideoModal();
    };

    const addImages = async () => {
        try {
          const imagePaths: string[] = [];
          const imageTypes: string[] = [];
      
          for (const image of selectedImages) {
            const imageType = image.type.split('/')[1];
            imageTypes.push(imageType);

            const formData = new FormData();
            formData.append('image', image);

            console.log(process.env.BLOB_READ_WRITE_TOKEN);
      
            const imageFile = formData.get('image') as File;
            const blob = await put(imageFile.name, imageFile, {
              access: 'public',
              token: 'vercel_blob_rw_yZpZBbdWWYyri4vo_QdPZCbcA8tnZUYUQVbUPooOZWnlZ7w',
            });
            
            // Add the blob URL to the list of image paths
            imagePaths.push(blob.url);
          }

          const userId = localStorage.getItem('userId');
          if (!userId) {
            throw new Error('User ID not found in localStorage');
          }

          console.log('Image paths:', imagePaths);
      
          // Send video URLs and types to save them in the backend
          const saveResponse = await axios.post('/api/saveImages', {
            imagePaths: imagePaths,
            imageTypes: imageTypes,
            userId: userId,
          });
      
          // Use imagePaths as needed (e.g., saving to database or displaying)
          console.log('Uploaded image paths:', imagePaths);
          
          // Optionally close the modal after uploading
          toggleImageModal();
        } catch (error) {
          console.error('Error uploading images:', error);
          // Handle error as needed (e.g., show error message)
        }
    };

    const addVideos = async () => {
        try {
          const videoPaths: string[] = [];
          const videoTypes: string[] = []; // Array to store video types
      
          for (const video of selectedVideos) {
            const videoType = video.type.split('/')[1];
            videoTypes.push(videoType);
      
            // Create a FormData object
            const formData = new FormData();
            formData.append('video', video);
      
            console.log(process.env.BLOB_READ_WRITE_TOKEN);
      
            const videoFile = formData.get('video') as File;
            const blob = await put(videoFile.name, videoFile, {
              access: 'public',
              token: 'vercel_blob_rw_yZpZBbdWWYyri4vo_QdPZCbcA8tnZUYUQVbUPooOZWnlZ7w',
            });
            
            // Add the blob URL to the list of image paths
            videoPaths.push(blob.url);
          }
          const userId = localStorage.getItem('userId');
          if (!userId) {
            throw new Error('User ID not found in localStorage');
          }
      
          // Send video URLs and types to save them in the backend
          const saveResponse = await axios.post('/api/saveVideos', {
            videoUrls: videoPaths,
            videoTypes: videoTypes,
            userId: userId,
          });
      
          console.log('Video paths stored successfully:', saveResponse.data);
          alert("Video(s) stored successfully");
          toggleVideoModal();
          router.push('/Dashboard/Profile');

          } catch (error) {
            console.error('Error uploading videos:', error);
          }
    };   
    
    return (
        <div>
            <header>
                <nav className="flex justify-between items-center bg-gray-800 text-white py-4 px-6 hidden md:block">
                    <div className="flex items-center gap-4">
                        <button className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none" onClick={handleEdit}>Edit</button>
                        <button className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none" onClick={handleImages}>Add Images</button>
                        <button className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none" onClick={handleVideos}>Add Videos</button>
                        <Link className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none" href="/Dashboard/Angels">Angels</Link>
                        <Link className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none md:hidden" href="/Dashboard/Gallery">Gallery</Link>
                    </div>
                </nav>
                <nav className="flex justify-between items-center bg-gray-800 text-white py-4 px-6">
                    <div className="md:hidden relative">
                        <button
                            className="text-white hover:text-gray-400 focus:outline-none"
                            onClick={toggleDropdown}
                        >
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute bg-gray-800 z-10 w-40 right-0 left-0 top-12 p-2 rounded-md shadow-lg">
                                <ul className="flex flex-col gap-2">
                                    <div>
                                        <button className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none gap-2" onClick={handleEdit}>Edit</button>
                                    </div>
                                    <div>
                                        <button className="text-white bg-black rounded-lg p-2 hover:text-gray-400 focus:outline-none gap-2" onClick={handleImages}>Add Images</button>
                                    </div>
                                    <div>
                                        <button className="text-white bg-black rounded-lg p-2  hover:text-gray-400 focus:outline-none gap-2" onClick={handleVideos}>Add Videos</button>
                                    </div>
                                    <div className='p-2'>
                                        <Link className="text-white bg-black rounded-lg p-2  hover:text-gray-400 focus:outline-none gap-2" href="/Dashboard/Angels">Angels</Link>
                                    </div>
                                    <div className='p-2'>
                                        <Link className="text-white bg-black rounded-lg p-2 bg-black-800 hover:text-gray-400 focus:outline-none md:hidden gap-2" href="/Dashboard/Gallery">Gallery</Link>
                                    </div>
                                </ul>
                            </div>
                        )}
                    </div>
                </nav>
            </header>

            {/* Modal for Adding Videos */}
            {isVideoModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
                    <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
                    <div className="flex items-center justify-center w-full h-full z-10">
                        <div className="bg-gray-200 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Add Videos</h2>
                            <div
                                className="border-2 border-dashed border-gray-400 p-8 mb-4 text-center"
                                onDrop={handleVideoDrop}
                                onDragOver={handleDragOver}
                            >
                                <p>Drag and drop your videos here</p>
                                <input
                                    type="file"
                                    accept="video/*"
                                    multiple
                                    onChange={handleVideoChange}
                                    className="hidden"
                                    id="video-upload-input"
                                />
                                <label htmlFor="video-upload-input" className="cursor-pointer">
                                    Or click here to select videos
                                </label>
                            </div>
                            <button
                                onClick={addVideos}
                                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Videos
                            </button>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {selectedVideos.map((video, index) => (
                                    <div key={index}>
                                        <video controls className="w-1/4 h-auto">
                                            <source src={URL.createObjectURL(video)} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                ))}
                            </div>
                            <button type="button" className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg" onClick={toggleVideoModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Adding Images */}
            {isImageModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
                    <div className="flex items-center justify-center w-full h-full z-10">
                        <div className="bg-gray-200 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Add Images</h2>
                            <div
                                className="border-2 border-dashed border-gray-400 p-8 mb-4 text-center"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <p>Drag and drop your images here, </p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload-input"
                                />
                                <label htmlFor="image-upload-input" className="cursor-pointer underline">
                                    Or click here to select Images
                                </label>
                            </div>
                            <button
                                onClick={addImages}
                                className="bg-black hover:bg-gray-700 font-bold py-2 px-4 rounded"
                            >
                                Add Images
                            </button>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {selectedImages.map((image, index) => (
                                    <div key={index}>
                                        <Image
                                            src={URL.createObjectURL(image)}
                                            alt={`Image ${index}`}
                                            width={200}
                                            height={200}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                ))}
                            </div>
                            <button type="button" className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg" onClick={toggleImageModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for editing user information */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-900 opacity-75 overflow-y-auto overflow-x-auto"></div>
                    <div className="flex items-center justify-center w-full h-full z-10">
                        <div className="bg-gray-200 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Edit Profile Information</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                {/* Form inputs for editing user information */}
                                <div className="flex flex-row gap-2">
                                <label htmlFor="birthday">Birthday</label>
                                <input
                                    type="date"
                                    id="birthday"
                                    value={formData.birthday}
                                    name="birthday"
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 mb-4"
                                />
                                <label htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    id="age"
                                    value={formData.age}
                                    name="age"
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 mb-4"
                                />
                                </div>
                                <label htmlFor="gender">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 mb-4"
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Non-Binary</option>
                                </select>
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    value={formData.location}
                                    name="location"
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 mb-4"
                                />
                                <label htmlFor="bio">Bio</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 mb-4"
                                ></textarea>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Changes</button>
                                <button type="button" className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg" onClick={toggleModal}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProfileHeader;