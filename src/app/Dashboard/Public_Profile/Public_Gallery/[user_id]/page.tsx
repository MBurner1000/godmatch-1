'use client';
import PublicGalleryInfo from "@/app/ui/public-media";
import { useRouter, useSearchParams } from 'next/navigation'; // Import from next/navigation
import { useEffect, useState } from "react";
export default function Profile() {
    const router = useRouter();
    const [userId, setUserId] = useState<number | null>(null);

    const searchParams = useSearchParams();
  
    // Get postId from the URL query parameter
    const user_id = searchParams ? searchParams.get('user_id') : null;
    const parsedUserId = user_id ? parseInt(user_id) : null;

    console.log('User id:',parsedUserId);
    return (
        <main>
            <PublicGalleryInfo user_id={parsedUserId as number}/>
        </main>
    );
}