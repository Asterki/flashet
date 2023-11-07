import { useSession } from "next-auth/react";

import Navbar from "@/components/navbar";

const About = () => {
    const { data: session } = useSession({
        required: false,
    });

    return (
        <div className="text-white bg-gradient-to-tr from-dark1 to-primary">
            <Navbar session={session} />

            <main className="min-h-screen flex flex-col justify-center items-center p-24">
                <div className="lg:w-5/12 w-full text-center">
                    <p className="text-[50px] font-black mb-12">Flashet</p>
                    <p className="text-gray-100/90 text-xl">
                        Are you looking to improve your exam performance?
                        Discover the power of using flashcards, a proven study
                        technique, to master theoretical exams. This tool,
                        created by a student like you, is designed with your
                        success in mind.
                    </p>

                    <div className="mt-10">
                        <button className="bg-white/10 hover:bg-white/20 transition-all p-4 rounded-lg shadow-md">
                            Go to your dashboard
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default About;
