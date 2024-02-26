'use client';
import React from "react";
import Link from "next/link";

const ChatRoom = () => {

    const handleCall = () => {
        // Handle video call
    }

    const handleChat = () => {
        // Handle chat
    }

  return (
    <div className="flex h-screen">
      <div className="flex-grow">
        <div className="p-4">
          {/* Display messages here */}
          <div className="flex items-start mb-4">
            {/* Profile image */}
            <img
              src="/gm-pic-1.png"
              alt="Profile Image"
              className="w-12 h-12 rounded-full mr-4"
            />
            {/* Message content */}
            <div>
              <p className="text-gray-600 mb-1">John Doe</p>
              <p className="bg-gray-200 rounded-lg p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          {/* More filler messages */}
          <div className="flex items-start mb-4">
            <img
              src="/gm-pic-2.png"
              alt="Profile Image"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-gray-600 mb-1">Jane Smith</p>
              <p className="bg-gray-200 rounded-lg p-2">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
        {/* Call button for video chat */}
        <div className="p-4">
          <button className="bg-black text-white font-bold py-2 px-4 rounded" onClick={handleCall}>
            Call Video Chat
          </button>
        </div>
        {/* Input area */}
        <form className="p-4" onSubmit={handleChat}>
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full border rounded-md p-2"
          />
          <button className="bg-black text-white font-bold py-2 px-4 rounded mt-2">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
