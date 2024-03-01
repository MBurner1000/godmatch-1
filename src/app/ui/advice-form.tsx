'use client';

import { useState, useRef, useEffect } from "react";

const AdviceForm = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <div className="flex flex-row gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
            <div className="flex flex-col gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
                <h1 className="text-2xl text-center font-bold mb-4">GodMatch Separates Itself From Other Dating Sites and Offers Advice to Members</h1>
                <p>Advice is given over email, and a one-time payment of $15 is required.</p>
                <p>To get started, Email us at <a href="mailto:godmatch100@gmail.com" className=" font-bold">godmatch100@gmail.com</a></p>
                <p className=" text-white font-bold">Our team will respond to your email within 24 hours</p>
            </div>
        </div>

    );
}

export default AdviceForm;