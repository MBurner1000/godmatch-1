'use client';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

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

            router.push('/Dashboard');
          } catch (error) {
            console.error('Error uploading images:', error);
            // Handle error as needed (e.g., show error message)
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
                    <p>Drag and drop your images here</p>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload-input"
                    />
                    <label htmlFor="image-upload-input" className="cursor-pointer">
                        Or click here to select videos
                    </label>
                </div>
                <button
                    onClick={handleFindPeople}
                    className="bg-black hover:bg-gray-700 font-bold py-2 px-4 rounded"
                >
                    Ready to Find Your Match? Click Here.
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