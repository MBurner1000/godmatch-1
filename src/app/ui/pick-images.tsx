'use client';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import {useRouter} from 'next/navigation';

const PickImages = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [userId, setUserId] = useState<number | null>(null); // State to store the user ID

    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const filesArray = Array.from(files) as File[];
            setSelectedImages(filesArray);
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

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleFindPeople = async () => {
        try {
            const imagePaths = [];
            const imageTypes = []; // Array to store image types
    
            for (const image of selectedImages) {
                // Create a FormData object for each image
                const formData = new FormData();
                formData.append('image', image);
    
                // Extract image type
                const imageType = image.type.split('/')[1];
                imageTypes.push(imageType);
    
                // Make a POST request to upload the image file
                const response = await axios.post('/api/uploadImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                // Assuming the server responds with the path to the uploaded image
                imagePaths.push(response.data.path);
            }
    
            // Get user ID from localStorage
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found in localStorage');
            }
    
            // Make another request to save the image paths and types to the database
            const saveResponse = await axios.post('/api/saveImages', {
                imageUrls: imagePaths,
                imageTypes: imageTypes,
                userId: userId,
            });
    
            // Optionally, perform any additional actions after storing image paths
            console.log('Image paths stored successfully:', saveResponse.data);
            router.push('/Dashboard');
        } catch (error) {
            console.error('Error storing images:', error);
        }
    };    

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Pick Your Profile Images</h1>
                <small>You Can Add More Later</small>
                <div
                    className="border-2 border-dashed border-gray-400 p-8 mb-4 text-center"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <p>Drag and drop your images here, or click to browse</p>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
                <button
                    onClick={handleFindPeople}
                    className="bg-black hover:bg-gray-700 font-bold py-2 px-4 rounded"
                >
                    Find People
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
            </div>
        </div>
    );
};

export default PickImages;