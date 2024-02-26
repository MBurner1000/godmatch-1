'use client';
import React from "react";
import Link from "next/link";

const EventCard = ({ header, text }: { header: string; text: string }) => {
  return (
    <Link className="bg-white rounded-lg shadow-lg p-4" href="/Dashboard/Public_Profile">
    <h1>{header}</h1>
      <p>{text}</p>
    </Link>
  );
};

const EventsListed = () => {
    return (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <EventCard header="Easter Egg Hunt" text=" Enjoy a nice Easter Egg Hunt with your fellow peers. For 18+." />
          </div>
        </div>
      );
}

export default EventsListed;