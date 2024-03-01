'use client';
import PublicProfileInfo from "../../ui/public-profile";
import PublicProfileHeader from "@/app/ui/public-profile-header";
import { useRouter } from "next/navigation";

export default function Public_Profile() {
    const router = useRouter();
    const params = new URLSearchParams(window.location.search);
    const user_id = params.get('user_id');
    const parsed_user_id = user_id ? parseInt(user_id) : null; // Parse user_id as an integer

    return (
        <main>
            <PublicProfileHeader user_id={parsed_user_id as number} />
            <PublicProfileInfo user_id={parsed_user_id as number} />
        </main>
    );
}
