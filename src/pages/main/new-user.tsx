import * as React from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navbar from "@/components/navbar";

import type { GetStaticProps, InferGetStaticPropsType } from "next";

interface Props {}

const MainNewUser = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["main/new-user", "components/navbar"]);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/auth/signin");
        },
    });

    return (
        <div className="text-white bg-dark1">
            <Navbar t={t} session={session} />

            <main className="min-h-screen flex flex-col justify-center items-center p-24">
                <section className="lg:w-5/12 w-full text-center">
                    <p className="text-[50px] font-black mb-12">Flashet</p>
                    <p className="text-gray-100/90 text-xl">
                        Thank you for taking the time to create an account with Flashet - we extend a warm welcome to
                        you! We&apos;re delighted that you&apos;ve chosen to join our community and be part of our
                        platform. Your decision to become a member is greatly appreciated, and we&apos;re excited to
                        have you on board.
                        <br />
                        <br />
                        By creating an account, you&apos;ve opened the door to a world of opportunities and
                        possibilities. With Flashet, you can access a wide range of features and services that will
                        enhance your experience and make your time here more enjoyable. Whether you&apos;re here for
                        entertainment, information, or any other purpose, we&apos;re here to serve your needs.
                        <br />
                        <br />
                        Our team is dedicated to providing you with the best possible experience, and we&apos;re
                        committed to ensuring that your journey with us is both smooth and fulfilling. If you ever have
                        any questions, concerns, or need assistance, our support team is just a click away. Feel free to
                        reach out to us, and we&apos;ll be more than happy to assist you.
                    </p>

                    <div className="mt-10">
                        <button
                            onClick={() => {
                                router.push("/app");
                            }}
                            className="bg-white/10 hover:bg-white/20 transition-all p-4 rounded-lg shadow-md"
                        >
                            Go to your dashboard
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "en", ["main/new-user", "components/navbar"])),
    },
});

export default MainNewUser;
