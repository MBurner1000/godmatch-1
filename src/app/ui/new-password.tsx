'use client';

import { useState } from "react";
import Link from "next/link";

const NewPasswordForm = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <div className="flex flex-row gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
            <div className="flex flex-col gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
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
                    <Link href={"/Login"} className="text-white mr-2 px-4 py-2 rounded">Login</Link>
                </form>
            </div>
        </div>

    );
}

export default NewPasswordForm;