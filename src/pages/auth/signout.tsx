import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

import Navbar from "@/components/navbar";

const SignOut = () => {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/auth/signin");
        },
    });

    return (
        <div className="text-white bg-gradient-to-tr from-blue-950 to-cyan-800">
            <Navbar session={session} />

            <main className="min-h-screen flex flex-col justify-center items-center p-12">
                <section className="md:w-4/12 w-full">
                    <div className="my-4 text-gray-100 text-center">
                        <h1 className="text-3xl">Sign Out</h1>
                        <p>Are you sure you want to sign out?</p>
                    </div>

                    <button
                        className="bg-white/20 hover:bg-red-400 w-full shadow-md rounded-md p-4 transition-all"
                        onClick={() =>
                            signOut({ redirect: true, callbackUrl: "/" })
                        }
                    >
                        Sign Out
                    </button>

                    <br />
                    <br />

                    <button
                        className="bg-white/20 hover:bg-sky-400 w-full shadow-md rounded-md p-4 transition-all"
                        onClick={() => router.push("/auth/signin")}
                    >
                        Cancel
                    </button>
                </section>

                <section className="absolute bottom-2 text-gray-300">
                    Logged in as {session?.user?.email}
                </section>
            </main>
        </div>
    );
};

export default SignOut;
