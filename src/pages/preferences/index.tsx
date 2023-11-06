import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const PreferencesPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/auth/signin");
        },
    });

    return (
        <div className="text-white bg-gradient-to-tr from-blue-950 to-cyan-800">
            <main className="min-h-screen flex flex-col justify-center items-center p-4 md:p-24">
                
            </main>
        </div>
    );
};

export default PreferencesPage;
