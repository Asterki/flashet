import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

import Navbar from "@/components/navbar";

export default function SignIn({
    providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="text-white bg-gradient-to-tr from-blue-950 to-cyan-800">
            <Navbar session={null} />

            <main className="min-h-screen flex flex-col justify-center items-center p-24">
                <section>
                    <div className="my-4 text-gray-100 text-center">
                        <p className="text-[50px] font-black mb-4">
                            Sign in to Flashet
                        </p>
                        <p>Please select a provider</p>
                    </div>

                    <div className="text-center">
                        {Object.values(providers).map((provider) => (
                            <div key={provider.name}>
                                <button
                                    className="bg-white/10 hover:bg-white/20 transition-all w-5/12 p-4 rounded-lg shadow-md"
                                    onClick={() => signIn(provider.id)}
                                >
                                    Sign in with {provider.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (session) {
        return { redirect: { destination: "/" } };
    }

    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    };
}
