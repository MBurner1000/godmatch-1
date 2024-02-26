'use client';
const Sidenav = () => {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
    }
    return (
        <aside className="bg-gray-800 text-white w-64 h-screen flex flex-col justify-between">
            <div className="p-4">
                <h2 className="text-xl font-semibold">Dashboard</h2>
                <div className="mt-4">
                    <ul>
                        <li className="py-2">
                            <a href="/Dashboard" className="block hover:text-gray-400">People</a>
                        </li>
                        <li className="py-2">
                            <a href="/Dashboard/Profile" className="block hover:text-gray-400">Profile</a>
                        </li>
                        <li className="py-2">
                            <a href="/Dashboard/Advice" className="block hover:text-gray-400">★ Get Advice</a>
                        </li>
                        <li className="py-2">
                            <a href="/Dashboard/Settings" className="block hover:text-gray-400">Settings</a>
                        </li>
                    </ul>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
                <button type="submit" className="block hover:text-gray-400">Logout</button>
            </form>
        </aside>
    );
}

export default Sidenav