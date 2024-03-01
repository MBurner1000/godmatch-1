'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

const ChatRoom = ({ user_id }: { user_id: number }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChat = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
          // get userId from localStorage
          const userId = localStorage.getItem("userId");

          // Cast e.currentTarget.elements to HTMLFormControlsCollection
          const formElements = e.currentTarget.elements as HTMLFormControlsCollection;

          // Access the 'message' input element by its name
          const messageInput = formElements.namedItem("message") as HTMLInputElement;

          // Retrieve the value of the message input element
          const messageContent = messageInput.value;

          // Make a request to authenticate the admin
          const { data: { success } } = await axios.post('/api/sendChatMessage', { recipient_id: user_id, sender_id: userId, message_content: messageContent });    
          // Handle the response accordingly
          if ( success ) {
            // Redirect to the dashboard
            router.push('/Dashboard/Angels/Chat/'+ user_id +'?user_id=' + user_id);
          }
      } catch (error) {
          setError('Invalid email or password. Please try again.');
      }
  };


  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`/api/getChatMessages`, {
          headers: {
            "other_user_id": user_id,
            "recipient_id": userId,
          },
        });
        setMessages(response.data || []);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChatMessages();
  }, [user_id]);

  return (
    <div className="flex h-screen">
      <div className="flex-grow">
        <div className="p-4">
          {/* Display messages */}
          {messages.map((message: any, index: number) => (
            <div key={index} className="flex items-start mb-4">
              {/* Profile image */}
              <Image
                src={message.media_url} // Assuming the API provides profile picture URLs
                alt="Profile Image"
                width={40}
                height={40}
                className="w-12 h-12 rounded-full mr-4"
              />
              {/* Message content */}
              <div>
                <p className="text-gray-600 mb-1">{message.firstname} {message.lastname}</p>
                <p className="bg-gray-200 rounded-lg p-2">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Input area */}
        <form className="p-4" onSubmit={handleChat}>
          <input
            type="text"
            name="message"
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
