'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProfileCard = ({ imageSrc, text }: { imageSrc: string; text: string }) => {
  return (
    <Link className="bg-white rounded-lg shadow-lg p-4" href="/Dashboard/Public_Profile">
      <Image src={imageSrc} alt="Profile" className="w-200 h-200 object-cover rounded-lg mb-2"
        style={{ aspectRatio: '1 / 1' }}  />
      <p>{text}</p>
    </Link>
  );
};

const DashboardProfiles = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProfileCard imageSrc="/gm-pic-1.png" text="Profile 1" />
        <ProfileCard imageSrc="/gm-pic-1.png" text="Profile 2" />
        <ProfileCard imageSrc="/gm-pic-1.png" text="Profile 3" />
        <ProfileCard imageSrc="/gm-pic-1.png" text="Profile 3" />
        <ProfileCard imageSrc="/gm-pic-1.png" text="Profile 3" />
        <ProfileCard imageSrc="/gm-pic-1.png" text="Profile 3" />
        <ProfileCard imageSrc="/gm-pic-1.png" text="Profile 3" />
        <ProfileCard imageSrc="/gm-pic-1.png" text="Profile 3" />
        <ProfileCard imageSrc="/gm-pic-1.png" text="Profile 3" />
        <ProfileCard imageSrc="/gm-pic-1.png" text="Profile 3" />
      </div>
    </div>
  );
};

export default DashboardProfiles;
