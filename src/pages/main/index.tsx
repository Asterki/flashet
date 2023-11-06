import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Link from "next/link";
import { motion } from "framer-motion";

const Home = () => {
    const router = useRouter();

    const { data: session } = useSession({
        required: false,
    });

    return (
        <div className="text-white bg-gradient-to-tr from-blue-950 to-cyan-800">
            <header className="absolute flex items-center justify-between w-full p-4 md:p-16">
                <div className="text-[40px]">Flashet</div>
                <div className="flex items-center">
                    <Link href="/about" className="mx-2">
                        About
                    </Link>
                    <Link
                        href="https://github.com/Asterki/flashet"
                        className="mx-2"
                    >
                        Open Source
                    </Link>
                    {session && (
                        <Link href="/auth/signout" className="mx-2">
                            Logged in as {session.user?.name}
                        </Link>
                    )}
                    {!session && (
                        <Link href="/auth/sigin" className="mx-2">
                            Login
                        </Link>
                    )}
                </div>
            </header>

            <main className="min-h-screen flex flex-col justify-center items-center p-4 md:p-24">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between lg:w-9/12 w-full">
                    <div className="lg:w-5/12 w-full text-center lg:text-left">
                        <p className="text-[50px] font-black mb-12">
                            Make your weaks your strongs
                        </p>
                        <p className="text-gray-100/90 text-xl">
                            Are you looking to improve your exam performance?
                            Discover the power of using flashcards, a proven
                            study technique, to master theoretical exams. This
                            tool, created by a student like you, is designed
                            with your success in mind.
                        </p>

                        <div className="mt-10">
                            {session && (
                                <button
                                    onClick={() => router.push("/app")}
                                    className="bg-white/10 hover:bg-white/20 transition-all w-full md:w-5/12 p-4 rounded-lg shadow-md"
                                >
                                    Go to your dashboard
                                </button>
                            )}
                            {!session && (
                                <button
                                    onClick={() => router.push("/app")}
                                    className="bg-white/10 hover:bg-white/20 transition-all w-5/12 p-4 rounded-lg shadow-md"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="lg:w-5/12 lg:flex hidden justify-end items-end">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            width={400}
                            height={400}
                            src="/logo-white.svg"
                            alt="Logo"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
