import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Navbar from "@/components/navbar";

const AppMain = () => {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/auth/signin");
        },
    });

    return (
        <div className="absolute w-full min-h-screen text-white bg-dark1">  
            <Navbar session={session} />

            <main className="flex items-center justify-center mt-24">
                <div className="p-4 m-10 rounded-md shadow-md bg-white/10 md:w-7/12 w-full">
                    <p className="text-3xl text-center font-bold">Your Decks</p>

                    <div className="flex items-center justify-center text-center my-4">
                        <table>
                            <tr>
                                <th className="md:px-10 px-4">Deck</th>
                                <th className="md:px-10 px-4">New</th>
                                <th className="md:px-10 px-4">Studying</th>
                                <th className="md:px-10 px-4">Done</th>
                            </tr>
                            <tr
                                onClick={() => {
                                    router.push("/study/ID HERE");
                                }}
                                className="hover:bg-white/5 transition-all rounded-md cursor-pointer"
                            >
                                <td className="p-2">
                                    Legislation II Partial II Semester
                                </td>
                                <td className="p-2 text-secondary">4</td>
                                <td className="p-2 text-red1">20</td>
                                <td className="p-2 text-gray-300">10</td>
                            </tr>
                            <tr
                                onClick={() => {
                                    router.push("/study/ID HERE");
                                }}
                                className="hover:bg-white/5 transition-all rounded-md cursor-pointer"
                            >
                                <td className="p-2">
                                    Legislation II Partial II Semester
                                </td>
                                <td className="p-2 text-secondary">4</td>
                                <td className="p-2 text-red1">20</td>
                                <td className="p-2 text-gray-300">10</td>
                            </tr>
                            <tr
                                onClick={() => {
                                    router.push("/study/ID HERE");
                                }}
                                className="hover:bg-white/5 transition-all rounded-md cursor-pointer"
                            >
                                <td className="p-2">
                                    Legislation II Partial II Semester
                                </td>
                                <td className="p-2 text-secondary">4</td>
                                <td className="p-2 text-red1">20</td>
                                <td className="p-2 text-gray-300">10</td>
                            </tr>
                        </table>
                    </div>

                    <div className="text-center mt-4">
                        <button
                            onClick={() => {
                                router.push("/app/create");
                            }}
                            className="p-2 rounded-md bg-primary shadow-md"
                        >
                            Create Deck
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AppMain;
