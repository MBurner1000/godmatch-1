'use client';
import { useState } from 'react';
import Image from 'next/image';

const PickImages = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

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

    const handleFindPeople = () => {
        // Add functionality to find people
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