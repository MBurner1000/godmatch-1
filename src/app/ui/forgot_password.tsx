'use client';

import { useState } from "react";
import Link from "next/link";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <div className="flex flex-row gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
            <div className="flex flex-col gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
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
                    <button type="submit" className="bg-black mr-2 px-4 py-2 rounded">Send Email</button>
                    <Link href={"/Signup"} className="text-white mr-2 px-4 py-2 rounded">Signup</Link>
                </form>
            </div>
        </div>

    );
}

export default ForgotPasswordForm;