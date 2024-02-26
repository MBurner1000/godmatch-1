'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission
    };

    useEffect(() => {
        const container = imageContainerRef.current;
        if (!container) return;

        let scrollInterval: NodeJS.Timeout;

        const scrollContainer = () => {
            if (container.scrollTop !== undefined && container.scrollHeight !== undefined && container.clientHeight !== undefined) {
                container.scrollTop += 1;
                if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
                    container.scrollTop = 0;
                }
            }
        };

        scrollInterval = setInterval(scrollContainer, 50);

        return () => clearInterval(scrollInterval);
    }, []);

    return (
        <div className="flex flex-row gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
            <div
                ref={imageContainerRef}
                className="flex flex-wrap justify-center items-center w-full mb-4 mt-4 p-4 justify-content overflow-y-auto hidden md:flex"
                style={{ maxHeight: "600px" }}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
                    <div key={index} className="w-full md:w-1/2 p-4">
                        <Image
                            src={`/gm-pic-${index}.png`}
                            alt={`Godmatch Image ${index}`}
                            width={538}
                            height={286}
                            priority
                            className="hidden md:block"
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
                    <label htmlFor="FirstName" className="text-white">Firstname:</label>
                    <input
                        type="text"
                        id="FirstName"
                        name="FirstName"
                        placeholder="Firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="border-2 border-black text-black rounded-full p-2 w-full"
                    />
                    <label htmlFor="LastName" className="text-white">Lastname:</label>
                    <input
                        type="text"
                        id="LastName"
                        name="LastName"
                        placeholder="Lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="border-2 border-black text-black rounded-full p-2 w-full"
                    />
                    <label htmlFor="Email" className="text-white">Email:</label>
                    <input
                        type="email"
                        id="Email"
                        name="Email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-2 border-black text-black rounded-full p-2 w-full"
                    />
                    <label htmlFor="Password" className="text-white">Password:</label>
                    <input
                        type="password"
                        id="Password"
                        name="Password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-2 border-black text-black rounded-full p-2 w-full"
                    />
                    <label htmlFor="ConfirmPassword" className="text-white">Confirm Password:</label>
                    <input
                        type="password"
                        id="ConfirmPassword"
                        name="ConfirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="border-2 border-black text-black rounded-full p-2 w-full"
                    />
                    <button type="submit" className="bg-black mr-2 px-4 py-2 rounded">Sign Up</button>
                </form>
            </div>
        </div>

    );
}

export default SignupForm;