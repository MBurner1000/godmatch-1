'use client';
const SettingsInfo = () => {
    const handleInfoUpdate = () => {
        // Handle information update
    }

    const handleChangePassword = () => {
        // Handle password change
    }

    const handleAccountRemoval = () => {
        // Handle account removal
    }

    const handleDeleteAngels = () => {
        // Handle deletion of all girls
    }

    const handleDeleteMedia = () => {
        // Handle deletion of all matches
    }

    return (
        <div>
            <div className="mt-4">
                <p>Email: user@example.com</p>
                <p>Password: user</p>
                <p>FirstName: John</p>
                <p>LastName: Doe</p>
                <button onClick={handleInfoUpdate} className="block bg-black text-white hover:text-gray-400 focus:outline-none focus:text-gray-400 rounded mt-4 p-2">Update Information</button>
                <button onClick={handleChangePassword} className="mt-4 block bg-black text-white hover:text-gray-400 focus:outline-none focus:text-gray-400 rounded p-2">Change Password</button>
            </div>
            <div className="mt-4">
                <button onClick={handleAccountRemoval} className="block bg-red-500 text-black hover:text-gray-400 focus:outline-none focus:text-gray-400 rounded p-2 mt-4">Delete Account</button>
                <button onClick={handleDeleteAngels} className="mt-4 block bg-red-500 text-black hover:text-gray-400 focus:outline-none focus:text-gray-400 rounded p-2">Delete all Angels</button>
                <button onClick={handleDeleteMedia} className="mt-4 block bg-red-500 text-black hover:text-gray-400 focus:outline-none focus:text-gray-400 rounded p-2">Delete all Media</button>
            </div>
        </div>
    );
}

export default SettingsInfo