'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Events {
  event_id: number;
  name: string;
  description: string;
  date: string;
  location: string;
}

const EventCard = ({ name, description, date, location, event_id }: { name: string; description: string; date: string; location: string; event_id: number }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h1 className="hidden">{event_id}</h1>
      <h1 className="text-lg font-bold mb-2">{name}</h1>
      <p>{description}</p>
      <p className="font-bold">{location}</p>
      <p className="text-gray-500">Be there: {date}</p>
    </div>
  );
};

const EventsListed = () => {
  const [events, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API endpoint
        const response = await axios.get('/api/getEvents');
        const eventsData: Events[] = response.data;

        setEvents(eventsData);

        console.log('Events:', events);
      } catch (error) {
        console.error('Error fetching Events:', error);
      }
    };

    fetchData();
  }, []);

  if (!events) {
    return <div>No Events Yet. Check tomorrow!</div>;
  }

    return (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((events) => (
            <EventCard 
              key={events.event_id}
              event_id={events.event_id}
              name={events.name}
              description={events.description}
              date={events.date}
              location={events.location}
            />))}
          </div>
        </div>
      );
}

export default EventsListed;