'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const EventForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission
        try {
            // Make a request to send form data
            const { data: { success } } = await axios.post('/api/editEvents', { name, description, location, date });  
            // Handle the response accordingly
            if ( success ) {
                // Redirect to the dashboard
                router.push('/Admin/Dashboard/Events');
            }
        } catch (error) {
            console.error(error);
        }
    };;

    return (
        <div className="flex flex-row gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
            <div className="flex flex-col gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
                    <label htmlFor="Name" className="text-white">Name:</label>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        className="w-full"
                    />
                    <label htmlFor="Description" className="text-white">Description:</label>
                    <textarea
                        id="Description"
                        name="Description"
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                        className="w-full"
                    />
                    <label htmlFor="Location" className="text-white">Location:</label>
                    <input
                        type="text"
                        id="Location"
                        name="Location"
                        placeholder="Location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        required
                        className="w-full"
                    />
                    <label htmlFor="Date" className="text-white">Date:</label>
                    <input
                        type="date"
                        id="Date"
                        name="Date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required
                        className="w-full"
                    />
                    <button type="submit" className="bg-black mr-2 px-4 py-2 rounded">Submit</button>
                </form>
            </div>
        </div>

    );
}

export default EventForm;