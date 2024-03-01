'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Events {
  event_id: number;
  name: string;
  description: string;
  date: string;
  location: string;
}

const EventsListed = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const router = useRouter(); // Move the useRouter hook here

  const deleteEvent = async (event_id: number) => {
    try {
      // Make a request to authenticate the admin
      const { data: { success } } = await axios.post('/api/deleteEvents', { event_id });    
      // Handle the response accordingly
       if ( success ) {
           // Redirect to the dashboard
          router.push('/Admin/Dashboard/Events');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API endpoint
        const response = await axios.get('/api/getEvents');
        let eventsData: Events | Events[] = response.data;

        // Ensure eventsData is always an array
        if (!Array.isArray(eventsData)) {
          eventsData = [eventsData];
        }

        setEvents(eventsData);

        console.log('Events:', eventsData);
      } catch (error) {
        console.error('Error fetching Events:', error);
        // Handle error: setEvents([]) or display an error message
      }
    };

    fetchData();
  }, []);
  
  if (!Array.isArray(events)) {
    // Handle the case where events is not an array
    return <div>Error: Events data is not in the expected format</div>;
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.event_id} className="bg-white rounded-lg shadow-lg p-4 border-2">
            <h1 className="hidden">{event.event_id}</h1>
            <h1 className="text-lg font-bold mb-2">{event.name}</h1>
            <p>{event.description}</p>
            <p className="font-bold">{event.location}</p>
            <p className="text-gray-500">Be there: {event.date}</p>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteEvent(event.event_id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsListed;
